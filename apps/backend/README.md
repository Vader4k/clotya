# stylr Backend API

This is the backend RESTful API for **stylr**, a modern e-commerce clothing and fashion application. The API manages user authentication, product catalogs, shopping carts (both guest and authenticated), order processing, Paystack payment integration, automated inventory checks, order tracking, and content management (blogs & categories).

---

## 🛠 Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js (v5.x)
- **Database**: MongoDB Atlas via Mongoose ODM
- **Authentication**: Cookie-based JSON Web Tokens (JWT)
- **Payment Gateway**: Paystack (with automatic USD to NGN exchange rate translation)
- **File & Media Storage**: Cloudinary (integrated via Multer in-memory buffers)
- **Security**: Helmet headers, CORS policies, Bcrypt password hashing

---

## 📂 Project Architecture

```
apps/backend/
├── server.js               # Entry point (connects DB & starts listening)
├── app.js                  # Application setup, middleware hooks, and root routes
├── config/
│   └── db.js               # MongoDB connection client
├── controllers/            # Controller layer (business logic handlers)
│   ├── authController.js
│   ├── blogController.js
│   ├── cartController.js
│   ├── categoriesController.js
│   ├── orderController.js
│   ├── productController.js
│   └── userController.js
├── middleware/             # Express route middleware
│   ├── admin.middleware.js          # REST block for non-admin requests
│   ├── cart-session.js              # Guest session UUID cookie attach
│   ├── protectOptional.js           # Attaches req.user if JWT exists, else continues
│   ├── upload.middleware.js         # Multer setup for buffer file parsing
│   ├── user.middleware.js           # Restricts access to standard users
│   └── verify-token.middleware.js   # Strictly requires valid logged-in user JWT cookie
├── models/                 # Database schema models (Mongoose)
│   ├── blogs.model.js
│   ├── cart.model.js
│   ├── category.model.js
│   ├── order.schema.js
│   ├── product.model.js
│   ├── reviews.js                   # Future Review model (schema defined)
│   ├── session.model.js
│   └── user.js
├── routes/                 # Express Router endpoint definitions
│   ├── authRoute.js
│   ├── blogRoute.js
│   ├── cartRoutes.js
│   ├── categoryRoutes.js
│   ├── orderRoutes.js
│   ├── productRoutes.js
│   ├── publicRoutes.js              # Unauthenticated storefront access
│   └── userRoutes.js
└── utils/                  # Shared helper scripts
    ├── cloudinary.js       # Cloudinary client upload/delete utilities
    ├── paystack.js         # Paystack transaction API integrations
    └── utils.js            # Bcrypt hashing wrappers
```

---

## ⚙️ Environment Configuration

Create a `.env` file in the root of `/apps/backend` matching the configuration below:

| Variable | Description | Example |
| :--- | :--- | :--- |
| `PORT` | Port number the backend server runs on | `5000` |
| `MONGO_URI` | Connection URI for MongoDB Atlas Cluster | `mongodb+srv://...` |
| `NODE_ENV` | Environment context (`development` or `production`) | `development` |
| `JWT_SECRET` | Secret key for signing and validating JWT token cookies | `your_jwt_secret` |
| `FRONTEND_URL` | Domain where the frontend React/Next.js app is hosted | `http://localhost:3000` |
| `PAYSTACK_SECRET_KEY` | Paystack private API key (sk_test_...) | `sk_test_xxxxxx` |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary Account Cloud Name | `your_cloud_name` |
| `CLOUDINARY_API_KEY` | Cloudinary API Key | `your_api_key` |
| `CLOUDINARY_API_SECRET` | Cloudinary API Secret Key | `your_api_secret` |

---

## 🚀 Getting Started & Installation

### 1. Install Dependencies
Run the install command from either the repository root (under pnpm workspaces) or inside the backend directory:
```bash
# In stylr/apps/backend
npm install
# Or from stylr/ root
pnpm install
```

### 2. Run the Server
Use one of the execution scripts defined in `package.json`:
```bash
# Run in development mode with nodemon auto-restart
npm run dev

# Run in standard production mode
npm start
```

---

## 🔒 Security & Middleware Details

- **`verify-token.middleware.js` (`protect`)**: Reads the `token` cookie. If valid, fetches the user from the database (omitting password credentials) and attaches it to `req.user`. Returns a `401 Unauthorized` if invalid or missing.
- **`admin.middleware.js` (`admin`)**: Blocks requests if the authenticated user's `role` is not `'admin'`. Returns `403 Forbidden`.
- **`protectOptional.js` (`protectOptional`)**: Attempts to find and verify the JWT `token` cookie. If found, logs in the user (populating `req.user`). If it fails or is absent, it simply proceeds to `next()` without returning an error. This allows endpoints to adapt to both logged-in and guest clients.
- **`cart-session.js` (`attachCartId`)**: Manages guest cart cookies. If no `cartId` is present in request cookies, it generates a fresh `uuidv4` string and returns it in the response header as an HttpOnly, `sameSite: "lax"`, 30-day cookie under the key `cartId`.
- **`upload.middleware.js` (`upload`)**: Utilizes Multer memory-storage to handle `multipart/form-data` uploads. Enforces a file size limit of `5MB`.

---

## 💰 Checkout & Payment Flow (Paystack)

The application handles transactions in **USD ($)** at the database level, but processes online credit card/bank payments using **Paystack** in **NGN (₦)**.

### Flow Breakdown:
1. **Stock Check**: The checkout route checks that all items in the request exist in the database and have sufficient inventory quantity.
2. **Order Registration**: A new order is drafted in the database under `paymentStatus: "unpaid"`. Prices are locked in USD.
3. **Currency Conversion**: Paystack processes payments in **Nigerian Kobo** (`Amount in NGN * 100`). The backend converts the USD cost to NGN by applying an exchange rate multiplier (default: `1500`), then computes the amount in kobo before hitting Paystack's initialization endpoint.
4. **Fulfillment (Verification & Webhook)**:
   - **Verification**: When redirected back to the storefront, the frontend calls the verification route.
   - **Webhook**: To prevent missing dropped connections, the webhook listener verifies the `x-paystack-signature` against the payload buffer.
   - When verified, the backend flags the order as paid, reduces quantities in the product inventory array, increments the product's `sold` count, and empties the cart (guest or user).


---

## 🛒 Cart Logic (Guest vs Authenticated)

Carts support both guest checkouts and authenticated user sessions. The DB model references either a `user` ObjectId or a string `cartId`.

To guarantee database constraints without causing collisions, the `Cart` schema applies Mongoose partial indices:
```javascript
// Only enforce uniqueness on cartId when it actually has a string value (guest carts)
cartSchema.index(
    { cartId: 1 },
    { unique: true, partialFilterExpression: { cartId: { $type: "string" } } }
);

// Only enforce uniqueness on user when it actually has a value (logged-in carts)
cartSchema.index(
    { user: 1 },
    { unique: true, partialFilterExpression: { user: { $exists: true, $ne: null } } }
);
```

- When checking out, guest carts match based on the `cartId` cookie.
- Cart products are dynamically evaluated on retrieval (`GET /api/cart`). If stock levels have decreased since a product was added, quantities are automatically clamped to the maximum available limit and the client is notified.