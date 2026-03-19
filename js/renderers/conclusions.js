export function renderConclusionsSection({ principles, myths, roadmap, sources }) {
  let html = "";
  html += `<div class="concl-hero">
    <div class="concl-hero-title">Одно предложение которое объясняет всё</div>
    <div class="concl-hero-body">Путинская система — это не государство с коррупцией. Это коррупция оформленная как государство: структура в которой незаконное обогащение является механизмом управления, а не отклонением от нормы, и где каждый значимый участник скомпрометирован настолько что заинтересован в сохранении системы даже когда она ведёт к катастрофе.</div>
  </div>`;
  html += `<div class="econ-section-title" style="font-size:15px;font-weight:500;margin-bottom:1rem;display:flex;align-items:center;gap:8px"><span>🧠</span> 12 принципов для понимания любого события в России</div>
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
    <div class="econ-section-title" style="font-size:15px;font-weight:500;margin-bottom:1rem;display:flex;align-items:center;gap:8px"><span>🔥</span> Популярные заблуждения — и реальность</div>
    <div class="concl-myths">`;
  myths.forEach((myth) => {
    html += `<div class="concl-myth">
      <div class="concl-myth-q"><div class="concl-myth-label" style="color:#e07060">❌ Миф</div>${myth.myth}</div>
      <div class="concl-myth-a"><div class="concl-myth-label" style="color:#80c878">✓ Реальность</div>${myth.reality}</div>
    </div>`;
  });
  html += `</div></div>`;
  html += `<div class="econ-section">
    <div class="econ-section-title" style="font-size:15px;font-weight:500;margin-bottom:1rem;display:flex;align-items:center;gap:8px"><span>📊</span> Россия vs нормальные государства — по фактам</div>
    <div class="concl-comparison">
      <div class="concl-comp-col">
        <div class="concl-comp-title" style="color:#4a8fc4">Германия <span style="color:var(--text3);font-weight:400;font-size:11px">для сравнения</span></div>
        ${[
          ["Свобода прессы (RSF 2024)", "10-е место из 180"],
          ["Контроль коррупции (TI)", "78/100, 9-е место"],
          ["Верховенство закона (WJP)", "0.83/1.0"],
          ["Гражданские свободы (FH)", "40/40"],
          ["Честность выборов", "Без оговорок"],
          ["Смена власти", "Регулярная, мирная"],
          ["Политзаключённые", "0"],
          ["Независимость суда", "Конституционно гарантирована"],
        ].map(([label, value]) => `<div class="concl-comp-row"><span class="concl-comp-label">${label}</span><span class="concl-comp-val" style="color:#4a8fc4">${value}</span></div>`).join("")}
      </div>
      <div class="concl-comp-col">
        <div class="concl-comp-title" style="color:#c94f3a">Россия <span style="color:var(--text3);font-weight:400;font-size:11px">реальные данные</span></div>
        ${[
          ["Свобода прессы (RSF 2024)", "164-е место из 180"],
          ["Контроль коррупции (TI)", "26/100, 141-е место"],
          ["Верховенство закона (WJP)", "0.34/1.0"],
          ["Гражданские свободы (FH)", "5/40"],
          ["Честность выборов", "Систематические нарушения"],
          ["Смена власти", "Не было с 1999-го"],
          ["Политзаключённые", "700+ (Мемориал до ликвидации)"],
          ["Независимость суда", "99.6% обвинительных"],
        ].map(([label, value]) => `<div class="concl-comp-row"><span class="concl-comp-label">${label}</span><span class="concl-comp-val" style="color:#c94f3a">${value}</span></div>`).join("")}
      </div>
    </div>
  </div>`;
  html += `<div class="econ-section">
    <div class="econ-section-title" style="font-size:15px;font-weight:500;margin-bottom:1rem;display:flex;align-items:center;gap:8px"><span>🗺</span> Как использовать этот проект — практическое руководство</div>
    <div class="concl-roadmap">`;
  roadmap.forEach((item) => {
    html += `<div class="concl-roadmap-item">
      <div class="concl-roadmap-icon">${item.icon}</div>
      <div><div class="concl-roadmap-title">${item.title}</div><div class="concl-roadmap-body">${item.body}</div></div>
    </div>`;
  });
  html += `</div></div>`;
  html += `<div class="econ-section">
    <div class="econ-section-title" style="font-size:15px;font-weight:500;margin-bottom:1rem;display:flex;align-items:center;gap:8px"><span>📚</span> Углублённое изучение — что читать дальше</div>
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:10px">`;
  sources.forEach((source) => {
    html += `<div style="background:var(--bg2);border:0.5px solid var(--border);border-radius:var(--r2);padding:14px 16px">
      <div style="font-size:11px;color:${source.color};font-weight:500;margin-bottom:8px;text-transform:uppercase;letter-spacing:0.5px">${source.cat}</div>
      ${source.items.map((item) => `<div style="font-size:12px;color:var(--text2);padding:3px 0;border-bottom:0.5px solid var(--border);line-height:1.5">${item}</div>`).join("")}
    </div>`;
  });
  html += `</div></div>`;
  html += `<div class="concl-final">
    <div class="concl-final-quote">"Самое опасное — это думать что понимание системы освобождает от неё. Понимание — это только начало. Важно что ты делаешь с этим пониманием."</div>
    <div class="concl-final-attr">Принцип этого проекта</div>
    <div style="margin-top:1.25rem;padding-top:1rem;border-top:0.5px solid var(--border);font-size:11px;color:var(--text3);line-height:1.7">
      Этот проект создан как инструмент понимания, а не агитации. Все данные основаны на задокументированных источниках: Freedom House, Transparency International, RSF, V-Dem, OCCRP, Carnegie Endowment, Levada Center, Atlantic Council. Последнее обновление: март 2026.
    </div>
  </div>`;
  return html;
}
