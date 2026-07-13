import { useEffect, useMemo, useState } from "react";
import { Card, EmptyState, Icon, Pill, SegmentedButton } from "../components";
import { resetMatrix, setMatrix, setScalars } from "../api";
import type { ApplyData, HassLike, MatrixData, StateData } from "../types";
import { titleCase } from "../format";

const DAY_LABELS: Record<string, string> = {
  early_morning: "Früher Morgen", late_morning: "Später Morgen", forenoon: "Vormittag", afternoon: "Nachmittag",
  early_evening: "Früher Abend", late_evening: "Später Abend", early_night: "Frühe Nacht", late_night: "Späte Nacht",
};
const ACTIVITY_LABELS: Record<string, string> = { idle: "Inaktiv", free_time: "Freizeit", work_home: "Arbeit zuhause", work_away: "Arbeit außer Haus", household: "Haushalt" };
const ACTIVITIES = ["idle", "free_time", "work_home", "work_away", "household"];
const DEVICES = ["homepods", "denon"] as const;
type Device = typeof DEVICES[number];
type Dimension = "base" | "scenario_off" | "activity_off";
type Tab = "matrix" | "gaming" | "safety" | "delays";

const PRIVATE_DIAGNOSTICS: Record<string, string> = {
  "auto_blocked:denon_off": "Automatischer Eintritt blockiert: Denon ist ausgeschaltet.",
};

function privateDiagnostic(reason?: string | null) {
  if (!reason) return "Kein aktiver oder blockierter Grund";
  return PRIVATE_DIAGNOSTICS[reason] || reason;
}

function Help({ text }: { text: string }) {
  return <span className="rule-help" title={text} aria-label={text}><Icon.Info size={15} /></span>;
}

function PercentInput({ value, offset = false, overridden, disabled, onSave }: { value?: number; offset?: boolean; overridden?: boolean; disabled?: boolean; onSave?: (value: number) => void }) {
  const [draft, setDraft] = useState(value == null ? "" : String(Math.round(value * 100)));
  useEffect(() => {
    const sync = window.setTimeout(() => setDraft(value == null ? "" : String(Math.round(value * 100))), 0);
    return () => window.clearTimeout(sync);
  }, [value]);
  const save = () => { if (!disabled && onSave && draft !== "") onSave(Number(draft) / 100); };
  return <label className={`percent-input ${overridden ? "overridden" : ""} ${disabled ? "readonly" : ""}`} title={offset ? "Offset in Prozentpunkten" : "Lautstärke in Prozent"}>
    <input aria-label={offset ? "Prozentpunkte" : "Prozent"} type="number" value={draft} min={-100} max={100} disabled={disabled} onChange={(event) => setDraft(event.target.value)} onBlur={save} onKeyDown={(event) => event.key === "Enter" && save()} />
    <span>{offset ? "Pkt." : "%"}</span>
  </label>;
}

function ReadValue({ value, unit = "", missing }: { value?: number | string | boolean | null; unit?: string; missing?: string }) {
  if (value == null) return <span className="contract-missing" title={missing || "Dieser Wert fehlt im aktuellen Umbrella-Contract."}>Contract fehlt</span>;
  const shown = typeof value === "boolean" ? (value ? "Ja" : "Nein") : value;
  return <strong className="read-value">{shown}{unit}</strong>;
}

function ResetButton({ label, supported = true, onReset }: { label: string; supported?: boolean; onReset?: () => void }) {
  const missing = "Der Backend-Contract kann diesen Abschnitt noch nicht auf gespeicherte Defaults zurücksetzen.";
  return <button className="button section-reset" disabled={!supported} title={supported ? `${label} auf Backend-Defaults zurücksetzen` : missing} onClick={onReset}>
    <Icon.RefreshCw size={14} /> Zurücksetzen
  </button>;
}

function SectionHeader({ index, title, sub, unit, help, resetSupported = true, onReset }: { index: number; title: string; sub: string; unit?: string; help: string; resetSupported?: boolean; onReset?: () => void }) {
  return <div className="rule-title"><span>{index}</span><div><h2>{title} <Help text={help} /></h2><p>{sub}</p></div><div className="rule-title-actions">{unit && <Pill tone="violet">{unit}</Pill>}<ResetButton label={title} supported={resetSupported} onReset={onReset} /></div><div className="rule-device-head"><b>HomePods</b><b>Denon</b></div></div>;
}

function MatrixRows({ matrix, dimension, rows, labels, offset, onSave }: { matrix: MatrixData; dimension: Dimension; rows: string[]; labels: Record<string, string>; offset?: boolean; onSave: (device: Device, key: string, value: number) => void }) {
  return <div className="rule-table">{rows.map((row) => <div className="rule-row" key={row}><span>{labels[row] || matrix.catalog.scenario_labels[row] || titleCase(row)}</span>{DEVICES.map((device) => <PercentInput key={device} offset={offset} value={matrix[dimension]?.[device]?.[row] ?? 0} overridden={matrix.override?.[dimension]?.[device]?.[row] !== undefined} onSave={(value) => onSave(device, row, value)} />)}</div>)}</div>;
}

export function RulesPage({ matrix, apply = {}, state = {}, hass, onMatrix }: { matrix?: MatrixData; apply?: ApplyData; state?: StateData; hass: HassLike; onMatrix: (matrix: MatrixData) => void }) {
  const [tab, setTab] = useState<Tab>("matrix");
  const [busy, setBusy] = useState(false);
  const scenarios = useMemo(() => matrix?.catalog.scenarios.filter((item) => !["gaming", "private", "private_time"].includes(item)) || [], [matrix]);
  if (!matrix) return <Card><EmptyState icon={Icon.SlidersHorizontal} title="Regel-Contract nicht verfügbar" text="benni_media_policy/get_matrix konnte nicht geladen werden. Es wird nichts lokal gespeichert." /></Card>;

  const saveCell = async (dimension: Dimension, device: Device, key: string, value: number) => {
    setBusy(true); try { onMatrix(await setMatrix(hass, { [dimension]: { [device]: { [key]: value } } })); } finally { setBusy(false); }
  };
  const saveScalar = async (key: string, value: number) => {
    setBusy(true); try { onMatrix(await setScalars(hass, { [key]: value })); } finally { setBusy(false); }
  };
  const resetCells = async (label: string, dimension: Dimension, rows: string[]) => {
    if (!window.confirm(`${label} zurücksetzen? Es werden nur die gespeicherten Overrides dieses Abschnitts gelöscht; andere Regeln bleiben unverändert.`)) return;
    const cells = Object.fromEntries(rows.map((row) => [row, null]));
    setBusy(true); try { onMatrix(await setMatrix(hass, { [dimension]: { homepods: cells, denon: cells } })); } finally { setBusy(false); }
  };
  const scalar = (key: string) => matrix.scalars[key];
  const privateSource = state.private_time_active ? (state.private_source === "automatic" ? "Automatischer Pfad aktiv" : state.private_source === "manual" ? "Manueller Pfad aktiv" : "Private Time aktiv") : "Kein Pfad aktiv";

  return <div className={`rules-page ${busy ? "busy" : ""}`}>
    <div className="rules-tabs">
      <SegmentedButton active={tab === "matrix"} onClick={() => setTab("matrix")} icon={Icon.SlidersHorizontal}>Matrix</SegmentedButton>
      <SegmentedButton active={tab === "gaming"} onClick={() => setTab("gaming")} icon={Icon.Gamepad2}>Gaming-Modi</SegmentedButton>
      <SegmentedButton active={tab === "safety"} onClick={() => setTab("safety")} icon={Icon.ShieldCheck}>Caps & Private Time</SegmentedButton>
      <SegmentedButton active={tab === "delays"} onClick={() => setTab("delays")} icon={Icon.Activity}>Delays, Sleep & Waking</SegmentedButton>
      <span />
      <button className="button danger" title="Löscht ausschließlich Matrix-Overrides für Tagesphasen-Basis, Szenario-Offsets und Activity-Offsets." onClick={async () => { if (!window.confirm("Matrixwerte auf Standard zurücksetzen? Betroffen sind ausschließlich Tagesphasen-Basis, Szenario-Offsets einschließlich Gaming Normal und Activity-Offsets. Fensterwerte, Grind-Offsets, Private-Time-Cap, Quiet/Ducking, Boost, Caps sowie Apply-Optionen und Delays bleiben unverändert.")) return; onMatrix(await resetMatrix(hass)); }}><Icon.RefreshCw size={17} />Matrixwerte auf Standard zurücksetzen</button>
    </div>
    <p className="reset-explainer"><Icon.Info size={14} /> Der globale Reset löscht nur den Policy-Matrix-Store. Skalare und Apply-Optionen besitzen im aktuellen Contract keinen Reset-Endpunkt.</p>

    {tab === "matrix" && <>
      <Card className="rule-section"><SectionHeader index={1} title="Tagesphasen-Basis" sub="Grundlautstärke je Tagesphase und Gerät" unit="Prozent" help="Baselines sind absolute Lautstärken. Intern speichert die Policy 0,0–1,0; hier werden 0–100 % angezeigt." onReset={() => void resetCells("Tagesphasen-Basis", "base", matrix.catalog.dayphases)} /><MatrixRows matrix={matrix} dimension="base" rows={matrix.catalog.dayphases} labels={DAY_LABELS} onSave={(device, key, value) => void saveCell("base", device, key, value)} /></Card>
      <Card className="rule-section"><SectionHeader index={2} title="Fenster" sub="Geschlossen ohne Abzug; gekippt und offen verwenden denselben Wert" unit="Prozentpunkte" help="Der Öffnungs-Master unterscheidet geschlossen, gekippt und offen. Die Policy wendet für gekippt und offen bewusst denselben gerätespezifischen Offset an." resetSupported={false} />
        <div className="rule-table"><div className="rule-row"><span>Geschlossen <Pill tone="green">fest 0</Pill></span>{DEVICES.map((device) => <PercentInput key={device} value={0} offset disabled />)}</div><div className="rule-row"><span>Gekippt <Pill tone="orange">additiv</Pill></span><PercentInput value={scalar("opening_offset_homepods")} offset onSave={(value) => void saveScalar("opening_offset_homepods", value)} /><PercentInput value={scalar("opening_offset_denon")} offset onSave={(value) => void saveScalar("opening_offset_denon", value)} /></div><div className="rule-row"><span>Offen <Pill tone="violet">wie gekippt</Pill></span><PercentInput value={scalar("opening_offset_homepods")} offset disabled /><PercentInput value={scalar("opening_offset_denon")} offset disabled /></div></div>
      </Card>
      <Card className="rule-section"><SectionHeader index={3} title="Szenario-Offsets" sub="Allgemeine additive Offsets; Gaming und Private Time sind separat modelliert" unit="Prozentpunkte" help="Private Time ist kein normaler Szenario-Offset. Gaming besitzt eigene Modusregeln und wird deshalb im nächsten Reiter dargestellt." onReset={() => void resetCells("Szenario-Offsets", "scenario_off", scenarios)} /><MatrixRows matrix={matrix} dimension="scenario_off" rows={scenarios} labels={{}} offset onSave={(device, key, value) => void saveCell("scenario_off", device, key, value)} /></Card>
      <Card className="rule-section"><SectionHeader index={4} title="Activity-Offsets" sub="Vollständiger Activity-Katalog aus dem Lastenheft" unit="Prozentpunkte" help="Der Backend-Store akzeptiert offene Activity-Keys. Die UX zeigt deshalb auch idle, free_time und household, obwohl der aktuelle Katalog-Endpunkt nur die beiden Work-Werte listet." onReset={() => void resetCells("Activity-Offsets", "activity_off", ACTIVITIES)} /><MatrixRows matrix={matrix} dimension="activity_off" rows={ACTIVITIES} labels={ACTIVITY_LABELS} offset onSave={(device, key, value) => void saveCell("activity_off", device, key, value)} /></Card>
    </>}

    {tab === "gaming" && <div className="mode-stack">
      <Card className="rule-section"><SectionHeader index={1} title="Gaming Normal" sub="Allgemeiner Gaming-Szenario-Offset je Gerät" unit="Prozentpunkte" help="Diese beiden Matrixzellen bilden den Normal-Modus. Sie werden auch als Grundanteil im Grind-Modus berücksichtigt." onReset={() => void resetCells("Gaming Normal", "scenario_off", ["gaming"])} /><div className="rule-table"><div className="rule-row"><span>Gaming Normal <Pill tone="cyan">Classifier 0</Pill></span>{DEVICES.map((device) => <PercentInput key={device} offset value={matrix.scenario_off?.[device]?.gaming ?? 0} overridden={matrix.override?.scenario_off?.[device]?.gaming !== undefined} onSave={(value) => void saveCell("scenario_off", device, "gaming", value)} />)}</div></div></Card>
      <Card className="rule-section"><SectionHeader index={2} title="Gaming Grind" sub="Zusätzliche Grind-Offsets; HomePods dominant, Denon als Kulisse" unit="Prozentpunkte" help="Berechnung: Gaming-Normal-Offset plus Grind-Offset. Der Subwoofer-Block ist eine feste R16-Regel und kein gewöhnlicher Offset." resetSupported={false} /><div className="rule-table"><div className="rule-row"><span>Zusätzlicher Grind-Offset <Pill tone="pink">Classifier 1</Pill></span><PercentInput offset value={scalar("grind_homepods_offset")} onSave={(value) => void saveScalar("grind_homepods_offset", value)} /><PercentInput offset value={scalar("grind_denon_offset")} onSave={(value) => void saveScalar("grind_denon_offset", value)} /></div><div className="rule-row hard-rule"><span>Subwoofer <Pill tone="orange">Hard-Override</Pill></span><strong className="span-devices">Immer gesperrt · nicht editierbar</strong></div></div></Card>
      <Card className="rule-section"><SectionHeader index={3} title="Gaming Headset" sub="Definierter Classifier-Modus: Das Headset trägt den Spielton" help="Der Title Classifier liefert gaming_headset (Enum 2). Die feste Headset-Regel sperrt den Subwoofer; auf dem PC bleibt Raum-Musik erhalten und der Denon aus. Lediglich ein editierbarer Geräte-Offset-Contract ist noch nicht implementiert." resetSupported={false} /><div className="fixed-rule-grid"><div><Pill tone="cyan">Classifier 2</Pill><b>Spielton über Headset</b><span>Der definierte Modus ist <code>gaming_headset</code>.</span></div><div><Pill tone="orange">Hard-Override</Pill><b>Subwoofer gesperrt</b><span>Gilt, sobald <code>headset_active</code> gesetzt ist.</span></div><div><Pill tone="orange">Umsetzungslücke</Pill><b>Kein editierbarer Geräte-Offset</b><span>Das Feld bleibt read-only, bis ein persistenter Backend-Contract existiert.</span></div></div></Card>
    </div>}

    {tab === "safety" && <div className="safety-grid">
      <Card className="private-card" title="Private Time" action={<ResetButton label="Private Time" supported={false} />}><div className="private-paths"><div><Pill tone="violet">Automatisch</Pill><b>Classifier + PC + Denon</b><span>Alle drei Bedingungen müssen gleichzeitig aktiv sein.</span></div><div><Pill tone="cyan">Manuell</Pill><b>Schalter + PC</b><span>Headset-Pfad ohne Denon und ohne Classifier; schaltet Denon nie ein.</span></div></div><div className="hard-rule-banner"><Icon.LockKeyhole size={18} /><div><b>HomePods bleiben aus</b><span>Beide Private-Time-Pfade übersteuern die normale Matrix. Private Time startet niemals eine Wake-Sequenz.</span></div></div><div className="private-values"><div><span>Denon-Cap</span><PercentInput value={scalar("private_denon_cap")} onSave={(value) => void saveScalar("private_denon_cap", value)} /></div><div><span>Exit-Delay</span><ReadValue value={apply.private_exit?.delay_s} unit=" s" missing="Apply besitzt die Option private_exit_delay_seconds, veröffentlicht den aktuellen Wert aber nicht im Status." /></div><div><span>Aktiver Pfad</span><strong>{privateSource}</strong></div><div><span>Diagnose</span><strong>{privateDiagnostic(state.private_reason || state.private_blocked_reason)}</strong></div></div></Card>
      <Card title="Quiet, Boost & Mute" action={<ResetButton label="Quiet, Boost & Mute" supported={false} />}><div className="scalar-list detailed"><div><span>Quiet / Ducking <small>gemeinsamer Contract für beide Geräte</small></span><PercentInput value={scalar("ducked_target")} onSave={(value) => void saveScalar("ducked_target", value)} /></div><div><span>Track Boost <small>nur HomePods</small></span><PercentInput offset value={scalar("boost_offset")} onSave={(value) => void saveScalar("boost_offset", value)} /></div></div><div className="rule-notes"><p><Pill tone="orange">Hard-Override</Pill> Quiet setzt aktive Ausgaben direkt auf das Ducking-Ziel und übergeht die Matrix.</p><p><Pill tone="violet">Boost-Block</Pill> Blockiert bei Arbeit zuhause, Arbeit außer Haus und Quiet Mode.</p><p><Pill tone="orange">Hard-Mute</Pill> HomePods-Classifier Enum 2 setzt die HomePods unabhängig von der Matrix auf 0.</p><p className="contract-warning">Der Contract hat nur einen gemeinsamen Ducking-Wert. Getrennte HomePods-/Denon-Werte fehlen.</p></div></Card>
      <Card title="Caps & Grenzen" action={<ResetButton label="Caps & Grenzen" supported={false} />}><div className="device-scalar-head"><b>HomePods</b><b>Denon</b></div><div className="paired-values"><span>Maximalpegel</span><PercentInput value={scalar("homepods_max")} onSave={(value) => void saveScalar("homepods_max", value)} /><PercentInput value={scalar("denon_max")} onSave={(value) => void saveScalar("denon_max", value)} /><span>Aktiv-Mindestpegel</span><PercentInput value={scalar("active_min")} onSave={(value) => void saveScalar("active_min", value)} /><PercentInput value={scalar("active_min")} disabled /></div><p className="muted-copy">Der Mindestpegel ist ein gemeinsamer Policy-Wert. Caps greifen nach additiver Matrix und Nudge; Hard-Overrides bleiben dominant.</p></Card>
    </div>}

    {tab === "delays" && <div className="delay-grid">
      <Card title="Sleep" action={<ResetButton label="Sleep" supported={false} />}><div className="key-values rule-values"><span>HomePods im Sleep<b><Pill tone="orange">Aus · Hard-Override</Pill></b></span><span>Denon-Sleep-Ziel<ReadValue missing="R25 fordert einen eigenen Denon-Sleep-Zielwert; Policy-Property und Berechnung fehlen." /></span><span>TV automatisch aus<ReadValue value={apply.sleep_tv?.delay_s} unit=" s" /></span><span>Warn-Vorlauf<ReadValue value={apply.sleep_tv?.warn_lead_s} unit=" s" /></span></div></Card>
      <Card title="Denon-Nachlauf & Private Exit" action={<ResetButton label="Nachlauf & Private Exit" supported={false} />}><div className="key-values rule-values"><span>Nachlauf PC<ReadValue missing="Option denon_nachlauf_pc_seconds existiert, wird aber im Apply-Status nicht als konfigurierter Wert veröffentlicht." /></span><span>Nachlauf TV<ReadValue missing="Option denon_nachlauf_tv_seconds existiert, wird aber im Apply-Status nicht als konfigurierter Wert veröffentlicht." /></span><span>Private-Time-Exit<ReadValue value={apply.private_exit?.delay_s} unit=" s" missing="Option private_exit_delay_seconds existiert, wird aber im Apply-Status nicht veröffentlicht." /></span><span>Timer aktuell aktiv<ReadValue value={Boolean(apply.nachlauf?.active)} /></span></div></Card>
      <Card title="HomePods-Ramp" action={<ResetButton label="HomePods-Ramp" supported={false} />}><div className="key-values rule-values"><span>Ramp-Schritte<ReadValue value={apply.settings?.ramp_steps} /></span><span>Ramp-Intervall<ReadValue value={apply.settings?.ramp_step_delay_s} unit=" s" /></span><span>Tiny Delta<ReadValue value={apply.settings?.tiny_delta != null ? `${Math.round(Number(apply.settings.tiny_delta) * 100)} %` : null} /></span><span>Ramp aktuell<ReadValue value={Boolean(apply.ramp_active)} /></span></div></Card>
      <Card className="waking-card" title="Waking" action={<ResetButton label="Waking" supported={false} />}><div className="waking-formula"><span>Tagesphasen-Basis HomePods</span><b>+</b><span className="missing-field">Waking-Offset: Contract fehlt</span><b>=</b><span>Ergebnis auf 0–100 % begrenzen</span></div><p>Der neue Offset gilt ausschließlich für HomePods bei <code>bio_state=waking</code>. Denon bleibt unberührt. Die Startlautstärke der Wake-Rampe ist davon getrennt.</p><div className="key-values rule-values"><span>Benötigte Property<b><code>waking_homepods_offset</code></b></span><span>Wake-Startlautstärke<ReadValue value={apply.wake?.start_volume != null ? `${Math.round(Number(apply.wake.start_volume) * 100)} %` : null} /></span><span>Wake-Debounce<ReadValue value={apply.wake?.debounce_s} unit=" s" /></span></div><div className="contract-warning">Das Eingabefeld bleibt deaktiviert, bis Policy-Persistenz, `get_matrix.scalars`, `set_scalars` und die Berechnung nach der Tagesphasen-Basis vorhanden sind.</div></Card>
      <Card><EmptyState icon={Icon.LockKeyhole} title="Apply-Werte nur lesbar" text="Apply-Delays, Sleep und Wake sind im Options-Flow konfigurierbar, besitzen aber keine persistente Umbrella-Schreib- oder Reset-API. Fehlende Snapshot-Werte werden nicht durch Defaults vorgetäuscht." /></Card>
    </div>}
  </div>;
}
