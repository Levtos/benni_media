"""WebSocket-Gateway der Umbrella (benni_media.v1). Read-only Aggregations-
Endpunkte; jede Antwort ist das versionierte Envelope (siehe aggregator)."""
from __future__ import annotations

import voluptuous as vol
from homeassistant.components import websocket_api
from homeassistant.core import HomeAssistant

from . import aggregator
from .const import (
    WS_GET_APPLY,
    WS_GET_DIAGNOSTICS,
    WS_GET_OVERVIEW,
    WS_GET_POLICY,
    WS_GET_STATE,
)


def async_setup_websocket_api(hass: HomeAssistant) -> None:
    def _make(ws_type: str, fn):
        @websocket_api.websocket_command({vol.Required("type"): ws_type})
        @websocket_api.async_response
        async def handler(hass, connection, msg) -> None:
            try:
                connection.send_result(msg["id"], fn(hass))
            except Exception as err:  # noqa: BLE001 — nie eine WS-Exception an die UX
                connection.send_error(msg["id"], "aggregate_failed", str(err))
        return handler

    for ws_type, fn in (
        (WS_GET_OVERVIEW, aggregator.get_overview),
        (WS_GET_STATE, aggregator.get_state),
        (WS_GET_POLICY, aggregator.get_policy),
        (WS_GET_APPLY, aggregator.get_apply),
        (WS_GET_DIAGNOSTICS, aggregator.get_diagnostics),
    ):
        websocket_api.async_register_command(hass, _make(ws_type, fn))
