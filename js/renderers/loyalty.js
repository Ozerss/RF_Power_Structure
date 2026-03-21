function buildTrapSvg({ mechs }) {
  const W = 680;
  const H = 370;
  const CX = 165;
  const CY = 185;
  const LAYERS = [
    { id: "war_complicity", r: 162 },
    { id: "complicity", r: 146 },
    { id: "law", r: 128 },
    { id: "panopticon", r: 108 },
    { id: "noexit", r: 87 },
    { id: "rent", r: 65 },
    { id: "normalization", r: 42 },
  ];
  const SOLID = {
    war_complicity: "var(--red)",
    complicity: "var(--amber)",
    law: "var(--red)",
    panopticon: "var(--purple)",
    noexit: "var(--blue)",
    rent: "var(--amber)",
    normalization: "var(--green)",
  };
  const FILL = {
    war_complicity: { color: "var(--red)", opacity: 0.82 },
    complicity: { color: "var(--amber)", opacity: 0.8 },
    law: { color: "var(--red)", opacity: 0.78 },
    panopticon: { color: "var(--purple)", opacity: 0.78 },
    noexit: { color: "var(--blue)", opacity: 0.78 },
    rent: { color: "var(--amber)", opacity: 0.78 },
    normalization: { color: "var(--green)", opacity: 0.85 },
  };
  const mechMap = Object.fromEntries(mechs.map((mech) => [mech.id, mech]));

  let svg = `<svg width="100%" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">`;
  LAYERS.forEach((layer) => {
    svg += `<g class="trap-node-g" data-mech="${layer.id}" tabindex="0" role="button" aria-label="${mechMap[layer.id]?.name || layer.id}">`;
    svg += `<circle cx="${CX}" cy="${CY}" r="${layer.r}" fill="${FILL[layer.id].color}" opacity="${FILL[layer.id].opacity}" stroke="${SOLID[layer.id]}" stroke-width="0.5" class="trap-ring-fill"/>`;
    svg += `</g>`;
  });

  svg += `<circle cx="${CX}" cy="${CY}" r="28" fill="var(--amber)" opacity="0.95" stroke="var(--amber)" stroke-width="1"/>`;
  svg += `<text x="${CX}" y="${CY - 5}" text-anchor="middle" dominant-baseline="central" fill="var(--text)" font-size="11" font-weight="600" font-family="sans-serif">АКТОР</text>`;
  svg += `<text x="${CX}" y="${CY + 8}" text-anchor="middle" dominant-baseline="central" fill="var(--text2)" font-size="8" font-family="sans-serif">системы</text>`;

  const PX = 348;
  svg += `<text x="${PX}" y="22" fill="var(--text2)" opacity="0.4" font-size="9" font-family="sans-serif">Механизм</text>`;
  svg += `<text x="${PX + 178}" y="22" fill="var(--text2)" opacity="0.4" font-size="9" font-family="sans-serif" text-anchor="end">Интенсивность</text>`;

  const mechOrder = ["war_complicity", "complicity", "law", "panopticon", "noexit", "rent", "normalization"];
  const mechLabels = {
    war_complicity: "06 Война — замок",
    complicity: "02 Соучастие",
    law: "01 Закон-оружие",
    panopticon: "04 Паноптикум",
    noexit: "05 Нет выхода",
    rent: "03 Рента и доступ",
    normalization: "07 Нормализация",
  };
  const intensities = { war_complicity: 98, complicity: 95, law: 85, panopticon: 88, noexit: 90, rent: 80, normalization: 72 };

  mechOrder.forEach((id, index) => {
    const color = SOLID[id];
    const y = 36 + index * 46;
    const pct = intensities[id];
    const maxBarW = 130;
    const barW = Math.round((pct / 100) * maxBarW);
    svg += `<g class="trap-node-g" data-mech="${id}" tabindex="0" role="button" aria-label="${mechMap[id]?.name || id}">`;
    svg += `<rect x="${PX}" y="${y}" width="10" height="10" rx="2" fill="${color}" opacity="0.9"/>`;
    svg += `<text x="${PX + 14}" y="${y + 9}" fill="${color}" font-size="10" font-family="sans-serif">${mechLabels[id]}</text>`;
    svg += `<rect x="${PX}" y="${y + 14}" width="${maxBarW}" height="6" rx="3" fill="var(--border)"/>`;
    svg += `<rect x="${PX}" y="${y + 14}" width="${barW}" height="6" rx="3" fill="${color}" opacity="0.8"/>`;
    svg += `<text x="${PX + maxBarW + 6}" y="${y + 20}" fill="${color}" font-size="9" font-family="sans-serif">${pct}%</text>`;
    svg += `</g>`;
  });

  svg += `</svg>`;
  return svg;
}

export function renderLoyaltyDetail(id, { mechs }) {
  const mech = mechs.find((item) => item.id === id);
  if (!mech) {
    return `<div class="trap-detail"><div class="trap-detail-title trap-detail-hint">Нажмите на механизм для подробностей</div></div>`;
  }

  return `<div class="trap-detail active">
    <button class="detail-close" aria-label="Закрыть">×</button>
    <div class="trap-detail-header">
      <div class="trap-detail-icon" style="background:${mech.bg}">${mech.icon}</div>
      <div class="trap-detail-body">
        <div class="trap-detail-title" style="color:${mech.color}">${mech.label} ${mech.name}</div>
        <div class="trap-detail-sub">${mech.sub}</div>
        <div class="trap-detail-meta">
          ${mech.layers.map((layer) => `<span class="trap-meta-badge" style="background:${mech.bg};border-color:${mech.color}44;color:${mech.color}">${layer}</span>`).join("")}
        </div>
      </div>
      <div class="trap-profile">
        <div class="trap-profile-heading">Профиль воздействия</div>
        ${[
          ["Интенсивность", mech.intensity],
          ["Страх/принуждение", mech.fear],
          ["Материальный", mech.material],
          ["Социальный", mech.social],
        ]
          .map(
            ([label, value]) => `<div class="trap-profile-row">
              <div class="trap-profile-label">${label}</div>
              <div class="trap-profile-bar">
                <div style="width:${value}%;height:3px;background:${mech.color};border-radius:2px"></div>
              </div>
            </div>`
          )
          .join("")}
      </div>
    </div>
    <div class="trap-detail-grid">
      <div class="trap-section"><h5>Как работает</h5><p>${mech.body}</p></div>
      <div class="trap-section"><h5>Задокументированные примеры</h5><p>${mech.examples}</p></div>
      <div class="trap-section">
        <h5>Влияние войны 2022+</h5><p>${mech.war}</p>
        <div class="trap-warning green"><strong>Как выйти:</strong> ${mech.escape}</div>
      </div>
    </div>
  </div>`;
}

function intensityDots(count, color) {
  return Array.from(
    { length: 5 },
    (_, index) => `<div class="rc-dot" style="background:${index < count ? color : "var(--border)"}"></div>`
  ).join("");
}

function renderRoles({ roles, mechs }) {
  let html = '<div class="trap-intro">Один и тот же механизм давит на разных людей по-разному. Нажмите на роль чтобы увидеть как ловушка закрывается для каждого.</div>';
  html += '<div class="roles-grid">';
  roles.forEach((role) => {
    html += `<div class="role-card" data-role-card="${role.id}" tabindex="0" role="button" aria-expanded="false" aria-label="${role.name}">
      <div class="rc-head">
        <div class="rc-av" style="background:${role.bg}">${role.icon}</div>
        <div><div class="rc-name" style="color:${role.color}">${role.name}</div><div class="rc-sub">${role.sub}</div></div>
        <div class="rc-chev">›</div>
      </div>
      <div class="rc-body">
        <div class="rc-body-inner">
          <div class="trap-intro trap-intro--tight">${role.intro}</div>
          ${role.mechs
            .map((roleMech) => {
              const mech = mechs.find((item) => item.id === roleMech.id);
              if (!mech) return "";
              return `<div class="rc-mech-row">
                <div class="rc-mech-icon" style="background:${mech.bg}">${mech.icon}</div>
                <div class="rc-mech-main">
                  <div class="rc-mech-label" style="color:${mech.color}">${mech.name}</div>
                  <div class="rc-mech-body">${roleMech.text}</div>
                  <div class="rc-intensity">${intensityDots(roleMech.intensity, mech.color)}</div>
                </div>
              </div>`;
            })
            .join("")}
          <div class="rc-escape"><strong>Теоретический выход:</strong> ${role.escape}</div>
        </div>
      </div>
    </div>`;
  });
  html += "</div>";
  return html;
}

function renderCases({ cases, mechs }) {
  let html = '<div class="trap-intro">Реальные задокументированные случаи — каждый иллюстрирует конкретную комбинацию механизмов.</div>';
  html += '<div class="cases-list">';
  cases.forEach((item, index) => {
    html += `<div class="case-item" tabindex="0" role="button" aria-expanded="false" aria-label="${item.title}">
      <div class="ci-head">
        <div class="ci-num">${String(index + 1).padStart(2, "0")}</div>
        <div class="ci-title">${item.title}</div>
        <div class="ci-mechs">
          ${item.mechs
            .map((mechId) => {
              const mech = mechs.find((entry) => entry.id === mechId);
              return mech
                ? `<span class="ci-mech-tag" style="background:${mech.bg};border-color:${mech.color}44;color:${mech.color}">${mech.icon} ${mech.name.substring(0, 12)}</span>`
                : "";
            })
            .join("")}
        </div>
        <div class="ci-chev">›</div>
      </div>
      <div class="ci-body"><div class="ci-body-inner">${item.body}</div></div>
    </div>`;
  });
  html += "</div>";
  return html;
}

export function renderLoyaltySection({ mode, selMech, mechs, roles, cases }) {
  const modeContent =
    mode === "trap"
      ? `
        <div class="trap-intro trap-intro--tight">Каждое кольцо — отдельный механизм удержания. Чем ближе к центру — тем более «мягкий» и незаметный. Чем дальше — тем более жёсткий. Нажмите на кольцо или на механизм в легенде.</div>
        <div class="trap-svg-wrap">${buildTrapSvg({ mechs })}</div>
        <div id="mech-detail-out" role="region" aria-live="polite" aria-label="Подробности">${renderLoyaltyDetail(selMech, { mechs })}</div>`
      : mode === "roles"
        ? renderRoles({ roles, mechs })
        : renderCases({ cases, mechs });

  return `
    <div class="hier-header">
      <div>
        <div class="section-title flow-section-title">Механизмы лояльности — как система удерживает людей</div>
        <div class="hier-subtitle">После февраля 2022-го Россию покинули сотни тысяч человек. Но миллионы образованных, думающих людей остались — и продолжают работать в системе. Здесь показано почему это рациональное решение, а не трусость.</div>
      </div>
      <div class="trap-mode-wrap">
        <button class="mech-mode-btn${mode === "trap" ? " active" : ""}" data-mode="trap">Ловушка</button>
        <button class="mech-mode-btn${mode === "roles" ? " active" : ""}" data-mode="roles">По ролям</button>
        <button class="mech-mode-btn${mode === "cases" ? " active" : ""}" data-mode="cases">Кейсы</button>
      </div>
    </div>
    <div class="stat-grid">
      <div class="stat-card stat-card--compact"><div class="stat-num stat-num--amber">7</div><div class="stat-label">механизмов удержания</div></div>
      <div class="stat-card stat-card--compact"><div class="stat-num stat-num--red">98%</div><div class="stat-label">интенсивность войны как замка</div></div>
      <div class="stat-card stat-card--compact"><div class="stat-num stat-num--purple">0</div><div class="stat-label">явных угроз — всё работает автоматически</div></div>
      <div class="stat-card stat-card--compact"><div class="stat-num stat-num--green">1</div><div class="stat-label">случай открытого бунта за 25 лет (Пригожин)</div></div>
    </div>
    <div id="mech-mode-area">${modeContent}</div>`;
}
