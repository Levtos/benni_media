import { mayLeaveRules, resolveSnapshots } from "./App";

it("warns before navigating away with unsaved rule changes", () => {
  const confirm = vi.spyOn(window, "confirm").mockReturnValue(false);
  expect(mayLeaveRules(true)).toBe(false);
  expect(confirm).toHaveBeenCalledWith("Es gibt ungespeicherte Änderungen. Seite wirklich verlassen?");
  expect(mayLeaveRules(false)).toBe(true);
  confirm.mockRestore();
});

it("normalizes explicit null module snapshots after a backend failure", () => {
  expect(resolveSnapshots({
    state: { data: null } as never,
    policy: { data: null } as never,
    apply: { data: null } as never,
    overview: { data: { raw: { state: null, policy: null, apply: null } } } as never,
  })).toEqual({ state: {}, policy: {}, apply: {} });
});
