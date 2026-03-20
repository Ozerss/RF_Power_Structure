export function renderConclusionsSection({ principles, myths, roadmap, sources }) {
  let html = "";
  html += `<div class="concl-hero">
    <div class="concl-hero-title">Одно предложение которое объясняет всё</div>
    <div class="concl-hero-body">Путинская система — это не государство с коррупцией. Это коррупция оформленная как государство: структура в которой незаконное обогащение является механизмом управления, а не отклонением от нормы, и где каждый значимый участник скомпрометирован настолько что заинтересован в сохранении системы даже когда она ведёт к катастрофе.</div>
  </div>`;
  html += `<div class="econ-section-title concl-section-heading"><span>🧠</span> 12 принципов для понимания любого события в России</div>
  <div class="concl-principles">`;
  principles.forEach((principle, index) => {
    html += `<div class="concl-principle">
      <div class="concl-principle-num">${index + 1}</div>
      <div class="concl-principle-title" style="color:${principle.color}">${principle.title}</div>
      <div class="concl-principle-body">${principle.body}</div>
    </div>`;
  });
  html += `</div>`;
  html += `<div class="econ-section">
    <div class="econ-section-title concl-section-heading"><span>🔥</span> Популярные заблуждения — и реальность</div>
    <div class="concl-myths">`;
  myths.forEach((myth) => {
    html += `<div class="concl-myth">
      <div class="concl-myth-q"><div class="concl-myth-label concl-myth-label--myth">❌ Миф</div>${myth.myth}</div>
      <div class="concl-myth-a"><div class="concl-myth-label concl-myth-label--reality">✓ Реальность</div>${myth.reality}</div>
    </div>`;
  });
  html += `</div></div>`;
  html += `<div class="econ-section">
    <div class="econ-section-title concl-section-heading"><span>📊</span> Россия vs нормальные государства — по фактам</div>
    <div class="concl-comparison">
      <div class="concl-comp-col">
        <div class="concl-comp-title concl-comp-title--de">Германия <span class="concl-comp-subtitle">для сравнения</span></div>
        ${[
          ["Свобода прессы (RSF 2024)", "10-е место из 180"],
          ["Контроль коррупции (TI)", "78/100, 9-е место"],
          ["Верховенство закона (WJP)", "0.83/1.0"],
          ["Гражданские свободы (FH)", "40/40"],
          ["Честность выборов", "Без оговорок"],
          ["Смена власти", "Регулярная, мирная"],
          ["Политзаключённые", "0"],
          ["Независимость суда", "Конституционно гарантирована"],
        ].map(([label, value]) => `<div class="concl-comp-row"><span class="concl-comp-label">${label}</span><span class="concl-comp-val concl-comp-val--de">${value}</span></div>`).join("")}
      </div>
      <div class="concl-comp-col">
        <div class="concl-comp-title concl-comp-title--ru">Россия <span class="concl-comp-subtitle">реальные данные</span></div>
        ${[
          ["Свобода прессы (RSF 2024)", "164-е место из 180"],
          ["Контроль коррупции (TI)", "26/100, 141-е место"],
          ["Верховенство закона (WJP)", "0.34/1.0"],
          ["Гражданские свободы (FH)", "5/40"],
          ["Честность выборов", "Систематические нарушения"],
          ["Смена власти", "Не было с 1999-го"],
          ["Политзаключённые", "700+ (Мемориал до ликвидации)"],
          ["Независимость суда", "99.6% обвинительных"],
        ].map(([label, value]) => `<div class="concl-comp-row"><span class="concl-comp-label">${label}</span><span class="concl-comp-val concl-comp-val--ru">${value}</span></div>`).join("")}
      </div>
    </div>
  </div>`;
  html += `<div class="econ-section">
    <div class="econ-section-title concl-section-heading"><span>🗺</span> Как использовать этот проект — практическое руководство</div>
    <div class="concl-roadmap">`;
  roadmap.forEach((item) => {
    html += `<div class="concl-roadmap-item">
      <div class="concl-roadmap-icon">${item.icon}</div>
      <div><div class="concl-roadmap-title">${item.title}</div><div class="concl-roadmap-body">${item.body}</div></div>
    </div>`;
  });
  html += `</div></div>`;
  html += `<div class="econ-section">
    <div class="econ-section-title concl-section-heading"><span>📚</span> Углублённое изучение — что читать дальше</div>
    <div class="concl-sources-grid">`;
  sources.forEach((source) => {
    html += `<div class="concl-source-card">
      <div class="concl-source-cat" style="color:${source.color}">${source.cat}</div>
      ${source.items.map((item) => `<div class="concl-source-item">${item}</div>`).join("")}
    </div>`;
  });
  html += `</div></div>`;
  html += `<div class="concl-final">
    <div class="concl-final-quote">"Самое опасное — это думать что понимание системы освобождает от неё. Понимание — это только начало. Важно что ты делаешь с этим пониманием."</div>
    <div class="concl-final-attr">Принцип этого проекта</div>
    <div class="concl-disclaimer">
      Этот проект создан как инструмент понимания, а не агитации. Все данные основаны на задокументированных источниках: Freedom House, Transparency International, RSF, V-Dem, OCCRP, Carnegie Endowment, Levada Center, Atlantic Council. Последнее обновление: март 2026.
    </div>
  </div>`;
  return html;
}
