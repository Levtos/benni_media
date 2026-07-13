import { loadCockpit, WS } from "./api";
import type { HassLike } from "./types";

it("keeps partial pages available when one backend endpoint is absent", async () => {
  const hass: HassLike = { callWS: async <T,>({ type }: Record<string, unknown>) => { if (type === WS.matrix) throw new Error("missing"); return { type } as T; } };
  const result = await loadCockpit(hass);
  expect(result.overview).toEqual({ type: WS.overview });
  expect(result.matrix).toBeUndefined();
});
