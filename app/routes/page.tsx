"use client";

/* eslint-disable @next/next/no-img-element */

import { useEffect, useRef, useState } from "react";
import { asset } from "../assets";
import ImageLightbox from "../image-lightbox";
import { PageHero, SectionTitle, SiteFooter, SiteHeader } from "../site-chrome";

type RouteSlide = readonly [image: string, title: string, text: string];
type RouteGroup = { label: string; eyebrow: string; intro: string; note: string; slides: readonly RouteSlide[] };
type ParkingAccessItem = { title: string; eyebrow: string; image: string; fullImage?: string; items: readonly string[] };

function parkingStep(number: number, title: string, text: string): RouteSlide {
  return [`/parking-route-step-${String(number).padStart(2, "0")}.webp`, title, text];
}

const b1LowMiddleSlides = [
  parkingStep(1, "从负一层入口左转", "车辆进入负一层后，按图示方向左转进入停车区域。"),
  parkingStep(2, "沿停车区域继续左转", "认准商场、酒店及公寓方向标识，沿车道继续左转。"),
  parkingStep(3, "跟随T3办公电梯厅标识", "停好车辆后，按“T3办公电梯厅”标识向右步行。"),
  parkingStep(5, "进入办公电梯厅通道", "进入通道后按图示方向右转。"),
  parkingStep(6, "沿连廊前往目标分区", "沿连廊直行，即可抵达对应办公分区电梯厅。"),
] as const;

const b1HighSuperSlides = [
  parkingStep(1, "从负一层入口左转", "车辆进入负一层后，按图示方向左转进入停车区域。"),
  parkingStep(2, "沿停车区域继续左转", "认准商场、酒店及公寓方向标识，沿车道继续左转。"),
  parkingStep(3, "跟随T3办公电梯厅标识", "停好车辆后，按“T3办公电梯厅”标识向右步行。"),
  parkingStep(4, "抵达写字楼办公电梯厅", "进入电梯厅后，选择目标办公分区电梯。"),
] as const;

const b23LowMiddleSlides = [
  parkingStep(7, "驶出通道后右转", "从负二层或负三层通道驶出后按图示方向右转。"),
  parkingStep(9, "在1分区路口直行", "抵达1分区路口后保持直行，继续沿车道前进。"),
  parkingStep(11, "沿B3方向继续直行", "认准B3、酒店及公寓方向标识后继续直行。"),
  parkingStep(12, "跟随T3办公电梯标识", "看到“T3办公电梯”标识后左转并就近停车。"),
  parkingStep(13, "抵达T3办公电梯入口", "停好车辆后步行进入T3办公电梯厅。"),
] as const;

const b23HighSuperSlides = [
  parkingStep(7, "下斜坡进入停车层", "沿斜坡驶入负二层或负三层，到达1分区。"),
  parkingStep(8, "在1分区左转即达", "抵达1分区后左转，即可到达高区、超高区办公电梯厅停车区域。"),
] as const;

type ParkingZoneKey = "low" | "middle" | "high" | "super";
type ParkingLevelKey = "b1" | "b23";

const parkingZones: Record<ParkingZoneKey, { label: string; floors: string; b1: readonly RouteSlide[]; b23: readonly RouteSlide[] }> = {
  low: { label: "低区", floors: "11–16F", b1: b1LowMiddleSlides, b23: b23LowMiddleSlides },
  middle: { label: "中区", floors: "17–27F", b1: b1LowMiddleSlides, b23: b23LowMiddleSlides },
  high: { label: "高区", floors: "28–38F", b1: b1HighSuperSlides, b23: b23HighSuperSlides },
  super: { label: "超高区", floors: "39–49F", b1: b1HighSuperSlides, b23: b23HighSuperSlides },
};

const parkingZoneKeys: ParkingZoneKey[] = ["low", "middle", "high", "super"];
const parkingLevelLabels: Record<ParkingLevelKey, string> = { b1: "B1 推荐路线", b23: "B2 / B3 路线" };

const routes = {
  freight: {
    label: "货梯路线指引",
    eyebrow: "FREIGHT ROUTE",
    intro: "饮用水、快递及送货统一使用专属 18 号货梯；施工材料运输请前往负三层 18 号货梯上下货。",
    note: "车辆请导航至“森林子果蔬茶”，到达后沿路边规范停车。",
    slides: [
      ["/freight-step-1.webp", "沿路边规范停车", "车辆到达后，按照现场秩序沿路边规范停放。"],
      ["/freight-step-2.webp", "找到旁侧入口", "从“森林子果蔬茶”旁侧入口进入室内通道。"],
      ["/freight-step-3.webp", "进入室内通道", "通过入口进入货梯专用室内通道。"],
      ["/freight-step-4.webp", "沿地面箭头直行", "沿地面 18 号货梯箭头继续直行。"],
      ["/freight-step-5.webp", "按箭头左转", "进入管控区域后，按照箭头方向左转。"],
      ["/freight-step-6.webp", "到达18号货梯", "到达专属货梯后，按现场要求完成运输。"],
    ],
  },
  takeout: {
    label: "外卖点指引",
    eyebrow: "TAKEOUT ROUTE",
    intro: "外卖存放点位于高区负一层外卖柜，低区客户请经中央连廊前往，核对信息后及时取走。",
    note: "取餐点设有 24 小时监控，请勿将物品长时间留置。",
    slides: [
      ["/takeout-step-1.webp", "低区电梯厅左转", "从负一层低区电梯厅出来后左转。"],
      ["/takeout-step-2-preview.svg", "通道终点左转", "沿中央连廊前行，在通道终点左转。"],
      ["/takeout-step-3.webp", "直走抵达外卖柜", "继续直行，即可到达高区负一层外卖柜。"],
    ],
  },
} satisfies Record<"freight" | "takeout", RouteGroup>;

type RouteKey = "access" | "parking" | keyof typeof routes;

const routeLabels: Record<RouteKey, string> = {
  access: "停车与通行",
  parking: "停车场指引",
  freight: "货梯路线指引",
  takeout: "外卖点指引",
};
const routeKeys: RouteKey[] = ["access", "parking", "freight", "takeout"];

const parkingAccess: readonly ParkingAccessItem[] = [
  {
    title: "访客与闸机通行",
    eyebrow: "VISITOR & ACCESS",
    image: "/access-gate-preview.jpg",
    items: ["闸机权限请联系专属管家领取人员信息采集表", "提交清晰正脸照，三个工作日内完成录入", "访客到达前由企业对接人联系对应管家报备", "访客抵达后在一楼前台完成登记"],
  },
  {
    title: "临时报备停车",
    eyebrow: "TEMPORARY PARKING",
    image: "/temporary-parking-entrance-preview.webp",
    items: ["车辆到达前联系所属区域物业管家报备", "仅限接送、接待等临时停靠", "完成接送或接待后请立即驶离", "临停区域不得长期停放"],
  },
  {
    title: "停车月卡申请",
    eyebrow: "PARKING APPLY",
    image: "/parking-apply.webp",
    fullImage: "/parking-apply.jpg",
    items: ["进入“爱泊客”小程序", "选择“横琴华发商都停车场”", "上传资料并等待管家审核", "审核通过后在线缴费，建议提前两个工作日申请"],
  },
  {
    title: "停车月卡缴费",
    eyebrow: "PARKING PAYMENT",
    image: "/parking-renewal.webp",
    fullImage: "/parking-renewal.jpg",
    items: ["在月卡到期前进入“长租套餐”完成续费", "逾期后原套餐自动失效", "逾期需结清临停费用并重新提交月租申请", "已生效费用不予退款，不可中途更换车牌"],
  },
];

function routeFromSearch(): RouteKey {
  const value = typeof window === "undefined" ? "" : new URLSearchParams(window.location.search).get("view");
  return value === "parking" || value === "freight" || value === "takeout" ? value : "access";
}

function parkingZoneFromSearch(): ParkingZoneKey {
  const value = typeof window === "undefined" ? "" : new URLSearchParams(window.location.search).get("zone");
  return value === "middle" || value === "high" || value === "super" ? value : "low";
}

function parkingLevelFromSearch(): ParkingLevelKey {
  return typeof window !== "undefined" && new URLSearchParams(window.location.search).get("level") === "b23" ? "b23" : "b1";
}

function revealRouteTab(container: HTMLDivElement | null, key: RouteKey) {
  requestAnimationFrame(() => {
    const button = container?.querySelector<HTMLButtonElement>(`[data-route="${key}"]`);
    if (container && button) container.scrollTo({ left: button.offsetLeft - (container.clientWidth - button.clientWidth) / 2 });
  });
}

export default function RoutesPage() {
  const [active, setActive] = useState<RouteKey>("access");
  const [step, setStep] = useState(0);
  const [parkingZone, setParkingZone] = useState<ParkingZoneKey>("low");
  const [parkingLevel, setParkingLevel] = useState<ParkingLevelKey>("b1");
  const track = useRef<HTMLDivElement>(null);
  const selector = useRef<HTMLDivElement>(null);
  const zone = parkingZones[parkingZone];
  const group: RouteGroup | null = active === "access" ? null : active === "parking" ? {
    label: `${zone.label}停车指引`,
    eyebrow: "PARKING GUIDE",
    intro: `当前查看${zone.label}（${zone.floors}）${parkingLevelLabels[parkingLevel]}，请跟随图片中的箭头及“T3办公电梯”标识通行。`,
    note: parkingLevel === "b1" ? "高区、超高区建议优先选择B1就近停车；低区、中区请按连廊标识前往对应电梯厅。" : "B2与B3使用同一路线，请按所在分区及现场标识规范通行。",
    slides: zone[parkingLevel],
  } : routes[active];

  useEffect(() => {
    const sync = () => { const key = routeFromSearch(); setActive(key); setParkingZone(parkingZoneFromSearch()); setParkingLevel(parkingLevelFromSearch()); setStep(0); revealRouteTab(selector.current, key); };
    sync();
    window.addEventListener("popstate", sync);
    return () => window.removeEventListener("popstate", sync);
  }, []);

  const choose = (key: RouteKey) => {
    setActive(key);
    setStep(0);
    const url = new URL(window.location.href);
    url.searchParams.set("view", key);
    url.hash = "";
    window.history.replaceState(null, "", url);
    revealRouteTab(selector.current, key);
  };

  const chooseParkingZone = (key: ParkingZoneKey) => {
    setParkingZone(key);
    setStep(0);
    const url = new URL(window.location.href);
    url.searchParams.set("view", "parking");
    url.searchParams.set("zone", key);
    url.searchParams.set("level", parkingLevel);
    window.history.replaceState(null, "", url);
  };

  const chooseParkingLevel = (key: ParkingLevelKey) => {
    setParkingLevel(key);
    setStep(0);
    const url = new URL(window.location.href);
    url.searchParams.set("view", "parking");
    url.searchParams.set("zone", parkingZone);
    url.searchParams.set("level", key);
    window.history.replaceState(null, "", url);
  };

  const move = (direction: number) => track.current?.scrollBy({ left: direction * (track.current.clientWidth * .78), behavior: "smooth" });

  return (
    <main>
      <SiteHeader active="routes" />
      <PageHero eyebrow="ROUTE GUIDANCE" title="路线指引" subtitle="清晰抵达，从容通行" image="/routes-hero-security.webp" imageClassName="route-security-hero" index="03" variant="large" />

      <section className="content-section route-page page-shell">
        <SectionTitle eyebrow="SELECT A ROUTE" title="选择您要查看的路线" intro="点击分类查看对应内容；分步路线支持左右滑动浏览。" />
        <div className="route-selector four-items" role="tablist" aria-label="路线分类" ref={selector}>{routeKeys.map((key, index) => <button type="button" role="tab" aria-selected={active === key} data-route={key} className={active === key ? "active" : ""} onClick={() => choose(key)} key={key}><span>0{index + 1}</span>{routeLabels[key]}</button>)}</div>

        {active === "access" && <section className="parking-access-section">
          <div className="subsection-heading"><span>PARKING & ACCESS</span><h2>停车与通行</h2><p>从来访报备到月卡办理，常用事项集中查看。</p></div>
          <div className="parking-access-grid">{parkingAccess.map((item) => <article className={item.fullImage ? "has-clear-image" : undefined} key={item.title}>
            <div className="parking-access-media">{item.fullImage
              ? <a className="parking-clear-link" href={asset(item.fullImage)} data-lightbox="image" aria-label={`${item.title}：在本页放大查看清晰原图`}><img src={asset(item.image)} alt={`${item.title}流程图，含小程序码`} loading="lazy" decoding="async" /><span className="parking-clear-cta">点击本页放大 · 长按识别小程序码</span></a>
              : <img src={asset(item.image)} alt={item.title} loading="lazy" decoding="async" />}</div>
            <span>{item.eyebrow}</span><h3>{item.title}</h3><ol>{item.items.map((text) => <li key={text}>{text}</li>)}</ol>
          </article>)}</div>
        </section>}

        {active === "parking" && <section className="parking-zone-panel" aria-label="选择停车办公分区">
          <div className="parking-zone-heading"><div><span>CHOOSE OFFICE ZONE</span><h2>四个办公分区停车指引</h2></div><p>先选择目标办公分区，再按停车楼层查看完整路线。</p></div>
          <div className="parking-zone-selector" role="tablist" aria-label="办公分区">{parkingZoneKeys.map((key, index) => <button type="button" role="tab" aria-selected={parkingZone === key} className={parkingZone === key ? "active" : ""} onClick={() => chooseParkingZone(key)} key={key}><span>0{index + 1}</span><strong>{parkingZones[key].label}</strong><small>{parkingZones[key].floors}</small></button>)}</div>
          <div className="parking-level-selector" role="tablist" aria-label="停车楼层">{(["b1", "b23"] as ParkingLevelKey[]).map((key) => <button type="button" role="tab" aria-selected={parkingLevel === key} className={parkingLevel === key ? "active" : ""} onClick={() => chooseParkingLevel(key)} key={key}>{parkingLevelLabels[key]}</button>)}</div>
        </section>}

        {group && <div className="route-detail" key={`${active}-${parkingZone}-${parkingLevel}`}>
          <div className="route-detail-head"><div><span>{group.eyebrow}</span><h2>{group.label}</h2></div><p>{group.intro}</p><div><button type="button" onClick={() => move(-1)} aria-label="上一步">←</button><button type="button" onClick={() => move(1)} aria-label="下一步">→</button></div></div>
          <div className="route-slider" ref={track} onScroll={(event) => { const el = event.currentTarget; const items = Array.from(el.children) as HTMLElement[]; const nearest = items.reduce((best, item, index) => Math.abs(item.offsetLeft - el.scrollLeft) < Math.abs(items[best].offsetLeft - el.scrollLeft) ? index : best, 0); setStep(nearest); }}>
            {group.slides.map(([image, title, text], index) => <article key={title}><div><img src={asset(image)} alt={title} loading="lazy" decoding="async" /><span>{String(index + 1).padStart(2, "0")}</span></div><h3>{title}</h3><p>{text}</p></article>)}
          </div>
          <div className="route-status"><div>{group.slides.map((item, index) => <i className={index === step ? "active" : ""} key={item[1]} />)}</div><p>{group.note}</p></div>
        </div>}
      </section>

      <ImageLightbox />
      <SiteFooter />
    </main>
  );
}
