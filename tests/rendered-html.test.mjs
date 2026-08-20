import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const projectRoot = new URL("../", import.meta.url);

async function render(path = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${path}`);
  const { default: worker } = await import(workerUrl.href);
  const response = await worker.fetch(new Request(`http://localhost${path}`, { headers: { accept: "text/html" } }), { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } }, { waitUntil() {}, passThroughOnException() {} });
  assert.equal(response.status, 200, path);
  return response.text();
}

test("keeps major information on separate IFC-style pages", async () => {
  const [project, services, routes, contact] = await Promise.all([render("/"), render("/services"), render("/routes"), render("/contact")]);
  const routesSource = await readFile(new URL("../app/routes/page.tsx", import.meta.url), "utf8");

  for (const text of ["横琴天啟 T3", "关于横琴天啟 T3", "总建筑面积", "主楼高度", "总楼层", "一眼读懂T3栋", "10F / 20F / 30F / 40F", "避难层", "94,332", "249", "SECURITY", "MANAGEMENT", "24小时周密安全管理", "实时监控", "严密管理", "消防管理", "风险管理", "应急预案", "设备安全", "守护企业生命线"])
    assert.match(project, new RegExp(text));
  assert.doesNotMatch(project, /总用地面积/);
  assert.doesNotMatch(project, /金融岛标杆商务地标|一座楼宇，一群用心的人/);
  assert.doesNotMatch(project, /Tight Management/);
  assert.match(project, /security-monitoring-v2\.png/);
  assert.match(project, /tight-security-management\.jpg/);
  assert.match(project, /equipment-safety\.png/);
  assert.match(project, /7×24 小时无间断安全管理，实时掌握楼宇安全动态。/);
  assert.doesNotMatch(project, /中央监控系统|身份识别系统|先进设备/);
  assert.doesNotMatch(project, /夜间货物进出|人车分流|客货分流|物流交接效率/);
  assert.doesNotMatch(project, /class="rainy-section"|class="content-section team-section/);

  for (const text of ["甄品服务", "消杀服务", "雨天暖心服务"])
    assert.match(services, new RegExp(text));
  assert.match(services, /premium-supplies-v2\.webp/);
  assert.match(services, /sanitation-service-single\.webp/);
  assert.match(services, /service-hero-reception\.webp/);
  assert.doesNotMatch(services, /class="parking-access-section"|服务影像预留|class="security-section"/);

  for (const text of ["停车与通行", "访客与闸机通行", "临时报备停车", "停车月卡申请", "停车月卡续费", "停车场指引", "货梯路线指引", "外卖点指引"])
    assert.match(routes, new RegExp(text));
  assert.match(routes, /route-selector four-items/);
  assert.match(routes, /routes-hero-security\.jpg/);
  assert.match(routes, /\?view=access/);
  for (const text of ["四个办公分区停车指引", "低区", "11–16F", "中区", "17–27F", "高区", "28–38F", "超高区", "39–49F", "B1 推荐路线", "B2 / B3 路线"])
    assert.match(routesSource, new RegExp(text));

  for (const person of ["吴幸明", "曾令慧", "何思慧", "刘大平", "周芷盈", "梁盼盼", "刘嘉欣", "刘六虎", "侯焕武"])
    assert.match(contact, new RegExp(person));
  assert.match(contact, /专业支持团队/);
  assert.match(contact, /0756-8696992/);
  assert.match(contact, /写字楼18–19 \/ 23–39层/);
  assert.match(contact, /写字楼11–17 \/ 21–22 \/ 41–49层/);
  assert.match(contact, /13226026617/);
  assert.match(contact, /17368289843/);
});

test("keeps required image assets available", async () => {
  const files = [
    "t3-building.jpg", "t3-building-logo-transparent.png", "t3-building-lineart.webp", "premium-supplies-v2.webp", "sanitation-service-single.webp", "security-monitoring-v2.png", "tight-security-management.jpg", "equipment-safety.png", "service-hero-reception.webp", "routes-hero-security.jpg", "t3-property-poster-v1.png",
    "shared-umbrella-station.webp", "umbrella-sleeve-machine.webp", "umbrella-dryer.webp", "shoe-polisher.webp",
    "access-gate-preview.jpg", "temporary-parking-entrance-preview.webp", "parking-apply.webp", "parking-renewal.webp",
    ...Array.from({ length: 13 }, (_, index) => `parking-route-step-${String(index + 1).padStart(2, "0")}-full.webp`),
    "wuxingming-cutout.webp", "zeng-linghui-cutout.webp", "he-sihui-cutout.webp", "liu-daping-cutout.webp",
    "zhou-zhiying-cutout.webp", "liang-panpan-cutout.webp", "liu-jiaxin-cutout.webp", "liu-liuhu-cutout.webp", "hou-huanwu-cutout.webp",
  ];
  await Promise.all(files.map((file) => access(new URL(`public/${file}`, projectRoot))));
});

test("keeps type, navigation and responsive presentation consistent", async () => {
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
  assert.match(css, /--display:\s*42px/);
  assert.match(css, /--heading:\s*32px/);
  assert.match(css, /scroll-snap-type:\s*x mandatory/);
  assert.match(css, /scroll-behavior:\s*smooth/);
  assert.match(css, /animation-timeline:\s*view\(\)/);
  const revealKeyframes = css.match(/@keyframes ifc-reveal\s*\{([\s\S]*?)\n\}/)?.[1] ?? "";
  assert.match(revealKeyframes, /filter:\s*blur\(/);
  const viewTimelineBlock = css.match(/@supports \(animation-timeline:\s*view\(\)\)\s*\{([\s\S]*?)\n\}/)?.[1] ?? "";
  assert.doesNotMatch(viewTimelineBlock, /security-story|tight-story/);
  assert.match(css, /\.parking-zone-selector/);
  assert.match(css, /\.route-selector \{ position: sticky/);
  assert.match(css, /\.nav-group:hover \.nav-dropdown/);
  assert.match(css, /@media \(max-width:\s*760px\)/);
  assert.match(css, /@media \(prefers-reduced-motion:\s*reduce\)/);
});
