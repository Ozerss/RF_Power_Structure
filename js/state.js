const DATA_URLS = Object.freeze({
  hierarchy: new URL("../data/hierarchy.json", import.meta.url),
  flow: new URL("../data/flow.json", import.meta.url),
  clans: new URL("../data/clans.json", import.meta.url),
  mechanisms: new URL("../data/mechanisms.json", import.meta.url),
  timeline: new URL("../data/timeline.json", import.meta.url),
  persons: new URL("../data/persons.json", import.meta.url),
  economics: new URL("../data/economics.json", import.meta.url),
  propaganda: new URL("../data/propaganda.json", import.meta.url),
  transit: new URL("../data/transit.json", import.meta.url),
  conclusions: new URL("../data/conclusions.json", import.meta.url),
});

async function loadJson(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to load ${url}: ${response.status}`);
  }
  return response.json();
}

export async function loadAppData() {
  return Object.fromEntries(
    await Promise.all(
      Object.entries(DATA_URLS).map(async ([key, url]) => [key, await loadJson(url)])
    )
  );
}

export function createAppState(data) {
  return {
    activeTab: "hierarchy",
    data,
  };
}

export function setActiveTab(state, tab) {
  state.activeTab = tab;
}
