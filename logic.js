// Fonctions pures de Flow State : dates, semaines du programme, objectifs, scores.
// Toutes les dates sont des chaînes "AAAA-MM-JJ" (jour local), calculées en UTC pour éviter les décalages d'heure d'été.

export const START = "2026-10-19";
export const SEMAINES_PROGRAMME = 19;

const pad = (n) => String(n).padStart(2, "0");

export function ymd(d = new Date()) {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

export function parse(s) {
  const [y, m, d] = s.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d));
}

const fmt = (dt) => `${dt.getUTCFullYear()}-${pad(dt.getUTCMonth() + 1)}-${pad(dt.getUTCDate())}`;

export function addDays(s, n) {
  const dt = parse(s);
  dt.setUTCDate(dt.getUTCDate() + n);
  return fmt(dt);
}

export function diffDays(a, b) {
  return Math.round((parse(b) - parse(a)) / 86400000);
}

// 0 = lundi ... 6 = dimanche
export function dayIndex(s) {
  return (parse(s).getUTCDay() + 6) % 7;
}

export function monday(s) {
  return addDays(s, -dayIndex(s));
}

// Semaine du programme : 0 avant le départ, 1 à partir du 19 octobre 2026.
export function programWeek(s) {
  const d = diffDays(START, s);
  return d < 0 ? 0 : Math.floor(d / 7) + 1;
}

// Quelle paire de compétences et quel cycle pour une semaine donnée.
// Après la semaine 19, le cycle 2 tourne en boucle.
export function skillSlot(week) {
  if (week <= 0) return { kind: "avant", cycle: 1, pair: 0 };
  if (week <= 9) return { kind: "paire", cycle: 1, pair: week - 1 };
  if (week <= 18) return { kind: "paire", cycle: 2, pair: week - 10 };
  if (week === 19) return { kind: "bilan", cycle: 2, pair: -1 };
  return { kind: "paire", cycle: 2, pair: (week - 20) % 9 };
}

export function palierCode(s) {
  if (s < START) return "avant";
  if (s <= "2026-11-15") return "P1";
  if (s <= "2026-12-26") return "P2";
  if (s <= "2027-02-28") return "P3";
  if (s <= "2027-06-30") return "P4";
  return "P5";
}

// Objectif de temps d'écran : 6 h par jour maximum (décision du 25 octobre 2026).
export function screenTarget() {
  return 6;
}

export const PAGES_MIN = 4;

// Loi du jour : les 10 lois tournent, une par jour depuis le départ.
export function loiIndex(s) {
  return ((diffDays(START, s) % 10) + 10) % 10;
}

// Sujet d'anglais du jour : rotation sur la liste des sujets depuis le départ.
export function sujetIndex(s, n) {
  return ((diffDays(START, s) % n) + n) % n;
}

export function isoWeekId(s) {
  const dt = parse(s);
  const day = (dt.getUTCDay() + 6) % 7;
  dt.setUTCDate(dt.getUTCDate() - day + 3);
  const firstThursday = new Date(Date.UTC(dt.getUTCFullYear(), 0, 4));
  const week = 1 + Math.round(((dt - firstThursday) / 86400000 - 3 + ((firstThursday.getUTCDay() + 6) % 7)) / 7);
  return `${dt.getUTCFullYear()}-W${pad(week)}`;
}

const filled = (v) => typeof v === "string" && v.trim().length > 0;

// Score d'une journée sur 11 éléments (version 2, 25 octobre 2026).
export function dayScore(day, s) {
  const d = day || {};
  const r = d.rituel || {};
  const b = d.bilan || {};
  const soc = d.social || {};
  const items = [
    d.matin === true,
    !!r.anglais,
    typeof d.pages === "number" && d.pages >= PAGES_MIN,
    d.carnet === true,
    b.je === true, b.regard === true, b.franc === true, b.defi === true,
    !!(soc.amis || soc.nouveaux),
    typeof d.ecran === "number" && d.ecran <= screenTarget(s),
    d.coucher === true,
  ];
  const done = items.filter(Boolean).length;
  return { done, total: items.length, pct: Math.round((done / items.length) * 100) };
}

// Une journée est « notée » quand les quatre questions du bilan ont une réponse.
export function isNoted(day) {
  const b = (day || {}).bilan || {};
  return ["je", "regard", "franc", "defi"].every((k) => typeof b[k] === "boolean");
}

export const SEUIL_REUSSITE = 80;

export function isSuccess(day, s) {
  return dayScore(day, s).pct >= SEUIL_REUSSITE;
}

// Série de journées réussies jusqu'à aujourd'hui. Une journée en cours non réussie ne casse pas la série.
export function streak(days, today) {
  let n = 0;
  let cur = isSuccess(days[today], today) ? today : addDays(today, -1);
  while (cur >= START && isSuccess(days[cur], cur)) {
    n++;
    cur = addDays(cur, -1);
  }
  return n;
}

// Prochain post dû : deux mois après le dernier, au même jour (ramené au dernier jour du mois si besoin).
export function nextPostDue(last) {
  const [y, m, d] = last.split("-").map(Number);
  let mm = m + 2, yy = y;
  if (mm > 12) { mm -= 12; yy += 1; }
  const lastDay = new Date(Date.UTC(yy, mm, 0)).getUTCDate();
  return `${yy}-${pad(mm)}-${pad(Math.min(d, lastDay))}`;
}

export function daysUntil(from, to) {
  return diffDays(from, to);
}

const JOURS = ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche"];
const MOIS = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];

export function longDate(s) {
  const dt = parse(s);
  return `${JOURS[dayIndex(s)]} ${dt.getUTCDate()} ${MOIS[dt.getUTCMonth()]}`;
}

const MOIS_COURT = ["janv.", "févr.", "mars", "avr.", "mai", "juin", "juil.", "août", "sept.", "oct.", "nov.", "déc."];

export function shortDate(s) {
  const dt = parse(s);
  return `${dt.getUTCDate()} ${MOIS_COURT[dt.getUTCMonth()]}`;
}

// Petit hachage pour le code d'accès (FNV-1a 32 bits, assez pour un verrou local).
export function hashCode(str) {
  let h = 0x811c9dc5;
  for (const ch of `flowstate:${str}`) {
    h ^= ch.codePointAt(0);
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return h.toString(16).padStart(8, "0");
}
