import { ActiveMediaCard, Card, EmptyState, Icon, Pill, ReasonPanel, VolumeBreakdown } from "../components";
import type { PolicyData, StateData } from "../types";
import { pct, stateLabel, titleCase } from "../format";

export function GamingPage({ state = {}, policy = {} }: { state?: StateData; policy?: PolicyData }) {
  const platformKey = state.devices?.ps5?.active ? "ps5" : state.devices?.pc?.active ? "pc" : state.gaming_platform || "ps5";
  const device = state.devices?.[platformKey];
  const classifier = state.classifiers?.[platformKey];
  const active = state.context === "gaming" || Boolean(device?.active);
  const title = classifier?.display_name || device?.title || (active ? "Gaming-Session" : "Kein Spiel aktiv");
  const mode = policy.is_grind ? "Grind-Modus" : state.headset_active ? "Headset-Modus" : "Normal-Modus";
  return <div className="gaming-page">
    <div className="gaming-hero">{active ? <ActiveMediaCard kind="gaming" eyebrow="Aktives Spiel" title={title} subtitle={titleCase(classifier?.platform || state.gaming_platform || platformKey)} detail={mode} artwork={device?.artwork_url || classifier?.artwork_url} artworkCandidates={device?.artwork_candidates} badges={<><Pill tone={policy.is_grind ? "pink" : state.headset_active ? "cyan" : "violet"}>{mode}</Pill>{!policy.subwoofer_allowed && <Pill tone="orange">Subwoofer gesperrt</Pill>}</>} device={state.devices?.denon?.active ? "Denon AVR-X1400H" : "Gaming-Audio"} volume={policy.volume_target_denon} /> : <Card><EmptyState icon={Icon.Gamepad2} title="Kein Spiel aktiv" text="PlayStation- und PC-Titel erscheinen automatisch aus Media State." /></Card>}
      <ReasonPanel reasons={policy.reasons} activeReasons={state.active_reasons} />
    </div>
    <div className="gaming-kpis"><Card><span className="kpi-label">Plattform</span><strong>{titleCase(classifier?.platform || state.gaming_platform || platformKey)}</strong><Pill tone="cyan">{stateLabel(device?.state)}</Pill></Card><Card><span className="kpi-label">Erkannter Modus</span><strong>{mode}</strong><Pill tone={policy.is_grind ? "pink" : "violet"}>{mode}</Pill></Card><Card><span className="kpi-label">Audio-Routing</span><strong>{titleCase(policy.audio_owner)}</strong><small>{policy.action ? titleCase(policy.action) : "Aktuelle Policy-Entscheidung"}</small></Card><Card><span className="kpi-label">Subwoofer</span><strong>{policy.subwoofer_allowed ? "Erlaubt" : "Gesperrt"}</strong><Pill tone={policy.subwoofer_allowed ? "green" : "orange"}>{policy.is_grind ? "Grind reduziert" : "Policy"}</Pill></Card></div>
    <div className="dashboard-grid volumes"><VolumeBreakdown name="HomePods" data={policy.volume_formula?.homepods} accent="pink" /><VolumeBreakdown name="Denon AVR-X1400H" data={policy.volume_formula?.denon} accent="cyan" /></div>
    <div className="dashboard-grid gaming-bottom"><Card title="Title Classifier"><div className="classifier-panel"><div><Icon.WandSparkles /><span>Anzeigename</span><b>{classifier?.display_name || title}</b></div><div><Icon.Info /><span>Originaltitel</span><b>{classifier?.original_title || device?.title || "Nicht verfügbar"}</b></div><div><Icon.CircleGauge /><span>Modus</span><b>{mode}</b></div><div><Icon.Info /><span>Katalog-ID</span><b>{classifier?.entry_id || "Noch nicht im Contract"}</b></div></div><button className="button edit-disabled" disabled title="Der stabile Entry-Identifier bereitet eine spätere Bearbeitung vor; diese MVP-Runde schreibt nicht in den Classifier."><Icon.Settings2 size={17} />Klassifizierung bearbeiten (vorbereitet)</button></Card><Card title="Lautstärken & Geräte"><div className="key-values"><span>HomePods<b>{pct(policy.volume_target_homepods)}</b></span><span>Denon<b>{pct(policy.volume_target_denon)}</b></span><span>Headset<b>{state.headset_active ? "Aktiv" : "Nicht aktiv"}</b></span><span>Entertainment<b>{state.entertainment_active ? "Aktiv" : "Aus"}</b></span></div></Card></div>
  </div>;
}
