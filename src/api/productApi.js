import {
  getAllProducts as getLocalProducts,
  getProductById as getLocalProductById,
  getProductsByCategory as getLocalProductsByCategory,
  getFeaturedProducts as getLocalFeaturedProducts,
  getBestSellerProducts as getLocalBestSellerProducts,
  getNewArrivalProducts as getLocalNewArrivalProducts,
  searchProducts as getLocalSearchProducts,
  getSuggestedProducts as getLocalSuggestedProducts,
  getCategories as getLocalCategories,
  getProductsByPriceRange as getLocalProductsByPriceRange,
} from "../data/products.js";

export async function getAllProducts() {
  return getLocalProducts();
}

export async function getProductById(id) {
  return getLocalProductById(id);
}

export async function getFeaturedProducts() {
  return getLocalFeaturedProducts(4);
}

export async function getBestSellerProducts() {
  return getLocalBestSellerProducts(4);
}

export async function getNewArrivalProducts() {
  return getLocalNewArrivalProducts(4);
}

export async function searchProducts(query) {
  return getLocalSearchProducts(query);
}

export async function getSuggestedProducts(currentProductId) {
  return getLocalSuggestedProducts(currentProductId);
}

export async function getCategories() {
  return getLocalCategories();
}

export async function getProductsByCategory(subcategory) {
  return getLocalProductsByCategory(subcategory);
}

export async function getProductsByPriceRange(min, max) {
  return getLocalProductsByPriceRange(min, max);
}
