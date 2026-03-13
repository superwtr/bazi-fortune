'use client';

import { Language, BaziAnalysis, ExtendedBaziAnalysis, BirthInput } from '@/lib/types';
import { STEM_ELEMENT, ELEMENT_CHINESE, ELEMENT_EN } from '@/lib/bazi';
import { t, TEN_GOD_EN } from '@/lib/i18n';
import { extractFeatures, generateDayMasterReading, generateChartStructure, generateCareerReading, generateRelationshipReading, generateHealthReading, generateTrajectory, generateSummary } from '@/lib/readings';
import { BarChart, Bar, XAxis, YAxis, Cell, ResponsiveContainer } from 'recharts';
import FormationDisplay from './FormationDisplay';
import ShenshaDisplay from './ShenshaDisplay';
import NayinReading from './NayinReading';
import TimingWindows from './TimingWindows';

interface Props { analysis: BaziAnalysis | ExtendedBaziAnalysis; input: BirthInput; lang: Language; }

const FILLS: Record<string, string> = { wood:'#4CAF50', fire:'#E53935', earth:'#D4A843', metal:'#78909C', water:'#1E88E5' };

function Section({ title, icon, content }: { title: string; icon: string; content: string }) {
  return (
    <div className="card card-anim">
      <h2 className="text-[17px] font-semibold mb-2.5 flex items-center gap-2" style={{ color: 'var(--accent)' }}>
        <span>{icon}</span> {title}
      </h2>
      <p className="text-sm leading-[1.85] whitespace-pre-line" style={{ color: 'var(--text-secondary)' }}>{content}</p>
    </div>
  );
}

export default function ReadingSections({ analysis, input, lang }: Props) {
  const L = lang === 'zh';
  const f = extractFeatures(analysis, input);
  const dm = generateDayMasterReading(f, L);
  const ec = analysis.elementCounts;
  const isExtended = 'formation' in analysis;
  const ext = isExtended ? (analysis as ExtendedBaziAnalysis) : null;

  return (
    <>
      {/* Day Master Deep Reading */}
      <div className="card card-anim">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2" style={{ color: 'var(--accent)' }}>
          <span>{dm.icon}</span> {L ? `日主分析 · ${analysis.dayMaster}${ELEMENT_CHINESE[analysis.dayMasterElement]}` : `Day Master · ${analysis.dayMaster} ${ELEMENT_EN[analysis.dayMasterElement]}`}
        </h2>
        <div className="flex flex-col sm:flex-row gap-5">
          <div className="flex flex-col items-center justify-center p-5 rounded-xl min-w-[120px] glow-card"
            style={{ background: `var(--el-${analysis.dayMasterElement})10`, border: `1px solid var(--el-${analysis.dayMasterElement})30` }}>
            <span className="text-4xl mb-2">{dm.icon}</span>
            <span className="font-chinese text-4xl font-bold" style={{ color: `var(--el-${analysis.dayMasterElement})` }}>{analysis.dayMaster}</span>
            <span className="text-[13px] mt-1" style={{ color: `var(--el-${analysis.dayMasterElement})` }}>
              {analysis.dayMasterYinYang === 'yang' ? (L ? '阳' : 'Yang') : (L ? '阴' : 'Yin')} {L ? ELEMENT_CHINESE[analysis.dayMasterElement] : ELEMENT_EN[analysis.dayMasterElement]}
            </span>
            <div className="mt-2 px-3 py-1 rounded-full text-xs font-bold"
              style={{ background: analysis.isStrong ? 'var(--jade)20' : 'var(--cinnabar)20', color: analysis.isStrong ? 'var(--jade)' : 'var(--cinnabar)' }}>
              {analysis.isStrong ? (L ? '身旺' : 'Strong') : (L ? '身弱' : 'Weak')}
            </div>
          </div>
          <div className="flex-1 min-w-[200px]">
            <h3 className="text-lg font-semibold mb-1.5">{L ? dm.nameZh : dm.nameEn}</h3>
            <p className="text-sm leading-[1.85]" style={{ color: 'var(--text-secondary)' }}>{dm.text}</p>
            <div className="mt-3 p-3 rounded-lg text-[13px]" style={{ background: 'var(--bg-subtle)', color: 'var(--text-secondary)' }}>
              {dm.strengthText}
            </div>
          </div>
        </div>
      </div>

      {/* Shimmer */}
      <div className="shimmer-line" />

      {/* Chart Structure with chart */}
      <div className="card card-anim">
        <h2 className="text-lg font-semibold mb-3 flex items-center gap-2" style={{ color: 'var(--accent)' }}>
          <span>⚖️</span> {L ? '命局格局' : 'Chart Structure'}
        </h2>
        <p className="text-sm leading-[1.85] mb-4" style={{ color: 'var(--text-secondary)' }}>
          {generateChartStructure(analysis, f, L)}
        </p>
        <div style={{ height: 170 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={(['wood','fire','earth','metal','water'] as const).map(e => ({ name: L ? ELEMENT_CHINESE[e] : ELEMENT_EN[e], value: Math.round(ec[e] * 10) / 10, fill: FILLS[e] }))} margin={{ top: 8, right: 8, left: -12, bottom: 0 }}>
              <XAxis dataKey="name" tick={{ fill: 'var(--text-secondary)', fontSize: 13 }} axisLine={{ stroke: 'var(--border)' }} tickLine={false} />
              <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Bar dataKey="value" radius={[5, 5, 0, 0]} maxBarSize={44}>
                {(['wood','fire','earth','metal','water'] as const).map((e, i) => <Cell key={i} fill={FILLS[e]} fillOpacity={0.8} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="flex gap-3 mt-3 text-[13px]">
          <span style={{ color: 'var(--jade)' }}>{L ? '用神' : 'Favorable'}: <b style={{ color: `var(--el-${analysis.favorableElement})` }}>{L ? ELEMENT_CHINESE[analysis.favorableElement] : ELEMENT_EN[analysis.favorableElement]}</b></span>
          <span style={{ color: 'var(--cinnabar)' }}>{L ? '忌神' : 'Unfavorable'}: <b style={{ color: `var(--el-${analysis.unfavorableElement})` }}>{L ? ELEMENT_CHINESE[analysis.unfavorableElement] : ELEMENT_EN[analysis.unfavorableElement]}</b></span>
        </div>
      </div>

      <div className="shimmer-line" />

      {/* Formation Display */}
      {ext?.formation && ext.formation.type !== '无格局' && (
        <FormationDisplay formation={ext.formation} lang={lang} />
      )}

      {/* Shensha Display */}
      {ext?.shensha && ext.shensha.length > 0 && (
        <ShenshaDisplay shensha={ext.shensha} lang={lang} />
      )}

      {/* Nayin Reading */}
      {ext?.nayinInterpretation && (
        <NayinReading nayin={ext.nayinInterpretation} dayNayin={analysis.dayNayin} lang={lang} />
      )}

      <div className="shimmer-line" />

      {/* Four Focus Areas */}
      <Section title={L ? '事业财运' : 'Career & Wealth'} icon="💼" content={generateCareerReading(analysis, f, L)} />
      <Section title={L ? '姻缘' : 'Relationships'} icon="💕" content={generateRelationshipReading(analysis, f, L)} />
      <Section title={L ? '健康' : 'Health'} icon="🏥" content={generateHealthReading(analysis, f, L)} />
      <Section title={L ? '大运总论' : 'Life Trajectory'} icon="🌟" content={generateTrajectory(analysis, f, input.year, L)} />

      {/* Timing Windows */}
      {ext?.timingWindows && ext.timingWindows.length > 0 && (
        <TimingWindows windows={ext.timingWindows} lang={lang} />
      )}

      <div className="shimmer-line" />

      {/* Summary */}
      <div className="card card-anim">
        <h2 className="text-lg font-semibold mb-3 flex items-center gap-2" style={{ color: 'var(--accent)' }}>
          <span>🔮</span> {L ? '总结' : 'Summary'}
        </h2>
        <div className="p-4 rounded-lg" style={{ background: 'var(--glow)', border: '1px solid var(--border)' }}>
          <p className="text-sm leading-[1.85]" style={{ color: 'var(--text-secondary)' }}>
            {generateSummary(analysis, f, L)}
          </p>
        </div>
      </div>
    </>
  );
}
