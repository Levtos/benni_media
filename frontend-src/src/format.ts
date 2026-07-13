export const pct = (value?: number | null) => value == null || Number.isNaN(Number(value)) ? "—" : `${Math.round(Number(value) * 100)} %`;
export const points = (value?: number | null) => value == null ? "—" : `${value > 0 ? "+" : value < 0 ? "−" : ""}${Math.abs(Math.round(value * 100))}`;
export const time = (value?: string | null) => value ? new Intl.DateTimeFormat("de-DE", { hour: "2-digit", minute: "2-digit", second: "2-digit" }).format(new Date(value)) : "—";
export const titleCase = (value?: string | null) => (value || "—").replaceAll("_", " ").replace(/\b\w/g, (m) => m.toUpperCase());
export const stateLabel = (state?: string) => ({ playing: "Spielt", paused: "Pausiert", on: "An", off: "Aus", idle: "Bereit", unavailable: "Nicht verfügbar" }[state || ""] || titleCase(state));
