export type HeavenlyStem = '甲' | '乙' | '丙' | '丁' | '戊' | '己' | '庚' | '辛' | '壬' | '癸';
export type EarthlyBranch = '子' | '丑' | '寅' | '卯' | '辰' | '巳' | '午' | '未' | '申' | '酉' | '戌' | '亥';
export type Element = 'wood' | 'fire' | 'earth' | 'metal' | 'water';
export type YinYang = 'yang' | 'yin';
export type Gender = 'male' | 'female';
export type Language = 'en' | 'zh';
export type Theme = 'light' | 'dark';

export interface StemBranch {
  stem: HeavenlyStem;
  branch: EarthlyBranch;
}

export interface Pillar extends StemBranch {
  hiddenStems: HeavenlyStem[];
  nayin?: string;
}

export interface FourPillars {
  year: Pillar;
  month: Pillar;
  day: Pillar;
  hour: Pillar | null;
}

export interface ElementCount {
  wood: number;
  fire: number;
  earth: number;
  metal: number;
  water: number;
}

export type TenGodName =
  | '比肩' | '劫财'
  | '食神' | '伤官'
  | '偏财' | '正财'
  | '七杀' | '正官'
  | '偏印' | '正印';

export interface TenGodEntry {
  stem: HeavenlyStem;
  god: TenGodName;
  position: string;
}

export interface DayunPeriod {
  stemBranch: StemBranch;
  startAge: number;
  endAge: number;
  tenGod: TenGodName;
}

export interface YearEntry {
  year: number;
  stemBranch: StemBranch;
  tenGod: TenGodName;
  rating: number;
}

export interface BaziAnalysis {
  pillars: FourPillars;
  dayMaster: HeavenlyStem;
  dayMasterElement: Element;
  dayMasterYinYang: YinYang;
  isStrong: boolean;
  elementCounts: ElementCount;
  favorableElement: Element;
  unfavorableElement: Element;
  tenGods: TenGodEntry[];
  dayun: DayunPeriod[];
  zodiacAnimal: string;
  dayNayin: string;
  currentYearStemBranch: StemBranch;
}

export interface CompatibilityResult {
  score: number;
  stemCombinations: string[];
  sixHarmonies: string[];
  threeHarmonies: string[];
  sixClashes: string[];
  punishments: string[];
  elementComplementarity: string;
  tenGodRelation: string;
  narrative: string;
}

export interface BirthInput {
  year: number;
  month: number;
  day: number;
  hour: number;
  gender: Gender;
}
