import { fireEvent, render, screen } from "@testing-library/react";
import { Artwork } from "./components";
import { redactArtwork, resolveArtworkUrl } from "./artwork";

describe("artwork transport", () => {
  it.each([
    ["https://example.com/radio.jpg", "https://example.com/radio.jpg"],
    ["http://example.com/cover.jpg", "http://example.com/cover.jpg"],
    ["/api/media_player_proxy/media_player.example?cache=test", "https://ha.example/api/media_player_proxy/media_player.example?cache=test"],
    ["local/radio.jpg", "https://ha.example/local/radio.jpg"],
    ["//example.com/radio.jpg", "https://example.com/radio.jpg"],
    ["data:image/png;base64,example", "data:image/png;base64,example"],
  ])("resolves %s", (input, output) => {
    expect(resolveArtworkUrl(input, "https://ha.example").url).toBe(output);
  });

  it.each(["image://unobserved", "other://example", "javascript:alert(1)", "data:text/html,test", "http://[", "https://user:pass@example.com/cover", " "])("rejects unusable input without origin-prefixing: %s", (input) => {
    expect(resolveArtworkUrl(input, "https://ha.example").url).toBeUndefined();
    expect(resolveArtworkUrl(input, "https://ha.example").reason).toBeTruthy();
  });
});

describe("Artwork", () => {
  it("falls from observed private HTTP MA artwork to HA's provided proxy", () => {
    const candidates = [
      { source: "entity_picture", url: "http://192.0.2.1:8095/imageproxy/example?size=512&fmt=png" },
      { source: "entity_picture_local", url: "/api/media_player_proxy/media_player.example?cache=test" },
    ];
    const { container } = render(<Artwork kind="music" title="Track" src={candidates[0].url} candidates={candidates} />);
    const first = container.querySelector("img")!;
    expect(first.src).toBe(candidates[0].url);
    fireEvent.error(first);
    const second = container.querySelector("img")!;
    expect(second.src).toContain("/api/media_player_proxy/");
    expect(screen.queryByText("Artwork nicht verfügbar")).not.toBeInTheDocument();
    fireEvent.load(second);
    const root = container.querySelector(".artwork")!;
    expect(root).toHaveAttribute("data-artwork-state", "ready");
    expect(root).toHaveAttribute("data-artwork-source", "entity_picture_local");
    expect(root.getAttribute("title")).toContain("entity_picture: load_failed");
    expect(root.getAttribute("title")).not.toContain("192.0.2");
    expect(root.getAttribute("title")).not.toContain("cache=");
  });

  it("keeps successful radio HTTPS artwork without trying its fallback", () => {
    const { container } = render(<Artwork kind="music" src="https://example.com/radio.jpg" candidates={[{ url: "/api/media_player_proxy/media_player.example", source: "entity_picture_local" }]} />);
    fireEvent.load(container.querySelector("img")!);
    expect(container.querySelector("img")).toHaveAttribute("src", "https://example.com/radio.jpg");
  });

  it("skips unknown schemes and waits for all usable candidates before placeholder", () => {
    const { container } = render(<Artwork kind="music" src="unknown://not-a-relative-path" candidates={[{ url: "/local/cover.jpg", source: "entity_picture" }]} />);
    expect(container.querySelector("img")!.src).toContain("/local/cover.jpg");
    expect(container.querySelector(".artwork")!.getAttribute("title")).toContain("unsupported_scheme");
    fireEvent.error(container.querySelector("img")!);
    expect(screen.getByText("Artwork nicht verfügbar")).toBeInTheDocument();
    expect(container.querySelector("img")).toBeNull();
  });

  it("shows the existing placeholder when nothing was supplied", () => {
    render(<Artwork kind="music" />);
    expect(screen.getByText("Artwork nicht verfügbar")).toBeInTheDocument();
  });

  it("does not retry on polling renders, but retries a new track with a reused URL", () => {
    const { container, rerender } = render(<Artwork kind="music" title="First" src="/local/cover.jpg" />);
    fireEvent.error(container.querySelector("img")!);
    rerender(<Artwork kind="music" title="First" src="/local/cover.jpg" />);
    expect(container.querySelector("img")).toBeNull();
    rerender(<Artwork kind="music" title="Second" src="/local/cover.jpg" />);
    expect(container.querySelector("img")).not.toBeNull();
  });

  it("sanitizes source labels and diagnostic exports without changing render inputs", () => {
    const input = { now_playing: { artwork_url: "https://private.example/image?token=example", artwork_candidates: [{ url: "https://private.example/image?token=example", source: "https://private.example" }] } };
    const output = JSON.stringify(redactArtwork(input));
    expect(output).not.toContain("private.example");
    expect(output).not.toContain("token=");
    expect(output).toContain("candidate");
    expect(input.now_playing.artwork_url).toContain("token=");
  });
});
