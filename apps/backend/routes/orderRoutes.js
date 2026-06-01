import express from "express";
import { checkout, paystackWebhook, verifyOrder } from "../controllers/orderController.js";
import { protectOptional } from "../middleware/protectOptional.js";
import { attachCartId } from "../middleware/cart-session.js";

const router = express.Router();

// Checkout route (Handles both guest and logged-in users)
router.post("/checkout", attachCartId, protectOptional, checkout);

// Verify order status (Frontend calls this after redirection)
router.get("/verify/:reference", verifyOrder);

// Paystack Webhook route (Public, but verified by signature in controller)
router.post("/webhook/paystack", paystackWebhook);

export default router;
