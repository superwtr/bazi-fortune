'use client';

import { FourPillars as FourPillarsType, Language } from '@/lib/types';
import { STEM_ELEMENT, STEM_YINYANG, BRANCH_ELEMENT, ZODIAC_ANIMALS, ZODIAC_EN, getCycleIndex, getTenGod, ELEMENT_CHINESE, ELEMENT_EN } from '@/lib/bazi';
import { NAYIN_TABLE, NAYIN_EN } from '@/lib/nayin';
import { t, TEN_GOD_EN } from '@/lib/i18n';
import type { HeavenlyStem, EarthlyBranch, Element } from '@/lib/types';

function elClass(element: Element): string { return `el-${element}`; }

function PillarCard({ label, stem, branch, hiddenStems, isDayMaster, dayMaster, lang }: {
  label: string; stem: HeavenlyStem; branch: EarthlyBranch; hiddenStems: HeavenlyStem[];
  isDayMaster: boolean; dayMaster: HeavenlyStem; lang: Language;
}) {
  const stemEl = STEM_ELEMENT[stem];
  const branchEl = BRANCH_ELEMENT[branch];
  const tenGod = isDayMaster
    ? (lang === 'zh' ? '日主' : 'Day Master')
    : (lang === 'zh' ? getTenGod(dayMaster, stem) : TEN_GOD_EN[getTenGod(dayMaster, stem)]);

  return (
    <div className={`pillar-card ${isDayMaster ? 'day-master' : ''} flex flex-col items-center gap-1`}>
      <div className="text-[11px] uppercase tracking-wider mb-1" style={{ color: 'var(--text-muted)' }}>{label}</div>
      <div className="text-[11px] font-medium mb-1" style={{ color: isDayMaster ? 'var(--accent)' : 'var(--text-secondary)' }}>
        {tenGod}{isDayMaster && ' ★'}
      </div>
      <div className={`stem-char ${elClass(stemEl)}`}>{stem}</div>
      <div className="text-xs" style={{ color: `var(--el-${stemEl})` }}>
        {lang === 'zh' ? ELEMENT_CHINESE[stemEl] : ELEMENT_EN[stemEl]} {STEM_YINYANG[stem] === 'yang' ? '阳' : '阴'}
      </div>
      <div className="w-6 h-px my-2" style={{ background: 'var(--border)' }} />
      <div className={`branch-char ${elClass(branchEl)}`}>{branch}</div>
      <div className="text-xs" style={{ color: `var(--el-${branchEl})` }}>
        {lang === 'zh' ? ELEMENT_CHINESE[branchEl] : ELEMENT_EN[branchEl]}
      </div>
      <div className="mt-2 pt-2 w-full" style={{ borderTop: '1px solid var(--divider)' }}>
        <div className="text-[10px] mb-1" style={{ color: 'var(--text-muted)' }}>{lang === 'zh' ? '藏干' : 'Hidden'}</div>
        <div className="flex justify-center gap-1.5">
          {hiddenStems.map((hs, i) => (
            <span key={i} className={`font-chinese text-[13px] ${elClass(STEM_ELEMENT[hs])}`}
              style={{ opacity: i === 0 ? 1 : i === 1 ? 0.65 : 0.4 }}>{hs}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function FourPillarsDisplay({ pillars, lang }: { pillars: FourPillarsType; lang: Language }) {
  const dm = pillars.day.stem;
  const animal = ZODIAC_ANIMALS[pillars.year.branch];
  const animalEn = ZODIAC_EN[animal] || animal;
  const ci = getCycleIndex(pillars.day.stem, pillars.day.branch);
  const nayin = NAYIN_TABLE[Math.floor(ci / 2)];
  const nayinEn = NAYIN_EN[nayin] || nayin;

  return (
    <div className="card card-anim">
      <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
        <h2 className="text-lg font-semibold" style={{ color: 'var(--accent)' }}>{t(lang, 'fourPillars')}</h2>
        <div className="text-[13px]" style={{ color: 'var(--text-secondary)' }}>
          {lang === 'zh' ? '生肖' : 'Zodiac'}: <span className="font-chinese">{animal}</span>{lang === 'en' && ` (${animalEn})`}
          <span className="mx-2" style={{ color: 'var(--text-muted)' }}>·</span>
          {lang === 'zh' ? '纳音' : 'Nayin'}: <span className="font-chinese">{nayin}</span>{lang === 'en' && ` — ${nayinEn}`}
        </div>
      </div>
      <div className={`grid ${pillars.hour ? 'grid-cols-4' : 'grid-cols-3'} gap-2.5`}>
        {pillars.hour && <PillarCard label={t(lang,'hourPillar')} stem={pillars.hour.stem} branch={pillars.hour.branch} hiddenStems={pillars.hour.hiddenStems} isDayMaster={false} dayMaster={dm} lang={lang} />}
        <PillarCard label={t(lang,'dayPillar')} stem={pillars.day.stem} branch={pillars.day.branch} hiddenStems={pillars.day.hiddenStems} isDayMaster={true} dayMaster={dm} lang={lang} />
        <PillarCard label={t(lang,'monthPillar')} stem={pillars.month.stem} branch={pillars.month.branch} hiddenStems={pillars.month.hiddenStems} isDayMaster={false} dayMaster={dm} lang={lang} />
        <PillarCard label={t(lang,'yearPillar')} stem={pillars.year.stem} branch={pillars.year.branch} hiddenStems={pillars.year.hiddenStems} isDayMaster={false} dayMaster={dm} lang={lang} />
      </div>
    </div>
  );
}
