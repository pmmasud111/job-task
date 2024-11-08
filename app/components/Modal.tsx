import React from "react";
import { IoClose } from "react-icons/io5";
interface ModalProps {
  setShowModal: (value: boolean) => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ setShowModal, children }) => {
  return (
    <div
      onClick={() => setShowModal(false)}
      className="fixed flex items-center justify-center top-0 left-0 w-full h-full z-50 bg-black/50 transition-all duration-300"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white p-5 w-8/12 md:w-6/12 lg:w-4/12 text-gray-600 rounded-md flex flex-col justify-center"
      >
        <div className="flex items-center justify-between">
          <p className="text-lg font-bold text-gray-600">Simple File Upload</p>
          <button
            onClick={() => setShowModal(false)}
            className="p-1 rounded-md bg-red-200/50 hover:bg-red-200 transition-all duration-300"
          >
            <IoClose className="text-2xl text-red-500" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
