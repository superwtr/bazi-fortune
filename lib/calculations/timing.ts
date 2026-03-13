/**
 * Predictive Timing Analysis
 * Marriage, career, wealth windows based on dayun ten-god progression
 */

import {
  HeavenlyStem, EarthlyBranch, Element, TenGodName,
  FourPillars, DayunPeriod, TimingWindow, BilingualText,
} from '../types';

const STEM_ELEMENT: Record<HeavenlyStem, Element> = {
  '甲': 'wood', '乙': 'wood', '丙': 'fire', '丁': 'fire', '戊': 'earth',
  '己': 'earth', '庚': 'metal', '辛': 'metal', '壬': 'water', '癸': 'water',
};

const SIX_CLASHES: [EarthlyBranch, EarthlyBranch][] = [
  ['子', '午'], ['丑', '未'], ['寅', '申'], ['卯', '酉'], ['辰', '戌'], ['巳', '亥'],
];

const EL_CN: Record<Element, string> = { wood: '木', fire: '火', earth: '土', metal: '金', water: '水' };
const TG_EN: Record<TenGodName, string> = {
  '比肩': 'Peer', '劫财': 'Rob Wealth', '食神': 'Eating God', '伤官': 'Hurting Officer',
  '偏财': 'Indirect Wealth', '正财': 'Direct Wealth', '七杀': 'Seven Killings',
  '正官': 'Direct Officer', '偏印': 'Indirect Seal', '正印': 'Direct Seal',
};

function clashesWithBranch(branch: EarthlyBranch, targetBranch: EarthlyBranch): boolean {
  return SIX_CLASHES.some(([b1, b2]) =>
    (branch === b1 && targetBranch === b2) || (branch === b2 && targetBranch === b1)
  );
}

export function analyzeTimingWindows(
  pillars: FourPillars,
  dayun: DayunPeriod[],
  birthYear: number,
  gender: 'male' | 'female',
  dmElement: Element,
  isStrong: boolean,
): TimingWindow[] {
  const windows: TimingWindow[] = [];
  const spouseBranch = pillars.day.branch;

  for (const period of dayun) {
    const startYear = birthYear + period.startAge;
    const endYear = birthYear + period.endAge;
    const tg = period.tenGod;
    const dayunBranch = period.stemBranch.branch;

    // Marriage windows
    const isMarriageGod = gender === 'male'
      ? (tg === '正财' || tg === '偏财')
      : (tg === '正官' || tg === '七杀');

    if (isMarriageGod && !clashesWithBranch(dayunBranch, spouseBranch)) {
      windows.push({
        type: 'marriage',
        ageRange: [period.startAge, period.endAge],
        yearRange: [startYear, endYear],
        tenGodTrigger: tg,
        description: {
          zh: `${period.startAge}-${period.endAge}岁（${startYear}-${endYear}年）走${tg}运，${gender === 'male' ? '财星' : '官星'}出现，是婚恋的有利窗口。${tg === '正财' || tg === '正官' ? '偏向正缘和稳定关系。' : '偏向缘分突然出现。'}`,
          en: `Ages ${period.startAge}-${period.endAge} (${startYear}-${endYear}): ${TG_EN[tg]} decade — ${gender === 'male' ? 'wealth star' : 'officer star'} activates. Favorable for relationships. ${tg === '正财' || tg === '正官' ? 'Tends toward stable, lasting bonds.' : 'Romance may arrive unexpectedly.'}`,
        },
        confidence: tg === '正财' || tg === '正官' ? 'high' : 'medium',
      });
    }

    // Career windows
    if (tg === '正官' || tg === '七杀' || tg === '正印') {
      windows.push({
        type: 'career',
        ageRange: [period.startAge, period.endAge],
        yearRange: [startYear, endYear],
        tenGodTrigger: tg,
        description: {
          zh: `${period.startAge}-${period.endAge}岁走${tg}运——${tg === '正官' ? '仕途顺利，有贵人提携，升职加薪的关键期。' : tg === '七杀' ? '竞争激烈但机会大，以魄力和实力说话。' : '有制度性支持，适合深造或获取资质认证。'}`,
          en: `Ages ${period.startAge}-${period.endAge}: ${TG_EN[tg]} decade — ${tg === '正官' ? 'Smooth career path, mentor support, key period for advancement.' : tg === '七杀' ? 'Fierce competition but major opportunities. Courage and capability prevail.' : 'Institutional support. Good for further education or certification.'}`,
        },
        confidence: 'high',
      });
    }

    // Wealth windows
    if (tg === '正财' || tg === '偏财') {
      const canHandle = isStrong || tg === '正财';
      windows.push({
        type: 'wealth',
        ageRange: [period.startAge, period.endAge],
        yearRange: [startYear, endYear],
        tenGodTrigger: tg,
        description: {
          zh: `${period.startAge}-${period.endAge}岁走${tg}运——${tg === '正财' ? '正财稳定，付出与回报成正比。适合储蓄和长期投资。' : '偏财机遇多，有意外收获。但需谨慎投机。'}${canHandle ? '' : '身弱财多需借助贵人和团队来驾驭财富。'}`,
          en: `Ages ${period.startAge}-${period.endAge}: ${TG_EN[tg]} decade — ${tg === '正财' ? 'Stable wealth. Effort equals reward. Good for saving and long-term investments.' : 'Windfall opportunities. Guard against speculative excess.'}${canHandle ? '' : ' Weak DM needs support to handle wealth.'}`,
        },
        confidence: tg === '正财' ? 'high' : 'medium',
      });
    }

    // Health risk windows
    const spousePalaceClash = clashesWithBranch(dayunBranch, spouseBranch);
    if (tg === '七杀' || tg === '伤官' || spousePalaceClash) {
      windows.push({
        type: 'health_risk',
        ageRange: [period.startAge, period.endAge],
        yearRange: [startYear, endYear],
        tenGodTrigger: tg,
        description: {
          zh: `${period.startAge}-${period.endAge}岁${tg === '七杀' ? '七杀运压力大' : tg === '伤官' ? '伤官运情绪波动' : '大运冲日支'}——需注意身心健康。${spousePalaceClash ? '配偶宫被冲，感情和健康都需关注。' : '适当减压，定期体检。'}`,
          en: `Ages ${period.startAge}-${period.endAge}: ${tg === '七杀' ? 'Seven Killings pressure' : tg === '伤官' ? 'Emotional volatility' : 'Decade luck clashes spouse palace'} — monitor physical and mental health. ${spousePalaceClash ? 'Spouse palace clashed; watch relationships and health.' : 'Manage stress and get regular checkups.'}`,
        },
        confidence: spousePalaceClash ? 'high' : 'medium',
      });
    }

    // Transition windows (major life changes)
    if (tg === '劫财' || tg === '比肩') {
      windows.push({
        type: 'transition',
        ageRange: [period.startAge, period.endAge],
        yearRange: [startYear, endYear],
        tenGodTrigger: tg,
        description: {
          zh: `${period.startAge}-${period.endAge}岁走${tg}运——${tg === '劫财' ? '社交变动大，人际圈洗牌。可能有合作或竞争带来的转型。' : '独立意识增强，可能改变事业方向或创业。'}`,
          en: `Ages ${period.startAge}-${period.endAge}: ${TG_EN[tg]} decade — ${tg === '劫财' ? 'Social upheaval, network reshuffling. Partnerships or competition drive transformation.' : 'Independence strengthens. Career direction may shift; entrepreneurship possible.'}`,
        },
        confidence: 'medium',
      });
    }
  }

  return windows;
}
