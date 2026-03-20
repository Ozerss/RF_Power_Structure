import { $$, byId, on } from "./dom.js";
import { setActiveTab } from "./state.js";

export function initTabs(state) {
  const tablist = document.querySelector('[role="tablist"]');
  const tabs = $$(".tab");
  const panels = $$(".panel");

  tabs.forEach((tab) => {
    on(tab, "click", () => {
      tabs.forEach((item) => {
        item.classList.remove("active");
        item.setAttribute("aria-selected", "false");
        item.setAttribute("tabindex", "-1");
      });
      panels.forEach((panel) => panel.classList.remove("active"));
      tab.classList.add("active");
      tab.setAttribute("aria-selected", "true");
      tab.setAttribute("tabindex", "0");
      byId(`panel-${tab.dataset.tab}`)?.classList.add("active");
      setActiveTab(state, tab.dataset.tab);
    });
  });

  if (!tablist) return;

  on(tablist, "keydown", (event) => {
    const tabItems = [...tablist.querySelectorAll('[role="tab"]')];
    const current = tabItems.indexOf(document.activeElement);
    if (current === -1) return;

    let next = -1;
    if (event.key === "ArrowRight") next = (current + 1) % tabItems.length;
    else if (event.key === "ArrowLeft") next = (current - 1 + tabItems.length) % tabItems.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = tabItems.length - 1;

    if (next === -1) return;

    event.preventDefault();
    tabItems[next].focus();
    tabItems[next].click();
  });
}
