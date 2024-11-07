"use client";

import React from "react";
import TaskCard from "./components/TaskCard";
import Modal from "./components/Modal";

const TaskPage: React.FC = () => {
  const [showModal, setShowModal] = React.useState<boolean>(false);
  console.log(showModal);

  return (
    <div className="flex items-center ">
      <div className="w-full flex gap-4 overflow-x-auto custom_scroll">
        {Array(10)
          .fill(0)
          .map((_, index) => (
            <div key={index} className=" bg-gray-100 p-5">
              <div className="flex items-center justify-between">
                <h1 className="text-base text-gray-800 mb-5">incomplite</h1>
                <p>05</p>
              </div>
              <div className="flex flex-col gap-4 overflow-y-scroll h-[calc(100vh-144px)] custom_scroll pr-2">
                {Array(10)
                  .fill(0)
                  .map((_, index) => (
                    <TaskCard key={index} setShowModal={setShowModal} />
                  ))}
              </div>
            </div>
          ))}
      </div>
      {showModal && <Modal setShowModal={setShowModal} />}
    </div>
  );
};

export default TaskPage;
