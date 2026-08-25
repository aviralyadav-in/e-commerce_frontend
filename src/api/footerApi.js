import { footerData, footerPagesData } from "../data/footerData";

// ============================================
// FOOTER
// ============================================

export async function getFooter() {
  return footerData;
}

// ============================================
// FOOTER PAGES
// ============================================

export async function getFooterPage(slug) {
  return footerPagesData[slug] || null;
}
