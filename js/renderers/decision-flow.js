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
  html += `<div class="flow-step-content">`;
  html += `<div class="flow-step-tag" style="color:${step.color}">${step.tag}</div>`;
  html += `<div class="flow-step-title" style="color:${step.color}">${step.title}</div>`;
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
  let html = `<div style="display:grid;grid-template-columns:1fr 28px 1fr;gap:0;align-items:start">`;
  html += `<div class="flow-track-head" style="background:rgba(212,145,58,0.1);color:#d4913a;border:0.5px solid rgba(212,145,58,0.3)">↓ Решение сверху вниз</div>`;
  html += `<div></div>`;
  html += `<div class="flow-track-head" style="background:rgba(201,79,58,0.1);color:#c94f3a;border:0.5px solid rgba(201,79,58,0.3)">↑ Обратная связь (фильтруется)</div>`;
  html += `<div>`;
  downSteps.forEach((step, index) => {
    html += `<div class="flow-track-item" data-si="${index}">`;
    html += `<div class="flow-track-item-title" style="color:${step.color}">${step.num}. ${step.title}</div>`;
    html += `<div style="font-size:11px;color:var(--text2)">${step.body.substring(0, 90)}…</div>`;
    html += `<div class="flow-track-item-actors">${actorTags(step.actors.slice(0, 3), step.color)}</div>`;
    html += `</div>`;
  });
  html += `</div>`;
  html += `<div class="flow-arrow-col">`;
  for (let i = 0; i < Math.max(downSteps.length, upSteps.length); i += 1) {
    html += `<div class="flow-center-arrow" style="color:rgba(255,255,255,0.12)">⇄</div>`;
  }
  html += `</div>`;
  html += `<div>`;
  [...upSteps].reverse().forEach((step) => {
    const filterPct = 100 - step.filter;
    html += `<div class="flow-track-item" style="border-color:rgba(201,79,58,0.2)">`;
    html += `<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px">`;
    html += `<div class="flow-track-item-title" style="color:${step.color}">${step.level}</div>`;
    html += `<div style="font-size:10px;color:#e07060;background:rgba(201,79,58,0.1);padding:1px 6px;border-radius:3px">фильтр ${filterPct}%</div>`;
    html += `</div>`;
    html += `<div style="font-size:11px;color:var(--text2)">${step.text.substring(0, 90)}…</div>`;
    html += `<div style="height:3px;background:var(--border);border-radius:2px;margin-top:6px;overflow:hidden"><div style="width:${filterPct}%;height:3px;background:rgba(201,79,58,0.6);border-radius:2px"></div></div>`;
    html += `</div>`;
  });
  html += `</div></div>`;
  html += `<div class="key-insight" style="margin-top:1rem">
    <h4>Читай эту схему так</h4>
    <p>Левая колонка: путь решения вниз. Правая колонка: путь обратной связи вверх — и процент «фильтрации» на каждом уровне. К Путину добирается только 15% реальной информации о результатах. Именно поэтому каждый новый цикл решений основан на всё более искажённой картине.</p>
  </div>`;
  return html;
}

function renderCase({ caseEvents }) {
  let html = `<div style="margin-bottom:1.25rem">`;
  html += `<div style="font-size:13px;font-weight:500;color:var(--text);margin-bottom:6px">Кейс: вторжение в Украину 2022 — как работает система на практике</div>`;
  html += `<div style="font-size:12px;color:var(--text2);line-height:1.65;margin-bottom:12px">Это не история о том как Путин «сошёл с ума». Это история о том как 8 лет отфильтрованных докладов привели к решению основанному на картине мира не соответствующей реальности. Пример идеально иллюстрирует каждый шаг схемы выше.</div>`;
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
        <div style="font-size:10px;color:var(--text3);margin-bottom:5px">${event.date}</div>
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
    <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:10px;margin-bottom:1rem">
      <div>
        <div class="section-title" style="margin-bottom:4px">Механика власти — как решения принимаются и исполняются</div>
        <div style="font-size:11px;color:var(--text3)">Выбери режим просмотра</div>
      </div>
      <div class="flow-mode-toggle">
        <button class="flow-mode-btn${mode === "stepper" ? " active" : ""}" data-mode="stepper">Пошагово</button>
        <button class="flow-mode-btn${mode === "dual" ? " active" : ""}" data-mode="dual">Два потока</button>
        <button class="flow-mode-btn${mode === "case" ? " active" : ""}" data-mode="case">Кейс 2022</button>
      </div>
    </div>
    <div class="flow-stats">
      <div class="hier-stat"><div class="hier-stat-num" style="color:#d4913a">9</div><div class="hier-stat-label">этапов принятия решения</div></div>
      <div class="hier-stat"><div class="hier-stat-num" style="color:#c94f3a">15%</div><div class="hier-stat-label">информации доходит наверх без искажений</div></div>
      <div class="hier-stat"><div class="hier-stat-num" style="color:#7a6ec4">0</div><div class="hier-stat-label">протоколов ключевых решений</div></div>
      <div class="hier-stat"><div class="hier-stat-num" style="color:#5a9e52">8 лет</div><div class="hier-stat-label">накопления ошибки до 2022-го</div></div>
    </div>
    <div id="flow-mode-content">${modeContent}</div>`;
}
