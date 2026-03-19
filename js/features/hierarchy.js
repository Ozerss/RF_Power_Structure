import { byId, on, setHTML } from "../dom.js";
import { findById } from "../utils.js";
import {
  layoutHierarchyNodes,
  renderHierarchyDetail,
  renderHierarchySection,
} from "../renderers/hierarchy.js";

export function initHierarchy(data) {
  const container = byId("hier-container");
  if (!container) return;

  const { CC, CLAN_BG, TC, nodes } = data;
  layoutHierarchyNodes(nodes);

  setHTML(container, renderHierarchySection(data));

  on(byId("btn-rings"), "click", () => {
    byId("btn-rings")?.classList.add("active");
    byId("btn-formal")?.classList.remove("active");
    byId("hier-rings-wrap")?.classList.add("active");
    byId("hier-formal-wrap")?.classList.remove("active");
  });

  on(byId("btn-formal"), "click", () => {
    byId("btn-formal")?.classList.add("active");
    byId("btn-rings")?.classList.remove("active");
    byId("hier-formal-wrap")?.classList.add("active");
    byId("hier-rings-wrap")?.classList.remove("active");
  });

  on(container, "click", (event) => {
    const target = event.target.closest("[data-id]");
    if (!target) return;
    const node = findById(nodes, target.dataset.id);
    if (!node) return;

    container
      .querySelectorAll(".hier-node-g.hier-sel")
      .forEach((element) => element.classList.remove("hier-sel"));
    container
      .querySelectorAll(`[data-id="${target.dataset.id}"]`)
      .forEach((element) => element.classList.add("hier-sel"));

    const panel = byId("hier-detail-panel");
    setHTML(panel, renderHierarchyDetail(node, { CC, CLAN_BG, TC }));
    panel?.classList.add("sel");
  });
}
