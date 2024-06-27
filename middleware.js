import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
export async function middleware(request) {
  const path = request.nextUrl.pathname;
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });
  const publicPaths = path === "/signup" || path === "/login"
  if (publicPaths && token) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  } 

  if (!publicPaths && !token) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/login','/signup','/pwChange','/shopping-cart','/trackingorder','/orders','/checkout','/payment']
}
