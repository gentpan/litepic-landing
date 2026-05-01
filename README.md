# litepic-landing

`litepic-landing` 是 [litepic.io](https://litepic.io) 的项目主页 + 文档源码仓库，承载 LitePic 的产品介绍、文档和更新日志。

这个仓库不是 LitePic 主程序。主程序源码在 [`gentpan/LitePic`](https://github.com/gentpan/LitePic)。

## 项目职责

- 展示 LitePic 的产品定位、核心功能和发布信息
- 提供官网首页：[litepic.io](https://litepic.io)
- 提供使用文档：`/docs`（迁移自原本 PHP 应用里的 `app/pages/usage.php`）
- 提供更新日志页面：`/changelog`
- LitePic 主程序发版后，跟随 GitHub Release 自动重建首页与 changelog

## 页面结构

| 文件 | 说明 |
|---|---|
| `app/page.tsx` | 首页入口（拉 GitHub release 拼 hero badge） |
| `app/HomeClient.tsx` | 官网首页主要交互和展示内容 |
| `app/docs/page.tsx` | 使用说明文档（部署、配置、防盗链等） |
| `app/changelog/page.tsx` | 更新日志页面 |
| `app/layout.tsx` | 全站 metadata 和布局 |
| `lib/releases.ts` | 从 GitHub Releases 拉取 LitePic 主程序版本记录 |

## 本地开发

```bash
npm install
npm run dev
```

默认地址：`http://localhost:3210`

## 构建

```bash
npm run build
```

构建产物输出到 `out/`。这是一个静态导出站点，生产环境由 OpenResty 直接托管。

## 部署

推送到 `main` 后由 `.github/workflows/deploy.yml` 自动部署。

需要的仓库 Secrets：

| Secret | 值 |
|---|---|
| `LITEPIC_DEPLOY_SSH_KEY` | 部署服务器 SSH 私钥（同 utterlog-landing 共用 `~/.ssh/gentpan.pem`） |
| `LITEPIC_DEPLOY_HOST` | `136.243.151.32` |
| `LITEPIC_DEPLOY_PATH` | `/opt/1panel/www/sites/litepic.io` |

部署流程：

1. 安装依赖
2. 构建静态站点（`next build`，`output: 'export'`）
3. rsync `out/` 到服务器目录
4. 烟囱测试三个核心 URL

## 服务器架构

- **域名**：litepic.io（Cloudflare DNS，proxied，account: gentpan@gmail.com）
- **源服务器**：136.243.151.32（giantaccel.com，Hetzner）
- **Web 层**：1Panel + OpenResty Docker 容器（`1Panel-openresty-7ux1`）
- **SSL**：Cloudflare Origin Cert，15 年有效期，挂在 `/usr/local/openresty/nginx/conf/ssl/litepic.io/`
- **静态根**：宿主机 `/opt/1panel/www/sites/litepic.io/`，容器内 `/www/sites/litepic.io/`
- **OpenResty 配置**：`/opt/1panel/www/conf.d/litepic.io.conf`

## 与主程序仓库的关系

| 仓库 | 用途 |
|---|---|
| `gentpan/LitePic` | LitePic 主程序、PHP 源码、Release |
| `gentpan/litepic-landing` | litepic.io 官网、文档、更新日志展示 |

主程序 `/docs` PHP 路由（原 `app/pages/usage.php`）已下线 — 文档统一在 litepic.io/docs。

## License

MIT。和 LitePic 主程序保持一致。
