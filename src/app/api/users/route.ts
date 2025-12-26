import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { userSchema } from "@/lib/schemas/userSchema";
import { ERROR_CODES } from "@/lib/errorCodes";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validatedData = userSchema.parse(body);

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
        error: {
          code: ERROR_CODES.INTERNAL_ERROR,
        },
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}

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

    return NextResponse.json({
      success: true,
      message: "Protected data accessed",
      user: decoded,
    });
  } catch {
    return NextResponse.json(
      { success: false, message: "Invalid or expired token" },
      { status: 403 }
    );
  }
}
