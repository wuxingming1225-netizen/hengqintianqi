/* eslint-disable @next/next/no-img-element */

import { asset } from "../assets";
import { PageHero, SectionTitle, SiteFooter, SiteHeader } from "../site-chrome";

type TeamMember = {
  name: string;
  role: string;
  range: string;
  hours: string;
  image: string;
  phone?: string;
};

const customerTeam: TeamMember[] = [
  { name: "吴幸明", role: "T3物业负责人", range: "T3 全域", hours: "工作日 8:30–17:30", image: "/wuxingming-cutout.webp" },
  { name: "曾令慧", role: "物业管家", range: "写字楼18–19 / 23–39层", hours: "工作日 8:30–17:30", phone: "13226026617", image: "/zeng-linghui-cutout.webp" },
  { name: "何思慧", role: "物业管家", range: "写字楼11–17 / 21–22 / 41–49层", hours: "工作日 8:30–17:30", phone: "17368289843", image: "/he-sihui-cutout.webp" },
  { name: "刘大平", role: "选品中心负责人", range: "5–9F 选品中心", hours: "工作日 7:30–17:30", image: "/liu-daping-cutout.webp" },
  { name: "周芷盈", role: "大堂管家", range: "首层大堂", hours: "工作日 8:30–17:30", image: "/zhou-zhiying-cutout.webp" },
  { name: "梁盼盼", role: "接待员", range: "选品中心前台", hours: "工作日 10:00–18:30", image: "/liang-panpan-cutout.webp" },
  { name: "刘嘉欣", role: "接待员", range: "选品中心前台", hours: "工作日 8:30–17:30", image: "/liu-jiaxin-cutout.webp" },
];

const supportTeam: TeamMember[] = [
  { name: "刘六虎", role: "工程部经理", range: "T3 工程运维全域", hours: "工作日 8:30–17:30", image: "/liu-liuhu-cutout.webp" },
  { name: "侯焕武", role: "安管部负责人", range: "T3 公共区域", hours: "工作日 8:30–17:30", image: "/hou-huanwu-cutout.webp" },
];

function TeamGrid({ members, offset = 0 }: { members: TeamMember[]; offset?: number }) {
  return <div className="team-grid">{members.map((member, index) => <article className="team-card" key={member.name}><div className="team-photo"><span>{String(index + offset + 1).padStart(2, "0")}</span><img src={asset(member.image)} alt={`${member.name}，${member.role}`} loading="lazy" decoding="async" /></div><div className="team-info"><p>{member.role}</p><h3>{member.name}</h3><dl><div><dt>服务区域</dt><dd>{member.range}</dd></div><div><dt>服务时间</dt><dd>{member.hours}</dd></div>{member.phone && <div><dt>联系电话</dt><dd><a href={`tel:${member.phone}`}>{member.phone}</a></dd></div>}</dl></div></article>)}</div>;
}

export default function ContactPage() {
  return (
    <main>
      <SiteHeader active="contact" />
      <PageHero eyebrow="CONTACT US" title="联系我们" subtitle="专业、可靠，始终在场" image="/contact-hero.jpg" index="04" variant="large" />

      <section className="content-section team-section page-shell">
        <SectionTitle eyebrow="PROPERTY TEAM" title="您的专属物业团队" intro="从大堂接待、楼层服务到选品中心运营，我们以清晰分工和一致标准响应每一项需要。" />
        <TeamGrid members={customerTeam} />
      </section>

      <section className="support-section">
        <div className="page-shell"><SectionTitle eyebrow="PROFESSIONAL SUPPORT" title="专业支持团队" intro="工程与安全管理专业岗位共同保障楼宇设施稳定、环境有序与日常运营安全。" /><TeamGrid members={supportTeam} offset={customerTeam.length} /></div>
      </section>

      <section className="contact-panel page-shell">
        <div><span>24 HOURS SERVICE</span><h2>需要帮助？<br />我们随时响应。</h2></div>
        <div className="contact-details"><a href="tel:07568696992"><small>24 小时应急热线</small><strong>0756-8696992</strong></a><p><small>项目地址</small><strong>珠海市横琴粤澳深度合作区<br />荣澳道 128 号</strong></p></div>
        <a className="contact-call" href="tel:07568696992" aria-label="拨打24小时应急热线">↗</a>
      </section>

      <SiteFooter />
    </main>
  );
}
