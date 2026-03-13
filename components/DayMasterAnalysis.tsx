'use client';

import { Language, HeavenlyStem, Element, YinYang } from '@/lib/types';
import { STEM_ELEMENT, ELEMENT_CHINESE, ELEMENT_EN } from '@/lib/bazi';
import { t } from '@/lib/i18n';

interface Props { dayMaster: HeavenlyStem; element: Element; yinYang: YinYang; isStrong: boolean; lang: Language; }

const ARCHETYPES: Record<HeavenlyStem, { zh: string; en: string; icon: string }> = {
  '甲': { zh: '参天大树', en: 'The Towering Tree', icon: '🌲' },
  '乙': { zh: '花草藤蔓', en: 'The Vine & Wildflower', icon: '🌿' },
  '丙': { zh: '烈日太阳', en: 'The Blazing Sun', icon: '☀️' },
  '丁': { zh: '烛火灯光', en: 'The Candle Flame', icon: '🕯️' },
  '戊': { zh: '巍峨高山', en: 'The Great Mountain', icon: '⛰️' },
  '己': { zh: '肥沃田园', en: 'The Fertile Farmland', icon: '🌾' },
  '庚': { zh: '利剑锋刃', en: "The Sword's Edge", icon: '⚔️' },
  '辛': { zh: '珠宝美玉', en: 'The Polished Jewel', icon: '💎' },
  '壬': { zh: '江海奔流', en: 'The Vast Ocean', icon: '🌊' },
  '癸': { zh: '细雨甘露', en: 'The Morning Dew', icon: '🌧️' },
};

export default function DayMasterAnalysis({ dayMaster, element, yinYang, isStrong, lang }: Props) {
  const desc = t(lang, `${dayMaster}_desc`);
  const elName = lang === 'zh' ? ELEMENT_CHINESE[element] : ELEMENT_EN[element];
  const yyName = yinYang === 'yang' ? (lang === 'zh' ? '阳' : 'Yang') : (lang === 'zh' ? '阴' : 'Yin');
  const arch = ARCHETYPES[dayMaster];

  return (
    <div className="card card-anim">
      <h2 className="text-lg font-semibold mb-4" style={{ color: 'var(--accent)' }}>{t(lang, 'dayMasterAnalysis')}</h2>
      <div className="flex flex-col sm:flex-row gap-5">
        <div className="flex flex-col items-center justify-center p-5 rounded-xl min-w-[130px]"
          style={{ background: `var(--el-${element})10`, border: `1px solid var(--el-${element})30` }}>
          <span className="text-4xl mb-2">{arch.icon}</span>
          <span className="font-chinese text-4xl font-bold" style={{ color: `var(--el-${element})` }}>{dayMaster}</span>
          <span className="text-[13px] mt-1" style={{ color: `var(--el-${element})` }}>{yyName} {elName}</span>
          <div className="mt-2 px-3 py-1 rounded-full text-xs font-bold"
            style={{ background: isStrong ? 'var(--jade)20' : 'var(--cinnabar)20', color: isStrong ? 'var(--jade)' : 'var(--cinnabar)', border: `1px solid ${isStrong ? 'var(--jade)' : 'var(--cinnabar)'}30` }}>
            {isStrong ? t(lang, 'strong') : t(lang, 'weak')}
          </div>
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-1.5">{lang === 'zh' ? arch.zh : arch.en}</h3>
          <p className="text-sm leading-[1.8]" style={{ color: 'var(--text-secondary)' }}>{desc}</p>
        </div>
      </div>
    </div>
  );
}
