import { on } from "./dom.js";

export function createModalController({ activeClass = "open", hiddenAttribute = "hidden" } = {}) {
  let activeModal = null;

  function close() {
    if (!activeModal) return;
    activeModal.classList.remove(activeClass);
    activeModal.setAttribute(hiddenAttribute, "");
    activeModal = null;
  }

  function open(modal) {
    if (!modal) return;
    if (activeModal && activeModal !== modal) close();
    activeModal = modal;
    activeModal.classList.add(activeClass);
    activeModal.removeAttribute(hiddenAttribute);
  }

  return { open, close, getActiveModal: () => activeModal };
}

export function bindModalDismiss(modal, controller, selector = "[data-modal-close]") {
  if (!modal) return;
  modal.querySelectorAll(selector).forEach((element) => {
    on(element, "click", () => controller.close());
  });
}
