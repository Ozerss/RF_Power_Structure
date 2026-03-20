import { byId, on, setHTML } from "../dom.js";
import { renderClanDetail, renderClansSection } from "../renderers/clans.js";

export function initClans(data) {
  const container = byId("clan-container");
  if (!container) return;

  const { C, BG, clans, relations, POS, NR } = data;
  let mode = "net";
  let selClan = null;

  on(container, "click", (event) => {
    if (!event.target.closest(".detail-close") || mode !== "net") return;
    selClan = null;
    container
      .querySelectorAll(".clan-node-g")
      .forEach((element) => element.classList.remove("cn-sel"));
    const out = byId("clan-detail-out");
    setHTML(out, renderClanDetail(null, { C, BG, clans }));
    out?.classList.remove("active");
  });

  on(container, "keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;

    if (mode === "net") {
      const node = event.target.closest(".clan-node-g[data-clan]");
      if (!node || node.dataset.clan === "putin-center") return;
      event.preventDefault();
      node.click();
      return;
    }

    if (mode === "cards") {
      const card = event.target.closest(".clan-card-item");
      if (!card) return;
      event.preventDefault();
      card.click();
    }
  });

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
          card.setAttribute(
            "aria-expanded",
            card.classList.contains("cci-open") ? "true" : "false"
          );
        });
      });
    }
  }

  render();
}
