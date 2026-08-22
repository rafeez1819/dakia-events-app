import { chromium } from "playwright";
import { mkdirSync } from "fs";
mkdirSync("/workspace/screenshots", { recursive: true });
const browser = await chromium.launch({ headless: true, args: ["--no-sandbox", "--disable-dev-shm-usage"] });
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
const errors = [];
page.on("console", (msg) => { if (msg.type() === "error") errors.push("console:"+msg.text()); });
page.on("pageerror", (err) => errors.push("page:"+String(err?.message||err)));

await page.goto("http://127.0.0.1:8080/", { waitUntil: "domcontentloaded", timeout: 45000 });
await page.waitForTimeout(800);
const accept = page.getByRole("button", { name: /accept analytics/i });
if (await accept.count()) {
  await accept.click();
  await page.waitForTimeout(400);
}
await page.screenshot({ path: "/workspace/screenshots/home-after-consent.png", fullPage: false });

await page.goto("http://127.0.0.1:8080/intel", { waitUntil: "domcontentloaded", timeout: 45000 });
const loaded = await page.waitForFunction(() => document.body.innerText.includes("INTELLIGENCE") && /\d/.test(document.body.innerText) && !document.body.innerText.includes("Loading warehouse"), { timeout: 60000 }).then(() => true).catch(() => false);
const body = await page.locator("body").innerText();
await page.screenshot({ path: "/workspace/screenshots/intel-overview.png" });
console.log("intel_loaded", loaded);
console.log("intel_prefix", body.replace(/\s+/g," ").slice(0,400));
console.log("has_users", /USERS/i.test(body));
console.log("has_leads", /LEADS/i.test(body));
console.log("seeded", /seeded rows/i.test(body));

await page.getByRole("button", { name: /acquisition/i }).first().click();
await page.waitForTimeout(400);
await page.screenshot({ path: "/workspace/screenshots/intel-acquisition.png" });

await page.getByRole("button", { name: /^leads$/i }).first().click();
await page.waitForTimeout(400);
await page.screenshot({ path: "/workspace/screenshots/intel-leads.png" });

await page.getByRole("button", { name: /ai analyst/i }).first().click();
await page.waitForTimeout(300);
const gen = page.getByRole("button", { name: /generate daily intelligence/i });
if (await gen.count()) {
  await gen.click();
  await page.waitForTimeout(8000);
}
await page.screenshot({ path: "/workspace/screenshots/intel-ai.png" });
const aiBody = await page.locator("body").innerText();
console.log("ai_has_brief", /TRAFFIC|DAILY WEBSITE/i.test(aiBody));

await page.getByRole("button", { name: /realtime/i }).first().click();
await page.waitForTimeout(400);
await page.screenshot({ path: "/workspace/screenshots/intel-realtime.png" });

const mobile = await browser.newPage({ viewport: { width: 390, height: 844 } });
mobile.on("console", (msg) => { if (msg.type() === "error") errors.push("mconsole:"+msg.text()); });
await mobile.goto("http://127.0.0.1:8080/intel", { waitUntil: "domcontentloaded", timeout: 45000 });
await mobile.waitForTimeout(4000);
await mobile.screenshot({ path: "/workspace/screenshots/intel-mobile.png" });
const overflow = await mobile.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 2);
console.log("mobile_overflow", overflow);
console.log("errors", JSON.stringify(errors));
await browser.close();
