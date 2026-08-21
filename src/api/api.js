import axios from "axios";

import { enrichedProducts as products } from "../data/products.js";

// ============================================================
// PRODUCT / WEBSITE API
// DUMMY / FRONTEND DATA
// ============================================================

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ============================================================
// AUTH API
// REAL BACKEND API
// ============================================================
const authApi = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/auth`,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// ============================================================
// CART API
// REAL BACKEND API
// ============================================================

const cartApi = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/cart`,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
// ============================================================
// CART
// REAL BACKEND API
// ============================================================

export async function getCart() {
  const response = await cartApi.get("/");
  return response.data;
}


export async function addCartItem(productId, quantity = 1) {
  const response = await cartApi.post("/add", {
    product: productId,
    quantity,
  });

  return response.data;
}
export async function removeCartItem(productId) {
  const response = await cartApi.delete(`/remove/${productId}`);
  return response.data;
}
export async function clearCart() {
  const response = await cartApi.delete("/clear");
  return response.data;
}
// ============================================================
// PRODUCTS
// DUMMY / FRONTEND DATA
// ============================================================

export async function getFeaturedProducts() {
  return products.filter((product) => product.isFeatured).slice(0, 4);
}

export async function getBestSellerProducts() {
  return [...products].sort((a, b) => b.orderCount - a.orderCount).slice(0, 4);
}

export async function getNewArrivalProducts() {
  return [...products]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 4);
}

// ============================================================
// SINGLE PRODUCT
// DUMMY / FRONTEND DATA
// ============================================================

export async function getProductById(id) {
  return products.find((product) => String(product.id) === String(id)) || null;
}

// ============================================================
// ALL PRODUCTS — SHOP PAGE
// DUMMY / FRONTEND DATA
// ============================================================

export async function getAllProducts() {
  return products;
}

// ============================================================
// SEARCH PRODUCTS
// DUMMY / FRONTEND DATA
// ============================================================

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

// ============================================================
// SUGGESTED PRODUCTS
// DUMMY / FRONTEND DATA
// ============================================================

export async function getSuggestedProducts(currentProductId) {
  return products
    .filter((product) => String(product.id) !== String(currentProductId))
    .slice(0, 6);
}

// ============================================================
// CATEGORIES
// DUMMY / FRONTEND DATA
// ============================================================

export async function getCategories() {
  const categoryMap = {};

  products.forEach((product) => {
    if (!product.subcategory) return;

    const key = `${product.gender}-${product.subcategory}`;

    if (!categoryMap[key]) {
      categoryMap[key] = {
        gender: product.gender,
        name: product.subcategory,
        filter: product.subcategory,
        image: product.images?.[0] || "",
        count: 0,
      };
    }

    categoryMap[key].count += 1;
  });

  return Object.values(categoryMap);
}

// ============================================================
// HERO BANNERS
// DUMMY / FRONTEND DATA
// ============================================================

export async function getHeroBanners() {
  return [
    {
      id: 1,
      title: "Carry Elegance,\nEffortlessly",
      subtitle:
        "Discover handcrafted luxury handbags designed for the modern woman. Premium materials, timeless silhouettes.",
      image:
        "/products/bags/handbags/WhatsApp Image 2026-08-17 at 5.37.34 PM.jpeg",
      buttonText: "Shop Handbags",
      buttonLink: "/shop?subcategory=handbags",
    },

    {
      id: 2,
      title: "Timeless\nBy Design",
      subtitle:
        "Refined silhouettes crafted for everyday elegance and effortless sophistication.",
      image:
        "/products/bags/handbags/WhatsApp Image 2026-08-17 at 5.40.02 PM.jpeg",
      buttonText: "Explore Collection",
      buttonLink: "/shop",
    },

    {
      id: 3,
      title: "Made to\nBe Remembered",
      subtitle:
        "Thoughtful details, premium materials and craftsmanship designed to last.",
      image:
        "/products/bags/minibags/WhatsApp Image 2026-08-17 at 5.40.08 PM (1).jpeg",
      buttonText: "Shop New Arrivals",
      buttonLink: "/shop?filter=new-arrivals",
    },
  ];
}

// ============================================================
// ANNOUNCEMENTS
// DUMMY / FRONTEND DATA
// ============================================================

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

// ============================================================
// CAMPAIGN
// DUMMY / FRONTEND DATA
// ============================================================

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

// ============================================================
// REELS
// DUMMY / FRONTEND DATA
// ============================================================

export async function getReels() {
  return [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=700&q=85",
      title: "Everyday elegance",
    },

    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&w=700&q=85",
      title: "Style it your way",
    },

    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=700&q=85",
      title: "Behind the craft",
    },

    {
      id: 4,
      image:
        "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=700&q=85",
      title: "The Niya edit",
    },
  ];
}

// ============================================================
// CRAFTSMANSHIP
// DUMMY / FRONTEND DATA
// ============================================================

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

// ============================================================
// REVIEWS
// DUMMY / FRONTEND DATA
// ============================================================

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

// ============================================================
// AUTHENTICATION
// REAL BACKEND API
//
// Base URL comes from:
// VITE_API_BASE_URL
//
// Example:
// http://localhost:5000/api/auth
//
// Endpoints:
// POST /login
// POST /signup
// GET  /profile
// POST /logout
// GET  /users
// ============================================================

export async function loginUser(email, password) {
  const response = await authApi.post("/login", {
    email,
    password,
  });

  return response.data;
}

export async function signupUser(userData) {
  const response = await authApi.post("/signup", userData);

  return response.data;
}

export async function getProfile() {
  const response = await authApi.get("/profile");

  return response.data;
}

export async function logoutUser() {
  const response = await authApi.post("/logout");

  return response.data;
}

// ============================================================
// USERS
// REAL BACKEND API
// ============================================================

export async function getUsers() {
  const response = await authApi.get("/users");

  return response.data.users;
}

// ============================================================
// FOOTER
// DUMMY / FRONTEND DATA
// ============================================================

export async function getFooter() {
  return {
    brand: {
      name: "Niya Bags",

      description:
        "Modern luxury handbags thoughtfully designed and handcrafted for the woman who carries her own story.",
    },

    socialLinks: [
      {
        id: 1,
        platform: "Instagram",
        url: "#",
      },

      {
        id: 2,
        platform: "Facebook",
        url: "#",
      },

      {
        id: 3,
        platform: "YouTube",
        url: "#",
      },

      {
        id: 4,
        platform: "Email",
        url: "mailto:support@niyabags.com",
      },
    ],

    sections: [
      {
        id: 1,
        title: "ABOUT",

        links: [
          {
            id: 1,
            label: "Our Story",
            path: "/our-story",
          },

          {
            id: 2,
            label: "About Niya",
            path: "/about",
          },
        ],
      },

      {
        id: 2,
        title: "CUSTOMER CARE",

        links: [
          {
            id: 1,
            label: "Contact Us",
            path: "/contact",
          },

          {
            id: 2,
            label: "Shipping & Returns",
            path: "/shipping-returns#shipping",
          },

          {
            id: 3,
            label: "Exchange Policy",
            path: "/shipping-returns#exchange",
          },

          {
            id: 4,
            label: "Size Guide",
            path: "/size-guide#size-guide",
          },

          {
            id: 5,
            label: "Care Guide",
            path: "/size-guide#care-guide",
          },

          {
            id: 6,
            label: "FAQs",
            path: "/faq",
          },
        ],
      },
    ],

    customerService: {
      heading: "NEED HELP WITH YOUR ORDER?",

      description: "Our team is here to assist you.",

      email: "support@niyabags.com",
    },

    legalLinks: [
      {
        id: 1,
        label: "Privacy Policy",
        path: "/privacy-policy#privacy-policy",
      },

      {
        id: 2,
        label: "Terms of Use",
        path: "/terms-of-use#terms-of-use",
      },
    ],

    copyright: `© ${new Date().getFullYear()} Niya Bags. All rights reserved.`,
  };
}

// ============================================================
// FOOTER / STATIC CONTENT APIs
// DUMMY / FRONTEND DATA
// ============================================================

const footerContent = {
  about: {
    eyebrow: "ABOUT NIYA",

    title: "Designed for the woman who carries her own story.",

    intro:
      "Niya Bags is a contemporary handbag brand built around thoughtful design, timeless silhouettes, and everyday elegance.",

    sections: [
      {
        title: "Our Philosophy",

        content:
          "We believe a handbag should be more than an accessory. It should become part of your everyday life — carrying your essentials, complementing your style, and staying relevant beyond a single season.",
      },

      {
        title: "Designed With Intention",

        content:
          "At Niya, we focus on refined silhouettes, considered details, and versatile designs that move effortlessly from everyday moments to occasions that matter.",
      },
    ],

    values: [
      {
        title: "Timeless Design",

        content:
          "Clean silhouettes and thoughtful details designed to remain relevant season after season.",
      },

      {
        title: "Thoughtful Craftsmanship",

        content:
          "Every design is developed with attention to proportion, functionality, finishing, and everyday usability.",
      },

      {
        title: "Modern Elegance",

        content:
          "A refined balance between contemporary fashion and effortless everyday style.",
      },
    ],
  },

  "our-story": {
    eyebrow: "OUR STORY",

    title: "A story shaped by style, purpose and everyday moments.",

    intro:
      "Niya began with a simple idea — create handbags that feel beautiful, useful and effortlessly relevant.",

    sections: [
      {
        title: "Where It Began",

        content:
          "Niya was created from a love for fashion and the belief that everyday accessories should combine beauty with purpose. Each collection begins with the details that make a bag feel natural in real life.",
      },

      {
        title: "Our Design Language",

        content:
          "Our aesthetic is rooted in clean forms, sophisticated proportions and understated details. We design pieces that can move from workdays to weekends and from everyday routines to special occasions.",
      },

      {
        title: "Looking Ahead",

        content:
          "As Niya grows, our focus remains the same: thoughtful design, dependable quality and a shopping experience that feels as refined as the products themselves.",
      },
    ],
  },

  contact: {
    eyebrow: "CONTACT US",

    title: "We would love to hear from you.",

    intro:
      "Whether you have a question about an order, a product or simply want to know more about Niya, our team is here to help.",

    sections: [
      {
        title: "Customer Care",

        content:
          "For questions about orders, products, shipping, returns or exchanges, please reach out to our customer care team.",
      },

      {
        title: "Email",

        content: "support@niyabags.com",
      },

      {
        title: "Business Enquiries",

        content:
          "For collaborations, partnerships and business enquiries, please contact our team through the official Niya communication channel.",
      },
    ],
  },

  "shipping-returns": {
    eyebrow: "SHIPPING & RETURNS",

    title: "Everything you need to know about your order.",

    intro:
      "Our shipping, return and exchange information is designed to make every purchase simple and transparent.",

    sections: [
      {
        id: "shipping",

        title: "Shipping",

        content:
          "Orders are carefully prepared and dispatched from our fulfilment facility. Shipping timelines, available locations and delivery charges may vary depending on the destination.",
      },

      {
        id: "returns",

        title: "Returns",

        content:
          "If your purchase does not work for you, eligible items can be returned according to our return policy. Items must meet the required condition and eligibility criteria.",
      },

      {
        id: "exchange",

        title: "Exchange Policy",

        content:
          "Eligible products may be exchanged according to the applicable exchange conditions. Please contact customer care before sending an item back.",
      },
    ],
  },

  "size-care": {
    eyebrow: "GUIDES",

    title: "Know your bag. Care for it well.",

    intro:
      "Explore our size information and simple care recommendations to help you choose and maintain your Niya piece.",

    sections: [
      {
        id: "size-guide",

        title: "Size Guide",

        content:
          "Use the dimensions provided on each product page to understand the bag's proportions, capacity and fit for your everyday essentials.",
      },

      {
        id: "care-guide",

        title: "Care Guide",

        content:
          "Keep your Niya bag away from excessive moisture, direct heat and harsh chemicals. Store it in its protective packaging when not in use and handle delicate finishes with care.",
      },
    ],
  },

  faq: {
    eyebrow: "FAQ",

    title: "Frequently asked questions.",

    intro:
      "Find quick answers to some of the questions our customers ask most often.",

    faqs: [
      {
        question: "How can I track my order?",

        answer:
          "Once your order has been dispatched, tracking information will be shared through the contact details provided at checkout.",
      },

      {
        question: "Can I change or cancel my order?",

        answer:
          "Please contact customer care as soon as possible after placing your order. Changes or cancellations depend on the order's processing status.",
      },

      {
        question: "How do I return an item?",

        answer:
          "Contact our customer care team with your order details. They will guide you through the applicable return process.",
      },

      {
        question: "Can I exchange my bag?",

        answer:
          "Eligible products may be exchanged according to our current exchange policy.",
      },

      {
        question: "How should I care for my Niya bag?",

        answer:
          "Avoid prolonged exposure to moisture, heat and harsh chemicals. Store your bag carefully when not in use and follow the specific care instructions supplied with the product.",
      },

      {
        question: "How can I contact Niya?",

        answer:
          "You can reach our customer care team through the contact details provided on our Contact page.",
      },
    ],
  },

  legal: {
    eyebrow: "LEGAL",

    title: "Our policies.",

    intro:
      "Please review our privacy and website terms to understand how Niya handles information and how our website may be used.",

    sections: [
      {
        id: "privacy-policy",

        title: "Privacy Policy",

        content:
          "Niya respects your privacy. Information provided while using our website or placing an order is handled for purposes such as processing purchases, providing customer support, improving our services and communicating important updates.",
      },

      {
        id: "terms-of-use",

        title: "Terms of Use",

        content:
          "By accessing and using the Niya website, you agree to use the website responsibly and in accordance with applicable laws and these terms. Product information, imagery and website content may be updated from time to time.",
      },
    ],
  },
};

// ============================================================
// GENERIC FOOTER CONTENT FETCHER
// DUMMY / FRONTEND DATA
//
// Later this function can directly call the real backend API.
// Pages will NOT need to change.
// ============================================================

export const getFooterPage = async (slug) => {
  try {
    // REAL BACKEND VERSION — LATER
    // const response = await api.get(`/footer-pages/${slug}`);
    // return response.data;

    // CURRENTLY DUMMY FRONTEND DATA
    return footerContent[slug] || null;
  } catch (error) {
    console.error(`Failed to fetch footer page: ${slug}`, error);

    return footerContent[slug] || null;
  }
};

// ============================================================
// SALE PRODUCTS
// DUMMY / FRONTEND DATA
// ============================================================

export function getSaleProducts() {
  return products.filter((product) => product.isOnSale === true);
}

// ============================================================
// 404 PAGE — FLYING BAGS
// DUMMY / FRONTEND DATA
// ============================================================

export async function getNotFoundBags() {
  return [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=500&q=85",
    },

    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=500&q=85",
    },

    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&w=500&q=85",
    },

    {
      id: 4,
      image:
        "https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&w=500&q=85",
    },

    {
      id: 5,
      image:
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=500&q=85",
    },

    {
      id: 6,
      image:
        "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=500&q=85",
    },

    {
      id: 7,
      image:
        "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=500&q=85",
    },

    {
      id: 8,
      image:
        "https://images.unsplash.com/photo-1585488436022-7c5a1a6b9b6e?auto=format&fit=crop&w=500&q=85",
    },
  ];
}
