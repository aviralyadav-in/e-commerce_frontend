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
  return response.data.slice(0, 4);
}
// ===============================
// HOME PAGE PRODUCT SECTIONS
// ===============================

export async function getBestSellerProducts() {
  const response = await api.get("/products");

  return response.data.slice(0, 4);
}

export async function getNewArrivalProducts() {
  const response = await api.get("/products");

  return response.data.slice(0, 4);
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
export async function searchProducts(query) {
  const products = await getAllProducts();

  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return products;
  }

  return products.filter((product) => {
    const title = product.title?.toLowerCase() || "";
    const category =
      typeof product.category === "string"
        ? product.category.toLowerCase()
        : product.category?.name?.toLowerCase() || "";

    const description = product.description?.toLowerCase() || "";

    return (
      title.includes(normalizedQuery) ||
      category.includes(normalizedQuery) ||
      description.includes(normalizedQuery)
    );
  });
}
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
// ===============================
// FOOTER
// ===============================
// ===============================
// FOOTER
// ===============================
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
// --------------------------------------------------
// FOOTER / STATIC CONTENT APIs
// --------------------------------------------------

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

// Generic footer content fetcher.
// Later this function can directly call the real backend API.
// Pages will NOT need to change.

export const getFooterPage = async (slug) => {
  try {
    // Replace this URL later when backend endpoint is available:
    // const response = await api.get(`/footer-pages/${slug}`);
    // return response.data;

    // Temporary frontend fallback for manager/demo.
    return footerContent[slug] || null;
  } catch (error) {
    console.error(`Failed to fetch footer page: ${slug}`, error);
    return footerContent[slug] || null;
  }
};
// ===============================
// SALE PRODUCTS
// ===============================
// Temporary frontend data for Sale.
// Later this can be replaced with:
// const response = await api.get("/products/sale");
// return response.data;

export async function getSaleProducts() {
  return [
    {
      id: "sale-1",
      title: "Niya Classic Tote",
      price: 4999,
      salePrice: 3999,
      discount: 20,
      category: "Totes",
      thumbnail:
        "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=900&q=85",
      isOnSale: true,
    },
    {
      id: "sale-2",
      title: "Niya Luna Shoulder Bag",
      price: 5999,
      salePrice: 4499,
      discount: 25,
      category: "Shoulder Bags",
      thumbnail:
        "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=900&q=85",
      isOnSale: true,
    },
    {
      id: "sale-3",
      title: "Niya Mini Crossbody",
      price: 3999,
      salePrice: 2999,
      discount: 25,
      category: "Crossbody Bags",
      thumbnail:
        "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&w=900&q=85",
      isOnSale: true,
    },
    {
      id: "sale-4",
      title: "Niya Signature Handbag",
      price: 6999,
      salePrice: 4899,
      discount: 30,
      category: "Handbags",
      thumbnail:
        "https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&w=900&q=85",
      isOnSale: true,
    },
    {
      id: "sale-5",
      title: "Niya Evening Clutch",
      price: 4499,
      salePrice: 3599,
      discount: 20,
      category: "Clutches",
      thumbnail:
        "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=900&q=85",
      isOnSale: true,
    },
    {
      id: "sale-6",
      title: "Niya Everyday Shoulder Bag",
      price: 5499,
      salePrice: 3849,
      discount: 30,
      category: "Shoulder Bags",
      thumbnail:
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=85",
      isOnSale: true,
    },
  ];
}
// ===============================
// 404 PAGE — FLYING BAGS
// ===============================

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