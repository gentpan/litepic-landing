// Shared GitHub releases fetcher for the litepic.io landing site.
//
// Single source of truth for "what version is LitePic at right now"
// + the changelog body. Used by:
//   - app/page.tsx          → hero badge "v3.0.0 · 2026-04-29"
//   - app/changelog/page.tsx → full release notes list
//
// Static export rebuilds on every push so `force-cache` is fine —
// each deploy bakes in the freshest GitHub state. If GitHub is
// unreachable at build time the helpers fall back to package.json's
// version so the hero still renders something.

import pkg from '../package.json';

export interface GhRelease {
  id: number;
  tag_name: string;
  name: string;
  body: string;
  html_url: string;
  published_at: string;
  prerelease: boolean;
}

const REPO = 'gentpan/LitePic';

export async function getReleases(): Promise<GhRelease[]> {
  try {
    const res = await fetch(
      `https://api.github.com/repos/${REPO}/releases?per_page=30`,
      {
        headers: {
          Accept: 'application/vnd.github+json',
          'User-Agent': 'litepic-landing',
        },
        // `output: 'export'` forbids `cache: 'no-store'`. force-cache
        // + every-push redeploy keeps the static HTML in sync with
        // GitHub releases.
        cache: 'force-cache',
      }
    );
    if (!res.ok) {
      console.warn(`[releases] GitHub returned ${res.status}`);
      return [];
    }
    return (await res.json()) as GhRelease[];
  } catch (e) {
    console.warn(`[releases] fetch failed:`, e);
    return [];
  }
}

/**
 * The latest non-prerelease tag, or package.json version as a
 * fallback when the GitHub fetch failed.
 */
export async function getLatestRelease(): Promise<{
  version: string;
  publishedAt: string | null;
  url: string | null;
}> {
  const releases = await getReleases();
  const stable = releases.find((r) => !r.prerelease);
  if (stable) {
    return {
      version: stable.tag_name.replace(/^v/, ''),
      publishedAt: stable.published_at,
      url: stable.html_url,
    };
  }
  return {
    version: pkg.version,
    publishedAt: null,
    url: null,
  };
}

/**
 * Format a release date as `YYYY-MM-DD` for the hero badge — short
 * enough to fit next to the version, locale-stable so SSR matches
 * client.
 */
export function formatReleaseDate(iso: string | null): string {
  if (!iso) return '';
  const d = new Date(iso);
  if (isNaN(d.getTime())) return '';
  const yy = d.getUTCFullYear();
  const mm = String(d.getUTCMonth() + 1).padStart(2, '0');
  const dd = String(d.getUTCDate()).padStart(2, '0');
  return `${yy}-${mm}-${dd}`;
}
