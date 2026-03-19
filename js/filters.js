import { on } from "./dom.js";

export function renderFilterButtons(
  container,
  items,
  { className, activeValue, datasetKey = "filter", getValue, getLabel }
) {
  container.innerHTML = "";
  items.forEach((item) => {
    const value = getValue(item);
    const button = document.createElement("button");
    button.className = `${className}${value === activeValue ? " active" : ""}`;
    button.dataset[datasetKey] = value;
    button.textContent = getLabel(item);
    container.appendChild(button);
  });
}

export function bindExclusiveFilterGroup(
  container,
  { itemSelector, activeClass = "active", getValue, onChange }
) {
  on(container, "click", (event) => {
    const button = event.target.closest(itemSelector);
    if (!button) return;

    container.querySelectorAll(itemSelector).forEach((item) => item.classList.remove(activeClass));
    button.classList.add(activeClass);
    onChange(getValue(button), button);
  });
}

export function getActiveFilterValue(
  container,
  { itemSelector, activeClass = "active", getValue }
) {
  const activeButton = container.querySelector(`${itemSelector}.${activeClass}`);
  return activeButton ? getValue(activeButton) : null;
}
