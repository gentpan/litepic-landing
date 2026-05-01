// Server outer for the landing page. Fetches the latest GitHub
// release at build time so the hero badge always reflects the most
// recent tag without manual package.json bumps.
//
// `output: 'export'` builds this once per `git push` (the deploy
// workflow rebuilds on every commit), so the GH fetch is force-cache
// and the resulting HTML is fully static.

import HomeClient from './HomeClient';
import { getLatestRelease, formatReleaseDate } from '@/lib/releases';

export default async function Page() {
  const latest = await getLatestRelease();
  const dateStr = formatReleaseDate(latest.publishedAt);
  const heroBadge = dateStr ? `v${latest.version} · ${dateStr}` : `v${latest.version}`;
  return <HomeClient heroBadge={heroBadge} />;
}
