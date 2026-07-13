import { fireEvent, render, screen } from "@testing-library/react";
import { RulesPage } from "./RulesPage";
import type { HassLike, MatrixData } from "../types";

const matrix: MatrixData = {
  catalog: { dayphases: ["early_morning"], scenarios: ["off", "private", "gaming", "tv", "music"], scenario_labels: { off: "Aus", private: "Privat", gaming: "Gaming", tv: "TV", music: "Musik" }, activities: ["work_home", "work_away"], devices: ["homepods", "denon"] },
  base: { homepods: { early_morning: .25 }, denon: { early_morning: .2 } },
  scenario_off: { homepods: { off: 0, private: 0, gaming: 0, tv: 0, music: 0 }, denon: { off: 0, private: 0, gaming: -.1, tv: 0, music: 0 } },
  activity_off: { homepods: {}, denon: {} },
  scalars: { opening_offset_homepods: -.05, opening_offset_denon: -.05, grind_homepods_offset: 0, grind_denon_offset: -.1, private_denon_cap: .15, ducked_target: .1, boost_offset: .15, homepods_max: .65, denon_max: .7, active_min: .05 },
  override: {},
};
const hass: HassLike = { callWS: async <T,>() => matrix as T };

it("shows the canonical activity inventory and separates special modes", () => {
  render(<RulesPage matrix={matrix} hass={hass} onMatrix={() => undefined} />);
  expect(screen.getByText("Geschlossen")).toBeInTheDocument();
  expect(screen.getByText("Gekippt")).toBeInTheDocument();
  expect(screen.getByText("Offen")).toBeInTheDocument();
  expect(screen.getByText("Freizeit")).toBeInTheDocument();
  expect(screen.getByText("Haushalt")).toBeInTheDocument();
  expect(screen.queryByText("Privat")).not.toBeInTheDocument();
  fireEvent.click(screen.getByRole("button", { name: "Gaming-Modi" }));
  expect(screen.getByText("Gaming Grind")).toBeInTheDocument();
  expect(screen.getByText("Immer gesperrt · nicht editierbar")).toBeInTheDocument();
  expect(screen.getByText("Spielton über Headset")).toBeInTheDocument();
});

it("translates private diagnostics and names the exact matrix reset scope", () => {
  const confirm = vi.spyOn(window, "confirm").mockReturnValue(false);
  render(<RulesPage matrix={matrix} state={{ private_blocked_reason: "auto_blocked:denon_off" }} hass={hass} onMatrix={() => undefined} />);
  fireEvent.click(screen.getByRole("button", { name: "Caps & Private Time" }));
  expect(screen.getByText("Automatischer Eintritt blockiert: Denon ist ausgeschaltet.")).toBeInTheDocument();
  fireEvent.click(screen.getByRole("button", { name: "Matrixwerte auf Standard zurücksetzen" }));
  expect(confirm).toHaveBeenCalledWith(expect.stringContaining("Szenario-Offsets einschließlich Gaming Normal"));
  expect(confirm).toHaveBeenCalledWith(expect.stringContaining("Fensterwerte, Grind-Offsets, Private-Time-Cap"));
  confirm.mockRestore();
});

it("does not invent a waking offset when the contract is absent", () => {
  render(<RulesPage matrix={matrix} hass={hass} onMatrix={() => undefined} />);
  fireEvent.click(screen.getByRole("button", { name: "Delays, Sleep & Waking" }));
  expect(screen.getByText("Waking-Offset: Contract fehlt")).toBeInTheDocument();
  expect(screen.getByText("waking_homepods_offset")).toBeInTheDocument();
});
