import axios from "axios";

// ===============================
// PRODUCT / WEBSITE API
// ===============================
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ===============================
// AUTH API — DummyJSON
// ===============================
const authApi = axios.create({
  baseURL: "https://dummyjson.com",
  headers: {
    "Content-Type": "application/json",
  },
});

// ===============================
// PRODUCTS
// ===============================
export async function getFeaturedProducts() {
  const response = await api.get("/products");
  return response.data.slice(0, 8);
}
// ===============================
// SINGLE PRODUCT
// ===============================
export async function getProductById(id) {
  const response = await api.get(`/products/${id}`);
  return response.data;
}
// ===============================
// ALL PRODUCTS — SHOP PAGE
// ===============================
export async function getAllProducts() {
  const response = await api.get("/products");
  return response.data;
}
// ===============================
// SUGGESTED PRODUCTS
// ===============================
export async function getSuggestedProducts(currentProductId) {
  const response = await api.get("/products");

  return response.data
    .filter((product) => String(product.id) !== String(currentProductId))
    .slice(0, 6);
}
// ===============================
// CATEGORIES
// ===============================
export async function getCategories() {
  const response = await api.get("/categories");
  return response.data;
}

// ===============================
// HERO BANNERS
// ===============================
export async function getHeroBanners() {
  return [
    {
      id: 1,
      title: "Carry Elegance,\nEffortlessly",
      subtitle:
        "Discover handcrafted luxury handbags designed for the modern woman. Premium materials, timeless silhouettes.",
      image:
        "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=1800&q=85",
      buttonText: "Shop the Collection",
      buttonLink: "#featured",
    },
    {
      id: 2,
      title: "Timeless\nBy Design",
      subtitle:
        "Refined silhouettes crafted for everyday elegance and effortless sophistication.",
      image:
        "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1800&q=85",
      buttonText: "Discover New Arrivals",
      buttonLink: "#featured",
    },
    {
      id: 3,
      title: "Made to\nBe Remembered",
      subtitle:
        "Thoughtful details, premium materials and craftsmanship designed to last.",
      image:
        "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&w=1800&q=85",
      buttonText: "Explore Collection",
      buttonLink: "#featured",
    },
  ];
}

// ===============================
// ANNOUNCEMENTS
// ===============================
export async function getAnnouncements() {
  return [
    {
      id: 1,
      text: "New Collection — Now Live",
    },
    {
      id: 2,
      text: "Complimentary Shipping on Orders Over $150",
    },
    {
      id: 3,
      text: "2-Year Warranty on Every Handbag",
    },
  ];
}

// ===============================
// CAMPAIGN
// ===============================
export async function getCampaign() {
  return {
    eyebrow: "LIMITED EDITION",
    title: "The Art of\nCraftsmanship",
    description:
      "Each Niya bag is shaped by hand by master artisans, blending heritage technique with contemporary design.",
    buttonText: "Explore Totes",
    buttonLink: "#categories",
    image:
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1800&q=85",
  };
}

// ===============================
// REELS
// ===============================
export async function getReels() {
  return [
    {
      id: 1,
      title: "Everyday Elegance",
      thumbnail:
        "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=700&q=85",
    },
    {
      id: 2,
      title: "Styled for Every Moment",
      thumbnail:
        "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=700&q=85",
    },
    {
      id: 3,
      title: "Details That Matter",
      thumbnail:
        "https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&w=700&q=85",
    },
    {
      id: 4,
      title: "A Bag for Every Story",
      thumbnail:
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=700&q=85",
    },
  ];
}

// ===============================
// CRAFTSMANSHIP
// ===============================
export async function getCraftsmanship() {
  return {
    eyebrow: "OUR PROMISE",
    title: "The Art of\nCraftsmanship",
    description:
      "Every Niya bag begins as a sketch and ends in the hands of a master artisan. We believe luxury is not just about materials — it is about the human touch, patience, and stories woven into every stitch.",
    image:
      "https://images.unsplash.com/photo-1612902456551-333ac5afa26e?auto=format&fit=crop&w=1200&q=85",
  };
}

// ===============================
// REVIEWS
// ===============================
export async function getReviews() {
  return [
    {
      id: 1,
      rating: 5,
      text: "My Niya bag has become my everyday companion. The craftsmanship is beautiful and timeless.",
      name: "Ananya Sharma",
      location: "Mumbai, India",
      initials: "AS",
    },
    {
      id: 2,
      rating: 5,
      text: "The quality is exceptional. You can feel the attention to detail the moment you hold it.",
      name: "Priya Patel",
      location: "Delhi, India",
      initials: "PP",
    },
    {
      id: 3,
      rating: 5,
      text: "Beautiful design, gorgeous details and an incredibly premium feel.",
      name: "Sara Khan",
      location: "Dubai, UAE",
      initials: "SK",
    },
  ];
}

// ===============================
// AUTH — DUMMYJSON
// ===============================
export async function loginUser(username, password) {
  const response = await authApi.post("/auth/login", {
    username,
    password,
  });

  return response.data;
}

// ===============================
// USERS — DUMMYJSON
// ===============================
export async function getUsers() {
  const response = await authApi.get("/users");
  return response.data.users;
}
