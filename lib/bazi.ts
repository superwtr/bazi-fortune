import {
  HeavenlyStem, EarthlyBranch, Element, YinYang, Gender,
  StemBranch, Pillar, FourPillars, ElementCount,
  TenGodName, TenGodEntry, DayunPeriod, BaziAnalysis,
  CompatibilityResult, BirthInput,
} from './types';
import { getNayin, NAYIN_TABLE } from './nayin';

// ─── Constants ──────────────────────────────────────────────────────

export const STEMS: HeavenlyStem[] = ['甲','乙','丙','丁','戊','己','庚','辛','壬','癸'];
export const BRANCHES: EarthlyBranch[] = ['子','丑','寅','卯','辰','巳','午','未','申','酉','戌','亥'];

export const STEM_ELEMENT: Record<HeavenlyStem, Element> = {
  '甲':'wood','乙':'wood','丙':'fire','丁':'fire','戊':'earth',
  '己':'earth','庚':'metal','辛':'metal','壬':'water','癸':'water',
};

export const STEM_YINYANG: Record<HeavenlyStem, YinYang> = {
  '甲':'yang','乙':'yin','丙':'yang','丁':'yin','戊':'yang',
  '己':'yin','庚':'yang','辛':'yin','壬':'yang','癸':'yin',
};

export const BRANCH_ELEMENT: Record<EarthlyBranch, Element> = {
  '子':'water','丑':'earth','寅':'wood','卯':'wood','辰':'earth',
  '巳':'fire','午':'fire','未':'earth','申':'metal','酉':'metal',
  '戌':'earth','亥':'water',
};

export const HIDDEN_STEMS: Record<EarthlyBranch, HeavenlyStem[]> = {
  '子': ['癸'],
  '丑': ['己','癸','辛'],
  '寅': ['甲','丙','戊'],
  '卯': ['乙'],
  '辰': ['戊','乙','癸'],
  '巳': ['丙','庚','戊'],
  '午': ['丁','己'],
  '未': ['己','丁','乙'],
  '申': ['庚','壬','戊'],
  '酉': ['辛'],
  '戌': ['戊','辛','丁'],
  '亥': ['壬','甲'],
};

export const ZODIAC_ANIMALS: Record<EarthlyBranch, string> = {
  '子':'鼠','丑':'牛','寅':'虎','卯':'兔','辰':'龙','巳':'蛇',
  '午':'马','未':'羊','申':'猴','酉':'鸡','戌':'狗','亥':'猪',
};

export const ZODIAC_EN: Record<string, string> = {
  '鼠':'Rat','牛':'Ox','虎':'Tiger','卯':'Rabbit','龙':'Dragon','蛇':'Snake',
  '马':'Horse','羊':'Goat','猴':'Monkey','鸡':'Rooster','狗':'Dog','猪':'Pig',
  '兔':'Rabbit',
};

// Element cycles
const PRODUCES: Record<Element, Element> = {
  wood: 'fire', fire: 'earth', earth: 'metal', metal: 'water', water: 'wood',
};
const CONTROLS: Record<Element, Element> = {
  wood: 'earth', earth: 'water', water: 'fire', fire: 'metal', metal: 'wood',
};
const PRODUCED_BY: Record<Element, Element> = {
  fire: 'wood', earth: 'fire', metal: 'earth', water: 'metal', wood: 'water',
};
const CONTROLLED_BY: Record<Element, Element> = {
  earth: 'wood', water: 'earth', fire: 'water', metal: 'fire', wood: 'metal',
};

// ─── Solar Term Dates (approximate, for years 1940-2030) ────────────

// Each solar term pair defines a month boundary
// Format: [month, day] approximate dates
interface SolarTermDate {
  month: number;
  day: number;
}

// Solar term boundaries for each month (节气, not 中气)
// These are approximate and good within ±1 day
const SOLAR_TERM_BOUNDARIES: SolarTermDate[] = [
  { month: 2, day: 4 },   // 立春 - Start of Spring (寅月 begins)
  { month: 3, day: 6 },   // 惊蛰 - Awakening of Insects (卯月)
  { month: 4, day: 5 },   // 清明 - Clear and Bright (辰月)
  { month: 5, day: 6 },   // 立夏 - Start of Summer (巳月)
  { month: 6, day: 6 },   // 芒种 - Grain in Ear (午月)
  { month: 7, day: 7 },   // 小暑 - Minor Heat (未月)
  { month: 8, day: 7 },   // 立秋 - Start of Autumn (申月)
  { month: 9, day: 8 },   // 白露 - White Dew (酉月)
  { month: 10, day: 8 },  // 寒露 - Cold Dew (戌月)
  { month: 11, day: 7 },  // 立冬 - Start of Winter (亥月)
  { month: 12, day: 7 },  // 大雪 - Major Snow (子月)
  { month: 1, day: 6 },   // 小寒 - Minor Cold (丑月)
];

// The month branches in order starting from 寅 (after 立春)
const MONTH_BRANCHES: EarthlyBranch[] = ['寅','卯','辰','巳','午','未','申','酉','戌','亥','子','丑'];

// 五虎遁月 - Month stem derivation from year stem
const MONTH_STEM_START: Record<string, number> = {
  '甲': 2, '己': 2,  // 丙寅 start: stem index 2 (丙)
  '乙': 4, '庚': 4,  // 戊寅 start: stem index 4 (戊)
  '丙': 6, '辛': 6,  // 庚寅 start: stem index 6 (庚)
  '丁': 8, '壬': 8,  // 壬寅 start: stem index 8 (壬)
  '戊': 0, '癸': 0,  // 甲寅 start: stem index 0 (甲)
};

// 五鼠遁时 - Hour stem derivation from day stem
const HOUR_STEM_START: Record<string, number> = {
  '甲': 0, '己': 0,  // 甲子 start
  '乙': 2, '庚': 2,  // 丙子 start
  '丙': 4, '辛': 4,  // 戊子 start
  '丁': 6, '壬': 6,  // 庚子 start
  '戊': 8, '癸': 8,  // 壬子 start
};

// Shichen (时辰) names and time ranges
export const SHICHEN: { branch: EarthlyBranch; name: string; range: string }[] = [
  { branch: '子', name: '子时', range: '23:00–01:00' },
  { branch: '丑', name: '丑时', range: '01:00–03:00' },
  { branch: '寅', name: '寅时', range: '03:00–05:00' },
  { branch: '卯', name: '卯时', range: '05:00–07:00' },
  { branch: '辰', name: '辰时', range: '07:00–09:00' },
  { branch: '巳', name: '巳时', range: '09:00–11:00' },
  { branch: '午', name: '午时', range: '11:00–13:00' },
  { branch: '未', name: '未时', range: '13:00–15:00' },
  { branch: '申', name: '申时', range: '15:00–17:00' },
  { branch: '酉', name: '酉时', range: '17:00–19:00' },
  { branch: '戌', name: '戌时', range: '19:00–21:00' },
  { branch: '亥', name: '亥时', range: '21:00–23:00' },
];

// ─── Core Calculation Functions ──────────────────────────────────────

function stemIndex(s: HeavenlyStem): number {
  return STEMS.indexOf(s);
}

function branchIndex(b: EarthlyBranch): number {
  return BRANCHES.indexOf(b);
}

function stemAt(i: number): HeavenlyStem {
  return STEMS[((i % 10) + 10) % 10];
}

function branchAt(i: number): EarthlyBranch {
  return BRANCHES[((i % 12) + 12) % 12];
}

export function getCycleIndex(stem: HeavenlyStem, branch: EarthlyBranch): number {
  const s = stemIndex(stem);
  const b = branchIndex(branch);
  // Both stem and branch must have same parity (both yang or both yin)
  // Cycle index: find n where n%10=s and n%12=b, 0<=n<60
  for (let i = 0; i < 60; i++) {
    if (i % 10 === s && i % 12 === b) return i;
  }
  return 0;
}

function stemBranchFromCycle(cycleIndex: number): StemBranch {
  const idx = ((cycleIndex % 60) + 60) % 60;
  return {
    stem: STEMS[idx % 10],
    branch: BRANCHES[idx % 12],
  };
}

// ─── Year Pillar ────────────────────────────────────────────────────

// The Chinese astrological year starts at 立春
// Reference: 1984 = 甲子 year (cycle index 0)
export function getYearPillar(year: number, month: number, day: number): StemBranch {
  // Adjust: if before 立春 (~Feb 4), use previous year
  let adjustedYear = year;
  if (month < 2 || (month === 2 && day < 4)) {
    adjustedYear = year - 1;
  }
  // 1984 = 甲子 (index 0)
  const offset = adjustedYear - 1984;
  const cycleIdx = ((offset % 60) + 60) % 60;
  return stemBranchFromCycle(cycleIdx);
}

// ─── Month Pillar ───────────────────────────────────────────────────

export function getMonthBranchIndex(month: number, day: number): number {
  // Determine which solar term period we're in
  // Returns 0-11 index into MONTH_BRANCHES
  
  // Check from the last boundary backward
  // Solar terms: 立春(Feb4), 惊蛰(Mar6), 清明(Apr5), 立夏(May6), 芒种(Jun6),
  //   小暑(Jul7), 立秋(Aug7), 白露(Sep8), 寒露(Oct8), 立冬(Nov7), 大雪(Dec7), 小寒(Jan6)
  
  const date = month * 100 + day; // simple comparison value
  
  if (date >= 204 && date < 306) return 0;  // 寅月: 立春 to 惊蛰
  if (date >= 306 && date < 405) return 1;  // 卯月
  if (date >= 405 && date < 506) return 2;  // 辰月
  if (date >= 506 && date < 606) return 3;  // 巳月
  if (date >= 606 && date < 707) return 4;  // 午月
  if (date >= 707 && date < 807) return 5;  // 未月
  if (date >= 807 && date < 908) return 6;  // 申月
  if (date >= 908 && date < 1008) return 7; // 酉月
  if (date >= 1008 && date < 1107) return 8;  // 戌月
  if (date >= 1107 && date < 1207) return 9;  // 亥月
  if (date >= 1207) return 10;               // 子月 (Dec 7 - Jan 5)
  if (date < 106) return 10;                 // 子月 continued
  if (date >= 106 && date < 204) return 11;  // 丑月
  
  return 0; // fallback
}

export function getMonthPillar(yearStem: HeavenlyStem, month: number, day: number): StemBranch {
  const monthIdx = getMonthBranchIndex(month, day);
  const branch = MONTH_BRANCHES[monthIdx];
  const startStemIdx = MONTH_STEM_START[yearStem];
  const stemIdx = (startStemIdx + monthIdx) % 10;
  return { stem: STEMS[stemIdx], branch };
}

// ─── Day Pillar ─────────────────────────────────────────────────────

// Reference: January 1, 1900 = 甲子日 (cycle index 0)
// We calculate Julian Day Number and map to 60-cycle

function gregorianToJDN(year: number, month: number, day: number): number {
  // Julian Day Number calculation
  const a = Math.floor((14 - month) / 12);
  const y = year + 4800 - a;
  const m = month + 12 * a - 3;
  return day + Math.floor((153 * m + 2) / 5) + 365 * y + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) - 32045;
}

export function getDayPillar(year: number, month: number, day: number): StemBranch {
  const jdn = gregorianToJDN(year, month, day);
  const refJdn = gregorianToJDN(1900, 1, 1); // 甲子日
  const diff = jdn - refJdn;
  const cycleIdx = ((diff % 60) + 60) % 60;
  return stemBranchFromCycle(cycleIdx);
}

// ─── Hour Pillar ────────────────────────────────────────────────────

export function getHourPillar(dayStem: HeavenlyStem, hourIndex: number): StemBranch {
  // hourIndex 0=子时, 1=丑时, ..., 11=亥时
  const branch = BRANCHES[hourIndex];
  const startStemIdx = HOUR_STEM_START[dayStem];
  const stemIdx = (startStemIdx + hourIndex) % 10;
  return { stem: STEMS[stemIdx], branch };
}

// ─── Build Full Pillars ──────────────────────────────────────────────

function makePillar(sb: StemBranch): Pillar {
  const cycleIdx = getCycleIndex(sb.stem, sb.branch);
  return {
    ...sb,
    hiddenStems: HIDDEN_STEMS[sb.branch],
    nayin: NAYIN_TABLE[Math.floor(cycleIdx / 2)],
  };
}

export function calculateFourPillars(input: BirthInput): FourPillars {
  const { year, month, day, hour } = input;
  
  const yearSB = getYearPillar(year, month, day);
  const monthSB = getMonthPillar(yearSB.stem, month, day);
  const daySB = getDayPillar(year, month, day);
  
  let hourPillar: Pillar | null = null;
  if (hour >= 0) {
    const hourSB = getHourPillar(daySB.stem, hour);
    hourPillar = makePillar(hourSB);
  }
  
  return {
    year: makePillar(yearSB),
    month: makePillar(monthSB),
    day: makePillar(daySB),
    hour: hourPillar,
  };
}

// ─── Element Analysis ────────────────────────────────────────────────

export function countElements(pillars: FourPillars): ElementCount {
  const counts: ElementCount = { wood: 0, fire: 0, earth: 0, metal: 0, water: 0 };
  
  const allStems: HeavenlyStem[] = [];
  
  // Add heavenly stems
  allStems.push(pillars.year.stem, pillars.month.stem, pillars.day.stem);
  if (pillars.hour) allStems.push(pillars.hour.stem);
  
  // Add hidden stems with weights (本气:1.0, 中气:0.5, 余气:0.3)
  const addHidden = (p: Pillar) => {
    p.hiddenStems.forEach((s, i) => {
      const weight = i === 0 ? 1.0 : i === 1 ? 0.5 : 0.3;
      counts[STEM_ELEMENT[s]] += weight;
    });
  };
  
  addHidden(pillars.year);
  addHidden(pillars.month);
  addHidden(pillars.day);
  if (pillars.hour) addHidden(pillars.hour);
  
  // Add heavenly stems at full weight
  allStems.forEach(s => {
    counts[STEM_ELEMENT[s]] += 1;
  });
  
  return counts;
}

// ─── Day Master Strength ─────────────────────────────────────────────

export function isDayMasterStrong(pillars: FourPillars): boolean {
  const dm = pillars.day.stem;
  const dmElement = STEM_ELEMENT[dm];
  const producingElement = PRODUCED_BY[dmElement];
  
  const counts = countElements(pillars);
  
  // Support = same element + producing element
  const support = counts[dmElement] + counts[producingElement] * 0.7;
  // Opposition = controlling + draining + controlled-by elements
  const drainingElement = PRODUCES[dmElement]; // element DM produces
  const controllingElement = CONTROLLED_BY[dmElement]; // element that controls DM
  const opposition = counts[controllingElement] + counts[drainingElement] * 0.5;
  
  // Check season (month branch)
  const monthElement = BRANCH_ELEMENT[pillars.month.branch];
  const inSeason = monthElement === dmElement || monthElement === producingElement;
  
  const strengthScore = support + (inSeason ? 2 : 0) - opposition;
  
  return strengthScore > 4;
}

// ─── Favorable / Unfavorable Elements ────────────────────────────────

export function getFavorableElement(dmElement: Element, isStrong: boolean): Element {
  if (isStrong) {
    // Need to drain or control: favor what DM produces or what controls DM
    return PRODUCES[dmElement]; // element DM produces (drains it)
  } else {
    // Need to support: favor what produces DM or same element
    return PRODUCED_BY[dmElement];
  }
}

export function getUnfavorableElement(dmElement: Element, isStrong: boolean): Element {
  if (isStrong) {
    return PRODUCED_BY[dmElement]; // more support is bad
  } else {
    return CONTROLLED_BY[dmElement]; // being controlled is bad when weak
  }
}

// ─── Ten Gods ────────────────────────────────────────────────────────

export function getTenGod(dayMaster: HeavenlyStem, otherStem: HeavenlyStem): TenGodName {
  const dmEl = STEM_ELEMENT[dayMaster];
  const otherEl = STEM_ELEMENT[otherStem];
  const dmYY = STEM_YINYANG[dayMaster];
  const otherYY = STEM_YINYANG[otherStem];
  const samePolarity = dmYY === otherYY;
  
  if (dmEl === otherEl) {
    return samePolarity ? '比肩' : '劫财';
  }
  if (PRODUCES[dmEl] === otherEl) {
    return samePolarity ? '食神' : '伤官';
  }
  if (CONTROLS[dmEl] === otherEl) {
    return samePolarity ? '偏财' : '正财';
  }
  if (CONTROLLED_BY[dmEl] === otherEl) {
    return samePolarity ? '七杀' : '正官';
  }
  if (PRODUCED_BY[dmEl] === otherEl) {
    return samePolarity ? '偏印' : '正印';
  }
  
  return '比肩'; // fallback
}

export function getAllTenGods(pillars: FourPillars): TenGodEntry[] {
  const dm = pillars.day.stem;
  const entries: TenGodEntry[] = [];
  
  // Year stem
  entries.push({ stem: pillars.year.stem, god: getTenGod(dm, pillars.year.stem), position: 'year-stem' });
  // Month stem
  entries.push({ stem: pillars.month.stem, god: getTenGod(dm, pillars.month.stem), position: 'month-stem' });
  // Day stem is self (日主)
  // Hour stem
  if (pillars.hour) {
    entries.push({ stem: pillars.hour.stem, god: getTenGod(dm, pillars.hour.stem), position: 'hour-stem' });
  }
  
  // Hidden stems
  const addHiddenGods = (p: Pillar, prefix: string) => {
    p.hiddenStems.forEach((s, i) => {
      entries.push({ stem: s, god: getTenGod(dm, s), position: `${prefix}-hidden-${i}` });
    });
  };
  
  addHiddenGods(pillars.year, 'year');
  addHiddenGods(pillars.month, 'month');
  addHiddenGods(pillars.day, 'day');
  if (pillars.hour) addHiddenGods(pillars.hour, 'hour');
  
  return entries;
}

// ─── 大运 (Decade Luck Pillars) ─────────────────────────────────────

export function calculateDayun(
  pillars: FourPillars,
  gender: Gender,
  birthYear: number,
  birthMonth: number,
  birthDay: number
): DayunPeriod[] {
  const yearStem = pillars.year.stem;
  const isYangYear = STEM_YINYANG[yearStem] === 'yang';
  const isMale = gender === 'male';
  
  // Forward if (male+yang) or (female+yin), else reverse
  const forward = (isMale && isYangYear) || (!isMale && !isYangYear);
  
  // Starting age: count days from birth to next/prev solar term boundary, divide by 3
  const monthIdx = getMonthBranchIndex(birthMonth, birthDay);
  let targetTermMonth: number, targetTermDay: number;
  
  if (forward) {
    // Next solar term
    const nextIdx = (monthIdx + 1) % 12;
    const term = SOLAR_TERM_BOUNDARIES[nextIdx];
    targetTermMonth = term.month;
    targetTermDay = term.day;
  } else {
    // Previous solar term (current one)
    const term = SOLAR_TERM_BOUNDARIES[monthIdx];
    targetTermMonth = term.month;
    targetTermDay = term.day;
  }
  
  // Calculate days difference
  const birthDate = new Date(birthYear, birthMonth - 1, birthDay);
  let targetYear = birthYear;
  
  if (forward) {
    const targetDate = new Date(targetYear, targetTermMonth - 1, targetTermDay);
    if (targetDate <= birthDate) {
      targetYear++;
    }
  } else {
    const targetDate = new Date(targetYear, targetTermMonth - 1, targetTermDay);
    if (targetDate > birthDate) {
      targetYear--;
    }
  }
  
  const targetDate = new Date(targetYear, targetTermMonth - 1, targetTermDay);
  const daysDiff = Math.abs(Math.round((targetDate.getTime() - birthDate.getTime()) / (1000 * 60 * 60 * 24)));
  const startAge = Math.max(1, Math.round(daysDiff / 3));
  
  // Generate 8 大运 periods from month pillar
  const monthCycleIdx = getCycleIndex(pillars.month.stem, pillars.month.branch);
  const dm = pillars.day.stem;
  const periods: DayunPeriod[] = [];
  
  for (let i = 1; i <= 8; i++) {
    const offset = forward ? i : -i;
    const cycleIdx = ((monthCycleIdx + offset) % 60 + 60) % 60;
    const sb = stemBranchFromCycle(cycleIdx);
    const age = startAge + (i - 1) * 10;
    
    periods.push({
      stemBranch: sb,
      startAge: age,
      endAge: age + 9,
      tenGod: getTenGod(dm, sb.stem),
    });
  }
  
  return periods;
}

// ─── Current Year ────────────────────────────────────────────────────

export function getCurrentYearStemBranch(): StemBranch {
  const year = new Date().getFullYear();
  const offset = year - 1984;
  const cycleIdx = ((offset % 60) + 60) % 60;
  return stemBranchFromCycle(cycleIdx);
}

// ─── Full Analysis ──────────────────────────────────────────────────

export function analyzeBazi(input: BirthInput): BaziAnalysis {
  const pillars = calculateFourPillars(input);
  const dayMaster = pillars.day.stem;
  const dayMasterElement = STEM_ELEMENT[dayMaster];
  const dayMasterYinYang = STEM_YINYANG[dayMaster];
  const isStrong = isDayMasterStrong(pillars);
  const elementCounts = countElements(pillars);
  const favorableElement = getFavorableElement(dayMasterElement, isStrong);
  const unfavorableElement = getUnfavorableElement(dayMasterElement, isStrong);
  const tenGods = getAllTenGods(pillars);
  const dayun = calculateDayun(pillars, input.gender, input.year, input.month, input.day);
  const zodiacAnimal = ZODIAC_ANIMALS[pillars.year.branch];
  const dayCycleIdx = getCycleIndex(pillars.day.stem, pillars.day.branch);
  const dayNayin = NAYIN_TABLE[Math.floor(dayCycleIdx / 2)];
  const currentYearStemBranch = getCurrentYearStemBranch();
  
  return {
    pillars, dayMaster, dayMasterElement, dayMasterYinYang,
    isStrong, elementCounts, favorableElement, unfavorableElement,
    tenGods, dayun, zodiacAnimal, dayNayin, currentYearStemBranch,
  };
}

// ─── Compatibility ──────────────────────────────────────────────────

const STEM_COMBOS: [HeavenlyStem, HeavenlyStem][] = [
  ['甲','己'], ['乙','庚'], ['丙','辛'], ['丁','壬'], ['戊','癸'],
];

const SIX_HARMONIES: [EarthlyBranch, EarthlyBranch][] = [
  ['子','丑'], ['寅','亥'], ['卯','戌'], ['辰','酉'], ['巳','申'], ['午','未'],
];

const THREE_HARMONIES: EarthlyBranch[][] = [
  ['申','子','辰'], ['亥','卯','未'], ['寅','午','戌'], ['巳','酉','丑'],
];

const SIX_CLASHES: [EarthlyBranch, EarthlyBranch][] = [
  ['子','午'], ['丑','未'], ['寅','申'], ['卯','酉'], ['辰','戌'], ['巳','亥'],
];

const PUNISHMENTS: EarthlyBranch[][] = [
  ['子','卯'], ['丑','戌','未'], ['寅','巳','申'],
];
const SELF_PUNISHMENTS: EarthlyBranch[] = ['辰','午','酉','亥'];

export function checkCompatibility(
  input1: BirthInput,
  input2: BirthInput
): CompatibilityResult {
  const a1 = analyzeBazi(input1);
  const a2 = analyzeBazi(input2);
  
  let score = 60; // base score
  const stemCombinations: string[] = [];
  const sixHarmonies: string[] = [];
  const threeHarmonies: string[] = [];
  const sixClashes: string[] = [];
  const punishments: string[] = [];
  
  // Collect all stems and branches from both charts
  const stems1 = [a1.pillars.year.stem, a1.pillars.month.stem, a1.pillars.day.stem];
  const stems2 = [a2.pillars.year.stem, a2.pillars.month.stem, a2.pillars.day.stem];
  if (a1.pillars.hour) stems1.push(a1.pillars.hour.stem);
  if (a2.pillars.hour) stems2.push(a2.pillars.hour.stem);
  
  const branches1 = [a1.pillars.year.branch, a1.pillars.month.branch, a1.pillars.day.branch];
  const branches2 = [a2.pillars.year.branch, a2.pillars.month.branch, a2.pillars.day.branch];
  if (a1.pillars.hour) branches1.push(a1.pillars.hour.branch);
  if (a2.pillars.hour) branches2.push(a2.pillars.hour.branch);
  
  // Check stem combinations (especially Day Masters)
  for (const [s1, s2] of STEM_COMBOS) {
    // Day master combo (highest significance)
    if ((a1.dayMaster === s1 && a2.dayMaster === s2) || (a1.dayMaster === s2 && a2.dayMaster === s1)) {
      stemCombinations.push(`${s1}${s2}合 (Day Masters)`);
      score += 15;
    }
    // Other stem combos
    for (const st1 of stems1) {
      for (const st2 of stems2) {
        if ((st1 === s1 && st2 === s2) || (st1 === s2 && st2 === s1)) {
          if (st1 !== a1.dayMaster || st2 !== a2.dayMaster) {
            stemCombinations.push(`${s1}${s2}合`);
            score += 5;
          }
        }
      }
    }
  }
  
  // Check six harmonies
  for (const [b1, b2] of SIX_HARMONIES) {
    for (const br1 of branches1) {
      for (const br2 of branches2) {
        if ((br1 === b1 && br2 === b2) || (br1 === b2 && br2 === b1)) {
          sixHarmonies.push(`${b1}${b2}合`);
          score += 5;
        }
      }
    }
  }
  
  // Check three harmonies
  const allBranches = [...branches1, ...branches2];
  for (const trio of THREE_HARMONIES) {
    const hasBranches = trio.filter(b => allBranches.includes(b));
    if (hasBranches.length >= 2) {
      const fromA = trio.filter(b => branches1.includes(b));
      const fromB = trio.filter(b => branches2.includes(b));
      if (fromA.length > 0 && fromB.length > 0) {
        threeHarmonies.push(`${trio.join('')}三合`);
        score += 4;
      }
    }
  }
  
  // Check six clashes
  for (const [b1, b2] of SIX_CLASHES) {
    for (const br1 of branches1) {
      for (const br2 of branches2) {
        if ((br1 === b1 && br2 === b2) || (br1 === b2 && br2 === b1)) {
          sixClashes.push(`${b1}${b2}冲`);
          score -= 8;
        }
      }
    }
  }
  
  // Check punishments
  for (const group of PUNISHMENTS) {
    for (const b1 of branches1) {
      for (const b2 of branches2) {
        if (group.includes(b1) && group.includes(b2) && b1 !== b2) {
          punishments.push(`${b1}${b2}刑`);
          score -= 5;
        }
      }
    }
  }
  
  // Element complementarity
  const missing1 = (Object.keys(a1.elementCounts) as Element[]).filter(e => a1.elementCounts[e] < 0.5);
  const missing2 = (Object.keys(a2.elementCounts) as Element[]).filter(e => a2.elementCounts[e] < 0.5);
  let complementary = 0;
  for (const e of missing1) {
    if (a2.elementCounts[e] >= 2) complementary++;
  }
  for (const e of missing2) {
    if (a1.elementCounts[e] >= 2) complementary++;
  }
  score += complementary * 4;
  
  // Clamp score
  score = Math.max(10, Math.min(100, score));
  
  // Ten god relationship between day masters
  const tenGodRelation = getTenGod(a1.dayMaster, a2.dayMaster);
  
  return {
    score,
    stemCombinations: [...new Set(stemCombinations)],
    sixHarmonies: [...new Set(sixHarmonies)],
    threeHarmonies: [...new Set(threeHarmonies)],
    sixClashes: [...new Set(sixClashes)],
    punishments: [...new Set(punishments)],
    elementComplementarity: complementary > 0 ? `${complementary} elements complemented` : 'No significant complement',
    tenGodRelation: `${a1.dayMaster}→${a2.dayMaster}: ${tenGodRelation}`,
    narrative: '',
  };
}

// ─── Element Color Map ──────────────────────────────────────────────

export const ELEMENT_COLORS: Record<Element, string> = {
  wood: '#4CAF50',
  fire: '#E53935',
  earth: '#FFB300',
  metal: '#B0BEC5',
  water: '#1E88E5',
};

export const ELEMENT_BG_COLORS: Record<Element, string> = {
  wood: 'rgba(76, 175, 80, 0.15)',
  fire: 'rgba(229, 57, 53, 0.15)',
  earth: 'rgba(255, 179, 0, 0.15)',
  metal: 'rgba(176, 190, 197, 0.15)',
  water: 'rgba(30, 136, 229, 0.15)',
};

export const ELEMENT_CHINESE: Record<Element, string> = {
  wood: '木', fire: '火', earth: '土', metal: '金', water: '水',
};

export const ELEMENT_EN: Record<Element, string> = {
  wood: 'Wood', fire: 'Fire', earth: 'Earth', metal: 'Metal', water: 'Water',
};

// ─── Year-by-Year Timeline ──────────────────────────────────────────

import { YearEntry } from './types';

export function getYearStemBranch(year: number): StemBranch {
  const offset = year - 1984;
  const cycleIdx = ((offset % 60) + 60) % 60;
  return stemBranchFromCycle(cycleIdx);
}

export function getStarRating(tenGod: TenGodName): number {
  const ratings: Record<TenGodName, number> = {
    '正财': 5, '偏财': 4, '正官': 5, '食神': 5, '正印': 5,
    '偏印': 4, '比肩': 3, '劫财': 3, '伤官': 4, '七杀': 3,
  };
  return ratings[tenGod] || 3;
}

export function generateYearTimeline(
  dayMaster: HeavenlyStem,
  startYear: number,
  endYear: number
): YearEntry[] {
  const entries: YearEntry[] = [];
  for (let y = startYear; y <= endYear; y++) {
    const sb = getYearStemBranch(y);
    const tg = getTenGod(dayMaster, sb.stem);
    entries.push({
      year: y,
      stemBranch: sb,
      tenGod: tg,
      rating: getStarRating(tg),
    });
  }
  return entries;
}
