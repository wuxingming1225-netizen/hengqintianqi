# T3 Team, Takeout Route, and Scroll Performance Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Expand the site to 10 team members, replace the takeout guide with three supplied route photos, add takeout and courier addresses, and reduce long-page scroll jank.

**Architecture:** Preserve the existing single-page Vinext structure. Keep content in `app/page.tsx`, visual behavior in `app/globals.css`, and extend the existing rendered-HTML test so each content and performance change follows a red-green cycle. Optimize the three supplied photos into fixed-size local JPEG assets before referencing them.

**Tech Stack:** Vinext, React 19, TypeScript, CSS, Node test runner, macOS `sips`, Sites hosting.

## Global Constraints

- Preserve the existing blue-white Apple-inspired visual direction and section order.
- Keep the original seven team members and their order unchanged.
- Add one engineering manager and two security department leads with name, photo, and phone marked as pending.
- Keep `xxxx号房` exactly as the intentional courier-address placeholder.
- Use only the three user-supplied takeout route photos, in the approved order.
- Do not add new runtime dependencies or client-side state.
- Preserve the existing `.openai/hosting.json` project binding.

---

### Task 1: Expand the property team to 10 members

**Files:**
- Modify: `tests/rendered-html.test.mjs`
- Modify: `app/page.tsx`
- Modify: `app/globals.css`

**Interfaces:**
- Consumes: existing `team` array and `.team-grid` card styles.
- Produces: `supportTeam` array with indices `08`–`10`, a `专业支持团队` group, and desktop hierarchy of one wide manager card followed by two lead cards.

- [ ] **Step 1: Write the failing team-content assertions**

Add these assertions inside `renders the T3 property service site`, after the existing member-order assertions:

```js
  assert.match(html, /认识10位专属服务伙伴/);
  assert.match(html, /专业支持团队/);
  assert.match(html, /工程部经理/);
  assert.match(html, /安管部负责人/);
  assert.equal((html.match(/姓名待补充/g) ?? []).length, 3);
  assert.ok(html.indexOf("刘嘉欣") < html.indexOf("工程部经理"));
  assert.ok(html.indexOf("工程部经理") < html.indexOf("安管部负责人"));
```

- [ ] **Step 2: Run the test and verify RED**

Run:

```bash
PATH='/Users/xingming/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin:/Users/xingming/.cache/codex-runtimes/codex-primary-runtime/dependencies/bin/override:/Users/xingming/.cache/codex-runtimes/codex-primary-runtime/dependencies/bin/fallback:'"$PATH" pnpm run build
/Users/xingming/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node --test tests/rendered-html.test.mjs
```

Expected: FAIL because `认识10位专属服务伙伴` and the three new roles are absent.

- [ ] **Step 3: Add the support-team data and markup**

In `app/page.tsx`, add this array immediately after `team`:

```tsx
const supportTeam = [
  {
    index: "08",
    role: "工程部经理",
    tag: "工程统筹",
    name: "姓名待补充",
    range: "T3 工程运维全域",
    duties: "统筹设施设备运行、工程维修、施工协调与现场技术支持。",
    phone: "电话待补充",
    featured: true,
  },
  {
    index: "09",
    role: "安管部负责人",
    tag: "安全管理",
    name: "姓名待补充",
    range: "T3 公共区域",
    duties: "负责安全秩序、消防巡查、突发事件响应与现场协同。",
    phone: "电话待补充",
  },
  {
    index: "10",
    role: "安管部负责人",
    tag: "秩序保障",
    name: "姓名待补充",
    range: "T3 公共区域",
    duties: "负责重点区域巡查、人员车辆秩序与日常安全服务保障。",
    phone: "电话待补充",
  },
];
```

Change the directory subtitle to:

```tsx
<small>认识10位专属服务伙伴</small>
```

After the existing `.team-grid`, render the approved support group using the same card markup:

```tsx
<div className="team-subheading">
  <span className="section-kicker">PROFESSIONAL SUPPORT</span>
  <h3>专业支持团队</h3>
</div>
<div className="team-grid support-team-grid">
  {supportTeam.map((person) => (
    <article className={`person-card${person.featured ? " featured" : ""}`} key={person.index}>
      <div className="person-photo">
        <div className="photo-placeholder">
          <span className="person-silhouette"><i /></span>
          <small>照片待补充</small>
        </div>
        <span className="person-index">{person.index}</span>
        <span className="person-tag">{person.tag}</span>
      </div>
      <div className="person-info">
        <div className="role-row"><div><span>{person.name}</span><h3>{person.role}</h3></div><span className="arrow">↗</span></div>
        <p>{person.duties}</p>
        <div className="person-meta"><span>⌖ {person.range}</span><span>☎ {person.phone}</span></div>
      </div>
    </article>
  ))}
</div>
```

Add these styles after `.team-grid` in `app/globals.css`:

```css
.team-subheading { margin: 58px 0 24px; }
.team-subheading h3 { margin: 12px 0 0; font-size: 30px; letter-spacing: -.04em; }
.support-team-grid .person-card.featured { grid-column: span 2; }
```

- [ ] **Step 4: Run the test and verify GREEN**

Run the same build and Node test commands. Expected: PASS.

- [ ] **Step 5: Commit the team expansion**

```bash
git add tests/rendered-html.test.mjs app/page.tsx app/globals.css
git commit -m "feat: add engineering and security team cards"
```

---

### Task 2: Replace the takeout guide and add service addresses

**Files:**
- Modify: `tests/rendered-html.test.mjs`
- Create: `public/takeout-step-1.jpg`
- Create: `public/takeout-step-2.jpg`
- Create: `public/takeout-step-3.jpg`
- Modify: `app/page.tsx`
- Modify: `app/globals.css`

**Interfaces:**
- Consumes: three supplied JPEG files and the existing takeout route card.
- Produces: `takeoutSequence` objects with `src`, `label`, and `alt`; three fixed 1600×900 web assets; `.route-address-grid` with two address cards.

- [ ] **Step 1: Write the failing route and address assertions**

Add these assertions to the rendered-site test:

```js
  assert.match(html, /01 · 低区电梯厅左转/);
  assert.match(html, /02 · 通道终点左转/);
  assert.match(html, /03 · 直走抵达外卖柜/);
  assert.ok(html.indexOf("低区电梯厅左转") < html.indexOf("通道终点左转"));
  assert.ok(html.indexOf("通道终点左转") < html.indexOf("直走抵达外卖柜"));
  assert.match(html, /广东省珠海市香洲区横琴跨境电商（华发）创新产业园T3栋拓展区高区负一外卖柜/);
  assert.match(html, /广东省珠海市香洲区横琴跨境电商（华发）创新产业园T3栋拓展区xxxx号房/);
  assert.doesNotMatch(html, /takeout-route\.png/);
```

Add these entries to the asset `Promise.all`:

```js
    access(new URL("public/takeout-step-1.jpg", projectRoot)),
    access(new URL("public/takeout-step-2.jpg", projectRoot)),
    access(new URL("public/takeout-step-3.jpg", projectRoot)),
```

Remove the old `public/takeout-route.png` access assertion.

- [ ] **Step 2: Run the test and verify RED**

Run the standard build and Node test commands. Expected: FAIL because the new route labels, addresses, and assets do not exist.

- [ ] **Step 3: Optimize the supplied photos into local web assets**

Run:

```bash
sips -Z 1600 -s format jpeg -s formatOptions 82 '/var/folders/n_/1c8rvhfj7ql9y9bbc5h8mfc40000gn/T/codex-clipboard-397e73da-f4cc-4f0d-84ee-78523d28dc08.jpg' --out public/takeout-step-1.jpg
sips -Z 1600 -s format jpeg -s formatOptions 82 '/var/folders/n_/1c8rvhfj7ql9y9bbc5h8mfc40000gn/T/codex-clipboard-09dbaf85-a876-46d1-a049-125acc967463.jpg' --out public/takeout-step-2.jpg
sips -Z 1600 -s format jpeg -s formatOptions 82 '/var/folders/n_/1c8rvhfj7ql9y9bbc5h8mfc40000gn/T/codex-clipboard-47d77493-ab43-4d1c-83b5-38ce78d7a1b2.jpg' --out public/takeout-step-3.jpg
```

Expected: three 1600×900 JPEG files.

- [ ] **Step 4: Replace the takeout data and gallery markup**

In `app/page.tsx`, set the takeout guide image to `/takeout-step-1.jpg`, remove the obsolete `imagePending` status, and update the first step to the full approved takeout address.

Replace `takeoutSequence` with:

```tsx
const takeoutSequence = [
  { src: "/takeout-step-1.jpg", label: "低区电梯厅左转", alt: "从负一层低区电梯厅向左转" },
  { src: "/takeout-step-2.jpg", label: "通道终点左转", alt: "沿通道前行并在终点向左转" },
  { src: "/takeout-step-3.jpg", label: "直走抵达外卖柜", alt: "直行抵达高区负一层外卖柜" },
];
```

Render the gallery and addresses as:

```tsx
<div className="takeout-gallery" aria-label="外卖取餐路线步骤">
  {takeoutSequence.map((step, index) => (
    <a href={step.src} target="_blank" rel="noreferrer" key={step.src} className="takeout-step">
      <img src={step.src} alt={step.alt} width="1600" height="900" loading="lazy" decoding="async" />
      <span>{String(index + 1).padStart(2, "0")} · {step.label}</span>
    </a>
  ))}
</div>
<div className="route-address-grid" aria-label="外卖与快递地址">
  <div><span>TAKEOUT ADDRESS</span><strong>外卖地址</strong><p>广东省珠海市香洲区横琴跨境电商（华发）创新产业园T3栋拓展区高区负一外卖柜</p></div>
  <div><span>COURIER ADDRESS</span><strong>快递地址</strong><p>广东省珠海市香洲区横琴跨境电商（华发）创新产业园T3栋拓展区xxxx号房</p></div>
</div>
```

- [ ] **Step 5: Apply the approved three-card layout**

Replace the current takeout gallery styles with:

```css
.takeout-gallery { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; padding: 0 30px 18px; }
.takeout-step { display: grid; grid-template-rows: auto auto; overflow: hidden; border: 1px solid #d7e5f1; border-radius: 18px; background: #fff; box-shadow: 0 12px 30px rgba(28,79,132,.07); }
.takeout-step img { width: 100%; aspect-ratio: 16 / 9; object-fit: cover; transition: transform .4s ease; }
.takeout-step:hover img { transform: scale(1.02); }
.takeout-step span { padding: 15px 16px 16px; color: #183b61; background: #fff; font-size: 12px; font-weight: 650; }
.route-address-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 14px; padding: 0 30px 34px; }
.route-address-grid > div { min-width: 0; padding: 22px 24px; border: 1px solid #cfe3f6; border-radius: 20px; background: linear-gradient(145deg, #f7fbff, #eaf5ff); }
.route-address-grid span { display: block; color: #2878bd; font-size: 9px; font-weight: 750; letter-spacing: .14em; }
.route-address-grid strong { display: block; margin-top: 8px; font-size: 19px; }
.route-address-grid p { margin: 10px 0 0; color: #5e758b; font-size: 12px; line-height: 1.75; overflow-wrap: anywhere; }
```

In the existing mobile media query, use:

```css
  .takeout-gallery, .route-address-grid { grid-template-columns: 1fr; padding-inline: 16px; }
  .takeout-gallery { grid-auto-flow: row; overflow: visible; }
```

- [ ] **Step 6: Run the test and verify GREEN**

Run the standard build and Node test commands. Expected: PASS.

- [ ] **Step 7: Commit the takeout route update**

```bash
git add tests/rendered-html.test.mjs app/page.tsx app/globals.css public/takeout-step-1.jpg public/takeout-step-2.jpg public/takeout-step-3.jpg
git commit -m "feat: add takeout route photos and delivery addresses"
```

---

### Task 3: Reduce scroll-time rendering and image decoding work

**Files:**
- Modify: `tests/rendered-html.test.mjs`
- Modify: `app/page.tsx`
- Modify: `app/globals.css`

**Interfaces:**
- Consumes: all below-fold `<img>` elements and existing motion styles.
- Produces: lazy/async image loading, fixed image dimensions where known, deferred section rendering, and a non-blurred fixed topbar.

- [ ] **Step 1: Write the failing performance safeguards test**

Change the test import to:

```js
import { access, readFile } from "node:fs/promises";
```

Add:

```js
test("keeps scroll performance safeguards", async () => {
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
  const topbarRule = css.match(/\.topbar\s*\{[^}]*\}/s)?.[0] ?? "";

  assert.doesNotMatch(topbarRule, /backdrop-filter/);
  assert.match(css, /content-visibility:\s*auto/);
  assert.match(css, /contain-intrinsic-size:\s*auto\s+\d+px/);
  assert.match(css, /@media \(max-width: 700px\)[\s\S]*\.hero-orb\s*\{[^}]*display:\s*none/);
});
```

Inside the rendered HTML test, add:

```js
  const lazyImages = html.match(/<img[^>]+loading="lazy"[^>]+decoding="async"[^>]*>/g) ?? [];
  assert.ok(lazyImages.length >= 10);
```

- [ ] **Step 2: Run the test and verify RED**

Run the standard build and Node test commands. Expected: FAIL because the fixed topbar still uses `backdrop-filter`, section deferral is absent, and fewer than 10 images have lazy/async attributes.

- [ ] **Step 3: Add lazy decoding to below-fold images**

In `app/page.tsx`, add `loading="lazy" decoding="async"` to every below-fold image and use these exact intrinsic dimensions while retaining CSS control of rendered size:

```tsx
// lobby-supplies-kit.jpg
width="1810" height="1279"

// parking-apply.jpg
width="5032" height="3579"

// freight-arrival.jpg and freight-entrance.jpg
width="1707" height="1280"

// freight-route.jpg
width="1037" height="6583"

// temporary-parking-entrance.png
width="1672" height="941"

// takeout-step-1.jpg, takeout-step-2.jpg, and takeout-step-3.jpg
width="1600" height="900"
```

- [ ] **Step 4: Reduce expensive fixed and continuous effects**

In `app/globals.css`:

```css
.topbar {
  position: fixed; inset: 0 0 auto; z-index: 50; height: 74px; padding: 0 max(28px, calc((100vw - 1180px) / 2));
  display: flex; align-items: center; justify-content: space-between; color: #fff;
  background: linear-gradient(180deg, rgba(2,15,35,.92), rgba(2,15,35,.74) 70%, rgba(2,15,35,.46));
}
.team-section, .services, .routes, .guide, .contact-strip, footer {
  content-visibility: auto;
  contain-intrinsic-size: auto 900px;
}
```

Inside `@media (max-width: 700px)` add:

```css
  .hero-orb { display: none; }
  .hero-photo { animation: none; }
```

Inside a new hover-capability query add:

```css
@media (hover: none) {
  .person-card:hover, .service-card:hover, .primary-btn:hover, .glass-btn:hover { transform: none; }
  .route-visual:hover img, .takeout-step:hover img, .freight-step:hover img { transform: none; }
}
```

- [ ] **Step 5: Run tests, build, and lint**

Run:

```bash
PATH='/Users/xingming/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin:/Users/xingming/.cache/codex-runtimes/codex-primary-runtime/dependencies/bin/override:/Users/xingming/.cache/codex-runtimes/codex-primary-runtime/dependencies/bin/fallback:'"$PATH" pnpm run build
/Users/xingming/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node --test tests/rendered-html.test.mjs
PATH='/Users/xingming/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin:/Users/xingming/.cache/codex-runtimes/codex-primary-runtime/dependencies/bin/override:/Users/xingming/.cache/codex-runtimes/codex-primary-runtime/dependencies/bin/fallback:'"$PATH" pnpm run lint
```

Expected: all tests PASS, build exits 0, and lint exits 0.

- [ ] **Step 6: Commit the performance work**

```bash
git add tests/rendered-html.test.mjs app/page.tsx app/globals.css
git commit -m "perf: smooth long-page scrolling"
```

---

### Task 4: Publish and verify the updated private preview

**Files:**
- Modify only through the existing Sites version and deployment workflow; do not alter `.openai/hosting.json` unless the existing binding is missing.

**Interfaces:**
- Consumes: validated `main` branch HEAD and existing Sites `project_id`.
- Produces: a new saved version and successful private deployment at the existing site URL.

- [ ] **Step 1: Confirm the repository is clean and record HEAD**

```bash
git status --short
git rev-parse HEAD
```

Expected: no uncommitted files and one commit SHA.

- [ ] **Step 2: Push the exact source state with a short-lived Sites credential**

Request a source write credential for the existing project, then push `HEAD` to its configured branch without persisting the token.

- [ ] **Step 3: Package and save a Sites version**

Run the Sites packaging helper against the project directory and save a version using the same HEAD SHA and generated archive.

- [ ] **Step 4: Deploy privately and poll to a terminal state**

Use the private deployment operation and poll until `succeeded` or `failed`.

- [ ] **Step 5: Report the existing preview URL**

Expected URL:

```text
https://hengqin-t3-property-service.wuxingming1225.chatgpt.site
```
