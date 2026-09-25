import { createElement } from "react";
import { renderToString } from "react-dom/server";
import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { createServer } from "vite";
import { Router } from "wouter";

const outputPath = resolve("dist/public/index.html");
const root = '<div id="root"></div>';
const htmlDocument = readFileSync(outputPath, "utf8");

if (!htmlDocument.includes(root)) {
  throw new Error(`Could not find the empty React root in ${outputPath}`);
}

const vite = await createServer({
  appType: "custom",
  server: { middlewareMode: true },
});

try {
  const { default: App } = await vite.ssrLoadModule("/src/App.tsx");
  const markup = renderToString(createElement(Router, { ssrPath: "/" }, createElement(App)));

  if (!markup.includes("Clinical calculations.") || !markup.includes("CHOOSE YOUR TRACK")) {
    throw new Error("Pre-rendered homepage is missing expected public content.");
  }

  writeFileSync(outputPath, htmlDocument.replace(root, `<div id="root">${markup}</div>`));
  console.log(`Pre-rendered ${markup.length} characters of homepage HTML into ${outputPath}`);
} finally {
  await vite.close();
}
