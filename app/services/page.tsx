/* eslint-disable @next/next/no-img-element */

import { asset } from "../assets";
import ImageLightbox from "../image-lightbox";
import { PageHero, SectionTitle, SiteFooter, SiteHeader } from "../site-chrome";

const rainyServices = [
  { title: "免费共享雨伞", image: "/shared-umbrella-station.webp", text: "大堂提供免费雨伞借用服务，方便客户雨天出行。" },
  { title: "长短柄雨伞套", image: "/umbrella-sleeve-machine.webp", text: "雨伞套机同时适用于长柄和短柄雨伞，减少地面积水。" },
  { title: "雨伞快速除水", image: "/umbrella-dryer.webp", text: "雪尼尔吸水面料，放入后左右摇动 2 至 3 次即可快速除水。" },
  { title: "皮鞋清洁护理", image: "/shoe-polisher.webp", text: "配备皮鞋擦鞋机与皮鞋湿巾，保持通勤从容体面。" },
];

export default function ServicesPage() {
  return (
    <main>
      <SiteHeader active="services" />
      <PageHero eyebrow="SERVICE INFORMATION" title="服务信息" subtitle="精于细节，始终可靠" image="/service-hero-reception.webp" imageClassName="service-reception-hero" index="02" variant="large" />

      <section className="content-section page-shell">
        <SectionTitle eyebrow="OUR SERVICE" title="以专业回应每一次需要" intro="从日常所需到环境维护，华发物业用统一标准与细致服务，守护舒适、有序的办公体验。" />
        <nav className="inner-nav" aria-label="服务分类"><a href="#premium">臻品服务</a><a href="#sanitation">消杀服务</a><a href="#rainy">雨天暖心服务</a><a href="#paid-services">有偿服务价格公示表</a></nav>
      </section>

      <section className="service-block page-shell" id="premium">
        <div className="service-photo premium-photo"><img src={asset("/premium-supplies-v2.webp")} alt="T3 大堂臻品物资箱" width="1400" height="800" loading="lazy" decoding="async" /><span>01</span></div>
        <div className="service-text"><span>PREMIUM SERVICE</span><h2>臻品服务</h2><p>大堂臻品物资箱为客户提供干湿纸巾、女性用品、雨衣、针线包、后跟贴、漱口水、一次性毛巾、吹风机、充电宝、测温枪与日常维修工具等暖心物资。</p><ul><li>应急物品随取随用</li><li>便民物品登记借用</li><li>一楼大堂统一提供</li></ul></div>
      </section>

      <section className="service-block reverse compact-service page-shell" id="sanitation">
        <div className="service-photo sanitation-photo"><img src={asset("/sanitation-service-single.webp")} alt="华发物业开展公共区域日常消杀" width="1200" height="900" loading="lazy" decoding="async" /><span>02</span><div><b>日常消杀</b><small>公共区域规范作业</small></div></div>
        <div className="service-text"><span>SANITATION SERVICE</span><h2>消杀服务</h2><p>围绕公共区域、电梯轿厢、卫生间和高频接触点位开展周期性清洁消杀，结合日常巡检与专项作业，保持楼宇环境整洁安心。</p><ul><li>公共区域定期消杀</li><li>重点点位专项清洁</li><li>作业过程记录留档</li></ul></div>
      </section>

      <section className="rainy-section" id="rainy">
        <div className="page-shell">
          <SectionTitle eyebrow="RAINY DAY CARE" title="雨天暖心服务" intro="设备集中设置于大堂服务区域，为雨天通勤提供更周全的便利。" />
          <div className="rainy-grid">
            {rainyServices.map((item, index) => <article key={item.title}><div><img src={asset(item.image)} alt={item.title} loading="lazy" decoding="async" /><span>{String(index + 1).padStart(2, "0")}</span></div><h3>{item.title}</h3><p>{item.text}</p></article>)}
          </div>
        </div>
      </section>

      <section className="paid-services-section" id="paid-services">
        <div className="page-shell">
          <SectionTitle eyebrow="PAID SERVICE PRICE LIST" title="有偿服务价格公示表" intro="点击图片可放大查看完整收费标准。" />
          <a className="paid-service-poster" href={asset("/paid-service-price-list.jpg")} data-lightbox="image" data-lightbox-mode="zoom">
            <img src={asset("/paid-service-price-list.jpg")} alt="华发物业商办横琴天啟项目有偿服务收费标准" width="2160" height="1280" loading="lazy" decoding="async" />
            <span>点击图片放大查看</span>
          </a>
        </div>
      </section>

      <ImageLightbox />
      <SiteFooter />
    </main>
  );
}
