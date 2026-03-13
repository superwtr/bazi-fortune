'use client';

import { Language, TimingWindow } from '@/lib/types';

interface Props {
  windows: TimingWindow[];
  lang: Language;
}

const TYPE_CONFIG: Record<string, { icon: string; label: { zh: string; en: string }; color: string }> = {
  marriage:    { icon: '💕', label: { zh: '婚恋', en: 'Marriage' },    color: '#E91E63' },
  career:      { icon: '💼', label: { zh: '事业', en: 'Career' },     color: 'var(--jade)' },
  wealth:      { icon: '💰', label: { zh: '财运', en: 'Wealth' },     color: '#F9A825' },
  health_risk: { icon: '🏥', label: { zh: '健康', en: 'Health' },     color: 'var(--cinnabar)' },
  transition:  { icon: '🔄', label: { zh: '转型', en: 'Transition' }, color: 'var(--accent)' },
};

const CONF_STYLES: Record<string, { zh: string; en: string; opacity: number }> = {
  high:   { zh: '高', en: 'High', opacity: 1 },
  medium: { zh: '中', en: 'Med',  opacity: 0.75 },
  low:    { zh: '低', en: 'Low',  opacity: 0.5 },
};

export default function TimingWindows({ windows, lang }: Props) {
  if (windows.length === 0) return null;

  const L = lang === 'zh';

  // Group by type
  const types = ['career', 'wealth', 'marriage', 'health_risk', 'transition'] as const;

  return (
    <div className="card card-anim">
      <h2 className="text-[17px] font-semibold mb-3 flex items-center gap-2" style={{ color: 'var(--accent)' }}>
        <span>📅</span> {L ? '人生窗口期' : 'Timing Windows'}
      </h2>
      <p className="text-xs mb-4" style={{ color: 'var(--text-muted)' }}>
        {L ? '基于大运十神推演的关键人生时段' : 'Key life windows based on decade luck ten-god progression'}
      </p>

      <div className="space-y-4">
        {types.map(type => {
          const items = windows.filter(w => w.type === type);
          if (items.length === 0) return null;
          const cfg = TYPE_CONFIG[type];

          return (
            <div key={type}>
              <div className="text-xs font-semibold mb-2 flex items-center gap-1.5" style={{ color: cfg.color }}>
                <span>{cfg.icon}</span> {L ? cfg.label.zh : cfg.label.en}
              </div>
              <div className="space-y-2">
                {items.map((w, i) => {
                  const conf = CONF_STYLES[w.confidence];
                  return (
                    <div key={i} className="p-2.5 rounded-lg" style={{
                      background: 'var(--bg-subtle)',
                      opacity: conf.opacity,
                    }}>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold tabular-nums" style={{ color: cfg.color }}>
                          {w.ageRange[0]}–{w.ageRange[1]}{L ? '岁' : ''}
                        </span>
                        <span className="text-[11px] px-1.5 py-0.5 rounded" style={{
                          background: 'var(--bg-card)',
                          color: 'var(--text-muted)',
                        }}>
                          {w.yearRange[0]}–{w.yearRange[1]}
                        </span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded-full" style={{
                          background: `${cfg.color}15`,
                          color: cfg.color,
                        }}>
                          {L ? conf.zh : conf.en}
                        </span>
                      </div>
                      <p className="text-xs leading-[1.7]" style={{ color: 'var(--text-secondary)' }}>
                        {L ? w.description.zh : w.description.en}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
