import { NextResponse } from "next/server";
import { ZodError } from "zod";
import jwt, { JwtPayload } from "jsonwebtoken";
import redis from "@/lib/redis";
import { userSchema } from "@/lib/schemas/userSchema";
import { ERROR_CODES } from "@/lib/errorCodes";

const JWT_SECRET = process.env.JWT_SECRET as string;
const CACHE_TTL = 60; // seconds

/* ----------------------------- POST: Create User ---------------------------- */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validatedData = userSchema.parse(body);

    /**
     * ❗ Normally you would write to DB here.
     * Since this assignment focuses on API patterns,
     * we only invalidate cache.
     */

    await redis.del("users:me"); // invalidate cache after mutation

    return NextResponse.json(
      {
        success: true,
        message: "User created successfully",
        data: validatedData,
        timestamp: new Date().toISOString(),
      },
      { status: 201 }
    );
  } catch (err) {
    if (err instanceof ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation Error",
          error: {
            code: ERROR_CODES.VALIDATION_ERROR,
            details: err.issues.map((issue) => ({
              field: issue.path.join("."),
              message: issue.message,
            })),
          },
          timestamp: new Date().toISOString(),
        },
        { status: 400 }
      );
    }

    console.error("Unhandled error:", err);

    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
        error: { code: ERROR_CODES.INTERNAL_ERROR },
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}

/* -------------------------- GET: Protected + Cached -------------------------- */
export async function GET(req: Request) {
  try {
    const authHeader = req.headers.get("authorization");
    const token = authHeader?.split(" ")[1];

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Token missing" },
        { status: 401 }
      );
    }

    const decoded = jwt.verify(token, JWT_SECRET);

    if (typeof decoded === "string") {
      return NextResponse.json(
        { success: false, message: "Invalid token payload" },
        { status: 403 }
      );
    }

    const payload = decoded as JwtPayload;
    const cacheKey = `users:me:${payload.id}`;

    /* ------------------------------ Cache Check ------------------------------ */
    const cachedUser = await redis.get(cacheKey);

    if (cachedUser) {
      return NextResponse.json({
        success: true,
        message: "Protected data (cache hit)",
        user: JSON.parse(cachedUser),
        cached: true,
      });
    }

    /* ----------------------- Simulated DB / Payload ------------------------- */
    const userData = {
      id: payload.id,
      email: payload.email,
      role: payload.role,
    };

    /* ----------------------------- Cache Store ------------------------------ */
    await redis.set(cacheKey, JSON.stringify(userData), "EX", CACHE_TTL);

    return NextResponse.json({
      success: true,
      message: "Protected data (cache miss)",
      user: userData,
      cached: false,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Invalid or expired token" },
      { status: 403 }
    );
  }
}
