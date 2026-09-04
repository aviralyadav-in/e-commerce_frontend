# Niya Bags — Luxury Handbag E-Commerce Website

Niya Bags is a modern, premium e-commerce frontend for a luxury handbag brand. It focuses on clean visuals, premium presentation, responsive design, smooth product discovery, and an architecture ready for full backend integration.

> **In short:** A luxury handbag shopping website where customers can browse bags, view product details, save favorites, add to cart, and complete checkout — all from a fast, mobile-friendly interface.

---

## What This Project Does (For Everyone)

Niya Bags is a complete online shopping experience for handbags. A customer can:

- Land on a beautiful homepage showcasing bestsellers, new arrivals, and brand story
- Browse all bags on the Shop page
- Filter bags by category, color, price, and other features
- Open any product to see full details, multiple images, and similar suggestions
- Save bags they like to a personal Wishlist
- Add bags to a Shopping Cart
- Place an Order and view order history
- Switch between Light Mode and Dark Mode
- Use the website easily on mobile, tablet, or desktop

**Behind the scenes:** the website is built with React (a popular web technology), is super fast, and is designed so that real product data, payments, and user accounts can be plugged in easily later.

---

## Table of Contents

1. [Project Status](#project-status)
2. [Tech Stack](#tech-stack)
3. [Main Features](#main-features)
   - [Homepage](#1-homepage)
   - [Product System](#2-product-system)
   - [Shop Page](#3-shop-page)
   - [Search](#4-search)
   - [Wishlist](#5-wishlist)
   - [Shopping Cart](#6-shopping-cart)
   - [Orders & Checkout](#7-orders--checkout)
   - [User Account & Authentication](#8-user-account--authentication)
   - [Theme Support](#9-theme-support)
   - [Responsive Design](#10-responsive-design)
4. [API Integration](#api-integration)
5. [Product & Category Architecture](#product--category-architecture)
6. [Discount & Sale System](#discount--sale-system)
7. [Design Direction](#design-direction)
8. [Project Structure](#project-structure)
9. [Development Goals](#development-goals)
10. [Current Development Phase](#current-development-phase)
11. [Author](#author)

---

## Project Status

**Current Status:** Frontend development — core shopping experience is implemented and functional. The project is being refined and prepared for final backend, payment, and account integration.

### Currently Working (Live Features)

* Premium responsive homepage
* Announcement bar
* Responsive navbar
* Search overlay with product suggestions
* Light / Dark theme support
* Hero banner
* Trust / benefits section
* Shop by Category
* Featured Products
* Best Sellers section
* New Arrivals section
* Campaign / spotlight section
* Niya Reels section
* Brand Craftsmanship section
* Customer Reviews section
* Newsletter section
* Responsive footer with information pages
* Shop / product listing page
* Product details page with image gallery
* Wishlist functionality
* Cart functionality
* Order placement and order history
* Product search
* Product suggestions
* React Router-based navigation
* Centralized API layer
* Reusable product components
* Fully responsive layouts (desktop and mobile)

---

## Tech Stack

### Frontend

* **React 19.2.8** — Building the user interface
* **Vite** — Fast development server and production build tool
* **Tailwind CSS (v4)** — Styling and responsive design
* **React Router DOM 7.18.2** — Page-to-page navigation without full reloads
* **React Icons 5.7.0** — Icon library
* **Axios 1.19.0** — Talking to backend APIs

### State & Application Management

* **React Context API** — Shares data across pages
  * Cart state
  * Wishlist state
  * Authentication state
  * Theme state
* **Redux Toolkit 2.x** + **React Redux 9.3.0** — Installed for future global state needs

---

## Main Features

### 1. Homepage

The homepage is the first impression of the brand. It is split into reusable sections, each one telling a small part of the brand story.

1. Announcement Bar
2. Navbar
3. Hero Banner
4. Trust Badges
5. Shop by Category
6. Featured Products
7. Best Sellers
8. New Arrivals
9. Campaign Spotlight
10. Niya Reels
11. Brand Craftsmanship
12. Customer Reviews
13. Newsletter
14. Footer

The design follows a minimal, elegant, premium fashion-commerce aesthetic — clean, spacious, and luxury-focused.

> **What it does for the customer:** A new visitor instantly sees the brand, what bags are popular, what the store stands for, and can jump into shopping in one click.

> **🛠 Problems to Fix (Production Level):**
> - The homepage is built as a long single page with no lazy loading — heavy sections (reels, craftsmanship, reviews) block initial paint and hurt mobile performance. **Fix:** use `React.lazy` + `Suspense` to load below-the-fold sections only when scrolled into view.
> - The `Niya Reels` section loads video assets eagerly, which is a serious bandwidth problem on slow networks. **Fix:** add an explicit "Play" button that loads video on click, with a static poster image as placeholder.
> - The homepage currently does not set page-level SEO meta tags (title, description, OpenGraph). **Fix:** integrate `react-helmet-async` and set unique metadata per page so the site is shareable and ranks on Google.

---

### 2. Product System

Products are managed through a centralized data layer, designed to be replaced with real backend APIs without changing any UI.

Implemented functionality:

* Product listing
* Product details with image gallery
* Product pricing (original + discounted)
* Product suggestions (related items)
* Product search
* Featured products
* Best sellers
* New arrivals
* Sale products
* Product navigation by ID

> **What it does for the customer:** Every product has its own page with high-quality images, full description, available colors, stock info, and "you may also like" suggestions.

> **🛠 Problems to Fix (Production Level):**
> - Products are currently served from a large local `data/products.js` file (1797+ lines) instead of a real API — this file gets shipped to the browser, exposes internal data, and cannot be updated without a redeploy. **Fix:** replace with real `/products` API calls and use a CMS or backend database as the single source of truth.
> - Image file names in mock data include `WhatsApp Image 2026-08-17...` style names — these leak personal data and are not SEO-friendly. **Fix:** rename to clean, descriptive slugs like `handbag-black-01.webp` and serve from a CDN.
> - Product IDs mix `id` (string) and `_id` patterns across files, causing edge-case bugs. **Fix:** standardize on a single `id` field across the entire data model.

---

### 3. Shop Page

The Shop page is the main product browsing experience. Customers can filter, sort, and explore the full catalog.

Current functionality:

* Fetches the full product list
* Product cards with image, name, price
* Wishlist toggle from each card
* "Add to cart" from each card
* Product detail navigation
* Category and subcategory filtering
* Color filter
* Price range filter
* Sort by price / popularity / newest
* Responsive product grid (1/2/3/4 columns)

> **What it does for the customer:** A buyer can narrow down the catalog exactly the way they want — "Show me black handbags under ₹5000, newest first" — and find what they want in seconds.

> **🛠 Problems to Fix (Production Level):**
> - All filtering, sorting, and searching happens in the browser after loading the entire catalog. This is fine for 50 products but will crash with 5,000+. **Fix:** send filter, sort, and search parameters to the backend as query params (`?category=&color=&minPrice=&sort=`) and let the server return only matching results.
> - The Shop page has no pagination or infinite scroll — it renders all products at once. **Fix:** add pagination (e.g. 24 per page) or virtualized infinite scroll using `react-window`.
> - Filters are not reflected in the URL, so a filtered view cannot be bookmarked or shared. **Fix:** sync filter state to URL search params so links are shareable.

---

### 4. Search

A search overlay is built into the navbar. Users can search from any page and jump directly to a product.

Users can:

* Open search from the navbar (desktop + mobile)
* Type a product name, category, or keyword
* See live matching product suggestions
* Click any suggestion to open the product details page
* Close the search overlay

> **What it does for the customer:** A customer who knows what they want can find it in 2 seconds without scrolling.

> **🛠 Problems to Fix (Production Level):**
> - Search runs on the full local product list in the browser. As catalog grows, this becomes slow and stale. **Fix:** call a backend `/search?q=` endpoint that uses proper search indexing (Algolia, Meilisearch, or database full-text search).
> - There is no search analytics, typo tolerance, or "did you mean" suggestions. **Fix:** log search queries, capture zero-result searches, and add typo tolerance via the search engine.
> - Search overlay does not have a focus trap or ESC-to-close behaviour — a keyboard or screen-reader user can get lost. **Fix:** add focus trap, ESC handler, and proper ARIA attributes (`role="dialog"`, `aria-modal="true"`).

---

### 5. Wishlist

The Wishlist is a personal collection of bags a customer wants to buy later.

Users can:

* Add a product to wishlist from any product card or details page
* Remove a product from wishlist
* See the wishlist count in the navbar
* Open the full Wishlist page
* Move wishlist items to the cart
* Wishlist data persists across browser sessions

> **What it does for the customer:** A shopper can save bags they love, compare them later, and come back to buy when ready — like a personal favorites folder.

> **🛠 Problems to Fix (Production Level):**
> - Wishlist is stored only in the browser's `localStorage`. If the customer switches devices, logs in from another browser, or clears browser data, the entire wishlist is lost. **Fix:** persist wishlist on the backend, tied to the user account, and sync across devices.
> - Wishlist keys mix product `id` and composite `id-color` formats in different places, which can cause duplicates. **Fix:** use a single canonical key format (e.g. `id::colorHex`) and validate on read.
> - The wishlist never expires or checks if a saved product is still in stock. **Fix:** show "Out of stock" / "Discontinued" badges on stale wishlist items and offer to remove them.

---

### 6. Shopping Cart

The cart is the temporary collection of items a customer intends to purchase right now.

The cart system supports:

* Add product (with selected color) to cart
* Remove product from cart
* Update quantity
* Cart item count in navbar
* Cart total and subtotal
* Promo code (`NIYA10` for 10% off)
* Cart page with full breakdown
* Cart persists across browser sessions

> **What it does for the customer:** A customer can collect multiple bags, change quantities, apply a discount code, and see the final price before paying.

> **🛠 Problems to Fix (Production Level):**
> - The cart uses a real backend API but the wishlist does not — this creates a confusing split where a logged-in user has their cart saved on the server but their wishlist only in the browser. **Fix:** move wishlist to the same backend, with one unified user-data API.
> - Promo code `NIYA10` is hardcoded into the frontend and is trivially bypassable. **Fix:** validate promo codes on the backend only, return discount from the API, and support multiple active campaigns.
> - The cart does not show estimated shipping, taxes, or delivery date — customers abandon carts when surprised by final cost. **Fix:** call a backend quote endpoint that returns shipping + tax based on address.

---

### 7. Orders & Checkout

The Order system lets a customer complete a purchase and view their past orders.

Currently working:

* Cart checkout flow
* Order summary review
* Shipping address form
* Payment method selection (UI only)
* Place order action
* Order confirmation
* "My Orders" page with full order history
* Order details (items, address, total, date)

> **What it does for the customer:** A customer can review the cart, enter their address, choose a payment method, place an order, and see a history of all past purchases.

> **🛠 Problems to Fix (Production Level):**
> - Orders are stored only in `localStorage` under `niyaOrders`. This is **critical** for a real shop — orders will disappear the moment the user clears their browser. **Fix:** send orders to a real backend endpoint (`POST /orders`) and fetch history from `GET /orders/me`.
> - The order flow does not call any real payment gateway (Razorpay / Stripe / PayPal). **Fix:** integrate a real payment provider before accepting any real money — never launch a checkout that charges cards without PCI-DSS compliant payment processing.
> - There is no order status tracking (Placed → Confirmed → Shipped → Delivered). **Fix:** add a status timeline component and let the customer track their order.
> - `createOrder` import is commented out in `OrderPage.jsx` — the code path is incomplete. **Fix:** wire the order placement to the real API and remove dead code.

---

### 8. User Account & Authentication

Customers can create an account, sign in, and access personal information.

Currently working:

* Login form
* Logout
* Session persistence in browser
* Auth state shared across the app
* User context provider

> **What it does for the customer:** A customer can sign in once and stay signed in, and the system remembers them on return visits.

> **🛠 Problems to Fix (Production Level):**
> - **Critical security issue:** User accounts are stored in `localStorage` with **plain-text passwords** (see `authApi.js`). This is a severe vulnerability — even for development, never store passwords in plain text. **Fix:** use a real backend with hashed passwords (bcrypt) and JWT or httpOnly session cookies; never send or store passwords in the frontend.
> - There is no registration / sign-up flow — only login. **Fix:** add a registration page with email verification.
> - There are no protected routes — logged-out users can still see account, orders, and wishlist pages. **Fix:** wrap protected routes in a `<ProtectedRoute>` component that redirects to login.
> - There is no token refresh logic, so users will be randomly logged out. **Fix:** implement silent token refresh using an httpOnly refresh cookie.

---

### 9. Theme Support

The website supports both Light Mode and Dark Mode. A dedicated Theme Context manages the selected theme across the entire application and remembers the user's choice.

> **What it does for the customer:** A customer can choose their preferred look — light for daytime browsing, dark for evening — and the website remembers it next time.

> **🛠 Problems to Fix (Production Level):**
> - Some hardcoded dark colors (e.g. `bg-[var(--color-dark-section)]`) do not have proper light-mode equivalents, causing visual inconsistency. **Fix:** define every color as a semantic token that flips based on theme (e.g. `--surface-dark`, `--surface-light`).
> - The theme toggle does not respect the user's system preference on first visit. **Fix:** initialize theme from `prefers-color-scheme` if no saved preference exists.

---

### 10. Responsive Design

The UI is designed to look beautiful on:

* Desktop
* Laptop
* Tablet
* Mobile

Tailwind CSS responsive utilities (`sm:`, `md:`, `lg:`, `xl:`) are used throughout the application to adapt layouts at every breakpoint.

> **What it does for the customer:** The same website feels native whether you open it on a phone in a queue or on a desktop at home.

> **🛠 Problems to Fix (Production Level):**
> - There is no dedicated mobile bottom navigation — mobile users must open the menu every time they want to switch tabs. **Fix:** add a fixed bottom nav bar (Home / Shop / Wishlist / Cart / Account) for mobile.
> - Some pages mix `min-h-screen` and `min-h-[70vh]` randomly, leading to inconsistent scroll behaviour. **Fix:** standardize on a single layout shell with a sticky footer.
> - No accessibility audit has been done. **Fix:** run an `axe` / Lighthouse audit and fix contrast, focus, and ARIA issues.

---

## API Integration

Axios is used for API communication. Product data is currently managed through the project's local data structure, while categories, content, and authentication are connected to a live backend and a mock user service (DummyJSON). The API layer is kept separate so it can be connected to the final backend later without changing any UI components.

### Current Product Functions

* `getAllProducts()` — returns all products
* `getFeaturedProducts()` — returns featured products
* `getBestSellerProducts()` — returns best-selling products
* `getNewArrivalProducts()` — returns new arrivals
* `getProductById()` — returns a single product
* `searchProducts()` — searches products by name, category, subcategory, or description
* `getSuggestedProducts()` — returns related product suggestions
* `getSaleProducts()` — returns products currently marked for sale

### Website Content

The API layer also provides reusable content for:

* `getCategories()`
* `getHeroBanners()`
* `getAnnouncements()`
* `getCampaign()`
* `getReels()`
* `getCraftsmanship()`
* `getReviews()`
* `getNotFoundBags()`

### Footer & Information Pages

Common footer content and pages are handled through:

* `getFooter()`
* `getFooterPage()`

This includes About, Our Story, Contact, Shipping & Returns, Size & Care, FAQ, and Legal content.

### Authentication

Authentication is currently connected to DummyJSON for frontend development and testing.

* `loginUser()`
* `getUsers()`

The final authentication system will be connected to the Niya backend using JWT.

### Backend Integration

The API base URL is configured using:

```env
VITE_API_BASE_URL=https://shieldnest.theglamstreet.in/api
```

The current setup is prepared for the final backend, where products, categories, content, authentication, cart, wishlist, and other dynamic data can be connected through real REST API endpoints.

> **🛠 Problems to Fix (Production Level):**
> - Three different `axios.create()` instances exist (`api`, `authApi`, `cartApi`) and none of them have interceptors — so auth tokens are not auto-attached and 401 errors are not handled. **Fix:** add a single shared axios instance with `request` interceptor (attaches JWT) and `response` interceptor (handles 401 → silent refresh → retry).
> - `.env` only contains `VITE_API_BASE_URL`; auth and home endpoints are hardcoded as fallbacks inside the code. **Fix:** add `VITE_AUTH_API_BASE_URL` and `VITE_CONTENT_API_BASE_URL` to `.env` and validate them at startup.
> - There is no API error logging or monitoring. **Fix:** integrate Sentry or a similar service so backend failures are visible in production.

---

## Product & Category Architecture

The final backend is expected to support:

### Products

* Product name
* Description
* Price
* Discount price
* Images (multiple, high-quality)
* Category
* Gender
* Product status (active / draft / archived)
* Creation date
* Stock information

### Categories

Categories should support:

* Category name
* Slug
* Parent category
* Subcategory
* Gender / category association

Slugs will be used for clean category-based navigation and filtering.

---

## Discount & Sale System

The frontend is prepared for product discounts. The final backend can provide:

* Original price
* Discounted price
* Discount percentage
* Sale status
* Sale start date
* Sale end date

---

## Design Direction

Niya Bags follows a premium fashion-commerce visual language.

### Design Principles

* Minimal
* Elegant
* Luxury-focused
* Clean layouts
* Strong product imagery
* Spacious sections
* Responsive design
* Simple navigation
* Consistent typography
* Smooth interactions

### Visual Direction

The interface primarily uses:

* Deep teal / dark blue
* Warm white / cream
* Muted gold
* Soft light accents

The design combines elegant typography with modern sans-serif UI elements.

---

## Project Structure

```
niya_bags/
├── public/                  # Static assets (images, favicon)
├── src/
│   ├── api/                 # API client + endpoint functions
│   │   ├── axiosClient.js
│   │   ├── api.js
│   │   ├── productApi.js
│   │   ├── homeApi.js
│   │   ├── footerApi.js
│   │   ├── contentApi.js
│   │   ├── notFoundApi.js
│   │   ├── authApi.js
│   │   └── cartApi.js
│   ├── components/
│   │   ├── common/          # Navbar, Footer, SearchOverlay
│   │   ├── home/            # Hero, Categories, Reels, etc.
│   │   └── product/         # ProductCard, etc.
│   ├── context/             # Auth, Cart, Wishlist, Theme
│   ├── data/                # Local product + content data
│   ├── pages/               # HomePage, ShopPage, CartPage, etc.
│   ├── routes/              # AppRoutes
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css            # Tailwind v4 theme + tokens
├── .env                     # Environment variables
├── package.json
├── vite.config.js
├── vercel.json              # Vercel deploy config
└── README.md
```

---

## Development Goals

The main goal of the project is to build a scalable luxury e-commerce frontend that can connect to a complete production backend.

The architecture is being kept reusable so that:

* UI components remain independent
* API logic stays centralized
* Product sections can be reused
* Categories can become dynamic
* Authentication can be added without restructuring the application
* Backend integration can happen with minimal UI changes

---

## Current Development Phase

**Phase 1 — Frontend UI & Structure:** Completed / In Progress
**Phase 2 — API Integration:** In Progress
**Phase 3 — Backend Integration:** Planned
**Phase 4 — Authentication & User System:** Planned
**Phase 5 — Cart, Wishlist & Orders with Backend:** Planned
**Phase 6 — Discounts, Sales & Promotions:** Planned
**Phase 7 — Testing, Optimization & Deployment:** Planned

---

## Author

**Niya Bags — E-Commerce Frontend Project**

Built using React, Vite, and Tailwind CSS with an API-first architecture.
https://shieldnest.theglamstreet.in/
