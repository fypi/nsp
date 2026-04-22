import { NextRequest, NextResponse } from "next/server";

const locales = ["zh", "en", "zh-TW"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 已经带语言 → 放行
  if (locales.some((l) => pathname.startsWith(`/${l}`))) {
    return NextResponse.next();
  }

  // 静态资源放行
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/images") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // 默认跳转 zh
  return NextResponse.redirect(new URL("/zh", request.url));
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};