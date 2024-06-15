import { NextResponse } from "next/server";
import { getSession } from "next-auth/react";
import { redirect } from "next/navigation";
export async function middleware(request) {
  // const token = request.cookies.get("next-auth.session-token")?.value
  // if (token) {
  //   return NextResponse.next()
  // }
  // return NextResponse.redirect("http://localhost:3000/");
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin','/shopping-cart','/history']
}
