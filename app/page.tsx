/* eslint-disable @next/next/no-img-element */

import { asset } from "./assets";
import { SiteFooter, SiteHeader } from "./site-chrome";

const floors = [
  ["01F", "T3写字楼大堂", "抵达与服务"],
  ["02–04F", "华发商都区域", "商业配套"],
  ["05–09F", "选品中心", "选品空间"],
];

const officeFloors = [
  ["11–16F", "低区"],
  ["17–27F", "中区"],
  ["28–38F", "高区"],
  ["39–49F", "超高区"],
];

export default function ProjectPage() {
  return (
    <main>
      <SiteHeader active="project" />

      <section className="project-about">
        <div className="page-shell project-landmark project-landmark-full">
          <div className="project-landmark-feature">
            <div className="project-landmark-heading">
              <strong aria-hidden="true">ABOUT<br />HENGQIN T3</strong>
              <span>ABOUT HENGQIN T3</span>
              <h2>关于横琴天啟 T3</h2>
            </div>
            <div className="project-landmark-photo">
              <img src={asset("/t3-building.webp")} alt="横琴天啟 T3 建筑主体与金融岛景观" width="1600" height="1039" decoding="async" />
            </div>
          </div>
          <div className="project-landmark-stats" aria-label="横琴天啟 T3 建筑数据">
            <div><strong>94,332<small>㎡</small></strong><span>总建筑面积</span></div>
            <div><strong>249<small>m</small></strong><span>主楼高度</span></div>
            <div><strong>49<small>层</small></strong><span>总楼层</span></div>
          </div>
          <div className="project-about-copy">
            <p>珠海华发物业服务有限公司（简称“华发物业”）作为横琴天啟 T3 的物业大管家，本着匠心级的服务精神，不断创新服务，精益求精，为客户带来优越、愉悦、难忘的服务体验。</p>
            <p>横琴天啟（华发）跨境电商产业园拓展区又名华发天啟 T3 栋，项目位于珠海市横琴粤澳深度合作区境内，占位横琴金融岛金边三公里CBD核心地段，背靠小横琴山，与澳门隔海相望，奢享一线揽澳海景，兼有较佳的海景、山景、园景、城市景观，具有得天独厚的区位优势和无可比拟的景观优势。</p>
          </div>
        </div>
      </section>

      <section className="building-section" id="overview">
        <div className="page-shell building-card">
          <div className="building-visual">
            <span className="building-code">HENGQIN · T3</span>
            <div className="tower-wrap">
              <img src={asset("/t3-building-lineart.webp")} alt="横琴天啟 T3 楼宇结构线稿" />
              {["40F", "30F", "20F", "10F"].map((floor, index) => <span className={`refuge-dot dot-${index + 1}`} key={floor}><i />{floor}</span>)}
            </div>
            <div className="building-metrics"><div><strong>249<small>m</small></strong><span>建筑高度</span></div><div><strong>94,332<small>㎡</small></strong><span>总建筑面积</span></div></div>
          </div>

          <div className="building-overview">
            <span className="card-eyebrow">BUILDING OVERVIEW</span>
            <h2>一眼读懂T3栋</h2>
            <p className="overview-lead">从首层大堂到选品空间，用一张纵向导览快速认识楼宇功能分布。</p>
            <div className="floor-table">
              {floors.map(([floor, name, type]) => <div className="floor-row" key={floor}><b>{floor}</b><strong>{name}</strong><span>{type}</span></div>)}
              <div className="office-block">
                <div className="office-title"><b>11–49F</b><strong>写字楼办公区域</strong><span>办公空间</span></div>
                <div className="office-zones">{officeFloors.map(([floor, zone]) => <div key={floor}><b>{floor}</b><span>{zone}</span></div>)}</div>
              </div>
              <div className="refuge-row"><b>10F / 20F / 30F / 40F</b><strong>避难层</strong><span>安全疏散</span></div>
            </div>
            <div className="safety-note"><b>安全提示</b><p>避难层用于紧急情况下的临时疏散与避难，请留意楼内消防疏散标识。</p></div>
          </div>
        </div>
      </section>

      <section className="ifc-security" id="security-management">
        <div className="page-shell security-story">
          <span className="security-watermark">SECURITY<br />MANAGEMENT</span>
          <div className="security-story-head"><span>24H SECURITY MANAGEMENT</span><h2>24小时周密安全管理<br />为客户安全保驾护航</h2></div>
          <div className="security-story-copy">
            <article><h3>实时监控</h3><p>7×24 小时无间断安全管理，实时掌握楼宇安全动态。</p></article>
            <article><h3>安全管理</h3><p>严格实施人员、物品出入管理，定期开展消防安全培训与检查服务，确保人身与财产安全。</p></article>
          </div>
          <div className="security-photo-composition monitoring-composition"><img src={asset("/security-monitoring-v2.webp")} alt="T3 监控中心实时安全管理" width="836" height="557" loading="eager" decoding="async" /><div aria-hidden="true" /></div>
        </div>

        <div className="page-shell tight-story">
          <span className="security-watermark">TIGHT<br />MANAGEMENT</span>
          <div className="security-story-head"><span>TIGHT MANAGEMENT</span><h2>严密管理<br />安全可靠</h2></div>
          <div className="tight-copy">
            <article><h3>消防管理</h3><p>配置完善的微型消防站，建设训练有素的 24 小时应急队伍，持续开展消防检查与演练。</p></article>
            <article><h3>风险管理</h3><p>建立完善的风险管理体系，科学识别并有效管控日常运营风险，保障安全办公环境。</p></article>
            <article><h3>应急预案</h3><p>建立科学的应急预案体系和分级响应机制，确保突发情况处理高效有序。</p></article>
          </div>
          <div className="security-photo-composition tight-composition"><img src={asset("/tight-security-management.webp")} alt="T3 安管团队开展防暴应急演练" width="1200" height="900" loading="eager" decoding="async" /><div aria-hidden="true" /></div>
        </div>

        <div className="page-shell security-story equipment-story">
          <span className="security-watermark">EQUIPMENT<br />SAFETY</span>
          <div className="security-story-head"><span>EQUIPMENT SAFETY</span><h2>设备安全<br />稳定运行</h2></div>
          <div className="security-story-copy">
            <article><h3>守护企业生命线</h3><p>电力和网络被视为企业的“生命线”。服务中心建立起 24 小时值守机制。在工程端，重点保障电力和动力设施持续稳定输出，避免因供电波动影响跨时区直播和服务器运行。</p></article>
          </div>
          <div className="security-photo-composition equipment-composition"><img src={asset("/equipment-safety.webp")} alt="工程人员开展电力设备安全检查" width="839" height="557" loading="eager" decoding="async" /><div aria-hidden="true" /></div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
