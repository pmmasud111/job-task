import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export async function GET() {
  try {
    const tasks = await prisma.task.findMany({
      include: {
        files: true,
      },
    });
    return NextResponse.json({ tasks });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return NextResponse.json(
      { error: "Error fetching tasks" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
export async function POST(request: Request) {
  const data = await request.json();
  try {
    const task = await prisma.task.create({
      data: {
        ...data,
      },
    });
    return NextResponse.json({ task });
  } catch (error) {
    console.error("Error creating task:", error);
    return NextResponse.json({ error: "Error creating task" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
