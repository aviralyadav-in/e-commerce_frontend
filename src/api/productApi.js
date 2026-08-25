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
  return getLocalFeaturedProducts();
}

export async function getBestSellerProducts() {
  return getLocalBestSellerProducts();
}

export async function getNewArrivalProducts() {
  return getLocalNewArrivalProducts();
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
// import { api } from "./axiosClient";

// // =============================================
// // PRODUCTS
// // =============================================

// export async function getAllProducts() {
//   const response = await api.get("/products");
//   return response.data;
// }

// // =============================================
// // SINGLE PRODUCT
// // =============================================

// export async function getProductById(id) {
//   const response = await api.get(`/products/${id}`);
//   return response.data;
// }

// // =============================================
// // FEATURED PRODUCTS
// // =============================================

// export async function getFeaturedProducts() {
//   const response = await api.get("/products", {
//     params: {
//       featured: true,
//     },
//   });

//   return response.data;
// }

// // =============================================
// // BEST SELLERS
// // =============================================

// export async function getBestSellerProducts() {
//   const response = await api.get("/products", {
//     params: {
//       bestSeller: true,
//     },
//   });

//   return response.data;
// }

// // =============================================
// // NEW ARRIVALS
// // =============================================

// export async function getNewArrivalProducts() {
//   const response = await api.get("/products", {
//     params: {
//       newArrival: true,
//     },
//   });

//   return response.data;
// }

// // =============================================
// // SEARCH
// // =============================================

// export async function searchProducts(query) {
//   const response = await api.get("/products", {
//     params: {
//       search: query,
//     },
//   });

//   return response.data;
// }

// // =============================================
// // SUGGESTED PRODUCTS
// // =============================================

// export async function getSuggestedProducts(productId) {
//   const response = await api.get(
//     `/products/${productId}/suggestions`,
//   );

//   return response.data;
// }

// // =============================================
// // CATEGORIES
// // =============================================

// export async function getCategories() {
//   const response = await api.get("/categories");
//   return response.data;
// }

// // =============================================
// // PRODUCTS BY CATEGORY
// // =============================================

// export async function getProductsByCategory(subcategory) {
//   const response = await api.get("/products", {
//     params: {
//       subcategory,
//     },
//   });

//   return response.data;
// }

// // =============================================
// // PRODUCTS BY PRICE RANGE
// // =============================================

// export async function getProductsByPriceRange(min, max) {
//   const response = await api.get("/products", {
//     params: {
//       minPrice: min,
//       maxPrice: max,
//     },
//   });

//   return response.data;
// }