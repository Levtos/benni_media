# Artwork contract — benni_media#18

## Evidence, 2026-09-07

Read-only snapshots from Einhornzentrale's configured MA/HomePod group established:

| Field | Apple Music | Working MA radio |
| --- | --- | --- |
| Playback | playing | playing |
| Content URI scheme | apple_music (also library) | radiobrowser |
| media_image_url state attribute | absent | absent |
| entity_picture | HTTP, private MA imageproxy | HTTPS artwork |
| entity_picture_local | HA-relative media-player proxy | HA-relative media-player proxy |

Only URI types/route categories are recorded here. Actual addresses, image identifiers, query values and tokens are omitted. Benni started the radio; the agent only read states. Recorder explicitly excludes picture attributes, so historical playback entries are not artwork evidence. No image:// artwork was observed.

The previous State contract omitted entity_picture_local; the cockpit consequently had only the direct private HTTP image for Apple Music. This is a demonstrated transport-contract gap. The exact browser network rejection (mixed content, reachability, etc.) has not been observed and is not claimed as proven.

## Small additive fix and ownership

Media State forwards HA's existing entity_picture_local candidate after the existing player candidates and before classifier artwork. Original source order and radio behavior remain intact. No proxy URL is fabricated when HA supplies none; no new resolver, provider credentials, scraper, policy logic or arbitration is added.

The existing generic HA endpoint is documented in [HA 2026.9.1 MediaPlayerEntity and MediaPlayerImageView](https://github.com/home-assistant/core/blob/2026.9.1/homeassistant/components/media_player/__init__.py). HA owns resolution and authentication. Its supplied image URL is transport data, never a diagnostic log value.

The cockpit accepts browser-usable HTTP(S), image data URLs and HA-relative paths. Unknown schemes are rejected, never origin-prefixed. Failed candidates advance in existing order; the placeholder follows only after usable candidates are exhausted. One attempt per URL per track/candidate set prevents render-driven retries. A new track can retry a reused URL. No timeout or periodic retry is introduced.

Artwork hover diagnostics and data-artwork-source/state expose safe source labels, loading/ready/unavailable and missing/unsupported_scheme/invalid_url/load_failed reasons, without URLs. A load error is not misrepresented as a known HTTP status or authentication failure. Raw diagnostic display/copy omits artwork URLs and image tokens. HTTP credentials in a URL and non-image data URLs are unusable candidates.

## Delivery and acceptance

Two isolated PRs, both owned by benni_media#18: State v0.14.5 (candidate contract) and benni_media v0.7.6 (browser handling plus built bundle). Source Arbitration from #24 and Apply #41 are untouched.

Backend: 156 tests, Ruff E/F/B excluding E501, compileall and diff check. Existing full-Ruff baseline findings remain outside scope. Frontend: 31 tests, TypeScript, ESLint, Vite build, Python compileall and diff check. Existing RulesPage act warnings and dependency audit findings remain unchanged; no lockfile/package upgrades. The checked-in bundle is regenerated with the lockfile's toolchain.

Benni installs both releases and checks Apple Music over MA, working radio, track changes, first-image failure followed by local HA proxy, and the no-artwork placeholder. Inspect safe hover diagnostics for the successful source and any prior load failure. Technical tests and release do not establish real HA rendering or Live Verified.
