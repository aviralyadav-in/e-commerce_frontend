// import { contentApi } from "./axiosClient";
import { craftsmanshipData } from "../data/homeData";
import { reviewsData } from "../data/homeData";
import { campaignData } from "../data/homeData";
import { heroBannersData } from "../data/homeData";
import { reelsData } from "../data/homeData";
import { promoBannersData } from "../data/homeData";
import { announcementsData } from "../data/homeData";

// ============================================
// HOME / CONTENT APIs
// ============================================
export async function getHeroBanners() {
  return heroBannersData;
}

export function getPromoBanners() {
  return promoBannersData;
}

export async function getAnnouncements() {
  return announcementsData;
}
//sahi h 
export async function getReels() {
  return reelsData;
}
// getcampaign vala section

export function getCampaign() {
  return campaignData;
}
//--------------------------------
//customer reviews (home k andar)

export function getReviews() {
  return reviewsData;
}
//-------------------
//sahi h

export function getCraftsmanship() {
  return craftsmanshipData;
}
//--------------------------------------------------

