export function renderTransitionSection({ scenarios, indicators, nextGen }) {
  let html = "";
  html += `<div class="transit-disclaimer">
    <strong>Методологическая оговорка.</strong> Транзит власти — наименее предсказуемая из всех тем в этом проекте. Любой кто утверждает что знает когда и как это произойдёт — продаёт нарратив. Честная позиция: описать структурные условия, исторические паттерны и сигналы которые нужно отслеживать. Конкретный триггер и время — непредсказуемы.
  </div>`;
  html += `<div class="econ-section">
    <div class="econ-section-title"><span>📡</span> Состояние системы сейчас — 2025/2026</div>
    <div class="econ-grid">
      <div class="econ-stat"><div class="econ-stat-num" style="color:#d4913a">2036</div><div class="econ-stat-label">год до которого Путин может оставаться легально</div><div class="econ-stat-sub">После конституционного обнуления 2020-го</div></div>
      <div class="econ-stat"><div class="econ-stat-num" style="color:#c94f3a">73</div><div class="econ-stat-label">года Путину в 2026-м</div><div class="econ-stat-sub">Публичные признаки ухудшения здоровья фиксируются с 2021-го</div></div>
      <div class="econ-stat"><div class="econ-stat-num" style="color:#5a9e52">75%</div><div class="econ-stat-label">Думы — новые лица на выборах 2026-го</div><div class="econ-stat-sub">Ветераны войны как новый политический класс (Carnegie, 2025)</div></div>
      <div class="econ-stat"><div class="econ-stat-num" style="color:#7a6ec4">0</div><div class="econ-stat-label">официально назначенных преемников</div><div class="econ-stat-sub">Намеренная неопределённость как инструмент контроля</div></div>
    </div>
  </div>`;
  html += `<div class="econ-section"><div class="econ-section-title"><span>🗺</span> Четыре сценария транзита</div>`;
  scenarios.forEach((scenario) => {
    html += `<div class="transit-scenario">
      <div class="transit-head">
        <div class="transit-prob">
          <div class="transit-prob-num" style="color:${scenario.probColor}">${scenario.prob}</div>
          <div class="transit-prob-label">вероятность</div>
        </div>
        <div class="transit-head-main">
          <div class="transit-scenario-title">${scenario.title}</div>
          <div class="transit-scenario-sub">${scenario.sub}</div>
          <div class="transit-badges">${scenario.badges.map((badge) => `<span class="transit-badge" style="background:${badge.color}15;border-color:${badge.color}44;color:${badge.color}">${badge.text}</span>`).join("")}</div>
        </div>
        <div class="transit-chev">›</div>
      </div>
      <div class="transit-body">
        <div class="transit-body-inner">
          <div class="transit-col"><h5>Триггер</h5><p>${scenario.trigger}</p></div>
          <div class="transit-col"><h5>Механика</h5><p>${scenario.mechanics}</p></div>
          <div class="transit-col"><h5>Вероятный результат</h5><p>${scenario.result}</p><div class="transit-historical"><strong>Исторический прецедент:</strong> ${scenario.historical}</div></div>
          <div class="transit-col">
            <h5>Метрики сценария</h5>
            <div class="transit-meter-row">
              <div class="transit-meter"><div class="transit-meter-label">Шанс демократизации</div><div class="transit-meter-bar"><div class="transit-meter-fill" style="width:${scenario.democracy}%;background:${scenario.probColor}"></div></div></div>
              <div class="transit-meter"><div class="transit-meter-label">Стабильность перехода</div><div class="transit-meter-bar"><div class="transit-meter-fill" style="width:${scenario.stability}%;background:${scenario.probColor}88"></div></div></div>
              <div class="transit-meter"><div class="transit-meter-label">Скорость изменений</div><div class="transit-meter-bar"><div class="transit-meter-fill" style="width:${scenario.speed}%;background:${scenario.probColor}"></div></div></div>
              <div class="transit-meter"><div class="transit-meter-label">Улучшение отношений с Западом</div><div class="transit-meter-bar"><div class="transit-meter-fill" style="width:${scenario.westreln}%;background:${scenario.probColor}88"></div></div></div>
            </div>
            <h5 style="margin-top:12px">Индикаторы — следи за этим</h5>
            <ul>${scenario.indicators.map((item) => `<li>${item}</li>`).join("")}</ul>
          </div>
        </div>
      </div>
    </div>`;
  });
  html += `</div>`;
  html += `<div class="econ-section">
    <div class="econ-section-title"><span>🔍</span> Индикаторы транзита — что отслеживать прямо сейчас</div>
    <div class="indicator-grid">`;
  indicators.forEach((indicator) => {
    const statusColors = { active: "#5a9e52", partial: "#d4913a", inactive: "#5a5855" };
    html += `<div class="indicator-card">
      <div class="indicator-card-title">
        <div class="indicator-status" style="background:${statusColors[indicator.status]}"></div>
        <span style="color:${indicator.color}">${indicator.title}</span>
      </div>
      <ul class="indicator-list">${indicator.items
        .map((item) => {
          const cls = { active: "ind-active", partial: "ind-partial", inactive: "ind-inactive" }[item.status];
          const label = { active: "Идёт", partial: "Частично", inactive: "Пока нет" }[item.status];
          return `<li>${item.text} <span class="ind-status ${cls}">${label}</span></li>`;
        })
        .join("")}</ul>
    </div>`;
  });
  html += `</div></div>`;
  html += `<div class="econ-section">
    <div class="econ-section-title"><span>👤</span> Следующее поколение — кто реально может прийти</div>
    <div class="next-gen-grid">`;
  nextGen.forEach((person) => {
    html += `<div class="next-gen-card" style="border-color:${person.color}33">
      <div class="next-gen-name" style="color:${person.color}">${person.name}</div>
      <div class="next-gen-role">${person.role}</div>
      <div class="next-gen-body">${person.body}</div>
    </div>`;
  });
  html += `</div></div>`;
  html += `<div class="econ-section">
    <div class="econ-section-title"><span>⚖</span> Что изменится при транзите — а что нет</div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
      <div style="background:rgba(90,158,82,0.08);border:0.5px solid rgba(90,158,82,0.3);border-radius:var(--r2);padding:1.25rem">
        <div style="font-size:13px;font-weight:500;color:#80c878;margin-bottom:10px">Вероятно изменится</div>
        <ul style="list-style:none;padding:0">
          ${["Градус репрессий — снизится при любом сценарии кроме военной диктатуры", "Тональность медиапространства — небольшое открытие", "Часть политзаключённых будет освобождена как жест", "Война — с высокой вероятностью будет заморожена", "Доступ элиты к Западу — частично восстановится"].map((item) => `<li style="font-size:12px;color:var(--text2);line-height:1.65;padding:4px 0 4px 14px;position:relative;border-bottom:0.5px solid rgba(90,158,82,0.15)"><span style="position:absolute;left:0;color:#80c878">+</span>${item}</li>`).join("")}
        </ul>
      </div>
      <div style="background:rgba(201,79,58,0.08);border:0.5px solid rgba(201,79,58,0.3);border-radius:var(--r2);padding:1.25rem">
        <div style="font-size:13px;font-weight:500;color:#e07060;margin-bottom:10px">Вероятно сохранится</div>
        <ul style="list-style:none;padding:0">
          ${["Системная коррупция — она встроена в экономическую архитектуру", "Силовые структуры — ФСБ сохранит влияние при любом сценарии", "Ресурсная зависимость экономики — это структурная проблема", "Имперский нарратив — в смягчённой форме", "Отставание от Запада — накопленное за 25 лет не исчезнет быстро"].map((item) => `<li style="font-size:12px;color:var(--text2);line-height:1.65;padding:4px 0 4px 14px;position:relative;border-bottom:0.5px solid rgba(201,79,58,0.15)"><span style="position:absolute;left:0;color:#e07060">−</span>${item}</li>`).join("")}
        </ul>
      </div>
    </div>
  </div>`;
  return html;
}
