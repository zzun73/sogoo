import { writeFileSync, existsSync, mkdirSync } from "fs";
import { format } from "date-fns";

// 상수 정의
const DOMAIN = "https://www.sogoo.kr";
const SITEMAP_PATH = "./public/sitemap.xml";

// 정적 페이지 설정
const staticPages = [
  // 메인 페이지 - 최우선순위
  { path: "/", priority: 1.0, changefreq: "daily" },

  // 매장/스토어 관련 페이지
  { path: "/store", priority: 0.9, changefreq: "daily" },
  { path: "/store/search/result", priority: 0.8, changefreq: "hourly" },

  // 주문/결제 관련 페이지
  { path: "/orders/form", priority: 0.8, changefreq: "daily" },
  { path: "/orders/cart", priority: 0.8, changefreq: "daily" },

  // 회원 관련 페이지
  { path: "/sign", priority: 0.7, changefreq: "monthly" },
  { path: "/mypage", priority: 0.7, changefreq: "daily" },

  // 판매자 관련 페이지
  { path: "/seller", priority: 0.7, changefreq: "daily" },
  { path: "/seller/reviews", priority: 0.6, changefreq: "daily" },
  { path: "/seller/menus", priority: 0.6, changefreq: "daily" },
  { path: "/seller/add/food", priority: 0.6, changefreq: "weekly" },
  { path: "/seller/add/subscribe", priority: 0.6, changefreq: "weekly" },
  { path: "/seller/subscribe/detail", priority: 0.6, changefreq: "daily" },
];

function generateSitemapXml() {
  const sitemapGeneratedDate = format(new Date(), "yyyy-MM-dd");
  const sitemapEntries = staticPages
    .map(
      ({ path, priority, changefreq }) =>
        `<url>
        <loc>${DOMAIN}${path}</loc>
        <lastmod>${sitemapGeneratedDate}</lastmod>
        <changefreq>${changefreq}</changefreq>
        <priority>${priority.toFixed(1)}</priority>
      </url>`
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
  ${sitemapEntries}
</urlset>`;
}

try {
  // public 디렉토리가 없으면 생성
  if (!existsSync("./public")) {
    mkdirSync("./public", { recursive: true });
  }

  // XML 생성 및 파일 작성
  const xmlContent = generateSitemapXml();
  writeFileSync(SITEMAP_PATH, xmlContent, "utf-8");

  console.log("✅ Sitemap generated successfully at:", SITEMAP_PATH);
  console.log(`🌐 Domain: ${DOMAIN}`);
} catch (error) {
  console.error("❌ Error generating sitemap:", error);
  process.exit(1);
}
