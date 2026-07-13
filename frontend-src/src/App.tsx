import { useEffect, useState } from "react";
import { AppShell } from "./AppShell";
import { Card, EmptyState, Icon } from "./components";
import { useCockpit } from "./useCockpit";
import type { HassLike, MatrixData, PageId } from "./types";
import { OverviewPage } from "./pages/OverviewPage";
import { MusicPage } from "./pages/MusicPage";
import { GamingPage } from "./pages/GamingPage";
import { TvPage } from "./pages/TvPage";
import { RulesPage } from "./pages/RulesPage";
import { DiagnosticsPage } from "./pages/DiagnosticsPage";

const pageFromHash = (): PageId => {
  const value = window.location.hash.replace("#", "") as PageId;
  return ["overview", "music", "gaming", "tv", "rules", "diagnostics"].includes(value) ? value : "overview";
};

export function App({ hass }: { hass: HassLike }) {
  const [page, setPage] = useState<PageId>(pageFromHash()); const { data, setData, loading, error, refresh } = useCockpit(hass);
  useEffect(() => { const handler = () => setPage(pageFromHash()); window.addEventListener("hashchange", handler); return () => window.removeEventListener("hashchange", handler); }, []);
  const navigate = (next: PageId) => { window.location.hash = next; setPage(next); };
  const onMatrix = (matrix: MatrixData) => setData((current) => ({ ...current, matrix }));
  const state = data.state?.data || data.overview?.data?.raw?.state; const policy = data.policy?.data || data.overview?.data?.raw?.policy; const apply = data.apply?.data || data.overview?.data?.raw?.apply;
  let content;
  if (loading && !data.overview) content = <Card><div className="loading"><Icon.RefreshCw className="spin" /><span>Media-Cockpit wird geladen …</span></div></Card>;
  else if (error && !data.overview) content = <Card><EmptyState icon={Icon.AlertTriangle} title="Cockpit nicht erreichbar" text={error} /></Card>;
  else if (page === "overview") content = <OverviewPage data={data.overview?.data} hass={hass} onChanged={() => void refresh(true)} />;
  else if (page === "music") content = <MusicPage state={state} policy={policy} apply={apply} hass={hass} onChanged={() => void refresh(true)} />;
  else if (page === "gaming") content = <GamingPage state={state} policy={policy} />;
  else if (page === "tv") content = <TvPage state={state} policy={policy} />;
  else if (page === "rules") content = <RulesPage matrix={data.matrix} apply={apply} hass={hass} onMatrix={onMatrix} />;
  else content = <DiagnosticsPage data={data} />;
  return <AppShell page={page} onPage={navigate} updatedAt={data.overview?.updated_at} modulesHealth={data.overview?.modules || data.state?.modules} onRefresh={() => void refresh()} refreshing={loading}>{content}</AppShell>;
}
