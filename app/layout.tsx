import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'BaZi Fortune Teller | 八字命理',
  description: 'Discover your destiny through the ancient Chinese Four Pillars of Destiny. Free BaZi calculator with detailed life readings.',
  openGraph: {
    title: 'BaZi Fortune Teller | 八字命理',
    description: 'Discover your destiny through the ancient Chinese Four Pillars of Destiny.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
