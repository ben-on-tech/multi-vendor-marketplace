import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(req: NextRequest) {
  const auth = req.headers.get("authorization");

  if (!auth || !auth.startsWith("Bearer ")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const token = auth.split(" ")[1];
    const user = jwt.verify(token, process.env.JWT_SECRET!);

    const headers = new Headers(req.headers);
    headers.set("user", JSON.stringify(user));

    return NextResponse.next({ headers });
  } catch {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}

export const config = {
  matcher: ["/api/:path*"],
};
