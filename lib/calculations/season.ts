/**
 * Season utilities — map month branch to season, retrieve seasonal DM reading
 */

import { HeavenlyStem, EarthlyBranch, Season, SeasonalDMReading } from '../types';
import { SEASONAL_DM_DATA } from '../data/seasonal-dm';

export function getSeasonFromMonthBranch(monthBranch: EarthlyBranch): Season {
  switch (monthBranch) {
    case '寅': case '卯': return 'spring';
    case '巳': case '午': return 'summer';
    case '申': case '酉': return 'autumn';
    case '亥': case '子': return 'winter';
    case '辰': case '未': case '戌': case '丑': return 'lateSummer';
  }
}

export function getSeasonalDMReading(stem: HeavenlyStem, season: Season): SeasonalDMReading {
  const data = SEASONAL_DM_DATA[stem]?.[season];
  if (data) {
    return {
      stem,
      season,
      description: data.description,
      favorableAdvice: data.favorableAdvice,
    };
  }
  // Fallback for missing data
  return {
    stem,
    season,
    description: {
      zh: `${stem}在此季节需要根据整体命局具体分析。`,
      en: `${stem} in this season requires analysis based on the overall chart.`,
    },
    favorableAdvice: {
      zh: '综合五行平衡来调整。',
      en: 'Adjust according to overall five-element balance.',
    },
  };
}
