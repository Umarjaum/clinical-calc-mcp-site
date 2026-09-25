# clinical-calc-mcp project website

The public project website for [clinical-calc-mcp](https://github.com/Umarjaum/clinical-calc-mcp): an open-source local MCP server for deterministic clinical calculations and unit conversions. **Developer:** [Muhammad Umar Jabbar](https://umarjaum.netlify.app/).

**Live website:** [clinical-calc-mcp.pages.dev](https://clinical-calc-mcp.pages.dev/). A push to `main` triggers the Cloudflare Pages production build. **Everyone is welcome to contribute** from [across the web](https://github.com/Umarjaum/clinical-calc-mcp-site/blob/main/CONTRIBUTING.md).

## Develop locally

```bash
pnpm install
pnpm dev
```

Check types and build the Cloudflare Pages output:

```bash
pnpm check
pnpm build
```

The Vite output for Cloudflare Pages is `dist/public`. The production build pre-renders the homepage for bot-readable content and then hydrates it in the browser. The site uses no backend, credentials, trackers, or third-party runtime APIs. Google Fonts are a progressive-enhancement dependency; system fonts remain the fallback. The single branded hero asset is in `site-public/` and is served as `/site-hero.webp`.

## Deployment

Cloudflare Pages project slug: `clinical-calc-mcp` (live at `https://clinical-calc-mcp.pages.dev`). See [Cloudflare deployment and troubleshooting](docs/cloudflare-deployment.md) and [search visibility and SEO maintenance](docs/seo-maintenance.md). Production branch: `main`. Build command: `pnpm build`. Build output directory: `dist/public`.

## Contribute

Contributions are welcome. The server's [contributing guide](https://github.com/Umarjaum/clinical-calc-mcp/blob/main/CONTRIBUTING.md) and privacy-conscious [issue forms](https://github.com/Umarjaum/clinical-calc-mcp/issues/new/choose) are the starting point. Never submit patient data or secrets.

## Accuracy and safety

The website distinguishes the currently published PyPI release from the newer source branch; it does not claim universal AI compatibility. The tool performs arithmetic only and does not provide diagnosis, triage, or treatment decisions. Review the [clinical safety notes](https://github.com/Umarjaum/clinical-calc-mcp/blob/main/docs/clinical-safety.md).
