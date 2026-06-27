import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ระบบวัดระดับความขุ่นของน้ำ',
  description: 'เว็บแอปพลิเคชันสำหรับติดตามระดับความขุ่นของน้ำ',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th">
      <body>{children}</body>
    </html>
  );
}
