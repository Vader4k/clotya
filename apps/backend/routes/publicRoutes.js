import express from "express";
import { getAllCategoriesPublic } from "../controllers/categoriesController.js";
import { getProductsByCategoryPublic, getBestSellerProducts, getProductBySlugPublic, getRelatedProducts, getProductsBySearch, getAllProductsPublic } from "../controllers/productController.js";
import { getAllBlogsPublic, getBlogBySlug, getPopularBlogs } from "../controllers/blogController.js";

const router = express.Router();

router.get("/categories", getAllCategoriesPublic);
router.get("/products/category/:category", getProductsByCategoryPublic);
router.get("/products/best-seller", getBestSellerProducts);
router.get("/products/related/:id", getRelatedProducts);
router.get("/products/search/:search", getProductsBySearch);
router.get("/products/:slug", getProductBySlugPublic);
router.get("/products", getAllProductsPublic);

// Blog Routes
router.get("/blogs", getAllBlogsPublic);
router.get("/blogs/popular", getPopularBlogs);
router.get("/blogs/:slug", getBlogBySlug);

export default router;
