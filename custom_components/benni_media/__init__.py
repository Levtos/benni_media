"""benni_media — Umbrella/Dach-Integration für den Media-Stack.

Registriert EIN Panel „Media" und ein WS-Gateway, das die Snapshots von
benni_media_state / _policy / _apply aggregiert. Keine Business-Logik, kein
Coordinator, keine eigenen Entities — reines Panel + Router + Aggregator +
Empty-State-Schicht (FLEET-14-Vorstufe).
"""
from __future__ import annotations

import logging

from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant

from .const import DATA_WS, DOMAIN
from .view import async_remove_view, async_setup_view
from .websocket_api import async_setup_websocket_api

_LOGGER = logging.getLogger(__name__)


async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    data = hass.data.setdefault(DOMAIN, {})
    if not data.get(DATA_WS):
        async_setup_websocket_api(hass)
        data[DATA_WS] = True
    await async_setup_view(hass)
    return True


async def async_unload_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    async_remove_view(hass)
    return True
