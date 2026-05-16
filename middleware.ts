import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const token = request.cookies.get('token')
    const { pathname } = request.nextUrl

    //protected routes for logged in users
    const isDashboardPath = pathname.startsWith('/account') && !pathname.includes('/login') && !pathname.includes('/register')

    //paths for guest users (login/register)
    const isAuthPath = pathname === '/account/login' || pathname === '/account/register'

    if (isDashboardPath && !token) {
        //user is on dashboard but not logged in -> redirect to login
        return NextResponse.redirect(new URL('/account/login', request.url))
    }

    if (isAuthPath && token) {
        //user is on login/register page but is logged in -> redirect to dashboard
        return NextResponse.redirect(new URL('/account', request.url))
    }

    return NextResponse.next()
}

// Only run middleware on account routes to keep the site fast
export const config = {
    matcher: ['/account/:path*'],
};