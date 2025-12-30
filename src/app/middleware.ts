import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;

interface AuthPayload extends JwtPayload {
  id: number;
  email: string;
  role: "ADMIN" | "TEACHER" | "STUDENT";
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Protect only secured routes
  if (pathname.startsWith("/api/admin") || pathname.startsWith("/api/users")) {
    const authHeader = req.headers.get("authorization");
    const token = authHeader?.split(" ")[1];

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Token missing" },
        { status: 401 }
      );
    }

    try {
      const decoded = jwt.verify(token, JWT_SECRET);

      // 🔐 Narrow the union type
      if (typeof decoded === "string") {
        return NextResponse.json(
          { success: false, message: "Invalid token payload" },
          { status: 403 }
        );
      }

      const user = decoded as AuthPayload;

      // 🔒 Role-based authorization
      if (pathname.startsWith("/api/admin") && user.role !== "ADMIN") {
        return NextResponse.json(
          { success: false, message: "Access denied" },
          { status: 403 }
        );
      }

      return NextResponse.next();
    } catch {
      return NextResponse.json(
        { success: false, message: "Invalid or expired token" },
        { status: 403 }
      );
    }
  }

  return NextResponse.next();
}
