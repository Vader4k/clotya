import { Blog } from "../models/blogs.model.js";

export const createBlog = async (req, res) => {
    try {
        const { title, details, intro, categories, tags, slug, image } = req.body;
        const blog = new Blog({
            title,
            details,
            intro,
            categories,
            tags,
            slug,
            image
        });
        await blog.save();
        return res.status(201).json({success: true, message: "Blog created successfully"});
    } catch (error) {
        res.status(500).json({success: false, message: error.message });
    }
}

export const getAllBlogs = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const [blogs, totalBlogs] = await Promise.all([
            Blog.find().sort({ createdAt: -1 }).skip(skip).limit(limit).select("-details"),
            Blog.countDocuments()
        ]);

        const totalPages = Math.ceil(totalBlogs / limit);

        return res.status(200).json({
            success: true,
            blogs,
            pagination: {
                currentPage: page,
                totalPages,
                totalBlogs,
                limit
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export const getBlogById = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        return res.status(200).json({success: true, message: "Blog fetched successfully", blog});
    } catch (error) {
        res.status(500).json({success: false, message: error.message });
    }
}

export const updateBlog = async (req, res) => {
    try {
        const { title, details, intro, categories, tags, slug, image } = req.body;
        const blog = await Blog.findByIdAndUpdate(req.params.id, {
            title,
            details,
            intro,
            categories,
            tags,
            slug,
            image
        }, { new: true });
        return res.status(200).json({success: true, message: "Blog updated successfully", blog});
    } catch (error) {
        res.status(500).json({success: false, message: error.message });
    }
}

export const deleteBlog = async (req, res) => {
    try {
        const blog = await Blog.findByIdAndDelete(req.params.id);
        return res.status(200).json({success: true, message: "Blog deleted successfully", blog});
    } catch (error) {
        res.status(500).json({success: false, message: error.message });
    }
}

// PUBLIC ROUTES

export const getBlogBySlug = async (req, res) => {
    try {
        const blog = await Blog.findOneAndUpdate(
            { slug: req.params.slug },
            { $inc: { views: 1 } },
            { new: true }
        );
        if (!blog) {
            return res.status(404).json({ success: false, message: "Blog not found" });
        }
        return res.status(200).json({ success: true, blog });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}


export const getAllBlogsPublic = async (req, res) => {
    const { categories, tags, page=1, limit=10, search } = req.query;
    try {
        const skip = (page - 1) * limit;

        const query = {};

        if (categories) {
            // Support both single string and array of strings
            query.categories = { $in: Array.isArray(categories) ? categories : [categories] };
        }

        if (tags) {
            // Support both single string and array of strings
            query.tags = { $in: Array.isArray(tags) ? tags : [tags] };
        }

        if (search) {
            query.$text = { $search: search };
        }

        const [blogs, totalBlogs] = await Promise.all([
            Blog.find(query, search ? { score: { $meta: "textScore" } } : {})
                .sort(search ? { score: { $meta: "textScore" } } : { createdAt: -1 })
                .skip(skip)
                .limit(limit),
            Blog.countDocuments(query)
        ]);

        if (blogs.length === 0) {
            return res.status(200).json({
                success: true,
                message: "No blog post found",
                blogs: [],
                pagination: { currentPage: page, totalPages: 0, totalBlogs: 0, limit }
            });
        }

        const totalPages = Math.ceil(totalBlogs / limit);

        return res.status(200).json({
            success: true,
            blogs,
            pagination: {
                currentPage: page,
                totalPages,
                totalBlogs,
                limit
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export const getPopularBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find().sort({ views: -1 }).limit(3);
        return res.status(200).json({success: true, message: "Popular blogs fetched successfully", blogs});
    } catch (error) {
        res.status(500).json({success: false, message: error.message });
    }
}