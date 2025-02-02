import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const session = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const requestedpage = req.nextUrl.pathname;

  if (!session) {
    const url = req.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
  //return NextResponse.redirect(new URL("/", req.url));
}

export const config = {
  matcher: ["/index", "/settings/:path*", "/categories/:path*"],
};
