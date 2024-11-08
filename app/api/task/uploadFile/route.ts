import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export async function POST(request: Request) {
  const data = await request.formData();
  const taskId = parseInt(data.get("taskId") as string);
  if (!taskId) {
    return new Response("Invalid task ID", { status: 400 });
  }
  const files = Array.from(data.getAll("files")).filter(
    (f) => f instanceof File
  ) as Array<File>;
  try {
    if (files.length > 0) {
      for (const file of files) {
        await prisma.files.create({
          data: {
            fileName: file.name,
            extension: file.name.split(".").pop() as string,
            fileSize: file.size,
            taskId: taskId,
          },
        });
      }
      return new Response("Files uploaded successfully", { status: 200 });
    } else {
      return new Response("No files uploaded", { status: 400 });
    }
  } catch (error) {
    console.error("Error uploading files:", error);
    return new Response("Error uploading files", { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
