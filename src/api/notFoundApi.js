import { contentApi } from "./axiosClient";

// ============================================
// 404 PAGE API
// ============================================

export async function getNotFoundBags() {
  const response = await contentApi.get("/not-found-bags");
  return response.data;
}