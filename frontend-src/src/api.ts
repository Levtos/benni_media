import type { CockpitData, HassLike, MatrixData } from "./types";

export const WS = {
  overview: "benni_media/get_overview",
  state: "benni_media/get_state",
  policy: "benni_media/get_policy",
  apply: "benni_media/get_apply",
  diagnostics: "benni_media/get_diagnostics",
  matrix: "benni_media_policy/get_matrix",
  setMatrix: "benni_media_policy/set_matrix",
  resetMatrix: "benni_media_policy/reset_matrix",
  setScalars: "benni_media_policy/set_scalars",
  action: "benni_media/action"
} as const;

export async function loadCockpit(hass: HassLike): Promise<CockpitData> {
  const [overview, state, policy, apply, diagnostics, matrix] = await Promise.allSettled([
    hass.callWS({ type: WS.overview }), hass.callWS({ type: WS.state }), hass.callWS({ type: WS.policy }),
    hass.callWS({ type: WS.apply }), hass.callWS({ type: WS.diagnostics }), hass.callWS<MatrixData>({ type: WS.matrix })
  ]);
  const value = <T,>(item: PromiseSettledResult<T>): T | undefined => item.status === "fulfilled" ? item.value : undefined;
  return { overview: value(overview), state: value(state), policy: value(policy), apply: value(apply), diagnostics: value(diagnostics), matrix: value(matrix) };
}

export async function dispatchAction(hass: HassLike, module: "state" | "policy" | "apply", action: string, params: Record<string, unknown> = {}) {
  return hass.callWS({ type: WS.action, module, action, params });
}

export const setMatrix = (hass: HassLike, patch: Record<string, unknown>) => hass.callWS<MatrixData>({ type: WS.setMatrix, patch });
export const setScalars = (hass: HassLike, patch: Record<string, number>) => hass.callWS<MatrixData>({ type: WS.setScalars, patch });
export const resetMatrix = (hass: HassLike) => hass.callWS<MatrixData>({ type: WS.resetMatrix });
export const getMatrix = (hass: HassLike) => hass.callWS<MatrixData>({ type: WS.matrix });
