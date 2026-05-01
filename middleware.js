import { NextResponse } from "next/server";
import { decrypt } from "@/lib/auth"; // Ensure this matches your auth file path
import { cookies } from "next/headers";

export async function middleware(request) {
  const session = (await cookies()).get("session")?.value;
  const path = request.nextUrl.pathname;

  // 1. If trying to reach /admin or /dashboard without a session
  if (!session && (path.startsWith("/admin") || path.startsWith("/dashboard"))) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const payload = await decrypt(session);

  // 2. PROTECT /ADMIN: Only let "admin" role enter
  if (path.startsWith("/admin") && payload?.role !== "admin" && payload?.role !== "instructor") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // 3. PROTECT /DASHBOARD: Ensure they are logged in
  if (path.startsWith("/dashboard") && !payload) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/dashboard/:path*"],
};