import { byId, on, setHTML } from "../dom.js";
import { renderClanDetail, renderClansSection } from "../renderers/clans.js";

export function initClans(data) {
  const container = byId("clan-container");
  if (!container) return;

  const { C, BG, clans, relations, POS, NR } = data;
  let mode = "net";
  let selClan = null;

  function render() {
    setHTML(
      container,
      renderClansSection({
        mode,
        selClan,
        C,
        BG,
        clans,
        relations,
        POS,
        NR,
      })
    );

    container.querySelectorAll("[data-mode]").forEach((button) => {
      on(button, "click", () => {
        mode = button.dataset.mode;
        selClan = null;
        render();
      });
    });

    if (mode === "net") {
      container.querySelectorAll(".clan-node-g[data-clan]").forEach((node) => {
        if (node.dataset.clan === "putin-center") return;
        on(node, "click", () => {
          const id = node.dataset.clan;
          selClan = id;
          container
            .querySelectorAll(".clan-node-g")
            .forEach((element) => element.classList.remove("cn-sel"));
          container
            .querySelectorAll(`[data-clan="${id}"]`)
            .forEach((element) => element.classList.add("cn-sel"));
          const out = byId("clan-detail-out");
          setHTML(out, renderClanDetail(id, { C, BG, clans }));
          out?.classList.add("active");
        });
      });
      return;
    }

    if (mode === "cards") {
      container.querySelectorAll(".clan-card-item").forEach((card) => {
        on(card, "click", () => {
          card.classList.toggle("cci-open");
          card.querySelector(".cci-body")?.classList.toggle("cci-open");
        });
      });
    }
  }

  render();
}
