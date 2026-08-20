# T3 Service and Access Refresh Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refresh the existing T3 property website so it presents a 9-person team, a consolidated lobby warm-service area, a separate parking-and-access area, the existing takeout and freight routes, and five confirmed FAQs.

**Architecture:** Keep the current single-page vinext/Next.js structure and its data-driven cards. Split the current mixed service and route data into three clear presentation groups inside `app/page.tsx`, add only the CSS selectors needed by those groups, and extend the rendered-HTML test so every confirmed content and removal rule is machine-checked.

**Tech Stack:** TypeScript, React 19, vinext, CSS, Node test runner, Cloudflare Sites.

## Global Constraints

- Preserve the existing blue-and-white Apple-inspired visual direction and long-page performance safeguards.
- Keep the original seven named team members, one engineering manager placeholder, and one security manager placeholder, for exactly nine people.
- Remove enterprise signage from data, page content, metadata, and tests.
- Keep one existing supplies card; add disposable towels, a hair dryer, and disposable slippers to its right-hand explanation without creating another row.
- Reserve equal photo positions for the umbrella machine, umbrella-cover machine, and umbrella water remover; the water remover uses chenille absorbent fabric and removes water after four to five side-to-side wipes.
- Keep lobby warm services separate from parking and access.
- Keep the confirmed takeout route, address cards, three takeout images, and freight-elevator route unchanged.
- Show exactly five confirmed FAQs.
- Update only the existing private preview after validation; do not publish publicly, purchase a domain, or change access permissions.

---

### Task 1: Lock the approved content into rendered-page tests

**Files:**
- Modify: `tests/rendered-html.test.mjs:15-100`

**Interfaces:**
- Consumes: HTML rendered by `dist/server/index.js`.
- Produces: Assertions that define the final team count, removals, section names, warm-service copy, access flow, routes, and FAQ set.

- [ ] **Step 1: Replace outdated team and service assertions**

Update the existing rendered-site test so it includes these exact checks:

```js
assert.match(html, /认识9位专属服务伙伴/);
assert.equal((html.match(/<span>姓名待补充<\/span>/g) ?? []).length, 2);
assert.equal((html.match(/安管部负责人/g) ?? []).length, 1);
assert.doesNotMatch(html, /企业门牌|广告字 \\/ 牌匾申请/);
assert.match(html, /大堂暖心服务/);
assert.match(html, /一次性毛巾/);
assert.match(html, /一次性拖鞋/);
assert.match(html, /雨伞机/);
assert.match(html, /雨伞套机/);
assert.match(html, /雨伞除水器/);
assert.match(html, /长柄和短柄雨伞/);
assert.match(html, /雪尼尔吸水面料/);
assert.match(html, /左右擦拭 4 至 5 次/);
```

- [ ] **Step 2: Add access and FAQ assertions**

Add the approved access and FAQ checks:

```js
assert.match(html, /停车与通行/);
assert.match(html, /访客抵达后在前台登记/);
assert.match(html, /提前联系需要到访企业的对接人/);
assert.match(html, /企业对接人将访客信息发送给对应客服管家报备/);
assert.match(html, /如何开通闸机权限？/);
assert.match(html, /临时报备停车怎么办理？/);
assert.match(html, /停车月卡如何申请？/);
assert.match(html, /雨天的暖心服务有哪些？/);
assert.match(html, /外卖取餐和18号货梯怎么走？/);
assert.equal((html.match(/<details/g) ?? []).length, 5);
```

- [ ] **Step 3: Run the rendered-page test and verify it fails**

Run:

```bash
npm run build
node --test tests/rendered-html.test.mjs
```

Expected: the rendered-site test fails because the page still says 10 people, contains enterprise signage, lacks the visitor and umbrella-machine sections, and has only three old FAQs.

- [ ] **Step 4: Commit the failing test**

```bash
git add tests/rendered-html.test.mjs
git commit -m "test: define service and access refresh"
```

---

### Task 2: Implement the approved content and section structure

**Files:**
- Modify: `app/page.tsx:1-520`
- Modify: `app/layout.tsx:10-29`
- Test: `tests/rendered-html.test.mjs`

**Interfaces:**
- Consumes: Existing team, lobby image, parking images, takeout images, and freight images from `public/`.
- Produces: `supportTeam` with two entries; `accessServices`, `lobbyServices`, `weatherServices`, `parkingGuides`, `routeGuides`, and the five-entry `faqs` array rendered in the approved page order.

- [ ] **Step 1: Reduce and reorganize the page data**

Make these data changes in `app/page.tsx`:

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
];

const accessServices = [
  {
    icon: "闸",
    title: "闸机权限",
    subtitle: "人员信息录入",
    text: "联系专属物业管家领取人员信息采集表，填写完成后发送管家录入。",
  },
  {
    icon: "访",
    title: "访客到访指引",
    subtitle: "前台登记 · 提前报备",
    steps: [
      "访客抵达后在前台登记",
      "提前联系需要到访企业的对接人",
      "企业对接人将访客信息发送给对应客服管家报备",
    ],
  },
];

const weatherServices = [
  {
    icon: "伞",
    title: "雨伞机",
    text: "提供免费雨伞借用服务。",
  },
  {
    icon: "套",
    title: "雨伞套机",
    text: "提供适用于长柄和短柄雨伞的雨伞套。",
  },
  {
    icon: "净",
    title: "雨伞除水器",
    text: "采用雪尼尔吸水面料，雨伞左右擦拭 4 至 5 次即可快速去除水滴。",
  },
];
```

Move the temporary-parking and monthly-parking entries from `routeGuides` into `parkingGuides`. Keep only takeout and freight entries in `routeGuides`. Update the supplies description to:

```tsx
text: "提供纸巾、女性用品、雨衣、针线包等领用品，以及一次性毛巾、吹风机、一次性拖鞋、维修工具、充电宝、测温枪等暖心借用品。",
```

- [ ] **Step 2: Replace the FAQ data with the five approved questions**

Use these exact question-and-answer pairs:

```tsx
const faqs = [
  ["如何开通闸机权限？", "联系专属物业管家领取人员信息采集表，填写完成后发送管家录入。"],
  ["临时报备停车怎么办理？", "车辆到达前请联系所属区域物业管家完成临时报备。临停仅限接送、接待等临时停靠，完成后请立即驶离，不得长期停放。"],
  ["停车月卡如何申请？", "进入“爱泊客”小程序，选择“横琴华发商都停车场”，上传资料并等待管家审核；审核通过后在线缴费。"],
  ["雨天的暖心服务有哪些？", "前台暖心物品包含一次性毛巾、吹风机和一次性拖鞋；雨伞机提供免费雨伞借用，雨伞套机提供适用于长柄和短柄雨伞的雨伞套；雨伞除水器采用雪尼尔吸水面料，左右擦拭 4 至 5 次即可快速去除水滴。"],
  ["外卖取餐和18号货梯怎么走？", "外卖请按负一层低区电梯厅、中央连廊、高区电梯厅的路线前往外卖柜；饮用水、快递及送货请从“森林子果蔬茶”旁侧通道前往专属18号货梯，施工材料须到负三层上下货。"],
];
```

- [ ] **Step 3: Rebuild the directory and lobby warm-service section**

Change the directory to four cards linking to `#team`, `#services`, `#access`, and `#routes`, with “认识9位专属服务伙伴” under personnel. Keep the quick links and point both parking links into `#access`.

Keep the existing `lobby-service-card` as the only warm-supplies row. Directly after it, render a rainy-day service heading and three equal `weather-service-card` articles. Each card must include a styled placeholder area with “照片待补充”, its device name, and its right-side service explanation.

- [ ] **Step 4: Create the separate parking-and-access section**

After the lobby section and before the route section, add:

```tsx
<section className="access-section" id="access">
  <div className="section-shell">
    <div className="section-heading">
      <div><span className="section-kicker">PARKING & ACCESS</span><h2>停车与通行</h2></div>
    </div>
    <div className="access-service-grid">{/* 闸机权限与访客到访指引 */}</div>
    <div className="parking-guide-grid">{/* 临时报备停车与停车月卡 */}</div>
  </div>
</section>
```

Render each `parkingGuides` entry with the same `parking-guide-card` structure: a fixed-ratio image link followed by a title and numbered steps. Do not use the old special temporary-parking overlay so the two image panels remain equal.

- [ ] **Step 5: Keep only takeout and freight inside route guidance**

Update the route heading to say “外卖与货梯路线”. Keep the existing takeout gallery, address cards, freight landmarks, five-step freight strip, and all image attributes. Remove the unreachable monthly-parking and temporary-parking rendering branches from the route map.

- [ ] **Step 6: Update metadata copy**

Change the Open Graph and X descriptions in `app/layout.tsx` to:

```tsx
description: "认识专属物业团队，快速查看大堂暖心服务、停车通行、外卖与货梯路线。",
```

- [ ] **Step 7: Run the rendered-page test**

Run:

```bash
npm run build
node --test tests/rendered-html.test.mjs
```

Expected: content assertions pass; CSS layout assertions added in Task 3 are not present yet.

- [ ] **Step 8: Commit the content implementation**

```bash
git add app/page.tsx app/layout.tsx
git commit -m "feat: reorganize property services and access"
```

---

### Task 3: Apply responsive layout, performance safeguards, and final verification

**Files:**
- Modify: `app/globals.css:8-370`
- Modify: `tests/rendered-html.test.mjs:100-140`

**Interfaces:**
- Consumes: The new class names rendered by Task 2.
- Produces: Three equal rainy-day equipment placeholders, equal parking image cards, responsive stacking, smooth anchor navigation, and preserved reduced-motion and content-visibility rules.

- [ ] **Step 1: Add CSS-level layout assertions**

Extend the performance test:

```js
assert.match(css, /\.weather-service-grid\s*\{[^}]*grid-template-columns:\s*repeat\(3,\s*1fr\)/s);
assert.match(css, /\.parking-guide-grid\s*\{[^}]*grid-template-columns:\s*repeat\(2,\s*1fr\)/s);
assert.match(css, /\.parking-guide-visual\s*\{[^}]*aspect-ratio:\s*16\s*\/\s*9/s);
assert.match(css, /@media \(max-width: 700px\)[\s\S]*\.weather-service-grid,\s*\.parking-guide-grid\s*\{[^}]*grid-template-columns:\s*1fr/s);
```

- [ ] **Step 2: Run the test and verify the CSS checks fail**

Run:

```bash
node --test tests/rendered-html.test.mjs
```

Expected: the content tests pass and the new CSS selector assertions fail.

- [ ] **Step 3: Add the minimal desktop styles**

Add focused styles for:

- `.weather-service-grid`: three equal columns under the existing supplies card.
- `.weather-service-card`: equal blue-white cards with a photo placeholder and explanation.
- `.access-section`: a visually distinct pale-blue section.
- `.access-service-grid`: two compact top cards.
- `.parking-guide-grid`: two equal columns.
- `.parking-guide-card`: identical structure for temporary parking and monthly parking.
- `.parking-guide-visual`: `aspect-ratio: 16 / 9`, consistent image crop, and the existing clear-original-image affordance.

Keep `content-visibility: auto` and `contain-intrinsic-size` on the new `access-section`.

- [ ] **Step 4: Add responsive styles**

At `max-width: 700px`, stack `.weather-service-grid`, `.access-service-grid`, and `.parking-guide-grid` to one column. Keep each parking visual at `16 / 9`, remove horizontal overflow, and retain the existing reduced-motion behavior.

- [ ] **Step 5: Run all verification in order**

Run:

```bash
npm run build
node --test tests/rendered-html.test.mjs
npm run lint
git diff --check
```

Expected: build succeeds, all Node tests pass, lint exits successfully, and `git diff --check` prints no errors.

- [ ] **Step 6: Commit the responsive layout**

```bash
git add app/globals.css tests/rendered-html.test.mjs
git commit -m "style: align warm service and parking layouts"
```

- [ ] **Step 7: Save and deploy the existing private preview**

Package the validated build with the Sites packaging helper, save one version for the existing `project_id`, deploy it privately, and poll until the deployment status is `succeeded`. Open the returned private URL in the current Codex browser without changing its access level.
