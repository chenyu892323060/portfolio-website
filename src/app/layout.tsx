import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Senior UI Designer Portfolio',
  description:
    'A curated collection of mobile app interfaces, visual systems, operation pages, and product design works.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
