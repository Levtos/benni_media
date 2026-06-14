"""Aggregator — liest die Snapshots der drei Media-Module über hass.data und baut
das versionierte Envelope. KEINE Business-Logik: nur Lesen, Mappen, Health/Empty.

Entkopplung: kein Python-Import der Module. Der Coordinator wird generisch aus
hass.data[<domain>][<entry>]["coordinator"] gezogen; sein veröffentlichter
Snapshot ist ``status()`` (media_apply, reich) bzw. ``data`` (media_state/policy).
Fehlt ein Modul / wirft es → available/healthy=False + error → die UX zeigt einen
Empty/Error-State (nie Blank-Page).
"""
from __future__ import annotations

from typing import Any

from homeassistant.core import HomeAssistant
from homeassistant.util import dt as dt_util

from .const import APPLY_DOMAIN, COORD_KEY, CONTRACT, MODULE_DOMAINS, POLICY_DOMAIN, STATE_DOMAIN


def _coordinator(hass: HomeAssistant, domain: str):
    for bucket in (hass.data.get(domain) or {}).values():
        if isinstance(bucket, dict) and bucket.get(COORD_KEY) is not None:
            return bucket[COORD_KEY]
    return None


def _snapshot(hass: HomeAssistant, domain: str) -> dict[str, Any]:
    """(available, healthy, updated_at, error, data) für ein Modul."""
    coord = _coordinator(hass, domain)
    if coord is None:
        return {
            "available": False, "healthy": False, "updated_at": None,
            "error": f"{domain} not loaded", "data": None,
        }
    try:
        status = getattr(coord, "status", None)
        if callable(status):
            data = status()
        else:
            data = dict(getattr(coord, "data", None) or {})
        healthy = data is not None and data != {}
        return {
            "available": True, "healthy": healthy,
            "updated_at": dt_util.utcnow().isoformat(),
            "error": None if healthy else "no data received",
            "data": data,
        }
    except Exception as err:  # noqa: BLE001 — ein Modul-Fehler darf die UX nicht killen
        return {
            "available": True, "healthy": False, "updated_at": None,
            "error": f"{type(err).__name__}: {err}", "data": None,
        }


def _module_health(snap: dict[str, Any]) -> dict[str, Any]:
    return {
        "available": snap["available"],
        "healthy": snap["healthy"],
        "updated_at": snap["updated_at"],
        "error": snap["error"],
    }


def _envelope(modules: dict[str, dict[str, Any]], data: Any) -> dict[str, Any]:
    errors = [
        {"module": k, "error": m["error"]}
        for k, m in modules.items() if m["error"]
    ]
    return {
        "contract": CONTRACT,
        "ok": True,  # ok bleibt true; einzelne Module melden ihren Zustand selbst
        "updated_at": dt_util.utcnow().isoformat(),
        "stale": False,
        "errors": errors,
        "warnings": [],
        "modules": modules,
        "data": data,
    }


def _all_snaps(hass: HomeAssistant) -> dict[str, dict[str, Any]]:
    return {k: _snapshot(hass, d) for k, d in MODULE_DOMAINS.items()}


def _g(d: Any, *keys: str, default: Any = None) -> Any:
    """Defensives verschachteltes get (nie KeyError → nie Blank-Page)."""
    cur = d
    for k in keys:
        if not isinstance(cur, dict):
            return default
        cur = cur.get(k)
    return cur if cur is not None else default


def get_overview(hass: HomeAssistant) -> dict[str, Any]:
    snaps = _all_snaps(hass)
    st, pol, ap = snaps["state"]["data"], snaps["policy"]["data"], snaps["apply"]["data"]
    data = {
        "scenario": _g(st, "media_scenario") or _g(st, "context", "media_scenario") or _g(st, "scenario"),
        "subcontext": _g(st, "subcontext") or _g(st, "context", "subcontext"),
        "device": _g(st, "device") or _g(st, "context", "device"),
        "gaming_source": _g(st, "gaming_source") or _g(st, "context", "gaming_source"),
        "audio_owner": _g(pol, "audio_owner") or _g(pol, "decision", "audio_owner"),
        "action": _g(pol, "action") or _g(pol, "decision", "action") or _g(ap, "plan", "homepods_action"),
        "volume_policy": _g(pol, "volume_policy") or _g(pol, "decision", "volume_policy"),
        "apply_enabled": _g(ap, "apply_enabled"),
        "execute": _g(ap, "execute"),
        "quiet_mode": _g(st, "quiet_mode") or _g(st, "flags", "quiet_mode") or _g(pol, "quiet_mode"),
        "entertainment_active": _g(st, "entertainment_active") or _g(st, "flags", "entertainment_active"),
        "targets": {
            "homepods_volume": _g(pol, "homepods_target") or _g(pol, "targets", "homepods_volume") or _g(ap, "policy", "homepods_target"),
            "denon_volume": _g(pol, "denon_target") or _g(pol, "targets", "denon_volume") or _g(ap, "policy", "denon_target"),
            "subwoofer_allowed": _g(pol, "subwoofer_allowed") or _g(ap, "policy", "subwoofer_allowed"),
        },
        "raw": {"state": st, "policy": pol, "apply": ap},
    }
    return _envelope({k: _module_health(v) for k, v in snaps.items()}, data)


def _single(hass: HomeAssistant, key: str, module_label: str) -> dict[str, Any]:
    snap = _snapshot(hass, MODULE_DOMAINS[key])
    env = _envelope({key: _module_health(snap)}, snap["data"])
    env["module"] = module_label
    env["ok"] = snap["available"]
    return env


def get_state(hass: HomeAssistant) -> dict[str, Any]:
    return _single(hass, "state", "media.state")


def get_policy(hass: HomeAssistant) -> dict[str, Any]:
    return _single(hass, "policy", "media.policy")


def get_apply(hass: HomeAssistant) -> dict[str, Any]:
    return _single(hass, "apply", "media.apply")


def get_diagnostics(hass: HomeAssistant) -> dict[str, Any]:
    snaps = _all_snaps(hass)
    data = {
        "bindings": {k: _g(v["data"], "bindings", default={}) for k, v in snaps.items()},
        "raw": {k: v["data"] for k, v in snaps.items()},
    }
    return _envelope({k: _module_health(v) for k, v in snaps.items()}, data)
