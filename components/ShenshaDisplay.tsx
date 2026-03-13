'use client';

import { Language, ShenshaEntry } from '@/lib/types';

interface Props {
  shensha: ShenshaEntry[];
  lang: Language;
}

const CATEGORY_CONFIG: Record<string, { icon: string; label: { zh: string; en: string }; color: string }> = {
  auspicious:  { icon: '✦', label: { zh: '吉星', en: 'Auspicious' },   color: 'var(--jade)' },
  inauspicious:{ icon: '⚠', label: { zh: '凶星', en: 'Challenging' },  color: 'var(--cinnabar)' },
  special:     { icon: '◈', label: { zh: '特殊', en: 'Special' },      color: 'var(--accent)' },
};

export default function ShenshaDisplay({ shensha, lang }: Props) {
  if (shensha.length === 0) return null;

  const L = lang === 'zh';
  const grouped = {
    auspicious: shensha.filter(s => s.category === 'auspicious'),
    inauspicious: shensha.filter(s => s.category === 'inauspicious'),
    special: shensha.filter(s => s.category === 'special'),
  };

  return (
    <div className="card card-anim">
      <h2 className="text-[17px] font-semibold mb-3 flex items-center gap-2" style={{ color: 'var(--accent)' }}>
        <span>⭐</span> {L ? '神煞' : 'Stars (Shensha)'}
      </h2>

      <div className="space-y-4">
        {(['auspicious', 'inauspicious', 'special'] as const).map(cat => {
          const items = grouped[cat];
          if (items.length === 0) return null;
          const cfg = CATEGORY_CONFIG[cat];

          return (
            <div key={cat}>
              <div className="text-xs font-semibold mb-2 flex items-center gap-1.5" style={{ color: cfg.color }}>
                <span>{cfg.icon}</span> {L ? cfg.label.zh : cfg.label.en}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {items.map((s, i) => (
                  <div key={i} className="p-2.5 rounded-lg" style={{
                    background: 'var(--bg-subtle)',
                    border: `1px solid ${cfg.color}15`,
                  }}>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-chinese font-semibold text-sm" style={{ color: cfg.color }}>
                        {s.name}
                      </span>
                      <span className="text-[11px] px-1.5 py-0.5 rounded" style={{
                        background: 'var(--bg-card)',
                        color: 'var(--text-muted)',
                      }}>
                        {s.position} · {s.branch}
                      </span>
                    </div>
                    <p className="text-xs leading-[1.7]" style={{ color: 'var(--text-secondary)' }}>
                      {L ? s.description.zh : s.description.en}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
