export function renderEconomySection({ stats, econCards }) {
  let html = `<div class="econ-section">
    <div class="econ-section-title"><span>📊</span> Цифры которые объясняют всё</div>
    <div class="econ-grid">`;
  stats.forEach((stat) => {
    html += `<div class="econ-stat">
      <div class="econ-stat-num" style="color:${stat.color}">${stat.num}</div>
      <div class="econ-stat-label">${stat.label}</div>
      <div class="econ-stat-sub">${stat.sub}</div>
    </div>`;
  });
  html += `</div></div>`;
  html += `<div class="econ-section">
    <div class="econ-section-title"><span>🔄</span> Как деньги текут через систему</div>
    <div class="econ-flow-wrap">
      <div class="econ-flow-label">Главный поток: от недр к карману элиты</div>
      <div class="econ-flow-row">
        <div class="econ-flow-step econ-flow-step--amber"><strong class="econ-flow-step-title">Ресурсы</strong>Нефть, газ, металлы из земли</div>
        <div class="econ-flow-arrow">→</div>
        <div class="econ-flow-step econ-flow-step--amber"><strong class="econ-flow-step-title">Госкорпорации</strong>Роснефть, Газпром, Алроса</div>
        <div class="econ-flow-arrow">→</div>
        <div class="econ-flow-step econ-flow-step--blue"><strong class="econ-flow-step-title">Бюджет</strong>30–50% доходов из углеводородов</div>
        <div class="econ-flow-arrow">→</div>
        <div class="econ-flow-step econ-flow-step--red"><strong class="econ-flow-step-title">Силовики и ВПК</strong>40% расходов в 2025</div>
        <div class="econ-flow-arrow">→</div>
        <div class="econ-flow-step econ-flow-step--purple"><strong class="econ-flow-step-title">Офшоры</strong>BVI, Кипр, ОАЭ, Швейцария</div>
      </div>
      <div class="econ-flow-label econ-flow-label--secondary">Параллельный поток: госконтракты как инструмент лояльности</div>
      <div class="econ-flow-row">
        <div class="econ-flow-step econ-flow-step--blue"><strong class="econ-flow-step-title">Бюджет</strong>Госзаказ без реального тендера</div>
        <div class="econ-flow-arrow">→</div>
        <div class="econ-flow-step econ-flow-step--amber"><strong class="econ-flow-step-title">Нужные компании</strong>Ротенберги, Тимченко, круг лояльных</div>
        <div class="econ-flow-arrow">→</div>
        <div class="econ-flow-step econ-flow-step--amber"><strong class="econ-flow-step-title">Завышенная цена</strong>30–40% наценка к рыночной</div>
        <div class="econ-flow-arrow">→</div>
        <div class="econ-flow-step econ-flow-step--purple"><strong class="econ-flow-step-title">Откат наверх</strong>Часть возвращается в систему</div>
        <div class="econ-flow-arrow">→</div>
        <div class="econ-flow-step econ-flow-step--green"><strong class="econ-flow-step-title">Лояльность</strong>Круговая порука закреплена деньгами</div>
      </div>
    </div>
  </div>`;
  html += `<div class="econ-section"><div class="econ-section-title"><span>🔬</span> Механизмы подробно</div>`;
  econCards.forEach((card) => {
    html += `<div class="econ-card">
      <div class="econ-card-head">
        <div class="econ-card-icon">${card.icon}</div>
        <div class="econ-card-title">${card.title}</div>
        <div class="econ-card-badge" style="background:${card.badgeColor}18;border-color:${card.badgeColor}44;color:${card.badgeColor}">${card.badge}</div>
        <div class="econ-chevron">›</div>
      </div>
      <div class="econ-card-body"><div class="econ-card-inner">${card.body}</div></div>
    </div>`;
  });
  html += `</div>`;
  html += `<div class="econ-section">
    <div class="econ-section-title"><span>📚</span> Источники и где копать дальше</div>
    <div class="econ-sources-wrap">
      <div class="econ-sources-grid">
        <div><div class="econ-sources-cat">Расследования</div>
          <div class="econ-sources-list">OCCRP — occrp.org<br>ICIJ Pandora/Panama Papers<br>iStories (istories.media)<br>Meduza (meduza.io)</div></div>
        <div><div class="econ-sources-cat">Книги</div>
          <div class="econ-sources-list">Белтон — "Люди Путина"<br>Дотсон — "Клептократия Путина"<br>Зыгарь — "Все кремлёвские люди"<br>Ослунд — "Крони-капитализм"</div></div>
        <div><div class="econ-sources-cat">Аналитика</div>
          <div class="econ-sources-list">Carnegie Russia Eurasia Center<br>Oxford Institute for Energy Studies<br>Bruegel (bruegel.org)<br>Atlantic Council</div></div>
      </div>
    </div>
  </div>`;
  return html;
}
