# Cloudflare Pages: deployment and maintenance

The website repository is connected to Cloudflare Pages. A push to `main` automatically triggers a production build and deploy; branches and pull requests can produce preview deployments according to the Cloudflare project settings.

## Production configuration

| Setting | Value |
| --- | --- |
| Cloudflare Pages project | `clinical-calc-mcp` |
| Default address | `https://clinical-calc-mcp.pages.dev/` |
| Git repository | `Umarjaum/clinical-calc-mcp-site` |
| Production branch | `main` |
| Build command | `pnpm build` |
| Build output directory | `dist/public` |
| Root directory | `/` |
| Build secrets | None required |

Cloudflare's GitHub integration performs the deployment. The accompanying GitHub Actions workflow (`.github/workflows/validate-site.yml`) independently installs dependencies, checks TypeScript, and verifies the production build; it does not require an API token and does not publish a second time.

## Normal publishing flow

1. Make a focused change on a branch and open a pull request. GitHub Actions checks types and builds the site; Cloudflare can create a preview deployment if previews are enabled for that branch.
2. Merge to `main` after checks pass.
3. Cloudflare automatically builds and publishes the `main` revision. A successful GitHub Actions run alone is **not** proof the Cloudflare deploy succeeded; verify the Pages deployment result too.
4. Smoke-test the home page, quick start, tool descriptions, safety text, documentation links, and static assets such as `/robots.txt`, `/sitemap.xml`, `/favicon.svg`, and `/site-hero.webp`.

## Local verification

Use Node.js 22 and pnpm:

```bash
pnpm install --frozen-lockfile
pnpm check
pnpm build
```

The build writes the static website to `dist/public`. This project has no backend, database, runtime API credentials, or patient-data endpoint. If the Pages project settings ever change, keep the published configuration above in sync with Cloudflare.

## GitHub integration troubleshooting

If a future build stops starting, check the Cloudflare project’s Git connection, repository access for the Cloudflare Workers & Pages app, production branch, and latest build logs. The GitHub-side validation workflow is independent; check both Cloudflare Pages and GitHub Actions. Avoid uninstalling/reinstalling the GitHub app unless simpler reauthorization fails, because an app installation can be shared with other repositories.

## Metadata and accuracy

The site contains canonical, Open Graph/Twitter, JSON-LD SoftwareSourceCode/WebSite, `robots.txt`, and sitemap metadata. The canonical base address is set in `client/index.html`. Update it consistently if a custom domain is attached.

Keep package release claims accurate: PyPI currently has `0.1.0` with three tools, while the current GitHub source is the six-tool `0.2.0` code and is not yet published to PyPI. After a future release, update the install selector, quick-start guide, FAQ, package metadata, and structured descriptions together.

## Links

- [Website source repository](https://github.com/Umarjaum/clinical-calc-mcp-site)
- [Python package repository](https://github.com/Umarjaum/clinical-calc-mcp)
- [Cloudflare Pages documentation](https://developers.cloudflare.com/pages/)
- [Cloudflare Git integration troubleshooting](https://developers.cloudflare.com/workers/ci-cd/builds/git-integration/github-integration/)
