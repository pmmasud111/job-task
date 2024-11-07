import React from "react";
import { FiUpload } from "react-icons/fi";
import { IoClose } from "react-icons/io5";

interface ModalProps {
  setShowModal: (value: boolean) => void;
}

const Modal: React.FC<ModalProps> = ({ setShowModal }) => {
  const [files, setFiles] = React.useState<File[]>([]);
  console.log(files);

  return (
    <div
      onClick={() => setShowModal(false)}
      className="fixed flex items-center justify-center top-0 left-0 w-full h-full z-50 bg-black/50 transition-all duration-300"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white p-3 w-4/12 text-gray-600 rounded-md flex flex-col justify-center"
      >
        <div className="flex items-center justify-between">
          <p className="text-lg font-bold text-gray-600">Task Modal</p>
          <button
            onClick={() => setShowModal(false)}
            className="p-1 rounded-md bg-red-200/50 hover:bg-red-200 transition-all duration-300"
          >
            <IoClose className="text-2xl text-red-500" />
          </button>
        </div>
        {/* modal content */}
        <div className="m-8 flex items-center justify-center border-2 border-dashed rounded-md w-2/3 mx-auto">
          <div className="flex flex-col items-center justify-center h-32 bg-gray-200  pt-5 w-full">
            <label
              htmlFor="file-upload"
              className="flex items-center justify-center gap-2 p-2 px-4 bg-blue-600 rounded-md cursor-pointer"
            >
              {/* File input */}
              <input
                id="file-upload"
                type="file"
                className="hidden"
                multiple
                onChange={(e) => {
                  const selectedFiles = e.target.files
                    ? Array.from(e.target.files)
                    : [];
                  setFiles(selectedFiles);
                }}
              />
              <p className="text-white">Choose Files</p>
              <FiUpload className="text-white" />
            </label>
            <p className="text-gray-600 text-xs mt-1">Max file size 100MB</p>
          </div>
        </div>
        {/* Showcase of selected files */}
        <div>
          {files.map((file, index) => (
            <div key={index}>
              <p className="text-gray-600 text-xs mt-1">
                {file.name}
                <span>{file.type}</span>{" "}
              </p>
            </div>
          ))}
        </div>
        <button className="p-2 px-4 bg-blue-600 rounded-md text-white">
          Upload
        </button>
      </div>
    </div>
  );
};

export default Modal;
