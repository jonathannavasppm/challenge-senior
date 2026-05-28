import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname === "/") {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  const requestHeaders = new Headers(request.headers)
  requestHeaders.set("x-dashboard-version", "1.0.0")
  requestHeaders.set("x-request-time", new Date().toISOString())

  return NextResponse.next({
    request: { headers: requestHeaders },
  })
}

export const config = {
  matcher: ["/dashboard/:path*"],
}
