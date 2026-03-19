import { byId, on, setHTML } from "../dom.js";
import { renderTransitionSection } from "../renderers/transition.js";

export function initTransit(data) {
  const container = byId("transit-content");
  if (!container) return;

  setHTML(container, renderTransitionSection(data));
  container.querySelectorAll(".transit-scenario").forEach((scenario) => {
    const head = scenario.querySelector(".transit-head");
    on(head, "click", () => scenario.classList.toggle("open"));
  });
}
