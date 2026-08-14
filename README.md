# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.





## Common Structure Observed in Modern Bag Brand Websites



### 1. Offer Strip (Top Announcement Bar)

* Top par ek slim color strip hoti hai.
* Isme current offers, sale ya special announcements show hote hain.

### 2. Header / Navigation

* Left side: Hamburger menu aur search icon.
* Center: Brand logo.
* Right side: Wishlist, Cart aur Profile icons.
* Minimal layout website ko clean aur premium look deta hai.

### 3. Hero Banner

* Large carousel ya autoplay video.
* Models bags carry karte hue dikhaye jate hain.
* Brand feel aur collection highlight hota hai.

### 4. New Arrivals Section

* Big attractive product images.
* Latest launches aur discounts highlight kiye jate hain.

### 5. Best Sellers

* Most popular bags ko separate section me showcase kiya jata hai.

### 6. Shop by Category (Two-Level Category Structure)

Niya Bags ki target audience mainly women hai, isliye category section ko do parts me plan kiya gaya hai.

#### Primary Category Section (Women-focused)

Homepage par pehle fashionable bag categories prominently show ki jayengi:

* Sling Bags
* Tote Bags
* Clutch Bags
* Crossbody Bags
* Coin Purses
* Bucket Bags
* Handbags
* Mini Bags

Ye section quick product discovery aur female shoppers ko direct relevant categories tak le jane ke liye rakha gaya hai.

#### Secondary Category Section (Broader Audience)

Kuch sections ke baad broader shopping categories show ki jayengi:

* Women
* Men
* Kids
* Corporate Gifts
* Travel Essentials
* Premium Collections

Is second-level section ka purpose website ko sirf women bags tak limited na rakhkar family aur gifting audience tak expand karna hai.


### 7. Brand Value / Premium Section

* Brand ko premium dikhane ke liye key points:

  * Eco-friendly
  * Handmade
  * Sustainable materials
  * Premium craftsmanship

### 8. Customer Reviews

* Carousel style testimonials.
* Small product image, customer name, review text aur star rating show hoti hai.
* Usually static testimonial cards hote hain.

### 9. Newsletter Subscription

* Email input box + subscribe button.
* Users ko updates aur offers receive karne ka option diya jata hai.

### 10. Footer Information

* My Account
* Orders
* Wishlist
* Contact

### 11. About / Brand Information (Still Curious?)

* All About Brand
* Our Story
* Loyalty Program
* Sustainability
* Product Care
* Reach Out To Us

---

## Design Observation Summary

Overall structure ka main focus hota hai:

* Clean navigation
* Strong visual storytelling
* Easy product discovery
* Premium brand perception
* Customer trust building
* Better mobile and desktop experience

Isi structure ko reference lekar Niya Bags frontend design plan kiya gaya hai.


## Niya Bags Homepage Structure (Visual Flow)

┌──────────────────────────────────────────────┐
│                OFFER STRIP                  │
│        Sale / Offers / Announcements        │
└──────────────────────────────────────────────┘
↓
┌──────────────────────────────────────────────┐
│               HEADER / NAVBAR               │
│ ☰  🔍        NIYA BAGS        ♡ 🛒 👤        │
└──────────────────────────────────────────────┘
↓
┌──────────────────────────────────────────────┐
│               HERO BANNER                   │
│     Carousel / Autoplay Video / Models      │
└──────────────────────────────────────────────┘
↓
┌──────────────────────────────────────────────┐
│              NEW ARRIVALS                   │
│      Latest Bags + Discount Highlights      │
└──────────────────────────────────────────────┘
↓
┌──────────────────────────────────────────────┐
│               BEST SELLERS                  │
│        Most Popular / Trending Bags         │
└──────────────────────────────────────────────┘
↓
┌──────────────────────────────────────────────┐
│   SHOP BY CATEGORY – PRIMARY (Women Focus)  │
│ Sling | Tote | Clutch | Crossbody | Bucket  │
│ Coin Purse | Handbag | Mini Bag             │
└──────────────────────────────────────────────┘
↓
┌──────────────────────────────────────────────┐
│  SHOP BY CATEGORY – SECONDARY (Broader)     │
│ Women | Men | Kids | Corporate Gifts        │
│ Travel Essentials | Premium Collection      │
└──────────────────────────────────────────────┘
↓
┌──────────────────────────────────────────────┐
│          BRAND VALUE / PREMIUM SECTION      │
│ Eco-friendly | Handmade | Sustainable       │
│ Premium Craftsmanship                       │
└──────────────────────────────────────────────┘
↓
┌──────────────────────────────────────────────┐
│            CUSTOMER REVIEWS                 │
│ ⭐⭐⭐⭐⭐  User Cards + Bag Image + Name        │
└──────────────────────────────────────────────┘
↓
┌──────────────────────────────────────────────┐
│          NEWSLETTER SUBSCRIPTION            │
│         Email Box + Subscribe Button        │
└──────────────────────────────────────────────┘
↓
┌──────────────────────────────────────────────┐
│              FOOTER LINKS                   │
│ My Account | Orders | Wishlist | Contact    │
└──────────────────────────────────────────────┘
↓
┌──────────────────────────────────────────────┐
│        STILL CURIOUS? / ABOUT SECTION       │
│ About Us | Our Story | Loyalty Program      │
│ Sustainability | Product Care | Reach Us    │
└──────────────────────────────────────────────┘







Username: emilys
Password: emilyspass


API 
https://docs.google.com/document/d/1IlDxJNyfF44v21QcicvUZT3Zk3Tp1TMV7_3XqprD6aM/edit?usp=sharing



**Products**

1. What will be the exact response structure for `GET /products`?
2. Will `category` come as a populated object with `id`, `name`, and `slug`, or only as a category ID?
3. How will Featured, Best Seller and New Arrival products be fetched?
4. For New Arrivals, will there be an `isNewArrival` field or will it be based on `createdAt`?
5. For product images, should the frontend use `images[]` or the virtual `image` field?

**Discount / Sale**
6. Should `price` be the original price and `discountPrice` the final sale price?
7. How should the frontend identify a product that is on sale?
8. Will the API provide `discountPercentage`, or should the frontend calculate it?
9. What will `discountPrice` be when there is no discount — `null`, `0`, or omitted?
10. Will there be an API/filter to fetch all products currently on sale?
11. If we later have sale campaigns with start/end dates, will that require a separate Sale/Promotion model?

**Categories / Filtering**
12. How will Men/Women/Unisex products be identified and filtered? Is a `gender` field planned?
13. What API should the frontend use for category filtering?
14. What API should be used for product search?

**Home Page Content**
15. What will be the endpoints for banners, announcements, campaign, reels and brand story?
16. Will these APIs return only active content, or does the frontend need to filter using `isActive`?
17. Will `order` already be applied by the backend?

**Authentication**
18. What will be the final login API endpoint and request/response structure?
19. After login, what token will be returned and how should the frontend send it with future requests?
20. Which user fields will be returned after login?

**Errors / API**
21. What will the standard error response format be?
22. Will the product APIs support pagination (`page`, `limit`)?
23. What are the final API base URL and all endpoint names that I should use in the frontend?

SHOP

All Bags
New Collection (optional — only if you eventually have a dedicated collection page)
Sale (keep only if you plan to implement discounts/sale)

ABOUT

Our Story
About Niya

HELP

Contact Us
Shipping & Returns
Care Guide
FAQs

LEGAL

Privacy Policy
Terms & Conditions