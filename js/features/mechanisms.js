import { byId, on, setHTML } from "../dom.js";
import {
  renderLoyaltyDetail,
  renderLoyaltySection,
} from "../renderers/loyalty.js";

export function initMechanisms(data) {
  const container = byId("mech-container");
  if (!container) return;

  const { mechs, roles, cases } = data;
  let mode = "trap";
  let selMech = null;

  on(container, "click", (event) => {
    if (!event.target.closest(".detail-close") || mode !== "trap") return;
    selMech = null;
    container
      .querySelectorAll(".trap-node-g")
      .forEach((item) => item.classList.remove("trap-sel"));
    setHTML(byId("mech-detail-out"), renderLoyaltyDetail(null, { mechs }));
  });

  on(container, "keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;

    if (mode === "trap") {
      const node = event.target.closest(".trap-node-g[data-mech]");
      if (!node) return;
      event.preventDefault();
      node.click();
      return;
    }

    if (mode === "roles") {
      const card = event.target.closest(".role-card");
      if (!card) return;
      event.preventDefault();
      card.click();
      return;
    }

    const item = event.target.closest(".case-item");
    if (!item) return;
    event.preventDefault();
    item.click();
  });

  function render() {
    setHTML(
      container,
      renderLoyaltySection({
        mode,
        selMech,
        mechs,
        roles,
        cases,
      })
    );

    container.querySelectorAll("[data-mode]").forEach((button) => {
      on(button, "click", () => {
        mode = button.dataset.mode;
        selMech = null;
        render();
      });
    });

    if (mode === "trap") {
      container.querySelectorAll(".trap-node-g[data-mech]").forEach((node) => {
        on(node, "click", () => {
          const id = node.dataset.mech;
          selMech = id;
          container
            .querySelectorAll(".trap-node-g")
            .forEach((item) => item.classList.remove("trap-sel"));
          container
            .querySelectorAll(`[data-mech="${id}"]`)
            .forEach((item) => item.classList.add("trap-sel"));
          setHTML(byId("mech-detail-out"), renderLoyaltyDetail(id, { mechs }));
        });
      });
      return;
    }

    if (mode === "roles") {
      container.querySelectorAll(".role-card").forEach((card) => {
        on(card, "click", () => {
          card.classList.toggle("rc-open");
          card.setAttribute(
            "aria-expanded",
            card.classList.contains("rc-open") ? "true" : "false"
          );
        });
      });
      return;
    }

    container.querySelectorAll(".case-item").forEach((item) => {
      on(item, "click", () => {
        item.classList.toggle("ci-open");
        item.setAttribute(
          "aria-expanded",
          item.classList.contains("ci-open") ? "true" : "false"
        );
      });
    });
  }

  render();
}
