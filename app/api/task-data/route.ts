// Types
interface TaskData {
  id: number;
  title: string;
  name: string;
  image: string;
  description: string;
  status: string;
  date: string;
  client: string;
  like: string;
  comments: string;
  file: { id: number; name: string }[];
}

// Sample data
export const taskData: TaskData[] = [
  {
    id: 1,
    title: "Task 1",
    name: "Abbas Uddin",
    image: "/images/abbas_uddin.jpg",
    description: "Task 1 description...",
    status: "incomplete",
    date: "2022-01-01",
    client: "Client 1",
    like: "12+",
    comments: "15",
    file: [
      { id: 1, name: "image1.jpg" },
      { id: 2, name: "image2.jpg" },
    ],
  },
];

// Helper function to get the next file ID
function getNextFileId(existingFiles: { id: number; name: string }[]): number {
  return existingFiles.length > 0
    ? Math.max(...existingFiles.map((file) => file.id)) + 1
    : 1;
}

// Helper function to get file name with extension
function getFileNameWithExtension(file: File): string {
  const fileNameParts = file.name.split(".");
  const extension = fileNameParts.length > 1 ? fileNameParts.pop() : "";
  const name = fileNameParts.join(".");
  return `${name}.${extension}`;
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return new Response(JSON.stringify({ error: "No file provided" }), {
        headers: { "Content-Type": "application/json" },
        status: 400,
      });
    }

    const fileName = getFileNameWithExtension(file);

    // Check if we're updating an existing task or creating a new one
    const taskId = formData.get("taskId");

    if (taskId) {
      // Update existing task
      const taskIndex = taskData.findIndex(
        (task) => task.id === Number(taskId)
      );

      if (taskIndex === -1) {
        return new Response(JSON.stringify({ error: "Task not found" }), {
          headers: { "Content-Type": "application/json" },
          status: 404,
        });
      }

      // Add new file to existing task
      const nextFileId = getNextFileId(taskData[taskIndex].file);
      taskData[taskIndex].file.push({
        id: nextFileId,
        name: fileName,
      });

      return new Response(
        JSON.stringify({
          message: "File added to existing task",
          task: taskData[taskIndex],
        }),
        {
          headers: { "Content-Type": "application/json" },
          status: 200,
        }
      );
    } else {
      // Create new task
      const newTask: TaskData = {
        id: taskData.length + 1,
        title: (formData.get("title") as string) || "",
        name: (formData.get("name") as string) || "",
        image: (formData.get("image") as string) || "",
        description: (formData.get("description") as string) || "",
        status: (formData.get("status") as string) || "incomplete",
        date:
          (formData.get("date") as string) ||
          new Date().toISOString().split("T")[0],
        client: (formData.get("client") as string) || "",
        like: (formData.get("like") as string) || "0",
        comments: (formData.get("comments") as string) || "0",
        file: [
          {
            id: 1,
            name: fileName,
          },
        ],
      };

      taskData.push(newTask);

      console.log(
        taskData.length,
        taskData.map((t) => t.file.length)
      );

      return new Response(
        JSON.stringify({
          message: "New task created with file",
          task: newTask,
        }),
        {
          headers: { "Content-Type": "application/json" },
          status: 201,
        }
      );
    }
  } catch (error) {
    console.error("Error handling POST request:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      headers: { "Content-Type": "application/json" },
      status: 500,
    });
  }
}
