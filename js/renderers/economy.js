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
    <div style="background:var(--bg2);border:0.5px solid var(--border);border-radius:var(--r2);padding:1.25rem;margin-bottom:1rem">
      <div style="font-size:12px;color:var(--text2);margin-bottom:12px">Главный поток: от недр к карману элиты</div>
      <div class="econ-flow-row">
        <div class="econ-flow-step" style="background:rgba(212,145,58,0.12);border:0.5px solid rgba(212,145,58,0.3);color:#d4a060"><strong style="display:block;margin-bottom:3px">Ресурсы</strong>Нефть, газ, металлы из земли</div>
        <div class="econ-flow-arrow">→</div>
        <div class="econ-flow-step" style="background:rgba(212,145,58,0.12);border:0.5px solid rgba(212,145,58,0.3);color:#d4a060"><strong style="display:block;margin-bottom:3px">Госкорпорации</strong>Роснефть, Газпром, Алроса</div>
        <div class="econ-flow-arrow">→</div>
        <div class="econ-flow-step" style="background:rgba(74,143,196,0.12);border:0.5px solid rgba(74,143,196,0.3);color:#70a8d8"><strong style="display:block;margin-bottom:3px">Бюджет</strong>30–50% доходов из углеводородов</div>
        <div class="econ-flow-arrow">→</div>
        <div class="econ-flow-step" style="background:rgba(201,79,58,0.12);border:0.5px solid rgba(201,79,58,0.3);color:#e07060"><strong style="display:block;margin-bottom:3px">Силовики и ВПК</strong>40% расходов в 2025</div>
        <div class="econ-flow-arrow">→</div>
        <div class="econ-flow-step" style="background:rgba(122,110,196,0.12);border:0.5px solid rgba(122,110,196,0.3);color:#a098d8"><strong style="display:block;margin-bottom:3px">Офшоры</strong>BVI, Кипр, ОАЭ, Швейцария</div>
      </div>
      <div style="font-size:12px;color:var(--text2);margin-top:4px;margin-bottom:12px">Параллельный поток: госконтракты как инструмент лояльности</div>
      <div class="econ-flow-row">
        <div class="econ-flow-step" style="background:rgba(74,143,196,0.12);border:0.5px solid rgba(74,143,196,0.3);color:#70a8d8"><strong style="display:block;margin-bottom:3px">Бюджет</strong>Госзаказ без реального тендера</div>
        <div class="econ-flow-arrow">→</div>
        <div class="econ-flow-step" style="background:rgba(212,145,58,0.12);border:0.5px solid rgba(212,145,58,0.3);color:#d4a060"><strong style="display:block;margin-bottom:3px">Нужные компании</strong>Ротенберги, Тимченко, круг лояльных</div>
        <div class="econ-flow-arrow">→</div>
        <div class="econ-flow-step" style="background:rgba(212,145,58,0.12);border:0.5px solid rgba(212,145,58,0.3);color:#d4a060"><strong style="display:block;margin-bottom:3px">Завышенная цена</strong>30–40% наценка к рыночной</div>
        <div class="econ-flow-arrow">→</div>
        <div class="econ-flow-step" style="background:rgba(122,110,196,0.12);border:0.5px solid rgba(122,110,196,0.3);color:#a098d8"><strong style="display:block;margin-bottom:3px">Откат наверх</strong>Часть возвращается в систему</div>
        <div class="econ-flow-arrow">→</div>
        <div class="econ-flow-step" style="background:rgba(90,158,82,0.12);border:0.5px solid rgba(90,158,82,0.3);color:#80b878"><strong style="display:block;margin-bottom:3px">Лояльность</strong>Круговая порука закреплена деньгами</div>
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
    <div style="background:var(--bg2);border:0.5px solid var(--border);border-radius:var(--r2);padding:1.25rem">
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:12px;font-size:12px;color:var(--text2)">
        <div><div style="font-size:11px;color:var(--text3);margin-bottom:6px;text-transform:uppercase;letter-spacing:0.6px">Расследования</div>
          <div style="line-height:2">OCCRP — occrp.org<br>ICIJ Pandora/Panama Papers<br>iStories (istories.media)<br>Meduza (meduza.io)</div></div>
        <div><div style="font-size:11px;color:var(--text3);margin-bottom:6px;text-transform:uppercase;letter-spacing:0.6px">Книги</div>
          <div style="line-height:2">Белтон — "Люди Путина"<br>Дотсон — "Клептократия Путина"<br>Зыгарь — "Все кремлёвские люди"<br>Ослунд — "Крони-капитализм"</div></div>
        <div><div style="font-size:11px;color:var(--text3);margin-bottom:6px;text-transform:uppercase;letter-spacing:0.6px">Аналитика</div>
          <div style="line-height:2">Carnegie Russia Eurasia Center<br>Oxford Institute for Energy Studies<br>Bruegel (bruegel.org)<br>Atlantic Council</div></div>
      </div>
    </div>
  </div>`;
  return html;
}
