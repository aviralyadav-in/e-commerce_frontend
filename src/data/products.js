const baseProduct = {
  gender: "women",
  category: "bags",
  description: "",
  colors: [],
  isOnSale: false,
  salePrice: null,
  discountPercentage: 0,
  orderCount: 0,
  createdAt: "2026-08-18",
  isFeatured: false,
  rating: 0,
  reviewCount: 0,
};

export const products = [
  // =========================
  // HANDBAGS
  // =========================
  {
    ...baseProduct,
    id: "handbag-001",
    slug: "handbag-001",
    title: "Classic Everyday Handbag",
    subcategory: "handbags",
    price: 2499,
    images: [
      "/products/bags/handbags/WhatsApp Image 2026-08-17 at 5.37.34 PM (1).jpeg",
    ],
  },
  {
    ...baseProduct,
    id: "handbag-002",
    slug: "handbag-002",
    title: "Elegant Structured Handbag",
    subcategory: "handbags",
    price: 2799,
    images: [
      "/products/bags/handbags/WhatsApp Image 2026-08-17 at 5.37.34 PM.jpeg",
    ],
  },
  {
    ...baseProduct,
    id: "handbag-003",
    slug: "handbag-003",
    title: "Premium City Handbag",
    subcategory: "handbags",
    price: 3299,
    images: [
      "/products/bags/handbags/WhatsApp Image 2026-08-17 at 5.37.35 PM.jpeg",
    ],
  },
  {
    ...baseProduct,
    id: "handbag-004",
    slug: "handbag-004",
    title: "Modern Shoulder Handbag",
    subcategory: "handbags",
    price: 2199,
    images: [
      "/products/bags/handbags/WhatsApp Image 2026-08-17 at 5.37.36 PM (1).jpeg",
    ],
  },
  {
    ...baseProduct,
    id: "handbag-005",
    slug: "handbag-005",
    title: "Signature Office Handbag",
    subcategory: "handbags",
    price: 3599,
    images: [
      "/products/bags/handbags/WhatsApp Image 2026-08-17 at 5.37.36 PM (2).jpeg",
    ],
  },
  {
    ...baseProduct,
    id: "handbag-006",
    slug: "handbag-006",
    title: "Minimal Daily Handbag",
    subcategory: "handbags",
    price: 2399,
    images: [
      "/products/bags/handbags/WhatsApp Image 2026-08-17 at 5.37.37 PM.jpeg",
    ],
  },
  {
    ...baseProduct,
    id: "handbag-007",
    slug: "handbag-007",
    title: "Classic Shoulder Bag",
    subcategory: "handbags",
    price: 2699,
    images: [
      "/products/bags/handbags/WhatsApp Image 2026-08-17 at 5.40.00 PM.jpeg",
    ],
  },
  {
    ...baseProduct,
    id: "handbag-008",
    slug: "handbag-008",
    title: "Urban Fashion Handbag",
    subcategory: "handbags",
    price: 2899,
    images: [
      "/products/bags/handbags/WhatsApp Image 2026-08-17 at 5.40.01 PM (1).jpeg",
    ],
  },
  {
    ...baseProduct,
    id: "handbag-009",
    slug: "handbag-009",
    title: "Elegant Casual Handbag",
    subcategory: "handbags",
    price: 2599,
    images: [
      "/products/bags/handbags/WhatsApp Image 2026-08-17 at 5.40.01 PM (2).jpeg",
    ],
  },
  {
    ...baseProduct,
    id: "handbag-010",
    slug: "handbag-010",
    title: "Premium Carry Handbag",
    subcategory: "handbags",
    price: 3199,
    images: [
      "/products/bags/handbags/WhatsApp Image 2026-08-17 at 5.40.01 PM.jpeg",
    ],
  },
  {
    ...baseProduct,
    id: "handbag-011",
    slug: "handbag-011",
    title: "Soft Finish Handbag",
    subcategory: "handbags",
    price: 2499,
    images: [
      "/products/bags/handbags/WhatsApp Image 2026-08-17 at 5.40.02 PM (1).jpeg",
    ],
  },
  {
    ...baseProduct,
    id: "handbag-012",
    slug: "handbag-012",
    title: "Contemporary Handbag",
    subcategory: "handbags",
    price: 2999,
    images: [
      "/products/bags/handbags/WhatsApp Image 2026-08-17 at 5.40.02 PM (2).jpeg",
    ],
  },
  {
    ...baseProduct,
    id: "handbag-013",
    slug: "handbag-013",
    title: "Statement Everyday Handbag",
    subcategory: "handbags",
    price: 3399,
    images: [
      "/products/bags/handbags/WhatsApp Image 2026-08-17 at 5.40.02 PM.jpeg",
    ],
  },

  // =========================
  // MINIBAGS
  // =========================
  {
    ...baseProduct,
    id: "minibag-001",
    slug: "minibag-001",
    title: "Chic Mini Bag",
    subcategory: "minibags",
    price: 1499,
    images: [
      "/products/bags/minibags/WhatsApp Image 2026-08-17 at 5.40.06 PM.jpeg",
    ],
  },
  {
    ...baseProduct,
    id: "minibag-002",
    slug: "minibag-002",
    title: "Compact Party Bag",
    subcategory: "minibags",
    price: 1799,
    images: [
      "/products/bags/minibags/WhatsApp Image 2026-08-17 at 5.40.07 PM (1).jpeg",
    ],
  },
  {
    ...baseProduct,
    id: "minibag-003",
    slug: "minibag-003",
    title: "Everyday Mini Crossbody",
    subcategory: "minibags",
    price: 1599,
    images: [
      "/products/bags/minibags/WhatsApp Image 2026-08-17 at 5.40.07 PM (2).jpeg",
    ],
  },
  {
    ...baseProduct,
    id: "minibag-004",
    slug: "minibag-004",
    title: "Mini Essential Bag",
    subcategory: "minibags",
    price: 1699,
    images: [
      "/products/bags/minibags/WhatsApp Image 2026-08-17 at 5.40.07 PM (3).jpeg",
    ],
  },
  {
    ...baseProduct,
    id: "minibag-005",
    slug: "minibag-005",
    title: "Elegant Mini Bag",
    subcategory: "minibags",
    price: 1899,
    images: [
      "/products/bags/minibags/WhatsApp Image 2026-08-17 at 5.40.07 PM.jpeg",
    ],
  },
  {
    ...baseProduct,
    id: "minibag-006",
    slug: "minibag-006",
    title: "Minimal Mini Crossbody",
    subcategory: "minibags",
    price: 1549,
    images: [
      "/products/bags/minibags/WhatsApp Image 2026-08-17 at 5.40.08 PM (1).jpeg",
    ],
  },
  {
    ...baseProduct,
    id: "minibag-007",
    slug: "minibag-007",
    title: "Modern Mini Bag",
    subcategory: "minibags",
    price: 1749,
    images: [
      "/products/bags/minibags/WhatsApp Image 2026-08-17 at 5.40.08 PM (2).jpeg",
    ],
  },
  {
    ...baseProduct,
    id: "minibag-008",
    slug: "minibag-008",
    title: "Daily Mini Bag",
    subcategory: "minibags",
    price: 1599,
    images: [
      "/products/bags/minibags/WhatsApp Image 2026-08-17 at 5.40.08 PM.jpeg",
    ],
  },
  {
    ...baseProduct,
    id: "minibag-009",
    slug: "minibag-009",
    title: "Classic Mini Bag",
    subcategory: "minibags",
    price: 1649,
    images: [
      "/products/bags/minibags/WhatsApp Image 2026-08-17 at 5.40.09 PM (1).jpeg",
    ],
  },
  {
    ...baseProduct,
    id: "minibag-010",
    slug: "minibag-010",
    title: "Premium Mini Bag",
    subcategory: "minibags",
    price: 1949,
    images: [
      "/products/bags/minibags/WhatsApp Image 2026-08-17 at 5.40.09 PM.jpeg",
    ],
  },
  {
    ...baseProduct,
    id: "minibag-011",
    slug: "minibag-011",
    title: "Stylish Mini Carry Bag",
    subcategory: "minibags",
    price: 1699,
    images: [
      "/products/bags/minibags/WhatsApp Image 2026-08-17 at 5.40.10 PM (1).jpeg",
    ],
  },
  {
    ...baseProduct,
    id: "minibag-012",
    slug: "minibag-012",
    title: "Elegant Compact Bag",
    subcategory: "minibags",
    price: 1799,
    images: [
      "/products/bags/minibags/WhatsApp Image 2026-08-17 at 5.40.10 PM (2).jpeg",
    ],
  },
  {
    ...baseProduct,
    id: "minibag-013",
    slug: "minibag-013",
    title: "Chic Everyday Mini Bag",
    subcategory: "minibags",
    price: 1849,
    images: [
      "/products/bags/minibags/WhatsApp Image 2026-08-17 at 5.40.10 PM (3).jpeg",
    ],
  },
  {
    ...baseProduct,
    id: "minibag-014",
    slug: "minibag-014",
    title: "Signature Mini Bag",
    subcategory: "minibags",
    price: 1999,
    images: [
      "/products/bags/minibags/WhatsApp Image 2026-08-17 at 5.40.10 PM.jpeg",
    ],
  },

  // =========================
  // SLING
  // =========================
  {
    ...baseProduct,
    id: "sling-001",
    slug: "sling-001",
    title: "Classic Sling Bag",
    subcategory: "sling",
    price: 1899,
    images: [
      "/products/bags/sling/WhatsApp Image 2026-08-17 at 5.40.13 PM.jpeg",
    ],
  },
  {
    ...baseProduct,
    id: "sling-002",
    slug: "sling-002",
    title: "Urban Crossbody Sling",
    subcategory: "sling",
    price: 2099,
    images: [
      "/products/bags/sling/WhatsApp Image 2026-08-17 at 5.40.14 PM (1).jpeg",
    ],
  },
  {
    ...baseProduct,
    id: "sling-003",
    slug: "sling-003",
    title: "Everyday Crossbody Bag",
    subcategory: "sling",
    price: 1999,
    images: [
      "/products/bags/sling/WhatsApp Image 2026-08-17 at 5.40.14 PM (2).jpeg",
    ],
  },
  {
    ...baseProduct,
    id: "sling-004",
    slug: "sling-004",
    title: "Minimal Sling Bag",
    subcategory: "sling",
    price: 1799,
    images: [
      "/products/bags/sling/WhatsApp Image 2026-08-17 at 5.40.14 PM.jpeg",
    ],
  },
  {
    ...baseProduct,
    id: "sling-005",
    slug: "sling-005",
    title: "Casual Daily Sling",
    subcategory: "sling",
    price: 1899,
    images: [
      "/products/bags/sling/WhatsApp Image 2026-08-17 at 5.40.15 PM (1).jpeg",
    ],
  },
  {
    ...baseProduct,
    id: "sling-006",
    slug: "sling-006",
    title: "Compact Shoulder Sling",
    subcategory: "sling",
    price: 1949,
    images: [
      "/products/bags/sling/WhatsApp Image 2026-08-17 at 5.40.15 PM.jpeg",
    ],
  },
  {
    ...baseProduct,
    id: "sling-007",
    slug: "sling-007",
    title: "Modern Crossbody Sling",
    subcategory: "sling",
    price: 2149,
    images: [
      "/products/bags/sling/WhatsApp Image 2026-08-17 at 5.40.16 PM (1).jpeg",
    ],
  },
  {
    ...baseProduct,
    id: "sling-008",
    slug: "sling-008",
    title: "Premium Sling Bag",
    subcategory: "sling",
    price: 2299,
    images: [
      "/products/bags/sling/WhatsApp Image 2026-08-17 at 5.40.16 PM (2).jpeg",
    ],
  },
  {
    ...baseProduct,
    id: "sling-009",
    slug: "sling-009",
    title: "Signature Sling Bag",
    subcategory: "sling",
    price: 2199,
    images: [
      "/products/bags/sling/WhatsApp Image 2026-08-17 at 5.40.17 PM.jpeg",
    ],
  },

  // =========================
  // TOTE
  // =========================
  {
    ...baseProduct,
    id: "tote-001",
    slug: "tote-001",
    title: "Everyday Carry Tote",
    subcategory: "tote",
    price: 2899,
    images: [
      "/products/bags/tote/WhatsApp Image 2026-08-17 at 5.37.36 PM.jpeg",
    ],
  },
  {
    ...baseProduct,
    id: "tote-002",
    slug: "tote-002",
    title: "Classic Work Tote",
    subcategory: "tote",
    price: 3199,
    images: [
      "/products/bags/tote/WhatsApp Image 2026-08-17 at 5.37.39 PM.jpeg",
    ],
  },
  {
    ...baseProduct,
    id: "tote-003",
    slug: "tote-003",
    title: "Premium Daily Tote",
    subcategory: "tote",
    price: 3299,
    images: [
      "/products/bags/tote/WhatsApp Image 2026-08-17 at 5.37.40 PM (1).jpeg",
    ],
  },
  {
    ...baseProduct,
    id: "tote-004",
    slug: "tote-004",
    title: "Elegant Structured Tote",
    subcategory: "tote",
    price: 3499,
    images: [
      "/products/bags/tote/WhatsApp Image 2026-08-17 at 5.37.40 PM (2).jpeg",
    ],
  },
  {
    ...baseProduct,
    id: "tote-005",
    slug: "tote-005",
    title: "Minimal Everyday Tote",
    subcategory: "tote",
    price: 2999,
    images: [
      "/products/bags/tote/WhatsApp Image 2026-08-17 at 5.37.40 PM.jpeg",
    ],
  },
  {
    ...baseProduct,
    id: "tote-006",
    slug: "tote-006",
    title: "Modern Office Tote",
    subcategory: "tote",
    price: 3399,
    images: [
      "/products/bags/tote/WhatsApp Image 2026-08-17 at 5.40.15 PM (2).jpeg",
    ],
  },
  {
    ...baseProduct,
    id: "tote-007",
    slug: "tote-007",
    title: "Signature Carry Tote",
    subcategory: "tote",
    price: 3599,
    images: [
      "/products/bags/tote/WhatsApp Image 2026-08-17 at 5.40.16 PM.jpeg",
    ],
  },

  // =========================
  // WALLETS
  // =========================
  {
    ...baseProduct,
    id: "wallet-001",
    slug: "wallet-001",
    title: "Classic Leather Wallet",
    subcategory: "wallet",
    price: 999,
    images: [
      "/products/bags/wallet/WhatsApp Image 2026-08-17 at 5.37.31 PM(1).jpeg",
    ],
  },
  {
    ...baseProduct,
    id: "wallet-002",
    slug: "wallet-002",
    title: "Slim Everyday Wallet",
    subcategory: "wallet",
    price: 1199,
    images: [
      "/products/bags/wallet/WhatsApp Image 2026-08-17 at 5.37.31 PM(2).jpeg",
    ],
  },
  {
    ...baseProduct,
    id: "wallet-003",
    slug: "wallet-003",
    title: "Premium Compact Wallet",
    subcategory: "wallet",
    price: 1399,
    images: [
      "/products/bags/wallet/WhatsApp Image 2026-08-17 at 5.37.32 PM.jpeg",
    ],
  },
];

// =====================================================
// PRODUCT DETAILS
// =====================================================

const productDetails = {
  // =========================
  // HANDBAG 001
  // COLOR + IMAGE CONNECTED
  // =========================
  "handbag-001": {
    title: "Classic Everyday Handbag",
    description:
      "A stylish everyday handbag designed for work, casual outings and daily essentials.",
    price: 2499,

    colors: [
      {
        name: "Black",
        images: [
          "/products/bags/handbags/WhatsApp Image 2026-08-17 at 5.37.34 PM (1).jpeg",
        ],
      },
      {
        name: "Brown",
        images: [
          "/products/bags/handbags/WhatsApp Image 2026-08-17 at 5.37.34 PM (1).jpeg",
        ],
      },
      {
        name: "Beige",
        images: [
          "/products/bags/handbags/WhatsApp Image 2026-08-17 at 5.37.34 PM (1).jpeg",
        ],
      },
    ],

    isOnSale: true,
    salePrice: 1999,
    discountPercentage: 20,
    orderCount: 184,
    createdAt: "2026-08-12",
    isFeatured: true,
    rating: 4.7,
    reviewCount: 86,
  },

  "handbag-002": {
    title: "Elegant Structured Handbag",
    description:
      "A structured handbag with a clean silhouette and spacious interior for everyday use.",
    price: 2799,

    colors: [
      {
        name: "Tan",
        images: [
          "/products/bags/handbags/WhatsApp Image 2026-08-17 at 5.37.34 PM.jpeg",
        ],
      },
      {
        name: "Black",
        images: [
          "/products/bags/handbags/WhatsApp Image 2026-08-17 at 5.37.34 PM.jpeg",
        ],
      },
    ],

    isOnSale: false,
    salePrice: null,
    discountPercentage: 0,
    orderCount: 92,
    createdAt: "2026-07-28",
    isFeatured: false,
    rating: 4.5,
    reviewCount: 43,
  },

  "handbag-003": {
    title: "Premium City Handbag",
    description:
      "A versatile handbag with a refined design that complements both casual and formal looks.",
    price: 3299,

    colors: [
      {
        name: "Brown",
        images: [
          "/products/bags/handbags/WhatsApp Image 2026-08-17 at 5.37.35 PM.jpeg",
        ],
      },
      {
        name: "Beige",
        images: [
          "/products/bags/handbags/WhatsApp Image 2026-08-17 at 5.37.35 PM.jpeg",
        ],
      },
      {
        name: "Black",
        images: [
          "/products/bags/handbags/WhatsApp Image 2026-08-17 at 5.37.35 PM.jpeg",
        ],
      },
    ],

    isOnSale: true,
    salePrice: 2699,
    discountPercentage: 18,
    orderCount: 241,
    createdAt: "2026-08-16",
    isFeatured: true,
    rating: 4.8,
    reviewCount: 127,
  },

  "handbag-004": {
    title: "Modern Shoulder Handbag",
    description:
      "A modern handbag created for comfortable daily carrying with a timeless finish.",
    price: 2199,

    colors: [
      {
        name: "Black",
        images: [
          "/products/bags/handbags/WhatsApp Image 2026-08-17 at 5.37.36 PM (1).jpeg",
        ],
      },
      {
        name: "Wine",
        images: [
          "/products/bags/handbags/WhatsApp Image 2026-08-17 at 5.37.36 PM (1).jpeg",
        ],
      },
    ],

    isOnSale: false,
    salePrice: null,
    discountPercentage: 0,
    orderCount: 67,
    createdAt: "2026-06-18",
    isFeatured: false,
    rating: 4.3,
    reviewCount: 28,
  },

  "handbag-005": {
    title: "Signature Office Handbag",
    description:
      "A spacious handbag perfect for office essentials, everyday accessories and organized storage.",
    price: 3599,

    colors: [
      {
        name: "Tan",
        images: [
          "/products/bags/handbags/WhatsApp Image 2026-08-17 at 5.37.36 PM (2).jpeg",
        ],
      },
      {
        name: "Brown",
        images: [
          "/products/bags/handbags/WhatsApp Image 2026-08-17 at 5.37.36 PM (2).jpeg",
        ],
      },
    ],

    isOnSale: true,
    salePrice: 2999,
    discountPercentage: 17,
    orderCount: 318,
    createdAt: "2026-08-17",
    isFeatured: true,
    rating: 4.9,
    reviewCount: 164,
  },

  "handbag-006": {
    title: "Minimal Daily Handbag",
    description:
      "A refined everyday handbag designed for effortless styling and practical daily use.",
    price: 2399,

    colors: [
      {
        name: "Black",
        images: [
          "/products/bags/handbags/WhatsApp Image 2026-08-17 at 5.37.37 PM.jpeg",
        ],
      },
      {
        name: "Brown",
        images: [
          "/products/bags/handbags/WhatsApp Image 2026-08-17 at 5.37.37 PM.jpeg",
        ],
      },
    ],

    isOnSale: false,
    salePrice: null,
    discountPercentage: 0,
    orderCount: 76,
    createdAt: "2026-07-20",
    isFeatured: false,
    rating: 4.4,
    reviewCount: 31,
  },

  "handbag-007": {
    title: "Classic Shoulder Bag",
    description:
      "A timeless shoulder bag designed for everyday comfort and sophisticated styling.",
    price: 2699,

    colors: [
      {
        name: "Black",
        images: [
          "/products/bags/handbags/WhatsApp Image 2026-08-17 at 5.40.00 PM.jpeg",
        ],
      },
      {
        name: "Tan",
        images: [
          "/products/bags/handbags/WhatsApp Image 2026-08-17 at 5.40.00 PM.jpeg",
        ],
      },
    ],

    isOnSale: false,
    salePrice: null,
    discountPercentage: 0,
    orderCount: 84,
    createdAt: "2026-07-19",
    isFeatured: false,
    rating: 4.5,
    reviewCount: 36,
  },

  "handbag-008": {
    title: "Urban Fashion Handbag",
    description:
      "A contemporary handbag with a clean silhouette made for modern everyday looks.",
    price: 2899,

    colors: [
      {
        name: "Black",
        images: [
          "/products/bags/handbags/WhatsApp Image 2026-08-17 at 5.40.01 PM (1).jpeg",
        ],
      },
      {
        name: "Beige",
        images: [
          "/products/bags/handbags/WhatsApp Image 2026-08-17 at 5.40.01 PM (1).jpeg",
        ],
      },
    ],

    isOnSale: false,
    salePrice: null,
    discountPercentage: 0,
    orderCount: 105,
    createdAt: "2026-08-02",
    isFeatured: false,
    rating: 4.6,
    reviewCount: 42,
  },

  "handbag-009": {
    title: "Elegant Casual Handbag",
    description:
      "A versatile handbag created to complement relaxed and polished everyday outfits.",
    price: 2599,

    colors: [
      {
        name: "Brown",
        images: [
          "/products/bags/handbags/WhatsApp Image 2026-08-17 at 5.40.01 PM (2).jpeg",
        ],
      },
      {
        name: "Black",
        images: [
          "/products/bags/handbags/WhatsApp Image 2026-08-17 at 5.40.01 PM (2).jpeg",
        ],
      },
    ],

    isOnSale: false,
    salePrice: null,
    discountPercentage: 0,
    orderCount: 71,
    createdAt: "2026-07-25",
    isFeatured: false,
    rating: 4.4,
    reviewCount: 29,
  },

  "handbag-010": {
    title: "Premium Carry Handbag",
    description:
      "A premium carry handbag combining practical storage with an elegant everyday appearance.",
    price: 3199,

    colors: [
      {
        name: "Black",
        images: [
          "/products/bags/handbags/WhatsApp Image 2026-08-17 at 5.40.01 PM.jpeg",
        ],
      },
      {
        name: "Tan",
        images: [
          "/products/bags/handbags/WhatsApp Image 2026-08-17 at 5.40.01 PM.jpeg",
        ],
      },
    ],

    isOnSale: false,
    salePrice: null,
    discountPercentage: 0,
    orderCount: 119,
    createdAt: "2026-08-04",
    isFeatured: false,
    rating: 4.6,
    reviewCount: 48,
  },

  "handbag-011": {
    title: "Soft Finish Handbag",
    description:
      "A softly structured handbag designed for comfortable everyday carrying.",
    price: 2499,

    colors: [
      {
        name: "Black",
        images: [
          "/products/bags/handbags/WhatsApp Image 2026-08-17 at 5.40.02 PM (1).jpeg",
        ],
      },
      {
        name: "Brown",
        images: [
          "/products/bags/handbags/WhatsApp Image 2026-08-17 at 5.40.02 PM (1).jpeg",
        ],
      },
    ],

    isOnSale: false,
    salePrice: null,
    discountPercentage: 0,
    orderCount: 64,
    createdAt: "2026-07-17",
    isFeatured: false,
    rating: 4.3,
    reviewCount: 24,
  },

  "handbag-012": {
    title: "Contemporary Handbag",
    description:
      "A contemporary handbag featuring a versatile silhouette for modern daily styling.",
    price: 2999,

    colors: [
      {
        name: "Beige",
        images: [
          "/products/bags/handbags/WhatsApp Image 2026-08-17 at 5.40.02 PM (2).jpeg",
        ],
      },
      {
        name: "Black",
        images: [
          "/products/bags/handbags/WhatsApp Image 2026-08-17 at 5.40.02 PM (2).jpeg",
        ],
      },
    ],

    isOnSale: false,
    salePrice: null,
    discountPercentage: 0,
    orderCount: 91,
    createdAt: "2026-08-06",
    isFeatured: false,
    rating: 4.5,
    reviewCount: 37,
  },

  "handbag-013": {
    title: "Statement Everyday Handbag",
    description:
      "A stylish statement handbag designed to elevate everyday outfits.",
    price: 3399,

    colors: [
      {
        name: "Brown",
        images: [
          "/products/bags/handbags/WhatsApp Image 2026-08-17 at 5.40.02 PM.jpeg",
        ],
      },
      {
        name: "Black",
        images: [
          "/products/bags/handbags/WhatsApp Image 2026-08-17 at 5.40.02 PM.jpeg",
        ],
      },
    ],

    isOnSale: false,
    salePrice: null,
    discountPercentage: 0,
    orderCount: 127,
    createdAt: "2026-08-09",
    isFeatured: true,
    rating: 4.7,
    reviewCount: 53,
  },

  // =========================
  // MINIBAGS
  // =========================

  "minibag-001": {
    title: "Chic Mini Bag",
    description:
      "A compact and stylish mini bag designed for essentials and effortless everyday styling.",
    price: 1499,
    colors: [
      {
        name: "Black",
        images: [
          "/products/bags/minibags/WhatsApp Image 2026-08-17 at 5.40.06 PM.jpeg",
        ],
      },
      {
        name: "Pink",
        images: [
          "/products/bags/minibags/WhatsApp Image 2026-08-17 at 5.40.06 PM.jpeg",
        ],
      },
    ],
    isOnSale: false,
    salePrice: null,
    discountPercentage: 0,
    orderCount: 156,
    createdAt: "2026-08-15",
    isFeatured: true,
    rating: 4.6,
    reviewCount: 74,
  },

  "minibag-002": {
    title: "Compact Party Bag",
    description:
      "A fashionable mini bag ideal for parties, dinners and special occasions.",
    price: 1799,
    colors: [
      {
        name: "Gold",
        images: [
          "/products/bags/minibags/WhatsApp Image 2026-08-17 at 5.40.07 PM (1).jpeg",
        ],
      },
      {
        name: "Black",
        images: [
          "/products/bags/minibags/WhatsApp Image 2026-08-17 at 5.40.07 PM (1).jpeg",
        ],
      },
    ],
    isOnSale: true,
    salePrice: 1399,
    discountPercentage: 22,
    orderCount: 203,
    createdAt: "2026-08-10",
    isFeatured: false,
    rating: 4.7,
    reviewCount: 98,
  },

  "minibag-003": {
    title: "Everyday Mini Crossbody",
    description:
      "A lightweight mini bag offering convenient carrying and a clean modern appearance.",
    price: 1599,
    colors: [
      {
        name: "Beige",
        images: [
          "/products/bags/minibags/WhatsApp Image 2026-08-17 at 5.40.07 PM (2).jpeg",
        ],
      },
      {
        name: "Brown",
        images: [
          "/products/bags/minibags/WhatsApp Image 2026-08-17 at 5.40.07 PM (2).jpeg",
        ],
      },
    ],
    isOnSale: false,
    salePrice: null,
    discountPercentage: 0,
    orderCount: 88,
    createdAt: "2026-07-21",
    isFeatured: false,
    rating: 4.4,
    reviewCount: 39,
  },

  "minibag-004": {
    title: "Mini Essential Bag",
    description:
      "A compact everyday bag designed to carry your essential belongings comfortably.",
    price: 1699,
    colors: [
      {
        name: "Black",
        images: [
          "/products/bags/minibags/WhatsApp Image 2026-08-17 at 5.40.07 PM (3).jpeg",
        ],
      },
      {
        name: "Beige",
        images: [
          "/products/bags/minibags/WhatsApp Image 2026-08-17 at 5.40.07 PM (3).jpeg",
        ],
      },
    ],
    isOnSale: false,
    salePrice: null,
    discountPercentage: 0,
    orderCount: 72,
    createdAt: "2026-07-24",
    isFeatured: false,
    rating: 4.4,
    reviewCount: 30,
  },

  "minibag-005": {
    title: "Elegant Mini Bag",
    description:
      "A polished mini bag designed for effortless styling and everyday essentials.",
    price: 1899,
    colors: [
      {
        name: "Black",
        images: [
          "/products/bags/minibags/WhatsApp Image 2026-08-17 at 5.40.07 PM.jpeg",
        ],
      },
      {
        name: "Pink",
        images: [
          "/products/bags/minibags/WhatsApp Image 2026-08-17 at 5.40.07 PM.jpeg",
        ],
      },
    ],
    isOnSale: false,
    salePrice: null,
    discountPercentage: 0,
    orderCount: 83,
    createdAt: "2026-07-29",
    isFeatured: false,
    rating: 4.5,
    reviewCount: 34,
  },

  "minibag-006": {
    title: "Minimal Mini Crossbody",
    description:
      "A lightweight crossbody mini bag designed for simple and practical everyday use.",
    price: 1549,
    colors: [
      {
        name: "Black",
        images: [
          "/products/bags/minibags/WhatsApp Image 2026-08-17 at 5.40.08 PM (1).jpeg",
        ],
      },
      {
        name: "Brown",
        images: [
          "/products/bags/minibags/WhatsApp Image 2026-08-17 at 5.40.08 PM (1).jpeg",
        ],
      },
    ],
    isOnSale: false,
    salePrice: null,
    discountPercentage: 0,
    orderCount: 65,
    createdAt: "2026-07-18",
    isFeatured: false,
    rating: 4.3,
    reviewCount: 27,
  },

  "minibag-007": {
    title: "Modern Mini Bag",
    description:
      "A modern compact bag designed to complement contemporary everyday looks.",
    price: 1749,
    colors: [
      {
        name: "Black",
        images: [
          "/products/bags/minibags/WhatsApp Image 2026-08-17 at 5.40.08 PM (2).jpeg",
        ],
      },
      {
        name: "Tan",
        images: [
          "/products/bags/minibags/WhatsApp Image 2026-08-17 at 5.40.08 PM (2).jpeg",
        ],
      },
    ],
    isOnSale: false,
    salePrice: null,
    discountPercentage: 0,
    orderCount: 94,
    createdAt: "2026-08-03",
    isFeatured: false,
    rating: 4.5,
    reviewCount: 40,
  },

  "minibag-008": {
    title: "Daily Mini Bag",
    description:
      "A simple and versatile mini bag made for everyday essentials.",
    price: 1599,
    colors: [
      {
        name: "Black",
        images: [
          "/products/bags/minibags/WhatsApp Image 2026-08-17 at 5.40.08 PM.jpeg",
        ],
      },
      {
        name: "Beige",
        images: [
          "/products/bags/minibags/WhatsApp Image 2026-08-17 at 5.40.08 PM.jpeg",
        ],
      },
    ],
    isOnSale: false,
    salePrice: null,
    discountPercentage: 0,
    orderCount: 58,
    createdAt: "2026-07-16",
    isFeatured: false,
    rating: 4.3,
    reviewCount: 22,
  },

  "minibag-009": {
    title: "Classic Mini Bag",
    description:
      "A timeless mini bag offering practical storage in a compact silhouette.",
    price: 1649,
    colors: [
      {
        name: "Black",
        images: [
          "/products/bags/minibags/WhatsApp Image 2026-08-17 at 5.40.09 PM (1).jpeg",
        ],
      },
      {
        name: "Brown",
        images: [
          "/products/bags/minibags/WhatsApp Image 2026-08-17 at 5.40.09 PM (1).jpeg",
        ],
      },
    ],
    isOnSale: false,
    salePrice: null,
    discountPercentage: 0,
    orderCount: 77,
    createdAt: "2026-07-26",
    isFeatured: false,
    rating: 4.4,
    reviewCount: 31,
  },

  "minibag-010": {
    title: "Premium Mini Bag",
    description: "A premium compact bag designed for refined everyday styling.",
    price: 1949,
    colors: [
      {
        name: "Black",
        images: [
          "/products/bags/minibags/WhatsApp Image 2026-08-17 at 5.40.09 PM.jpeg",
        ],
      },
      {
        name: "Gold",
        images: [
          "/products/bags/minibags/WhatsApp Image 2026-08-17 at 5.40.09 PM.jpeg",
        ],
      },
    ],
    isOnSale: false,
    salePrice: null,
    discountPercentage: 0,
    orderCount: 103,
    createdAt: "2026-08-05",
    isFeatured: true,
    rating: 4.7,
    reviewCount: 44,
  },

  "minibag-011": {
    title: "Stylish Mini Carry Bag",
    description:
      "A stylish compact bag designed for convenient everyday carrying.",
    price: 1699,
    colors: [
      {
        name: "Black",
        images: [
          "/products/bags/minibags/WhatsApp Image 2026-08-17 at 5.40.10 PM (1).jpeg",
        ],
      },
      {
        name: "Pink",
        images: [
          "/products/bags/minibags/WhatsApp Image 2026-08-17 at 5.40.10 PM (1).jpeg",
        ],
      },
    ],
    isOnSale: false,
    salePrice: null,
    discountPercentage: 0,
    orderCount: 69,
    createdAt: "2026-07-23",
    isFeatured: false,
    rating: 4.4,
    reviewCount: 26,
  },

  "minibag-012": {
    title: "Elegant Compact Bag",
    description: "A refined compact bag designed for simple everyday styling.",
    price: 1799,
    colors: [
      {
        name: "Beige",
        images: [
          "/products/bags/minibags/WhatsApp Image 2026-08-17 at 5.40.10 PM (2).jpeg",
        ],
      },
      {
        name: "Brown",
        images: [
          "/products/bags/minibags/WhatsApp Image 2026-08-17 at 5.40.10 PM (2).jpeg",
        ],
      },
    ],
    isOnSale: false,
    salePrice: null,
    discountPercentage: 0,
    orderCount: 81,
    createdAt: "2026-08-01",
    isFeatured: false,
    rating: 4.5,
    reviewCount: 33,
  },

  "minibag-013": {
    title: "Chic Everyday Mini Bag",
    description:
      "A chic mini bag designed to carry essentials with effortless style.",
    price: 1849,
    colors: [
      {
        name: "Black",
        images: [
          "/products/bags/minibags/WhatsApp Image 2026-08-17 at 5.40.10 PM (3).jpeg",
        ],
      },
      {
        name: "Tan",
        images: [
          "/products/bags/minibags/WhatsApp Image 2026-08-17 at 5.40.10 PM (3).jpeg",
        ],
      },
    ],
    isOnSale: false,
    salePrice: null,
    discountPercentage: 0,
    orderCount: 96,
    createdAt: "2026-08-07",
    isFeatured: false,
    rating: 4.5,
    reviewCount: 38,
  },

  "minibag-014": {
    title: "Signature Mini Bag",
    description:
      "A signature compact bag combining practical design with a premium finish.",
    price: 1999,
    colors: [
      {
        name: "Black",
        images: [
          "/products/bags/minibags/WhatsApp Image 2026-08-17 at 5.40.10 PM.jpeg",
        ],
      },
      {
        name: "Brown",
        images: [
          "/products/bags/minibags/WhatsApp Image 2026-08-17 at 5.40.10 PM.jpeg",
        ],
      },
    ],
    isOnSale: false,
    salePrice: null,
    discountPercentage: 0,
    orderCount: 112,
    createdAt: "2026-08-08",
    isFeatured: true,
    rating: 4.6,
    reviewCount: 47,
  },

  // =========================
  // SLING
  // =========================

  "sling-001": {
    title: "Classic Sling Bag",
    description:
      "A versatile sling bag designed for hands-free comfort and everyday essentials.",
    price: 1899,
    colors: [
      {
        name: "Black",
        images: [
          "/products/bags/sling/WhatsApp Image 2026-08-17 at 5.40.13 PM.jpeg",
        ],
      },
      {
        name: "Brown",
        images: [
          "/products/bags/sling/WhatsApp Image 2026-08-17 at 5.40.13 PM.jpeg",
        ],
      },
    ],
    isOnSale: true,
    salePrice: 1499,
    discountPercentage: 21,
    orderCount: 276,
    createdAt: "2026-08-18",
    isFeatured: true,
    rating: 4.8,
    reviewCount: 143,
  },

  "sling-002": {
    title: "Urban Crossbody Sling",
    description:
      "A modern crossbody sling with a practical design for everyday use.",
    price: 2099,
    colors: [
      {
        name: "Black",
        images: [
          "/products/bags/sling/WhatsApp Image 2026-08-17 at 5.40.14 PM (1).jpeg",
        ],
      },
      {
        name: "Tan",
        images: [
          "/products/bags/sling/WhatsApp Image 2026-08-17 at 5.40.14 PM (1).jpeg",
        ],
      },
    ],
    isOnSale: false,
    salePrice: null,
    discountPercentage: 0,
    orderCount: 121,
    createdAt: "2026-08-05",
    isFeatured: false,
    rating: 4.5,
    reviewCount: 56,
  },

  "sling-003": {
    title: "Everyday Crossbody Bag",
    description:
      "A comfortable crossbody bag designed for simple everyday carrying.",
    price: 1999,
    colors: [
      {
        name: "Black",
        images: [
          "/products/bags/sling/WhatsApp Image 2026-08-17 at 5.40.14 PM (2).jpeg",
        ],
      },
      {
        name: "Brown",
        images: [
          "/products/bags/sling/WhatsApp Image 2026-08-17 at 5.40.14 PM (2).jpeg",
        ],
      },
    ],
    isOnSale: false,
    salePrice: null,
    discountPercentage: 0,
    orderCount: 87,
    createdAt: "2026-07-22",
    isFeatured: false,
    rating: 4.4,
    reviewCount: 35,
  },

  "sling-004": {
    title: "Minimal Sling Bag",
    description:
      "A minimal sling bag designed for lightweight everyday carrying.",
    price: 1799,
    colors: [
      {
        name: "Black",
        images: [
          "/products/bags/sling/WhatsApp Image 2026-08-17 at 5.40.14 PM.jpeg",
        ],
      },
      {
        name: "Beige",
        images: [
          "/products/bags/sling/WhatsApp Image 2026-08-17 at 5.40.14 PM.jpeg",
        ],
      },
    ],
    isOnSale: false,
    salePrice: null,
    discountPercentage: 0,
    orderCount: 73,
    createdAt: "2026-07-15",
    isFeatured: false,
    rating: 4.3,
    reviewCount: 29,
  },

  "sling-005": {
    title: "Casual Daily Sling",
    description:
      "A casual sling bag made for comfortable daily use and easy styling.",
    price: 1899,
    colors: [
      {
        name: "Black",
        images: [
          "/products/bags/sling/WhatsApp Image 2026-08-17 at 5.40.15 PM (1).jpeg",
        ],
      },
      {
        name: "Tan",
        images: [
          "/products/bags/sling/WhatsApp Image 2026-08-17 at 5.40.15 PM (1).jpeg",
        ],
      },
    ],
    isOnSale: false,
    salePrice: null,
    discountPercentage: 0,
    orderCount: 94,
    createdAt: "2026-07-27",
    isFeatured: false,
    rating: 4.4,
    reviewCount: 37,
  },

  "sling-006": {
    title: "Compact Shoulder Sling",
    description: "A compact shoulder sling designed for everyday essentials.",
    price: 1949,
    colors: [
      {
        name: "Black",
        images: [
          "/products/bags/sling/WhatsApp Image 2026-08-17 at 5.40.15 PM.jpeg",
        ],
      },
      {
        name: "Brown",
        images: [
          "/products/bags/sling/WhatsApp Image 2026-08-17 at 5.40.15 PM.jpeg",
        ],
      },
    ],
    isOnSale: false,
    salePrice: null,
    discountPercentage: 0,
    orderCount: 82,
    createdAt: "2026-08-02",
    isFeatured: false,
    rating: 4.5,
    reviewCount: 34,
  },

  "sling-007": {
    title: "Modern Crossbody Sling",
    description:
      "A modern crossbody sling designed for stylish everyday movement.",
    price: 2149,
    colors: [
      {
        name: "Black",
        images: [
          "/products/bags/sling/WhatsApp Image 2026-08-17 at 5.40.16 PM (1).jpeg",
        ],
      },
      {
        name: "Tan",
        images: [
          "/products/bags/sling/WhatsApp Image 2026-08-17 at 5.40.16 PM (1).jpeg",
        ],
      },
    ],
    isOnSale: false,
    salePrice: null,
    discountPercentage: 0,
    orderCount: 109,
    createdAt: "2026-08-04",
    isFeatured: true,
    rating: 4.6,
    reviewCount: 45,
  },

  "sling-008": {
    title: "Premium Sling Bag",
    description:
      "A premium sling bag combining practical storage with a refined appearance.",
    price: 2299,
    colors: [
      {
        name: "Black",
        images: [
          "/products/bags/sling/WhatsApp Image 2026-08-17 at 5.40.16 PM (2).jpeg",
        ],
      },
      {
        name: "Brown",
        images: [
          "/products/bags/sling/WhatsApp Image 2026-08-17 at 5.40.16 PM (2).jpeg",
        ],
      },
    ],
    isOnSale: false,
    salePrice: null,
    discountPercentage: 0,
    orderCount: 135,
    createdAt: "2026-08-06",
    isFeatured: true,
    rating: 4.7,
    reviewCount: 58,
  },

  "sling-009": {
    title: "Signature Sling Bag",
    description:
      "A signature sling bag designed for effortless everyday styling.",
    price: 2199,
    colors: [
      {
        name: "Black",
        images: [
          "/products/bags/sling/WhatsApp Image 2026-08-17 at 5.40.17 PM.jpeg",
        ],
      },
      {
        name: "Beige",
        images: [
          "/products/bags/sling/WhatsApp Image 2026-08-17 at 5.40.17 PM.jpeg",
        ],
      },
    ],
    isOnSale: false,
    salePrice: null,
    discountPercentage: 0,
    orderCount: 117,
    createdAt: "2026-08-09",
    isFeatured: false,
    rating: 4.6,
    reviewCount: 49,
  },

  // =========================
  // TOTE
  // =========================

  "tote-001": {
    title: "Everyday Carry Tote",
    description:
      "A spacious tote bag designed to carry daily essentials with comfort and style.",
    price: 2899,
    colors: [
      {
        name: "Brown",
        images: [
          "/products/bags/tote/WhatsApp Image 2026-08-17 at 5.37.36 PM.jpeg",
        ],
      },
      {
        name: "Beige",
        images: [
          "/products/bags/tote/WhatsApp Image 2026-08-17 at 5.37.36 PM.jpeg",
        ],
      },
    ],
    isOnSale: true,
    salePrice: 2299,
    discountPercentage: 21,
    orderCount: 347,
    createdAt: "2026-08-14",
    isFeatured: true,
    rating: 4.9,
    reviewCount: 192,
  },

  "tote-002": {
    title: "Classic Work Tote",
    description:
      "A practical and elegant tote with room for your everyday work essentials.",
    price: 3199,
    colors: [
      {
        name: "Black",
        images: [
          "/products/bags/tote/WhatsApp Image 2026-08-17 at 5.37.39 PM.jpeg",
        ],
      },
      {
        name: "Tan",
        images: [
          "/products/bags/tote/WhatsApp Image 2026-08-17 at 5.37.39 PM.jpeg",
        ],
      },
    ],
    isOnSale: false,
    salePrice: null,
    discountPercentage: 0,
    orderCount: 167,
    createdAt: "2026-07-30",
    isFeatured: false,
    rating: 4.6,
    reviewCount: 81,
  },

  "tote-003": {
    title: "Premium Daily Tote",
    description:
      "A spacious premium tote designed for comfortable everyday carrying.",
    price: 3299,
    colors: [
      {
        name: "Brown",
        images: [
          "/products/bags/tote/WhatsApp Image 2026-08-17 at 5.37.40 PM (1).jpeg",
        ],
      },
      {
        name: "Beige",
        images: [
          "/products/bags/tote/WhatsApp Image 2026-08-17 at 5.37.40 PM (1).jpeg",
        ],
      },
    ],
    isOnSale: false,
    salePrice: null,
    discountPercentage: 0,
    orderCount: 142,
    createdAt: "2026-08-03",
    isFeatured: false,
    rating: 4.7,
    reviewCount: 63,
  },

  "tote-004": {
    title: "Elegant Structured Tote",
    description:
      "A structured tote designed for polished everyday and office looks.",
    price: 3499,
    colors: [
      {
        name: "Black",
        images: [
          "/products/bags/tote/WhatsApp Image 2026-08-17 at 5.37.40 PM (2).jpeg",
        ],
      },
      {
        name: "Tan",
        images: [
          "/products/bags/tote/WhatsApp Image 2026-08-17 at 5.37.40 PM (2).jpeg",
        ],
      },
    ],
    isOnSale: false,
    salePrice: null,
    discountPercentage: 0,
    orderCount: 128,
    createdAt: "2026-07-31",
    isFeatured: false,
    rating: 4.6,
    reviewCount: 51,
  },

  "tote-005": {
    title: "Minimal Everyday Tote",
    description: "A clean and versatile tote designed for simple everyday use.",
    price: 2999,
    colors: [
      {
        name: "Beige",
        images: [
          "/products/bags/tote/WhatsApp Image 2026-08-17 at 5.37.40 PM.jpeg",
        ],
      },
      {
        name: "Brown",
        images: [
          "/products/bags/tote/WhatsApp Image 2026-08-17 at 5.37.40 PM.jpeg",
        ],
      },
    ],
    isOnSale: false,
    salePrice: null,
    discountPercentage: 0,
    orderCount: 104,
    createdAt: "2026-07-26",
    isFeatured: false,
    rating: 4.5,
    reviewCount: 42,
  },

  "tote-006": {
    title: "Modern Office Tote",
    description:
      "A modern office tote designed to organize everyday essentials with ease.",
    price: 3399,
    colors: [
      {
        name: "Black",
        images: [
          "/products/bags/tote/WhatsApp Image 2026-08-17 at 5.40.15 PM (2).jpeg",
        ],
      },
      {
        name: "Brown",
        images: [
          "/products/bags/tote/WhatsApp Image 2026-08-17 at 5.40.15 PM (2).jpeg",
        ],
      },
    ],
    isOnSale: false,
    salePrice: null,
    discountPercentage: 0,
    orderCount: 118,
    createdAt: "2026-08-07",
    isFeatured: true,
    rating: 4.7,
    reviewCount: 49,
  },

  "tote-007": {
    title: "Signature Carry Tote",
    description:
      "A signature tote offering generous space with a premium everyday finish.",
    price: 3599,
    colors: [
      {
        name: "Black",
        images: [
          "/products/bags/tote/WhatsApp Image 2026-08-17 at 5.40.16 PM.jpeg",
        ],
      },
      {
        name: "Tan",
        images: [
          "/products/bags/tote/WhatsApp Image 2026-08-17 at 5.40.16 PM.jpeg",
        ],
      },
    ],
    isOnSale: false,
    salePrice: null,
    discountPercentage: 0,
    orderCount: 154,
    createdAt: "2026-08-10",
    isFeatured: true,
    rating: 4.8,
    reviewCount: 67,
  },

  // =========================
  // WALLETS
  // =========================

  "wallet-001": {
    title: "Classic Leather Wallet",
    description:
      "A compact wallet designed for cards, cash and everyday convenience.",
    price: 999,
    colors: [
      {
        name: "Black",
        images: [
          "/products/bags/wallet/WhatsApp Image 2026-08-17 at 5.37.31 PM(1).jpeg",
        ],
      },
      {
        name: "Brown",
        images: [
          "/products/bags/wallet/WhatsApp Image 2026-08-17 at 5.37.31 PM(1).jpeg",
        ],
      },
    ],
    isOnSale: true,
    salePrice: 799,
    discountPercentage: 20,
    orderCount: 289,
    createdAt: "2026-08-11",
    isFeatured: true,
    rating: 4.7,
    reviewCount: 135,
  },

  "wallet-002": {
    title: "Slim Everyday Wallet",
    description:
      "A slim and practical wallet with a clean design for daily use.",
    price: 1199,
    colors: [
      {
        name: "Brown",
        images: [
          "/products/bags/wallet/WhatsApp Image 2026-08-17 at 5.37.31 PM(2).jpeg",
        ],
      },
      {
        name: "Tan",
        images: [
          "/products/bags/wallet/WhatsApp Image 2026-08-17 at 5.37.31 PM(2).jpeg",
        ],
      },
    ],
    isOnSale: false,
    salePrice: null,
    discountPercentage: 0,
    orderCount: 143,
    createdAt: "2026-08-01",
    isFeatured: false,
    rating: 4.5,
    reviewCount: 62,
  },

  "wallet-003": {
    title: "Premium Compact Wallet",
    description:
      "A refined compact wallet combining everyday practicality with a premium appearance.",
    price: 1399,
    colors: [
      {
        name: "Black",
        images: [
          "/products/bags/wallet/WhatsApp Image 2026-08-17 at 5.37.32 PM.jpeg",
        ],
      },
      {
        name: "Coffee",
        images: [
          "/products/bags/wallet/WhatsApp Image 2026-08-17 at 5.37.32 PM.jpeg",
        ],
      },
    ],
    isOnSale: true,
    salePrice: 1099,
    discountPercentage: 21,
    orderCount: 196,
    createdAt: "2026-08-16",
    isFeatured: true,
    rating: 4.8,
    reviewCount: 97,
  },
};

// =====================================================
// ENRICHED PRODUCTS
// =====================================================

export const enrichedProducts = products.map((product) => ({
  ...product,
  ...(productDetails[product.id] || {}),
}));
