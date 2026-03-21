import { byId, on, setHTML } from "../dom.js";
import {
  renderRegimesSection,
  renderRegimesCards,
  renderRegimesTable,
  renderRegimesObjections,
} from "../renderers/regimes.js";

export function initRegimes(data) {
  const container = byId("regimes-container");
  if (!container) return;

  setHTML(container, renderRegimesSection(data));

  let mode = "cards";

  function renderContent() {
    const content = byId("regimes-content");
    if (!content) return;

    if (mode === "cards") setHTML(content, renderRegimesCards(data));
    else if (mode === "table") setHTML(content, renderRegimesTable(data));
    else setHTML(content, renderRegimesObjections(data));

    if (mode === "cards") {
      content.querySelectorAll(".regime-card").forEach((card) => {
        const body = card.querySelector(".regime-card-body");
        const head = card.querySelector(".regime-card-head");
        const chev = card.querySelector(".regime-chev");

        if (body) body.style.display = "none";
        head?.setAttribute("aria-expanded", "false");

        function toggle() {
          const isOpen = body?.style.display !== "none";
          content.querySelectorAll(".regime-card-body").forEach((element) => {
            element.style.display = "none";
          });
          content.querySelectorAll(".regime-chev").forEach((element) => {
            element.style.transform = "";
          });
          content.querySelectorAll(".regime-card-head").forEach((element) => {
            element.setAttribute("aria-expanded", "false");
          });

          if (!isOpen && body) {
            body.style.display = "block";
            if (chev) chev.style.transform = "rotate(90deg)";
            head?.setAttribute("aria-expanded", "true");
          }
        }

        on(head, "click", toggle);
        on(head, "keydown", (event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            toggle();
          }
        });
      });
    }
  }

  on(container, "click", (event) => {
    const button = event.target.closest("[data-rmode]");
    if (!button) return;
    mode = button.dataset.rmode;
    container
      .querySelectorAll("[data-rmode]")
      .forEach((item) => item.classList.toggle("active", item.dataset.rmode === mode));
    renderContent();
  });

  renderContent();
}
