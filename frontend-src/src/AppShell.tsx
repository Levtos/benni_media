import { useState, type ReactNode } from "react";
import { Icon, pageInfo, StatusDot } from "./components";
import type { ModuleHealth, PageId } from "./types";

const modules = [
  { label: "Klima", icon: Icon.CloudSun }, { label: "Medien", icon: Icon.AudioLines, active: true }, { label: "Licht", icon: Icon.Lightbulb },
  { label: "Beschattung", icon: Icon.SunMedium }, { label: "Sicherheit", icon: Icon.ShieldCheck }, { label: "System", icon: Icon.Settings2 }
];

export function AppShell({ page, onPage, children, updatedAt, modulesHealth = {}, onRefresh, refreshing }: {
  page: PageId; onPage: (page: PageId) => void; children: ReactNode; updatedAt?: string; modulesHealth?: Record<string, ModuleHealth>; onRefresh: () => void; refreshing?: boolean;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const current = pageInfo[page];
  return <div className="app-shell">
    <header className="topbar">
      <div className="brand"><div className="brand-mark"><Icon.House size={17} /></div><span>Benni Home</span></div>
      <nav className="module-nav" aria-label="Module">{modules.map(({ label, icon: ModuleIcon, active }) => <button key={label} className={active ? "active" : ""} disabled={!active} title={!active ? `${label} folgt später` : undefined}><ModuleIcon size={19} /><span>{label}</span></button>)}</nav>
      <div className="top-status"><Icon.BellRing size={19} /><span className="avatar">B</span><div><b>Benni</b><small>zuhause</small></div></div>
      <button className="mobile-menu" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Navigation öffnen"><Icon.Menu size={20} /></button>
    </header>
    <aside className={`sidebar ${mobileOpen ? "open" : ""}`}>
      <div className="sidebar-title"><span>Medien</span><button onClick={() => setMobileOpen(false)}><Icon.X size={18} /></button></div>
      <nav aria-label="Medien">{(Object.keys(pageInfo) as PageId[]).map((id) => { const item = pageInfo[id]; const NavIcon = item.icon; return <button key={id} className={id === page ? "active" : ""} onClick={() => { onPage(id); setMobileOpen(false); }}><NavIcon size={19} /><span>{item.label}</span></button>; })}</nav>
      <div className="sidebar-health"><span>Stack-Status</span>{["state", "policy", "apply"].map((name) => <div key={name}><StatusDot health={modulesHealth[name]} />{name}</div>)}</div>
    </aside>
    {mobileOpen && <button className="scrim" onClick={() => setMobileOpen(false)} aria-label="Navigation schließen" />}
    <main>
      <div className="page-header"><div><h1>{current.label}</h1><p>{current.sub}</p></div><div className="page-meta"><span>Letzte Aktualisierung<br /><b>{updatedAt ? new Intl.DateTimeFormat("de-DE", { dateStyle: "short", timeStyle: "medium" }).format(new Date(updatedAt)) : "—"}</b></span><button onClick={onRefresh} disabled={refreshing} aria-label="Aktualisieren"><Icon.RefreshCw className={refreshing ? "spin" : ""} size={19} /></button></div></div>
      <div className="page-content">{children}</div>
    </main>
    <footer><span>benni_media · React/Vite Cockpit</span><span><StatusDot health={modulesHealth.policy} /> Media Stack</span><span>Umbrella UX</span></footer>
  </div>;
}
