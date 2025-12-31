import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";

export function middleware(req: NextRequest) {
  const authHeader = req.headers.get("authorization");

  if (!authHeader) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const token = authHeader.split(" ")[1];
    const decoded = verifyToken(token);
    req.headers.set("user", JSON.stringify(decoded));
    return NextResponse.next();
  } catch {
    return NextResponse.json(
      { error: "Invalid token" },
      { status: 401 }
    );
  }
}

export const config = {
  matcher: [
    "/api/products/:path*",
    "/api/orders/:path*",
    "/api/cart/:path*",
    "/api/reviews/:path*",
  ],
};
