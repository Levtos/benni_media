# benni_media — Media-Umbrella-UX

Dach-Integration für den Media-Stack: **ein** Sidebar-Eintrag **„Media"** mit internen
Tabs **Overview / State / Policy / Apply / Diagnostics**. Vorstufe zur Fleet-Umbrella (FLEET-14).

Die Umbrella ist reines **Panel + Router + Aggregator + WS-Gateway + Empty-State-Schicht** —
**keine Business-Logik**. Die fachlichen Module bleiben getrennt:

| Modul | Rolle | UX-Frage |
|---|---|---|
| `benni_media_state` | L1 Context Feeder | „Was sieht das System?" |
| `benni_media_policy` | L2 Decision Engine | „Was soll passieren und warum?" |
| `benni_media_apply` | L3 Execution Layer | „Was wurde wirklich ausgeführt?" |

## WS-Contract (versioniert: `benni_media.v1`)

- `benni_media/get_overview`
- `benni_media/get_state`
- `benni_media/get_policy`
- `benni_media/get_apply`
- `benni_media/get_diagnostics`

Jede Antwort ist ein gemeinsames Envelope mit `contract`, `ok`, `updated_at`,
`modules.{state,policy,apply}.{available,healthy,updated_at,error}` und `data`.
Fehlt ein Modul oder liefert es nichts → `available/healthy=false` + `error` → die UX
zeigt einen Empty/Error-State (**nie eine schwarze Blank-Page**).

## Technik

Vanilla Web Components, kein Build-Step, keine externe UI-Lib, Dracula-Farbschema.
Aggregiert die Modul-Snapshots entkoppelt über `hass.data` (kein Python-Import).
