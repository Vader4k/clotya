import express from "express";
import { getAllCategories, getCategoryTags, addCategory, updateCategory, deleteCategory, deleteCategoryTags } from "../controllers/categoriesController.js";
import { admin } from "../middleware/admin.middleware.js";
import { protect } from "../middleware/verify-token.middleware.js";

const router = express.Router();

router.get("/", getAllCategories);
router.get("/:id/tags", getCategoryTags);
router.post("/", protect, admin, addCategory);
router.put("/:id", protect, admin, updateCategory);
router.delete("/:id", protect, admin, deleteCategory);
router.delete("/tags/:id", protect, admin, deleteCategoryTags);

export default router;