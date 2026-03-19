import { byId, setHTML } from "../dom.js";
import { renderConclusionsSection } from "../renderers/conclusions.js";

export function initConclusions(data) {
  const container = byId("conclusions-content");
  if (!container) return;

  setHTML(container, renderConclusionsSection(data));
}
