import { render, screen } from "@testing-library/react";
import { VolumeBreakdown, humanReason } from "./components";

describe("VolumeBreakdown", () => {
  it("renders percentage-point formula without dB", () => {
    render(<VolumeBreakdown name="Denon" data={{ base: .3, scenario_offset: -.12, window_offset: -.05, result: .13 }} />);
    expect(screen.getByText("= 13 %")).toBeInTheDocument();
    expect(screen.getByText("12 Szenario / Grind")).toBeInTheDocument();
    expect(document.body.textContent).not.toContain("dB");
  });
});

describe("humanReason", () => {
  it("translates stable technical reasons", () => expect(humanReason("window:tilted")).toBe("Fenster gekippt, Lautstärke reduziert."));
});
