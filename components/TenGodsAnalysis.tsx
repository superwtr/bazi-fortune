'use client';

import { TenGodEntry, Language, TenGodName } from '@/lib/types';
import { t, TEN_GOD_EN, TEN_GOD_BRIEF } from '@/lib/i18n';

interface Props { tenGods: TenGodEntry[]; lang: Language; }

export default function TenGodsAnalysis({ tenGods, lang }: Props) {
  const allMap = new Map<TenGodName, number>();
  const prominentMap = new Map<TenGodName, number>();
  tenGods.forEach(tg => {
    const weight = tg.position.includes('hidden-0') || tg.position.includes('-h0') ? 1 :
                   tg.position.includes('hidden-1') || tg.position.includes('-h1') ? 0.5 :
                   tg.position.includes('hidden-2') || tg.position.includes('-h2') ? 0.3 : 1;
    allMap.set(tg.god, (allMap.get(tg.god) || 0) + weight);
    if (!tg.position.includes('hidden') && !tg.position.includes('-h')) {
      prominentMap.set(tg.god, (prominentMap.get(tg.god) || 0) + 1);
    }
  });
  const sorted = [...allMap.entries()].sort((a, b) => b[1] - a[1]);

  return (
    <div className="card card-anim">
      <h2 className="text-lg font-semibold mb-3" style={{ color: 'var(--accent)' }}>{t(lang, 'tenGods')}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {sorted.map(([god, weight]) => {
          const isActive = (prominentMap.get(god) || 0) > 0;
          return (
            <div key={god} className="flex items-center gap-2.5 p-2.5 rounded-lg"
              style={{ background: isActive ? 'var(--bg-subtle)' : 'transparent', border: `1px solid ${isActive ? 'var(--border)' : 'transparent'}` }}>
              <div className="text-center min-w-[40px]">
                <div className="font-chinese text-base font-bold" style={{ color: 'var(--accent)' }}>{god}</div>
                <div className="text-[11px]" style={{ color: 'var(--text-muted)' }}>{Math.round(weight * 10) / 10}</div>
              </div>
              <div className="flex-1 min-w-0">
                {lang === 'en' && <div className="text-[13px] font-medium">{TEN_GOD_EN[god]}</div>}
                <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>{lang === 'zh' ? TEN_GOD_BRIEF[god].zh : TEN_GOD_BRIEF[god].en}</div>
              </div>
              {isActive && (
                <span className="text-[11px] px-2 py-0.5 rounded-full" style={{ background: 'var(--glow)', color: 'var(--accent)' }}>
                  {lang === 'zh' ? '显' : 'active'}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
