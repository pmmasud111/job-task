import { NextResponse, NextRequest } from "next/server";
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
export async function POST(request: NextRequest) {
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

export async function DELETE(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "Invalid task ID" }, { status: 400 });
  }

  try {
    const task = await prisma.task.delete({
      where: {
        id: parseInt(id),
      },
    });
    return NextResponse.json({ task });
  } catch (error) {
    console.error("Error deleting task:", error);
    return NextResponse.json({ error: "Error deleting task" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
