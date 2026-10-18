import * as L from "./logic.js";
import * as C from "./content.js";

const KEY = "flowstate.v1";
const UNLOCK_KEY = "flowstate.unlocked";
const CODE_HASH = "1c674e04";
const DERNIER_POST_CONNU = "2026-09-30";

// ---------- Stockage local (uniquement sur le téléphone) ----------
function blank() {
  return { version: 1, days: {}, weeks: {}, posts: [DERNIER_POST_CONNU] };
}
function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return blank();
    const s = JSON.parse(raw);
    return { ...blank(), ...s, days: s.days || {}, weeks: s.weeks || {}, posts: s.posts && s.posts.length ? s.posts : [DERNIER_POST_CONNU] };
  } catch { return blank(); }
}
let S = load();
let storageOk = true;
function save() {
  try { localStorage.setItem(KEY, JSON.stringify(S)); storageOk = true; }
  catch { storageOk = false; toast("Sauvegarde impossible sur cet appareil"); }
}
function isUnlocked() {
  try { return localStorage.getItem(UNLOCK_KEY) === CODE_HASH; } catch { return false; }
}

// ---------- État de l'interface ----------
const today = () => L.ymd(new Date());
let view = "matin";
let cur = today();
let showAllLaws = false;
let notionSearch = "";

const $app = document.getElementById("app");
const esc = (v) => String(v ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const dayData = (d) => S.days[d] || {};
const ensureDay = (d) => (S.days[d] ||= {});
const weekKey = (d) => L.monday(d);
const weekData = (d) => S.weeks[weekKey(d)] || {};
const ensureWeek = (d) => (S.weeks[weekKey(d)] ||= {});

function toast(msg) {
  const t = document.createElement("div");
  t.className = "toast";
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 2200);
}

// ---------- Programme du jour ----------
function programmeDu(d) {
  const week = L.programWeek(d);
  const slot = L.skillSlot(week);
  const idx = L.dayIndex(d);
  if (slot.kind === "bilan") {
    const [conseil, defi] = C.BILAN.jours[idx];
    return { week, slot, items: [{ label: "Bilan", nom: C.BILAN.nom, but: C.BILAN.but, conseil, defi }] };
  }
  const pairIdx = slot.kind === "avant" ? 0 : slot.pair;
  const cycleKey = slot.cycle === 2 ? "c2" : "c1";
  const dayIdx = slot.kind === "avant" ? 0 : idx;
  const items = C.PAIRES[pairIdx].map((id, i) => {
    const comp = C.COMPETENCES[id];
    const [conseil, defi] = comp[cycleKey][dayIdx];
    return { label: i === 0 ? "Compétence A" : "Compétence B", nom: comp.nom, but: comp.but, conseil, defi };
  });
  return { week, slot, items };
}
const palierDu = (d) => C.PALIERS.find((p) => p.code === L.palierCode(d));
const dernierPost = () => [...S.posts].sort().at(-1);

// ---------- Rendu ----------
function header(sub, title, withNav = true) {
  const isToday = cur === today();
  return `<div class="top"><div><small>${sub}</small><h2>${title}</h2></div>${withNav ? `
    <div class="nav-date">
      <button data-act="prev" aria-label="Jour précédent">‹</button>
      ${isToday ? "" : `<button class="today" data-act="today">Aujourd'hui</button>`}
      <button data-act="next" aria-label="Jour suivant">›</button>
    </div>` : ""}</div>`;
}

function renderMatin() {
  const p = programmeDu(cur);
  const pal = palierDu(cur);
  const avant = p.slot.kind === "avant";
  const sub = avant
    ? `${L.longDate(cur)} · Le programme commence le 19 octobre`
    : `${L.longDate(cur)} · Semaine ${p.week} · ${pal.nom}`;
  const theme = C.ANGLAIS[L.dayIndex(cur)];
  const due = L.nextPostDue(dernierPost());
  const j = L.daysUntil(cur, due);
  const lois = showAllLaws ? C.LOIS : C.LOIS.slice(0, 3);
  const palPct = pal && !avant && pal.code !== "P5"
    ? Math.min(100, Math.max(0, Math.round((L.diffDays(pal.debut, cur) + 1) / (L.diffDays(pal.debut, pal.fin) + 1) * 100))) : 0;
  return `<div class="screen">
    ${header(sub, "Bonjour Nathan")}
    <div class="motto">${esc(C.DEVISE)}</div>
    ${avant ? `<p class="hint">Aperçu du premier jour. Lundi, tout démarre.</p>` : ""}
    ${p.items.map((it) => `
      <div class="card">
        <span class="tag">${it.label} · ${esc(it.nom)}</span>
        <p>${esc(it.conseil)}</p>
        <div class="defi"><b>Défi du jour.</b> ${esc(it.defi)}</div>
        <span class="but">Objectif de la semaine. ${esc(it.but)}.</span>
      </div>`).join("")}
    <div class="row">
      <div class="mini"><small>Anglais ce soir</small><strong>${theme[0]}</strong><span>${esc(theme[1])}</span></div>
      <div class="mini ${j < 0 ? "alert" : ""}"><small>Prochain post</small><strong>${j < 0 ? "En retard" : "J-" + j}</strong><span>avant le ${L.shortDate(due)}</span></div>
    </div>
    <div class="card">
      <span class="tag">Mes lois</span>
      <ul class="laws">${lois.map(([c, t]) => `<li><b>${c}</b>${esc(t)}</li>`).join("")}</ul>
      <button class="linkbtn" data-act="laws">${showAllLaws ? "Réduire" : "Voir les 10 lois"}</button>
    </div>
    ${pal && !avant ? `<div class="card">
      <span class="tag">Palier ${pal.code} · ${esc(pal.nom)}</span>
      <p>${esc(pal.but)}.</p>
      ${pal.code !== "P5" ? `<div class="bar"><i style="width:${palPct}%"></i></div><span class="but">Du ${L.shortDate(pal.debut)} au ${L.shortDate(pal.fin)}</span>` : ""}
    </div>` : ""}
  </div>`;
}

function yn(field, value, label) {
  return `<div class="yn-row"><span>${label}</span><span class="yn">
    <button data-yn="${field}" data-v="1" class="${value === true ? "on" : ""}">Oui</button>
    <button data-yn="${field}" data-v="0" class="${value === false ? "on no" : ""}">Non</button></span></div>`;
}

function scoreBlock(d) {
  const sc = L.dayScore(dayData(d), d);
  const ok = sc.pct >= L.SEUIL_REUSSITE;
  return `<div class="card" id="scorecard">
    <div class="score"><span class="tag">Ma journée</span><span class="pill ${ok ? "" : "off"}">${ok ? "Journée réussie" : "Objectif 80 %"}</span></div>
    <div class="score"><strong>${sc.pct} %</strong><span class="hint">${sc.done} sur ${sc.total}</span></div>
    <div class="bar"><i style="width:${sc.pct}%"></i></div>
  </div>`;
}

function renderSoir() {
  const d = dayData(cur);
  const r = d.rituel || {};
  const b = d.bilan || {};
  const rel = d.relation || {};
  const target = L.screenTarget(cur);
  const check = (k, label) => `<button class="check" data-rit="${k}"><span>${label}</span><span class="dot ${r[k] ? "on" : ""}"></span></button>`;
  return `<div class="screen">
    ${header(`${L.longDate(cur)} · Bilan du soir`, "Ta journée")}
    ${scoreBlock(cur)}
    <div class="card">
      <span class="tag">Rituel avant de dormir</span>
      ${check("anglais", "30 min d'anglais avec ChatGPT")}
      ${check("lecture", "30 min de lecture")}
      ${check("ecriture", "15 min d'écriture sur papier")}
    </div>
    <div class="card">
      <span class="tag">Bilan</span>
      ${yn("je", b.je, "J'ai parlé en « je »")}
      ${yn("regard", b.regard, "J'ai regardé les gens dans les yeux, sans me laisser intimider")}
      ${yn("franc", b.franc, "J'ai dit ce que je pensais vraiment")}
      ${yn("defi", b.defi, "J'ai relevé le défi du jour")}
    </div>
    <div class="card">
      <span class="tag">Notion du jour</span>
      <label class="f">Notion<input type="text" id="f-notion" data-field="notion" value="${esc(d.notion)}" placeholder="Un mot, une idée, un sujet"></label>
      <label class="f">Définition<textarea id="f-definition" data-field="definition" placeholder="Sa définition exacte">${esc(d.definition)}</textarea></label>
      <label class="f">Mon avis tranché<textarea id="f-avis" data-field="avis" placeholder="En une phrase">${esc(d.avis)}</textarea></label>
      <span class="hint">Écris-le, puis dis-le à voix haute.</span>
    </div>
    <div class="card">
      <span class="tag">Relation du jour · facultatif</span>
      <label class="f">Avec qui<input type="text" id="f-rel-qui" data-rel="qui" value="${esc(rel.qui)}"></label>
      <label class="f">Ce qui s'est passé<textarea id="f-rel-quoi" data-rel="quoi">${esc(rel.quoi)}</textarea></label>
      <label class="f">Ce que j'aurais pu mieux faire<textarea id="f-rel-mieux" data-rel="mieux">${esc(rel.mieux)}</textarea></label>
    </div>
    <div class="card">
      <span class="tag">Mesures</span>
      <label class="f">Temps d'écran (heures)<input type="number" id="f-ecran" inputmode="decimal" step="0.5" min="0" max="24" data-num="ecran" value="${d.ecran ?? ""}" placeholder="Objectif ${String(target).replace(".", ",")} h maximum"></label>
      ${yn("coucher", d.coucher, "Couché avant 23 h 30 la nuit dernière")}
    </div>
  </div>`;
}

function weekRange(d) {
  const m = weekKey(d);
  return [m, L.addDays(m, 6)];
}

function weekSummaryText(d) {
  const [m, s] = weekRange(d);
  const p = programmeDu(m);
  const w = weekData(d);
  const lines = [];
  lines.push(`Flow State · semaine du ${L.longDate(m)} au ${L.longDate(s)}`);
  lines.push(`Semaine ${p.week} du programme · ${p.items.map((i) => i.nom).join(" et ")}`);
  let ok = 0;
  const notions = [], relations = [];
  for (let i = 0; i < 7; i++) {
    const day = L.addDays(m, i);
    const dd = dayData(day);
    const sc = L.dayScore(dd, day);
    if (sc.pct >= L.SEUIL_REUSSITE) ok++;
    const r = dd.rituel || {}, b = dd.bilan || {};
    const o = (v) => (v === true ? "oui" : v === false ? "non" : "?");
    lines.push(`${L.longDate(day)} · ${sc.pct} % · rituel ${r.anglais ? "A" : "-"}${r.lecture ? "L" : "-"}${r.ecriture ? "E" : "-"} · je ${o(b.je)} · regard ${o(b.regard)} · franc ${o(b.franc)} · défi ${o(b.defi)} · écran ${dd.ecran ?? "?"} h · coucher ${o(dd.coucher)}`);
    if (dd.notion) notions.push(`${L.shortDate(day)} · ${dd.notion}${dd.definition ? ". Définition : " + dd.definition : ""}${dd.avis ? ". Mon avis : " + dd.avis : ""}`);
    const rel = dd.relation || {};
    if (rel.qui || rel.quoi) relations.push(`${L.shortDate(day)} · ${rel.qui || "?"} · ${rel.quoi || ""}${rel.mieux ? " · À améliorer : " + rel.mieux : ""}`);
  }
  lines.splice(2, 0, `Journées réussies : ${ok} sur 7`);
  lines.push("", "Notions et avis :", ...(notions.length ? notions : ["aucune"]));
  lines.push("", "Relations :", ...(relations.length ? relations : ["aucune"]));
  lines.push("", "Revue du dimanche :", `Ce qui a marché : ${w.marche || ""}`, `Ce qui a lâché : ${w.lache || ""}`, `Ma décision : ${w.decision || ""}`);
  if (w.tics) lines.push(`Tics mesurés : ${w.tics} pour 100 mots`);
  lines.push(`Compta perso faite : ${w.compta ? "oui" : "non"}`);
  lines.push("", "Fais mon point de la semaine. Dis-moi ce qui progresse, ce qui revient dans mes relations et ce que je dois changer la semaine prochaine.");
  return lines.join("\n");
}

function renderDimanche() {
  const [m, s] = weekRange(cur);
  const w = weekData(cur);
  const p = programmeDu(m);
  let ok = 0, rit = 0, ecranSum = 0, ecranN = 0;
  const notions = [];
  for (let i = 0; i < 7; i++) {
    const day = L.addDays(m, i);
    const dd = dayData(day);
    if (L.isSuccess(dd, day)) ok++;
    const r = dd.rituel || {};
    if (r.anglais && r.lecture && r.ecriture) rit++;
    if (typeof dd.ecran === "number") { ecranSum += dd.ecran; ecranN++; }
    if (dd.notion) notions.push([day, dd]);
  }
  const last = dernierPost();
  const due = L.nextPostDue(last);
  const chk = (k, label) => `<button class="check" data-wk="${k}"><span>${label}</span><span class="dot ${w[k] ? "on" : ""}"></span></button>`;
  return `<div class="screen">
    ${header(`Semaine du ${L.shortDate(m)} au ${L.shortDate(s)}${p.week ? " · Semaine " + p.week : ""}`, "Mon dimanche")}
    <div class="row">
      <div class="mini"><small>Journées réussies</small><strong>${ok} / 7</strong></div>
      <div class="mini"><small>Rituels complets</small><strong>${rit} / 7</strong></div>
    </div>
    <div class="row">
      <div class="mini"><small>Écran moyen</small><strong>${ecranN ? (ecranSum / ecranN).toFixed(1).replace(".", ",") + " h" : "?"}</strong><span>objectif ${String(L.screenTarget(s)).replace(".", ",")} h</span></div>
      <div class="mini ${L.daysUntil(today(), due) < 0 ? "alert" : ""}"><small>Prochain post</small><strong>${L.shortDate(due)}</strong><span>dernier le ${L.shortDate(last)}</span></div>
    </div>
    <div class="card">
      <span class="tag">Obligatoire</span>
      ${chk("claude", "Point avec Claude")}
      ${chk("compta", "Point sur ma compta perso")}
      ${chk("relu", "Relu mes notions et mes pages papier")}
    </div>
    <button class="btn" data-act="copy-week">Copier ma semaine pour Claude</button>
    <div class="card">
      <span class="tag">Revue de la semaine</span>
      <label class="f">Ce qui a marché<textarea id="w-marche" data-wfield="marche">${esc(w.marche)}</textarea></label>
      <label class="f">Ce qui a lâché<textarea id="w-lache" data-wfield="lache">${esc(w.lache)}</textarea></label>
      <label class="f">Ma décision pour la semaine prochaine<textarea id="w-decision" data-wfield="decision">${esc(w.decision)}</textarea></label>
      <label class="f">Tics pour 100 mots (mesure du mois, facultatif)<input type="number" id="w-tics" inputmode="decimal" step="0.1" data-wnum="tics" value="${w.tics ?? ""}"></label>
    </div>
    <div class="card">
      <span class="tag">Posts sur les réseaux</span>
      <p>Un post tous les deux mois au minimum. Dernier post le ${L.longDate(last)}.</p>
      <button class="btn ghost" data-act="post">J'ai publié un post aujourd'hui</button>
    </div>
    <div class="card">
      <span class="tag">Notions de la semaine</span>
      ${notions.length ? `<div class="list">${notions.map(([day, dd]) => `<div class="entry"><small>${L.longDate(day)}</small><b>${esc(dd.notion)}</b>${dd.definition ? `<span>${esc(dd.definition)}</span>` : ""}${dd.avis ? `<span><i>Avis.</i> ${esc(dd.avis)}</span>` : ""}</div>`).join("")}</div>` : `<p class="hint">Aucune notion cette semaine. Elles se remplissent dans le bilan du soir.</p>`}
    </div>
  </div>`;
}

function renderProgres() {
  const t = today();
  const st = L.streak(S.days, t);
  const week = L.programWeek(t);
  // 28 derniers jours, grille alignée sur le lundi
  const end = L.addDays(L.monday(t), 6);
  const start = L.addDays(end, -27);
  const cells = [];
  for (let i = 0; i < 28; i++) {
    const day = L.addDays(start, i);
    const has = !!S.days[day];
    const pct = L.dayScore(dayData(day), day).pct;
    const lvl = !has || day > t ? "" : pct >= 80 ? "l3" : pct >= 50 ? "l2" : pct > 0 ? "l1" : "";
    cells.push(`<span class="${lvl} ${day === t ? "today" : ""}" title="${L.longDate(day)} · ${has ? pct + " %" : "rien"}"></span>`);
  }
  // Temps d'écran sur 14 jours
  const W = 340, H = 140, pad = 24, n = 14;
  const days14 = Array.from({ length: n }, (_, i) => L.addDays(t, i - n + 1));
  const vals = days14.map((d) => dayData(d).ecran);
  const max = Math.max(8, ...vals.filter((v) => typeof v === "number"));
  const y = (v) => H - pad - (v / max) * (H - pad - 10);
  const bw = (W - pad) / n;
  const target = L.screenTarget(t);
  const bars = days14.map((d, i) => {
    const v = vals[i];
    if (typeof v !== "number") return "";
    const over = v > L.screenTarget(d);
    return `<rect x="${pad + i * bw + 3}" y="${y(v)}" width="${bw - 6}" height="${H - pad - y(v)}" rx="4" fill="${over ? "#22355C" : "#485829"}"><title>${L.shortDate(d)} · ${String(v).replace(".", ",")} h</title></rect>`;
  }).join("");
  const svg = `<svg viewBox="0 0 ${W} ${H}" width="100%" role="img" aria-label="Temps d'écran des 14 derniers jours">
    <line x1="${pad}" x2="${W}" y1="${H - pad}" y2="${H - pad}" stroke="#BCC0AE"/>
    <line x1="${pad}" x2="${W}" y1="${y(target)}" y2="${y(target)}" stroke="#8A3B1E" stroke-dasharray="4 4"/>
    <text x="0" y="${y(target) + 4}">${String(target).replace(".", ",")} h</text>
    <text x="0" y="${y(max) + 4}">${max} h</text>
    ${bars}
    <text x="${pad}" y="${H - 6}">${L.shortDate(days14[0])}</text>
    <text x="${W}" y="${H - 6}" text-anchor="end">${L.shortDate(t)}</text>
  </svg>`;
  const q = notionSearch.trim().toLowerCase();
  const notions = Object.entries(S.days).filter(([, d]) => d.notion).sort((a, b) => (a[0] < b[0] ? 1 : -1))
    .filter(([, d]) => !q || [d.notion, d.definition, d.avis].join(" ").toLowerCase().includes(q));
  const rels = Object.entries(S.days).filter(([, d]) => d.relation && (d.relation.qui || d.relation.quoi)).sort((a, b) => (a[0] < b[0] ? 1 : -1));
  return `<div class="screen">
    <div class="top"><div><small>${week ? "Jour " + (L.diffDays(L.START, t) + 1) + " du programme" : "Avant le départ"}</small><h2>Progrès</h2></div></div>
    <div class="row">
      <div class="mini"><small>Série</small><strong>${st} jour${st > 1 ? "s" : ""}</strong><span>journées réussies d'affilée</span></div>
      <div class="mini"><small>Semaine</small><strong>${week || "?"} / ${L.SEMAINES_PROGRAMME}</strong><span>${esc(palierDu(t)?.nom || "Avant le départ")}</span></div>
    </div>
    <div class="card">
      <span class="tag">Mes 4 dernières semaines</span>
      <div class="wk"><span>L</span><span>M</span><span>M</span><span>J</span><span>V</span><span>S</span><span>D</span></div>
      <div class="grid28">${cells.join("")}</div>
      <div class="legend"><span><i style="background:var(--accent)"></i>80 % et plus</span><span><i style="background:#8E9C64"></i>50 à 79 %</span><span><i style="background:#C3CAA7"></i>moins de 50 %</span></div>
    </div>
    <div class="card">
      <span class="tag">Temps d'écran · 14 jours</span>
      ${svg}
      <span class="hint">La ligne pointillée est ton objectif. Les barres bleues le dépassent.</span>
    </div>
    <div class="card">
      <span class="tag">Carnet de notions · ${notions.length}</span>
      <input type="search" id="f-search" placeholder="Chercher une notion" value="${esc(notionSearch)}">
      <div class="list" id="notion-list">${notions.length ? notions.map(([day, d]) => `<div class="entry"><small>${L.longDate(day)}</small><b>${esc(d.notion)}</b>${d.definition ? `<span>${esc(d.definition)}</span>` : ""}${d.avis ? `<span><i>Avis.</i> ${esc(d.avis)}</span>` : ""}</div>`).join("") : `<p class="hint">Tes notions apparaîtront ici.</p>`}</div>
    </div>
    <div class="card">
      <span class="tag">Mes relations · ${rels.length}</span>
      <div class="list">${rels.length ? rels.slice(0, 30).map(([day, d]) => `<div class="entry"><small>${L.longDate(day)}</small><b>${esc(d.relation.qui || "Sans nom")}</b>${d.relation.quoi ? `<span>${esc(d.relation.quoi)}</span>` : ""}${d.relation.mieux ? `<span><i>À améliorer.</i> ${esc(d.relation.mieux)}</span>` : ""}</div>`).join("") : `<p class="hint">Tes relations du jour apparaîtront ici. Claude les relit chaque dimanche.</p>`}</div>
    </div>
    <div class="card">
      <span class="tag">Échéances</span>
      <div class="list">${C.ECHEANCES.map(([n, d]) => { const k = L.daysUntil(t, d); return `<div class="entry"><b>${esc(n)}</b><small>${L.longDate(d)} ${d.slice(0, 4)} · ${k > 0 ? "dans " + k + " jours" : k === 0 ? "aujourd'hui" : "passé"}</small></div>`; }).join("")}</div>
    </div>
    <div class="card">
      <span class="tag">Objectifs chiffrés</span>
      <div class="tbl"><table><thead><tr>${C.OBJECTIFS_COLONNES.map((c) => `<th>${c}</th>`).join("")}</tr></thead>
      <tbody>${C.OBJECTIFS.map((r) => `<tr>${r.map((c) => `<td>${esc(c)}</td>`).join("")}</tr>`).join("")}</tbody></table></div>
    </div>
  </div>`;
}

function renderProgramme() {
  const t = today();
  const wk = L.programWeek(t);
  const themeIdx = L.dayIndex(t);
  const weeks = Array.from({ length: L.SEMAINES_PROGRAMME }, (_, i) => {
    const n = i + 1, slot = L.skillSlot(n), debut = L.addDays(L.START, i * 7);
    const noms = slot.kind === "bilan" ? C.BILAN.nom : C.PAIRES[slot.pair].map((id) => C.COMPETENCES[id].nom).join(" + ");
    return `<tr class="${n === wk ? "cur" : ""}"><td>${n}</td><td>${L.shortDate(debut)}</td><td>${slot.cycle}</td><td>${esc(noms)}</td></tr>`;
  }).join("");
  return `<div class="screen">
    <div class="top"><div><small>Version 3 · validée le 18 octobre 2026</small><h2>Programme</h2></div></div>
    <div class="motto">${esc(C.DEVISE)}</div>
    <div class="card"><span class="tag">Mes 10 lois</span>
      <ul class="laws">${C.LOIS.map(([c, tx, r]) => `<li><b>${c}</b><span>${esc(tx)}<br><span class="hint">Remplace. ${esc(r)}</span></span></li>`).join("")}</ul></div>
    <div class="card"><span class="tag">Paliers</span>
      <div class="list">${C.PALIERS.map((p) => `<div class="entry"><b>${p.code} · ${esc(p.nom)}${p.code === L.palierCode(t) ? " · en cours" : ""}</b><small>${p.code === "P5" ? "À partir de septembre 2027" : "Du " + L.shortDate(p.debut) + " au " + L.shortDate(p.fin)}</small><span>${esc(p.but)}</span></div>`).join("")}</div></div>
    <div class="card"><span class="tag">Compétences · deux par semaine</span>
      <div class="tbl"><table class="wk-table" style="min-width:0"><thead><tr><th>Sem.</th><th>Début</th><th>Cycle</th><th>Compétences</th></tr></thead><tbody>${weeks}</tbody></table></div></div>
    <div class="card"><span class="tag">Anglais · 30 min chaque soir</span>
      <div class="list">${C.ANGLAIS.map(([j, th], i) => `<div class="entry"><b>${j}${i === themeIdx ? " · ce soir" : ""}</b><span>${esc(th)}</span></div>`).join("")}</div>
      <button class="btn" data-act="copy-prompt">Copier le message coach du jour</button>
      <span class="hint">Colle-le dans ChatGPT, puis lance le mode vocal.</span></div>
    <div class="card"><span class="tag">Vente</span>
      <div class="list">${C.VENTE.map(([c, a, r]) => `<div class="entry"><b>${c}</b><span>${esc(a)}</span><small>${esc(r)}</small></div>`).join("")}</div></div>
    <div class="card"><span class="tag">Lecture · 30 min chaque soir</span>
      <div class="list">${C.LECTURE.map(([a, ti, w], i) => `<div class="entry"><b>${i + 1}. ${esc(ti)}</b><small>${esc(a)}</small><span>${esc(w)}</span></div>`).join("")}</div></div>
    <div class="card"><span class="tag">Mes présentations</span>
      ${C.PRESENTATIONS.map(([ti, tx]) => `<details><summary>${esc(ti)}</summary><p>${esc(tx)}</p></details>`).join("")}</div>
    <div class="card"><span class="tag">Mes données</span>
      <p class="hint">Tout reste sur ce téléphone. Fais une sauvegarde une fois par semaine et range le fichier dans Fichiers ou iCloud.</p>
      <div class="btns">
        <button class="btn ghost" data-act="backup">Sauvegarder mes données</button>
        <button class="btn ghost" data-act="restore">Restaurer une sauvegarde</button>
        <input type="file" id="f-restore" accept="application/json,.json" hidden>
      </div>
      <div id="restore-confirm"></div>
    </div>
    <p class="note">Flow State · ${Object.keys(S.days).length} jour${Object.keys(S.days).length > 1 ? "s" : ""} enregistré${Object.keys(S.days).length > 1 ? "s" : ""}${storageOk ? "" : " · stockage indisponible"}</p>
  </div>`;
}

const SCREENS = { matin: renderMatin, soir: renderSoir, dimanche: renderDimanche, progres: renderProgres, programme: renderProgramme };
const TABS = [["matin", "Matin"], ["soir", "Soir"], ["dimanche", "Dimanche"], ["progres", "Progrès"], ["programme", "Programme"]];

function render(keepScroll = false) {
  if (!isUnlocked()) return renderLock();
  const main = document.querySelector("main");
  const scroll = keepScroll && main ? main.scrollTop : 0;
  $app.innerHTML = `<main id="main">${SCREENS[view]()}</main>
    <nav class="tabs">${TABS.map(([k, l]) => `<button data-tab="${k}" class="${view === k ? "on" : ""}">${l}</button>`).join("")}</nav>`;
  document.getElementById("main").scrollTop = scroll;
}

function renderLock() {
  $app.innerHTML = `<div class="lock"><form class="box" id="lockform">
    <img src="icons/icon-192.png" alt="">
    <h1>Flow State</h1>
    <p class="hint">Entre ton code d'accès. Il ne sera plus demandé sur ce téléphone.</p>
    <input type="password" id="f-code" inputmode="numeric" autocomplete="off" maxlength="12" aria-label="Code d'accès">
    <button class="btn" type="submit">Entrer</button>
    <p class="hint" id="lockmsg"></p>
  </form></div>`;
  document.getElementById("lockform").addEventListener("submit", (e) => {
    e.preventDefault();
    const v = document.getElementById("f-code").value.trim();
    if (L.hashCode(v) === CODE_HASH) {
      try { localStorage.setItem(UNLOCK_KEY, CODE_HASH); } catch {}
      render();
    } else {
      document.getElementById("lockmsg").textContent = "Code incorrect. Réessaie.";
    }
  });
}

// ---------- Rafraîchit seulement le score sans casser la saisie ----------
function refreshScore() {
  const el = document.getElementById("scorecard");
  if (!el) return;
  const tmp = document.createElement("div");
  tmp.innerHTML = scoreBlock(cur);
  el.replaceWith(tmp.firstElementChild);
}

let saveTimer;
function saveSoon() {
  clearTimeout(saveTimer);
  saveTimer = setTimeout(save, 300);
}

// ---------- Copier ----------
async function copyText(text, okMsg) {
  try {
    await navigator.clipboard.writeText(text);
    toast(okMsg);
  } catch {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed"; ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand("copy"); toast(okMsg); } catch { toast("Copie impossible"); }
    ta.remove();
  }
}

// ---------- Sauvegarde et restauration ----------
async function backup() {
  const json = JSON.stringify({ app: "flow-state", exportedAt: new Date().toISOString(), data: S }, null, 1);
  const name = `flow-state-sauvegarde-${today()}.json`;
  const file = new File([json], name, { type: "application/json" });
  try {
    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      await navigator.share({ files: [file], title: "Sauvegarde Flow State" });
      return;
    }
  } catch (e) { if (e && e.name === "AbortError") return; }
  const url = URL.createObjectURL(file);
  const a = document.createElement("a");
  a.href = url; a.download = name;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 4000);
}

let pendingRestore = null;
function handleRestoreFile(file) {
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const parsed = JSON.parse(reader.result);
      const data = parsed.data || parsed;
      if (!data || typeof data.days !== "object") throw new Error("format");
      pendingRestore = data;
      const n = Object.keys(data.days).length;
      document.getElementById("restore-confirm").innerHTML = `<div class="card" style="margin-top:10px">
        <p>Ce fichier contient ${n} jour${n > 1 ? "s" : ""}. Il va remplacer toutes les données actuelles.</p>
        <div class="btns"><button class="btn danger" data-act="restore-yes">Remplacer mes données</button>
        <button class="btn ghost" data-act="restore-no">Annuler</button></div></div>`;
    } catch {
      toast("Ce fichier n'est pas une sauvegarde Flow State");
    }
  };
  reader.readAsText(file);
}

// ---------- Événements ----------
$app.addEventListener("click", (e) => {
  const t = e.target.closest("button");
  if (!t) return;
  if (t.dataset.tab) { view = t.dataset.tab; if (view === "soir" || view === "matin") {} render(); return; }
  const act = t.dataset.act;
  if (act === "prev") { cur = L.addDays(cur, view === "dimanche" ? -7 : -1); render(); return; }
  if (act === "next") { cur = L.addDays(cur, view === "dimanche" ? 7 : 1); render(); return; }
  if (act === "today") { cur = today(); render(); return; }
  if (act === "laws") { showAllLaws = !showAllLaws; render(true); return; }
  if (act === "copy-week") { copyText(weekSummaryText(cur), "Semaine copiée. Colle-la dans Claude."); return; }
  if (act === "copy-prompt") {
    copyText(C.PROMPT_ANGLAIS.replace("{THEME}", C.THEMES_EN[L.dayIndex(today())]), "Message copié. Colle-le dans ChatGPT.");
    return;
  }
  if (act === "post") {
    const d = today();
    if (!S.posts.includes(d)) S.posts.push(d);
    save(); toast("Post enregistré"); render(true); return;
  }
  if (act === "backup") { backup(); return; }
  if (act === "restore") { document.getElementById("f-restore").click(); return; }
  if (act === "restore-yes" && pendingRestore) {
    S = { ...blank(), ...pendingRestore };
    pendingRestore = null; save(); toast("Données restaurées"); render(); return;
  }
  if (act === "restore-no") { pendingRestore = null; document.getElementById("restore-confirm").innerHTML = ""; return; }
  if (t.dataset.rit) {
    const d = ensureDay(cur);
    d.rituel = { ...(d.rituel || {}), [t.dataset.rit]: !(d.rituel || {})[t.dataset.rit] };
    save(); render(true); return;
  }
  if (t.dataset.yn) {
    const v = t.dataset.v === "1";
    const d = ensureDay(cur);
    const f = t.dataset.yn;
    if (f === "coucher") d.coucher = d.coucher === v ? undefined : v;
    else { d.bilan = { ...(d.bilan || {}) }; d.bilan[f] = d.bilan[f] === v ? undefined : v; }
    save(); render(true); return;
  }
  if (t.dataset.wk) {
    const w = ensureWeek(cur);
    w[t.dataset.wk] = !w[t.dataset.wk];
    save(); render(true); return;
  }
});

$app.addEventListener("input", (e) => {
  const el = e.target;
  if (el.id === "f-search") {
    notionSearch = el.value;
    const pos = el.selectionStart;
    render(true);
    const s = document.getElementById("f-search");
    s.focus(); s.setSelectionRange(pos, pos);
    return;
  }
  if (el.dataset.field) { ensureDay(cur)[el.dataset.field] = el.value; saveSoon(); refreshScore(); return; }
  if (el.dataset.rel) { const d = ensureDay(cur); d.relation = { ...(d.relation || {}), [el.dataset.rel]: el.value }; saveSoon(); return; }
  if (el.dataset.num) {
    const v = parseFloat(String(el.value).replace(",", "."));
    ensureDay(cur)[el.dataset.num] = Number.isFinite(v) ? v : undefined;
    saveSoon(); refreshScore(); return;
  }
  if (el.dataset.wfield) { ensureWeek(cur)[el.dataset.wfield] = el.value; saveSoon(); return; }
  if (el.dataset.wnum) {
    const v = parseFloat(String(el.value).replace(",", "."));
    ensureWeek(cur)[el.dataset.wnum] = Number.isFinite(v) ? v : undefined;
    saveSoon(); return;
  }
});

$app.addEventListener("change", (e) => {
  if (e.target.id === "f-restore" && e.target.files[0]) handleRestoreFile(e.target.files[0]);
});

// Revenir au jour actuel quand l'app revient au premier plan le lendemain.
let lastToday = today();
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible" && today() !== lastToday) {
    if (cur === lastToday) cur = today();
    lastToday = today();
    render();
  }
});
window.addEventListener("pagehide", save);

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js").catch(() => {});
}

render();
