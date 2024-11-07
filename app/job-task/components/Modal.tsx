import React from "react";

const Modal = () => {
  return (
    <div className="fixed flex items-center justify-center top-0 left-0 w-full h-full z-50 bg-black/50 transition-all duration-300 opecity-10 ">
      <div className="bg-white p-5 w-4/12 text-gray-600 rounded-md">
        This is Modal
      </div>
    </div>
  );
};

export default Modal;
