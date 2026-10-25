import * as L from "./logic.js";
import * as C from "./content.js";

const KEY = "flowstate.v1";
const UNLOCK_KEY = "flowstate.unlocked";
const CODE_HASH = "1c674e04";
const DERNIER_POST_CONNU = "2026-09-30";

// ---------- Stockage local (uniquement sur le téléphone) ----------
function blank() {
  return { version: 2, days: {}, weeks: {}, posts: [DERNIER_POST_CONNU], livres: [] };
}
function migrate(s) {
  // Version 1 : l'écriture était une case du rituel.
  for (const d of Object.values(s.days || {})) {
    if (d.rituel && d.rituel.ecriture && d.carnet === undefined) d.carnet = true;
  }
  s.version = 2;
  return s;
}
function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return blank();
    const s = JSON.parse(raw);
    return migrate({ ...blank(), ...s, days: s.days || {}, weeks: s.weeks || {}, livres: s.livres || [], posts: s.posts && s.posts.length ? s.posts : [DERNIER_POST_CONNU] });
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

// ---------- Photos du carnet (IndexedDB, sur le téléphone) ----------
const DB_NAME = "flowstate-photos";
function idb() {
  return new Promise((res, rej) => {
    const r = indexedDB.open(DB_NAME, 1);
    r.onupgradeneeded = () => {
      const st = r.result.createObjectStore("photos", { keyPath: "id", autoIncrement: true });
      st.createIndex("date", "date");
    };
    r.onsuccess = () => res(r.result);
    r.onerror = () => rej(r.error);
  });
}
async function photoAdd(date, blob) {
  const db = await idb();
  return new Promise((res, rej) => {
    const tx = db.transaction("photos", "readwrite");
    tx.objectStore("photos").add({ date, blob, at: Date.now() });
    tx.oncomplete = res; tx.onerror = () => rej(tx.error);
  });
}
async function photosBetween(from, to) {
  const db = await idb();
  return new Promise((res, rej) => {
    const out = [];
    const tx = db.transaction("photos");
    const req = tx.objectStore("photos").index("date").openCursor(IDBKeyRange.bound(from, to));
    req.onsuccess = () => { const c = req.result; if (c) { out.push(c.value); c.continue(); } else res(out); };
    req.onerror = () => rej(req.error);
  });
}
async function photoDelete(id) {
  const db = await idb();
  return new Promise((res) => {
    const tx = db.transaction("photos", "readwrite");
    tx.objectStore("photos").delete(id);
    tx.oncomplete = res;
  });
}
async function photosAll() { return photosBetween("0000-00-00", "9999-99-99"); }
async function photosClear() {
  const db = await idb();
  return new Promise((res) => { const tx = db.transaction("photos", "readwrite"); tx.objectStore("photos").clear(); tx.oncomplete = res; });
}
async function compress(file) {
  const bmp = await createImageBitmap(file);
  const max = 1400;
  const k = Math.min(1, max / Math.max(bmp.width, bmp.height));
  const cv = document.createElement("canvas");
  cv.width = Math.round(bmp.width * k); cv.height = Math.round(bmp.height * k);
  cv.getContext("2d").drawImage(bmp, 0, 0, cv.width, cv.height);
  return new Promise((res) => cv.toBlob(res, "image/jpeg", 0.72));
}
const photoCounts = {};
async function refreshPhotoCount(date) {
  try { photoCounts[date] = (await photosBetween(date, date)).length; } catch { photoCounts[date] = 0; }
}

// ---------- État de l'interface ----------
const today = () => L.ymd(new Date());
let cur = today();
let slide = 0;
let showConseil = {};
const $app = document.getElementById("app");
const esc = (v) => String(v ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const dayData = (d) => S.days[d] || {};
const ensureDay = (d) => (S.days[d] ||= {});
const weekKey = (d) => L.monday(d);
const weekData = (d) => S.weeks[weekKey(d)] || {};
const ensureWeek = (d) => (S.weeks[weekKey(d)] ||= {});
const isSunday = (d) => L.dayIndex(d) === 6;
// Le dimanche à partir de 21 h, le briefing passe avant tout le reste.
const briefingPending = () => isSunday(today()) && new Date().getHours() >= 21 && !weekData(today()).briefing;
let view = briefingPending() ? "dimanche" : "matin";

function toast(msg) {
  const t = document.createElement("div");
  t.className = "toast";
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 2200);
}

// ---------- Icônes simples par compétence ----------
const ICON_PATHS = {
  oeil: '<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
  bulle: '<path d="M4 5h16v11H9l-5 4z"/>',
  cible: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5"/>',
  coche: '<path d="M4 12l5 5L20 6"/>',
  eclair: '<path d="M13 2L4 14h7l-1 8 9-12h-7z"/>',
  main: '<path d="M7 11V5a1.5 1.5 0 013 0v5m0-6a1.5 1.5 0 013 0v6m0-5a1.5 1.5 0 013 0v7m-9-2a1.5 1.5 0 00-3 1c0 6 3 9 7 9s6-3 6-7"/>',
  poignee: '<path d="M3 12l4-4 4 3 3-3 7 6-5 4-4-3-2 2z"/>',
  liste: '<path d="M8 6h12M8 12h12M8 18h12M4 6h.01M4 12h.01M4 18h.01"/>',
  etoile: '<path d="M12 3l2.7 5.6 6.1.8-4.4 4.3 1 6.1L12 17l-5.4 2.8 1-6.1-4.4-4.3 6.1-.8z"/>',
  gens: '<circle cx="8" cy="8" r="3"/><circle cx="17" cy="9" r="2.5"/><path d="M2 20c0-4 3-6 6-6s6 2 6 6M14 15c3 0 6 1.5 6 5"/>',
  boussole: '<circle cx="12" cy="12" r="9"/><path d="M15.5 8.5l-2 5-5 2 2-5z"/>',
  chemise: '<path d="M8 3l4 3 4-3 5 4-3 3v11H6V10L3 7z"/>',
  livre: '<path d="M4 4h7a2 2 0 012 2v14a2 2 0 00-2-2H4zM20 4h-5a2 2 0 00-2 2v14a2 2 0 012-2h5z"/>',
  loi: '<path d="M12 3v18M5 21h14M6 7h12M4 14l2-7 2 7a2 2 0 01-4 0zM16 14l2-7 2 7a2 2 0 01-4 0z"/>',
};
const SKILL_ICON = { aff: "oeil", comp: "bulle", auto: "boussole", disc: "coche", franc: "eclair", non: "main", v1: "poignee", struct: "liste", v2: "poignee", fier: "etoile", cur: "gens", ener: "eclair", aud: "cible", antic: "boussole", style: "chemise", v3: "livre", autor: "cible", pres: "bulle" };
const icon = (name, size = 28) => `<svg class="ic" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICON_PATHS[name] || ICON_PATHS.cible}</svg>`;

// ---------- Programme du jour ----------
function programmeDu(d) {
  const week = L.programWeek(d);
  const slot = L.skillSlot(week);
  const idx = L.dayIndex(d);
  if (slot.kind === "bilan") {
    const [conseil, defi] = C.BILAN.jours[idx];
    return { week, slot, items: [{ id: "bilan", label: "Bilan", nom: C.BILAN.nom, conseil, defi }] };
  }
  const pairIdx = slot.kind === "avant" ? 0 : slot.pair;
  const cycleKey = slot.cycle === 2 ? "c2" : "c1";
  const dayIdx = slot.kind === "avant" ? 0 : idx;
  const items = C.PAIRES[pairIdx].map((id, i) => {
    const comp = C.COMPETENCES[id];
    const [conseil, defi] = comp[cycleKey][dayIdx];
    return { id, label: i === 0 ? "Défi A" : "Défi B", nom: comp.nom, conseil, defi };
  });
  return { week, slot, items };
}
const palierDu = (d) => C.PALIERS.find((p) => p.code === L.palierCode(d));
const dernierPost = () => [...S.posts].sort().at(-1);
const sujetDu = (d) => C.SUJETS_EN[L.sujetIndex(d, C.SUJETS_EN.length)];
const livreActuel = () => S.livres.at(-1);
function pagesLues(livre) {
  if (!livre) return 0;
  return Object.entries(S.days).filter(([d]) => d >= livre.debut).reduce((s, [, v]) => s + (typeof v.pages === "number" ? v.pages : 0), 0);
}

// ---------- Rendu ----------
function header(sub, title, step = 1) {
  const isToday = cur === today();
  return `<div class="top"><div><small>${sub}</small><h2>${title}</h2></div>
    <div class="nav-date">
      <button data-act="prev" data-step="${step}" aria-label="Précédent">‹</button>
      ${isToday ? "" : `<button class="today" data-act="today">Aujourd'hui</button>`}
      <button data-act="next" data-step="${step}" aria-label="Suivant">›</button>
    </div></div>`;
}

function briefingGate() {
  return `<div class="screen"><div class="gate">
    ${icon("gens", 44)}
    <h2>Briefing d'abord</h2>
    <p>On est dimanche. Ta semaine avec Claude passe avant tout le reste.</p>
    <button class="btn" data-tab="dimanche">Faire mon briefing</button>
  </div></div>`;
}

function morningSlides(d) {
  const p = programmeDu(d);
  const loi = C.LOIS[L.loiIndex(d)];
  const slides = [];
  const hier = L.addDays(d, -1);
  if (d === today() && hier >= L.START && !L.isNoted(dayData(hier))) {
    slides.push({ kind: "alerte", hier });
  }
  slides.push({ kind: "loi", loi });
  p.items.forEach((it) => slides.push({ kind: "defi", it }));
  slides.push({ kind: "go" });
  return { p, slides };
}

function renderMatin() {
  if (briefingPending() && cur === today()) return briefingGate();
  const d = dayData(cur);
  const { p, slides } = morningSlides(cur);
  const pal = palierDu(cur);
  const sub = `${L.longDate(cur)} · Semaine ${p.week || 1} · ${pal ? pal.nom : ""}`;
  if (!d.matin || slide > 0) {
    const s = slides[Math.min(slide, slides.length - 1)];
    const dots = slides.map((_, i) => `<i class="${i <= Math.min(slide, slides.length - 1) ? "on" : ""}"></i>`).join("");
    let body = "";
    if (s.kind === "alerte") {
      body = `<div class="story alert">${icon("eclair", 44)}<small>Ne jamais rater deux fois</small>
        <p class="big">Hier n'est pas noté.</p>
        <button class="btn light" data-act="goto-soir" data-date="${s.hier}">Noter hier maintenant</button></div>`;
    } else if (s.kind === "loi") {
      body = `<div class="story">${icon("loi", 44)}<small>Loi du jour · ${s.loi[0]}</small><p class="big">${esc(s.loi[1])}</p></div>`;
    } else if (s.kind === "defi") {
      const key = s.it.id;
      body = `<div class="story">${icon(SKILL_ICON[key] || "cible", 44)}<small>${s.it.label} · ${esc(s.it.nom)}</small>
        <p class="big">${esc(s.it.defi)}</p>
        ${showConseil[key] ? `<p class="conseil">${esc(s.it.conseil)}</p>` : `<button class="linkbtn" data-act="conseil" data-key="${key}">Voir le conseil</button>`}</div>`;
    } else {
      body = `<div class="story go">${icon("coche", 44)}<small>${L.longDate(cur)}</small><p class="big">C'est parti.</p>
        <button class="btn light" data-act="matin-done">J'ai lu, je m'y mets</button></div>`;
    }
    return `<div class="stories" data-act="story-next"><div class="dots">${dots}</div>${body}
      <p class="tap">${s.kind === "go" || s.kind === "alerte" ? "" : "Touche pour continuer"}</p></div>`;
  }
  // Matin déjà lu : résumé compact
  const st = L.streak(S.days, today());
  const sujet = sujetDu(cur);
  const due = L.nextPostDue(dernierPost());
  const j = L.daysUntil(cur, due);
  return `<div class="screen">
    ${header(sub, "Ta journée")}
    <div class="streak"><strong>${st}</strong><span>jour${st > 1 ? "s" : ""} réussi${st > 1 ? "s" : ""} d'affilée</span></div>
    ${p.items.map((it) => `<div class="card row-ic">${icon(SKILL_ICON[it.id] || "cible", 30)}<div><span class="tag">${it.label}</span><p>${esc(it.defi)}</p></div></div>`).join("")}
    <div class="row">
      <div class="mini"><small>Anglais ce soir</small><strong class="sm">${esc(sujet[0])}</strong></div>
      <div class="mini ${j < 0 ? "alert" : ""}"><small>Prochain post</small><strong>${j < 0 ? "En retard" : "J-" + j}</strong></div>
    </div>
    <button class="btn ghost" data-act="replay">Revoir mon matin</button>
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
    <div class="score"><strong>${sc.pct} %</strong><span class="pill ${ok ? "" : "off"}">${ok ? "Journée réussie" : sc.done + " sur " + sc.total}</span></div>
    <div class="bar"><i style="width:${sc.pct}%"></i></div>
  </div>`;
}

function renderSoir() {
  const d = dayData(cur);
  const r = d.rituel || {};
  const b = d.bilan || {};
  const soc = d.social || {};
  const sujet = sujetDu(cur);
  const livre = livreActuel();
  const lues = pagesLues(livre);
  const nPhotos = photoCounts[cur] ?? 0;
  if (photoCounts[cur] === undefined) refreshPhotoCount(cur).then(() => { if (view === "soir") render(true); });
  const chip = (k, label) => `<button class="chip ${soc[k] ? "on" : ""}" data-soc="${k}">${label}</button>`;
  return `<div class="screen">
    ${header(`${L.longDate(cur)} · Soir`, "Bilan")}
    ${scoreBlock(cur)}
    <div class="card">
      <button class="check" data-rit="anglais"><span><b>Anglais</b> · 30 min avec ChatGPT<br><span class="hint">Sujet · ${esc(sujet[0])}</span></span><span class="dot ${r.anglais ? "on" : ""}"></span></button>
      <button class="btn ghost sm" data-act="copy-prompt">Copier le message pour ChatGPT</button>
    </div>
    <div class="card">
      <span class="tag">Lecture · ${L.PAGES_MIN} pages minimum</span>
      ${livre ? `<p class="hint">${esc(livre.titre)} · ${lues} / ${livre.total} pages</p><div class="bar"><i style="width:${Math.min(100, Math.round(lues / livre.total * 100))}%"></i></div>`
        : `<p class="hint">Indique ton livre une fois, en bas de l'onglet Programme.</p>`}
      <div class="stepper"><button data-act="pages" data-d="-1" aria-label="Moins une page">−</button>
        <input type="number" id="f-pages" inputmode="numeric" min="0" data-num="pages" value="${d.pages ?? ""}" placeholder="Pages lues">
        <button data-act="pages" data-d="1" aria-label="Plus une page">+</button></div>
    </div>
    <div class="card">
      <button class="check" data-act="carnet"><span><b>J'ai écrit dans mon carnet</b></span><span class="dot ${d.carnet ? "on" : ""}"></span></button>
      <label class="btn ghost sm" for="f-photo">${icon("livre", 18)} Photographier mes pages${nPhotos ? ` · ${nPhotos} photo${nPhotos > 1 ? "s" : ""}` : ""}</label>
      <input type="file" id="f-photo" accept="image/*" multiple hidden>
    </div>
    <div class="card">
      <span class="tag">Bilan</span>
      ${yn("je", b.je, "J'ai parlé en « je »")}
      ${yn("regard", b.regard, "J'ai regardé les gens dans les yeux")}
      ${yn("franc", b.franc, "J'ai dit ce que je pensais")}
      ${yn("defi", b.defi, "J'ai relevé mes défis")}
    </div>
    <div class="card">
      <span class="tag">Interactions sociales</span>
      <div class="chips">${chip("famille", "Famille")}${chip("amis", "Amis")}${chip("nouveaux", "Nouvelles personnes")}</div>
    </div>
    <div class="card">
      <span class="tag">Mesures</span>
      <label class="f">Temps d'écran (heures, ${L.screenTarget()} h maximum)<input type="number" id="f-ecran" inputmode="decimal" step="0.5" min="0" max="24" data-num="ecran" value="${d.ecran ?? ""}"></label>
      ${yn("coucher", d.coucher, "Couché avant 23 h 30 hier")}
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
  const o = (v) => (v === true ? "oui" : v === false ? "non" : "?");
  const lines = [`Flow State · semaine du ${L.longDate(m)} au ${L.longDate(s)}`, `Semaine ${p.week} du programme · ${p.items.map((i) => i.nom).join(" et ")}`];
  let ok = 0;
  for (let i = 0; i < 7; i++) {
    const day = L.addDays(m, i);
    const dd = dayData(day);
    const sc = L.dayScore(dd, day);
    if (sc.pct >= L.SEUIL_REUSSITE) ok++;
    const r = dd.rituel || {}, b = dd.bilan || {}, soc = dd.social || {};
    const socTxt = ["famille", "amis", "nouveaux"].filter((k) => soc[k]).join(", ") || "aucune";
    lines.push(`${L.longDate(day)} · ${sc.pct} % · matin ${o(dd.matin)} · anglais ${o(!!r.anglais)} · pages ${dd.pages ?? 0} · carnet ${o(dd.carnet)} · je ${o(b.je)} · regard ${o(b.regard)} · franc ${o(b.franc)} · défis ${o(b.defi)} · social ${socTxt} · écran ${dd.ecran ?? "?"} h · coucher ${o(dd.coucher)}`);
  }
  lines.splice(2, 0, `Journées réussies : ${ok} sur 7`);
  const livre = livreActuel();
  if (livre) lines.push("", `Livre en cours : ${livre.titre}, ${pagesLues(livre)} pages lues sur ${livre.total}`);
  lines.push("", "Revue :", `Ce qui a marché : ${w.marche || ""}`, `Ce qui a lâché : ${w.lache || ""}`, `Ma décision : ${w.decision || ""}`);
  lines.push("", "Les photos jointes sont mes pages de carnet de la semaine. Fais-moi réviser ce que j'ai écrit en me posant des questions, une à la fois. Ensuite fais le point sur ma semaine : ce qui progresse, ce qui lâche, ce que je change la semaine prochaine.");
  return lines.join("\n");
}

function renderDimanche() {
  const [m, s] = weekRange(cur);
  const w = weekData(cur);
  const p = programmeDu(m);
  let ok = 0, carnet = 0, pages = 0, ecranSum = 0, ecranN = 0;
  for (let i = 0; i < 7; i++) {
    const day = L.addDays(m, i);
    const dd = dayData(day);
    if (L.isSuccess(dd, day)) ok++;
    if (dd.carnet) carnet++;
    if (typeof dd.pages === "number") pages += dd.pages;
    if (typeof dd.ecran === "number") { ecranSum += dd.ecran; ecranN++; }
  }
  const step = (n, done, title, body) => `<div class="card step ${done ? "done" : ""}"><div class="num">${done ? icon("coche", 18) : n}</div><div class="stepbody"><b>${title}</b>${body}</div></div>`;
  const due = L.nextPostDue(dernierPost());
  return `<div class="screen">
    ${header(`Semaine du ${L.shortDate(m)} au ${L.shortDate(s)}${p.week ? " · Semaine " + p.week : ""}`, "Briefing", 7)}
    <div class="row">
      <div class="mini"><small>Réussies</small><strong>${ok} / 7</strong></div>
      <div class="mini"><small>Carnet</small><strong>${carnet} / 7</strong></div>
    </div>
    <div class="row">
      <div class="mini"><small>Pages lues</small><strong>${pages}</strong></div>
      <div class="mini"><small>Écran moyen</small><strong>${ecranN ? (ecranSum / ecranN).toFixed(1).replace(".", ",") + " h" : "?"}</strong></div>
    </div>
    ${step(1, w.envoye, "Envoyer ma semaine à Claude", `<span class="hint">Tes photos de carnet et le résumé, en un geste. Choisis Claude dans la liste.</span><button class="btn" data-act="send-week">Envoyer à Claude</button><button class="linkbtn" data-act="copy-week">Copier seulement le texte</button>`)}
    ${step(2, w.briefing, "Faire le briefing avec Claude", `<span class="hint">Il te questionne sur ton carnet, puis vous faites le point.</span><button class="btn ghost" data-wk="briefing">${w.briefing ? "Briefing fait" : "J'ai fait mon briefing"}</button>`)}
    ${step(3, w.compta, "Point compta perso", `<button class="btn ghost" data-wk="compta">${w.compta ? "Fait" : "C'est fait"}</button>`)}
    <div class="card">
      <span class="tag">Revue · facultatif</span>
      <label class="f">Ce qui a marché<textarea id="w-marche" data-wfield="marche">${esc(w.marche)}</textarea></label>
      <label class="f">Ce qui a lâché<textarea id="w-lache" data-wfield="lache">${esc(w.lache)}</textarea></label>
      <label class="f">Ma décision<textarea id="w-decision" data-wfield="decision">${esc(w.decision)}</textarea></label>
    </div>
    <div class="card">
      <span class="tag">Prochain post · avant le ${L.shortDate(due)}</span>
      <button class="btn ghost" data-act="post">J'ai publié un post aujourd'hui</button>
    </div>
  </div>`;
}

function renderProgres() {
  if (briefingPending()) return briefingGate();
  const t = today();
  const st = L.streak(S.days, t);
  const week = L.programWeek(t);
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
  const W = 340, H = 140, pad = 24, n = 14;
  const days14 = Array.from({ length: n }, (_, i) => L.addDays(t, i - n + 1));
  const vals = days14.map((d) => dayData(d).ecran);
  const max = Math.max(10, ...vals.filter((v) => typeof v === "number"));
  const y = (v) => H - pad - (v / max) * (H - pad - 10);
  const bw = (W - pad) / n;
  const target = L.screenTarget();
  const bars = days14.map((d, i) => {
    const v = vals[i];
    if (typeof v !== "number") return "";
    return `<rect x="${pad + i * bw + 3}" y="${y(v)}" width="${bw - 6}" height="${H - pad - y(v)}" rx="4" fill="${v > target ? "#22355C" : "#485829"}"><title>${L.shortDate(d)} · ${String(v).replace(".", ",")} h</title></rect>`;
  }).join("");
  const svg = `<svg viewBox="0 0 ${W} ${H}" width="100%" role="img" aria-label="Temps d'écran des 14 derniers jours">
    <line x1="${pad}" x2="${W}" y1="${H - pad}" y2="${H - pad}" stroke="#BCC0AE"/>
    <line x1="${pad}" x2="${W}" y1="${y(target)}" y2="${y(target)}" stroke="#8A3B1E" stroke-dasharray="4 4"/>
    <text x="0" y="${y(target) + 4}">${target} h</text>
    <text x="0" y="${y(max) + 4}">${max} h</text>
    ${bars}
    <text x="${pad}" y="${H - 6}">${L.shortDate(days14[0])}</text>
    <text x="${W}" y="${H - 6}" text-anchor="end">${L.shortDate(t)}</text>
  </svg>`;
  const livre = livreActuel();
  const lues = pagesLues(livre);
  const [m] = weekRange(t);
  let fam = 0, ami = 0, nouv = 0;
  for (let i = 0; i < 7; i++) { const soc = dayData(L.addDays(m, i)).social || {}; if (soc.famille) fam++; if (soc.amis) ami++; if (soc.nouveaux) nouv++; }
  return `<div class="screen">
    <div class="top"><div><small>Jour ${L.diffDays(L.START, t) + 1} du programme</small><h2>Progrès</h2></div></div>
    <div class="streak"><strong>${st}</strong><span>jour${st > 1 ? "s" : ""} réussi${st > 1 ? "s" : ""} d'affilée · semaine ${week} sur ${L.SEMAINES_PROGRAMME}</span></div>
    <div class="card">
      <span class="tag">Mes 4 dernières semaines</span>
      <div class="wk"><span>L</span><span>M</span><span>M</span><span>J</span><span>V</span><span>S</span><span>D</span></div>
      <div class="grid28">${cells.join("")}</div>
      <div class="legend"><span><i style="background:var(--accent)"></i>80 % et plus</span><span><i style="background:#8E9C64"></i>50 à 79 %</span><span><i style="background:#C3CAA7"></i>moins de 50 %</span></div>
    </div>
    <div class="card">
      <span class="tag">Temps d'écran · 14 jours</span>
      ${svg}
    </div>
    <div class="card">
      <span class="tag">Lecture</span>
      ${livre ? `<p><b>${esc(livre.titre)}</b></p><div class="bar"><i style="width:${Math.min(100, Math.round(lues / livre.total * 100))}%"></i></div><span class="hint">${lues} pages lues sur ${livre.total}</span>` : `<p class="hint">Aucun livre indiqué.</p>`}
    </div>
    <div class="card">
      <span class="tag">Social · cette semaine</span>
      <div class="row3"><div><strong>${fam}</strong><span>Famille</span></div><div><strong>${ami}</strong><span>Amis</span></div><div><strong>${nouv}</strong><span>Nouvelles</span></div></div>
    </div>
    <div class="card">
      <span class="tag">Échéances</span>
      <div class="list">${C.ECHEANCES.map(([nm, d]) => { const k = L.daysUntil(t, d); return `<div class="entry"><b>${esc(nm)}</b><small>${k > 0 ? "dans " + k + " jours" : k === 0 ? "aujourd'hui" : "passé"}</small></div>`; }).join("")}</div>
    </div>
  </div>`;
}

function renderProgramme() {
  if (briefingPending()) return briefingGate();
  const t = today();
  const wk = L.programWeek(t);
  const livre = livreActuel();
  const weeks = Array.from({ length: L.SEMAINES_PROGRAMME }, (_, i) => {
    const n = i + 1, slot = L.skillSlot(n), debut = L.addDays(L.START, i * 7);
    const noms = slot.kind === "bilan" ? C.BILAN.nom : C.PAIRES[slot.pair].map((id) => C.COMPETENCES[id].nom).join(" + ");
    return `<tr class="${n === wk ? "cur" : ""}"><td>${n}</td><td>${L.shortDate(debut)}</td><td>${esc(noms)}</td></tr>`;
  }).join("");
  return `<div class="screen">
    <div class="top"><div><small>Version 3 · mise à jour du 25 octobre</small><h2>Programme</h2></div></div>
    <div class="motto">${esc(C.DEVISE)}</div>
    <div class="card"><span class="tag">Mon livre</span>
      <label class="f">Titre<input type="text" id="f-livre-titre" value="${esc(livre?.titre)}" placeholder="Comment se faire des amis"></label>
      <label class="f">Nombre de pages<input type="number" id="f-livre-total" inputmode="numeric" min="1" value="${livre?.total ?? ""}"></label>
      <button class="btn ghost" data-act="livre">${livre ? "Commencer ce nouveau livre" : "Enregistrer mon livre"}</button>
      ${livre ? `<span class="hint">En cours depuis le ${L.shortDate(livre.debut)}.</span>` : ""}
    </div>
    <div class="card"><span class="tag">Mes 10 lois</span>
      <ul class="laws">${C.LOIS.map(([c, tx]) => `<li><b>${c}</b>${esc(tx)}</li>`).join("")}</ul></div>
    <div class="card"><span class="tag">Compétences</span>
      <div class="tbl"><table class="wk-table" style="min-width:0"><thead><tr><th>Sem.</th><th>Début</th><th>Compétences</th></tr></thead><tbody>${weeks}</tbody></table></div></div>
    <div class="card"><span class="tag">Mes présentations</span>
      ${C.PRESENTATIONS.map(([ti, tx]) => `<details><summary>${esc(ti)}</summary><p>${esc(tx)}</p></details>`).join("")}</div>
    <div class="card"><span class="tag">Notifications · app Raccourcis</span>
      <div class="list">${C.NOTIFS.map(([h, j, ti, tx]) => `<div class="entry"><b>${h} · ${esc(j)}</b><small>${esc(ti)}</small><span>${esc(tx)}</span></div>`).join("")}</div></div>
    <div class="card"><span class="tag">Lecture conseillée</span>
      <div class="list">${C.LECTURE.map(([a, ti]) => `<div class="entry"><b>${esc(ti)}</b><small>${esc(a)}</small></div>`).join("")}</div></div>
    <div class="card"><span class="tag">Mes données</span>
      <p class="hint">Tout reste sur ce téléphone. Sauvegarde chaque dimanche dans iCloud.</p>
      <div class="btns">
        <button class="btn ghost" data-act="backup">Sauvegarder mes données</button>
        <button class="btn ghost" data-act="restore">Restaurer une sauvegarde</button>
        <input type="file" id="f-restore" accept="application/json,.json" hidden>
      </div>
      <div id="restore-confirm"></div>
    </div>
    <p class="note">Flow State v2${storageOk ? "" : " · stockage indisponible"}</p>
  </div>`;
}

const SCREENS = { matin: renderMatin, soir: renderSoir, dimanche: renderDimanche, progres: renderProgres, programme: renderProgramme };
const TABS = [["matin", "Matin"], ["soir", "Soir"], ["dimanche", "Dimanche"], ["progres", "Progrès"], ["programme", "Programme"]];

function render(keepScroll = false) {
  if (!isUnlocked()) return renderLock();
  const main = document.getElementById("main");
  const scroll = keepScroll && main ? main.scrollTop : 0;
  const pending = briefingPending();
  $app.innerHTML = `<main id="main">${SCREENS[view]()}</main>
    <nav class="tabs">${TABS.map(([k, l]) => `<button data-tab="${k}" class="${view === k ? "on" : ""} ${pending && k === "dimanche" ? "pulse" : ""}">${l}</button>`).join("")}</nav>`;
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

function refreshScore() {
  const el = document.getElementById("scorecard");
  if (!el) return;
  const tmp = document.createElement("div");
  tmp.innerHTML = scoreBlock(cur);
  el.replaceWith(tmp.firstElementChild);
}
let saveTimer;
function saveSoon() { clearTimeout(saveTimer); saveTimer = setTimeout(save, 300); }

// ---------- Copier et partager ----------
async function copyText(text, okMsg) {
  try { await navigator.clipboard.writeText(text); toast(okMsg); }
  catch {
    const ta = document.createElement("textarea");
    ta.value = text; ta.setAttribute("readonly", ""); ta.style.position = "fixed"; ta.style.opacity = "0";
    document.body.appendChild(ta); ta.select();
    try { document.execCommand("copy"); toast(okMsg); } catch { toast("Copie impossible"); }
    ta.remove();
  }
}

async function sendWeek() {
  const [m, s] = weekRange(cur);
  const text = weekSummaryText(cur);
  let files = [];
  try {
    const ph = await photosBetween(m, s);
    files = ph.map((p, i) => new File([p.blob], `carnet-${p.date}-${i + 1}.jpg`, { type: "image/jpeg" }));
  } catch {}
  try {
    if (files.length && navigator.canShare && navigator.canShare({ files, text })) {
      await navigator.share({ files, text });
    } else if (navigator.share) {
      await navigator.share({ text });
      if (files.length) toast("Partage des photos impossible ici. Envoie-les depuis Photos.");
    } else {
      await copyText(text, "Texte copié. Colle-le dans Claude.");
    }
    ensureWeek(cur).envoye = true; save(); render(true);
  } catch (e) {
    if (e && e.name === "AbortError") return;
    await copyText(text, "Texte copié. Colle-le dans Claude.");
  }
}

// ---------- Sauvegarde et restauration ----------
const blobToDataURL = (b) => new Promise((res) => { const r = new FileReader(); r.onload = () => res(r.result); r.readAsDataURL(b); });
async function backup() {
  let photos = [];
  try { photos = await Promise.all((await photosAll()).map(async (p) => ({ date: p.date, data: await blobToDataURL(p.blob) }))); } catch {}
  const json = JSON.stringify({ app: "flow-state", exportedAt: new Date().toISOString(), data: S, photos });
  const name = `flow-state-sauvegarde-${today()}.json`;
  const file = new File([json], name, { type: "application/json" });
  try {
    if (navigator.canShare && navigator.canShare({ files: [file] })) { await navigator.share({ files: [file], title: "Sauvegarde Flow State" }); return; }
  } catch (e) { if (e && e.name === "AbortError") return; }
  const url = URL.createObjectURL(file);
  const a = document.createElement("a");
  a.href = url; a.download = name; document.body.appendChild(a); a.click(); a.remove();
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
      pendingRestore = { data, photos: parsed.photos || [] };
      const n = Object.keys(data.days).length;
      document.getElementById("restore-confirm").innerHTML = `<div class="card" style="margin-top:10px">
        <p>Ce fichier contient ${n} jour${n > 1 ? "s" : ""} et ${pendingRestore.photos.length} photo${pendingRestore.photos.length > 1 ? "s" : ""}. Il remplace toutes les données actuelles.</p>
        <div class="btns"><button class="btn danger" data-act="restore-yes">Remplacer mes données</button>
        <button class="btn ghost" data-act="restore-no">Annuler</button></div></div>`;
    } catch { toast("Ce fichier n'est pas une sauvegarde Flow State"); }
  };
  reader.readAsText(file);
}

// ---------- Événements ----------
$app.addEventListener("click", async (e) => {
  const t = e.target.closest("button, [data-act='story-next']");
  if (!t) return;
  if (t.dataset.tab) { view = t.dataset.tab; slide = 0; render(); return; }
  const act = t.dataset.act;
  if (act === "story-next") {
    if (e.target.closest("button, a, label")) return;
    const { slides } = morningSlides(cur);
    const s = slides[Math.min(slide, slides.length - 1)];
    if (s.kind !== "go" && s.kind !== "alerte") { slide = Math.min(slide + 1, slides.length - 1); render(); }
    return;
  }
  if (act === "conseil") { showConseil[t.dataset.key] = true; render(); return; }
  if (act === "goto-soir") { cur = t.dataset.date; view = "soir"; slide = 0; render(); return; }
  if (act === "matin-done") { ensureDay(cur).matin = true; slide = 0; showConseil = {}; save(); render(); return; }
  if (act === "replay") { slide = 1; render(); return; }
  if (act === "prev" || act === "next") { cur = L.addDays(cur, (act === "prev" ? -1 : 1) * Number(t.dataset.step || 1)); slide = 0; render(); return; }
  if (act === "today") { cur = today(); slide = 0; render(); return; }
  if (act === "copy-week") { copyText(weekSummaryText(cur), "Semaine copiée. Colle-la dans Claude."); return; }
  if (act === "send-week") { sendWeek(); return; }
  if (act === "copy-prompt") {
    copyText(C.PROMPT_ANGLAIS.replace("{THEME}", sujetDu(cur)[1]), "Message copié. Colle-le dans ChatGPT.");
    return;
  }
  if (act === "pages") {
    const d = ensureDay(cur);
    d.pages = Math.max(0, (d.pages || 0) + Number(t.dataset.d));
    save(); render(true); return;
  }
  if (act === "carnet") { const d = ensureDay(cur); d.carnet = !d.carnet; save(); render(true); return; }
  if (act === "livre") {
    const titre = document.getElementById("f-livre-titre").value.trim();
    const total = parseInt(document.getElementById("f-livre-total").value, 10);
    if (!titre || !(total > 0)) { toast("Indique le titre et le nombre de pages"); return; }
    const cur0 = livreActuel();
    if (cur0 && cur0.titre === titre) { cur0.total = total; } else { S.livres.push({ titre, total, debut: today() }); }
    save(); toast("Livre enregistré"); render(true); return;
  }
  if (act === "post") { const d = today(); if (!S.posts.includes(d)) S.posts.push(d); save(); toast("Post enregistré"); render(true); return; }
  if (act === "backup") { backup(); return; }
  if (act === "restore") { document.getElementById("f-restore").click(); return; }
  if (act === "restore-yes" && pendingRestore) {
    S = migrate({ ...blank(), ...pendingRestore.data });
    try {
      await photosClear();
      for (const p of pendingRestore.photos) { const b = await (await fetch(p.data)).blob(); await photoAdd(p.date, b); }
    } catch {}
    pendingRestore = null; save(); toast("Données restaurées"); render(); return;
  }
  if (act === "restore-no") { pendingRestore = null; document.getElementById("restore-confirm").innerHTML = ""; return; }
  if (t.dataset.rit) { const d = ensureDay(cur); d.rituel = { ...(d.rituel || {}), [t.dataset.rit]: !(d.rituel || {})[t.dataset.rit] }; save(); render(true); return; }
  if (t.dataset.soc) { const d = ensureDay(cur); d.social = { ...(d.social || {}), [t.dataset.soc]: !(d.social || {})[t.dataset.soc] }; save(); render(true); return; }
  if (t.dataset.yn) {
    const v = t.dataset.v === "1";
    const d = ensureDay(cur);
    const f = t.dataset.yn;
    if (f === "coucher") d.coucher = d.coucher === v ? undefined : v;
    else { d.bilan = { ...(d.bilan || {}) }; d.bilan[f] = d.bilan[f] === v ? undefined : v; }
    save(); render(true); return;
  }
  if (t.dataset.wk) { const w = ensureWeek(cur); w[t.dataset.wk] = !w[t.dataset.wk]; save(); render(true); return; }
});

$app.addEventListener("input", (e) => {
  const el = e.target;
  if (el.dataset.num) {
    const v = parseFloat(String(el.value).replace(",", "."));
    ensureDay(cur)[el.dataset.num] = Number.isFinite(v) ? v : undefined;
    saveSoon(); refreshScore(); return;
  }
  if (el.dataset.wfield) { ensureWeek(cur)[el.dataset.wfield] = el.value; saveSoon(); return; }
});

$app.addEventListener("change", async (e) => {
  if (e.target.id === "f-restore" && e.target.files[0]) { handleRestoreFile(e.target.files[0]); return; }
  if (e.target.id === "f-photo" && e.target.files.length) {
    const files = [...e.target.files];
    try {
      for (const f of files) await photoAdd(cur, await compress(f));
      const d = ensureDay(cur); d.carnet = true; save();
      await refreshPhotoCount(cur);
      toast(files.length > 1 ? `${files.length} photos enregistrées` : "Photo enregistrée");
    } catch { toast("Photo impossible à enregistrer"); }
    render(true);
  }
});

let lastToday = today();
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible" && today() !== lastToday) {
    if (cur === lastToday) cur = today();
    lastToday = today();
    if (briefingPending()) view = "dimanche";
    slide = 0;
    render();
  }
});
window.addEventListener("pagehide", save);

if ("serviceWorker" in navigator) navigator.serviceWorker.register("sw.js").catch(() => {});

render();
