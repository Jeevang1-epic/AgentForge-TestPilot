import { chromium } from "@playwright/test";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const baseUrl = process.env.SCREENSHOT_BASE_URL ?? "http://localhost:3000";
const rootDir = fileURLToPath(new URL("..", import.meta.url));
const outputDir = path.join(rootDir, "public", "screenshots");
const viewport = { width: 1440, height: 1100 };

const captures = [
  {
    file: "release-critical-failure.png",
    path: "/release-check",
    selector: '[data-screenshot="release-critical-failure"]',
  },
  {
    file: "evidence-report-preview.png",
    path: "/release-check",
    selector: '[data-screenshot="evidence-report-preview"]',
  },
  {
    file: "uipath-proof-layer.png",
    path: "/release-check",
    selector: '[data-screenshot="uipath-proof-layer"]',
  },
];

async function openPage(page, route) {
  await page.goto(`${baseUrl}${route}`, { waitUntil: "networkidle" });
}

async function captureElement(page, capture) {
  await openPage(page, capture.path);
  const locator = page.locator(capture.selector).first();
  await locator.waitFor({ state: "visible", timeout: 15000 });
  await locator.scrollIntoViewIfNeeded();
  await page.waitForTimeout(200);
  await locator.screenshot({
    path: path.join(outputDir, capture.file),
  });
}

async function main() {
  await mkdir(outputDir, { recursive: true });

  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport });

  try {
    await page.emulateMedia({ reducedMotion: "reduce" });

    await openPage(page, "/");
    await page.screenshot({
      fullPage: true,
      path: path.join(outputDir, "homepage-full.png"),
    });
    await page.screenshot({
      path: path.join(outputDir, "homepage-viewport.png"),
    });

    await openPage(page, "/release-check");
    await page.screenshot({
      fullPage: true,
      path: path.join(outputDir, "release-check-full.png"),
    });
    await page.screenshot({
      path: path.join(outputDir, "release-check-viewport.png"),
    });

    for (const capture of captures) {
      await captureElement(page, capture);
    }
  } finally {
    await browser.close();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
