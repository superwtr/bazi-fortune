/**
 * Root Strength Analysis — whether Day Master has roots in branch hidden stems
 * A stem has a "root" when its element appears in the hidden stems of a pillar's branch
 */

import { HeavenlyStem, EarthlyBranch, Element, FourPillars, RootStrengthResult, RootInfo, BilingualText } from '../types';

const STEM_ELEMENT: Record<HeavenlyStem, Element> = {
  '甲': 'wood', '乙': 'wood', '丙': 'fire', '丁': 'fire', '戊': 'earth',
  '己': 'earth', '庚': 'metal', '辛': 'metal', '壬': 'water', '癸': 'water',
};

const HIDDEN_STEMS: Record<EarthlyBranch, HeavenlyStem[]> = {
  '子': ['癸'], '丑': ['己', '癸', '辛'], '寅': ['甲', '丙', '戊'], '卯': ['乙'],
  '辰': ['戊', '乙', '癸'], '巳': ['丙', '庚', '戊'], '午': ['丁', '己'],
  '未': ['己', '丁', '乙'], '申': ['庚', '壬', '戊'], '酉': ['辛'],
  '戌': ['戊', '辛', '丁'], '亥': ['壬', '甲'],
};

const EL_CN: Record<Element, string> = { wood: '木', fire: '火', earth: '土', metal: '金', water: '水' };
const POS_ZH: Record<string, string> = { year: '年支', month: '月支', day: '日支', hour: '时支' };
const POS_EN: Record<string, string> = { year: 'Year Branch', month: 'Month Branch', day: 'Day Branch', hour: 'Hour Branch' };

export function analyzeRootStrength(pillars: FourPillars): RootStrengthResult {
  const dm = pillars.day.stem;
  const dmElement = STEM_ELEMENT[dm];
  const roots: RootInfo[] = [];

  const positions: { branch: EarthlyBranch; pos: string }[] = [
    { branch: pillars.year.branch, pos: 'year' },
    { branch: pillars.month.branch, pos: 'month' },
    { branch: pillars.day.branch, pos: 'day' },
  ];
  if (pillars.hour) {
    positions.push({ branch: pillars.hour.branch, pos: 'hour' });
  }

  for (const { branch, pos } of positions) {
    const hidden = HIDDEN_STEMS[branch];
    hidden.forEach((hs, idx) => {
      if (STEM_ELEMENT[hs] === dmElement) {
        roots.push({
          branch,
          position: pos,
          strength: idx === 0 ? 'main' : idx === 1 ? 'secondary' : 'residual',
        });
      }
    });
  }

  // Score: main root = 3, secondary = 1.5, residual = 0.5
  // Month root is most important (x1.5 multiplier)
  const score = roots.reduce((sum, r) => {
    const baseScore = r.strength === 'main' ? 3 : r.strength === 'secondary' ? 1.5 : 0.5;
    const posMultiplier = r.position === 'month' ? 1.5 : 1;
    return sum + baseScore * posMultiplier;
  }, 0);

  const overallRootScore = Math.min(10, score);
  const hasRoot = roots.length > 0;

  // Generate description
  let description: BilingualText;
  if (!hasRoot) {
    description = {
      zh: `日主${dm}${EL_CN[dmElement]}在地支中无根——如无根之木、无源之水，自身力量薄弱，需要外界大力扶持。`,
      en: `Day Master ${dm} (${dmElement}) has no roots in the branches — like a rootless tree or sourceless stream. Self-power is weak; heavy external support needed.`,
    };
  } else if (overallRootScore >= 5) {
    const mainRoots = roots.filter(r => r.strength === 'main');
    description = {
      zh: `日主${dm}${EL_CN[dmElement]}根基深厚（${roots.map(r => POS_ZH[r.position]).join('、')}有根），${mainRoots.length > 0 ? '本气通根，力量充沛' : '虽非本气但多处得气'}。自身实力扎实。`,
      en: `Day Master ${dm} is deeply rooted (${roots.map(r => POS_EN[r.position]).join(', ')}). ${mainRoots.length > 0 ? 'Primary root established — strong self-power.' : 'Multiple secondary roots provide solid support.'}`,
    };
  } else {
    description = {
      zh: `日主${dm}${EL_CN[dmElement]}有根但根浅（${roots.map(r => POS_ZH[r.position]).join('、')}），力量有限，需要印星或比劫来补充。`,
      en: `Day Master ${dm} has shallow roots (${roots.map(r => POS_EN[r.position]).join(', ')}). Limited self-power; needs Seal or Peer support.`,
    };
  }

  return {
    hasRoot,
    rootBranches: roots,
    overallRootScore,
    description,
  };
}
