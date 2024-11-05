import { auth } from "@/auth";

const allowedPages = ["/", "/auth"];

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|img).*)"],
};

export default auth((req) => {
  if (!req.auth && !allowedPages.includes(req.nextUrl.pathname)) {
    const newUrl = new URL("/auth?error=lost", req.nextUrl.origin);
    return Response.redirect(newUrl);
  }
});
