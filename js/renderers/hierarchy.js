import { findById, lastWord } from "../utils.js";

export function layoutHierarchyNodes(nodes) {
  const CX = 340;
  const CY = 310;
  const RADII = [0, 88, 166, 244, 308];
  const byRing = [[], [], [], [], []];

  nodes.forEach((node) => byRing[node.ring].push(node));

  nodes.forEach((node) => {
    if (node.ring === 0) {
      node.x = CX;
      node.y = CY;
      node.angle = 0;
      return;
    }

    const list = byRing[node.ring];
    const idx = list.indexOf(node);
    const count = list.length;
    const radius = RADII[node.ring];
    let start;

    if (node.ring === 4) start = -Math.PI / 4;
    else if (node.ring % 2 === 0) start = -Math.PI / 2;
    else start = -Math.PI / 2 + Math.PI / count;

    const angle = start + ((2 * Math.PI * idx) / count);
    node.angle = angle;
    node.x = CX + radius * Math.cos(angle);
    node.y = CY + radius * Math.sin(angle);
  });
}

function buildHierarchySvg({ CC, TC, nodes }) {
  const W = 680;
  const H = 640;
  const CX = 340;
  const CY = 310;
  const RADII = [0, 88, 166, 244, 308];
  const NODE_R = [32, 19, 16, 14, 15];

  let svg = `<svg width="100%" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" style="max-width:680px">`;
  const zoneFills = [
    "rgba(212,145,58,0.06)",
    "rgba(255,255,255,0.025)",
    "rgba(255,255,255,0.015)",
    "rgba(255,255,255,0.01)",
    "rgba(255,255,255,0.005)",
  ];

  for (let i = 4; i >= 0; i -= 1) {
    const radius = RADII[i] + (i < 4 ? NODE_R[i] + 8 : 15);
    svg += `<circle cx="${CX}" cy="${CY}" r="${radius}" fill="${zoneFills[i]}" stroke="none"/>`;
  }

  [1, 2, 3, 4].forEach((i) => {
    svg += `<circle cx="${CX}" cy="${CY}" r="${RADII[i]}" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="0.5" stroke-dasharray="3 4"/>`;
  });

  const ringLabels = ["", "Ближний круг", "Ключевые операторы", "Функциональный слой", "Системная периферия"];
  [1, 2, 3].forEach((i) => {
    const lx = CX + RADII[i] * Math.cos(-0.26) + 8;
    const ly = CY + RADII[i] * Math.sin(-0.26) - 4;
    svg += `<text x="${lx.toFixed(1)}" y="${ly.toFixed(1)}" fill="rgba(255,255,255,0.18)" font-size="9" font-family="sans-serif">${ringLabels[i]}</text>`;
  });

  nodes.forEach((node) => {
    const radius = NODE_R[node.ring];
    const color = CC[node.clan];
    const trajColor = TC[node.traj];
    const cos = node.ring === 0 ? 0 : Math.cos(node.angle);
    const sin = node.ring === 0 ? 0 : Math.sin(node.angle);
    const offset = radius + 7;
    let rawLx = node.x + cos * offset;
    let rawLy = node.y + sin * offset;
    const shortName = lastWord(node.name);
    const estW = shortName.length * 6 + 4;
    let anchor = cos > 0.35 ? "start" : cos < -0.35 ? "end" : "middle";

    if (anchor === "start" && rawLx + estW > 636) {
      anchor = "end";
      rawLx = node.x - cos * offset;
    }
    if (anchor === "end" && rawLx - estW < 10) {
      anchor = "start";
      rawLx = node.x + cos * offset;
    }

    const lx = rawLx.toFixed(1);
    const ly = rawLy.toFixed(1);
    const baseline = sin < -0.35 ? "auto" : sin > 0.35 ? "hanging" : "central";

    if (node.ring === 0) {
      svg += `<g class="hier-node-g" data-id="${node.id}" style="cursor:pointer">`;
      svg += `<circle cx="${CX}" cy="${CY}" r="38" fill="${color}" opacity="0.12"/>`;
      svg += `<circle cx="${CX}" cy="${CY}" r="32" fill="${color}" opacity="0.9" stroke="${color}" stroke-width="1.5" class="hier-nc"/>`;
      svg += `<text x="${CX}" y="${CY}" text-anchor="middle" dominant-baseline="central" fill="#fff" font-size="11" font-weight="600" font-family="sans-serif">${node.abbr}</text>`;
      svg += `<text x="${CX}" y="${CY + 50}" text-anchor="middle" fill="${color}" font-size="13" font-weight="500" font-family="sans-serif">${node.name}</text>`;
      svg += `</g>`;
      return;
    }

    svg += `<g class="hier-node-g" data-id="${node.id}" style="cursor:pointer">`;
    svg += `<circle cx="${node.x.toFixed(1)}" cy="${node.y.toFixed(1)}" r="${radius}" fill="${color}" opacity="0.85" stroke="${color}" stroke-width="0.5" class="hier-nc"/>`;
    svg += `<text x="${node.x.toFixed(1)}" y="${node.y.toFixed(1)}" text-anchor="middle" dominant-baseline="central" fill="#fff" font-size="${node.ring <= 2 ? 9 : 8}" font-family="sans-serif" font-weight="500">${node.abbr}</text>`;

    const bx = (node.x + cos * (radius + 2)).toFixed(1);
    const by = (node.y + sin * (radius + 2) - radius * 0.6).toFixed(1);
    if (node.traj !== "stable") {
      svg += `<text x="${bx}" y="${by}" text-anchor="${anchor}" fill="${trajColor.color}" font-size="7" font-family="sans-serif">${trajColor.icon}</text>`;
    }

    svg += `<text x="${lx}" y="${ly}" text-anchor="${anchor}" dominant-baseline="${baseline}" fill="${color}" opacity="0.88" font-size="${node.ring <= 2 ? 10 : 9}" font-family="sans-serif">${shortName}</text>`;
    svg += `</g>`;
  });

  svg += `</svg>`;
  return svg;
}

function buildFormalHierarchy({ CC, CLAN_BG, TC, nodes }) {
  const levels = [
    { label: "Верховный арбитр", ids: ["putin"] },
    { label: "Ближний круг — личный доступ", ids: ["dyumin", "kovalchuk", "bortnikov", "patrushev_n", "oreshkin"] },
    { label: "Ключевые операторы", ids: ["kiriyenko", "vaino", "sechin", "gerasimov", "mishustin", "lavrov", "chemezov"] },
    { label: "Функциональный слой", ids: ["belousov", "manturov", "naryshkin", "shoigu", "medvedev", "kadyrov", "sobyanin", "patrushev_d"] },
    { label: "Системная периферия", ids: ["duma", "regions", "courts", "media"] },
  ];

  let html = "";
  levels.forEach((level, index) => {
    html += `<div class="fh-level-label">${level.label}</div><div class="fh-level">`;
    level.ids.forEach((id) => {
      const node = findById(nodes, id);
      if (!node) return;
      const color = CC[node.clan];
      const bg = CLAN_BG[node.clan];
      const traj = TC[node.traj];
      html += `<div class="fh-node hier-node-g" data-id="${node.id}" style="background:${bg};border-color:${color}55;color:${color}">`;
      html += `<span class="fh-traj" style="color:${traj.color}">${traj.icon}</span>`;
      html += `${node.name}`;
      html += `</div>`;
    });
    html += `</div>`;
    if (index < levels.length - 1) html += `<div class="fh-conn">↓</div>`;
  });
  return html;
}

export function renderHierarchyDetail(node, { CC, CLAN_BG, TC }) {
  const color = CC[node.clan];
  const bg = CLAN_BG[node.clan];
  const traj = TC[node.traj];
  const influence = Math.round(node.influence);
  return `<div class="hier-detail-top">
    <div class="hier-detail-av" style="background:${bg};color:${color}">${node.abbr}</div>
    <div style="flex:1">
      <div class="hier-detail-name" style="color:${color}">${node.name}</div>
      <div class="hier-detail-role">${node.role}</div>
      <div class="hier-detail-meta">
        <span class="hier-detail-badge" style="background:${bg};border-color:${color}44;color:${color}">${node.clan_label}</span>
        <span class="hier-detail-badge" style="background:${traj.color}18;border-color:${traj.color}44;color:${traj.color}">${traj.icon} ${node.status}</span>
        <span class="hier-detail-badge" style="background:rgba(255,255,255,0.04);border-color:var(--border);color:var(--text2)">Влияние: ${influence}/100</span>
      </div>
    </div></div>
  <div class="hier-detail-body">${node.detail}</div>`;
}

export function renderHierarchySection(data) {
  const { CC, CLAN_BG, TC, nodes } = data;
  const clanEntries = [
    { key: "center", label: "Центр / Путин" },
    { key: "future", label: "Следующее поколение" },
    { key: "siloviki", label: "Силовики" },
    { key: "technocrats", label: "Технократы" },
    { key: "capital", label: "Госкапитал" },
    { key: "army", label: "Армия" },
    { key: "media", label: "Медиа" },
    { key: "formal", label: "Формальные институты" },
    { key: "periphery", label: "Периферия" },
  ];

  return `
    <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:10px;margin-bottom:1rem">
      <div>
        <div class="section-title" style="margin-bottom:6px">Карта реального влияния — 2026</div>
        <div style="font-size:11px;color:var(--text3)">Близость к центру = реальная власть, не формальный титул</div>
      </div>
      <div class="hier-toggle">
        <button class="hier-toggle-btn active" id="btn-rings">Кольца влияния</button>
        <button class="hier-toggle-btn" id="btn-formal">Формальная вертикаль</button>
      </div>
    </div>
    <div class="hier-stats">
      <div class="hier-stat"><div class="hier-stat-num" style="color:#d4913a">25</div><div class="hier-stat-label">ключевых игроков в карте</div></div>
      <div class="hier-stat"><div class="hier-stat-num" style="color:#7a6ec4">4</div><div class="hier-stat-label">кольца удалённости от Путина</div></div>
      <div class="hier-stat"><div class="hier-stat-num" style="color:#5a9e52">6</div><div class="hier-stat-label">игроков с растущим влиянием</div></div>
      <div class="hier-stat"><div class="hier-stat-num" style="color:#c94f3a">5</div><div class="hier-stat-label">игроков теряют позиции</div></div>
    </div>
    <div class="hier-legend" style="margin-bottom:0.75rem">
      ${clanEntries.map((entry) => `<div class="hier-leg-item"><div class="hier-leg-dot" style="background:${CC[entry.key]}"></div>${entry.label}</div>`).join("")}
    </div>
    <div class="hier-legend" style="margin-bottom:1rem">
      <div class="hier-leg-item"><span style="color:#5a9e52;font-size:10px">▲</span>&nbsp;Растёт</div>
      <div class="hier-leg-item"><span style="color:#c94f3a;font-size:10px">▼</span>&nbsp;Падает</div>
      <div class="hier-leg-item"><span style="color:#d4913a;font-size:10px">◆</span>&nbsp;Неясно</div>
      <div class="hier-leg-item" style="font-size:10px;color:var(--text3)">Нажмите на узел для подробностей</div>
    </div>
    <div class="hier-rings active" id="hier-rings-wrap">
      <div class="hier-svg-wrap">${buildHierarchySvg({ CC, TC, nodes })}</div>
    </div>
    <div class="hier-formal" id="hier-formal-wrap">${buildFormalHierarchy({ CC, CLAN_BG, TC, nodes })}</div>
    <div class="hier-detail" id="hier-detail-panel">
      <div class="hier-detail-hint">Нажмите на любой узел чтобы увидеть подробную информацию о роли, функции и уязвимостях</div>
    </div>`;
}
