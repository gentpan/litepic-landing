/**
 * LitePic mark — minimalist "LP" inside a Xiaomi-style superellipse
 * ("squircle"). The outer shape is an n≈4 superellipse approximated
 * with 8 cubic Beziers, giving G2-continuous corners (no abrupt
 * curve change like a normal rounded-rectangle has). Same trick as
 * the 2021 Xiaomi logo redesign — the corners read as "more square,
 * smoothly so" rather than "rounded".
 *
 * Single source for the logo so updates land in nav, footer, and any
 * other surface in one edit. Brand fill #0052D9 matches the design
 * token; if that changes here, also update public/favicon.svg.
 */
export default function Logo({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden>
      <path
        fill="#0052D9"
        d="M12 0c4.5 0 6.75 0 8.25.75 1.75.75 2.25 1.25 3 3C24 5.25 24 7.5 24 12s0 6.75-.75 8.25c-.75 1.75-1.25 2.25-3 3C18.75 24 16.5 24 12 24s-6.75 0-8.25-.75c-1.75-.75-2.25-1.25-3-3C0 18.75 0 16.5 0 12s0-6.75.75-8.25c.75-1.75 1.25-2.25 3-3C5.25 0 7.5 0 12 0z"
      />
      <path d="M6.4 6.5h2.3v8.7h4.4v2.1H6.4V6.5z" fill="white" />
      <circle cx="16.6" cy="8.7" r="1.7" fill="white" />
    </svg>
  );
}
