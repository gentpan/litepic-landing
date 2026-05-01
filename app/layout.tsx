import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'LitePic — 轻量自托管 PHP 图床',
  description:
    'LitePic 是一个面向自托管场景的 PHP 图床系统：上传、缩略图、压缩、WebP / AVIF 转换、图库管理、访问统计、水印、防盗链、API 上传和 R2/S3 远程存储集中在一个轻量应用里。无数据库、单目录部署、MIT 协议开源。',
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
  },
  openGraph: {
    title: 'LitePic — 轻量自托管 PHP 图床',
    description:
      '上传、转换、统计、远程存储一体化。无数据库、PHP 单目录部署、MIT 开源。',
    url: 'https://litepic.io',
    siteName: 'LitePic',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LitePic — 轻量自托管 PHP 图床',
    description: 'PHP 单目录部署的图床系统，无数据库，自带 WebP/AVIF 转换和 R2 同步。',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <head>
        {/* Same static asset CDN the rest of the gentpan ecosystem uses
            (R2 + Cloudflare, 1y immutable, CORS *). Cache hits compound
            across utterlog.io / litepic.io / etc. */}
        <link rel="preconnect" href="https://static.utterlog.com" crossOrigin="anonymous" />
        <link rel="preload" as="font" type="font/woff2" crossOrigin="anonymous"
              href="https://static.utterlog.com/fonts/ubuntu-500.woff2" />
        <link rel="stylesheet" href="https://static.utterlog.com/libs/fontawesome/7.2.0/css/all.min.css" />
        <style dangerouslySetInnerHTML={{ __html: `
          @font-face{font-family:"Ubuntu";src:url("https://static.utterlog.com/fonts/ubuntu-400.woff2") format("woff2");font-weight:400;font-style:normal;font-display:swap}
          @font-face{font-family:"Ubuntu";src:url("https://static.utterlog.com/fonts/ubuntu-500.woff2") format("woff2");font-weight:500;font-style:normal;font-display:swap}
          @font-face{font-family:"Ubuntu";src:url("https://static.utterlog.com/fonts/ubuntu-700.woff2") format("woff2");font-weight:700;font-style:normal;font-display:swap}
        `}} />
      </head>
      <body>{children}</body>
    </html>
  );
}
