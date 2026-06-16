/**
 * Benni Media — Umbrella-Cockpit (Vanilla Web Component, kein Build-Step, keine
 * externe UI-Lib). EIN Panel „Media" mit internen Tabs Overview/State/Policy/
 * Apply/Diagnostics. Spricht NUR den WS-Contract benni_media.v1
 * (benni_media/get_*). Robust gegen fehlende Modul-Daten: die Shell rendert
 * immer zuerst, jeder Tab faellt auf einen Empty/Error-State zurueck — NIE eine
 * schwarze Blank-Page. Dracula-Farbschema.
 */

const TABS = [
  ["overview", "Overview", "Medienlogik Cockpit", "benni_media/get_overview"],
  ["state", "State", "Kontext-Erkennung & Gerätestatus", "benni_media/get_state"],
  ["policy", "Policy", "Entscheidungen & Zielwerte", "benni_media/get_policy"],
  ["apply", "Apply", "Ausführung, Queue & Ist/Soll", "benni_media/get_apply"],
  ["diagnostics", "Diagnostics", "Bindings, Fehler & Rohdaten", "benni_media/get_diagnostics"],
];
const TAB_BY = Object.fromEntries(TABS.map((t) => [t[0], t]));
const WS_ACTION = "benni_media/action";

const esc = (s) => String(s == null ? "" : s)
  .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const pct = (v) => (v == null || v === "" ? "—" : Math.round(Number(v) * 100) + "%");
const yn = (v) => (v == null ? "—" : v ? "ja" : "nein");
const num = (v) => (v == null || v === "" ? "—" : v);

const DEVICE_ORDER = ["tv", "apple_tv", "ps5", "switch", "pc", "homepods", "denon"];
const DEVICE_LABEL = { tv: "TV", apple_tv: "Apple TV", ps5: "PS5", switch: "Switch", pc: "PC", homepods: "HomePods", denon: "Denon" };

const css = `
:host { display:block; font-family: ui-sans-serif, system-ui, sans-serif;
  background:#1a1b26; color:#c0caf5; min-height:100vh; box-sizing:border-box; }
* { box-sizing:border-box; }
.shell { padding:16px 22px; }
.head { display:flex; align-items:center; gap:14px; flex-wrap:wrap; margin-bottom:6px; }
.title { font-size:20px; font-weight:700; color:#bb9af7; }
.sub { color:#565f89; font-size:12px; }
.spacer { flex:1; }
.chip { font-size:11px; padding:3px 9px; border-radius:999px; background:#24283b; border:1px solid #2a2e42; color:#c0caf5; }
.chip.cy { color:#7dcfff; }
.mods { display:flex; gap:6px; flex-wrap:wrap; }
.mb { font-size:11px; padding:3px 9px; border-radius:999px; border:1px solid #2a2e42; }
.mb.ok { background:#2d3a2e; border-color:#9ece6a55; color:#9ece6a; }
.mb.warn { background:#3a3326; border-color:#e0af6855; color:#e0af68; }
.mb.bad { background:#3a2d33; border-color:#f7768e55; color:#f7768e; }
.live { background:#2d3a2e; border-color:#9ece6a55; color:#9ece6a; }
.shadow { background:#3a3326; border-color:#e0af6855; color:#e0af68; }
.tabs { display:flex; gap:4px; border-bottom:1px solid #2a2e42; margin:12px 0 6px; flex-wrap:wrap; }
.tab { padding:8px 14px; font-size:13px; color:#787c99; cursor:pointer; border-bottom:2px solid transparent; }
.tab:hover { color:#c0caf5; }
.tab.active { color:#bb9af7; border-bottom-color:#bb9af7; }
.tools { display:flex; gap:8px; align-items:center; margin:10px 0; flex-wrap:wrap; }
.tools input { background:#16161e; border:1px solid #2a2e42; border-radius:8px; color:#c0caf5; padding:6px 10px; font-size:12px; min-width:200px; }
button { background:#24283b; color:#c0caf5; border:1px solid #2a2e42; border-radius:8px; padding:6px 12px; font-size:12px; cursor:pointer; }
button:hover { border-color:#7aa2f7; }
button.on { background:#2d3a2e; border-color:#9ece6a55; color:#9ece6a; }
.grid { display:grid; gap:14px; }
.cols { grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); }
.two { grid-template-columns: 1fr 1fr; }
.card { background:#1f2335; border:1px solid #2a2e42; border-radius:12px; padding:14px 16px; }
.card h2 { font-size:12px; margin:0 0 10px; color:#7aa2f7; text-transform:uppercase; letter-spacing:.04em; }
.kpi { font-size:22px; font-weight:600; color:#7dcfff; }
.kpi.acc { color:#bb9af7; }
.row { display:flex; justify-content:space-between; gap:12px; padding:4px 0; font-size:13px; border-bottom:1px solid #20243450; }
.row .k { color:#787c99; } .row .v { color:#c0caf5; }
.hero { background:linear-gradient(135deg,#241b3a,#1f2335); border:1px solid #3b2d5a; }
.hero .kpi { font-size:28px; }
.tiles { display:grid; grid-template-columns:repeat(auto-fit,minmax(120px,1fr)); gap:10px; }
.tile { background:#24283b; border:1px solid #2a2e42; border-radius:10px; padding:10px; text-align:center; font-size:12px; }
.tile .nm { color:#787c99; } .tile .vl { font-size:15px; color:#7dcfff; margin-top:3px; }
.tile.on { border-color:#9ece6a55; } .tile.on .vl { color:#9ece6a; }
.tile.off { opacity:.6; }
.reasons div, .log div { font-size:13px; padding:3px 0; border-bottom:1px solid #20243450; color:#a9b1d6; }
.sev-ok { color:#9ece6a; } .sev-blocked { color:#f7768e; } .sev-warn { color:#e0af68; }
.empty { text-align:center; padding:28px 16px; }
.empty .big { font-size:15px; color:#e0af68; margin-bottom:8px; }
.empty .mut { color:#565f89; font-size:12px; margin-bottom:14px; }
pre { background:#16161e; border-radius:10px; padding:12px; overflow:auto; font-size:11px; color:#a9b1d6; margin:8px 0 0; max-height:420px; }
.mut { color:#565f89; font-size:11px; }
.err { color:#f7768e; padding:20px; }
.actbar { display:flex; gap:8px; align-items:center; flex-wrap:wrap; margin-top:4px; }
.actbar .nudgeval { font-size:18px; font-weight:600; color:#7dcfff; min-width:64px; text-align:center; }
button.arm { background:#2d3a2e; border-color:#9ece6a55; color:#9ece6a; font-weight:600; }
button.disarm { background:#3a3326; border-color:#e0af6855; color:#e0af68; font-weight:600; }
button.act { padding:7px 14px; }
button.danger:hover { border-color:#f7768e; }
button:disabled { opacity:.5; cursor:wait; }
.toast { position:fixed; left:50%; bottom:24px; transform:translateX(-50%);
  background:#24283b; border:1px solid #7aa2f7; color:#c0caf5; padding:9px 16px;
  border-radius:10px; font-size:13px; z-index:99; opacity:0; transition:opacity .2s;
  pointer-events:none; max-width:80vw; }
.toast.show { opacity:1; }
.toast.bad { border-color:#f7768e; color:#f7768e; }
.radio-shortcuts { display:flex; flex-wrap:wrap; gap:8px; margin:10px 0; }
.radio-search { display:flex; gap:8px; align-items:center; margin-top:8px; }
.radio-search input { flex:1; background:#1a1b26; border:1px solid #414868; color:#c0caf5;
  border-radius:8px; padding:7px 10px; font-size:13px; }
button.mini { padding:4px 9px; font-size:12px; }
.radio-results { display:flex; flex-direction:column; gap:6px; margin-top:10px; }
.radio-hit { display:flex; align-items:center; gap:10px; padding:5px 8px;
  background:#1a1b26; border:1px solid #2a2e42; border-radius:8px; }
.radio-hit img { width:32px; height:32px; border-radius:6px; object-fit:cover; background:#24283b; }
.radio-ph { width:32px; height:32px; display:flex; align-items:center; justify-content:center;
  background:#24283b; border-radius:6px; }
.radio-name { flex:1; font-size:13px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
`;

class BenniMediaApp extends HTMLElement {
  constructor() {
    super();
    this._tab = "overview";
    this._data = {};       // tab -> envelope
    this._raw = false;
    this._search = "";
    this._last = {};       // tab -> letzte gerenderte Signatur (Flicker-Schutz)
    this._radioQuery = ""; // Radio-Suche (MA) — Eingabe + Treffer als Component-State,
    this._radioResults = null;  // damit sie den 3s-Refresh überleben.
  }

  set hass(h) { this._hass = h; if (!this._timer) { this._tick(); this._timer = setInterval(() => this._tick(), 3000); } }

  connectedCallback() {
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `<style>${css}</style><div id="root" class="shell"><div class="title">Media</div><div class="sub">Lade…</div></div>`;
  }
  disconnectedCallback() { clearInterval(this._timer); this._timer = null; }

  async _tick() {
    if (!this._hass) return;
    const ep = TAB_BY[this._tab][3];
    try {
      this._data[this._tab] = await this._hass.callWS({ type: ep });
      this._err = null;
    } catch (e) {
      this._err = e.message || String(e);
    }
    // Nur neu rendern, wenn sich was geändert hat (kein 3s-Flicker, Suchfeld bleibt).
    const sig = JSON.stringify({ d: this._data[this._tab], e: this._err, raw: this._raw, t: this._tab });
    if (sig !== this._last[this._tab]) { this._last[this._tab] = sig; this._safeRender(); }
  }

  async _copy(text) {
    try { await navigator.clipboard.writeText(text); return true; } catch (e) { /* fallback */ }
    try {
      const ta = document.createElement("textarea");
      ta.value = text; ta.style.position = "fixed"; ta.style.top = "-1000px";
      this.shadowRoot.appendChild(ta); ta.focus(); ta.select();
      const ok = document.execCommand("copy"); this.shadowRoot.removeChild(ta); return ok;
    } catch (e) { console.error("copy failed", e); return false; }
  }

  _toast(msg, bad) {
    let t = this.shadowRoot.getElementById("toast");
    if (!t) {
      t = document.createElement("div"); t.id = "toast"; t.className = "toast";
      this.shadowRoot.appendChild(t);
    }
    t.textContent = msg; t.className = "toast show" + (bad ? " bad" : "");
    clearTimeout(this._toastTimer);
    this._toastTimer = setTimeout(() => { t.className = "toast"; }, 1800);
  }

  async _action(module, action, params) {
    if (!this._hass) return;
    try {
      const res = await this._hass.callWS({ type: WS_ACTION, module, action, params: params || {} });
      this._toast("✓ " + action + (res && res.result ? "" : ""));
    } catch (e) {
      this._toast("Fehler: " + (e.message || e), true);
    }
    // Sofort frisch ziehen, damit der neue Zustand erscheint (kein 3s-Warten).
    this._last[this._tab] = null;
    await this._tick();
  }

  async _searchRadio(query) {
    if (!this._hass) return;
    this._radioQuery = query || "";
    if (!this._radioQuery.trim()) { this._radioResults = null; this._safeRender(); return; }
    try {
      const res = await this._hass.callWS({
        type: WS_ACTION, module: "apply", action: "search_radio",
        params: { query: this._radioQuery },
      });
      this._radioResults = (res && res.result && res.result.results) || [];
    } catch (e) {
      this._radioResults = [];
      this._toast("Suche fehlgeschlagen: " + (e.message || e), true);
    }
    this._safeRender();
  }

  _safeRender() {
    try { this._render(); }
    catch (e) {
      // Letzte Verteidigung: niemals Blank-Page.
      const r = this.shadowRoot.getElementById("root");
      if (r) r.innerHTML = `<div class="err">Render-Fehler (Cockpit bleibt bedienbar):<br>${esc(e.message || e)}</div>`;
    }
  }

  _mod(env, key) { return ((env && env.modules) || {})[key] || { available: false, healthy: false }; }
  _modBadge(env, key, label) {
    const m = this._mod(env, key);
    const cls = !m.available ? "bad" : m.healthy ? "ok" : "warn";
    const txt = !m.available ? "missing" : m.healthy ? "healthy" : "degraded";
    return `<span class="mb ${cls}">${label}: ${txt}</span>`;
  }

  _render() {
    const env = this._data[this._tab];
    const [, , subtitle] = TAB_BY[this._tab];
    const ov = this._data.overview;                       // für Header-Badges (Shadow/Live)
    const applyEnabled = ov ? ov.data?.apply_enabled : (env?.data?.apply_enabled);
    const contract = (env && env.contract) || "benni_media.v1";
    const updated = (env && env.updated_at) ? new Date(env.updated_at).toLocaleTimeString("de-DE") : "—";

    const tabs = TABS.map(([id, label]) =>
      `<div class="tab ${id === this._tab ? "active" : ""}" data-tab="${id}">${label}</div>`).join("");

    const head = `
      <div class="head">
        <span class="title">Media</span>
        <span class="sub">${esc(subtitle)}</span>
        <span class="spacer"></span>
        <span class="chip">Benni</span>
        ${applyEnabled == null ? "" : `<span class="mb ${applyEnabled ? "live" : "shadow"}">${applyEnabled ? "LIVE" : "SHADOW"}</span>`}
        <span class="mods">
          ${this._modBadge(env, "state", "State")}
          ${this._modBadge(env, "policy", "Policy")}
          ${this._modBadge(env, "apply", "Apply")}
        </span>
        <span class="chip cy">${esc(contract)}</span>
      </div>
      <div class="sub">Stand: ${updated} · auto-refresh 3 s</div>
      <div class="tabs">${tabs}</div>
      <div class="tools">
        <input id="search" type="text" placeholder="Suche (Keys, Werte, Entity-IDs)…" value="${esc(this._search)}">
        <button id="raw" class="${this._raw ? "on" : ""}">Raw</button>
        <button id="refresh">Refresh</button>
        <button id="copy">Copy Diagnostics</button>
        ${applyEnabled == null ? "" :
          `<button class="${applyEnabled ? "disarm" : "arm"}" data-act="apply:set_apply_enabled" data-params='{"value":${applyEnabled ? "false" : "true"}}'>${applyEnabled ? "■ Apply scharf — Not-Aus" : "▶ Apply scharf schalten"}</button>`}
      </div>`;

    let body;
    if (this._err) body = this._errorCard("WS-Fehler", this._err);
    else if (!env) body = this._loading();
    else body = this[`_tab_${this._tab}`] ? this[`_tab_${this._tab}`](env) : this._loading();

    const raw = this._raw && env ? `<div class="card"><h2>Raw Envelope <button id="copyenv" style="float:right;margin-top:-4px;">Copy JSON</button></h2><pre>${esc(JSON.stringify(env, null, 2))}</pre></div>` : "";

    this.shadowRoot.getElementById("root").innerHTML = head + body + raw;
    this._wire();
  }

  _wire() {
    const $ = (id) => this.shadowRoot.getElementById(id);
    this.shadowRoot.querySelectorAll(".tab").forEach((el) =>
      el.onclick = () => { this._tab = el.dataset.tab; this._safeRender(); this._tick(); });
    if ($("raw")) $("raw").onclick = () => { this._raw = !this._raw; this._safeRender(); };
    if ($("refresh")) $("refresh").onclick = () => this._tick();
    if ($("refresh2")) $("refresh2").onclick = () => this._tick();
    if ($("search")) $("search").oninput = (e) => { this._search = e.target.value; this._filter(); };
    // Radio-Suche (MA): Eingabe puffern, Suchen/Enter ruft die Action, ✕ leert.
    if ($("radioq")) {
      $("radioq").oninput = (e) => { this._radioQuery = e.target.value; };
      $("radioq").onkeydown = (e) => { if (e.key === "Enter") this._searchRadio(this._radioQuery); };
    }
    if ($("radiosearch")) $("radiosearch").onclick = () => this._searchRadio(this._radioQuery);
    if ($("radioclear")) $("radioclear").onclick = () => { this._radioResults = null; this._radioQuery = ""; this._safeRender(); };
    const cp = (id, getText) => {
      const b = $(id);
      if (!b) return;
      b.onclick = async () => {
        const ok = await this._copy(getText());
        const t = b.textContent;
        b.textContent = ok ? "Kopiert ✓" : "Copy fehlgeschlagen";
        setTimeout(() => { b.textContent = t; }, 1200);
      };
    };
    cp("copy", () => JSON.stringify(this._data[this._tab] || {}, null, 2));
    cp("copyraw", () => JSON.stringify((this._data[this._tab]?.data?.raw) || {}, null, 2));
    cp("copyenv", () => JSON.stringify(this._data[this._tab] || {}, null, 2));
    // Quick-Actions: jedes [data-act="module:action"] (+ optional data-params JSON).
    this.shadowRoot.querySelectorAll("[data-act]").forEach((el) => {
      el.onclick = async () => {
        const [module, action] = (el.dataset.act || "").split(":");
        if (!module || !action) return;
        let params = {};
        try { params = el.dataset.params ? JSON.parse(el.dataset.params) : {}; } catch (e) { /* leer */ }
        el.disabled = true;
        await this._action(module, action, params);
        el.disabled = false;
      };
    });
    this._filter();
  }

  _filter() {
    const q = (this._search || "").toLowerCase();
    this.shadowRoot.querySelectorAll("[data-srch]").forEach((el) => {
      el.style.display = !q || el.getAttribute("data-srch").toLowerCase().includes(q) ? "" : "none";
    });
  }

  _devices(devices) {
    if (!devices || typeof devices !== "object") return `<div class="mut">Keine Geräte-Daten (media_state ≥ 0.3.0 nötig).</div>`;
    const tiles = DEVICE_ORDER.filter((id) => devices[id]).map((id) => {
      const d = devices[id];
      const np = d.title ? `${d.title}${d.artist ? " · " + d.artist : ""}` : (d.app || d.source || "");
      const extra = (np ? esc(np) : "") + (d.volume != null ? (np ? " · " : "") + pct(d.volume) : "");
      return `<div class="tile ${d.active ? "on" : "off"}" data-srch="${esc(DEVICE_LABEL[id] || id)} ${esc(d.state)} ${esc(np)}">
        <div class="nm"><ha-icon icon="${esc(d.icon || "")}" style="--mdc-icon-size:18px;vertical-align:middle;"></ha-icon> ${esc(DEVICE_LABEL[id] || id)}</div>
        <div class="vl">${esc(d.state || "—")}</div>
        ${extra ? `<div class="mut" style="margin-top:2px;">${extra}</div>` : ""}
      </div>`;
    }).join("");
    return `<div class="tiles">${tiles || `<div class="mut">—</div>`}</div>`;
  }

  _loading() { return `<div class="card"><div class="empty"><div class="mut">Lade Daten…</div></div></div>`; }

  _errorCard(title, msg) {
    return `<div class="card"><div class="empty">
      <div class="big">${esc(title)}</div>
      <div class="mut">${esc(msg)}</div>
      <button id="refresh2">Refresh</button>
    </div></div>`;
  }

  _missingCard(label, err) {
    return `<div class="card"><div class="empty">
      <div class="big">${esc(label)} nicht verfügbar</div>
      <div class="mut">${esc(err || "Modul nicht geladen oder keine Daten.")}</div>
      <button id="refresh2">Refresh</button>
    </div></div>`;
  }

  _rows(obj, only) {
    if (!obj || typeof obj !== "object") return `<div class="mut">—</div>`;
    const keys = only || Object.keys(obj);
    return keys.map((k) => {
      const v = obj[k];
      if (v != null && typeof v === "object") return "";
      const disp = typeof v === "boolean" ? yn(v) : num(v);
      return `<div class="row" data-srch="${esc(k)} ${esc(disp)}"><span class="k">${esc(k)}</span><span class="v">${esc(disp)}</span></div>`;
    }).join("");
  }

  // ---------- Tabs ----------
  _tab_overview(env) {
    const d = env.data || {};
    const t = d.targets || {};
    const tile = (nm, vl, on) => `<div class="tile ${on ? "on" : "off"}" data-srch="${esc(nm)} ${esc(vl)}"><div class="nm">${esc(nm)}</div><div class="vl">${esc(vl)}</div></div>`;
    // Volume-Formel-Breakdown (media_policy status().volume_formula) → Soll-Karten.
    const vf = (((d.raw || {}).policy || {}).volume_formula) || {};
    const sgn = (v) => (v == null ? "—" : (v > 0 ? "+" : "") + pct(v));
    const sollCard = (title, o, fb) => {
      // Fällt zurück auf den nackten Soll-Wert, falls keine Formel-Daten da sind.
      if (!o) return `<div class="card"><h2>${title}</h2><div class="kpi">${pct(fb)}</div></div>`;
      const mod = (label, v) => {
        const c = v == null || v === 0 ? "#6b7494" : (v < 0 ? "#f7768e" : "#9ece6a");
        return `<div class="row" data-srch="${esc(label)} ${esc(sgn(v))}"><span class="k">${label}</span><span class="v" style="color:${c};">${sgn(v)}</span></div>`;
      };
      return `<div class="card"><h2>${title}</h2>
        <div class="row" data-srch="Basis ${esc(pct(o.base))}"><span class="k">Basis</span><span class="v">${pct(o.base)}</span></div>
        ${mod("Szenario", o.scenario_offset)}
        ${mod("Fenster", o.window_offset)}
        ${mod("Aktivität", o.activity_offset)}
        ${mod("Nudge", o.manual_nudge)}
        ${mod("Boost", o.track_boost)}
        <div style="border-top:1px solid #2a2e3f;margin-top:10px;padding-top:10px;">
          <span class="kpi" style="color:#7dcfff;">${pct(o.result)}</span>
          <span class="mut" style="margin-left:10px;">Aktuelles Zielvolumen${o.plays ? "" : " · spielt nicht"}</span>
        </div>
      </div>`;
    };
    return `
      <div class="card hero"><h2>Aktuelles Szenario</h2>
        <div class="kpi acc">${esc(d.scenario || "—")}</div>
        <div class="mut">${esc(d.subcontext || "—")} · Gerät ${esc(d.device || "—")} · Gaming ${esc(d.gaming_source || "—")}</div>
        ${d.now_playing && d.now_playing.title ? `<div style="margin-top:8px;color:#9ece6a;font-size:14px;">♪ ${esc(d.now_playing.title)}${d.now_playing.artist ? " — " + esc(d.now_playing.artist) : ""}${d.now_playing.volume != null ? " · " + pct(d.now_playing.volume) : ""} <span class="mut">(${esc(d.now_playing.device)})</span></div>` : ""}
      </div>
      <div class="grid two" style="margin-top:14px;">
        <div class="card"><h2>Audio Owner</h2><div class="kpi">${esc(d.audio_owner || "—")}</div><div class="mut">Aktion: ${esc(d.action || "—")}</div></div>
        <div class="card"><h2>Volume Policy</h2><div class="kpi">${esc(d.volume_policy || "—")}</div></div>
      </div>
      <div class="grid two" style="margin-top:14px;">
        ${sollCard("HomePods Soll", vf.homepods, t.homepods_volume)}
        ${sollCard("Denon Soll", vf.denon, t.denon_volume)}
      </div>
      <div class="card" style="margin-top:14px;"><h2>Status</h2>
        <div class="tiles">
          ${tile("Apply", d.apply_enabled ? "LIVE" : "Shadow", d.apply_enabled)}
          ${tile("Quiet Mode", d.quiet_mode ? "an" : "aus", d.quiet_mode)}
          ${tile("Entertainment", d.entertainment_active ? "aktiv" : "aus", d.entertainment_active)}
          ${tile("Subwoofer", t.subwoofer_allowed ? "erlaubt" : "gesperrt", t.subwoofer_allowed)}
        </div>
      </div>
      <div class="card" style="margin-top:14px;"><h2>Quick-Actions</h2>
        <div class="actbar">
          <button class="act" data-act="state:toggle_private">Privat / Besuch umschalten</button>
          <span class="mut">${d.audio_owner === "private" ? "aktuell: privat (gedämpft)" : "schaltet den manuellen private_time-Trigger (FLEET-44)"}</span>
        </div>
      </div>
      <div class="card" style="margin-top:14px;"><h2>Geräte</h2>${this._devices(d.devices)}</div>`;
  }

  _tab_state(env) {
    const m = this._mod(env, "state");
    if (!m.available || !env.data) return this._missingCard("State", m.error);
    const d = env.data;          // media_state liefert FLACH (context = Szenario-String)
    const reasons = d.active_reasons || [];
    const ctx = d.context_cards || {};
    const cl = d.classifiers || {};
    const clRow = (label, o) => `<div class="row" data-srch="${esc(label)} ${esc(o && o.label)}"><span class="k">${label}</span><span class="v">${o && o.enum != null ? esc(o.enum) + " · " + esc(o.label || "—") : "—"}</span></div>`;
    return `
      <div class="card hero"><h2>Context Recognition</h2>
        <div class="kpi acc">${esc(d.context || d.media_scenario || "—")}</div>
        <div class="mut">${esc(d.subcontext || "—")} · Gerät ${esc(d.device || "—")} · Gaming ${esc(d.gaming_source || "—")}</div>
      </div>
      <div class="grid two" style="margin-top:14px;">
        <div class="card"><h2>Kontext (core_state)</h2>${Object.keys(ctx).length ? this._rows(ctx) : `<div class="mut">Kein Kontext-Echo (media_state ≥ 0.4.0 nötig).</div>`}</div>
        <div class="card"><h2>Classifier</h2>${clRow("PS5", cl.ps5)}${clRow("PC", cl.pc)}${clRow("HomePods", cl.homepods)}</div>
      </div>
      <div class="grid two" style="margin-top:14px;">
        <div class="card"><h2>Media-Flags</h2>${this._rows(d)}</div>
        <div class="card"><h2>Aktive Gründe</h2>
          <div class="reasons">${reasons.length ? reasons.map((r) => `<div data-srch="${esc(r)}">${esc(r)}</div>`).join("") : `<div class="mut">No active reasons</div>`}</div>
        </div>
      </div>
      <div class="card" style="margin-top:14px;"><h2>Geräte-Matrix</h2>${this._devices(d.devices)}</div>`;
  }

  _tab_policy(env) {
    const m = this._mod(env, "policy");
    if (!m.available || !env.data) return this._missingCard("Policy", m.error);
    const d = env.data;          // media_policy status(): Decision + reasons + volume_formula
    const sgn = (v) => (v == null ? "—" : (v > 0 ? "+" : "") + pct(v));
    const reasons = d.reasons || [];
    const why = reasons.length
      ? reasons.map((r) => `<div class="sev-${esc(r.severity || "ok")}" data-srch="${esc(r.text)}" style="padding:3px 0;font-size:13px;">● ${esc(r.text)}</div>`).join("")
      : `<div class="mut">—</div>`;
    const vf = d.volume_formula || {};
    const fcard = (name, o) => !o ? "" : `
      <div style="margin-bottom:10px;">
        <div class="mut" style="margin-bottom:2px;">${name}${o.plays ? "" : " · spielt nicht"}</div>
        <div class="row"><span class="k">Base</span><span class="v">${pct(o.base)}</span></div>
        <div class="row"><span class="k">Szenario</span><span class="v">${sgn(o.scenario_offset)}</span></div>
        <div class="row"><span class="k">Fenster</span><span class="v">${sgn(o.window_offset)}</span></div>
        <div class="row"><span class="k">Aktivität</span><span class="v">${sgn(o.activity_offset)}</span></div>
        <div class="row"><span class="k">Nudge</span><span class="v">${sgn(o.manual_nudge)}</span></div>
        <div class="row"><span class="k">Track-Boost</span><span class="v">${sgn(o.track_boost)}</span></div>
        <div class="row"><span class="k" style="color:#7dcfff;">→ Result</span><span class="v soll">${pct(o.result)}</span></div>
      </div>`;
    const nu = d.nudge || null;
    const nudgeCard = !nu ? "" : `
      <div class="card" style="margin-top:14px;"><h2>Lautstärke-Nudge (R21/R22)</h2>
        <div class="actbar">
          <button class="act" data-act="policy:nudge_volume" data-params='{"delta":-0.05}'>– leiser</button>
          <span class="nudgeval">${sgn(nu.manual_nudge)}</span>
          <button class="act" data-act="policy:nudge_volume" data-params='{"delta":0.05}'>+ lauter</button>
          <button class="act" data-act="policy:reset_nudge">Reset</button>
          <button class="act danger" data-act="policy:reset_boost" ${nu.boost_active ? "" : "disabled"}>Boost-Reset${nu.boost_suppressed ? " ✓" : ""}</button>
        </div>
        <div class="mut" style="margin-top:6px;">Nudge wirkt auf die spielende Seite (${sgn(nu.min)}…${sgn(nu.max)}). Boost-Reset dämpft den aktuellen Track-Boost bis zum Trackwechsel.${nu.boost_suppressed ? " · aktuell unterdrückt" : ""}</div>
      </div>`;
    return `
      <div class="card hero"><h2>Decision Engine</h2>
        <div class="kpi acc">${esc(d.volume_policy || "—")}</div>
        <div class="mut">Audio: ${esc(d.audio_owner || "—")} · Aktion: ${esc(d.action || "—")}${d.is_grind ? " · GRIND" : ""}${d.track_boost_applied ? " · Boost" : ""}${d.music_muted ? " · Mute" : ""}</div>
      </div>
      ${nudgeCard}
      <div class="grid two" style="margin-top:14px;">
        <div class="card"><h2>Why-Stack (Reasons)</h2>${why}</div>
        <div class="card"><h2>Volume-Ziele</h2>
          <div class="row"><span class="k">HomePods</span><span class="v soll">${pct(d.volume_target_homepods)}</span></div>
          <div class="row"><span class="k">Denon</span><span class="v soll">${pct(d.volume_target_denon)}</span></div>
          <div class="row"><span class="k">Subwoofer erlaubt</span><span class="v">${yn(d.subwoofer_allowed)}</span></div>
          <div class="row"><span class="k">Volume Apply erlaubt</span><span class="v">${yn(d.volume_apply_allowed)}</span></div>
        </div>
      </div>
      <div class="grid two" style="margin-top:14px;">
        <div class="card"><h2>Volume-Formel (R17)</h2>${(vf.homepods || vf.denon) ? (fcard("HomePods", vf.homepods) + fcard("Denon", vf.denon)) : `<div class="mut">Keine Formel-Daten (media_policy ≥ 0.5.0 nötig).</div>`}</div>
        <div class="card"><h2>Entscheidung (Details)</h2>${this._rows(d)}</div>
      </div>`;
  }

  _tab_apply(env) {
    const m = this._mod(env, "apply");
    if (!m.available || !env.data) return this._missingCard("Apply", m.error || "no apply data received");
    const d = env.data;
    const plan = d.plan || {}, gate = d.gates || {}, dev = d.devices || {}, nl = d.nachlauf || {};
    const db = d.debounce || {}, pp = db.plan || null;
    const live = !!d.execute;
    const radioDefaults = (d.radio && d.radio.defaults) || [];
    const radioBtn = (name, uri, extra) =>
      `<button class="act${extra || ""}" data-act="apply:play_radio" data-params='${esc(JSON.stringify({ media_id: uri }))}'>${esc(name)}</button>`;
    const results = (this._radioResults || []).map((r) =>
      `<div class="radio-hit" data-srch="${esc(r.name)}">
        ${r.image ? `<img src="${esc(r.image)}" loading="lazy" alt="">` : `<span class="radio-ph">📻</span>`}
        <span class="radio-name">${esc(r.name)}${r.favorite ? " ★" : ""}</span>
        ${radioBtn("▶", r.uri, " mini")}
      </div>`).join("");
    const radioCard = `
      <div class="card" style="margin-top:14px;"><h2>Radio</h2>
        <div class="mut">Shortcut spielt sofort (manuell, unabhängig vom Shadow-Gate).</div>
        <div class="radio-shortcuts">${radioDefaults.map((s) => radioBtn(s.name, s.uri)).join("") || `<span class="mut">Keine Default-Sender.</span>`}</div>
        <div class="radio-search">
          <input id="radioq" type="text" placeholder="Sender suchen (Music Assistant)…" value="${esc(this._radioQuery)}">
          <button id="radiosearch">Suchen</button>
          ${this._radioResults != null ? `<button id="radioclear" class="mini">✕</button>` : ""}
        </div>
        ${this._radioResults != null ? `<div class="radio-results">${results || `<div class="mut">Keine Treffer.</div>`}</div>` : ""}
      </div>`;
    const ppRow = pp
      ? `<div class="row"><span class="k">Nächste Aktion</span><span class="v">${esc(pp.homepods_action || "—")} · HP ${pct(pp.homepods_target)} · Denon ${pct(pp.denon_target)}${pp.subwoofer_set != null ? " · Sub " + yn(pp.subwoofer_set) : ""}${pp.quiet_override ? " · quiet" : ""}</span></div>`
      : `<div class="mut">Kein gepufferter Plan.</div>`;
    const devRow = (nm, o) => o ? `<div class="row" data-srch="${esc(nm)}"><span class="k">${esc(nm)}</span><span class="v">${esc(o.state ?? "—")}${o.volume != null ? " · " + pct(o.volume) : ""}</span></div>` : "";
    const log = (d.log || []).map((e) =>
      `<div data-srch="${esc(e.action)}">${esc((e.ts || "").slice(11, 19))} · ${esc(e.action || "—")} ${e.homepods_target != null ? "HP→" + pct(e.homepods_target) : ""} ${e.denon_target != null ? "Denon→" + pct(e.denon_target) : ""} <span class="${e.executed ? "sev-ok" : "sev-warn"}">${e.executed ? "live" : "shadow"}</span></div>`).join("");
    return `
      <div class="card hero"><h2>Apply Gate</h2>
        <div class="kpi acc">${live ? "LIVE — führt aus" : "SHADOW — plant nur"}</div>
        <div class="mut">apply_enabled ${yn(d.apply_enabled)} · volume_apply_allowed ${yn(gate.volume_apply_allowed)} · → execute ${yn(gate.execute)}</div>
      </div>
      <div class="grid two" style="margin-top:14px;">
        <div class="card"><h2>Ist / Soll</h2>${devRow("HomePods", dev.homepods)}${devRow("Denon", dev.denon)}${devRow("Subwoofer", dev.subwoofer)}
          <div class="row"><span class="k">Action (Soll)</span><span class="v">${esc(plan.homepods_action || "—")} · HP ${pct(plan.homepods_target)} · Denon ${pct(plan.denon_target)}</span></div>
          <div class="mut">Ramp ${num(d.ramp_step)}/${num(d.ramp_total)} · Quiet-Override ${yn(plan.quiet_override)}</div>
        </div>
        <div class="card"><h2>Apply-Log</h2><div class="log">${log || `<div class="mut">Noch keine Aktionen.</div>`}</div></div>
      </div>
      <div class="card" style="margin-top:14px;"><h2>Debounce / Queue</h2>
        <div class="row"><span class="k">Status</span><span class="v">${db.pending ? "wartet" : "Leerlauf"}</span></div>
        <div class="row"><span class="k">Fenster</span><span class="v">${num(db.window_s)} s</span></div>
        <div class="row"><span class="k">Restzeit</span><span class="v">${db.remaining_s != null ? db.remaining_s + " s" : "—"}</span></div>
        ${ppRow}
        <div class="mut">Trigger-Bursts werden zu einer Aktion konsolidiert · Quiet bricht sofort durch</div>
      </div>
      ${radioCard}
      <div class="card" style="margin-top:14px;"><h2>Denon-Nachlauf</h2>${this._rows(nl, ["active", "pc_armed", "tv_armed", "tv_paused", "pc_power_on", "tv_power_on", "bio_sleep"])}</div>`;
  }

  _tab_diagnostics(env) {
    const d = env.data || {};
    const mods = env.modules || {};
    const modRows = Object.entries(mods).map(([k, v]) =>
      `<div class="row" data-srch="${esc(k)}"><span class="k">${esc(k)}</span><span class="v ${v.healthy ? "sev-ok" : v.available ? "sev-warn" : "sev-blocked"}">${v.available ? (v.healthy ? "healthy" : "degraded") : "missing"}${v.error ? " · " + esc(v.error) : ""}</span></div>`).join("");
    const sevCls = (s) => s === "bound" ? "sev-ok" : s === "unavailable" ? "sev-warn" : s === "missing" ? "sev-blocked" : "mut";
    const bind = d.bindings || {};
    const issues = d.issues || [];
    const bindCard = (mod) => {
      const rows = (bind[mod] || []).map((b) =>
        `<div class="row" data-srch="${esc(b.key)} ${esc(b.entity_id)} ${esc(b.status)}"><span class="k">${esc(b.key)}</span><span class="vwrap"><span class="v">${esc(b.entity_id || "—")}</span><span class="hint ${sevCls(b.status)}">${esc(b.status)}${b.state != null ? " · " + esc(b.state) : ""}</span></span></div>`).join("");
      return `<div class="card"><h2>Bindings · ${mod}</h2>${rows || `<div class="mut">—</div>`}</div>`;
    };
    const issueRows = issues.length
      ? issues.map((i) => `<div class="${sevCls(i.status)}" data-srch="${esc(i.module)} ${esc(i.key)} ${esc(i.entity_id)}" style="padding:3px 0;font-size:13px;">● ${esc(i.module)} · ${esc(i.key)} → ${esc(i.entity_id || "(unbound)")} <b>[${esc(i.status)}]</b></div>`).join("")
      : `<div class="sev-ok">Alle Bindings ok ✓</div>`;
    return `
      <div class="grid two">
        <div class="card"><h2>Modulstatus</h2>${modRows || `<div class="mut">—</div>`}</div>
        <div class="card"><h2>Binding-Probleme (${issues.length})</h2>${issueRows}</div>
      </div>
      <div class="grid" style="grid-template-columns:1fr 1fr 1fr; margin-top:14px;">
        ${bindCard("state")}${bindCard("policy")}${bindCard("apply")}
      </div>
      <div class="card" style="margin-top:14px;"><h2>Raw Snapshots <button id="copyraw" style="float:right;margin-top:-4px;">Copy JSON</button></h2><pre>${esc(JSON.stringify(d.raw || {}, null, 2))}</pre></div>`;
  }
}

customElements.define("benni-media-app", BenniMediaApp);
