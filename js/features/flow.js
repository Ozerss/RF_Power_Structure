import { byId, on, setHTML } from "../dom.js";
import { renderDecisionFlowSection } from "../renderers/decision-flow.js";

export function initFlow(data) {
  const container = byId("flow-container");
  if (!container) return;

  const { downSteps, upSteps, caseEvents } = data;
  let mode = "stepper";
  let stepIdx = 0;

  function rebuildContainer() {
    setHTML(
      container,
      renderDecisionFlowSection({
        mode,
        stepIdx,
        downSteps,
        upSteps,
        caseEvents,
      })
    );

    container.querySelectorAll("[data-mode]").forEach((button) => {
      on(button, "click", () => {
        mode = button.dataset.mode;
        rebuildContainer();
      });
    });

    if (mode === "stepper") {
      container.querySelectorAll(".flow-step-dot").forEach((dot) => {
        on(dot, "click", () => {
          stepIdx = parseInt(dot.dataset.si, 10);
          rebuildContainer();
        });
      });

      on(byId("step-prev"), "click", () => {
        stepIdx -= 1;
        rebuildContainer();
      });

      on(byId("step-next"), "click", () => {
        stepIdx += 1;
        rebuildContainer();
      });
      return;
    }

    if (mode === "dual") {
      container.querySelectorAll(".flow-track-item[data-si]").forEach((item) => {
        on(item, "click", () => {
          mode = "stepper";
          stepIdx = parseInt(item.dataset.si, 10);
          rebuildContainer();
        });
      });
    }
  }

  rebuildContainer();
}
