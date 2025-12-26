import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { ZodError } from "zod";
import { prisma } from "@/lib/prisma";
import { signupSchema } from "@/lib/schemas/signupSchema";
import { ERROR_CODES } from "@/lib/errorCodes";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = signupSchema.parse(body);

    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: "User already exists",
          error: { code: ERROR_CODES.VALIDATION_ERROR },
        },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    await prisma.user.create({
      data: {
        name: data.fullName,
        email: data.email,
        password: hashedPassword,
        role: data.role,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Signup successful",
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
            details: err.issues.map((i) => ({
              field: i.path.join("."),
              message: i.message,
            })),
          },
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
        error: { code: ERROR_CODES.INTERNAL_ERROR },
      },
      { status: 500 }
    );
  }
}
