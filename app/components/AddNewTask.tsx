import axios from "axios";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

interface AddNewTaskProps {
  setShowModal: (value: boolean) => void;
  setReFetch: (value: any) => void;
}

interface FormData {
  firstClientName: string;
  secondClientName: string;
  description: string;
  comment?: string;
  clientCount?: string;
  status: string;
}

const AddNewTask: React.FC<AddNewTaskProps> = ({
  setShowModal,
  setReFetch,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const payload = {
        ...data,
        comment: data.comment ? parseInt(data.comment, 10) : undefined,
        clientCount: data.clientCount
          ? parseInt(data.clientCount, 10)
          : undefined,
      };

      const res = await axios.post("/api/task", payload);
      console.log("Task added:", res.data);
      setReFetch((prev: any) => !prev);
      setShowModal(false);
    } catch (error) {
      console.error("Failed to add task:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-col items-center justify-center"
    >
      <h2 className="text-2xl font-medium text-gray-600 bg-gray-300 rounded-md py-2 px-10 my-4 w-full text-center">
        Add New Task
      </h2>
      <div className="w-full flex flex-col gap-3">
        <div>
          <label htmlFor="firstClientName" className="text-gray-600">
            First Client Name
          </label>
          <input
            id="firstClientName"
            {...register("firstClientName", {
              required: "First Client Name is required",
            })}
            type="text"
            placeholder="First Client Name"
            className="w-full py-2 px-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.firstClientName && (
            <span className="text-red-500">
              {errors.firstClientName.message ||
                "First Client Name is required"}
            </span>
          )}
        </div>
        <div>
          <label htmlFor="secondClientName" className="text-gray-600">
            Second Client Name
          </label>
          <input
            id="secondClientName"
            {...register("secondClientName", {
              required: "Second Client Name is required",
            })}
            type="text"
            placeholder="Second Client Name"
            className="w-full py-2 px-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.secondClientName && (
            <span className="text-red-500">
              {errors.secondClientName.message ||
                "Second Client Name is required"}
            </span>
          )}
        </div>

        <div>
          <label htmlFor="description" className="text-gray-600">
            Description
          </label>
          <textarea
            id="description"
            {...register("description", {
              required: "Description is required",
            })}
            placeholder="Description"
            className="w-full py-2 px-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
          {errors.description && (
            <span className="text-red-500">
              {errors.description.message || "Description is required"}
            </span>
          )}
        </div>
        <div>
          <label htmlFor="comment" className="text-gray-600">
            Comment (optional)
          </label>
          <input
            id="comment"
            {...register("comment")}
            type="number"
            placeholder="Comment"
            className="w-full py-2 px-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="clientCount" className="text-gray-600">
            Client Count (optional)
          </label>
          <input
            id="clientCount"
            {...register("clientCount")}
            type="number"
            placeholder="Client Count"
            className="w-full py-2 px-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="status" className="text-gray-600">
            Status
          </label>
          <select
            id="status"
            {...register("status", { required: "Status is required" })}
            className="w-full py-2 px-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="incomplete">Incomplete</option>
            <option value="completed">Completed</option>
            <option value="to_do">To Do</option>
            <option value="in_progress">In Progress</option>
            <option value="under_review">Under Review</option>
          </select>
          {errors.status && (
            <span className="text-red-500">
              {errors.status.message || "Status is required"}
            </span>
          )}
        </div>
      </div>
      <div className="w-full flex items-center justify-center my-2">
        <button
          type="submit"
          className="py-2 px-4 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition-all duration-300 w-full active:bg-blue-500 mt-2"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default AddNewTask;
