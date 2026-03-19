import { byId, on, setHTML } from "../dom.js";
import { renderEconomySection } from "../renderers/economy.js";

export function initEconomics(data) {
  const container = byId("econ-content");
  if (!container) return;

  setHTML(container, renderEconomySection(data));
  container.querySelectorAll(".econ-card").forEach((card) => {
    on(card, "click", () => card.classList.toggle("open"));
  });
}
