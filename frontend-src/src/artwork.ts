export type ArtworkCandidate = { url: string; source: string };
type Resolution = { url: string; kind: string; reason?: never } | { url?: never; kind: string; reason: string };

/** Browser transport only: provider resolution remains with HA/MA. */
export function resolveArtworkUrl(value: string, origin: string): Resolution {
  const src = value.trim();
  if (!src) return { kind: "missing", reason: "missing" };
  const scheme = /^([a-z][a-z\d+.-]*):/i.exec(src)?.[1].toLowerCase();
  if (scheme === "data") return /^data:image\//i.test(src)
    ? { url: src, kind: "data_image" } : { kind: "data", reason: "unsupported_data_type" };
  if (scheme && scheme !== "http" && scheme !== "https") return { kind: "unsupported", reason: "unsupported_scheme" };
  try {
    if (src.includes("\\")) return { kind: "invalid", reason: "invalid_url" };
    const url = new URL(scheme || src.startsWith("/") ? src : `/${src}`, origin);
    if (url.username || url.password) return { kind: "invalid", reason: "credentials_in_url" };
    if (url.protocol !== "http:" && url.protocol !== "https:") return { kind: "unsupported", reason: "unsupported_scheme" };
    return { url: url.toString(), kind: scheme || src.startsWith("//") ? url.protocol.slice(0, -1) : "ha_relative" };
  } catch {
    return { kind: "invalid", reason: "invalid_url" };
  }
}

export function safeArtworkSource(source?: string): string {
  return ["music_assistant", "media_image_url", "entity_picture", "entity_picture_local", "title_classifier", "artwork_url"].includes(source || "") ? source! : "candidate";
}

/** Raw diagnostic exports omit HA image tokens and private artwork URLs. */
export function redactArtwork(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(redactArtwork);
  if (!value || typeof value !== "object") return value;
  return Object.fromEntries(Object.entries(value).map(([key, child]) => {
    if (["artwork_url", "media_image_url", "entity_picture", "entity_picture_local"].includes(key)) return [key, child ? "[artwork URL omitted]" : child];
    if (key === "artwork_candidates" && Array.isArray(child)) return [key, child.map((item) => ({ source: safeArtworkSource(item?.source), url: "[artwork URL omitted]" }))];
    return [key, redactArtwork(child)];
  }));
}
