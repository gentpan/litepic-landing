'use client';

import { useState } from 'react';

interface CodeBlockProps {
  /** Title shown in the dark title bar above the code (e.g. "php.ini 推荐值"). */
  title: string;
  /** The actual code body. Use a JS template string. */
  code: string;
  /** Optional language hint shown next to the title (e.g. "bash", "nginx"). */
  lang?: string;
}

/**
 * Mirror of the LitePic admin docs `.docs-code-block` component:
 * dark code body with a title bar and a copy button on the right.
 * Click → writes the raw code to clipboard, briefly flips the icon
 * to a green check.
 */
export default function CodeBlock({ title, code, lang }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* ignore */
    }
  }
  return (
    <div className="docs-code-block">
      <div className="docs-code-title">
        <span className="docs-code-title-text">
          {title}
          {lang && <span style={{ opacity: 0.55, marginLeft: 8 }}>· {lang}</span>}
        </span>
        <button
          type="button"
          className={`docs-copy-btn${copied ? ' is-copied' : ''}`}
          onClick={copy}
          aria-label="复制代码"
          title={copied ? '已复制' : '复制'}
        >
          <i className={`fa-solid ${copied ? 'fa-check' : 'fa-copy'}`} />
        </button>
      </div>
      <pre className="docs-code"><code>{code}</code></pre>
    </div>
  );
}
