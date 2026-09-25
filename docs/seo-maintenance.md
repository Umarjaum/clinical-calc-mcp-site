# Search visibility and SEO maintenance

This project is technically prepared for search discovery, but no metadata, sitemap, or structured-data markup can guarantee indexing or a top search position. Google explicitly notes that there are no automatic first-place ranking steps and that search changes may take weeks or longer to appear.[1]

## Verify ownership

The homepage includes the exact Google Search Console token and Bing Webmaster Tools token supplied by the project owner. A verification meta tag proves site ownership only after the corresponding service checks it; it does not submit the site, request indexing, or promise ranking.[2]

Sign in to [Google Search Console](https://search.google.com/search-console/), add `https://clinical-calc-mcp.pages.dev/` as a URL-prefix property if it is not already listed, and complete the HTML-tag verification step. Then inspect the homepage URL, request indexing if offered, and submit `https://clinical-calc-mcp.pages.dev/sitemap.xml` in the Sitemaps report.

Sign in to [Bing Webmaster Tools](https://www.bing.com/webmasters/), add the same public URL, and select meta-tag verification. Once verified, submit the sitemap. Bing also documents importing a verified Search Console property, which can avoid a second manual ownership flow.[3]

Keep the two verification values unchanged in `client/index.html` unless the owner replaces them in the matching webmaster console. The production build checks that both exact values remain present.

## What the site already provides

The production build pre-renders the homepage into its static HTML and hydrates it in the browser. This makes the actual headings, six tool descriptions, project links, and safety copy available in the initial document instead of relying solely on client-side rendering. The HTML includes a descriptive title and summary, a canonical URL, Open Graph and social preview tags, and accurate JSON-LD for the website, source repository, and developer. A crawler-friendly `robots.txt` points to the XML sitemap.

Structured data describes content that is also visible to site visitors. It can help search engines interpret the project, but it does not guarantee an enhanced listing.[4] The previous `meta keywords` element was removed because Google says it is ignored for search indexing and ranking.[2]

## Sustainable ways to improve visibility

Publish useful, original pages that answer specific questions MCP users actually search for. High-value additions include a tested setup guide for each supported client, detailed tool pages with worked synthetic examples, clear formula sources and limitations, and release notes that stay synchronized with the package. Keep claims precise: the server is local stdio software, PyPI and GitHub may carry different tool counts until the next release, and the calculations do not provide clinical interpretation.

Invite natural links by adding the project website to the package README, the developer profile, release notes, and relevant MCP directories. Seek genuine community citations; avoid buying links, repeating keywords unnaturally, or publishing thin generated pages. Keep client setup, screenshots, examples, and release information current.

Review Search Console and Bing Webmaster performance reports monthly. Track impressions, clicks, click-through rate, and the actual queries and landing pages that produce them. Use those observations to update page content and navigation. Search-engine processing takes time, so evaluate changes over several weeks rather than expecting a same-day rank change.[1]

## References

[1]: https://developers.google.com/search/docs/fundamentals/seo-starter-guide "Google Search Engine Optimization (SEO) Starter Guide"
[2]: https://developers.google.com/search/docs/crawling-indexing/special-tags "Meta Tags and Attributes that Google Supports"
[3]: https://blogs.bing.com/webmaster/september-2019/Import-sites-from-Search-Console-to-Bing-Webmaster-Tools "Easily Verify Your Site in Bing Webmaster Tools by Importing from Google Search Console"
[4]: https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data "Introduction to Structured Data Markup in Google Search"
