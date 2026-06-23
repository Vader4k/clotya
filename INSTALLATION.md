# Clotya Installation Guide

This guide explains how a buyer can run Clotya locally after downloading the marketplace ZIP.

## Requirements

- Node.js 20 or newer recommended
- pnpm 9 or newer
- MongoDB Atlas account or a MongoDB server
- Cloudinary account for uploaded product/blog images
- Paystack account for payments
- SMTP mailbox for transactional emails

## 1. Install Dependencies

From the project root:

```bash
pnpm install
```

If pnpm is not installed:

```bash
npm install -g pnpm
```

## 2. Configure Backend Environment

Create the backend env file:

```bash
cp apps/backend/.env.example apps/backend/.env
```

Edit `apps/backend/.env`:

```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/clotya
JWT_SECRET=replace_with_a_long_random_secret
FRONTEND_URL=http://localhost:3000
PAYSTACK_SECRET_KEY=sk_test_xxxxxxxxxxxxxxxxxxxxx
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
SMTP_HOST=smtp.zoho.com
SMTP_PORT=465
SMTP_USER=no-reply@example.com
SMTP_PASS=your_smtp_password
```

## 3. Configure Frontend Environment

Create the frontend env file:

```bash
cp apps/frontend/.env.example apps/frontend/.env
```

Edit `apps/frontend/.env`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## 4. Run Locally

Run both apps from the project root:

```bash
pnpm dev
```

Or run each app separately:

```bash
pnpm --filter @clotya/backend dev
pnpm --filter @clotya/frontend dev
```

Open:

- Frontend: http://localhost:3000
- API health check: http://localhost:5000

## 5. Build For Production

From the project root:

```bash
pnpm build
```

Start backend:

```bash
pnpm --filter @clotya/backend start
```

Start frontend:

```bash
pnpm --filter @clotya/frontend start
```

## 6. Common Setup Notes

- Set `FRONTEND_URL` in the backend to the final frontend domain.
- Set `NEXT_PUBLIC_API_URL` in the frontend to the final backend API URL, including `/api`.
- In production, use HTTPS for both frontend and backend.
- Paystack callback URLs should point to the frontend checkout success page.
- Cloudinary credentials are required for image upload features.
- SMTP credentials are required for order/account email delivery.

