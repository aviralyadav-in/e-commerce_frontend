import { contentApi } from "./axiosClient";

export async function getFooter() {
  const response = await contentApi.get("/footer");
  return response.data;
}

export async function getFooterPage(slug) {
  const response = await contentApi.get(`/footer-pages/${slug}`);
  return response.data;
}