import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // 如果访问 / 自动转到 /zh
  if (pathname === '/') {
    return NextResponse.redirect(new URL('/zh', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/'],
}