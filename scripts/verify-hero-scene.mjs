import { mkdir } from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright-core";

const url = process.env.VERIFY_URL || "http://127.0.0.1:3001/";
const chromePath =
  process.env.CHROME_PATH || "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const outDir = path.join(process.cwd(), ".codex-dev");

const viewports = [
  { name: "desktop", width: 1440, height: 1000 },
  { name: "mobile", width: 390, height: 844 },
];

async function sampleCanvas(page) {
  return page.evaluate(() => {
    const canvas = document.querySelector("canvas");

    if (!(canvas instanceof HTMLCanvasElement)) {
      throw new Error("Canvas not found");
    }

    const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");

    if (!gl) {
      throw new Error("WebGL context not found");
    }

    const width = gl.drawingBufferWidth;
    const height = gl.drawingBufferHeight;
    const points = [];
    const pixel = new Uint8Array(4);
    let litPixels = 0;
    let rightLitPixels = 0;
    let colorTotal = 0;

    for (let y = 0; y < 12; y++) {
      for (let x = 0; x < 18; x++) {
        const px = Math.max(0, Math.min(width - 1, Math.round(((x + 0.5) / 18) * width)));
        const py = Math.max(0, Math.min(height - 1, Math.round(((y + 0.5) / 12) * height)));
        gl.readPixels(px, py, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, pixel);

        const brightness = pixel[0] + pixel[1] + pixel[2];
        colorTotal += brightness;

        if (pixel[3] > 0 && brightness > 24) {
          litPixels++;

          if (px > width * 0.56) {
            rightLitPixels++;
          }
        }

        points.push([pixel[0], pixel[1], pixel[2], pixel[3]]);
      }
    }

    return {
      width,
      height,
      litPixels,
      rightLitPixels,
      colorTotal,
      points,
    };
  });
}

function frameDifference(first, second) {
  return first.points.reduce((total, point, index) => {
    const next = second.points[index];
    return (
      total +
      Math.abs(point[0] - next[0]) +
      Math.abs(point[1] - next[1]) +
      Math.abs(point[2] - next[2])
    );
  }, 0);
}

await mkdir(outDir, { recursive: true });

const browser = await chromium.launch({
  executablePath: chromePath,
  headless: true,
  args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"],
});

try {
  const results = [];

  for (const viewport of viewports) {
    const page = await browser.newPage({ viewport });
    page.on("console", (message) => {
      if (message.type() === "error") {
        console.error(`[${viewport.name} console] ${message.text()}`);
      }
    });
    page.on("pageerror", (error) => {
      console.error(`[${viewport.name} pageerror] ${error.message}`);
    });
    await page.goto(url, { waitUntil: "networkidle" });
    await page.waitForSelector("canvas", { state: "attached" });
    await page.waitForTimeout(500);

    const first = await sampleCanvas(page);
    await page.waitForTimeout(900);
    const second = await sampleCanvas(page);
    const diff = frameDifference(first, second);
    const screenshot = path.join(outDir, `hero-scene-${viewport.name}.png`);

    await page.screenshot({ path: screenshot, fullPage: false });

    results.push({
      viewport: viewport.name,
      screenshot,
      width: first.width,
      height: first.height,
      litPixels: first.litPixels,
      rightLitPixels: first.rightLitPixels,
      frameDifference: diff,
      nonBlank: first.litPixels > 18,
      rightSideVisible: first.rightLitPixels > 4,
      moving: diff > 120,
    });

    await page.close();
  }

  console.log(JSON.stringify(results, null, 2));

  const failed = results.filter(
    (result) => !result.nonBlank || !result.rightSideVisible || !result.moving,
  );

  if (failed.length > 0) {
    process.exitCode = 1;
  }
} finally {
  await browser.close();
}
