/**
 * LitePic mark — minimalist "LP" inside a soft-corner square.
 * Single source for the logo so updates land in nav, footer, and any
 * other surface in one edit. Brand fill #0052D9 matches the design
 * token; if that ever changes here, also update favicon.svg.
 */
export default function Logo({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden>
      <rect x="0" y="0" width="24" height="24" rx="4" fill="#0052D9" />
      <path d="M6.4 6.5h2.3v8.7h4.4v2.1H6.4V6.5z" fill="white" />
      <circle cx="16.6" cy="8.7" r="1.7" fill="white" />
    </svg>
  );
}
