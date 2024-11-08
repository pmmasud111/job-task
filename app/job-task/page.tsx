"use client";

import React, { useEffect } from "react";
import TaskCard from "./components/TaskCard";
import Modal from "./components/Modal";
import axios from "axios";
import FileUpload from "./components/FileUpload";
import AddNewTask from "./components/AddNewTask";

const TaskPage: React.FC = () => {
  const [showModal, setShowModal] = React.useState<boolean>(false);
  const [modalType, setModalType] = React.useState<string>("");
  const [data, setData] = React.useState<any>([]);
  const [selectedData, setSelectedData] = React.useState<any>({});
  const [reFetch, setReFetch] = React.useState<any>(false);
  const [statusData, _] = React.useState<any>([
    "incomplete",
    "completed",
    "to_do",
    "in_progress",
    "under_review",
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/task");
        setData(response?.data?.tasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchData();
  }, [reFetch]);

  return (
    <>
      {data.length > 0 ? (
        <div className="flex flex-col items-center ">
          <button
            onClick={() => {
              setModalType("add_task");
              setShowModal(true);
            }}
            className="bg-blue-500 text-white p-2 rounded-md my-2 px-4  hover:bg-blue-700 transition-all duration-300 active:bg-blue-500"
          >
            Add Task
          </button>
          <div className="w-full flex gap-4 overflow-x-auto custom_scroll">
            {statusData?.map((status: any, index: number) => (
              <div key={index} className=" bg-gray-100 p-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 mb-5">
                    {" "}
                    <div
                      className={`bg-green-500 rounded-l-full py-3 px-3 ${
                        status === "incomplete"
                          ? "bg-red-500"
                          : status === "completed"
                          ? "bg-green-500"
                          : status === "to_do"
                          ? "bg-yellow-500"
                          : status === "in_progress"
                          ? "bg-blue-500"
                          : status === "under_review"
                          ? "bg-purple-500"
                          : ""
                      }`}
                    ></div>
                    <h1 className="text-base capitalize text-gray-800 ">
                      {status.replace("_", " ")}
                    </h1>
                  </div>
                  <p>
                    {data?.filter((item: any) => item.status === status).length}
                  </p>
                </div>
                <div className="flex flex-col gap-4 overflow-y-scroll h-[calc(100vh-184px)] custom_scroll pr-2">
                  {data
                    .filter((item: any) => item.status === status)
                    ?.map((item: any, index: number) => (
                      <TaskCard
                        setModalType={setModalType}
                        data={item}
                        key={index}
                        setShowModal={setShowModal}
                        setSelectedData={setSelectedData}
                        setReFetch={setReFetch}
                      />
                    ))}
                </div>
              </div>
            ))}
          </div>
          {modalType === "file_upload" && showModal ? (
            <Modal setShowModal={setShowModal}>
              <FileUpload
                data={selectedData}
                setShowModal={setShowModal}
                setReFetch={setReFetch}
              />
            </Modal>
          ) : modalType === "add_task" && showModal ? (
            <Modal setShowModal={setShowModal}>
              <AddNewTask setShowModal={setShowModal} setReFetch={setReFetch} />
            </Modal>
          ) : null}
        </div>
      ) : (
        <div className="flex items-center justify-center w-full h-screen">
          <p className="text-2xl font-bold text-gray-600">Loading...</p>
        </div>
      )}
    </>
  );
};

export default TaskPage;
