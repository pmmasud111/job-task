import Image from "next/image";
import React from "react";
import { FaRegCalendarAlt, FaRegComments } from "react-icons/fa";
import { GrAttachment } from "react-icons/gr";
import { TbBrandDatabricks } from "react-icons/tb";

interface TaskCardProps {
  setShowModal: (value: boolean) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ setShowModal }) => {
  return (
    <div className="bg-white rounded-md p-4">
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
          <h1 className="text-base text-gray-800">Abbas Uddin </h1>
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
          <h1 className="text-base text-gray-800">Abdur Rahman</h1>
        </div>
      </div>
      {/* description */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 py-4">
          <TbBrandDatabricks />
          <p className="text-sm text-gray-600 font-normal truncate pr-8">
            Lorem ipsum dolor sit amet...
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
              <p className="text-gray-600 text-sm">12+</p>
            </div>
          </div>
        </div>
        {/* comment */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <FaRegComments />
            <p>15</p>
          </div>
          {/* file upload */}
          <div className="flex items-center gap-1">
            <GrAttachment
              onClick={() => setShowModal(true)}
              className="cursor-pointer"
            />
            <p>15</p>
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
