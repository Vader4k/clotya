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
        },
        orders: {
            GET: '/users/admin/orders',
            UPDATE: '/users/admin/order/:id',
        },
        overview: {
            GET: '/users/admin/revenue',
            QUICK_STATS: '/users/admin/quick-stats',
        },
        users: {
            GET_ALL: '/users/admin/all-users',
            TOGGLE_STATUS: '/users/admin/user/:id/status',
        }
    },

    //users
    user: {
        orders: '/users/orders',
        Profile: '/users/profile',
        password: '/users/update-password'
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
    },

    cart: {
        GET: '/cart',
        ADD: '/cart/add',
        REMOVE: '/cart/remove/:id',
        REMOVE_ALL: '/cart/reset',
    },

    order: {
        CHECKOUT: '/orders/checkout',
        VERIFY_ORDER: '/orders/verify/:reference',
        TRACK: '/orders/track',
    }
}