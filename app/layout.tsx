import type { Metadata } from 'next';
import Footer from '../components/Footer';
import Header from '../components/Header';
import './globals.css';

export const metadata: Metadata = {
  title: '个人博客',
  description: '分享技术与生活的个人博客',
  icons: {
    icon: '/favicon.svg',
    apple: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8 max-w-5xl">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}