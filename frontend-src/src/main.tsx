import { createRoot, type Root } from "react-dom/client";
import { App } from "./App";
import styles from "./styles.css?inline";
import type { HassLike } from "./types";

class BenniMediaApp extends HTMLElement {
  private root?: Root;
  private appHost?: HTMLDivElement;
  private _hass?: HassLike;

  set hass(value: HassLike) { this._hass = value; this.renderApp(); }
  get hass(): HassLike { return this._hass!; }
  connectedCallback() { if (!this.shadowRoot) { const shadow = this.attachShadow({ mode: "open" }); const style = document.createElement("style"); style.textContent = styles; shadow.append(style); this.appHost = document.createElement("div"); shadow.append(this.appHost); } this.renderApp(); }
  disconnectedCallback() { this.root?.unmount(); this.root = undefined; }
  private renderApp() { const hass = this._hass; if (!this.isConnected || !hass || !this.appHost) return; if (!this.root) this.root = createRoot(this.appHost); this.root.render(<App hass={hass} />); }
}

if (!customElements.get("benni-media-app")) customElements.define("benni-media-app", BenniMediaApp);
