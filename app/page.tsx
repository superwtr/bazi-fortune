'use client';

import { useState, useEffect } from 'react';
import { Language, BirthInput, Gender, ExtendedBaziAnalysis, Theme } from '@/lib/types';
import { SHICHEN } from '@/lib/bazi';
import { analyzeExtended } from '@/lib/bazi-extended';
import { t } from '@/lib/i18n';
import FourPillarsDisplay from '@/components/FourPillars';
import DayMasterAnalysis from '@/components/DayMasterAnalysis';
import ElementChart from '@/components/ElementChart';
import TenGodsAnalysis from '@/components/TenGodsAnalysis';
import DayunTimeline from '@/components/DayunTimeline';
import ReadingSections from '@/components/ReadingSections';
import YearTimeline from '@/components/YearTimeline';
import Compatibility from '@/components/Compatibility';
import Footer from '@/components/Footer';
import LanguageToggle from '@/components/LanguageToggle';

type Tab = 'personal' | 'timeline' | 'compatibility';

export default function Home() {
  const [lang, setLang] = useState<Language>('en');
  const [theme, setTheme] = useState<Theme>('light');
  const [tab, setTab] = useState<Tab>('personal');
  const [input, setInput] = useState<BirthInput>({
    year: 1997, month: 12, day: 13, hour: -1, gender: 'female',
  });
  const [analysis, setAnalysis] = useState<ExtendedBaziAnalysis | null>(null);
  const [timelineStart, setTimelineStart] = useState(2016);
  const [timelineEnd, setTimelineEnd] = useState(2035);

  // Apply theme to html element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const handleCalculate = () => {
    const result = analyzeExtended(input);
    setAnalysis(result);
  };

  const L = lang === 'zh';

  const tabs: { id: Tab; zh: string; en: string }[] = [
    { id: 'personal', zh: '个人命盘', en: 'Personal Reading' },
    { id: 'timeline', zh: '流年轨迹', en: 'Year Timeline' },
    { id: 'compatibility', zh: '合婚配对', en: 'Compatibility' },
  ];

  return (
    <div className="min-h-screen relative z-10">
      {/* Header */}
      <header className="pt-8 pb-4 px-4 max-w-[880px] mx-auto relative">
        {/* Top controls */}
        <div className="absolute top-5 right-4 flex gap-2">
          <button className="theme-btn" onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}>
            {theme === 'dark' ? '☀︎' : '☾'}
          </button>
          <LanguageToggle lang={lang} setLang={setLang} />
        </div>

        <p className="text-[11px] tracking-[0.35em] mb-1.5" style={{ color: 'var(--text-muted)' }}>
          ☰ ☷ ☳ ☴ ☵ ☲ ☶ ☱
        </p>
        <h1 className="text-[32px] font-bold tracking-tight mb-0.5">
          {L ? '八字命理' : 'BaZi Fortune Teller'}
        </h1>
        <p className="text-[15px]" style={{ color: 'var(--text-secondary)' }}>
          {L ? '四柱推命 · 洞察天机' : 'Four Pillars of Destiny'}
        </p>
      </header>

      <main className="max-w-[880px] mx-auto px-4 pb-8">
        {/* Tabs */}
        <div className="flex gap-2 mb-5">
          {tabs.map(tb => (
            <button key={tb.id}
              className={`tab-btn ${tab === tb.id ? 'active' : ''}`}
              onClick={() => setTab(tb.id)}>
              {L ? tb.zh : tb.en}
            </button>
          ))}
        </div>

        {/* ══════════ PERSONAL READING TAB ══════════ */}
        {tab === 'personal' && (
          <>
            {/* Input Form */}
            <div className="card" style={{ opacity: 1 }}>
              <h2 className="text-lg font-semibold mb-4" style={{ color: 'var(--accent)' }}>
                {L ? '出生信息' : 'Birth Information'}
              </h2>

              <div className="grid grid-cols-3 gap-3 mb-4">
                <div>
                  <label className="text-xs block mb-1" style={{ color: 'var(--text-muted)' }}>{t(lang, 'birthYear')}</label>
                  <select className="form-select" value={input.year}
                    onChange={e => setInput({ ...input, year: Number(e.target.value) })}>
                    {Array.from({ length: 91 }, (_, i) => 1940 + i).map(y => <option key={y} value={y}>{y}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs block mb-1" style={{ color: 'var(--text-muted)' }}>{t(lang, 'birthMonth')}</label>
                  <select className="form-select" value={input.month}
                    onChange={e => setInput({ ...input, month: Number(e.target.value) })}>
                    {Array.from({ length: 12 }, (_, i) => i + 1).map(m => <option key={m} value={m}>{m}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs block mb-1" style={{ color: 'var(--text-muted)' }}>{t(lang, 'birthDay')}</label>
                  <select className="form-select" value={input.day}
                    onChange={e => setInput({ ...input, day: Number(e.target.value) })}>
                    {Array.from({ length: 31 }, (_, i) => i + 1).map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
              </div>

              <div className="mb-4">
                <label className="text-xs block mb-1" style={{ color: 'var(--text-muted)' }}>{t(lang, 'birthHour')}</label>
                <select className="form-select" value={input.hour}
                  onChange={e => setInput({ ...input, hour: Number(e.target.value) })}>
                  <option value={-1}>{t(lang, 'unknownHour')} {t(lang, 'unknownHourNote')}</option>
                  {SHICHEN.map((s, i) => <option key={i} value={i}>{s.name} {s.range}</option>)}
                </select>
              </div>

              <div className="mb-5">
                <label className="text-xs block mb-1.5" style={{ color: 'var(--text-muted)' }}>{t(lang, 'gender')}</label>
                <div className="flex gap-2.5">
                  {(['male', 'female'] as Gender[]).map(g => (
                    <div key={g}
                      className={`gender-option flex-1 ${input.gender === g ? 'selected' : ''}`}
                      onClick={() => setInput({ ...input, gender: g })}>
                      <span className="text-lg">{g === 'male' ? '♂' : '♀'}</span>
                      <span className="text-sm">{t(lang, g)}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-center">
                <button className="btn-calculate" onClick={handleCalculate}>
                  {t(lang, 'calculate')}
                </button>
              </div>
            </div>

            {/* Results */}
            {analysis && (
              <div className="mt-4">
                <FourPillarsDisplay pillars={analysis.pillars} lang={lang} />
                <DayMasterAnalysis dayMaster={analysis.dayMaster} element={analysis.dayMasterElement} yinYang={analysis.dayMasterYinYang} isStrong={analysis.isStrong} lang={lang} />
                <ElementChart counts={analysis.elementCounts} favorable={analysis.favorableElement} unfavorable={analysis.unfavorableElement} lang={lang} />
                <TenGodsAnalysis tenGods={analysis.tenGods} lang={lang} />
                <DayunTimeline dayun={analysis.dayun} lang={lang} />
                <ReadingSections analysis={analysis} input={input} lang={lang} />
              </div>
            )}
          </>
        )}

        {/* ══════════ YEAR TIMELINE TAB ══════════ */}
        {tab === 'timeline' && (
          <>
            {!analysis ? (
              <div className="card text-center py-12" style={{ opacity: 1 }}>
                <p style={{ color: 'var(--text-secondary)' }}>{t(lang, 'enterBirthFirst')}</p>
              </div>
            ) : (
              <YearTimeline
                analysis={analysis}
                input={input}
                lang={lang}
                startYear={timelineStart}
                endYear={timelineEnd}
                setStartYear={setTimelineStart}
                setEndYear={setTimelineEnd}
              />
            )}
          </>
        )}

        {/* ══════════ COMPATIBILITY TAB ══════════ */}
        {tab === 'compatibility' && (
          <Compatibility lang={lang} />
        )}
      </main>

      <Footer lang={lang} />
    </div>
  );
}
