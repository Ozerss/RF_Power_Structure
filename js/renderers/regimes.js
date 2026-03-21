export function renderRegimesSection({ regimes, dimensions, objections }) {
  let html = "";
  html += `<div class="regimes-header">
    <div class="regimes-mode-row">
      <button class="mode-btn active" data-rmode="cards">Карточки режимов</button>
      <button class="mode-btn" data-rmode="table">Сравнительная таблица</button>
      <button class="mode-btn" data-rmode="objections">Частые возражения</button>
    </div>
  </div>`;
  html += `<div id="regimes-content"></div>`;
  return html;
}

export function renderRegimesCards({ regimes }) {
  let html = `<div class="regimes-cards-grid">`;
  regimes.forEach((r) => {
    const trendIcon = r.gdpTrend === "up" ? "▲" : r.gdpTrend === "down" ? "▼" : "●";
    const trendColor =
      r.gdpTrend === "up"
        ? "var(--green)"
        : r.gdpTrend === "down"
          ? "var(--red)"
          : "var(--text3)";
    const cpiColor =
      r.cpi >= 60 ? "var(--green)" : r.cpi >= 40 ? "var(--amber)" : "var(--red)";
    html += `<div class="regime-card" data-regime="${r.id}">
      <div class="regime-card-head" tabindex="0" role="button" aria-expanded="false">
        <div class="regime-flag">${r.flag}</div>
        <div class="regime-nameblock">
          <div class="regime-name">${r.name}</div>
          <div class="regime-type" style="color:${r.typeColor}">${r.type}</div>
        </div>
        <div class="regime-chev">›</div>
      </div>
      <div class="regime-stats-row">
        <div class="regime-stat">
          <div class="regime-stat-label">ВВП/чел.</div>
          <div class="regime-stat-val">${r.gdpPerCapita} <span style="color:${trendColor};font-size:10px">${trendIcon}</span></div>
        </div>
        <div class="regime-stat">
          <div class="regime-stat-label">CPI 2025</div>
          <div class="regime-stat-val" style="color:${cpiColor}">${r.cpiLabel}</div>
        </div>
        <div class="regime-stat">
          <div class="regime-stat-label">Freedom House</div>
          <div class="regime-stat-val" style="font-size:11px">${r.freedomHouse}</div>
        </div>
      </div>
      <div class="regime-card-body">
        <p class="regime-body-text">${r.body}</p>
        <div class="regime-keyfact">
          <span class="regime-keyfact-label">Ключевой факт:</span> ${r.keyFact}
        </div>
        ${r.id !== "russia"
          ? `<div class="regime-vsrussia">
          <span class="regime-vsrussia-label">Отличие от России:</span> ${r.vsRussia}
        </div>`
          : ""}
      </div>
    </div>`;
  });
  html += `</div>`;
  return html;
}

export function renderRegimesTable({ regimes, dimensions }) {
  let html = `<div class="regimes-table-wrap"><table class="regimes-table">`;
  html += `<thead><tr><th class="regimes-th regimes-th-dim">Критерий</th>`;
  regimes.forEach((r) => {
    html += `<th class="regimes-th">${r.flag} ${r.name}</th>`;
  });
  html += `</tr></thead><tbody>`;
  dimensions.forEach((dim) => {
    html += `<tr><td class="regimes-td regimes-td-label">${dim.label}</td>`;
    regimes.forEach((r) => {
      const val = r[dim.key] || "—";
      let colorStyle = "";
      if (dim.key === "cpiLabel") {
        colorStyle = `color:${r.cpi >= 60 ? "var(--green)" : r.cpi >= 40 ? "var(--amber)" : "var(--red)"}`;
      }
      html += `<td class="regimes-td" style="${colorStyle}">${val}</td>`;
    });
    html += `</tr>`;
  });
  html += `</tbody></table></div>
  <div class="regimes-table-note">Источники: Transparency International CPI 2025, Freedom House 2025, IMF WEO 2025, RSF Press Freedom Index 2025, ECPS, Atlantic Council</div>`;
  return html;
}

export function renderRegimesObjections({ objections }) {
  let html = `<div class="regimes-obj-intro">Эти возражения встречаются чаще всего. Каждое содержит долю правды — именно поэтому оно убедительно. Здесь — точный ответ.</div>`;
  html += `<div class="regimes-obj-list">`;
  objections.forEach((obj) => {
    html += `<div class="regimes-obj-card">
      <div class="regimes-obj-q" style="color:${obj.color}">${obj.q}</div>
      <div class="regimes-obj-a">${obj.a}</div>
    </div>`;
  });
  html += `</div>`;
  return html;
}
