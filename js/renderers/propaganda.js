export function renderPropagandaSection({ levels, narratives, techniques, checks }) {
  let html = "";
  html += `<div class="econ-section">
    <div class="econ-section-title"><span>💰</span> Масштаб: сколько стоит контроль над умами</div>
    <div class="econ-grid">
      <div class="econ-stat"><div class="econ-stat-num prop-stat--red">₽137 млрд</div><div class="econ-stat-label">бюджет пропаганды 2025</div><div class="econ-stat-sub">Больше бюджета Калининградской области</div></div>
      <div class="econ-stat"><div class="econ-stat-num prop-stat--amber">+13%</div><div class="econ-stat-label">рост расходов на СМИ vs 2024</div><div class="econ-stat-sub">Ежегодный рост несмотря на дефицит бюджета</div></div>
      <div class="econ-stat"><div class="econ-stat-num prop-stat--purple">₽25 млрд</div><div class="econ-stat-label">бюджет ИРИ на 2025</div><div class="econ-stat-sub">Институт развития интернета — цифровая пропаганда</div></div>
      <div class="econ-stat"><div class="econ-stat-num prop-stat--green">163</div><div class="econ-stat-label">проекта финансировал ИРИ за год</div><div class="econ-stat-sub">₽10 млрд на контент лояльных блогеров</div></div>
    </div>
  </div>`;
  html += `<div class="econ-section">
    <div class="econ-section-title"><span>🏛</span> Вертикаль — кто чем управляет</div>
    <div class="prop-pyramid">`;
  levels.forEach((level) => {
    html += `<div class="prop-level" style="background:${level.bg};border:0.5px solid ${level.border}">
      <div class="prop-level-badge" style="color:${level.color}">${level.badge}</div>
      <div class="prop-level-title" style="color:${level.color}">${level.title}</div>
      <div class="prop-level-sub" style="color:${level.color}">${level.sub}</div>
    </div>`;
  });
  html += `</div></div>`;
  html += `<div class="econ-section">
    <div class="econ-section-title"><span>🗣</span> Главные нарративы — и почему они работают</div>
    <div class="prop-narrative-grid">`;
  narratives.forEach((narrative) => {
    html += `<div class="prop-narrative">
      <div class="prop-narrative-title">${narrative.icon} <span style="color:${narrative.color}">${narrative.title}</span></div>
      <div class="prop-narrative-body">${narrative.body}</div>
      <div class="prop-narrative-refute" style="background:${narrative.color}0f;border-color:${narrative.color};color:${narrative.color}cc">
        <strong class="prop-refute-label">Почему работает</strong>${narrative.why}
      </div>
      <div class="prop-narrative-refute prop-refute-green">
        <strong class="prop-refute-label">Разбор</strong>${narrative.refute}
      </div>
    </div>`;
  });
  html += `</div></div>`;
  html += `<div class="econ-section">
    <div class="econ-section-title"><span>🔧</span> Технологии — как именно это работает</div>
    <div class="prop-technique-list">`;
  techniques.forEach((technique, index) => {
    html += `<div class="prop-technique">
      <div class="prop-tech-head">
        <div class="prop-tech-num">${String(index + 1).padStart(2, "0")}</div>
        <div class="prop-tech-title">${technique.title}</div>
        <div class="prop-tech-chevron">›</div>
      </div>
      <div class="prop-tech-body"><div class="prop-tech-inner">${technique.body}</div></div>
    </div>`;
  });
  html += `</div></div>`;
  html += `<div class="econ-section">
    <div class="econ-section-title"><span>🛡</span> Иммунизация — как распознать пропаганду в реальном времени</div>
    <div class="prop-inoculate">
      <h4>Когда слышишь или читаешь что-то — задай эти вопросы:</h4>`;
  checks.forEach((check) => {
    html += `<div class="prop-inoculate-item">
      <div class="prop-inoculate-q">${check.q}</div>
      <div class="prop-inoculate-a">${check.a}</div>
    </div>`;
  });
  html += `</div></div>`;
  return html;
}
