import axios from "axios";
import Image from "next/image";
import React from "react";
import { FaRegCalendarAlt, FaRegComments } from "react-icons/fa";
import { GrAttachment } from "react-icons/gr";
import { IoClose } from "react-icons/io5";
import { TbBrandDatabricks } from "react-icons/tb";

interface TaskCardProps {
  setShowModal: (value: boolean) => void;
  data: any;
  setModalType: (value: string) => void;
  setSelectedData: (value: any) => void;
  setReFetch: (value: any) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({
  setShowModal,
  data,
  setModalType,
  setSelectedData,
  setReFetch,
}) => {
  // delete task
  const handleDelete = async (id: string) => {
    try {
      const res = await axios.delete(`/api/task?id=${id}`);

      if (res.status === 200) {
        setReFetch((prev: any) => !prev);
      }
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  return (
    <div className="bg-white rounded-md p-4 relative">
      {/* delete button */}
      <button
        onClick={() => handleDelete(data?.id)}
        className="p-0.5 rounded-md bg-red-200/50 hover:bg-red-200 transition-all duration-300 absolute top-0.5 right-0.5"
      >
        <IoClose className="text-lg text-red-500" />
      </button>
      {/* client profile section */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {/* client image */}
          <Image
            src="/images/abbas_uddin.jpg"
            alt="client_image"
            width={1000}
            height={1000}
            className="w-6 h-6 rounded-full object-cover"
          />
          <h1 className="text-base text-gray-800">{data?.firstClientName}</h1>
        </div>
        <div className="flex items-center gap-2">
          {/* client image */}
          <Image
            src="/images/abdur_rahman.jpg"
            alt="client_image"
            width={1000}
            height={1000}
            className="w-6 h-6 rounded-full object-cover"
          />
          <h1 className="text-base text-gray-800">{data?.secondClientName}</h1>
        </div>
      </div>
      {/* description */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 py-4">
          <TbBrandDatabricks />
          <p className="text-sm text-gray-600 font-normal truncate pr-8">
            {data?.description}...
          </p>
        </div>
        <div className="flex items-center gap-2">
          <FaRegCalendarAlt />
          <p>1/2</p>
        </div>
      </div>

      {/* button section */}
      <div className="flex items-center gap-3 justify-between">
        {/* like */}
        <div className="flex items-center gap-2">
          <Image
            src="/images/abdur_rahman.jpg"
            alt="client_image"
            width={1000}
            height={1000}
            className="w-6 h-6 rounded-full object-cover"
          />
          <Image
            src="/images/abbas_uddin.jpg"
            alt="client_image"
            width={1000}
            height={1000}
            className="w-6 h-6 rounded-full object-cover"
          />
          <div>
            <div className="flex items-center justify-center bg-gray-200 rounded-full w-8 h-8">
              <p className="text-gray-600 text-sm">{data?.clientCount}+</p>
            </div>
          </div>
        </div>
        {/* comment */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <FaRegComments />
            <p>{data?.commentsCount}5</p>
          </div>
          {/* file upload */}
          <div className="flex items-center gap-1">
            <GrAttachment
              onClick={() => {
                setModalType("file_upload");
                setShowModal(true);
                setSelectedData(data);
              }}
              className="cursor-pointer"
            />
            <p>{data?.files?.length}</p>
          </div>
        </div>
        {/* date */}
        <div className="flex items-center gap-1">
          <FaRegCalendarAlt />
          <p className="text-sm text-gray-600 font-normal text-nowrap">
            30-12-2022
          </p>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
