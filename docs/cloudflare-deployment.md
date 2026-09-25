# Cloudflare Pages deployment and troubleshooting

The website source is published at <https://github.com/Umarjaum/clinical-calc-mcp-site>. The intended Pages project name is `clinical-calc-mcp`, which gives the default address `https://clinical-calc-mcp.pages.dev/` after the first successful deployment. **That Pages URL is not live yet.** Cloudflare's project-creation API currently returns error `8000011`, indicating its Pages GitHub integration needs to be installed or repaired. No site content was deployed.

## Repair the GitHub connection

1. Sign in to the Cloudflare account that should own the site and open **Workers & Pages**.
2. In the Cloudflare dashboard, use the Pages flow **Create application → Pages → Connect to Git**.
3. If the GitHub account is missing or an internal Git-installation error appears, open [GitHub Settings → Applications → Installed GitHub Apps](https://github.com/settings/installations) and find **Cloudflare Workers and Pages**. Configure its repository access to include `Umarjaum/clinical-calc-mcp-site`. Cloudflare advises uninstalling and reinstalling the app only if normal reauthorization does not resolve a broken installation; that can affect other repositories connected to the same Cloudflare account, so review the impact before choosing it.
4. Once GitHub reports that Cloudflare has access to this repository, return to Cloudflare and create a **Pages** project connected to `Umarjaum/clinical-calc-mcp-site`.
5. Use production branch `main`, build command `pnpm build`, and build output directory `dist/public`. No environment variables are required by the website.
6. Wait for the first production deployment to finish. Verify the root page, `/robots.txt`, `/sitemap.xml`, `/favicon.svg`, `/site-hero.webp`, and a file under `/assets/`. Only after that succeeds should the default Pages address be shared as a live website.

Cloudflare's official [GitHub integration troubleshooting guide](https://developers.cloudflare.com/workers/ci-cd/builds/git-integration/github-integration/) documents the reinstall procedure and warns that removing the GitHub App also disables new builds for all projects attached to that installation. Prefer granting the intended repository access first, when possible.

## Optional GitHub Actions deployment

The repository includes a workflow at `.github/workflows/deploy-cloudflare-pages.yml`. It always installs, type-checks, and builds the site. Deployment is deliberately disabled by default. If you prefer this deployment route instead of Cloudflare's Git integration, first create a **Cloudflare API token restricted to Pages edit access for the intended account/project**. Add it to GitHub Actions secrets as `CLOUDFLARE_API_TOKEN`, confirm `accountId` in the workflow, and set the repository Actions variable `CLOUDFLARE_PAGES_DEPLOY_ENABLED` to the exact value `true`. Review the workflow and token scope before enabling it. **Never commit or paste the token into a repository, issue, build log, or chat.**

The GitHub workflow only deploys pushes to `main` (or a manual run) and skips pull requests. If using the Cloudflare Git integration, leave the deployment variable unset so two separate build systems do not publish the same project concurrently.

## Site metadata and safety

The site includes a canonical URL, Open Graph and Twitter metadata, a `SoftwareSourceCode` / `WebSite` JSON-LD graph, `robots.txt`, and a sitemap. Review the canonical and social-image URLs in `client/index.html` if the public hostname changes. The website describes an arithmetic-only utility and must not imply diagnosis, triage, treatment decisions, or universal AI-client compatibility.

## Current state

- GitHub source: <https://github.com/Umarjaum/clinical-calc-mcp-site>
- Cloudflare Pages slug intended: `clinical-calc-mcp`
- Planned address: <https://clinical-calc-mcp.pages.dev/>
- Production deployment: **blocked pending Cloudflare Git integration repair**
- Local quality checks: `pnpm check` and `pnpm build`
- Pages output directory: `dist/public`
- Project cost: the direct static site has no server-side database or app backend

Cloudflare Pages supports direct file uploads too, but Git integration or the documented Wrangler workflow is easier to maintain because it records source, builds repeatably, and avoids manual one-off uploads.
