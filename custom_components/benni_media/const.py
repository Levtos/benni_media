"""Konstanten der benni_media Umbrella-Integration.

Dach-Integration für den Media-Stack (FLEET-14-Vorstufe): EIN Sidebar-Panel
„Media" mit internen Tabs Overview/State/Policy/Apply/Diagnostics. Rein
Panel + Router + Aggregator + WS-Gateway + Empty-State-Schicht — KEINE
Business-Logik. Die fachlichen Module bleiben getrennt:

  benni_media_state  (L1 Context Feeder)   — „Was sieht das System?"
  benni_media_policy (L2 Decision Engine)  — „Was soll passieren und warum?"
  benni_media_apply  (L3 Execution Layer)  — „Was wurde wirklich ausgeführt?"

Die Umbrella liest deren Coordinator-Snapshots über hass.data (kein Import).
"""
from __future__ import annotations

from typing import Final

DOMAIN: Final[str] = "benni_media"
NAME: Final[str] = "Benni Media"
CONTRACT: Final[str] = "benni_media.v1"

DATA_UNSUB: Final[str] = "_unsub"
DATA_VIEW_PANEL: Final[str] = "_view_panel"
DATA_VIEW_STATIC: Final[str] = "_view_static"
DATA_WS: Final[str] = "_ws_registered"

# Fachliche Modul-Domains (Quelle der Snapshots) + ihr Coordinator-Bucket-Key.
STATE_DOMAIN: Final[str] = "benni_media_state"
POLICY_DOMAIN: Final[str] = "benni_media_policy"
APPLY_DOMAIN: Final[str] = "benni_media_apply"
COORD_KEY: Final[str] = "coordinator"

MODULE_DOMAINS: Final[dict[str, str]] = {
    "state": STATE_DOMAIN,
    "policy": POLICY_DOMAIN,
    "apply": APPLY_DOMAIN,
}

# WebSocket-Contract (versioniert).
WS_GET_OVERVIEW: Final[str] = f"{DOMAIN}/get_overview"
WS_GET_STATE: Final[str] = f"{DOMAIN}/get_state"
WS_GET_POLICY: Final[str] = f"{DOMAIN}/get_policy"
WS_GET_APPLY: Final[str] = f"{DOMAIN}/get_apply"
WS_GET_DIAGNOSTICS: Final[str] = f"{DOMAIN}/get_diagnostics"

# Panel.
PANEL_URL_PATH: Final[str] = "benni_media"
PANEL_TITLE: Final[str] = "Media"
PANEL_ICON: Final[str] = "mdi:multimedia"
PANEL_ELEMENT: Final[str] = "benni-media-app"
FRONTEND_DIR_URL: Final[str] = "/benni_media_app"
FRONTEND_ENTRY: Final[str] = f"{FRONTEND_DIR_URL}/main.js"
