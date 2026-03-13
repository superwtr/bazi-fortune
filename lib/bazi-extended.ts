/**
 * Extended BaZi Analysis — wraps analyzeBazi() with additional calculations
 * for formations, shensha, root strength, seasonal readings, and timing
 */

import {
  BirthInput, ExtendedBaziAnalysis, TenGodName, Element, NayinInterpretation,
} from './types';
import {
  analyzeBazi, HIDDEN_STEMS, STEM_ELEMENT, getTenGod,
  countElements,
} from './bazi';
import { analyzeRootStrength } from './calculations/root-strength';
import { getSeasonFromMonthBranch, getSeasonalDMReading } from './calculations/season';
import { analyzeTimingWindows } from './calculations/timing';
import { detectFormation, FormationContext } from './data/formations';
import { computeShensha } from './data/shensha';
import { NAYIN_INTERPRETATIONS } from './data/nayin-interpretations';

/**
 * Compute Day Master strength as a numeric score
 * Enhanced version of the boolean isDayMasterStrong()
 */
function getDayMasterStrengthScore(
  pillars: ExtendedBaziAnalysis['pillars'],
  dmElement: Element,
): number {
  const PRODUCED_BY: Record<Element, Element> = {
    fire: 'wood', earth: 'fire', metal: 'earth', water: 'metal', wood: 'water',
  };
  const PRODUCES: Record<Element, Element> = {
    wood: 'fire', fire: 'earth', earth: 'metal', metal: 'water', water: 'wood',
  };
  const CONTROLLED_BY: Record<Element, Element> = {
    earth: 'wood', water: 'earth', fire: 'water', metal: 'fire', wood: 'metal',
  };
  const BRANCH_ELEMENT: Record<string, Element> = {
    '子': 'water', '丑': 'earth', '寅': 'wood', '卯': 'wood', '辰': 'earth',
    '巳': 'fire', '午': 'fire', '未': 'earth', '申': 'metal', '酉': 'metal',
    '戌': 'earth', '亥': 'water',
  };

  const producingElement = PRODUCED_BY[dmElement];
  const counts = countElements(pillars);

  const support = counts[dmElement] + counts[producingElement] * 0.7;
  const drainingElement = PRODUCES[dmElement];
  const controllingElement = CONTROLLED_BY[dmElement];
  const opposition = counts[controllingElement] + counts[drainingElement] * 0.5;

  const monthElement = BRANCH_ELEMENT[pillars.month.branch];
  const inSeason = monthElement === dmElement || monthElement === producingElement;

  return support + (inSeason ? 2 : 0) - opposition;
}

export function analyzeExtended(input: BirthInput): ExtendedBaziAnalysis {
  const base = analyzeBazi(input);
  const pillars = base.pillars;
  const dm = base.dayMaster;
  const dmElement = base.dayMasterElement;

  // Root strength analysis
  const rootStrength = analyzeRootStrength(pillars);

  // Season
  const season = getSeasonFromMonthBranch(pillars.month.branch);

  // Seasonal DM reading
  const seasonalReading = getSeasonalDMReading(dm, season);

  // Strength score
  const strengthScore = getDayMasterStrengthScore(pillars, dmElement);

  // Build ten god counts for formation context
  const tenGodCounts: Record<TenGodName, number> = {
    '比肩': 0, '劫财': 0, '食神': 0, '伤官': 0,
    '偏财': 0, '正财': 0, '七杀': 0, '正官': 0,
    '偏印': 0, '正印': 0,
  };
  for (const entry of base.tenGods) {
    tenGodCounts[entry.god]++;
  }

  // Build prominent gods (from heavenly stems only, excluding day master)
  const prominentGods = new Map<TenGodName, number>();
  const stemPositions = [
    pillars.year.stem,
    pillars.month.stem,
  ];
  if (pillars.hour) stemPositions.push(pillars.hour.stem);
  for (const stem of stemPositions) {
    const god = getTenGod(dm, stem);
    prominentGods.set(god, (prominentGods.get(god) || 0) + 1);
  }

  // Month branch's primary hidden stem ten god
  const monthMainHidden = HIDDEN_STEMS[pillars.month.branch][0];
  const monthMainHiddenStemGod = getTenGod(dm, monthMainHidden);

  // Formation detection
  const formationCtx: FormationContext = {
    dayMaster: dm,
    monthBranch: pillars.month.branch,
    monthStem: pillars.month.stem,
    isStrong: base.isStrong,
    hasRoot: rootStrength.hasRoot,
    tenGodCounts,
    monthMainHiddenStemGod,
    prominentGods,
    dmElement,
  };
  const formation = detectFormation(formationCtx);

  // Shensha computation
  const shensha = computeShensha(pillars, dm);

  // Nayin interpretation
  const nayinInterpretation: NayinInterpretation = NAYIN_INTERPRETATIONS[base.dayNayin] || {
    nayin: base.dayNayin,
    element: dmElement,
    personality: { zh: '暂无详细解读。', en: 'Detailed interpretation not yet available.' },
    compatibility: { zh: '', en: '' },
    yijingTrigram: '',
    yijingMapping: { zh: '', en: '' },
  };

  // Timing windows
  const timingWindows = analyzeTimingWindows(
    pillars,
    base.dayun,
    input.year,
    input.gender,
    dmElement,
    base.isStrong,
  );

  return {
    ...base,
    formation,
    shensha,
    rootStrength,
    nayinInterpretation,
    seasonalReading,
    timingWindows,
    season,
    strengthScore,
  };
}
