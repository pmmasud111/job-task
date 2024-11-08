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
              <h1 className="text-base capitalize text-gray-800 mb-5">
                {status.replace("_", " ")}
              </h1>
              <p>05</p>
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
  );
};

export default TaskPage;
