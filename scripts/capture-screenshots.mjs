import { chromium } from "@playwright/test";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const baseUrl = process.env.SCREENSHOT_BASE_URL ?? "http://localhost:3000";
const rootDir = fileURLToPath(new URL("..", import.meta.url));
const outputDir = path.join(rootDir, "public", "screenshots");
const viewport = { width: 1440, height: 1100 };
const screenshotOptions = { animations: "disabled" };

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
  {
    file: "uipath-integration-readiness.png",
    path: "/release-check",
    selector: '[data-screenshot="uipath-integration-readiness"]',
  },
];

async function openPage(page, route) {
  await page.goto(`${baseUrl}${route}`, { waitUntil: "networkidle" });
  await page.addStyleTag({
    content: `
      html { scroll-behavior: auto !important; }
      *, *::before, *::after {
        animation-delay: 0s !important;
        animation-duration: 0s !important;
        caret-color: transparent !important;
        transition-delay: 0s !important;
        transition-duration: 0s !important;
      }
      [data-motion-reveal="true"] {
        opacity: 1 !important;
        transform: none !important;
      }
    `,
  });
  await page.evaluate(() => document.fonts?.ready);
}

async function settlePage(page) {
  await page.waitForTimeout(700);
  await page.evaluate(async () => {
    const delay = (duration) =>
      new Promise((resolve) => {
        setTimeout(resolve, duration);
      });
    const height = document.documentElement.scrollHeight;
    const step = Math.max(window.innerHeight * 0.75, 500);

    for (let y = 0; y < height; y += step) {
      window.scrollTo(0, y);
      await delay(120);
    }

    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(500);
}

async function captureElement(page, capture) {
  await openPage(page, capture.path);
  const locator = page.locator(capture.selector).first();
  await locator.waitFor({ state: "visible", timeout: 15000 });
  await locator.scrollIntoViewIfNeeded();
  await page.waitForTimeout(650);
  await locator.screenshot({
    ...screenshotOptions,
    path: path.join(outputDir, capture.file),
  });
}

async function main() {
  await mkdir(outputDir, { recursive: true });

  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport });

  try {
    await openPage(page, "/");
    await settlePage(page);
    await page.screenshot({
      ...screenshotOptions,
      fullPage: true,
      path: path.join(outputDir, "homepage-full.png"),
    });
    await page.screenshot({
      ...screenshotOptions,
      path: path.join(outputDir, "homepage-viewport.png"),
    });

    await openPage(page, "/release-check");
    await settlePage(page);
    await page.screenshot({
      ...screenshotOptions,
      fullPage: true,
      path: path.join(outputDir, "release-check-full.png"),
    });
    await page.screenshot({
      ...screenshotOptions,
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
