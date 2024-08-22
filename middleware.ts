import { NextRequest, NextResponse } from "next/server";
import {
  authRoutes,
  DEFAULT_LOGIN_REDIRECT,
  LOGIN_PATH,
  publicRoutes,
} from "./routes";
import { getToken } from "next-auth/jwt";
import { checkTokenExpiration } from "./lib/auth-utils";
import useUserStore from "./stores/user-store";

async function needsLogin(req: NextRequest) {
  const token = (await getToken({ req })) as { [key: string]: any } | null;
  const { resetUser } = useUserStore.getState();
  const isAuthenticated = !!token;
  const isPublicPath = publicRoutes.includes(req.nextUrl.pathname);
  const isAuthPath = authRoutes.includes(req.nextUrl.pathname);
  const authExpired = checkTokenExpiration(token?.user.authExpiresAt || "");
  if (authExpired) {
    const response = NextResponse.redirect(new URL(LOGIN_PATH, req.nextUrl));
    response.cookies.delete("next-auth.session-token");
    response.cookies.delete("__Secure-next-auth.session-token");
    resetUser();

    return response;
  }
  if (
    (!isAuthenticated && !isPublicPath && !isAuthPath) ||
    (authExpired && !isAuthPath && !isPublicPath)
  )
    return NextResponse.redirect(new URL(LOGIN_PATH, req.nextUrl));
  if (isAuthenticated && isAuthPath && !authExpired)
    return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, req.nextUrl));
  return NextResponse.next();
}

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();

  if (url.pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  return needsLogin(req);
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
