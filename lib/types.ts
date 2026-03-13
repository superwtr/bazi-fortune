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

// ─── Extended Types for Enhanced BaZi Analysis ──────────────────

export type Season = 'spring' | 'summer' | 'autumn' | 'winter' | 'lateSummer';

// Formation (格局) types
export type FormationType =
  | '正官格' | '七杀格' | '正财格' | '偏财格'
  | '正印格' | '偏印格' | '食神格' | '伤官格'
  | '建禄格' | '月刃格'
  | '食神生财格' | '伤官生财格' | '杀印相生格' | '官印相生格'
  | '伤官佩印格' | '食神制杀格'
  | '身弱官杀混杂' | '比劫夺财' | '伤官见官' | '枭印夺食'
  | '从财格' | '从官格' | '从儿格' | '从势格'
  | '杂气格' | '无格局';

export interface BilingualText {
  zh: string;
  en: string;
}

export interface FormationResult {
  type: FormationType;
  quality: 'noble' | 'positive' | 'neutral' | 'challenging';
  keyGod: TenGodName;
  isSpecialStructure: boolean;
  description: BilingualText;
  careerHint: BilingualText;
  warnings: BilingualText[];
}

// Shensha (神煞) types
export type ShenshaName =
  | '天乙贵人' | '太极贵人' | '文昌' | '华盖'
  | '驿马' | '桃花' | '将星' | '金舆'
  | '魁罡' | '天德贵人' | '月德贵人'
  | '劫煞' | '亡神' | '天罗地网' | '学堂';

export interface ShenshaEntry {
  name: ShenshaName;
  position: string;
  branch: EarthlyBranch;
  category: 'auspicious' | 'inauspicious' | 'special';
  description: BilingualText;
}

// Root Strength
export interface RootInfo {
  branch: EarthlyBranch;
  position: string;
  strength: 'main' | 'secondary' | 'residual';
}

export interface RootStrengthResult {
  hasRoot: boolean;
  rootBranches: RootInfo[];
  overallRootScore: number;
  description: BilingualText;
}

// Nayin Interpretation
export interface NayinInterpretation {
  nayin: string;
  element: Element;
  personality: BilingualText;
  compatibility: BilingualText;
  yijingTrigram: string;
  yijingMapping: BilingualText;
}

// Seasonal Day Master Reading
export interface SeasonalDMReading {
  stem: HeavenlyStem;
  season: Season;
  description: BilingualText;
  favorableAdvice: BilingualText;
}

// Predictive Timing
export interface TimingWindow {
  type: 'marriage' | 'career' | 'wealth' | 'health_risk' | 'transition';
  ageRange: [number, number];
  yearRange: [number, number];
  tenGodTrigger: TenGodName;
  description: BilingualText;
  confidence: 'high' | 'medium' | 'low';
}

// Extended Analysis
export interface ExtendedBaziAnalysis extends BaziAnalysis {
  formation: FormationResult;
  shensha: ShenshaEntry[];
  rootStrength: RootStrengthResult;
  nayinInterpretation: NayinInterpretation;
  seasonalReading: SeasonalDMReading;
  timingWindows: TimingWindow[];
  season: Season;
  strengthScore: number;
}

// Extended Compatibility
export interface ExtendedCompatibilityResult extends CompatibilityResult {
  nayinCompatibility: BilingualText;
  spousePalaceAnalysis: BilingualText;
  peachBlossomInteraction: BilingualText;
  formationSynergy: BilingualText;
}
