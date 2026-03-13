'use client';

import { Language, FormationResult } from '@/lib/types';

interface Props {
  formation: FormationResult;
  lang: Language;
}

const QUALITY_STYLES: Record<string, { bg: string; color: string; label: { zh: string; en: string } }> = {
  noble:      { bg: 'var(--jade)20',     color: 'var(--jade)',     label: { zh: '贵格', en: 'Noble' } },
  positive:   { bg: 'var(--accent)20',   color: 'var(--accent)',   label: { zh: '吉格', en: 'Positive' } },
  neutral:    { bg: 'var(--text-muted)20', color: 'var(--text-muted)', label: { zh: '中性', en: 'Neutral' } },
  challenging:{ bg: 'var(--cinnabar)20',  color: 'var(--cinnabar)', label: { zh: '挑战', en: 'Challenging' } },
};

export default function FormationDisplay({ formation, lang }: Props) {
  if (formation.type === '无格局') return null;

  const L = lang === 'zh';
  const qs = QUALITY_STYLES[formation.quality] || QUALITY_STYLES.neutral;

  return (
    <div className="card card-anim">
      <h2 className="text-[17px] font-semibold mb-3 flex items-center gap-2" style={{ color: 'var(--accent)' }}>
        <span>🏛️</span> {L ? '格局分析' : 'Chart Formation'}
      </h2>

      <div className="flex items-center gap-3 mb-3">
        <span className="font-chinese text-xl font-bold" style={{ color: 'var(--accent)' }}>
          {formation.type}
        </span>
        <span className="px-2.5 py-0.5 rounded-full text-xs font-bold"
          style={{ background: qs.bg, color: qs.color }}>
          {L ? qs.label.zh : qs.label.en}
        </span>
        {formation.isSpecialStructure && (
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold"
            style={{ background: 'var(--accent)15', color: 'var(--accent)' }}>
            {L ? '特殊格局' : 'Special Structure'}
          </span>
        )}
      </div>

      <p className="text-sm leading-[1.85] mb-3" style={{ color: 'var(--text-secondary)' }}>
        {L ? formation.description.zh : formation.description.en}
      </p>

      {(formation.careerHint.zh || formation.careerHint.en) && (
        <div className="p-3 rounded-lg mb-2" style={{ background: 'var(--bg-subtle)' }}>
          <div className="text-xs font-semibold mb-1" style={{ color: 'var(--text-muted)' }}>
            {L ? '事业方向' : 'Career Direction'}
          </div>
          <p className="text-sm leading-[1.75]" style={{ color: 'var(--text-secondary)' }}>
            {L ? formation.careerHint.zh : formation.careerHint.en}
          </p>
        </div>
      )}

      {formation.warnings.length > 0 && (
        <div className="p-3 rounded-lg" style={{ background: 'var(--cinnabar)08', border: '1px solid var(--cinnabar)20' }}>
          <div className="text-xs font-semibold mb-1" style={{ color: 'var(--cinnabar)' }}>
            {L ? '注意事项' : 'Caution'}
          </div>
          {formation.warnings.map((w, i) => (
            <p key={i} className="text-sm leading-[1.75]" style={{ color: 'var(--text-secondary)' }}>
              {L ? w.zh : w.en}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
