import Logo from './Logo';

const REPO_URL = 'https://github.com/gentpan/LitePic';

/**
 * Shared site footer — dark slate-900 panel with brand mark + nav
 * + copyright bar. Single source for landing / docs / changelog so
 * the three pages always carry identical chrome.
 */
export default function SiteFooter() {
  return (
    {/* No mt-* here — when the page above is dark (e.g. landing's CTA
        bg-slate-900), any margin would render the light page bg behind
        it and look like an unwanted white strip between the two dark
        regions. Each page manages its own bottom spacing instead. */}
    <footer className="bg-slate-900 border-t border-slate-800 px-5 sm:px-8 py-10">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex items-center gap-2.5">
          <Logo className="w-6 h-6" />
          <span className="text-slate-400 text-sm">
            <span className="text-slate-200 font-medium font-brand">LitePic</span>
            <span className="mx-2 text-slate-600">·</span>
            轻量自托管 PHP 图床
          </span>
        </div>
        <nav className="flex flex-wrap gap-x-5 gap-y-2 text-[13px] text-slate-400">
          <a href="/docs" className="hover:text-white">文档</a>
          <a href="/changelog" className="hover:text-white">更新</a>
          <a
            href={REPO_URL}
            target="_blank"
            rel="noopener"
            className="hover:text-white flex items-center gap-1.5"
          >
            <i className="fa-brands fa-github" /> GitHub
          </a>
          <a href={`${REPO_URL}/issues`} target="_blank" rel="noopener" className="hover:text-white">
            Issues
          </a>
          <a href={`${REPO_URL}/blob/main/LICENSE`} target="_blank" rel="noopener" className="hover:text-white">
            MIT
          </a>
        </nav>
      </div>
      <div className="max-w-6xl mx-auto mt-8 pt-6 border-t border-slate-800 text-[11px] text-slate-600 font-mono">
        © {new Date().getFullYear()} LitePic Project. Self-hosted, open source, MIT licensed.
      </div>
    </footer>
  );
}
