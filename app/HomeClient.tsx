'use client';

import { useState } from 'react';
import Logo from '@/components/Logo';

interface HomeClientProps {
  /** Hero badge label, e.g. "v3.0.0 · 2026-04-29". Sourced from
   *  GitHub releases by the server-side outer page; falls back to
   *  package.json version when the API was unreachable at build. */
  heroBadge: string;
}

const REPO_URL = 'https://github.com/gentpan/LitePic';
const ZIP_URL  = 'https://github.com/gentpan/LitePic/archive/refs/heads/main.zip';
const RELEASES_URL = 'https://github.com/gentpan/LitePic/releases';

function CopyableCommand({ cmd, label }: { cmd: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  async function copy() {
    try {
      await navigator.clipboard.writeText(cmd);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* ignore */
    }
  }
  return (
    <div className="group relative">
      {label && (
        <div className="text-xs text-slate-400 font-mono mb-1.5 tracking-wide">{label}</div>
      )}
      <div className="flex items-stretch bg-slate-900 border border-slate-800">
        <div className="flex-1 px-5 py-4 font-mono text-[13px] sm:text-[14px] text-slate-100 overflow-x-auto whitespace-nowrap">
          <span className="text-emerald-400 select-none mr-2">$</span>
          {cmd}
        </div>
        <button
          onClick={copy}
          className="shrink-0 px-4 text-slate-300 hover:text-white hover:bg-slate-800 border-l border-slate-800 transition text-sm flex items-center gap-2"
          aria-label="复制"
        >
          <i className={`fa-solid ${copied ? 'fa-check text-emerald-400' : 'fa-copy'}`} />
          <span className="hidden sm:inline">{copied ? '已复制' : '复制'}</span>
        </button>
      </div>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  desc,
}: {
  icon: string;
  title: string;
  desc: string;
}) {
  return (
    <div className="border border-slate-200 bg-white p-6 hover:border-brand transition-colors group">
      <div className="w-11 h-11 bg-brand-soft text-brand flex items-center justify-center mb-4 group-hover:bg-brand group-hover:text-white transition-colors">
        <i className={`${icon} text-lg`} />
      </div>
      <h3 className="text-base font-semibold text-slate-900 mb-1.5">{title}</h3>
      <p className="text-sm leading-relaxed text-slate-600">{desc}</p>
    </div>
  );
}

// Note: SiteHeader/SiteFooter live in /components and are server
// components, but they import fine into this 'use client' file —
// Next.js downgrades them to be client-rendered alongside this tree
// without losing static export. Single source of nav/footer chrome
// across home / docs / changelog so any nav tweak only happens once.
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';

export default function LandingPage({ heroBadge }: HomeClientProps) {
  return (
    <main className="min-h-screen bg-slate-50">
      <SiteHeader current="home" />

      {/* ===== Hero ===== */}
      <section id="top" className="px-5 sm:px-8 pt-20 pb-24 sm:pt-28 sm:pb-32">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 text-xs font-mono bg-brand-soft text-brand px-3 py-1.5 mb-8 border border-brand/20">
            <span className="w-1.5 h-1.5 bg-brand rounded-full animate-pulse" />
            {heroBadge}
          </div>

          <h1 className="text-[40px] sm:text-[56px] font-bold tracking-tight text-slate-900 leading-[1.1] mb-6">
            轻量级<br />
            <span className="text-brand">自托管 PHP 图床</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed mb-10">
            上传 · 缩略图 · 压缩 · WebP/AVIF · 水印 · 防盗链 · 统计 · R2/S3。
            <br className="hidden sm:inline" />
            一个文件夹丢进 PHP 服务器即可运行，无需数据库。
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
            <a href={ZIP_URL} className="inline-flex items-center gap-2 px-6 py-3 bg-brand text-white hover:bg-brand-hover transition-colors font-medium">
              <i className="fa-solid fa-download" />
              下载最新版
            </a>
            <a href="/docs" className="inline-flex items-center gap-2 px-6 py-3 border border-slate-300 text-slate-700 hover:border-brand hover:text-brand transition-colors font-medium">
              <i className="fa-solid fa-book-open" />
              查看文档
            </a>
            <a href={REPO_URL} target="_blank" rel="noopener" className="inline-flex items-center gap-2 px-6 py-3 border border-slate-300 text-slate-700 hover:border-brand hover:text-brand transition-colors font-medium">
              <i className="fa-brands fa-github" />
              GitHub
            </a>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[13px] text-slate-500">
            <span className="flex items-center gap-1.5"><i className="fa-solid fa-check text-emerald-500" /> PHP 8.0+ 即可</span>
            <span className="flex items-center gap-1.5"><i className="fa-solid fa-check text-emerald-500" /> 无需数据库</span>
            <span className="flex items-center gap-1.5"><i className="fa-solid fa-check text-emerald-500" /> MIT 开源</span>
          </div>
        </div>
      </section>

      {/* ===== Features ===== */}
      <section id="features" className="px-5 sm:px-8 py-24 bg-white border-y border-slate-200">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-2xl mb-14">
            <div className="text-xs font-mono text-brand uppercase tracking-wider mb-3">为什么选择 LitePic</div>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">
              一个图床该有的，<br />都在这里了
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 -mb-px -mr-px">
            <FeatureCard
              icon="fa-solid fa-cloud-arrow-up"
              title="多种上传方式"
              desc="点击、拖拽、粘贴上传。多文件队列 + 统一进度条，全屏沉浸式上传页。"
            />
            <FeatureCard
              icon="fa-solid fa-wand-magic-sparkles"
              title="自动转 WebP/AVIF"
              desc="上传后自动按偏好格式转换。WebP 走 GD，AVIF 走 PHP 8.1+ 的 imageavif()。"
            />
            <FeatureCard
              icon="fa-solid fa-compress"
              title="三档压缩后端"
              desc="TinyPNG / GD / ImageMagick 三选一。不可压缩格式自动跳过，不阻塞上传。"
            />
            <FeatureCard
              icon="fa-solid fa-droplet"
              title="文字 + 图片水印"
              desc="文字水印自带磨砂底层；图片水印支持透明 PNG。Ubuntu 字体优先回退系统字体。"
            />
            <FeatureCard
              icon="fa-solid fa-shield-halved"
              title="防盗链 + Passkey"
              desc="Apache 自动写 .htaccess；Nginx/Caddy 提供配置片段。后台支持 WebAuthn 登录。"
            />
            <FeatureCard
              icon="fa-solid fa-cloud"
              title="R2/S3 远程存储"
              desc="远程备份模式保留本站链接；云端存储模式让链接直接走 R2/S3 公网域名。"
            />
            <FeatureCard
              icon="fa-solid fa-chart-line"
              title="访问统计"
              desc="扫描 access.log 统计图片请求。环形卡片 + 图表 + 表格的概览页设计。"
            />
            <FeatureCard
              icon="fa-solid fa-database"
              title="无需数据库"
              desc="SQLite + 文件系统。一个目录、一份配置、一个 PHP 进程，迁移就是打包目录。"
            />
          </div>
        </div>
      </section>

      {/* ===== Install ===== */}
      <section id="install" className="px-5 sm:px-8 py-24">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="text-xs font-mono text-brand uppercase tracking-wider mb-3">三步部署</div>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">下载、解压、访问</h2>
            <p className="text-slate-600">PHP 8.0+ 是唯一前置依赖。Apache/Nginx/Caddy/OpenResty/LiteSpeed 都支持。</p>
          </div>

          <div className="space-y-8">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="w-7 h-7 bg-brand text-white font-semibold text-sm flex items-center justify-center">1</span>
                <h3 className="font-semibold text-slate-900">下载并解压</h3>
              </div>
              <CopyableCommand cmd="curl -L https://github.com/gentpan/LitePic/archive/refs/heads/main.zip -o litepic.zip && unzip litepic.zip" />
              <p className="text-[13px] text-slate-500 mt-2.5 ml-10">
                也可以从 GitHub Releases 下载稳定版 tag，或直接 <code className="font-mono text-[12px]">git clone</code>。
              </p>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="w-7 h-7 bg-brand text-white font-semibold text-sm flex items-center justify-center">2</span>
                <h3 className="font-semibold text-slate-900">指向你的 PHP 服务器根目录</h3>
              </div>
              <div className="bg-slate-900 border border-slate-800 px-5 py-4 font-mono text-[13px] text-slate-100 overflow-x-auto">
                <div className="text-slate-500 mb-1"># 示例：Nginx 站点 root 指到 LitePic 目录</div>
                <div><span className="text-slate-500">root</span> <span className="text-emerald-400">/var/www/litepic</span>;</div>
                <div><span className="text-slate-500">index</span> <span className="text-emerald-400">index.php</span>;</div>
              </div>
              <p className="text-[13px] text-slate-500 mt-2.5 ml-10">
                Apache 用户可直接放进站点根目录，自带 <code className="font-mono text-[12px]">.htaccess</code> 处理路由。
                Nginx / Caddy 见 <a href="/docs" className="text-brand hover:underline">使用文档</a>。
              </p>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="w-7 h-7 bg-brand text-white font-semibold text-sm flex items-center justify-center">3</span>
                <h3 className="font-semibold text-slate-900">浏览器打开站点完成初始化</h3>
              </div>
              <div className="border border-slate-200 bg-white p-5 text-sm text-slate-600 leading-relaxed">
                首次访问会进入安装向导，自动检测 PHP / GD / ImageMagick / 写入权限并预填配置。
                <br />
                填写管理员凭据后即可进入后台开始上传。
                <br />
                <span className="text-xs text-slate-500">
                  默认管理员密码 <code className="font-mono">12345678</code>，首次登录会强制修改。
                </span>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-slate-200">
            <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-3"># 想用 git 跟随主线？</div>
            <CopyableCommand cmd="git clone https://github.com/gentpan/LitePic.git litepic" label="# git clone · 用于跟随 main 分支获取最新提交" />
          </div>
        </div>
      </section>

      {/* ===== Stack / requirements ===== */}
      <section className="px-5 sm:px-8 py-24 bg-white border-y border-slate-200">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <div className="text-xs font-mono text-brand uppercase tracking-wider mb-3">运行环境</div>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              依赖少，兼容性好
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              一份代码同时跑在 Apache / Nginx / OpenResty / Caddy / LiteSpeed 上。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-slate-200">
            <div className="p-8 border-r-0 md:border-r border-b md:border-b-0 border-slate-200">
              <div className="font-mono text-xs text-brand mb-3"># PHP</div>
              <h3 className="font-semibold text-slate-900 mb-2">PHP 8.0+</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                推荐 PHP 8.1+ 启用 <code className="font-mono text-[12px]">imageavif()</code>。
                依赖扩展：<code className="font-mono text-[12px]">gd</code> · <code className="font-mono text-[12px]">fileinfo</code>。
                可选：<code className="font-mono text-[12px]">imagick</code>。
              </p>
            </div>
            <div className="p-8 border-r-0 md:border-r border-b md:border-b-0 border-slate-200">
              <div className="font-mono text-xs text-brand mb-3"># Web Server</div>
              <h3 className="font-semibold text-slate-900 mb-2">任意主流 Web 服务器</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Apache / LiteSpeed 自带 <code className="font-mono text-[12px]">.htaccess</code>；
                Nginx / OpenResty / Caddy 仓库提供等价配置示例。
              </p>
            </div>
            <div className="p-8">
              <div className="font-mono text-xs text-brand mb-3"># 存储</div>
              <h3 className="font-semibold text-slate-900 mb-2">本地 + 可选 R2/S3</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                默认全部本地 <code className="font-mono text-[12px]">uploads/</code>。
                启用 R2/S3 后支持「远程备份」或「云端存储」两种模式。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Tech badges ===== */}
      <section className="px-5 sm:px-8 py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="text-xs font-mono text-brand uppercase tracking-wider mb-3">技术栈</div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
              小而稳的技术选择
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-0 border border-slate-200 bg-white">
            {[
              { i: 'fa-brands fa-php',       n: 'PHP 8.0+' },
              { i: 'fa-solid fa-image',      n: 'GD / Imagick' },
              { i: 'fa-solid fa-feather',    n: 'WebP / AVIF' },
              { i: 'fa-solid fa-database',   n: 'SQLite' },
              { i: 'fa-solid fa-cloud',      n: 'R2 / S3' },
              { i: 'fa-solid fa-fingerprint',n: 'Passkey' },
            ].map(({ i, n }) => (
              <div key={n} className="p-6 flex flex-col items-center gap-2 border-r border-b border-slate-200 last:border-r-0">
                <i className={`${i} text-2xl text-slate-700`} />
                <div className="text-xs text-slate-600 font-medium">{n}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="px-5 sm:px-8 py-24 bg-slate-900">
        <div className="max-w-3xl mx-auto text-center">
          <Logo className="w-14 h-14 mx-auto mb-6" />
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            现在就有一个属于自己的图床
          </h2>
          <p className="text-slate-400 mb-10 leading-relaxed">
            不用注册第三方账号，不限上传次数，不上传也不被审查。<br />
            数据库都不用装。
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a href={ZIP_URL} className="inline-flex items-center gap-2 px-6 py-3 bg-brand text-white hover:bg-brand-hover transition-colors font-medium">
              <i className="fa-solid fa-download" /> 下载最新版
            </a>
            <a href={RELEASES_URL} target="_blank" rel="noopener" className="inline-flex items-center gap-2 px-6 py-3 border border-slate-700 text-slate-200 hover:border-slate-500 transition-colors font-medium">
              <i className="fa-solid fa-tag" /> 历史版本
            </a>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
