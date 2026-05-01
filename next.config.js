/** @type {import('next').NextConfig} */
// Static export — `next build` emits a fully static site to out/.
// Served straight from OpenResty on litepic.io, no Node runtime
// needed in production.
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  trailingSlash: true,
};

module.exports = nextConfig;
