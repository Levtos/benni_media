# Media-Cockpit React/Vite — Umsetzungsplan

Arbeitskontext: `ha-platform/control#28`, Repo `ha-platform/media-core`, Domain `benni_media`.

## Leitplanken

- Umbrella bleibt L4: keine Medienentscheidung und keine duplizierte Konfiguration.
- Bestehende versionierte WebSocket-Contracts und Actions bleiben die Laufzeitquelle.
- Persistente Regeländerungen gehen ausschließlich an `benni_media_policy/get_matrix`, `set_matrix`, `reset_matrix` und `set_scalars`.
- Fehlende Daten werden als ehrlicher Empty State gezeigt; Demo-Fixtures sind nur im Vite-Entwicklungsentry enthalten und gelangen nicht in den Home-Assistant-Build.
- Kein Release oder Produktiv-Deploy vor visueller Abnahme.

## Umsetzung

1. React-basierte Custom-Element-Hülle mit Vite-Library-Build nach `custom_components/benni_media/frontend/app/main.js`.
2. Wiederverwendbare App-Shell mit oberer Umbrella-Navigation und Medien-Sidebar.
3. Alltagsseiten Übersicht, Musik, Gaming sowie TV & Streaming auf bestehenden Aggregat-Snapshots.
4. Regeln mit separaten HomePods-/Denon-Spalten und denselben persistenten Policy-Daten wie der Options-Flow.
5. Konsolidierte Diagnose für State, Policy, Apply, Bindings, Logs und Raw JSON.
6. Vitest, TypeScript, ESLint und Produktionsbuild; anschließend Desktop-/Tablet-QA im Browser.

## Bestehende Datenquellen

| UX-Bereich | Quelle |
|---|---|
| Übersicht / Sessions / Geräte | `benni_media/get_overview`, Roh-Snapshots unter `data.raw` |
| Musik-Now-Playing | `media_state.now_playing`, `media_state.devices.homepods` |
| Gaming | `media_state` (`context`, `gaming_platform`, `devices`, `classifiers`) + `media_policy` |
| TV & Streaming | `media_state.devices.tv/apple_tv/denon` + Policy-Routing |
| Lautstärke-Erklärung | `media_policy.status().volume_formula` |
| Radio-Suche/-Start | `benni_media/action` → `apply/search_radio`, `apply/play_radio` |
| Private Time / Nudge / Boost Reset | bestehendes `benni_media/action`-Gateway |
| Regeln | `benni_media_policy/get_matrix`, `set_matrix`, `reset_matrix`, `set_scalars` |
| Diagnose | `benni_media/get_state`, `get_policy`, `get_apply`, `get_diagnostics` |

## Exakt fehlende Backend-Felder / APIs

Diese Punkte werden nicht mit Produktiv-Mockdaten oder Frontend-Persistenz kaschiert:

- Artwork-URL/Thumbnail für `now_playing`, PS5-Spiel und Apple-TV-/TV-Inhalt.
- Mehrere normalisierte parallele Sessions als eigene Liste; aktuell werden sie defensiv aus `now_playing`, Geräte-Matrix und Kontext zusammengesetzt.
- Music-Assistant-Bibliothek: zuletzt gespielt, Favoriten, Playlists, kürzlich hinzugefügt und allgemeine Suche. Vorhanden ist nur Radio-Suche/-Start.
- Direkte Play/Pause-Action für HomePods/TV/Gaming. Das Umbrella-Allowlist-Gateway bietet diese derzeit nicht an.
- Title-Classifier-Metadaten über Enum/technisches Label hinaus: Anzeigename, Modusbeschreibung, Artwork sowie stabiler Katalog-/Entry-Identifier für eine spätere Bearbeitung.
- Vollständige menschenlesbare Aktionshistorie. Der Apply-Log enthält nur technische Apply-Aktionen.
- Persistente Schreib-APIs für Apply-Delays, Sleep-TV, Quiet-Mode und Wake-Parameter. Diese Werte sind im Snapshot lesbar, aber nicht über die Umbrella/Policy-Matrix schreibbar.
- Getrennte gekippt/offen Fenster-Offsets; der aktuelle Policy-Contract liefert einen Offset pro Gerät.
- Explizite Cap-/Override-Schritte im `volume_formula`-Breakdown. `result` ist vorhanden, der angewandte Cap/Override wird dort nicht als eigener Summand publiziert.

## Spätere Title-Classifier-Bearbeitung

Die Gaming-Komponente kapselt Classifier-Darstellung und Edit-Einstieg separat. Sobald ein additiver Contract `entry_id`, `display_name`, `mode_label`, `artwork_url` und eine autorisierte Update-Action liefert, kann ein Editor ergänzt werden, ohne die Seitenstruktur oder Media-Policy zu verändern.
