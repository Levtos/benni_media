"""benni_media — Umbrella/Dach-Integration für den Media-Stack.

Registriert EIN Panel „Media" und ein WS-Gateway, das die Snapshots von
benni_media_state / _policy / _apply aggregiert. Keine Business-Logik, kein
Coordinator, keine eigenen Entities — reines Panel + Router + Aggregator +
Empty-State-Schicht (FLEET-14-Vorstufe).
"""
from __future__ import annotations

import logging

from homeassistant.components.frontend import async_remove_panel
from homeassistant.config_entries import ConfigEntry
from homeassistant.const import EVENT_HOMEASSISTANT_STARTED
from homeassistant.core import HomeAssistant

from .const import DATA_WS, DOMAIN
from .view import async_remove_view, async_setup_view
from .websocket_api import async_setup_websocket_api

_LOGGER = logging.getLogger(__name__)

# Alt-Panels der Einzelmodule (FLEET-66): die Umbrella ist die einzige Media-UI.
# Wir entfernen sie aktiv aus der Frontend-Registry — robust gegen Quellen, die
# sie sonst beim Boot neu registrieren (Modul-Altcode nach Schnellneustart,
# YAML panel_custom, Registrierungs-Race). Läuft bei Setup UND nach Start.
_LEGACY_PANELS = ("benni_media_state", "benni_media_policy", "benni_media_apply")


def _strip_legacy_panels(hass: HomeAssistant) -> None:
    for url_path in _LEGACY_PANELS:
        try:
            async_remove_panel(hass, url_path, warn_if_unknown=False)
        except Exception as err:  # noqa: BLE001 — Panel evtl. nicht (mehr) da
            _LOGGER.debug("legacy panel %s remove skipped: %s", url_path, err)


async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    data = hass.data.setdefault(DOMAIN, {})
    if not data.get(DATA_WS):
        async_setup_websocket_api(hass)
        data[DATA_WS] = True
    await async_setup_view(hass)

    # Sofort + nach komplettem HA-Start (fängt Panels, die später registriert
    # werden — z.B. YAML panel_custom oder Module die nach uns laden).
    _strip_legacy_panels(hass)
    entry.async_on_unload(
        hass.bus.async_listen_once(
            EVENT_HOMEASSISTANT_STARTED, lambda _e: _strip_legacy_panels(hass)
        )
    )
    return True


async def async_unload_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    async_remove_view(hass)
    return True
