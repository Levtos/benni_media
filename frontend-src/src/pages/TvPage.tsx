import { ActiveMediaCard, Card, DeviceStatusGrid, EmptyState, Icon, ReasonPanel, VolumeBreakdown } from "../components";
import type { PolicyData, StateData } from "../types";
import { pct, titleCase } from "../format";

export function TvPage({ state = {}, policy = {} }: { state?: StateData; policy?: PolicyData }) {
  const tv = state.devices?.tv; const atv = state.devices?.apple_tv; const active = Boolean(tv?.active || atv?.active || ["tv", "streaming"].includes(state.context || ""));
  const source = atv?.app || atv?.source || tv?.source || state.subcontext;
  const title = atv?.title || tv?.title || source || (active ? "TV aktiv" : "Kein TV-Inhalt aktiv");
  return <div className="tv-page"><div className="tv-hero">{active ? <ActiveMediaCard kind="tv" eyebrow={atv?.active ? "Streaming" : "TV"} title={title} subtitle={source ? `Quelle · ${source}` : undefined} detail={policy.audio_scenario_detail || titleCase(state.subcontext)} artwork={atv?.artwork_url || tv?.artwork_url} device="Denon AVR-X1400H" volume={policy.volume_target_denon} /> : <Card><EmptyState icon={Icon.Tv} title="TV und Streaming sind aus" text="Quelle, App und Routing erscheinen, sobald TV oder Apple TV aktiv sind." /></Card>}<ReasonPanel reasons={policy.reasons} activeReasons={state.active_reasons} /></div><div className="dashboard-grid tv-status"><Card title="Geräte"><DeviceStatusGrid devices={Object.fromEntries(Object.entries(state.devices || {}).filter(([key]) => ["tv", "apple_tv", "denon"].includes(key)))} /></Card><Card title="Aktuelle Entscheidung"><div className="key-values"><span>Szenario<b>{policy.audio_scenario_label || titleCase(state.context)}</b></span><span>Routing<b>{titleCase(policy.audio_owner)}</b></span><span>Denon Ziel<b>{pct(policy.volume_target_denon)}</b></span><span>Aktion<b>{titleCase(policy.action)}</b></span></div></Card></div><VolumeBreakdown name="Denon Lautstärke-Erklärung" data={policy.volume_formula?.denon} accent="cyan" /></div>;
}
