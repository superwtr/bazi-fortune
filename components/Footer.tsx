'use client';

import { useMemo } from 'react';
import { Language } from '@/lib/types';
import { QUOTES } from '@/lib/i18n';

export default function Footer({ lang }: { lang: Language }) {
  const quote = useMemo(() => QUOTES[Math.floor(Math.random() * QUOTES.length)], []);

  return (
    <footer className="mt-12 pb-8 text-center relative z-10">
      <div className="flex items-center justify-center gap-3 mb-4">
        <div className="h-px w-9" style={{ background: 'linear-gradient(to right, transparent, var(--accent))' }} />
        <span className="text-sm" style={{ color: 'var(--accent)', opacity: 0.4 }}>☯</span>
        <div className="h-px w-9" style={{ background: 'linear-gradient(to left, transparent, var(--accent))' }} />
      </div>
      <p className="text-[13px] italic max-w-md mx-auto mb-3" style={{ color: 'var(--text-muted)' }}>
        &ldquo;{lang === 'zh' ? quote.zh : quote.en}&rdquo;
      </p>
      <div className="text-sm font-medium" style={{ color: 'var(--accent)', letterSpacing: '0.02em' }}>
        Created by Luwei Xiong
      </div>
      <div className="text-[11px] mt-1" style={{ color: 'var(--text-muted)' }}>
        {lang === 'zh' ? '仅供娱乐参考' : 'For entertainment only'}
      </div>
    </footer>
  );
}
