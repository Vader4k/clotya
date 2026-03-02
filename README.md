# Clotya — Modern E-Commerce Storefront

A full-featured, modern e-commerce web application built with **Next.js 16**, **React 19**, and **TypeScript**. Clotya is a fashion-focused storefront with a feature-sliced architecture, rich product browsing experience, and a growing suite of commerce features.

---

## ✨ Features

### Currently Implemented

| Feature                    | Description                                                                           |
| -------------------------- | ------------------------------------------------------------------------------------- |
| 🛍️ **Product Browsing**    | Shop page with filtering by category, size, color, and price range                    |
| 🔍 **Search**              | Modal-based live product search with keyboard navigation                              |
| 🔄 **Product Compare**     | Add up to N products to a side-by-side comparison table, persisted via `localStorage` |
| 👁️ **Recently Viewed**     | Tracks and displays recently visited product pages                                    |
| 📄 **Product Detail**      | Full product page with image gallery, size picker, color picker, and reviews          |
| 🗂️ **Categories**          | Browsable category grid with dedicated category filtering                             |
| 💱 **Currency Switcher**   | Client-side currency selection                                                        |
| 📰 **Blog**                | Blog listing and individual post pages                                                |
| 📬 **Contact Page**        | Static contact page                                                                   |
| ⚡ **Intercepting Routes** | Quick-view product modal using Next.js parallel/intercepting routes (`@product`)      |

### Planned / In Progress

- 🛒 **Cart** — Add to cart, update quantities, remove items, cart drawer
- ❤️ **Wishlist** — Save products for later, persistent across sessions
- 📦 **Order Tracking** — View order status and history
- 🔐 **Admin Panel** — Manage products, orders, and users

---

## 🏗️ Project Architecture

Clotya uses a **feature-sliced** architecture: each domain is self-contained under `features/`, with its own components, hooks, services, stores, types, and utils.

```
clotya/
├── app/                        # Next.js App Router
│   ├── @product/               # Intercepting route (quick-view modal)
│   ├── blog/                   # Blog listing & post pages
│   ├── compare/                # Compare page
│   ├── contact/                # Contact page
│   ├── product/[slug]/         # Product detail page
│   ├── shop/                   # Shop listing page
│   ├── layout.tsx              # Root layout (fonts, providers)
│   └── page.tsx                # Homepage
│
├── features/                   # Feature-sliced domain modules
│   ├── blogs/                  # Blog feature (components, services, types)
│   ├── categories/             # Category browsing & filtering
│   ├── compare/                # Product comparison (store, modal, table)
│   ├── currency/               # Currency switching
│   ├── products/               # Core product feature (card, filters, actions, hooks)
│   ├── recently-viewed/        # Recently viewed product tracking
│   └── search/                 # Search modal, hooks, and utilities
│
├── sections/                   # Page-level section components
│   ├── home/                   # Hero, BestSeller, Categories, Advert, News, Discount
│   ├── shop/                   # ShopHeader, FiltersPanel, ProductGrid, Pagination
│   ├── product/                # ProductGallery, ProductInfo, Reviews, RelatedProducts
│   ├── blog/                   # BlogList, BlogCard, BlogPost sections
│   └── contact/                # ContactForm section
│
├── components/
│   └── ui/                     # Shared shadcn/ui primitives (Dialog, ScrollArea, etc.)
│
├── shared/
│   └── ui/                     # Shared layout components (Navbar, Footer, BottomNav)
│
├── constants/                  # App-wide constants (nav links, categories, etc.)
├── data/                       # Static data (products, blogs)
└── lib/                        # Utility functions (cn, etc.)
```

---

## 🛠️ Tech Stack

| Category                    | Technology                                                                         |
| --------------------------- | ---------------------------------------------------------------------------------- |
| **Framework**               | [Next.js 16](https://nextjs.org/) (App Router, Turbopack)                          |
| **Language**                | TypeScript 5                                                                       |
| **UI Library**              | React 19                                                                           |
| **Styling**                 | Tailwind CSS v4 + `tw-animate-css`                                                 |
| **Component Primitives**    | [shadcn/ui](https://ui.shadcn.com/) + [Radix UI](https://www.radix-ui.com/)        |
| **Icons**                   | [Lucide React](https://lucide.dev/)                                                |
| **Animations**              | [Motion](https://motion.dev/) (Framer Motion v12)                                  |
| **State Management**        | [Zustand v5](https://zustand-demo.pmnd.rs/) with `persist` middleware              |
| **Server State / Fetching** | [TanStack Query v5](https://tanstack.com/query/latest) + Axios                     |
| **Carousel / Slider**       | [Swiper.js](https://swiperjs.com/)                                                 |
| **Image Optimization**      | Next.js `<Image>` + [Plaiceholder](https://plaiceholder.co/) for blur placeholders |
| **Utilities**               | `clsx`, `tailwind-merge`, `class-variance-authority`                               |

---

## 🚀 Getting Started

### Prerequisites

- Node.js ≥ 18
- npm ≥ 9

### Installation

```bash
git clone https://github.com/your-username/clotya.git
cd clotya
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
npm run start
```

### Lint

```bash
npm run lint
```

---

## 📐 State Management

Global client state is managed with **Zustand**, using the `persist` middleware with an SSR-safe `createJSONStorage` adapter to avoid hydration mismatches in Next.js.

| Store                       | Purpose                                                  |
| --------------------------- | -------------------------------------------------------- |
| `compareStore`              | Tracks products added to the comparison list (persisted) |
| `cartStore` _(planned)_     | Shopping cart items and quantities                       |
| `wishlistStore` _(planned)_ | Saved/wishlisted products                                |

---

## 🗺️ Roadmap

- [ ] Cart with drawer UI and quantity management
- [ ] Wishlist with persistent storage
- [ ] Checkout flow (address, payment, confirmation)
- [ ] Order tracking page
- [ ] Admin dashboard (product CRUD, order management, user management)
- [ ] Authentication (NextAuth or Clerk)
- [ ] Backend API integration (replace static data)
