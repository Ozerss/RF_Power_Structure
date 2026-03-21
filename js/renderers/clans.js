function buildClansNet({ C, clans, relations, POS, NR }) {
  const W = 680;
  const H = 370;
  let svg = `<svg width="100%" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">`;

  const lineStyles = {
    strong: { stroke: "var(--green)", strokeW: 2.5, dash: "", opacity: 0.7 },
    work: { stroke: "var(--blue)", strokeW: 1.5, dash: "", opacity: 0.5 },
    tension: { stroke: "var(--red)", strokeW: 1.5, dash: "4 3", opacity: 0.6 },
    control: { stroke: "var(--amber)", strokeW: 1.5, dash: "2 3", opacity: 0.55 },
    new: { stroke: "var(--green)", strokeW: 3, dash: "", opacity: 0.9 },
  };

  Object.keys(POS)
    .filter((id) => id !== "putin")
    .forEach((id) => {
      const from = POS.putin;
      const to = POS[id];
      svg += `<line x1="${from.x}" y1="${from.y}" x2="${to.x}" y2="${to.y}" stroke="var(--amber)" stroke-width="1" stroke-dasharray="3 4" opacity="0.18"/>`;
    });

  relations.forEach((relation) => {
    const from = POS[relation.from];
    const to = POS[relation.to];
    if (!from || !to) return;
    const style = lineStyles[relation.type];
    svg += `<line x1="${from.x}" y1="${from.y}" x2="${to.x}" y2="${to.y}" stroke="${style.stroke}" stroke-width="${style.strokeW}"${style.dash ? ` stroke-dasharray="${style.dash}"` : ""} opacity="${style.opacity}"/>`;
  });

  Object.keys(POS).forEach((id) => {
    if (id === "putin") return;
    const clan = clans.find((item) => item.id === id);
    if (!clan) return;
    const pos = POS[id];
    const radius = NR[id];
    const color = C[id];
    const abbr = clan.name.substring(0, 3).toUpperCase();

    svg += `<g class="clan-node-g" data-clan="${id}" tabindex="0" role="button" aria-label="${clan.name}">`;
    svg += `<circle cx="${pos.x}" cy="${pos.y}" r="${radius + 6}" fill="${color}" opacity="0.06"/>`;
    svg += `<circle cx="${pos.x}" cy="${pos.y}" r="${radius}" fill="${color}" opacity="0.88" stroke="${color}" stroke-width="0.5"/>`;
    svg += `<text x="${pos.x}" y="${pos.y}" text-anchor="middle" dominant-baseline="central" fill="var(--text)" font-size="9" font-weight="600" font-family="sans-serif">${abbr}</text>`;

    const lcos = Math.cos(Math.atan2(pos.y - 180, pos.x - 340));
    const lsin = Math.sin(Math.atan2(pos.y - 180, pos.x - 340));
    const clanShort = clan.name.split(" ")[0];
    const clanEstW = clanShort.length * 6.5 + 4;
    let rawLx = pos.x + lcos * (radius + 8);
    let rawLy = pos.y + lsin * (radius + 8);
    let anchor = lcos > 0.3 ? "start" : lcos < -0.3 ? "end" : "middle";

    if (anchor === "start" && rawLx + clanEstW > 636) {
      anchor = "end";
      rawLx = pos.x - lcos * (radius + 8);
    }
    if (anchor === "end" && rawLx - clanEstW < 14) {
      anchor = "start";
      rawLx = pos.x + lcos * (radius + 8);
    }

    const lx = rawLx.toFixed(1);
    const ly = rawLy.toFixed(1);
    const baseline = lsin < -0.3 ? "auto" : lsin > 0.3 ? "hanging" : "central";
    svg += `<text x="${lx}" y="${ly}" text-anchor="${anchor}" dominant-baseline="${baseline}" fill="${color}" opacity="0.9" font-size="10" font-family="sans-serif">${clanShort}</text>`;
    svg += `</g>`;
  });

  const putinPos = POS.putin;
  svg += `<g class="clan-node-g" data-clan="putin-center">`;
  svg += `<circle cx="${putinPos.x}" cy="${putinPos.y}" r="42" fill="${C.putin}" opacity="0.1"/>`;
  svg += `<circle cx="${putinPos.x}" cy="${putinPos.y}" r="34" fill="${C.putin}" opacity="0.92" stroke="${C.putin}" stroke-width="1.5"/>`;
  svg += `<text x="${putinPos.x}" y="${putinPos.y - 4}" text-anchor="middle" dominant-baseline="central" fill="var(--text)" font-size="11" font-weight="600" font-family="sans-serif">ПУТИН</text>`;
  svg += `<text x="${putinPos.x}" y="${putinPos.y + 9}" text-anchor="middle" dominant-baseline="central" fill="var(--text2)" font-size="8" font-family="sans-serif">арбитр</text>`;
  svg += `</g></svg>`;

  return svg;
}

export function renderClanDetail(id, { C, BG, clans }) {
  const clan = clans.find((item) => item.id === id);
  if (!clan) return '<div class="clan-hint">Нажмите на узел для подробностей</div>';

  const color = C[id];
  const bg = BG[id];
  const trajIcons = ["▼ Ослабевает", "◆ Меняется", "● Стабилен", "▲ Растёт"];

  return `
    <button class="detail-close" aria-label="Закрыть">×</button>
    <div class="clan-detail-top">
      <div class="clan-detail-av clan-detail-av--icon" style="background:${bg}">${clan.icon}</div>
      <div class="clan-detail-nameblock">
        <div class="clan-detail-name" style="color:${color}">${clan.name}</div>
        <div class="clan-detail-sub">${clan.sub}</div>
        <div class="clan-detail-badges">
          <span class="clan-detail-badge" style="background:${bg};border-color:${color}44;color:${color}">${trajIcons[clan.traj]}</span>
          <span class="clan-detail-badge hier-detail-badge--neutral">Влияние: ${clan.power}/100</span>
          <span class="clan-detail-badge hier-detail-badge--neutral">Богатство: ${clan.wealth}/100</span>
        </div>
      </div>
      <div class="clan-detail-meters">
        <div class="clan-meter"><div class="clan-meter-label">Влияние</div><div class="clan-meter-bar"><div class="clan-meter-fill" style="width:${clan.power}%;background:${color}"></div></div></div>
        <div class="clan-meter"><div class="clan-meter-label">Стабильность</div><div class="clan-meter-bar"><div class="clan-meter-fill" style="width:${clan.stability}%;background:${color}88"></div></div></div>
        <div class="clan-meter"><div class="clan-meter-label">Богатство</div><div class="clan-meter-bar"><div class="clan-meter-fill" style="width:${clan.wealth}%;background:${color}"></div></div></div>
        <div class="clan-meter"><div class="clan-meter-label">Зависимость от войны</div><div class="clan-meter-bar"><div class="clan-meter-fill clan-meter-fill--war" style="width:${clan.traj === 3 ? 80 : clan.traj === 0 ? 40 : 20}%"></div></div></div>
      </div>
    </div>
    <div class="clan-detail-grid">
      <div class="clan-detail-section">
        <h5>Ключевые фигуры</h5>
        <div class="clan-figures-list">
          ${clan.figures.map((figure) => `<div class="clan-figure" style="border-color:${color}">${figure}</div>`).join("")}
        </div>
      </div>
      <div class="clan-detail-section">
        <h5>Ресурсная база</h5><p>${clan.resources}</p>
        <h5 class="clan-detail-heading-spaced">Отношения с Путиным</h5><p>${clan.putinrel}</p>
      </div>
      <div class="clan-detail-section">
        <h5>Влияние войны 2022+</h5><p>${clan.war}</p>
        <h5 class="clan-detail-heading-spaced">Внутренние противоречия</h5><p>${clan.internal}</p>
      </div>
    </div>
    <div class="clan-warn"><strong>Уязвимость:</strong> ${clan.vuln}</div>`;
}

function buildClanCards({ C, BG, clans }) {
  let html = '<div class="clan-cards-grid">';
  clans.forEach((clan) => {
    const color = C[clan.id];
    const bg = BG[clan.id];
    const trajIcons = ["▼", "◆", "●", "▲"];
    const trajColors = ["var(--red)", "var(--amber)", "var(--text3)", "var(--green)"];
    html += `<div class="clan-card-item" data-clan-card="${clan.id}" tabindex="0" role="button" aria-expanded="false" aria-label="${clan.name}">
      <div class="cci-head">
        <div class="cci-icon">${clan.icon}</div>
        <div class="cci-nameblock">
          <div class="cci-name" style="color:${color}">${clan.name}</div>
          <div class="cci-sub">${clan.sub}</div>
        </div>
        <span class="cci-traj" style="color:${trajColors[clan.traj]}">${trajIcons[clan.traj]}</span>
        <div class="cci-chev">›</div>
      </div>
      <div class="cci-bars">
        <div class="cci-bar"><div class="cci-bar-label">Влияние</div><div class="cci-bar-bg"><div class="cci-bar-fill" style="width:${clan.power}%;background:${color}"></div></div></div>
        <div class="cci-bar"><div class="cci-bar-label">Стабильность</div><div class="cci-bar-bg"><div class="cci-bar-fill" style="width:${clan.stability}%;background:${color}88"></div></div></div>
        <div class="cci-bar"><div class="cci-bar-label">Богатство</div><div class="cci-bar-bg"><div class="cci-bar-fill" style="width:${clan.wealth}%;background:${color}"></div></div></div>
      </div>
      <div class="cci-body">
        <div class="cci-body-inner">
          <h5>Ключевые фигуры</h5>
          <div class="cci-figures-list">
            ${clan.figures.map((figure) => `<div class="cci-figure" style="border-left-color:${color}">${figure}</div>`).join("")}
          </div>
          <h5>Ресурсы</h5><p>${clan.resources}</p>
          <h5>Влияние войны</h5><p>${clan.war}</p>
          <h5>Внутренние противоречия</h5><p>${clan.internal}</p>
          <h5>Уязвимость</h5>
          <p class="cci-vuln">${clan.vuln}</p>
          <div class="cci-tags">${clan.tags.map((tag) => `<span class="cci-tag" style="background:${bg};border-color:${color}44;color:${color}">${tag}</span>`).join("")}</div>
        </div>
      </div>
    </div>`;
  });
  html += "</div>";
  return html;
}

function buildEquilibrium() {
  const blocks = [
    { n: "1", title: "Круговая порука через соучастие", color: "var(--red)", body: "Каждый значимый игрок совершил действия которые при другом режиме стали бы уголовными. Силовики — операции квалифицируемые как госпреступления. Бизнес — незаконные схемы. Чиновники — нарушение закона. Журналисты — пропаганда. Предать систему = открыть себя для преследования. Это не страх — это рациональный расчёт.", example: "Пример: ни один из «системных» олигархов не выступил против войны открыто. Те кто уехал — молчат. Те кто остались — публично поддерживают. Расчёт понятен." },
    { n: "2", title: "Рента распределяется по всем уровням", color: "var(--amber)", body: "Система даёт каждому значимому участнику нечто реальное: силовикам — власть и защиту, бизнесу — контракты и активы, технократам — статус и карьеру, медиа — финансирование. Выход из системы означает потерю этого потока немедленно. Это не угроза — это автоматическое следствие.", example: "Госконтракт получает не тот кто предложил лучшую цену — тот кто правильно встроен. Завышение в 30–40% — не воровство, а «стоимость лояльности»." },
    { n: "3", title: "Путин — единственная точка арбитража", color: "var(--amber)", body: "Ни один клан не достаточно силён чтобы уничтожить другой без Путина. Силовики сильнее технократов? Да. Но технократы контролируют деньги и медиа. Госкапитал богаче? Да. Но без силовых структур уязвим. Только Путин может «разрешить» конфликт между ними. Это и есть его реальная власть — не насилие, а незаменимость.", example: "Конфликт Сечина и Чемезова за ВПК-ресурсы не перешёл в открытое столкновение именно потому что у обоих нет возможности победить без путинского арбитража." },
    { n: "4", title: "Нет координационной точки против системы", color: "var(--blue)", body: "Предположим чиновник хочет сменить систему. Ему нужны союзники. Но с кем говорить? ФСБ прослушивает. Никто не знает что думают другие — все молчат из тех же расчётов. Нет оппозиции которая гарантирует защиту. Нет международного партнёра который гарантирует безопасность. Первый кто заговорит — рискует всем в одностороннем порядке.", example: "Каждый в системе думает что он один так думает. Это «спираль молчания» которую описал Ноэль-Нойманн — только в масштабе государственной элиты." },
    { n: "5", title: "Война как новый цементирующий фактор", color: "var(--green)", body: "С 2022-го добавился новый элемент: военная экономика создала новую ренту (ВПК-контракты), новое соучастие (военные преступления) и новый нарратив легитимности (экзистенциальная война). Выйти из системы теперь сложнее: ты соучастник уже не только коррупции, но и войны. Международная уголовная ответственность добавляет ещё один замок.", example: "МУС выдал ордер на Путина. Но логика распространяется: любой кто участвовал в принятии решений о войне — потенциально уязвим для преследования. Это самый новый, самый крепкий замок." },
    { n: "6", title: "Но система не вечна — три точки хрупкости", color: "var(--red)", body: "Система держится пока: (1) рента распределяется — если экономика коллапсирует, ренты нет. (2) Путин арбитрует — если он уйдёт, арбитра нет. (3) война продолжается — если она заканчивается поражением, нарратив рушится. Ни одно из этих условий не гарантировано вечно.", example: "Иранский режим существует 45 лет под санкциями. Советский союз просуществовал 70 лет. Но оба в итоге изменились — один медленно, другой внезапно." },
  ];

  let html = '<div class="equil-grid">';
  blocks.forEach((block) => {
    html += `<div class="equil-card">
      <div class="equil-num" style="color:${block.color}">${block.n}</div>
      <div class="equil-title" style="color:${block.color}">${block.title}</div>
      <div class="equil-body">${block.body}</div>
      <div class="equil-example">${block.example}</div>
    </div>`;
  });
  html += "</div>";
  return html;
}

export function renderClansSection({ mode, selClan, C, BG, clans, relations, POS, NR }) {
  const modeContent =
    mode === "net"
      ? `
        <div class="clan-rel-legend">
          <div class="clan-rel-leg-item"><svg width="28" height="4"><line x1="0" y1="2" x2="28" y2="2" stroke="var(--green)" stroke-width="2.5" opacity="0.8"/></svg>Сильный союз</div>
          <div class="clan-rel-leg-item"><svg width="28" height="4"><line x1="0" y1="2" x2="28" y2="2" stroke="var(--blue)" stroke-width="1.5" opacity="0.6"/></svg>Рабочий контакт</div>
          <div class="clan-rel-leg-item"><svg width="28" height="4"><line x1="0" y1="2" x2="28" y2="2" stroke="var(--red)" stroke-width="1.5" stroke-dasharray="4 3" opacity="0.7"/></svg>Напряжение</div>
          <div class="clan-rel-leg-item"><svg width="28" height="4"><line x1="0" y1="2" x2="28" y2="2" stroke="var(--amber)" stroke-width="1.5" stroke-dasharray="2 3" opacity="0.65"/></svg>Контроль</div>
          <div class="clan-rel-leg-item"><svg width="28" height="4"><line x1="0" y1="2" x2="28" y2="2" stroke="var(--green)" stroke-width="3"/></svg>Новый союз (2022+)</div>
          <div class="clan-rel-leg-item hier-legend-hint">Нажмите на узел</div>
        </div>
        <div class="clan-net-wrap">${buildClansNet({ C, clans, relations, POS, NR })}</div>
        <div class="clan-detail-panel${selClan ? " active" : ""}" id="clan-detail-out" role="region" aria-live="polite" aria-label="Подробности">
          <div class="clan-hint">Нажмите на любой узел чтобы увидеть подробности о клане</div>
        </div>`
      : mode === "cards"
        ? buildClanCards({ C, BG, clans })
        : buildEquilibrium();

  return `
    <div class="hier-header">
      <div>
        <div class="section-title flow-section-title">Кланы и сети — карта реального влияния 2026</div>
        <div class="hier-subtitle">Силовики, технократы и госкапиталисты постоянно конкурируют между собой. Но ни один не может победить другого без Путина. В этом и состоит его власть — не в должности, а в том что он единственный арбитр.</div>
      </div>
      <div class="clan-mode-toggle">
        <button class="clan-mode-btn${mode === "net" ? " active" : ""}" data-mode="net">Паутина власти</button>
        <button class="clan-mode-btn${mode === "cards" ? " active" : ""}" data-mode="cards">Карточки кланов</button>
        <button class="clan-mode-btn${mode === "equil" ? " active" : ""}" data-mode="equil">Почему держится</button>
      </div>
    </div>
    <div class="stat-grid">
      <div class="stat-card stat-card--compact"><div class="stat-num stat-num--amber">7</div><div class="stat-label">кланов в системе</div></div>
      <div class="stat-card stat-card--compact"><div class="stat-num stat-num--green">3</div><div class="stat-label">союза укреплены войной</div></div>
      <div class="stat-card stat-card--compact"><div class="stat-num stat-num--red">4</div><div class="stat-label">зоны напряжения</div></div>
      <div class="stat-card stat-card--compact"><div class="stat-num stat-num--purple">0</div><div class="stat-label">игроков могут победить без Путина</div></div>
    </div>
    <div id="clan-mode-area">${modeContent}</div>`;
}
