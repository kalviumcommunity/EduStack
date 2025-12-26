import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const body = await req.json();

  try {
    const enrollment = await prisma.$transaction(async (tx) => {
      return tx.enrollment.create({
        data: {
          userId: body.userId,
          courseId: body.courseId,
        },
      });
    });

    return NextResponse.json(enrollment, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Enrollment failed" }, { status: 400 });
  }
}
