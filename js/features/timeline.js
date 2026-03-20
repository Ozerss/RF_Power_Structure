import { byId, on, setHTML } from "../dom.js";
import { clamp, toggleSetValue } from "../utils.js";
import {
  renderTimelineDetail,
  renderTimelineSection,
} from "../renderers/timeline.js";

export function initTimeline(data) {
  const mainContainer = byId("tl-main-container");
  if (!mainContainer) return;

  const { CATS, events, ERAS } = data;
  let selIdx = 0;
  let activeCat = "all";
  const openCards = new Set();
  let mode = "rail";

  function getFiltered() {
    return activeCat === "all"
      ? events
      : events.filter((event) => event.cat === activeCat);
  }

  on(mainContainer, "click", (event) => {
    if (!event.target.closest(".detail-close") || mode !== "rail") return;
    selIdx = 0;
    mainContainer.querySelectorAll(".tl3-sel").forEach((item) => {
      item.classList.remove("tl3-sel");
    });
    setHTML(
      byId("tl3-detail-area"),
      renderTimelineDetail(null, 0, getFiltered().length, CATS)
    );
  });

  on(mainContainer, "keydown", (event) => {
    if ((event.key !== "Enter" && event.key !== " ") || mode !== "cards") return;
    const card = event.target.closest("[data-ci]");
    if (!card) return;
    event.preventDefault();
    card.click();
  });

  function attachNavBtns(filtered) {
    on(byId("tl3-prev"), "click", () => {
      if (selIdx <= 0) return;
      selIdx -= 1;
      setHTML(
        byId("tl3-detail-area"),
        renderTimelineDetail(filtered[selIdx], selIdx, filtered.length, CATS)
      );
      attachNavBtns(filtered);
    });

    on(byId("tl3-next"), "click", () => {
      if (selIdx >= filtered.length - 1) return;
      selIdx += 1;
      setHTML(
        byId("tl3-detail-area"),
        renderTimelineDetail(filtered[selIdx], selIdx, filtered.length, CATS)
      );
      attachNavBtns(filtered);
    });
  }

  function render() {
    const filtered = getFiltered();
    selIdx = clamp(selIdx, 0, Math.max(filtered.length - 1, 0));

    setHTML(
      mainContainer,
      renderTimelineSection({
        mode,
        selIdx,
        activeCat,
        openCards,
        CATS,
        events,
        ERAS,
        filtered,
      })
    );

    mainContainer.querySelectorAll("[data-m]").forEach((button) => {
      on(button, "click", () => {
        mode = button.dataset.m;
        openCards.clear();
        render();
      });
    });

    mainContainer.querySelectorAll("[data-cat]").forEach((button) => {
      on(button, "click", () => {
        activeCat = button.dataset.cat;
        selIdx = 0;
        openCards.clear();
        render();
      });
    });

    if (mode === "rail") {
      mainContainer.querySelectorAll("[data-evgidx]").forEach((dot) => {
        on(dot, "click", () => {
          selIdx = parseInt(dot.dataset.evgidx, 10);
          mainContainer.querySelectorAll("[data-evgidx]").forEach((item) => {
            item.classList.toggle(
              "tl3-sel",
              parseInt(item.dataset.evgidx, 10) === selIdx
            );
          });
          setHTML(
            byId("tl3-detail-area"),
            renderTimelineDetail(filtered[selIdx] || null, selIdx, filtered.length, CATS)
          );
          attachNavBtns(filtered);
        });
      });
      attachNavBtns(filtered);
      return;
    }

    mainContainer.querySelectorAll("[data-ci]").forEach((card) => {
      on(card, "click", () => {
        toggleSetValue(openCards, parseInt(card.dataset.ci, 10));
        render();
      });
    });
  }

  render();
}
