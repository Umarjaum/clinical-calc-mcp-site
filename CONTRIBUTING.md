# Contributing to the project website

Thanks for helping make the project easier to find, understand, and contribute to. Welcome from wherever you build.

## Local development

Use Node.js 22 and pnpm:

```bash
pnpm install
pnpm dev
pnpm check
pnpm build
```

The Vite build is configured for Cloudflare Pages and writes static files to `dist/public`. There is no website backend, analytics collector, or secret-dependent feature. Keep the site compatible with static hosting.

## Good contributions

Copy edits, accessibility improvements, responsive layout refinements, accurate installation instructions, client-specific MCP configuration, SEO metadata, structured-data corrections, and performance work are welcome. Keep claims evidence-based and distinguish current PyPI releases from unreleased GitHub source.

## Privacy and safety

Never include patient information, real clinical narratives, credentials, API tokens, private email addresses, or other confidential content in an issue, screenshot, commit, or test. Examples must be synthetic. The project explains arithmetic software; it must not be described as a diagnostic, triage, prescribing, treatment, or validated clinical decision-support system.

## Submit changes

Open an issue before a major redesign or new integration. Send a focused pull request with a clear summary, relevant screenshots when the visual layout changes, and the results of `pnpm check` and `pnpm build`. Be respectful, specific, and constructive in discussions.
