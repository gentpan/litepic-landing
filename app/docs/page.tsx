import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '使用说明 — LitePic',
  description:
    'LitePic 部署、配置、防盗链、WebP/AVIF、水印、压缩方式选择和远程存储的完整参考。',
};

const REPO_URL = 'https://github.com/gentpan/LitePic';

// Sidebar TOC. Anchors match the section ids below — keep in sync if
// you rename/reorder. The PHP-app /docs page used the same anchors
// (#hotlink-protection, #compression-modes, #hotlink-empty-referer)
// so existing settings.php "了解更多" links keep working when they
// point to https://litepic.io/docs#xxx.
const TOC = [
  { id: 'intro',              t: '项目简介' },
  { id: 'features',           t: '核心功能' },
  { id: 'compression-modes',  t: '压缩方式选择' },
  { id: 'php-upload-limits',  t: 'PHP 上传限制' },
  { id: 'hotlink-protection', t: '开启防盗链' },
  { id: 'hotlink-empty-referer', t: '允许无来源请求' },
  { id: 'watermark',          t: '水印设置' },
  { id: 'webp',               t: '开启 WebP 转换' },
  { id: 'avif',               t: '开启 AVIF 转换' },
  { id: 'upload-pipeline',    t: '上传后处理链路' },
  { id: 'auth',               t: '认证与安全' },
  { id: 'api',                t: '接口与外部接入' },
  { id: 'ops',                t: '运维与排障' },
];

function Logo({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <rect x="0" y="0" width="24" height="24" rx="4" fill="#0052D9" />
      <path d="M6.4 6.5h2.3v8.7h4.4v2.1H6.4V6.5z" fill="white" />
      <circle cx="16.6" cy="8.7" r="1.7" fill="white" />
    </svg>
  );
}

export default function DocsPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      {/* Nav (mirrors landing header) */}
      <header className="border-b border-slate-200 bg-white sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2.5">
            <Logo className="w-7 h-7" />
            <span className="font-brand font-semibold text-slate-900">LitePic</span>
          </a>
          <nav className="flex items-center gap-1 sm:gap-2 text-[13.5px]">
            <a href="/#features" className="hidden sm:inline px-3 py-2 text-slate-600 hover:text-slate-900">特性</a>
            <a href="/docs" className="hidden sm:inline px-3 py-2 text-slate-900 font-medium">文档</a>
            <a href="/changelog" className="hidden sm:inline px-3 py-2 text-slate-600 hover:text-slate-900">更新</a>
            <a href={REPO_URL} target="_blank" rel="noopener" className="px-3 py-2 text-slate-600 hover:text-slate-900 flex items-center gap-1.5">
              <i className="fa-brands fa-github" />
              <span className="hidden sm:inline">GitHub</span>
            </a>
          </nav>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-12 sm:py-16 grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-10">
        {/* ===== Sidebar TOC ===== */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="text-xs font-mono text-brand uppercase tracking-wider mb-4">使用说明</div>
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
        </aside>

        {/* ===== Main content ===== */}
        <article className="docs-prose min-w-0">
          <header className="mb-10 pb-8 border-b border-slate-200">
            <div className="text-xs font-mono text-brand uppercase tracking-wider mb-3">
              <i className="fa-solid fa-book-open mr-1.5" /> DOCUMENTATION
            </div>
            <h1 className="text-4xl font-bold text-slate-900 tracking-tight mb-3">
              使用说明
            </h1>
            <p className="text-slate-600 text-base leading-relaxed">
              面向部署者和日常使用者的完整参考。配置示例可直接复制使用，遇到问题先翻一遍这里。
            </p>
          </header>

          {/* 项目简介 */}
          <section id="intro">
            <h2>项目简介</h2>
            <p>
              <strong>LitePic V3.0</strong> 面向个人站长、自托管用户和轻量团队，提供一个开箱即用的 PHP 图床后台。它不依赖复杂服务栈，把上传、缩略图、压缩、WebP / AVIF 转换、图库管理、访问统计和 R2/S3 同步集中在一个简洁的单机应用里。
            </p>
            <p>
              LitePic 的核心思路是 <strong>先保证图片成功入库，再异步处理耗时任务</strong>。压缩、转换、水印、缩略图或远程同步失败时，不会拖垮上传流程；系统会记录处理结果，方便后续排查和批量补处理。日常使用时，你可以直接复制 URL、HTML、Markdown、BBCode，也可以在图库中批量压缩、转换和删除。
            </p>
          </section>

          {/* 核心功能 */}
          <section id="features">
            <h2>核心功能</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
              {[
                ['fa-cloud-arrow-up', '上传能力',     '支持单图/多图、拖拽、粘贴上传。上传页全屏布局，无额外滚动条，体验沉浸。'],
                ['fa-image',          '缩略图机制',   '上传后自动生成缩略图，图库列表优先展示缩略图，复制和查看使用原图地址。SVG 可识别宽高时显示分辨率。'],
                ['fa-compress',       '自动压缩',     '支持 ImageMagick / GD / TinyPNG 三种压缩方式。不可压缩格式自动跳过，不阻塞上传。支持批量压缩与压缩比例回显。'],
                ['fa-file-code',      '格式转换',     '支持 JPG/JPEG/PNG/GIF 转换为 WebP 或 AVIF。可在设置中选择偏好格式，图库批量按钮与处理链路自动适配。'],
                ['fa-layer-group',    '图库管理',     '支持批量选择、批量删除（带确认对话框防误触）、批量压缩、批量格式转换、复制多种链接格式。分页采用 POST→GET 重定向，刷新无提示。'],
                ['fa-chart-line',     '统计分析',     '提供访问量、图片数、空间占用、文件类型分布、时间维度统计。概览页采用环形卡片 + 图表 + 表格组合设计。'],
                ['fa-fingerprint',    'Passkey 登录', '除传统 API Key 登录外，支持 WebAuthn / Passkey 无密码登录。支持注册多个凭证，随时撤销。'],
                ['fa-database',       'R2/S3 远程存储', '支持远程备份和云端存储两种用途。备份模式保留本站图片地址；云端存储模式会让复制链接、API 返回和图库图片优先使用 R2/S3 公网地址。'],
              ].map(([icon, title, desc]) => (
                <div key={title} className="border border-slate-200 bg-white p-4 not-prose">
                  <div className="flex items-center gap-2 mb-2">
                    <i className={`fa-solid ${icon} text-brand`} />
                    <h4 className="font-semibold text-slate-900 text-sm m-0">{title}</h4>
                  </div>
                  <p className="text-[13px] text-slate-600 leading-relaxed m-0">{desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* 压缩方式选择 */}
          <section id="compression-modes">
            <h2>压缩方式选择</h2>
            <p>
              设置页的「压缩方式」只影响 JPG/JPEG/PNG 的压缩链路，不影响 WebP / AVIF 转换。当前系统不会混合回退，选择哪一种就只调用对应后端。
            </p>
            <table>
              <tbody>
                <tr>
                  <th>TinyPNG</th>
                  <td>
                    走外部 TinyPNG API，压缩率通常稳定，适合 JPEG/PNG 体积优化。
                    需要配置 API Key、服务器能访问外网，并注意调用额度；不负责 WebP / AVIF 转换。
                  </td>
                </tr>
                <tr>
                  <th>GD</th>
                  <td>
                    PHP 常见内置扩展，部署最简单，适合基础 JPG/PNG 压缩。
                    WebP / AVIF 转换也依赖 GD 的 <code>imagewebp()</code> / <code>imageavif()</code>，画质控制弱于 ImageMagick。
                  </td>
                </tr>
                <tr>
                  <th>ImageMagick</th>
                  <td>
                    调用服务器上的 <code>magick</code> 或 <code>convert</code> 命令进行压缩，适合更复杂的图片处理和较大的图片。
                    需要服务器允许命令执行并安装 ImageMagick。
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="docs-note">
              <strong>转换策略：</strong>单张 WebP / AVIF 转换会直接处理并返回结果；图库批量转 AVIF 选择 2 张及以上时会进入异步任务队列，避免单个 PHP 请求长时间占用 CPU。
            </div>
          </section>

          {/* PHP 上传限制 */}
          <section id="php-upload-limits">
            <h2>修改 PHP 上传限制</h2>
            <p>
              LitePic 的后台设置会同步写入 <code>.env</code> 和站点根目录 <code>.user.ini</code>，但最终是否生效仍取决于 PHP-FPM、Nginx/Apache 和面板环境的上限。推荐先在后台设置中保存一次，再按服务器环境补齐下面的限制。
            </p>
            <ol>
              <li>进入 <strong>设置 → 基础设置</strong>，修改「最大上传大小（MB）」，保存后系统会写入 <code>MAX_FILE_SIZE</code> 与 <code>.user.ini</code>。</li>
              <li>确认 PHP 的 <code>upload_max_filesize</code> 不小于后台设置值，<code>post_max_size</code> 要略大于 <code>upload_max_filesize</code>。</li>
              <li>Nginx 还需要配置 <code>client_max_body_size</code>，否则大文件会在进入 PHP 前被拒绝。</li>
              <li>修改 PHP-FPM 或 Web 服务器配置后，需要重载或重启对应服务。</li>
            </ol>

            <h3>php.ini / PHP-FPM 推荐值</h3>
            <pre><code>{`upload_max_filesize = 50M
post_max_size = 52M
max_file_uploads = 50
memory_limit = 256M
max_execution_time = 120
max_input_time = 120`}</code></pre>

            <h3>重载 PHP-FPM 与 Nginx</h3>
            <pre><code>{`sudo systemctl restart php8.3-fpm
sudo systemctl reload nginx`}</code></pre>

            <h3>Nginx server 块</h3>
            <pre><code>{`server {
    client_max_body_size 52m;
}`}</code></pre>

            <h3>Apache .htaccess（mod_php）</h3>
            <pre><code>{`php_value upload_max_filesize 50M
php_value post_max_size 52M
php_value memory_limit 256M
php_value max_execution_time 120`}</code></pre>

            <h3>.user.ini 白名单（PHP-FPM 常用）</h3>
            <pre><code>{`open_basedir=/path/to/LitePic/:/tmp/:/proc/cpuinfo:/proc/meminfo:/proc/uptime:/etc/os-release
upload_max_filesize=50M
post_max_size=52M
max_file_uploads=50
memory_limit=256M`}</code></pre>

            <div className="docs-note">
              <strong>验证方式：</strong>进入 <strong>设置 → 服务器信息</strong> 查看「上传上限」；也可以执行
              {' '}<code>php -i | grep -E &quot;upload_max_filesize|post_max_size|memory_limit&quot;</code>。
              如果页面仍显示「未生效」，通常是 PHP-FPM 未重启、Nginx <code>client_max_body_size</code> 未配置，或面板上层限制仍较低。
            </div>
          </section>

          {/* 防盗链 */}
          <section id="hotlink-protection">
            <h2>开启防盗链</h2>
            <p>
              LitePic 的防盗链分为两种：Apache / LiteSpeed 可由后台写入 <code>.htaccess</code>，保持 <code>/uploads/...</code> 原地址；Nginx、OpenResty、Caddy 也支持防盗链，但需要把对应规则放进 Web 服务器配置并重载服务。
            </p>
            <ol>
              <li>进入 <strong>设置 → 水印与防盗链</strong>，填写「防盗链允许域名」，多个域名用英文逗号分隔。</li>
              <li>开启「启用防盗链（保持 /uploads/... 原路径）」，保存设置。</li>
              <li>如果当前服务器是 Apache / LiteSpeed，后台会自动写入或移除 <code>.htaccess</code> 规则。</li>
              <li>如果当前服务器是 Nginx / OpenResty / Caddy，请复制下面对应配置到站点配置里，然后重载 Web 服务。</li>
            </ol>

            <h3>Apache / LiteSpeed — .htaccess</h3>
            <pre><code>{`<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteCond %{HTTP_REFERER} !^$
    RewriteCond %{HTTP_REFERER} !^https?://([^/]+\\.)?(your-domain\\.com)(:[0-9]+)?(/|$) [NC]
    RewriteRule ^uploads/.*\\.(jpg|jpeg|png|gif|webp|avif|svg|ico|bmp|tiff|tif)$ - [F,L]
</IfModule>`}</code></pre>

            <h3>Nginx / OpenResty</h3>
            <pre><code>{`location ~* ^/uploads/.*\\.(jpe?g|png|gif|webp|avif|svg|ico|bmp|tiff?)$ {
    valid_referers none blocked server_names your-domain.com *.your-domain.com;
    if ($invalid_referer) { return 403; }
    try_files $uri =404;
}`}</code></pre>
            <pre><code>{`sudo nginx -t
sudo systemctl reload nginx`}</code></pre>

            <h3>Caddy</h3>
            <pre><code>{`@badImageReferer {
    path /uploads/*
    header Referer *
    not {
        header_regexp Referer ^https?://([^/]+\\.)?(your-domain\\.com)(:[0-9]+)?(/|$)
    }
}

respond @badImageReferer 403`}</code></pre>
            <pre><code>{`sudo caddy validate --config /etc/caddy/Caddyfile
sudo systemctl reload caddy`}</code></pre>

            <div className="docs-note">
              <strong>说明：</strong>这种方式不改变图片地址，仍然使用 <code>/uploads/xxx.webp</code>。它依赖 Referer，适合拦截普通外站引用，但不能作为严格鉴权。若需要完全由 PHP 控制访问，可使用 <code>/i/...</code> 受控入口，但新复制链接会变更路径。
            </div>
          </section>

          {/* 无来源请求 */}
          <section id="hotlink-empty-referer">
            <h2>允许无来源请求是什么意思？</h2>
            <p>
              图片防盗链主要依赖浏览器请求里的 <code>Referer</code> 判断来源。「无来源请求」就是请求里没有 <code>Referer</code>，常见于直接打开图片地址、复制 URL 到新标签页、隐私浏览器、浏览器插件隐藏来源，或聊天软件、App、代理/CDN 请求图片时没有传来源。
            </p>
            <ol>
              <li><strong>开启后：</strong>没有 <code>Referer</code> 的请求会放行，用户可以直接打开图片链接；防盗链主要拦截带有外站 <code>Referer</code> 的盗链请求。</li>
              <li><strong>关闭后：</strong>没有 <code>Referer</code> 的请求也会被拒绝，规则更严格，但直接打开图片链接、部分隐私浏览器或 App 访问图片可能失败。</li>
              <li>建议默认开启。这样不影响正常分享图片链接，同时还能拦截大多数外站直接引用。</li>
            </ol>
          </section>

          {/* 水印 */}
          <section id="watermark">
            <h2>水印设置</h2>
            <p>
              文字水印默认使用白色文字，并在文字背后生成半透明磨砂底层。字体会优先使用服务器上的 Ubuntu 字体；没有 Ubuntu 字体时会回退到系统可用字体或 GD 内置字体。
            </p>
            <ol>
              <li>进入 <strong>设置 → 水印与防盗链</strong>，开启「上传后自动添加文字水印」。</li>
              <li>保持「启用水印磨砂底层」开启，可调整磨砂层透明度、内边距和圆角。</li>
              <li>需要自定义字体时，上传 <code>TTF</code> 或 <code>OTF</code> 字体文件；中文水印建议上传包含中文字形的字体。</li>
              <li>需要图片水印时，上传透明背景 <code>PNG</code> 文件；配置 PNG 水印后会优先使用 PNG 图片水印。</li>
            </ol>
            <div className="docs-note">
              <strong>建议：</strong>PNG 图片水印请使用透明背景，并把最大宽度控制在原图宽度的 20% 到 30% 之间，避免遮挡图片主体。
            </div>
          </section>

          {/* WebP */}
          <section id="webp">
            <h2>开启 WebP 转换</h2>
            <p>
              WebP 转换依赖 PHP GD 的 <code>imagewebp()</code>。压缩方式选择 ImageMagick 只影响压缩链路，不等同于 WebP 转换能力。
            </p>
            <ol>
              <li>进入 <strong>设置 → 基础设置</strong>，将「转换优先格式」设为 <strong>WebP</strong>。</li>
              <li>勾选「上传后自动转换 WebP」，保存设置。</li>
              <li>确认服务器安装并启用 <code>gd</code> 扩展，且 <code>imagewebp()</code> 可用。</li>
              <li>上传一张 JPG/PNG/GIF 测试，图库中应生成或展示对应 WebP 文件。</li>
            </ol>

            <h3>Debian / Ubuntu 安装常用依赖</h3>
            <pre><code>{`sudo apt update
sudo apt install -y php-gd php-imagick webp imagemagick
sudo systemctl restart php8.3-fpm`}</code></pre>

            <h3>命令行验证 WebP 能力</h3>
            <pre><code>{`php -m | grep -Ei "gd|imagick"
php -r 'var_dump(function_exists("imagewebp"));'`}</code></pre>

            <div className="docs-note">
              <strong>宝塔 / 面板环境：</strong>在 PHP 管理中安装或启用 <code>fileinfo</code>、<code>gd</code>。如果 GD 已启用但 <code>imagewebp()</code> 返回 false，说明该 PHP 的 GD 编译时没有 WebP 支持，需要换用带 WebP 的 PHP 版本。
            </div>
          </section>

          {/* AVIF */}
          <section id="avif">
            <h2>开启 AVIF 转换</h2>
            <p>
              AVIF 对环境要求比 WebP 高。推荐 PHP 8.1+，并确认 GD 编译了 AVIF 支持（<code>imageavif()</code> 可用）。
            </p>
            <ol>
              <li>确认 PHP 版本 ≥ 8.1：<code>php -v</code>。</li>
              <li>进入 <strong>设置 → 基础设置</strong>，将「转换优先格式」设为 <strong>AVIF</strong>。</li>
              <li>勾选「上传后自动转换 AVIF」，保存设置。</li>
              <li>在 <strong>设置 → 服务器信息</strong> 查看「AVIF 支持」是否为已启用。</li>
              <li>上传 JPG/PNG/GIF 测试，处理报告中应显示 AVIF 转换成功。</li>
            </ol>

            <h3>Debian / Ubuntu 安装 AVIF 相关依赖</h3>
            <pre><code>{`sudo apt update
sudo apt install -y php-gd php-imagick imagemagick libavif-bin libavif-dev
sudo systemctl restart php8.3-fpm`}</code></pre>

            <h3>命令行验证 AVIF 能力</h3>
            <pre><code>{`php -v
php -r 'var_dump(function_exists("imageavif"));'
avifenc --version`}</code></pre>

            <div className="docs-note">
              <strong>排障重点：</strong>PHP 版本满足要求不代表 AVIF 一定可用。若 <code>imageavif()</code> 不存在，说明 GD 没有 AVIF 支持。此时可升级 PHP/GD，或先使用 WebP 作为转换格式。
            </div>
          </section>

          {/* 上传后处理链路 */}
          <section id="upload-pipeline">
            <h2>上传后处理链路</h2>
            <ol>
              <li>接收文件并完成格式 / 大小校验。</li>
              <li>保存原图并记录原始文件名映射（支持中文名保留）。</li>
              <li>如开启 EXIF 清理，自动剥离敏感元数据。</li>
              <li>生成缩略图（支持格式才生成，失败只记录不终止）。</li>
              <li>按配置执行自动压缩（失败只记录，不终止）。</li>
              <li>按配置执行自动格式转换（WebP 或 AVIF，由偏好格式决定；失败只记录，不终止）。</li>
              <li>如转换成功且未开启「保留原图」，仅保留最终文件并清理原图。</li>
              <li>按远程用途同步到 R2/S3（如启用）：远程备份只保存副本，云端存储会让图片访问地址优先指向公网访问域名。</li>
            </ol>
            <div className="docs-note">
              <strong>注意：</strong>每一步的异常都会记录到处理报告中，可在响应的 <code>processing</code> 字段中查看详细状态，便于排查。
            </div>
          </section>

          {/* 认证与安全 */}
          <section id="auth">
            <h2>认证与安全</h2>
            <h3>登录方式</h3>
            <ul>
              <li><strong>管理员 Key 登录：</strong>传统密码框方式，输入管理员 API Key 后通过 SHA-256 校验并写入 Cookie。支持记住登录状态。</li>
              <li><strong>Passkey 登录：</strong>基于 WebAuthn 标准，支持指纹 / Face ID / 硬件密钥等生物识别方式登录。可在设置中注册或撤销凭证。</li>
            </ul>

            <h3>Token 与 CSRF</h3>
            <ul>
              <li>可在系统设置中创建多个第三方 API Token，用于外部系统调用上传接口。</li>
              <li>Token 支持随时撤销，撤销后立即失效。</li>
              <li>TinyPNG 压缩 API Key 支持多 Key 轮询，系统记录每个 Key 的调用次数与状态。</li>
              <li>所有后台操作（压缩 / 转换 / 删除）均受 CSRF Token 保护。</li>
              <li>建议在生产环境启用 HTTPS，并限制 Token 泄露面（仅在服务端保存）。</li>
            </ul>
          </section>

          {/* API */}
          <section id="api">
            <h2>接口与外部接入</h2>
            <p>
              上传接口、导出接口、后台图片操作接口和 WordPress 插件对接说明在你自己的实例后台 <code>/api</code> 页面查看 — API 文档基于运行时配置生成，所以放在自托管站点本地，而不是 litepic.io。
            </p>
            <p>
              示例：管理员后台访问 <code>https://your-site.com/api</code>，包含基础认证、curl 调用样例、响应字段说明和错误码表。
            </p>
          </section>

          {/* 运维与排障 */}
          <section id="ops">
            <h2>运维与排障</h2>
            <ul>
              <li>如出现「未压缩 / 未转 WebP / 未转 AVIF」，可在开启调试后查看 <code>logs/YYYY-MM-DD.log</code> 的 upload post-process 记录。</li>
              <li>旧数据迁移后，可使用设置中的扫描功能重建图库数据、缩略图与统计数据。</li>
              <li>当对象存储配置不完整时，系统会回退为本地可用模式，上传不会被中断。</li>
              <li>若 AVIF 转换失败，请确认 PHP 版本 ≥ 8.1，且 GD 已编译 AVIF 支持（<code>php -r &apos;var_dump(function_exists(&quot;imageavif&quot;));&apos;</code>）。</li>
            </ul>
          </section>

          {/* Issue box */}
          <aside className="not-prose mt-16 border border-slate-200 bg-white p-6 flex flex-wrap items-center gap-4 justify-between">
            <div className="flex items-center gap-4 min-w-0 flex-1">
              <div className="w-12 h-12 bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
                <i className="fa-brands fa-github text-xl" />
              </div>
              <div className="min-w-0">
                <div className="font-semibold text-slate-900 mb-1">遇到问题？</div>
                <div className="text-sm text-slate-600">如果使用中发现 Bug、部署异常或有功能建议，可以到 GitHub Issues 提交问题。</div>
              </div>
            </div>
            <a
              href={`${REPO_URL}/issues`}
              target="_blank"
              rel="noopener"
              className="px-5 py-2.5 bg-brand text-white hover:bg-brand-hover transition-colors text-sm font-medium shrink-0"
            >
              提交问题
            </a>
          </aside>
        </article>
      </div>

      <footer className="border-t border-slate-200 bg-white py-10">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 text-center text-[12px] text-slate-500">
          <a href="/" className="hover:text-slate-900">litepic.io</a>
          <span className="mx-3 text-slate-300">&middot;</span>
          <a href="/changelog" className="hover:text-slate-900">更新</a>
          <span className="mx-3 text-slate-300">&middot;</span>
          <a href={REPO_URL} className="hover:text-slate-900">GitHub</a>
        </div>
      </footer>
    </main>
  );
}
