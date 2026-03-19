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
    war_complicity: "#b41e1e",
    complicity: "#d46020",
    law: "#c94f3a",
    panopticon: "#7a6ec4",
    noexit: "#4a8fc4",
    rent: "#d4913a",
    normalization: "#5a9e52",
  };
  const FILL = {
    war_complicity: "rgba(180,30,30,0.82)",
    complicity: "rgba(212,96,32,0.80)",
    law: "rgba(201,79,58,0.78)",
    panopticon: "rgba(122,110,196,0.78)",
    noexit: "rgba(74,143,196,0.78)",
    rent: "rgba(212,145,58,0.78)",
    normalization: "rgba(90,158,82,0.85)",
  };

  let svg = `<svg width="100%" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">`;
  LAYERS.forEach((layer) => {
    svg += `<g class="trap-node-g" data-mech="${layer.id}">`;
    svg += `<circle cx="${CX}" cy="${CY}" r="${layer.r}" fill="${FILL[layer.id]}" stroke="${SOLID[layer.id]}" stroke-width="0.5" class="trap-ring-fill"/>`;
    svg += `</g>`;
  });

  svg += `<circle cx="${CX}" cy="${CY}" r="28" fill="rgba(212,145,58,0.95)" stroke="#d4913a" stroke-width="1"/>`;
  svg += `<text x="${CX}" y="${CY - 5}" text-anchor="middle" dominant-baseline="central" fill="#fff" font-size="11" font-weight="600" font-family="sans-serif">АКТОР</text>`;
  svg += `<text x="${CX}" y="${CY + 8}" text-anchor="middle" dominant-baseline="central" fill="rgba(255,255,255,0.65)" font-size="8" font-family="sans-serif">системы</text>`;

  const PX = 348;
  svg += `<text x="${PX}" y="22" fill="rgba(255,255,255,0.4)" font-size="9" font-family="sans-serif">Механизм</text>`;
  svg += `<text x="${PX + 178}" y="22" fill="rgba(255,255,255,0.4)" font-size="9" font-family="sans-serif" text-anchor="end">Интенсивность</text>`;

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
    svg += `<g class="trap-node-g" data-mech="${id}" style="cursor:pointer">`;
    svg += `<rect x="${PX}" y="${y}" width="10" height="10" rx="2" fill="${color}" opacity="0.9"/>`;
    svg += `<text x="${PX + 14}" y="${y + 9}" fill="${color}" font-size="10" font-family="sans-serif">${mechLabels[id]}</text>`;
    svg += `<rect x="${PX}" y="${y + 14}" width="${maxBarW}" height="6" rx="3" fill="rgba(255,255,255,0.07)"/>`;
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
    return `<div class="trap-detail"><div class="trap-detail-title" style="color:var(--text3)">Нажмите на механизм для подробностей</div></div>`;
  }

  return `<div class="trap-detail active">
    <div class="trap-detail-header">
      <div class="trap-detail-icon" style="background:${mech.bg};font-size:20px">${mech.icon}</div>
      <div style="flex:1">
        <div class="trap-detail-title" style="color:${mech.color}">${mech.label} ${mech.name}</div>
        <div class="trap-detail-sub">${mech.sub}</div>
        <div class="trap-detail-meta">
          ${mech.layers.map((layer) => `<span class="trap-meta-badge" style="background:${mech.bg};border-color:${mech.color}44;color:${mech.color}">${layer}</span>`).join("")}
        </div>
      </div>
      <div style="display:flex;flex-direction:column;gap:4px;min-width:120px">
        <div style="font-size:10px;color:var(--text3);margin-bottom:2px">Профиль воздействия</div>
        ${[
          ["Интенсивность", mech.intensity],
          ["Страх/принуждение", mech.fear],
          ["Материальный", mech.material],
          ["Социальный", mech.social],
        ]
          .map(
            ([label, value]) => `<div style="display:flex;flex-direction:column;gap:2px">
              <div style="font-size:9px;color:var(--text3)">${label}</div>
              <div style="height:3px;background:var(--border);border-radius:2px;overflow:hidden">
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
        <div class="trap-warning green" style="margin-top:8px"><strong>Как выйти:</strong> ${mech.escape}</div>
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
  let html = '<div style="font-size:12px;color:var(--text2);margin-bottom:1rem;line-height:1.65">Один и тот же механизм давит на разных людей по-разному. Нажмите на роль чтобы увидеть как ловушка закрывается для каждого.</div>';
  html += '<div class="roles-grid">';
  roles.forEach((role) => {
    html += `<div class="role-card" data-role-card="${role.id}">
      <div class="rc-head">
        <div class="rc-av" style="background:${role.bg}">${role.icon}</div>
        <div><div class="rc-name" style="color:${role.color}">${role.name}</div><div class="rc-sub">${role.sub}</div></div>
        <div class="rc-chev">›</div>
      </div>
      <div class="rc-body">
        <div class="rc-body-inner">
          <div style="font-size:12px;color:var(--text2);margin-bottom:10px;line-height:1.6">${role.intro}</div>
          ${role.mechs
            .map((roleMech) => {
              const mech = mechs.find((item) => item.id === roleMech.id);
              if (!mech) return "";
              return `<div class="rc-mech-row">
                <div class="rc-mech-icon" style="background:${mech.bg}">${mech.icon}</div>
                <div style="flex:1">
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
  let html = '<div style="font-size:12px;color:var(--text2);margin-bottom:1rem;line-height:1.65">Реальные задокументированные случаи — каждый иллюстрирует конкретную комбинацию механизмов.</div>';
  html += '<div class="cases-list">';
  cases.forEach((item, index) => {
    html += `<div class="case-item">
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
        <div style="font-size:12px;color:var(--text2);margin-bottom:10px;line-height:1.65">Каждое кольцо — отдельный механизм удержания. Чем ближе к центру — тем более «мягкий» и незаметный. Чем дальше — тем более жёсткий. Нажмите на кольцо или на механизм в легенде.</div>
        <div class="trap-svg-wrap">${buildTrapSvg({ mechs })}</div>
        <div id="mech-detail-out">${renderLoyaltyDetail(selMech, { mechs })}</div>`
      : mode === "roles"
        ? renderRoles({ roles, mechs })
        : renderCases({ cases, mechs });

  return `
    <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:10px;margin-bottom:1rem">
      <div>
        <div class="section-title" style="margin-bottom:4px">Механизмы лояльности — как система удерживает людей</div>
        <div style="font-size:11px;color:var(--text3)">Не страх, а структура стимулов из которой невозможно выйти</div>
      </div>
      <div style="display:flex;gap:6px;flex-wrap:wrap">
        <button class="mech-mode-btn${mode === "trap" ? " active" : ""}" data-mode="trap">Ловушка</button>
        <button class="mech-mode-btn${mode === "roles" ? " active" : ""}" data-mode="roles">По ролям</button>
        <button class="mech-mode-btn${mode === "cases" ? " active" : ""}" data-mode="cases">Кейсы</button>
      </div>
    </div>
    <div class="flow-stats" style="margin-bottom:1.25rem">
      <div class="hier-stat"><div class="hier-stat-num" style="color:#d4913a">7</div><div class="hier-stat-label">механизмов удержания</div></div>
      <div class="hier-stat"><div class="hier-stat-num" style="color:#c94f3a">98%</div><div class="hier-stat-label">интенсивность войны как замка</div></div>
      <div class="hier-stat"><div class="hier-stat-num" style="color:#7a6ec4">0</div><div class="hier-stat-label">явных угроз — всё работает автоматически</div></div>
      <div class="hier-stat"><div class="hier-stat-num" style="color:#5a9e52">1</div><div class="hier-stat-label">случай открытого бунта за 25 лет (Пригожин)</div></div>
    </div>
    <div id="mech-mode-area">${modeContent}</div>`;
}
