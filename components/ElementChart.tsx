'use client';

import { ElementCount, Language, Element } from '@/lib/types';
import { ELEMENT_CHINESE, ELEMENT_EN } from '@/lib/bazi';
import { t } from '@/lib/i18n';
import { BarChart, Bar, XAxis, YAxis, Cell, ResponsiveContainer } from 'recharts';

interface Props { counts: ElementCount; favorable: Element; unfavorable: Element; lang: Language; }

const COLORS: Record<Element, string> = { wood: 'var(--el-wood)', fire: 'var(--el-fire)', earth: 'var(--el-earth)', metal: 'var(--el-metal)', water: 'var(--el-water)' };
const FILLS: Record<Element, string> = { wood:'#4CAF50', fire:'#E53935', earth:'#D4A843', metal:'#78909C', water:'#1E88E5' };

export default function ElementChart({ counts, favorable, unfavorable, lang }: Props) {
  const elements: Element[] = ['wood','fire','earth','metal','water'];
  const data = elements.map(el => ({
    name: lang === 'zh' ? ELEMENT_CHINESE[el] : ELEMENT_EN[el],
    value: Math.round(counts[el] * 10) / 10,
    element: el,
  }));

  return (
    <div className="card card-anim">
      <h2 className="text-lg font-semibold mb-3" style={{ color: 'var(--accent)' }}>{t(lang, 'fiveElements')}</h2>
      <div className="flex gap-3 mb-4 text-[13px]">
        <span style={{ color: 'var(--jade)' }}>
          {t(lang, 'favorableElement')}: <b style={{ color: COLORS[favorable] }}>{lang === 'zh' ? ELEMENT_CHINESE[favorable] : ELEMENT_EN[favorable]}</b>
        </span>
        <span style={{ color: 'var(--cinnabar)' }}>
          {t(lang, 'unfavorableElement')}: <b style={{ color: COLORS[unfavorable] }}>{lang === 'zh' ? ELEMENT_CHINESE[unfavorable] : ELEMENT_EN[unfavorable]}</b>
        </span>
      </div>
      <div style={{ height: 180 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 8, right: 8, left: -12, bottom: 0 }}>
            <XAxis dataKey="name" tick={{ fill: 'var(--text-secondary)', fontSize: 13 }} axisLine={{ stroke: 'var(--border)' }} tickLine={false} />
            <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 11 }} axisLine={false} tickLine={false} />
            <Bar dataKey="value" radius={[5, 5, 0, 0]} maxBarSize={44}>
              {data.map((d, i) => <Cell key={i} fill={FILLS[d.element]} fillOpacity={0.8} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
