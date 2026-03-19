export function normalizeSearchQuery(value = "") {
  return value.trim().toLowerCase();
}

export function matchesSearch(values, query) {
  if (!query) return true;
  return values.flat().some((value) => String(value).toLowerCase().includes(query));
}
