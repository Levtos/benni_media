import { ActiveMediaCard, Card, EmptyState, Icon, Pill, ReasonPanel, VolumeBreakdown } from "../components";
import type { PolicyData, StateData } from "../types";
import { pct, stateLabel, titleCase } from "../format";

export function GamingPage({ state = {}, policy = {} }: { state?: StateData; policy?: PolicyData }) {
  const platformKey = state.devices?.ps5?.active ? "ps5" : state.devices?.pc?.active ? "pc" : state.gaming_platform || "ps5";
  const device = state.devices?.[platformKey];
  const classifier = state.classifiers?.[platformKey];
  const active = state.context === "gaming" || Boolean(device?.active);
  const title = device?.title || (active ? "Gaming-Session" : "Kein Spiel aktiv");
  return <div className="gaming-page">
    <div className="gaming-hero">{active ? <ActiveMediaCard kind="gaming" eyebrow="Aktives Spiel" title={title} subtitle={titleCase(state.gaming_platform || platformKey)} detail={classifier?.display_name || titleCase(classifier?.label || state.subcontext)} artwork={classifier?.artwork_url || device?.artwork_url} device={state.devices?.denon?.active ? "Denon AVR-X1400H" : "Gaming-Audio"} volume={policy.volume_target_denon} /> : <Card><EmptyState icon={Icon.Gamepad2} title="Kein Spiel aktiv" text="PlayStation- und PC-Titel erscheinen automatisch aus Media State." /></Card>}
      <ReasonPanel reasons={policy.reasons} activeReasons={state.active_reasons} />
    </div>
    <div className="gaming-kpis"><Card><span className="kpi-label">Plattform</span><strong>{titleCase(state.gaming_platform || platformKey)}</strong><Pill tone="cyan">{stateLabel(device?.state)}</Pill></Card><Card><span className="kpi-label">Erkannter Modus</span><strong>{policy.is_grind ? "Grind-Modus" : titleCase(classifier?.display_name || classifier?.label || state.subcontext)}</strong><Pill tone={policy.is_grind ? "pink" : "violet"}>Enum {classifier?.enum ?? "—"}</Pill></Card><Card><span className="kpi-label">Audio-Routing</span><strong>{titleCase(policy.audio_owner)}</strong><small>{policy.action ? titleCase(policy.action) : "Aktuelle Policy-Entscheidung"}</small></Card><Card><span className="kpi-label">Subwoofer</span><strong>{policy.subwoofer_allowed ? "Erlaubt" : "Gesperrt"}</strong><Pill tone={policy.subwoofer_allowed ? "green" : "orange"}>{policy.is_grind ? "Grind reduziert" : "Policy"}</Pill></Card></div>
    <div className="dashboard-grid volumes"><VolumeBreakdown name="HomePods" data={policy.volume_formula?.homepods} accent="pink" /><VolumeBreakdown name="Denon AVR-X1400H" data={policy.volume_formula?.denon} accent="cyan" /></div>
    <div className="dashboard-grid gaming-bottom"><Card title="Title Classifier"><div className="classifier-panel"><div><Icon.WandSparkles /><span>Anzeigename</span><b>{classifier?.display_name || title}</b></div><div><Icon.CircleGauge /><span>Modus</span><b>{titleCase(classifier?.label)}</b></div><div><Icon.Info /><span>Katalog-ID</span><b>{classifier?.entry_id || "Noch nicht im Contract"}</b></div></div><button className="button edit-disabled" disabled title="Editierbar, sobald der Title-Classifier einen stabilen Entry-Identifier und eine Update-Action publiziert"><Icon.Settings2 size={17} />Klassifizierung bearbeiten (vorbereitet)</button></Card><Card title="Lautstärken & Geräte"><div className="key-values"><span>HomePods<b>{pct(policy.volume_target_homepods)}</b></span><span>Denon<b>{pct(policy.volume_target_denon)}</b></span><span>Headset<b>{state.headset_active ? "Aktiv" : "Nicht aktiv"}</b></span><span>Entertainment<b>{state.entertainment_active ? "Aktiv" : "Aus"}</b></span></div></Card></div>
  </div>;
}
