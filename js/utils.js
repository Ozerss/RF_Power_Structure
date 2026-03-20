export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

export function findById(items, id) {
  return items.find((item) => item.id === id);
}

export function lastWord(value) {
  return value.split(" ").slice(-1)[0];
}

export function toggleSetValue(set, value) {
  if (set.has(value)) set.delete(value);
  else set.add(value);
}

export function debounce(fn, ms = 200) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), ms);
  };
}
