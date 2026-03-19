import { byId, on, setHTML } from "../dom.js";
import { renderPropagandaSection } from "../renderers/propaganda.js";

export function initPropaganda(data) {
  const container = byId("prop-content");
  if (!container) return;

  setHTML(container, renderPropagandaSection(data));
  container.querySelectorAll(".prop-technique").forEach((item) => {
    on(item, "click", () => {
      item.classList.toggle("open");
      item.querySelector(".prop-tech-body")?.classList.toggle("open");
    });
  });
}
