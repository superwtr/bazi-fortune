'use client';

import { DayunPeriod, Language } from '@/lib/types';
import { STEM_ELEMENT } from '@/lib/bazi';
import { t, TEN_GOD_EN, DAYUN_INTERP } from '@/lib/i18n';

interface Props { dayun: DayunPeriod[]; lang: Language; }

export default function DayunTimeline({ dayun, lang }: Props) {
  return (
    <div className="card card-anim">
      <h2 className="text-lg font-semibold mb-3" style={{ color: 'var(--accent)' }}>{t(lang, 'decadeLuck')}</h2>
      <div className="overflow-x-auto pb-2">
        <div className="flex gap-2.5" style={{ minWidth: 'max-content' }}>
          {dayun.map((period, i) => {
            const stemEl = STEM_ELEMENT[period.stemBranch.stem];
            return (
              <div key={i} className="dayun-item flex flex-col items-center gap-1.5" style={{ minWidth: 110 }}>
                <div className="text-xs" style={{ color: 'var(--text-muted)' }}>
                  {period.startAge}–{period.endAge} {t(lang, 'age')}
                </div>
                <div className="font-chinese text-xl font-bold" style={{ color: `var(--el-${stemEl})` }}>
                  {period.stemBranch.stem}{period.stemBranch.branch}
                </div>
                <div className="text-[11px] px-2 py-0.5 rounded-full font-medium"
                  style={{ background: 'var(--glow)', color: 'var(--accent)' }}>
                  {lang === 'zh' ? period.tenGod : TEN_GOD_EN[period.tenGod]}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
