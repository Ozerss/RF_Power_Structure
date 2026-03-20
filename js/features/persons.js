import { byId, on, setHTML } from "../dom.js";
import {
  bindExclusiveFilterGroup,
  getActiveFilterValue,
  renderFilterButtons,
} from "../filters.js";
import { renderPeopleCards } from "../renderers/people.js";
import { matchesSearch, normalizeSearchQuery } from "../search.js";
import { debounce } from "../utils.js";

export function initPersons(data) {
  const filtersContainer = byId("ps-filters");
  const grid = byId("ps-grid");
  const searchInput = byId("ps-search");
  if (!filtersContainer || !grid || !searchInput) return;

  const { psClanColors, trajLabels, persons } = data;
  const clanKeys = ["all", ...Object.keys(psClanColors)];

  renderFilterButtons(filtersContainer, clanKeys, {
    className: "ps-filter",
    activeValue: "all",
    datasetKey: "clan",
    getValue: (key) => key,
    getLabel: (key) => (key === "all" ? "Все" : key),
  });

  function renderPersons(filterClan, search) {
    grid.className = "ps-grid";

    const query = normalizeSearchQuery(search);
    const filtered = persons.filter((person) => {
      const clanMatch = filterClan === "all" || person.clan === filterClan;
      const searchMatch = matchesSearch(
        [person.name, person.role, person.tags],
        query
      );
      return clanMatch && searchMatch;
    });

    setHTML(grid, renderPeopleCards(filtered, { psClanColors, trajLabels }));

    grid.querySelectorAll(".ps-card").forEach((card) => {
      on(card, "click", () => card.classList.toggle("ps-open"));
    });
  }

  renderPersons("all", "");

  bindExclusiveFilterGroup(filtersContainer, {
    itemSelector: ".ps-filter",
    getValue: (button) => button.dataset.clan,
    onChange: (value) => {
      renderPersons(value, searchInput.value);
    },
  });

  on(searchInput, "input", debounce((event) => {
    const activeClan =
      getActiveFilterValue(filtersContainer, {
        itemSelector: ".ps-filter",
        getValue: (button) => button.dataset.clan,
      }) || "all";
    renderPersons(activeClan, event.target.value);
  }, 200));
}
