'use client';

import { Language } from '@/lib/types';

interface Props { lang: Language; setLang: (l: Language) => void; }

export default function LanguageToggle({ lang, setLang }: Props) {
  return (
    <div className="toggle-group">
      <button className={`toggle-btn ${lang === 'en' ? 'active' : ''}`} onClick={() => setLang('en')}>EN</button>
      <button className={`toggle-btn ${lang === 'zh' ? 'active' : ''}`} onClick={() => setLang('zh')}>中文</button>
    </div>
  );
}
