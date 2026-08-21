# Niya Bags — Luxury Handbag E-Commerce Website

Niya Bags is a modern and premium e-commerce frontend designed for a luxury handbag brand. The project focuses on clean UI, premium visual presentation, responsive design, smooth product discovery, and an API-based product architecture.

---

## Project Status

**Current Status:** Frontend development in progress

The major frontend structure and core shopping experience have been implemented. The project is currently being refined and prepared for integration with the final backend APIs.

### Currently Implemented

* Premium responsive homepage
* Announcement bar
* Responsive navbar
* Search overlay
* Light/Dark theme support
* Hero banner
* Trust/benefits section
* Shop by Category
* Featured Products
* Best Sellers section
* New Arrivals section
* Campaign/spotlight section
* Niya Reels section
* Brand Craftsmanship section
* Customer Reviews section
* Newsletter section
* Responsive footer
* Shop/Product listing page
* Product details page
* Wishlist functionality
* Cart functionality
* Product search UI
* Product suggestions
* React Router based navigation
* API-based product fetching
* Reusable product components
* Responsive layouts for desktop and mobile

---

## Tech Stack

### Frontend

* **React 19.2.8** — UI development
* **Vite** — Development server and build tool
* **Tailwind CSS** — Styling and responsive UI
* **React Router DOM 7.18.2** — Client-side routing
* **React Icons 5.7.0** — Icons
* **Axios 1.19.0** — API requests

### State & Application Management

* **React Context API**

  * Cart state
  * Wishlist state
  * Authentication state
  * Theme state

* **Redux Toolkit 2.x**

* **React Redux 9.3.0**

## Main Features

### 1. Premium Homepage

The homepage is divided into reusable sections:

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

The design follows a minimal, elegant and premium fashion-commerce aesthetic.

---

### 2. Product System

Products are fetched through APIs instead of relying on permanent local mock data.

Implemented functionality includes:

* Product listing
* Product details
* Product images
* Product pricing
* Product suggestions
* Product search
* Featured products
* Best sellers
* New arrivals
* Product navigation using product IDs

The frontend is designed so that product data can be replaced with the final backend response without rebuilding the UI structure.

---

### 3. Shop Page

The Shop page provides the main product browsing experience.

Current functionality includes:

* Fetching products from API
* Product cards
* Product images
* Product names
* Pricing
* Wishlist actions
* Product detail navigation
* Filtering structure
* Responsive product grid

---

### 4. Search

A search overlay has been implemented in the navbar.

Users can:

* Open search from the navbar
* Search products
* View matching product suggestions
* Select a product
* Navigate directly to its product details page

The search system is structured so that it can later use a dedicated backend search endpoint.

---

### 5. Wishlist

Wishlist functionality is implemented on the frontend.

Users can:

* Add products to wishlist
* Remove products from wishlist
* View wishlist count
* Access wishlist products
* Maintain wishlist data using browser storage

---

### 6. Shopping Cart

Cart functionality is implemented using a reusable cart context.

The cart system supports:

* Adding products
* Removing products
* Updating cart items
* Cart count
* Cart persistence
* Cart page
* Product-to-cart interaction

---

### 7. Theme Support

The website includes Light and Dark theme support.

A dedicated Theme Context manages the selected theme across the application.

---

### 8. Responsive Design

The UI is designed for:

* Desktop
* Laptop
* Tablet
* Mobile

Tailwind CSS responsive utilities are used throughout the application.



Haan. Tumhari **actual current `api.js` file** ke hisaab se README ka API section update hona chahiye. Abhi README mein `getAnnouncements()` tak hi likha hai, jabki file mein products ke saath **categories, hero banners, campaign, reels, craftsmanship, reviews, auth, users, footer pages aur sale** bhi hain.

Aur ek important correction: abhi **products backend API se nahi aa rahe** — `enrichedProducts` se aa rahe hain. Sirf categories `api` ke through backend endpoint ko call kar rahi hain, aur authentication/users DummyJSON se hain. Isliye README mein "fully API-based products" nahi likhna chahiye.

Use this section:

## API Integration

Axios is used for API communication, while the current product data is managed through the project's local product data structure. The API layer is kept separate so it can be connected to the final backend later without changing the UI components.

### Current Product Functions

* `getAllProducts()` — returns all products
* `getFeaturedProducts()` — returns featured products
* `getBestSellerProducts()` — returns best-selling products
* `getNewArrivalProducts()` — returns new arrivals
* `getProductById()` — returns a single product
* `searchProducts()` — searches products by name, category, subcategory or description
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

This includes About, Our Story, Contact, Shipping & Returns, Size & Care, FAQ and Legal content.

### Authentication

Authentication is currently connected to DummyJSON for frontend development and testing.

* `loginUser()`
* `getUsers()`

The final authentication system will be connected to the Niya backend using JWT.

### Backend Integration

The API base URL is configured using:

```env
VITE_API_BASE_URL=******************************
```

The current setup is prepared for the final backend, where products, categories, content, authentication, cart, wishlist and other dynamic data can be connected through real REST API endpoints.

## Product & Category Architecture

The final backend is expected to support:

### Products

* Product name
* Description
* Price
* Discount price
* Images
* Category
* Gender
* Product status
* Creation date
* Stock information

### Categories

Categories should support:

* Category name
* Slug
* Parent category
* Subcategory
* Gender/category association

Slugs will be used for clean category-based navigation and filtering.

---


## Discount & Sale System

The frontend is prepared for product discounts.

The final backend can provide:

* Original price
* Discounted price
* Discount percentage
* Sale status
* Sale start date
* Sale end date



## Authentication

Authentication will be integrated with the final backend API.

Planned functionality:

* User registration
* User login
* Protected routes
* User account
* Logout
* Order history
* Wishlist synchronization
* Cart synchronization

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

## Development Goals

The main goal of the project is to build a scalable luxury e-commerce frontend that can later connect to a complete production backend.

The architecture is being kept reusable so that:

* UI components remain independent
* API logic stays centralized
* Product sections can be reused
* Categories can become dynamic
* Authentication can be added without restructuring the application
* Backend integration can happen with minimal UI changes

---

## Current Development Phase

**Phase 1 — Frontend UI & Structure**
Completed / In Progress

**Phase 2 — API Integration**
In Progress

**Phase 3 — Backend Integration**
Planned

**Phase 4 — Authentication & User System**
Planned

**Phase 5 — Cart, Wishlist & Orders with Backend**
Planned

**Phase 6 — Discounts, Sales & Promotions**
Planned

**Phase 7 — Testing, Optimization & Deployment**
Planned

---

## Author

**Niya Bags — E-Commerce Frontend Project**

Built using React, Vite and Tailwind CSS with an API-first architecture.
https://shieldnest.theglamstreet.in/