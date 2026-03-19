export function byId(id) {
  return document.getElementById(id);
}

export function $(selector, root = document) {
  return root.querySelector(selector);
}

export function $$(selector, root = document) {
  return [...root.querySelectorAll(selector)];
}

export function on(element, eventName, handler, options) {
  if (element) {
    element.addEventListener(eventName, handler, options);
  }
  return element;
}

export function setHTML(element, html) {
  if (element) {
    element.innerHTML = html;
  }
  return element;
}
