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


def _first(*vals: Any) -> Any:
    """Erster Wert, der nicht None ist (0 / False / "" bleiben erhalten)."""
    for v in vals:
        if v is not None:
            return v
    return None


def get_overview(hass: HomeAssistant) -> dict[str, Any]:
    snaps = _all_snaps(hass)
    st, pol, ap = snaps["state"]["data"], snaps["policy"]["data"], snaps["apply"]["data"]
    # Module liefern FLACH (media_state: context=Szenario-String; media_policy:
    # volume_target_* flach). Defensiv + 0/False-erhaltend mappen.
    data = {
        "scenario": _first(_g(st, "media_scenario"), _g(st, "scenario"), _g(st, "context")),
        "subcontext": _g(st, "subcontext"),
        "device": _g(st, "device"),
        "gaming_source": _g(st, "gaming_source"),
        "gaming_platform": _g(st, "gaming_platform"),
        "audio_owner": _g(pol, "audio_owner"),
        "action": _first(_g(pol, "action"), _g(ap, "plan", "homepods_action")),
        "volume_policy": _g(pol, "volume_policy"),
        "apply_enabled": _g(ap, "apply_enabled"),
        "execute": _g(ap, "execute"),
        "quiet_mode": _first(_g(st, "quiet_mode"), _g(pol, "quiet_mode")),
        "entertainment_active": _g(st, "entertainment_active"),
        "headset_active": _g(st, "headset_active"),
        "targets": {
            "homepods_volume": _first(_g(pol, "volume_target_homepods"), _g(ap, "policy", "homepods_target")),
            "denon_volume": _first(_g(pol, "volume_target_denon"), _g(ap, "policy", "denon_target")),
            "subwoofer_allowed": _first(_g(pol, "subwoofer_allowed"), _g(ap, "policy", "subwoofer_allowed")),
        },
        "raw": {"state": st, "policy": pol, "apply": ap},
    }
    return _envelope({k: _module_health(v) for k, v in snaps.items()}, data)


def _single(hass: HomeAssistant, key: str, module_label: str) -> dict[str, Any]:
    # Alle Modul-Healths mitliefern → konsistente Header-Badges über alle Tabs.
    snaps = _all_snaps(hass)
    snap = snaps[key]
    env = _envelope({k: _module_health(v) for k, v in snaps.items()}, snap["data"])
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
