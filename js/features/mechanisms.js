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
        on(card, "click", () => card.classList.toggle("rc-open"));
      });
      return;
    }

    container.querySelectorAll(".case-item").forEach((item) => {
      on(item, "click", () => item.classList.toggle("ci-open"));
    });
  }

  render();
}
