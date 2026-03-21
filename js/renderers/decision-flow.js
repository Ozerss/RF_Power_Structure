function actorTags(actors, color) {
  return actors
    .map((actor) => `<span class="flow-actor-tag" style="background:${color}15;border-color:${color}33;color:${color}">${actor}</span>`)
    .join("");
}

function renderStepper({ downSteps, stepIdx }) {
  const step = downSteps[stepIdx];
  const pct = Math.round(((stepIdx + 1) / downSteps.length) * 100);
  let html = `<div class="flow-progress"><div class="flow-progress-fill" style="width:${pct}%"></div></div>`;
  html += `<div class="flow-step-nav">`;
  downSteps.forEach((item, index) => {
    const isActive = index === stepIdx;
    html += `<div class="flow-step-dot${isActive ? " active-dot" : ""}" data-si="${index}" style="border-color:${item.color};${isActive ? `background:${item.color};` : `color:${item.color};`}">${item.num}</div>`;
  });
  html += `</div>`;
  html += `<div class="flow-step-content flow-step-colored" style="--flow-step-color:${step.color}">`;
  html += `<div class="flow-step-tag">${step.tag}</div>`;
  html += `<div class="flow-step-title">${step.title}</div>`;
  html += `<div class="flow-step-body">${step.body}</div>`;
  html += `<div class="flow-step-actors">${actorTags(step.actors, step.color)}</div>`;
  if (step.defect) html += `<div class="flow-step-defect"><strong>Системный дефект:</strong> ${step.defect}</div>`;
  if (step.insight) html += `<div class="flow-step-insight"><strong>Ключевой вывод:</strong> ${step.insight}</div>`;
  html += `<div class="flow-step-nav-btns">`;
  if (stepIdx > 0) html += `<button class="flow-nav-btn" id="step-prev">← Назад</button>`;
  if (stepIdx < downSteps.length - 1) html += `<button class="flow-nav-btn" id="step-next">Далее →</button>`;
  html += `</div></div>`;
  return html;
}

function renderDual({ downSteps, upSteps }) {
  let html = `<div class="flow-dual-grid flow-dual-grid--compact">`;
  html += `<div class="flow-track-head flow-track-head--down">↓ Решение сверху вниз</div>`;
  html += `<div></div>`;
  html += `<div class="flow-track-head flow-track-head--up">↑ Обратная связь (фильтруется)</div>`;
  html += `<div>`;
  downSteps.forEach((step, index) => {
    html += `<div class="flow-track-item" data-si="${index}">`;
    html += `<div class="flow-track-item-title" style="color:${step.color}">${step.num}. ${step.title}</div>`;
    html += `<div class="flow-track-copy">${step.body.substring(0, 90)}…</div>`;
    html += `<div class="flow-track-item-actors">${actorTags(step.actors.slice(0, 3), step.color)}</div>`;
    html += `</div>`;
  });
  html += `</div>`;
  html += `<div class="flow-arrow-col">`;
  for (let i = 0; i < Math.max(downSteps.length, upSteps.length); i += 1) {
    html += `<div class="flow-center-arrow flow-center-arrow--muted">⇄</div>`;
  }
  html += `</div>`;
  html += `<div>`;
  [...upSteps].reverse().forEach((step) => {
    const filterPct = 100 - step.filter;
    html += `<div class="flow-track-item flow-track-item--filtered">`;
    html += `<div class="flow-track-head-row">`;
    html += `<div class="flow-track-item-title" style="color:${step.color}">${step.level}</div>`;
    html += `<div class="flow-filter-badge">фильтр ${filterPct}%</div>`;
    html += `</div>`;
    html += `<div class="flow-track-copy">${step.text.substring(0, 90)}…</div>`;
    html += `<div class="flow-filter-bar"><div class="flow-filter-fill" style="width:${filterPct}%"></div></div>`;
    html += `</div>`;
  });
  html += `</div></div>`;
  html += `<div class="key-insight flow-key-insight">
    <h4>Читай эту схему так</h4>
    <p>Левая колонка: путь решения вниз. Правая колонка: путь обратной связи вверх — и процент «фильтрации» на каждом уровне. К Путину добирается только 15% реальной информации о результатах. Именно поэтому каждый новый цикл решений основан на всё более искажённой картине.</p>
  </div>`;
  return html;
}

function renderCase({ caseEvents }) {
  let html = `<div class="flow-case-intro">`;
  html += `<div class="flow-case-title">Кейс: вторжение в Украину 2022 — как работает система на практике</div>`;
  html += `<div class="flow-case-subtitle">Это не история о том как Путин «сошёл с ума». Это история о том как 8 лет отфильтрованных докладов привели к решению основанному на картине мира не соответствующей реальности. Пример идеально иллюстрирует каждый шаг схемы выше.</div>`;
  html += `</div><div class="case-timeline">`;
  caseEvents.forEach((event, index) => {
    const isLast = index === caseEvents.length - 1;
    html += `<div class="case-event">
      <div class="case-dot-col">
        <div class="case-dot" style="background:${event.color}"></div>
        ${!isLast ? `<div class="case-vline" style="background:${event.color}33"></div>` : ""}
      </div>
      <div class="case-card">
        <div class="case-card-top">
          <div class="case-title">${event.title}</div>
          <div class="case-badge" style="background:${event.color}15;border-color:${event.color}44;color:${event.color}">${event.cat}</div>
        </div>
        <div class="flow-case-date">${event.date}</div>
        <div class="case-body">${event.body}</div>
      </div>
    </div>`;
  });
  html += `</div>`;
  html += `<div class="case-verdict">
    <strong>Системный вывод:</strong> Катастрофа 2022-го — не аномалия. Это нормальный результат системы где информация фильтруется на каждом уровне, никто не несёт ответственности за провальный прогноз, и решение принимается без протокола. При сохранении той же архитектуры системы — следующая катастрофа неизбежна, изменится только её форма.
  </div>`;
  return html;
}

export function renderDecisionFlowSection({ mode, stepIdx, downSteps, upSteps, caseEvents }) {
  const modeContent =
    mode === "stepper"
      ? renderStepper({ downSteps, stepIdx })
      : mode === "dual"
        ? renderDual({ downSteps, upSteps })
        : renderCase({ caseEvents });

  return `
    <div class="flow-header">
      <div>
        <div class="section-title flow-section-title">Механика власти — как решения принимаются и исполняются</div>
        <div class="flow-subtitle">Российская армия планировала взять Киев за 72 часа. Это не военный просчёт — это результат того, как информация движется внутри системы. Каждый уровень передаёт наверх то, что хотят услышать.</div>
      </div>
      <div class="flow-mode-toggle">
        <button class="flow-mode-btn${mode === "stepper" ? " active" : ""}" data-mode="stepper">Пошагово</button>
        <button class="flow-mode-btn${mode === "dual" ? " active" : ""}" data-mode="dual">Два потока</button>
        <button class="flow-mode-btn${mode === "case" ? " active" : ""}" data-mode="case">Кейс 2022</button>
      </div>
    </div>
    <div class="stat-grid">
      <div class="stat-card stat-card--compact"><div class="stat-num stat-num--amber">9</div><div class="stat-label">этапов принятия решения</div></div>
      <div class="stat-card stat-card--compact"><div class="stat-num stat-num--red">15%</div><div class="stat-label">информации доходит наверх без искажений</div></div>
      <div class="stat-card stat-card--compact"><div class="stat-num stat-num--purple">0</div><div class="stat-label">протоколов ключевых решений</div></div>
      <div class="stat-card stat-card--compact"><div class="stat-num stat-num--green">8 лет</div><div class="stat-label">накопления ошибки до 2022-го</div></div>
    </div>
    <div id="flow-mode-content">${modeContent}</div>`;
}
