import type { Metadata } from 'next';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import CodeBlock from '../docs/CodeBlock';

export const metadata: Metadata = {
  title: 'API 文档 — LitePic',
  description:
    'LitePic 的版本化 API 接口、第三方上传 Token、图库读取、后台图片操作和 WordPress 插件对接说明。',
};

const REPO_URL = 'https://github.com/gentpan/LitePic';

const TOC = [
  { id: 'overview',     t: '版本化 API 总览' },
  { id: 'curl',         t: 'cURL 示例' },
  { id: 'coverage',     t: '功能覆盖' },
  { id: 'admin-action', t: '后台图片操作接口' },
  { id: 'wordpress',    t: 'WordPress 插件对接' },
];

function Logo({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path fill="#0052D9" d="M12 0c4.5 0 6.75 0 8.25.75 1.75.75 2.25 1.25 3 3C24 5.25 24 7.5 24 12s0 6.75-.75 8.25c-.75 1.75-1.25 2.25-3 3C18.75 24 16.5 24 12 24s-6.75 0-8.25-.75c-1.75-.75-2.25-1.25-3-3C0 18.75 0 16.5 0 12s0-6.75.75-8.25c.75-1.75 1.25-2.25 3-3C5.25 0 7.5 0 12 0z" />
      <path d="M6.4 6.5h2.3v8.7h4.4v2.1H6.4V6.5z" fill="white" />
      <circle cx="16.6" cy="8.7" r="1.7" fill="white" />
    </svg>
  );
}

export default function ApiPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <SiteHeader current="api" />

      <div className="docs-page-grid">
        <aside className="docs-toc" aria-label="目录">
          <div className="docs-toc-inner">
            <div className="text-xs font-mono text-brand uppercase tracking-wider mb-4">API 文档</div>
            <nav className="text-sm space-y-1.5">
              {TOC.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="block py-1 text-slate-600 hover:text-brand border-l-2 border-transparent hover:border-brand pl-3 -ml-px transition-colors"
                >
                  {item.t}
                </a>
              ))}
            </nav>
            <div className="mt-8 pt-6 border-t border-slate-200 text-[12px] text-slate-500">
              <a
                href={`${REPO_URL}/issues`}
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-1.5 hover:text-brand"
              >
                <i className="fa-brands fa-github" />
                发现问题？反馈
              </a>
            </div>
          </div>
        </aside>

        <article className="docs-content">
          <header className="mb-8">
            <div className="text-xs font-mono text-brand uppercase tracking-wider mb-3">
              <i className="fa-solid fa-code mr-1.5" /> API REFERENCE
            </div>
            <h1 className="text-4xl font-bold text-slate-900 tracking-tight mb-3">
              API 文档
            </h1>
            <p className="text-slate-600 text-base leading-relaxed">
              版本化接口、第三方上传 Token、图库读取与后台操作接口的完整说明。所有示例把 <code>https://your-domain.com</code> 换成你自己实例的域名。
            </p>
          </header>

          <div className="docs-layout">
            {/* 总览 */}
            <section className="docs-card docs-card-featured" id="overview">
              <h3>版本化 API 总览</h3>
              <table className="docs-table">
                <tbody>
                  <tr><th>上传</th><td><code>POST /api/v1</code></td></tr>
                  <tr><th>图库</th><td><code>GET /api/v1/list</code>，支持分页、搜索和排序</td></tr>
                  <tr><th>导出</th><td><code>GET /api/v1/export</code>，支持分页或 <code>all=1</code> 全量导出</td></tr>
                  <tr><th>后台操作</th><td><code>POST /api/v1/action</code>，支持压缩、WebP、AVIF、删除</td></tr>
                  <tr><th>鉴权</th><td><code>X-API-Key: &lt;token&gt;</code> 或 <code>Authorization: Bearer &lt;token&gt;</code></td></tr>
                  <tr><th>文件字段</th><td><code>image</code> / <code>image[]</code> / <code>file</code> / <code>files[]</code></td></tr>
                  <tr><th>返回</th><td><code>results[]</code>，逐文件给出 <code>status</code> / <code>url</code> / <code>thumbnail_url</code> / <code>processing</code></td></tr>
                </tbody>
              </table>
              <p className="docs-note">
                <strong>Token 在哪里创建：</strong>登录 LitePic 后台 → 设置 → 接口 tab → 新建 API Token。Token 只在创建时显示一次，撤销后立即失效。
              </p>
            </section>

            {/* cURL 示例 */}
            <section className="docs-card" id="curl">
              <h3>cURL 示例</h3>
              <p>实例域名替换成你自己的，Token 替换成后台创建的 <code>ltp_</code> 开头的字符串。</p>

              <div className="docs-tutorial-list">
                <article className="docs-tutorial-card">
                  <h4><i className="fa-solid fa-cloud-arrow-up" />上传多张图片</h4>
                  <p>用 multipart/form-data 上传，<code>image[]</code> 字段重复出现表示多张。</p>
                  <CodeBlock title="POST /api/v1" lang="bash" code={`curl -X POST "https://your-domain.com/api/v1" \\
  -H "Authorization: Bearer ltp_xxxxxxxxx" \\
  -F "image[]=@/path/a.jpg" \\
  -F "image[]=@/path/b.png"`} />
                </article>

                <article className="docs-tutorial-card">
                  <h4><i className="fa-solid fa-file-code" />成功返回示例</h4>
                  <p>每张图独立 status，<code>processing</code> 字段记录后处理（压缩 / WebP / AVIF / R2 同步）的每一步结果。</p>
                  <CodeBlock title="JSON 响应" lang="json" code={`{
  "status": "success",
  "results": [
    {
      "status": "success",
      "filename": "20260227_xxx.webp",
      "original_name": "demo.jpg",
      "url": "https://your-domain.com/uploads/2026/02/20260227_xxx.webp",
      "thumbnail_url": "https://your-domain.com/uploads/2026/02/.thumbs/20260227_xxx.webp",
      "processing": {
        "auto_compress": {"enabled": true, "compressed": true, "method": "imagemagick"},
        "auto_webp": {"enabled": true, "created": true},
        "original_deleted": true,
        "final_filename": "20260227_xxx.webp"
      }
    }
  ]
}`} />
                </article>

                <article className="docs-tutorial-card">
                  <h4><i className="fa-solid fa-download" />导出全部图片</h4>
                  <p>用于迁移 / 备份场景，<code>all=1</code> 关闭分页一次性返回完整列表。</p>
                  <CodeBlock title="GET /api/v1/export?all=1" lang="bash" code={`curl "https://your-domain.com/api/v1/export?all=1" \\
  -H "Authorization: Bearer ltp_xxxxxxxxx"`} />
                </article>
              </div>
            </section>

            {/* 功能覆盖 */}
            <section className="docs-card" id="coverage">
              <h3>功能覆盖</h3>
              <p className="docs-note">
                以下接口均有后端实现。普通上传 Token 可上传和读取导出，<strong>图库列表与压缩、转换、删除等后台操作需要管理员主密钥或登录态</strong>。
              </p>
              <table className="docs-table">
                <thead>
                  <tr>
                    <th>能力</th>
                    <th>请求</th>
                    <th>权限</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>上传图片</strong></td>
                    <td><code>POST /api/v1</code></td>
                    <td>上传 Token / 管理员</td>
                  </tr>
                  <tr>
                    <td><strong>图库列表</strong></td>
                    <td><code>GET /api/v1/list?page=1&amp;per_page=20</code></td>
                    <td>管理员主密钥 / 管理员登录</td>
                  </tr>
                  <tr>
                    <td><strong>迁移导出</strong></td>
                    <td><code>GET /api/v1/export?all=1</code></td>
                    <td>上传 Token / 管理员</td>
                  </tr>
                  <tr>
                    <td><strong>图片处理</strong></td>
                    <td><code>POST /api/v1/action</code></td>
                    <td>管理员主密钥 / 管理员登录</td>
                  </tr>
                </tbody>
              </table>
            </section>

            {/* 后台图片操作接口 */}
            <section className="docs-card" id="admin-action">
              <h3>后台图片操作接口</h3>
              <p className="docs-note">
                页面内调用会附带 <code>csrf_token</code>；外部脚本需使用管理员主密钥。<strong>不建议</strong>使用普通上传 Token 执行后台操作 —— 权限不够会直接 403。
              </p>
              <table className="docs-table">
                <thead>
                  <tr>
                    <th>操作</th>
                    <th>请求字段</th>
                    <th>说明</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>压缩</strong></td>
                    <td><code>action=compress, file=xxx.jpg, csrf_token=...</code></td>
                    <td>仅支持 JPG/JPEG/PNG，返回压缩比例和体积变化。</td>
                  </tr>
                  <tr>
                    <td><strong>转 WebP</strong></td>
                    <td><code>action=webp, file=xxx.png, csrf_token=...</code></td>
                    <td>支持 JPG/JPEG/PNG/GIF，成功后返回新文件 URL。</td>
                  </tr>
                  <tr>
                    <td><strong>转 AVIF</strong></td>
                    <td><code>action=avif, file=xxx.jpg, csrf_token=...</code></td>
                    <td>支持 JPG/JPEG/PNG/GIF，需 PHP 8.1+ 且 GD 支持 AVIF。</td>
                  </tr>
                  <tr>
                    <td><strong>删除</strong></td>
                    <td><code>action=delete, file=xxx.webp, csrf_token=...</code></td>
                    <td>删除原图并清理缩略图，远程对象进入 24 小时延迟删除队列。</td>
                  </tr>
                </tbody>
              </table>
              <p>所有 <code>action</code> 接口共用 <code>POST /api/v1/action</code> endpoint，请求体统一 form-data 格式。</p>
            </section>

            {/* WordPress */}
            <section className="docs-card" id="wordpress">
              <h3>WordPress 插件对接</h3>
              <ol className="docs-steps">
                <li>在插件设置中填写图床地址（例如 <code>https://your-domain.com</code>）。</li>
                <li>填写 API Token，并点击「连接测试」确认连通。</li>
                <li>开启「WordPress 上传同步到图床」。</li>
                <li>在文章编辑器中使用「插入图床图片」按钮，选择已上传图片或直接上传。</li>
              </ol>
              <p className="docs-note">
                <strong>推荐</strong>在插件中使用 <code>/api/v1</code> 作为上传入口 —— 返回结构稳定且带处理报告，老的 <code>/api/upload.php</code> 已不再维护。
              </p>
            </section>

            {/* Issue box */}
            <aside className="docs-issue-box">
              <i className="fa-brands fa-github" aria-hidden="true" />
              <div>
                <strong>接口对接遇到问题？</strong>
                <p>如果 Token 鉴权、字段格式、跨域或返回值跟文档对不上，欢迎到 GitHub Issues 提问 —— 附上 curl 命令和实际响应方便排查。</p>
              </div>
              <a href={`${REPO_URL}/issues`} target="_blank" rel="noopener noreferrer">
                提交问题
              </a>
            </aside>
          </div>
        </article>

        <div className="docs-spacer" aria-hidden />
      </div>

      <SiteFooter />
    </main>
  );
}
