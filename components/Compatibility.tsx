'use client';

import { useState } from 'react';
import { Language, BirthInput, Gender } from '@/lib/types';
import { checkCompatibility, analyzeBazi, SHICHEN, STEM_ELEMENT } from '@/lib/bazi';
import { t, TEN_GOD_EN } from '@/lib/i18n';
import FourPillarsDisplay from './FourPillars';

interface Props { lang: Language; }

function PersonForm({ label, lang, input, setInput }: {
  label: string; lang: Language; input: BirthInput; setInput: (v: BirthInput) => void;
}) {
  return (
    <div className="flex-1 min-w-[260px]">
      <h3 className="text-base font-semibold mb-3" style={{ color: 'var(--accent)' }}>{label}</h3>
      <div className="grid grid-cols-3 gap-2 mb-3">
        {[
          { l: lang === 'zh' ? '年' : 'Year', v: input.year, k: 'year', opts: Array.from({ length: 91 }, (_, i) => 1940 + i) },
          { l: lang === 'zh' ? '月' : 'Month', v: input.month, k: 'month', opts: Array.from({ length: 12 }, (_, i) => i + 1) },
          { l: lang === 'zh' ? '日' : 'Day', v: input.day, k: 'day', opts: Array.from({ length: 31 }, (_, i) => i + 1) },
        ].map(f => (
          <div key={f.k}>
            <label className="text-xs block mb-1" style={{ color: 'var(--text-muted)' }}>{f.l}</label>
            <select className="form-select" value={f.v} onChange={e => setInput({ ...input, [f.k]: Number(e.target.value) })}>
              {f.opts.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>
        ))}
      </div>
      <div className="mb-3">
        <label className="text-xs block mb-1" style={{ color: 'var(--text-muted)' }}>{lang === 'zh' ? '时辰' : 'Hour'}</label>
        <select className="form-select" value={input.hour} onChange={e => setInput({ ...input, hour: Number(e.target.value) })}>
          <option value={-1}>{lang === 'zh' ? '不详' : 'Unknown'}</option>
          {SHICHEN.map((s, i) => <option key={i} value={i}>{s.name} {s.range}</option>)}
        </select>
      </div>
      <div className="flex gap-2">
        {(['male', 'female'] as Gender[]).map(g => (
          <div key={g} className={`gender-option flex-1 ${input.gender === g ? 'selected' : ''}`}
            onClick={() => setInput({ ...input, gender: g })}>
            <span>{g === 'male' ? '♂' : '♀'}</span>
            <span className="text-sm">{lang === 'zh' ? (g === 'male' ? '男' : '女') : (g === 'male' ? 'Male' : 'Female')}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Compatibility({ lang }: Props) {
  const [input1, setInput1] = useState<BirthInput>({ year: 1997, month: 6, day: 15, hour: -1, gender: 'male' });
  const [input2, setInput2] = useState<BirthInput>({ year: 1998, month: 3, day: 20, hour: -1, gender: 'female' });
  const [result, setResult] = useState<ReturnType<typeof checkCompatibility> | null>(null);
  const [analyses, setAnalyses] = useState<[ReturnType<typeof analyzeBazi>, ReturnType<typeof analyzeBazi>] | null>(null);

  const handleCheck = () => {
    const r = checkCompatibility(input1, input2);
    const a1 = analyzeBazi(input1);
    const a2 = analyzeBazi(input2);
    const positives: string[] = [];
    const negatives: string[] = [];
    if (r.stemCombinations.length > 0) positives.push(lang === 'zh' ? `天干有合（${r.stemCombinations.join('、')}），主缘分深厚` : `Stem combinations (${r.stemCombinations.join(', ')}) indicate deep affinity`);
    if (r.sixHarmonies.length > 0) positives.push(lang === 'zh' ? `六合（${r.sixHarmonies.join('、')}），相处和谐` : `Six Harmonies (${r.sixHarmonies.join(', ')}) suggest natural harmony`);
    if (r.sixClashes.length > 0) negatives.push(lang === 'zh' ? `六冲（${r.sixClashes.join('、')}），需注意冲突` : `Six Clashes (${r.sixClashes.join(', ')}) — watch for friction`);
    if (r.punishments.length > 0) negatives.push(lang === 'zh' ? `相刑（${r.punishments.join('、')}），有摩擦` : `Punishments (${r.punishments.join(', ')}) — potential friction`);
    r.narrative = [...positives, ...negatives].join(lang === 'zh' ? '。' : '. ') + (lang === 'zh' ? '。' : '.');
    if (r.narrative.length <= 2) r.narrative = lang === 'zh' ? '两人八字无明显合冲，属于中性配对。' : 'No strong harmonies or clashes — a neutral pairing.';
    setResult(r);
    setAnalyses([a1, a2]);
  };

  return (
    <div>
      <div className="card" style={{ opacity: 1 }}>
        <div className="flex flex-col md:flex-row gap-6 mb-6">
          <PersonForm label={t(lang, 'person1')} lang={lang} input={input1} setInput={setInput1} />
          <div className="hidden md:flex items-center"><div className="w-px h-full" style={{ background: 'var(--border)' }} /></div>
          <PersonForm label={t(lang, 'person2')} lang={lang} input={input2} setInput={setInput2} />
        </div>
        <div className="text-center">
          <button className="btn-calculate" onClick={handleCheck}>{t(lang, 'checkCompatibility')}</button>
        </div>
      </div>

      {result && analyses && (
        <>
          <div className="card card-anim flex flex-col items-center">
            <h2 className="text-lg font-semibold mb-4" style={{ color: 'var(--accent)' }}>{t(lang, 'compatibilityScore')}</h2>
            <div className="score-circle mb-4">
              <span className="text-3xl font-bold" style={{ color: result.score >= 70 ? 'var(--jade)' : result.score >= 50 ? 'var(--accent)' : 'var(--cinnabar)' }}>{result.score}</span>
              <span className="text-xs" style={{ color: 'var(--text-muted)' }}>/100</span>
            </div>
            <div className="w-full max-w-lg space-y-0 mt-4">
              {[
                { label: t(lang, 'stemCombos'), items: result.stemCombinations, good: true },
                { label: t(lang, 'sixHarmonies'), items: result.sixHarmonies, good: true },
                { label: t(lang, 'threeHarmonies'), items: result.threeHarmonies, good: true },
                { label: t(lang, 'sixClashes'), items: result.sixClashes, good: false },
                { label: t(lang, 'punishments'), items: result.punishments, good: false },
              ].map((row, i) => (
                <div key={i} className="flex items-center justify-between text-sm py-2.5" style={{ borderBottom: '1px solid var(--divider)' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>{row.label}</span>
                  <span style={{ color: row.items.length > 0 ? (row.good ? 'var(--jade)' : 'var(--cinnabar)') : 'var(--text-muted)' }}>
                    {row.items.length > 0 ? row.items.join(', ') : '—'}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="card card-anim">
            <h2 className="text-[17px] font-semibold mb-2" style={{ color: 'var(--accent)' }}>{t(lang, 'narrative')}</h2>
            <p className="text-sm leading-[1.8]" style={{ color: 'var(--text-secondary)' }}>{result.narrative}</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <div className="text-center mb-2 text-base" style={{ color: 'var(--text-secondary)' }}>{t(lang, 'person1')}</div>
              <FourPillarsDisplay pillars={analyses[0].pillars} lang={lang} />
            </div>
            <div>
              <div className="text-center mb-2 text-base" style={{ color: 'var(--text-secondary)' }}>{t(lang, 'person2')}</div>
              <FourPillarsDisplay pillars={analyses[1].pillars} lang={lang} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
