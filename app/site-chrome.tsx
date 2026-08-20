"use client";

/* eslint-disable @next/next/no-img-element */

import { useState } from "react";
import { asset, pageHref } from "./assets";

type Section = "project" | "services" | "routes" | "contact";

export function SiteHeader({ active }: { active: Section }) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className="site-header">
      <a className="site-brand" href={pageHref("/")} onClick={close} aria-label="横琴天啟 T3 首页">
        <span className="site-brand-mark"><img src={asset("/t3-building-logo-transparent.webp")} alt="" width="256" height="542" decoding="async" /></span>
        <span><strong>横琴天啟 T3</strong><small>PROPERTY SERVICE</small></span>
      </a>
      <button className="menu-toggle" type="button" onClick={() => setOpen(!open)} aria-expanded={open} aria-label="打开导航"><span /><span /></button>
      <nav className={open ? "main-nav is-open" : "main-nav"} aria-label="主导航" onClick={(event) => { if (event.target === event.currentTarget) close(); }}>
        <div className={`nav-group ${active === "project" ? "active" : ""}`}>
          <a href={pageHref("/")} onClick={close}>横琴T3</a>
          <div className="nav-dropdown"><a href={pageHref("/#overview")} onClick={close}>项目概况</a><a href={pageHref("/#security-management")} onClick={close}>24小时安全管理</a></div>
        </div>
        <div className={`nav-group ${active === "services" ? "active" : ""}`}>
          <a href={pageHref("/services/")} onClick={close}>服务信息</a>
          <div className="nav-dropdown">
            <a href={pageHref("/services/#premium")} onClick={close}>甄品服务</a>
            <a href={pageHref("/services/#sanitation")} onClick={close}>消杀服务</a>
            <a href={pageHref("/services/#rainy")} onClick={close}>雨天暖心服务</a>
          </div>
        </div>
        <div className={`nav-group ${active === "routes" ? "active" : ""}`}>
          <a href={pageHref("/routes/")} onClick={close}>路线指引</a>
          <div className="nav-dropdown">
            <a href={pageHref("/routes/?view=access")} onClick={close}>停车与通行</a>
            <a href={pageHref("/routes/?view=parking")} onClick={close}>停车场指引</a>
            <a href={pageHref("/routes/?view=freight")} onClick={close}>货梯路线指引</a>
            <a href={pageHref("/routes/?view=takeout")} onClick={close}>外卖点指引</a>
          </div>
        </div>
        <div className={`nav-group ${active === "contact" ? "active" : ""}`}><a href={pageHref("/contact/")} onClick={close}>联系我们</a></div>
      </nav>
      <a className="header-call" href="tel:07568696992"><span />24H 应急热线</a>
    </header>
  );
}

export function PageHero({ eyebrow, title, subtitle, image, index, variant, imageClassName }: { eyebrow: string; title: string; subtitle?: string; image: string; index: string; variant?: "large"; imageClassName?: string }) {
  return (
    <section className={`page-hero ${variant === "large" ? "home-hero" : ""}`}>
      <img className={imageClassName} src={asset(image)} alt="" decoding="async" fetchPriority="high" />
      <div className="page-hero-shade" />
      <div className="page-hero-copy page-shell">
        <span>{eyebrow}</span>
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
      </div>
      <div className="page-index"><b>{index}</b><i /><small>04</small></div>
    </section>
  );
}

export function SectionTitle({ eyebrow, title, intro }: { eyebrow: string; title: string; intro?: string }) {
  return <div className="section-title"><div><span>{eyebrow}</span><h2>{title}</h2></div>{intro && <p>{intro}</p>}</div>;
}

export function SiteFooter() {
  return (
    <footer>
      <div className="page-shell footer-inner">
        <a className="footer-brand" href={pageHref("/")}><span className="footer-logo"><img src={asset("/t3-building-logo-transparent.webp")} alt="" width="256" height="542" loading="lazy" decoding="async" /></span><span>横琴天啟 T3<br /><small>PROPERTY SERVICE</small></span></a>
        <p>珠海华发物业服务有限公司</p>
        <p>© 2026 HUAFA PROPERTY. ALL RIGHTS RESERVED.</p>
      </div>
    </footer>
  );
}
