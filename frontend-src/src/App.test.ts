import { mayLeaveRules } from "./App";

it("warns before navigating away with unsaved rule changes", () => {
  const confirm = vi.spyOn(window, "confirm").mockReturnValue(false);
  expect(mayLeaveRules(true)).toBe(false);
  expect(confirm).toHaveBeenCalledWith("Es gibt ungespeicherte Änderungen. Seite wirklich verlassen?");
  expect(mayLeaveRules(false)).toBe(true);
  confirm.mockRestore();
});
