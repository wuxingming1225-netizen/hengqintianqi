import type { Metadata } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "横琴天啟 T3｜物业服务团队",
  description: "横琴天啟 T3 写字楼物业团队介绍与便民服务指引。",
  icons: { icon: `${basePath}/favicon.svg`, shortcut: `${basePath}/favicon.svg` },
  openGraph: {
    title: "横琴天啟 T3｜物业团队 · 便民服务",
    description: "认识专属物业团队，快速查看大堂暖心服务、停车通行、外卖与货梯路线。",
    images: [{ url: `${basePath}/og.png`, width: 1200, height: 630, alt: "横琴天啟 T3 物业便民服务" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "横琴天啟 T3｜物业团队 · 便民服务",
    description: "认识专属物业团队，快速查看大堂暖心服务、停车通行、外卖与货梯路线。",
    images: [`${basePath}/og.png`],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
