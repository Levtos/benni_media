import { useCallback, useEffect, useRef, useState } from "react";
import { loadCockpit } from "./api";
import type { CockpitData, HassLike } from "./types";

export function useCockpit(hass: HassLike) {
  const [data, setData] = useState<CockpitData>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const mounted = useRef(true);
  const refresh = useCallback(async (quiet = false) => {
    if (!quiet) setLoading(true);
    try {
      const next = await loadCockpit(hass);
      if (mounted.current) { setData(next); setError(null); }
    } catch (reason) {
      if (mounted.current) setError(reason instanceof Error ? reason.message : String(reason));
    } finally { if (mounted.current && !quiet) setLoading(false); }
  }, [hass]);

  useEffect(() => {
    mounted.current = true;
    const initial = window.setTimeout(() => void refresh(), 0);
    const timer = window.setInterval(() => void refresh(true), 5000);
    return () => { mounted.current = false; window.clearTimeout(initial); window.clearInterval(timer); };
  }, [refresh]);

  return { data, setData, loading, error, refresh };
}
