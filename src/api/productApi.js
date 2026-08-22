import { api } from "./axiosClient";
import { products } from "../data/products.js";

export async function getAllProducts() {
  try {
    const response = await api.get("/products?limit=100");
    if (response.data?.products && response.data.products.length > 0) {
      return response.data.products;
    }
    return products;
  } catch (error) {
    console.warn("Backend products API fallback to local products.js", error);
    return products;
  }
}

export async function getProductById(id) {
  try {
    const response = await api.get(`/${id}`);
    if (response.data?.product) {
      return response.data.product;
    }
    return products.find((p) => String(p.id) === String(id)) || null;
  } catch (error) {
    console.warn(`Product API fallback for id: ${id}`, error);
    return products.find((p) => String(p.id) === String(id)) || null;
  }
}

export async function getFeaturedProducts() {
  const allProducts = await getAllProducts();
  return allProducts.filter((product) => product.isFeatured).slice(0, 4);
}

export async function getBestSellerProducts() {
  const allProducts = await getAllProducts();
  return [...allProducts]
    .sort((a, b) => (b.orderCount || 0) - (a.orderCount || 0))
    .slice(0, 4);
}

export async function getNewArrivalProducts() {
  const allProducts = await getAllProducts();
  return [...allProducts]
    .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
    .slice(0, 4);
}

export async function searchProducts(query) {
  const allProducts = await getAllProducts();
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return allProducts;
  }

  return allProducts.filter((product) => {
    const title = product.title?.toLowerCase() || "";
    const category = product.category?.toLowerCase() || "";
    const subcategory = product.subcategory?.toLowerCase() || "";
    const description = product.description?.toLowerCase() || "";

    return (
      title.includes(normalizedQuery) ||
      category.includes(normalizedQuery) ||
      subcategory.includes(normalizedQuery) ||
      description.includes(normalizedQuery)
    );
  });
}

export async function getSuggestedProducts(currentProductId) {
  const allProducts = await getAllProducts();
  return allProducts
    .filter((product) => String(product.id) !== String(currentProductId))
    .slice(0, 6);
}

export async function getCategories() {
  const allProducts = await getAllProducts();
  const categoryMap = {};

  allProducts.forEach((product) => {
    if (!product.subcategory) return;

    const key = `${product.gender || "women"}-${product.subcategory}`;

    if (!categoryMap[key]) {
      categoryMap[key] = {
        gender: product.gender || "women",
        name: product.subcategory,
        filter: product.subcategory,
        image: product.images?.[0] || product.thumbnail || "",
        count: 0,
      };
    }

    categoryMap[key].count += 1;
  });

  return Object.values(categoryMap);
}
