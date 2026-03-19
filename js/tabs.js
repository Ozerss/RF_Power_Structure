import { $$, byId, on } from "./dom.js";
import { setActiveTab } from "./state.js";

export function initTabs(state) {
  const tabs = $$(".tab");
  const panels = $$(".panel");

  tabs.forEach((tab) => {
    on(tab, "click", () => {
      tabs.forEach((item) => item.classList.remove("active"));
      panels.forEach((panel) => panel.classList.remove("active"));
      tab.classList.add("active");
      byId(`panel-${tab.dataset.tab}`)?.classList.add("active");
      setActiveTab(state, tab.dataset.tab);
    });
  });
}
