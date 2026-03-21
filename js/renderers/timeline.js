function catColor(CATS, cat) {
  return (CATS[cat] || { color: "var(--text3)" }).color;
}

export function renderTimelineDetail(event, idx, totalFiltered, CATS) {
  if (!event) return `<div class="tl3-detail"><div class="tl3-detail-hint">Нажмите на точку для подробностей</div></div>`;
  const color = catColor(CATS, event.cat);
  return `<div class="tl3-detail tl3-detail-active tl3-detail--accent" style="--tl3-accent:${color};--tl3-accent-bg:${color}15;--tl3-accent-border:${color}44;--tl3-accent-soft:${color}cc">
    <button class="detail-close" aria-label="Закрыть">×</button>
    <div class="tl3-detail-top">
      <div class="tl3-detail-year">${event.y}</div>
      <div class="tl3-detail-content">
        <div class="tl3-detail-title">${event.title}</div>
        <div class="tl3-detail-badges">
          <span class="tl3-detail-badge tl3-detail-badge--accent">${CATS[event.cat].label}</span>
          <span class="tl3-detail-badge hier-detail-badge--neutral">Удар ${event.impact}/10</span>
        </div>
        <div class="tl3-detail-body">${event.body}</div>
        <div class="tl3-detail-sig">${event.sig}</div>
        <div class="tl3-nav-btns">
          ${idx > 0 ? `<button class="tl3-nav-btn" id="tl3-prev">← ${idx}/${totalFiltered}</button>` : ""}
          ${idx < totalFiltered - 1 ? `<button class="tl3-nav-btn" id="tl3-next">${idx + 2}/${totalFiltered} →</button>` : ""}
        </div>
      </div>
    </div>
  </div>`;
}

function buildRail({ filtered, selIdx, CATS, ERAS }) {
  const allYears = [];
  for (let year = 1999; year <= 2025; year += 1) allYears.push(year);

  const W_TOTAL = 1400;
  const PAD = 28;
  const usable = W_TOTAL - PAD * 2;
  const yStep = usable / (allYears.length - 1);
  const byYear = {};

  function xOf(year) {
    return PAD + (year - 1999) * yStep;
  }

  filtered.forEach((event) => {
    if (!byYear[event.y]) byYear[event.y] = [];
    byYear[event.y].push(event);
  });

  let html = `<div class="tl3-rail-outer" id="tl3-rail-scroll">
    <div class="tl3-rail-inner">
      <div class="tl3-rail-line"></div>`;

  ERAS.forEach((era) => {
    const x1 = xOf(Math.min(...era.years));
    const x2 = xOf(Math.max(...era.years));
    html += `<div style="position:absolute;left:${x1}px;top:95px;width:${x2 - x1}px;height:90px;background:${era.color}08;border-radius:4px;border-left:1.5px solid ${era.color}30;border-right:1.5px solid ${era.color}30"></div>`;
    html += `<div style="position:absolute;left:${x1 + 3}px;top:98px;font-size:8px;color:${era.color};opacity:0.6;white-space:nowrap">${era.name}</div>`;
  });

  allYears.forEach((year) => {
    const x = xOf(year);
    const isMajor = year % 5 === 0 || year === 1999 || year === 2025;
    html += `<div class="tl3-year-tick" style="left:${x}px;height:${isMajor ? 18 : 10}px;background:${isMajor ? "var(--border2)" : "var(--border)"}"></div>`;
    if (isMajor) html += `<div class="tl3-year-label" style="left:${x}px">${year}</div>`;
  });

  let globalIdx = -1;
  filtered.forEach((event) => {
    globalIdx += 1;
    const yearEvents = byYear[event.y];
    const posInYear = yearEvents.indexOf(event);
    const isAbove = posInYear % 2 === 0;
    const x = xOf(event.y);
    const offsetX = (posInYear - (yearEvents.length - 1) / 2) * 14;
    const color = catColor(CATS, event.cat);
    const isSelected = globalIdx === selIdx;
    const shortTitle = event.title.length > 22 ? `${event.title.substring(0, 20)}…` : event.title;
    const impactDots = Array.from(
      { length: 5 },
      (_, index) => `<div class="tl3-pip" style="background:${index < Math.round(event.impact / 2) ? color : "var(--border)"}"></div>`
    ).join("");

    html += `<div class="tl3-event-dot-wrap${isAbove ? " above" : " below"}${isSelected ? " tl3-sel" : ""}"
      data-evgidx="${globalIdx}"
      style="left:${(x + offsetX - 6).toFixed(1)}px;${isAbove ? "top:0;height:136px" : "top:142px;height:138px"}">
      <div class="tl3-event-dot" style="background:${color}dd;border-color:${color};${isSelected ? `box-shadow:0 0 0 4px ${color}33` : ""}" title="${event.title}"></div>
      <div class="tl3-connector" style="background:${color}"></div>
      <div class="tl3-event-label" style="color:${color}">${shortTitle}</div>
      <div class="tl3-impact-pip">${impactDots}</div>
    </div>`;
  });

  html += `</div></div>`;
  return html;
}

function buildCards({ filtered, openCards, CATS }) {
  let html = `<div class="tl3-cards">`;
  filtered.forEach((event, index) => {
    const color = catColor(CATS, event.cat);
    const isOpen = openCards.has(index);
    const dots = Array.from(
      { length: 10 },
      (_, dotIndex) => `<div class="tl3-imp-dot" style="background:${dotIndex < event.impact ? color : "var(--border)"}"></div>`
    ).join("");
    html += `<div class="tl3-card${isOpen ? " tl3-card-open" : ""}" data-ci="${index}" tabindex="0" role="button" aria-expanded="${isOpen ? "true" : "false"}" aria-label="${event.title}" style="border-left-color:${color}">
      <div class="tl3-card-head">
        <div class="tl3-card-year" style="color:${color}">${event.y}</div>
        <div class="tl3-card-title">${event.title}</div>
        <div class="tl3-card-right">
          <div class="tl3-impact-dots">${dots}</div>
          <div class="tl3-card-chev">›</div>
        </div>
      </div>
      ${isOpen ? `<div class="tl3-card-body">${event.body}<div class="tl3-card-sig tl3-card-sig--open" style="border-color:${color};color:${color}cc">${event.sig}</div></div>` : ""}
    </div>`;
  });
  html += `</div>`;
  return html;
}

export function renderTimelineSection({ mode, selIdx, activeCat, openCards, CATS, events, ERAS, filtered }) {
  const critCount = events.filter((event) => event.impact >= 9).length;
  const detailHtml = renderTimelineDetail(filtered[selIdx] || null, selIdx, filtered.length, CATS);

  return `
    <div class="hier-header">
      <div>
        <div class="section-title flow-section-title">Хронология — 1999–2025</div>
        <div class="hier-subtitle">В 2000-м — независимое ТВ. В 2003-м — независимый бизнес. В 2012-м — гражданское общество. В 2022-м — последние независимые СМИ. Каждый шаг выглядел как реакция на обстоятельства. Совпадение или система — смотрите сами.</div>
      </div>
      <div class="tl3-mode-row tl3-mode-row--flush">
        <button class="tl3-mode-btn${mode === "rail" ? " active" : ""}" data-m="rail">Рельс времени</button>
        <button class="tl3-mode-btn${mode === "cards" ? " active" : ""}" data-m="cards">Список</button>
      </div>
    </div>

    <div class="stat-grid">
      <div class="stat-card stat-card--compact"><div class="stat-num stat-num--amber">${events.length}</div><div class="stat-label">ключевых событий</div></div>
      <div class="stat-card stat-card--compact"><div class="stat-num stat-num--red">${critCount}</div><div class="stat-label">критических (9–10/10)</div></div>
      <div class="stat-card stat-card--compact"><div class="stat-num stat-num--green">${ERAS.length}</div><div class="stat-label">исторических эпох</div></div>
      <div class="stat-card stat-card--compact"><div class="stat-num stat-num--purple">27</div><div class="stat-label">лет консолидации</div></div>
    </div>

    <div class="tl3-cat-row">
      <button class="tl3-cat-btn${activeCat === "all" ? " active" : ""}" data-cat="all" style="${activeCat === "all" ? "border-color:var(--amber);color:var(--amber);background:var(--amber-bg)" : ""}">
        <div class="tl3-cat-dot" style="background:var(--amber)"></div>Все
      </button>
      ${Object.entries(CATS)
        .map(
          ([key, value]) => `
        <button class="tl3-cat-btn${activeCat === key ? " active" : ""}" data-cat="${key}"
          style="${activeCat === key ? `border-color:${value.color};color:${value.color};background:${value.color}15` : ""}">
          <div class="tl3-cat-dot" style="background:${value.color}"></div>${value.label}
        </button>`
        )
        .join("")}
    </div>

    ${mode === "rail"
      ? `
      <div class="tl3-rail-hint">← прокрутите горизонтально · нажмите на точку для подробностей</div>
      ${buildRail({ filtered, selIdx, CATS, ERAS })}
      <div id="tl3-detail-area" role="region" aria-live="polite" aria-label="Подробности">${detailHtml}</div>
    `
      : buildCards({ filtered, openCards, CATS })}
  `;
}
