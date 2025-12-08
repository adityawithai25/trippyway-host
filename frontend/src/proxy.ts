import { type NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

const auth_routes = ["/sign-in", "/sign-up"];

// Routes which user cannot access if he is authenticated
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const private_routes = ["/sign-in", "/sign-up"];

export function isPublicRoute(request: NextRequest) {
  return auth_routes.includes(request.nextUrl.pathname);
}

export async function proxy(request: NextRequest) {
  const { user, response } = await updateSession(request);

  if (user) {
    const path = request.nextUrl.pathname;
    if (auth_routes.includes(path)) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
