import Logo from './Logo';

const REPO_URL = 'https://github.com/gentpan/LitePic';
const ZIP_URL = 'https://github.com/gentpan/LitePic/archive/refs/heads/main.zip';

interface SiteHeaderProps {
  /**
   * Which top-level section is "active" — controls which nav link
   * gets the bold/dark active state instead of the muted default.
   * - 'home'      → 特性 anchor highlighted (page-internal scroll)
   * - 'docs'      → /docs link bold
   * - 'api'       → /api link bold
   * - 'changelog' → /changelog link bold
   */
  current?: 'home' | 'docs' | 'api' | 'changelog';
}

/**
 * Shared site header for landing / docs / changelog. Sticky white
 * bar with subtle backdrop-blur, h-16 = 64px tall (factored into
 * `.docs-card { scroll-margin-top }` so anchor links land below it).
 *
 * The "特性" link uses /#features so it works from any page — on
 * `/` the browser does an in-page hash scroll, on /docs or
 * /changelog it navigates home first and then scrolls.
 */
export default function SiteHeader({ current = 'home' }: SiteHeaderProps) {
  // Tailwind classes for nav links — active gets dark+medium weight,
  // inactive stays muted. Centralised so the three call sites stay in
  // sync.
  const link = (active: boolean) =>
    active
      ? 'hidden sm:inline px-3 py-2 text-slate-900 font-medium'
      : 'hidden sm:inline px-3 py-2 text-slate-600 hover:text-slate-900';

  return (
    <header className="border-b border-slate-200 bg-white sticky top-0 z-20 backdrop-blur supports-[backdrop-filter]:bg-white/90">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2.5">
          <Logo className="w-7 h-7" />
          <span className="font-brand font-semibold text-slate-900">LitePic</span>
        </a>
        <nav className="flex items-center gap-1 sm:gap-2 text-[13.5px]">
          <a href="/#features" className={link(false)}>特性</a>
          <a href="/docs"      className={link(current === 'docs')}>文档</a>
          <a href="/api"       className={link(current === 'api')}>API</a>
          <a href="/changelog" className={link(current === 'changelog')}>更新</a>
          <a
            href={REPO_URL}
            target="_blank"
            rel="noopener"
            className="px-3 py-2 text-slate-600 hover:text-slate-900 flex items-center gap-1.5"
          >
            <i className="fa-brands fa-github" />
            <span className="hidden sm:inline">GitHub</span>
          </a>
          <a
            href={ZIP_URL}
            className="ml-1 px-4 py-2 bg-brand text-white hover:bg-brand-hover transition-colors font-medium"
          >
            下载
          </a>
        </nav>
      </div>
    </header>
  );
}
