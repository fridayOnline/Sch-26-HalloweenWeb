import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import localFont from 'next/font/local';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

// ローカルフォント (public/fonts に配置された ttf/woff ファイルを参照)
// 注意: 実際のファイル名に合わせて path を変更してください。
const SamasanDonokun = localFont({
  src: [
    { path: '../public/fonts/SamasanDonokun-01.ttf', weight: '100', style: 'normal' },
  ],
  variable: '--font-samasan-donokun',
});

const TogeMaruGothic = localFont({
  src: [
    { path: '../public/fonts/TogeMaruGothic-200-Thin.ttf', weight: '200', style: 'normal' },
    { path: '../public/fonts/TogeMaruGothic-300-Light.ttf', weight: '300', style: 'normal' },
    { path: '../public/fonts/TogeMaruGothic-400-Regular.ttf', weight: '400', style: 'normal' },
    { path: '../public/fonts/TogeMaruGothic-600-Medium.ttf', weight: '600', style: 'normal' },
    { path: '../public/fonts/TogeMaruGothic-700-Bold.ttf', weight: '700', style: 'normal' },
    { path: '../public/fonts/TogeMaruGothic-800-Heavy.ttf', weight: '800', style: 'normal' },
    { path: '../public/fonts/TogeMaruGothic-900-Black.ttf', weight: '900', style: 'normal' },

  ],
  variable: '--font-toge-maru-gothic',
});

export const metadata: Metadata = {
  title: '怪盗Rからの挑戦状',
  description: '2025年金曜オンラインハロウィン企画',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${TogeMaruGothic.variable} ${SamasanDonokun.variable}`}>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <title>怪盗Rからの挑戦状</title>
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
