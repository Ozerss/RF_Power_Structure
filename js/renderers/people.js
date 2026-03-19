export function renderPeopleCards(filtered, { psClanColors, trajLabels }) {
  if (!filtered.length) {
    return '<p style="color:var(--text2);font-size:13px">Ничего не найдено</p>';
  }

  return filtered
    .map((person) => {
      const clanColor = psClanColors[person.clan];
      const traj = trajLabels[person.traj];
      return `
        <div class="ps-card">
          <div class="ps-head">
            <div class="ps-top">
              <div class="ps-avatar" style="background:${clanColor.bg};color:${clanColor.color}">${person.initials}</div>
              <div class="ps-nameblock">
                <div class="ps-name">${person.name}</div>
                <div class="ps-role">${person.role}</div>
              </div>
              <div class="ps-chevron">›</div>
            </div>
            <div class="ps-tags">
              <span class="ps-tag" style="background:${clanColor.bg};border-color:${clanColor.color}44;color:${clanColor.color}">${person.clan}</span>
              <span class="ps-traj ${traj.cls}">${traj.label}</span>
              ${person.tags.map((tag) => `<span class="ps-tag" style="background:var(--gray-bg);border-color:var(--border);color:var(--text2)">${tag}</span>`).join("")}
            </div>
            <div class="ps-meters">
              <div class="ps-meter"><div class="ps-meter-label">Влияние</div><div class="ps-meter-bar"><div class="ps-meter-fill" style="width:${person.influence}%;background:${clanColor.color}"></div></div></div>
              <div class="ps-meter"><div class="ps-meter-label">Доступ к Путину</div><div class="ps-meter-bar"><div class="ps-meter-fill" style="width:${person.access}%;background:${clanColor.color}88"></div></div></div>
              <div class="ps-meter"><div class="ps-meter-label">Ресурсная база</div><div class="ps-meter-bar"><div class="ps-meter-fill" style="width:${person.resources}%;background:${clanColor.color}"></div></div></div>
              <div class="ps-meter"><div class="ps-meter-label">Стабильность позиции</div><div class="ps-meter-bar"><div class="ps-meter-fill" style="width:${person.stability}%;background:${clanColor.color}88"></div></div></div>
            </div>
          </div>
          <div class="ps-body">
            <div class="ps-body-inner">
              <div class="ps-section"><h5>Биография</h5><p>${person.background}</p></div>
              <div class="ps-section"><h5>Функция в системе</h5><p>${person.function}</p></div>
              <div class="ps-alert vuln"><strong>Уязвимость:</strong> ${person.vuln}</div>
              ${person.successor ? `<div class="ps-alert succ"><strong>Роль в транзите:</strong> ${person.successor}</div>` : ""}
            </div>
          </div>
        </div>`;
    })
    .join("");
}
