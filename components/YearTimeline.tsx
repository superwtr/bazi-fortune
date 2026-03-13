'use client';

import { useMemo } from 'react';
import { Language, BaziAnalysis, BirthInput, TenGodName } from '@/lib/types';
import { generateYearTimeline, STEM_ELEMENT, ELEMENT_CHINESE, ELEMENT_EN, getTenGod } from '@/lib/bazi';
import { t, TEN_GOD_EN, getYearAnalysisText } from '@/lib/i18n';

interface Props {
  analysis: BaziAnalysis;
  input: BirthInput;
  lang: Language;
  startYear: number;
  endYear: number;
  setStartYear: (y: number) => void;
  setEndYear: (y: number) => void;
}

function dotColor(rating: number): string {
  if (rating >= 5) return '#43A047';
  if (rating >= 4) return '#F9A825';
  if (rating >= 3) return '#1E88E5';
  return '#E53935';
}

export default function YearTimeline({ analysis, input, lang, startYear, endYear, setStartYear, setEndYear }: Props) {
  const timeline = useMemo(
    () => generateYearTimeline(analysis.dayMaster, startYear, endYear),
    [analysis.dayMaster, startYear, endYear]
  );

  const dayunLabel = analysis.dayun
    .slice(0, 4)
    .map(d => `${d.stemBranch.stem}${d.stemBranch.branch}(${d.startAge}–${d.endAge})`)
    .join(' → ');

  // Compute which years start a new dayun
  const dayunStartYears = useMemo(() => {
    const map = new Map<number, typeof analysis.dayun[0]>();
    analysis.dayun.forEach(d => {
      const startY = input.year + d.startAge;
      if (startY >= startYear && startY <= endYear) {
        map.set(startY, d);
      }
    });
    return map;
  }, [analysis.dayun, input.year, startYear, endYear]);

  const currentYear = new Date().getFullYear();
  const L = lang === 'zh';

  return (
    <div className="card card-anim">
      {/* Header */}
      <div className="flex justify-between items-start flex-wrap gap-3 mb-1">
        <div>
          <h2 className="text-lg font-semibold" style={{ color: 'var(--accent)' }}>
            {t(lang, 'yearTimeline')}
          </h2>
          <p className="text-[13px] mt-0.5" style={{ color: 'var(--text-muted)' }}>
            {t(lang, 'yearTimelineDesc')}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <select value={startYear} onChange={e => setStartYear(Number(e.target.value))} className="form-select" style={{ width: 'auto' }}>
            {Array.from({ length: 70 }, (_, i) => 1970 + i).map(y => <option key={y} value={y}>{y}</option>)}
          </select>
          <span style={{ color: 'var(--text-muted)' }}>→</span>
          <select value={endYear} onChange={e => setEndYear(Number(e.target.value))} className="form-select" style={{ width: 'auto' }}>
            {Array.from({ length: 70 }, (_, i) => 1970 + i).map(y => <option key={y} value={y}>{y}</option>)}
          </select>
        </div>
      </div>

      {/* Dayun banner */}
      <div className="rounded-lg px-3.5 py-2.5 my-3 text-[13px]" style={{
        background: 'var(--glow)',
        border: '1px solid var(--border)',
      }}>
        <span className="font-chinese font-semibold" style={{ color: 'var(--accent)' }}>
          {L ? '大运：' : 'Decade: '}
        </span>
        <span style={{ color: 'var(--text-secondary)' }}>{dayunLabel}</span>
      </div>

      {/* Year rows */}
      <div>
        {timeline.map((yd, idx) => {
          const dayunEntry = dayunStartYears.get(yd.year);
          const isCurrent = yd.year === currentYear;
          const stemEl = STEM_ELEMENT[yd.stemBranch.stem];

          return (
            <div key={yd.year}>
              {/* Dayun section divider */}
              {dayunEntry && (
                <div className="py-2.5 my-1.5 text-[13px] font-semibold font-chinese"
                  style={{ borderTop: '1px dashed var(--divider)', color: 'var(--accent)' }}>
                  — {t(lang, 'entering')} {dayunEntry.stemBranch.stem}{dayunEntry.stemBranch.branch} {t(lang, 'decade')} · {L ? dayunEntry.tenGod : TEN_GOD_EN[dayunEntry.tenGod]} —
                </div>
              )}

              {/* Row */}
              <div className="timeline-row">
                {/* Dot */}
                <div className="pt-[5px]">
                  <div style={{
                    width: 9, height: 9, borderRadius: '50%',
                    background: dotColor(yd.rating),
                    boxShadow: isCurrent ? `0 0 6px ${dotColor(yd.rating)}50` : 'none',
                  }} />
                </div>

                {/* Year */}
                <div className="tabular-nums" style={{
                  fontWeight: isCurrent ? 700 : 500,
                  color: isCurrent ? 'var(--accent)' : 'var(--text-primary)',
                  fontSize: 15,
                }}>
                  {yd.year}
                </div>

                {/* Stem-Branch */}
                <div className="font-chinese font-semibold" style={{
                  color: `var(--el-${stemEl})`,
                  fontSize: 15,
                }}>
                  {yd.stemBranch.stem}{yd.stemBranch.branch}
                </div>

                {/* Stars */}
                <div className="text-xs pt-0.5" style={{ letterSpacing: 1, color: 'var(--accent-light)' }}>
                  {'★'.repeat(yd.rating)}
                  <span style={{ opacity: 0.2 }}>{'★'.repeat(5 - yd.rating)}</span>
                </div>

                {/* Analysis text */}
                <div className="text-[13.5px] leading-[1.75]" style={{
                  color: 'var(--text-secondary)',
                  fontFamily: L ? "'Noto Sans SC', sans-serif" : undefined,
                }}>
                  {getYearAnalysisText(yd.tenGod, yd.stemBranch, lang)}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary */}
      <div className="mt-5 p-3.5 rounded-lg text-[13px]" style={{
        background: 'var(--glow)',
        border: '1px solid var(--border)',
      }}>
        <span className="font-bold" style={{ color: 'var(--accent)' }}>
          {endYear - startYear + 1}{t(lang, 'yearSummary')}
          {L ? '：' : ': '}
        </span>
        <span style={{ color: 'var(--text-secondary)', lineHeight: 1.75 }}>
          {L
            ? `${startYear}–${endYear}年间，大运与流年交织。善用用神${ELEMENT_CHINESE[analysis.favorableElement]}方位和行业，避开忌神${ELEMENT_CHINESE[analysis.unfavorableElement]}，可趋吉避凶。关注五行平衡和十神变化，把握每个关键转折年。`
            : `Across ${startYear}–${endYear}, decade luck and annual pillars weave together. Lean into ${ELEMENT_EN[analysis.favorableElement]}-related directions, avoid ${ELEMENT_EN[analysis.unfavorableElement]} energy. Watch for five-element shifts at each turning point.`
          }
        </span>
      </div>
    </div>
  );
}
