# Stylr - Full Stack Fashion E-Commerce Platform

Stylr is a modern fashion e-commerce application with a Next.js storefront, an Express.js API, MongoDB data storage, Cloudinary image uploads, Paystack checkout, customer accounts, admin management, cart, blog, product comparison, and order tracking.

Live demo: https://stylrr.vercel.app

## What Is Included

- Customer storefront built with Next.js, React, TypeScript, and Tailwind CSS
- Express.js backend API with MongoDB/Mongoose
- Product, category, cart, checkout, order, user, and blog APIs
- Admin pages for products, categories, orders, blogs, users, and overview stats
- Paystack payment integration
- Cloudinary media uploads
- SMTP email templates for order and account emails
- Responsive customer account dashboard
- Product search, filters, compare, recently viewed products, and currency selector
- VPS deployment guide for aaPanel, PM2, Nginx, and similar control panels

## Project Structure

```text
Stylr/
+-- apps/
|   +-- frontend/      # Next.js storefront and admin dashboard
|   +-- backend/       # Express.js REST API
+-- package.json       # Workspace scripts
+-- pnpm-lock.yaml     # Locked dependencies
+-- pnpm-workspace.yaml
+-- turbo.json
+-- INSTALLATION.md
+-- VPS_DEPLOYMENT.md
+-- MARKETPLACE_DESCRIPTION.md
```

## Quick Start

Install dependencies from the project root:

```bash
pnpm install
```

Copy the environment examples:

```bash
cp apps/backend/.env.example apps/backend/.env
cp apps/frontend/.env.example apps/frontend/.env
```

Update the values in both `.env` files, then run the full project:

```bash
pnpm dev
```

Default local URLs:

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## Documentation

- Local setup: `INSTALLATION.md`
- VPS deployment: `VPS_DEPLOYMENT.md`
- Marketplace sales copy: `MARKETPLACE_DESCRIPTION.md`
- Frontend details: `apps/frontend/README.md`
- Backend details: `apps/backend/README.md`
