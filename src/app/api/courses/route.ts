import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 10;

  const courses = await prisma.course.findMany({
    skip: (page - 1) * limit,
    take: limit,
    select: {
      id: true,
      title: true,
      description: true,
      createdAt: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ page, limit, data: courses });
}

export async function POST(req: Request) {
  const body = await req.json();

  const course = await prisma.course.create({
    data: {
      title: body.title,
      description: body.description,
      teacherId: body.teacherId,
    },
  });

  return NextResponse.json(course, { status: 201 });
}
