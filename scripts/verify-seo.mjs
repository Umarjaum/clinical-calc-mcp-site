import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const output = resolve("dist/public");
const html = readFileSync(resolve(output, "index.html"), "utf8");
const robots = readFileSync(resolve(output, "robots.txt"), "utf8");
const sitemap = readFileSync(resolve(output, "sitemap.xml"), "utf8");
const manifest = JSON.parse(readFileSync(resolve(output, "site.webmanifest"), "utf8"));

assert.match(html, /<meta name="google-site-verification" content="0W4sF1TWTIf8yfSTtPjIX9fMos2WQuaG1jg022W-A-c"\s*\/>/);
assert.match(html, /<meta name="msvalidate\.01" content="F124A4A251C42776373657208F2ECF93"\s*\/>/);
assert.match(html, /<link rel="canonical" href="https:\/\/clinical-calc-mcp\.pages\.dev\/"\s*\/>/);
assert.match(html, /<title>Clinical Calc MCP \| Python MCP Server for Clinical Calculations<\/title>/);
assert.doesNotMatch(html, /<meta name="keywords"/i);

const rootStart = html.indexOf('<div id="root">');
const bodyEnd = html.indexOf("</body>", rootStart);
assert.ok(rootStart >= 0 && bodyEnd > rootStart, "Homepage root should contain server-rendered content");
const prerendered = html.slice(rootStart, bodyEnd);
for (const expected of [
  "Clinical calculations.",
  "CHOOSE YOUR TRACK",
  "parkland_formula",
  "bsa_mosteller",
  "vital_signs_summary",
  "drip_rate_calculator",
  "temperature_converter",
  "weight_converter",
  "Developer: Muhammad Umar Jabbar",
  "Search visibility",
]) {
  assert.ok(prerendered.includes(expected), `Pre-rendered page is missing ${expected}`);
}

const jsonLdMatch = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
assert.ok(jsonLdMatch, "JSON-LD structured data should be present");
const jsonLd = JSON.parse(jsonLdMatch[1]);
const graph = jsonLd["@graph"];
assert.ok(graph.some((item) => item["@type"] === "WebSite"));
assert.ok(graph.some((item) => item["@type"] === "SoftwareSourceCode" && item.creator?.["@id"] === "https://umarjaum.netlify.app/#developer"));
assert.ok(graph.some((item) => item["@type"] === "Person" && item.name === "Muhammad Umar Jabbar" && item.url === "https://umarjaum.netlify.app/"));

assert.match(robots, /^User-agent: \*\s*Allow: \/\s*Sitemap: https:\/\/clinical-calc-mcp\.pages\.dev\/sitemap\.xml\s*$/m);
assert.match(sitemap, /<loc>https:\/\/clinical-calc-mcp\.pages\.dev\/<\/loc>/);
assert.match(sitemap, /<lastmod>2026-09-25<\/lastmod>/);
assert.match(manifest.description, /six validated clinical calculation tools/i);

console.log("SEO verification passed: ownership tags, server-rendered content, developer schema, canonical, robots, sitemap and manifest.");
