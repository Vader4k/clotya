export const QUERIES = {
    // Authentication
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    LOGOUT: "/auth/logout",
    ME: "/auth/me",

    // Admin
    admin: {
        categories: {
            GETNADD: '/categories/',
            EDITNDEL: '/categories/:id',
        },
        products: {
            GETNADD: '/products/',
            EDITNDEL: '/products/:id',
        },
        blogs: {
            GETALL_N_ADD: '/blogs/',
            GET_N_EDIT_N_DEL: '/blogs/:id',
        }
    },

    public: {
        categories: {
            GET: '/public/categories',
        },
        products: {
            GET_BY_CATEGORY: '/public/products/category/:category',
            GET_BEST_SELLER: '/public/products/best-seller',
            GET_BY_SLUG: '/public/products/:slug',
            GET_RELATED: '/public/products/related/:id',
            GET_BY_SEARCH: '/public/products/search/:search',
            GET_ALL: '/public/products',
        },
        blogs: {
            GET_ALL: '/public/blogs',
            GET_BY_SLUG: '/public/blogs/:slug',
            GET_BY_SEARCH: '/public/blogs/search/:search',
            GET_POPULAR: '/public/blogs/popular',
        }
    }
}