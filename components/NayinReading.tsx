'use client';

import { Language, NayinInterpretation } from '@/lib/types';

interface Props {
  nayin: NayinInterpretation;
  dayNayin: string;
  lang: Language;
}

const ELEMENT_ICONS: Record<string, string> = {
  wood: '🌿', fire: '🔥', earth: '🏔️', metal: '⚔️', water: '💧',
};

export default function NayinReading({ nayin, dayNayin, lang }: Props) {
  const L = lang === 'zh';

  return (
    <div className="card card-anim">
      <h2 className="text-[17px] font-semibold mb-3 flex items-center gap-2" style={{ color: 'var(--accent)' }}>
        <span>🎵</span> {L ? '纳音解读' : 'Nayin Interpretation'}
      </h2>

      <div className="flex items-center gap-3 mb-3">
        <span className="text-2xl">{ELEMENT_ICONS[nayin.element] || '🎵'}</span>
        <div>
          <span className="font-chinese text-lg font-bold" style={{ color: 'var(--accent)' }}>
            {dayNayin}
          </span>
          {nayin.yijingTrigram && (
            <span className="ml-2 text-lg" style={{ color: 'var(--text-muted)' }}>
              {nayin.yijingTrigram}
            </span>
          )}
        </div>
      </div>

      <div className="space-y-3">
        {/* Personality */}
        <div className="p-3 rounded-lg" style={{ background: 'var(--bg-subtle)' }}>
          <div className="text-xs font-semibold mb-1" style={{ color: 'var(--text-muted)' }}>
            {L ? '性格特质' : 'Personality'}
          </div>
          <p className="text-sm leading-[1.85]" style={{ color: 'var(--text-secondary)' }}>
            {L ? nayin.personality.zh : nayin.personality.en}
          </p>
        </div>

        {/* Yi Jing Mapping */}
        {(nayin.yijingMapping.zh || nayin.yijingMapping.en) && (
          <div className="p-3 rounded-lg" style={{ background: 'var(--glow)', border: '1px solid var(--border)' }}>
            <div className="text-xs font-semibold mb-1" style={{ color: 'var(--accent)' }}>
              {L ? '易经卦象' : 'Yi Jing Mapping'}
            </div>
            <p className="text-sm leading-[1.85]" style={{ color: 'var(--text-secondary)' }}>
              {L ? nayin.yijingMapping.zh : nayin.yijingMapping.en}
            </p>
          </div>
        )}

        {/* Compatibility hint */}
        {(nayin.compatibility.zh || nayin.compatibility.en) && (
          <div className="p-3 rounded-lg" style={{ background: 'var(--bg-subtle)' }}>
            <div className="text-xs font-semibold mb-1" style={{ color: 'var(--text-muted)' }}>
              {L ? '纳音配对' : 'Nayin Compatibility'}
            </div>
            <p className="text-sm leading-[1.85]" style={{ color: 'var(--text-secondary)' }}>
              {L ? nayin.compatibility.zh : nayin.compatibility.en}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
