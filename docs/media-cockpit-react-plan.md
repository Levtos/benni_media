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

## Vollständige Regelinventur

Contract-Stand der Prüfung: `media-state` v0.13.1 (`ad2e92d`), `media-policy`
v0.18.0 (`e70c74e`) und `media-apply` v0.16.0 plus Workflow-Dokumentation
(`ea52863`). „Editierbar“ bedeutet hier ausschließlich: Es existiert bereits
ein persistenter Schreibweg im aktuellen Contract. Ein Options-Flow allein ist
keine Umbrella-Schreib-API.

| Regel/Wert | Lastenheft-Quelle | Backend vorhanden | editierbar | nur erklärend | fehlender Contract |
|---|---|---:|---:|---:|---|
| Tagesphasen-Basis HomePods/Denon | §6, R17 | Ja: `get_matrix.base` | Ja: `set_matrix` | Nein | — |
| Fenster geschlossen = 0 | R17b | Ja: feste Berechnungsregel | Nein | Ja | — |
| Fenster gekippt, je Gerät | R17b, §6 | Ja: `opening_offset_homepods/denon` | Ja: `set_scalars` | Nein | Reset-einzelner Skalar fehlt |
| Fenster offen, je Gerät | R17b, §6 | Ja; verwendet denselben Wert wie gekippt | Nein, nur über „gekippt/offen“ gemeinsam | Ja | Separater Offen-Wert ist fachlich derzeit nicht gewollt |
| Szenario-Offsets Musik/TV/Aus, je Gerät | R17 | Ja: `scenario_off` | Ja: `set_matrix` | Nein | — |
| Activity `idle` | Inputs §2, R17 | Berechnung ist offen-keyed | Ja: `set_matrix` | Nein | `catalog.activities` listet den Wert fälschlich nicht |
| Activity `free_time` | Inputs §2, R17 | Berechnung ist offen-keyed | Ja: `set_matrix` | Nein | `catalog.activities` listet den Wert fälschlich nicht |
| Activity `work_home` | R17/R18 | Ja | Ja: `set_matrix` | Nein | — |
| Activity `work_away` | R17/R18 | Ja | Ja: `set_matrix` | Nein | — |
| Activity `household` | Inputs §2, R17 | Berechnung ist offen-keyed | Ja: `set_matrix` | Nein | `catalog.activities` listet den Wert fälschlich nicht |
| Gaming Normal, je Gerät | §4.2, R17 | Ja: `scenario_off.gaming` | Ja: `set_matrix` | Nein | Eigener benannter Mode-Contract fehlt; aktuell Szenariozelle |
| Gaming Grind HomePods-Offset | R17b | Ja: `grind_homepods_offset` | Ja: `set_scalars` | Nein | Reset-einzelner Skalar fehlt |
| Gaming Grind Denon-Offset | R17b | Ja: `grind_denon_offset` | Ja: `set_scalars` | Nein | Reset-einzelner Skalar fehlt |
| Gaming Grind Subwoofer gesperrt | R16 | Ja: feste Policy-Regel | Nein | Ja, Hard-Override | — |
| Gaming Headset | §4.2/4.3 | Ja: Classifier/`headset_active`, Spielton über Headset, PC-Routing und Subwoofer-Block | Nein | Ja, feste Modusregel | Editierbarer Geräte-Offset-Contract fehlt |
| Manueller Nudge | R21 | Ja: Laufzeit-Action, ein gekoppelter Wert | Ja, nicht persistent | Nein | Getrennte Geräte-Nudges fehlen |
| Track Boost HomePods | R18/R22 | Ja: `boost_offset` | Ja: `set_scalars` | Nein | Reset-einzelner Skalar fehlt |
| Boost blockiert in Work Home/Work Away/Quiet | R18 | Ja: feste Policy-Regel | Nein | Ja, Hard-Block | — |
| HomePods Mute bei Classifier Enum 2 | R19 | Ja: feste Policy-Regel | Nein | Ja, Hard-Override | — |
| Quiet/Ducking HomePods und Denon | R20 | Ja, aber nur ein gemeinsamer `ducked_target` | Ja: ein gemeinsamer Skalar | Teilweise | Getrennte Werte je Gerät fehlen; Policy-Default 0.15 widerspricht Lastenheft/Apply-Default 0.10 |
| HomePods Max / Denon Max / Active Min | R17, §6 | Ja: Policy-Skalare | Ja: `set_scalars` | Nein | Reset-einzelner Skalar fehlt |
| Private Time automatischer Pfad | R10 | Ja: State-Diagnose `private_source=automatic` | Nein | Ja | — |
| Private Time manueller Pfad | R10 | Ja: State-Diagnose `private_source=manual` | Schalter separat, nicht Regelwert | Ja | — |
| HomePods während Private Time aus | R10 | Ja: feste Routing-Regel | Nein | Ja, Hard-Override | — |
| Private-Time-Denon-Cap | R20b | Ja: `private_denon_cap` | Ja: `set_scalars` | Nein | Reset-einzelner Skalar fehlt |
| Private-Time-Exit-Delay | R10, §6 | Ja: Apply-Option `private_exit_delay_seconds` | Nein im Umbrella | Teilweise | Aktueller Wert im Apply-Status + Schreib-API fehlen |
| HomePods im Sleep aus | R25 | Ja: fester Policy-Zweig | Nein | Ja, Hard-Override | — |
| Denon-Sleep-Zielwert | R25 | Nein; Policy liefert im Sleep keinen Zielwert | Nein | Ja als Lücke | Persistente Property, Berechnung und Status fehlen |
| TV-Sleep-Auto-Off | R24, §6 | Ja: `sleep_tv.delay_s` | Nein im Umbrella | Nein | Apply-Schreib-API fehlt |
| Denon-Nachlauf PC | R13, §6 | Option und Timer vorhanden | Nein im Umbrella | Teilweise | Konfigurierter aktueller Wert im Status + Schreib-API fehlen |
| Denon-Nachlauf TV | R14, §6 | Option und Timer vorhanden | Nein im Umbrella | Teilweise | Konfigurierter aktueller Wert im Status + Schreib-API fehlen |
| Ramp-Schritte | §6 | Ja: `apply.settings.ramp_steps` | Nein im Umbrella | Nein | Apply-Schreib-API fehlt |
| Ramp-Intervall | §6 | Ja: `apply.settings.ramp_step_delay_s` | Nein im Umbrella | Nein | Apply-Schreib-API fehlt |
| Wake-Startlautstärke | R23, §6 | Ja: `apply.wake.start_volume` | Nein im Umbrella | Nein | Apply-Schreib-API fehlt |
| Wake-Debounce | R23, §6 | Ja: `apply.wake.debounce_s` | Nein im Umbrella | Nein | Apply-Schreib-API fehlt |
| Waking-Offset nur HomePods | neue Produktanforderung control#28 | Nein | Nein | Ja als Lücke | `waking_homepods_offset` in Policy-Options, `get_matrix.scalars` und `set_scalars`; Anwendung direkt nach Tagesphasen-Basis, vor Nudge/Caps/Hard-Overrides, nur bei `bio_state=waking`, Endergebnis Clamp 0–1 |

### Reset-Grenzen des aktuellen Contracts

`benni_media_policy/reset_matrix` löscht ausschließlich den persistenten
Matrix-Override für `base`, `scenario_off` und `activity_off`. Einzelne
Matrix-Abschnitte lassen sich bereits korrekt zurücksetzen, indem ihre Zellen
mit `null` über `set_matrix` gelöscht werden. Für Policy-Skalare und sämtliche
Apply-Options existiert weder ein einzelner noch ein gruppierter Reset-Contract.
Die UX darf daher dort nur einen deaktivierten Reset mit dieser Begründung
zeigen; sie darf keine Code-Defaults als vermeintlich gespeicherte Werte
zurückschreiben.

## Exakt fehlende Backend-Felder / APIs

Diese Punkte werden nicht mit Produktiv-Mockdaten oder Frontend-Persistenz kaschiert:

- Artwork-URL/Thumbnail für `now_playing`, PS5-Spiel und Apple-TV-/TV-Inhalt.
- Mehrere normalisierte parallele Sessions als eigene Liste; aktuell werden sie defensiv aus `now_playing`, Geräte-Matrix und Kontext zusammengesetzt.
- Music-Assistant-Bibliothek: zuletzt gespielt, Favoriten, Playlists, kürzlich hinzugefügt und allgemeine Suche. Vorhanden ist nur Radio-Suche/-Start.
- Direkte Play/Pause-Action für HomePods/TV/Gaming. Das Umbrella-Allowlist-Gateway bietet diese derzeit nicht an.
- Title-Classifier-Metadaten über Enum/technisches Label hinaus: Anzeigename, Modusbeschreibung, Artwork sowie stabiler Katalog-/Entry-Identifier für eine spätere Bearbeitung.
- Vollständige menschenlesbare Aktionshistorie. Der Apply-Log enthält nur technische Apply-Aktionen.
- Persistente Umbrella-Schreib- und Reset-APIs für Apply-Delays, Sleep-TV und Wake-Parameter. Einige Werte sind im Snapshot lesbar; PC-/TV-Nachlauf und Private-Exit-Delay fehlen dort zusätzlich als aktueller Konfigurationswert.
- Getrennte Quiet-/Ducking-Werte je Gerät. Der aktuelle Policy-Contract besitzt nur einen gemeinsamen `ducked_target`; sein Code-Default 0.15 weicht vom Lastenheft und Apply-Default 0.10 ab.
- HomePods-only `waking_homepods_offset` samt Policy-Persistenz, Snapshot, Schreib-API und Berechnung zwischen Tagesphasen-Basis und den nachfolgenden Modifier-/Cap-/Override-Layern.
- Explizite Cap-/Override-Schritte im `volume_formula`-Breakdown. `result` ist vorhanden, der angewandte Cap/Override wird dort nicht als eigener Summand publiziert.

## Spätere Title-Classifier-Bearbeitung

Die Gaming-Komponente kapselt Classifier-Darstellung und Edit-Einstieg separat. Sobald ein additiver Contract `entry_id`, `display_name`, `mode_label`, `artwork_url` und eine autorisierte Update-Action liefert, kann ein Editor ergänzt werden, ohne die Seitenstruktur oder Media-Policy zu verändern.

## MVP-Abschluss v0.7.0

- Fensterzustände bleiben als drei getrennte Zeilen sichtbar; „offen“ liest denselben gespeicherten Gerätewert wie „gekippt“ und ist deshalb read-only.
- Gaming Headset erscheint als definierter Modus mit Spielton über Headset und festem Subwoofer-Override. Nur der fehlende editierbare Offset-Contract ist als Umsetzungslücke markiert.
- Private-Time-Diagnosen werden für den Alltag übersetzt; `auto_blocked:denon_off` erscheint als „Automatischer Eintritt blockiert: Denon ist ausgeschaltet.“
- „Matrixwerte auf Standard zurücksetzen“ benennt im Bestätigungsdialog exakt die betroffenen Matrixbereiche und die ausdrücklich unberührten Skalare/Apply-Optionen.
- Typecheck, ESLint, Vitest und Vite-Produktionsbuild sind grün. Das Bundle wird als `custom_components/benni_media/frontend/app/main.js` ausgeliefert.
