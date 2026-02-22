import { Truck, RefreshCcw, PhoneCall, CreditCard } from "lucide-react"

export const navLinks = [
    {
        id: 1,
        name: 'home',
        href: '/'
    },
    {
        id: 2,
        name: 'shop',
        href: '/shop'
    },
    {
        id: 3,
        name: 'women',
        href: '/shop?category=women'
    },
    {
        id: 4,
        name: 'men',
        href: '/shop?category=men'
    },
    {
        id: 5,
        name: 'outerwear',
        href: '/shop?category=outerwear'
    },
    {
        id: 6,
        name: 'blog',
        href: '/blog'
    },
    {
        id: 7,
        name: 'contact',
        href: '/contact'
    }
]

export const contactData = [
    {
        id: 1,
        icon: Truck,
        title: 'Free Shipping',
        description: 'Free Shipping for orders over $130'
    },
    {
        id: 2,
        icon: RefreshCcw,
        title: 'Money Guarantee',
        description: 'within 30 days for an exchange'
    },
    {
        id: 3,
        icon: PhoneCall,
        title: 'Online Support',
        description: 'Our support team is available 24/7'
    },
    {
        id: 4,
        icon: CreditCard,
        title: 'Flexible Payment',
        description: 'Pay with multiple credit cards'
    }
]

export const footerLinks = {
    information: [
        { name: "About Us", href: '/contact' },
        { name: "Privacy Policy", href: '#' },
        { name: "Returns Policy", href: '#' },
        { name: "Shipping Policy", href: '#' },
        { name: "Dropshipping", href: '#' }
    ],
    account: [
        { name: "Dashboard", href: '/dashboard' },
        { name: "My Orders", href: '/cart' },
        { name: "My Wishlist", href: '/wishlist' },
        { name: "Account details", href: '/dashboard/account' },
        { name: "Track My Order", href: '/track-order' }
    ],
    shop: [
        { name: "Affiliate", href: '#' },
        { name: "Bestsellers", href: '#' },
        { name: "Discount", href: '#' },
        { name: "Latest Products", href: '/shop' },
        { name: "Sale Products", href: '/shop?sale=true' }
    ],
    categories: [
        { name: "Women", href: '/shop?category=women' },
        { name: "Men", href: '/shop?category=men' },
        { name: "Outerwear", href: '/shop?category=outerwear' },
        { name: "Accessories", href: '/shop?category=accessories' },
        { name: "Shoes", href: '/shop?category=shoes' }
    ]
}

export const phone = "(+800) 1234 5678 90"
export const email = "info@gmail.com"

export interface SheetLink {
    name: string
    href: string
    tag?: string | null
}

export const sheetLinks: Record<string, SheetLink[]> = {
    'main menu': [
        { name: 'home', href: '/' },
        { name: 'shop', href: '/shop' },
        { name: 'women', href: '/shop?category=women' },
        { name: 'men', href: '/shop?category=men' },
        { name: 'outerwear', href: '/shop?category=outerwear' },
        { name: 'blog', href: '/blog' },
        { name: 'contact', href: '/contact' }
    ],
    'categories': [
        { name: 'kids', href: '/shop?category=kids', tag: null },
        { name: 'baby', href: '/shop?category=baby', tag: null },
        { name: 'shoes', href: '/shop?category=shoes', tag: 'hot' },
        { name: 'bags', href: '/shop?category=bags', tag: null },
        { name: 'accessories', href: '/shop?category=accessories', tag: null },
        { name: 'watches', href: '/shop?category=watches', tag: null },
        { name: 'cargo trousers', href: '/shop?category=cargo trousers', tag: 'new' },
        { name: 'outerwear', href: '/shop?category=outerwear', tag: null },
        { name: 'wallets', href: '/shop?category=wallets', tag: null },
        { name: 'belts', href: '/shop?category=belts', tag: null },
        { name: 'best sellers', href: '/shop?category=best sellers', tag: null },
        { name: 'featured products', href: '/shop?category=featured products', tag: null },
        { name: 'new arrivals', href: '/shop?category=new arrivals', tag: 'save 25%' },
        { name: 'ready to wear', href: '/shop?category=ready to wear', tag: null },
    ]
}