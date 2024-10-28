import { auth } from "@/auth";

const allowedPages = ["/", "/auth"];

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

export default auth((req) => {
  if (!req.auth && !allowedPages.includes(req.nextUrl.pathname)) {
    const newUrl = new URL("/auth?lost=true", req.nextUrl.origin);
    return Response.redirect(newUrl);
  }
});
