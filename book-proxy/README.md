# 深度讲书 · 自有域名反向代理

这个 Worker 把 `yiyeyishu.wanxinrong.cc.cd` 的访问转发到现有 WorkBuddy 下载站，
自动补上分享码，视频由源站提供（无需上传 328MB）。

## 一键部署

点击下方链接，登录 Cloudflare，确认部署即可（会自动把这个仓库复制到你的账号并部署 Worker）：

https://deploy.workers.cloudflare.com/?url=https%3A%2F%2Fgithub.com%2Fwanxinrong%2Fdeepwanxinrong%2Ftree%2Fmain%2Fbook-proxy

> 若部署页要求选择子目录，选 `book-proxy`。

## 部署后绑定域名（必做，1 分钟）

1. 先到 DNS 记录里**删除**那条错误的 CNAME（内容带 `?sharecode` 的那条）。
2. 进入部署好的 Worker → **Settings** → **Triggers** → **Custom Domains** → **Add Custom Domain**。
3. 填 `yiyeyishu.wanxinrong.cc.cd` → Add Domain。Cloudflare 自动加 DNS 并签发 HTTPS 证书。
4. 等状态变 Active，打开 https://yiyeyishu.wanxinrong.cc.cd/ 验证。

## 说明

- 源站与分享码写在 `src/index.js` 顶部两个常量，已配置好，无需改动。
- 以后每天新增的书会自动同步，无需重新部署。
