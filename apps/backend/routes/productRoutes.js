import express from "express";
import {
    getAllProducts,
    getProductsByCategory,
    getProductsBySearch,
    addProduct,
    updateProduct,
    deleteProduct
} from "../controllers/productController.js";
import { protect } from "../middleware/verify-token.middleware.js";
import { admin } from "../middleware/admin.middleware.js";
import { upload } from "../middleware/upload.middleware.js";

const router = express.Router();

router.get("/", protect, admin, getAllProducts);
router.get("/category/:category", protect, admin, getProductsByCategory);
router.get("/search/:search", protect, admin, getProductsBySearch);
router.post("/", protect, admin, upload.array('images', 10), addProduct);
router.put("/:id", protect, admin, upload.array('images', 10), updateProduct);
router.delete("/:id", protect, admin, deleteProduct);

export default router;