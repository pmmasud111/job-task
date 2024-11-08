import axios from "axios";
import React from "react";
import { FiUpload } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
interface ModalProps {
  setShowModal: (value: boolean) => void;
}

const Modal: React.FC<ModalProps> = ({ setShowModal }) => {
  const [files, setFiles] = React.useState<File[]>([]);

  const getFileNameWithExtension = (file: File) => {
    const fileNameParts = file.name.split(".");
    const extension = fileNameParts.length > 1 ? fileNameParts.pop() : "";
    const name = fileNameParts.join(".");
    return `${name}.${extension}`;
  };

  const handleSubmit = async () => {
    try {
      for (const item of files) {
        const formData = new FormData();
        formData.append("file", item);
        formData.append("fileName", getFileNameWithExtension(item));
        const response = await axios.post("/api/task-data", formData);
        if (response.status === 200) {
          setShowModal(false);
        }
        console.log(response.data);
        console.log(formData.get("file"));
      }
    } catch (error) {
      console.error("Error uploading files:", error);
    }
  };

  return (
    <div
      onClick={() => setShowModal(false)}
      className="fixed flex items-center justify-center top-0 left-0 w-full h-full z-50 bg-black/50 transition-all duration-300"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white p-3 w-8/12 lg:w-4/12 text-gray-600 rounded-md flex flex-col justify-center"
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
        {/* modal content */}
        <div className="m-8 flex items-center justify-center">
          <div className="flex flex-col items-center justify-center h-60 w-96 bg-gray-200 border-2 border-dashed rounded-md pt-5 px-10">
            <label
              htmlFor="file-upload"
              className="flex items-center justify-center gap-2 p-2 px-4 bg-blue-600 rounded-md cursor-pointer hover:bg-blue-700 transition-all duration-300"
            >
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
        {/* Display selected files with extensions */}
        <div className="mb-4 px-32 space-y-1">
          {files.map((file, index) => (
            <p key={index} className="text-gray-600 text-sm bg-slate-200 p-1">
              <span>{index + 1}. </span>
              {getFileNameWithExtension(file)}
            </p>
          ))}
        </div>
        <button
          type="submit"
          onClick={handleSubmit}
          disabled={files.length === 0}
          className="p-2 px-4 bg-blue-600 rounded-md text-white mt-4 hover:bg-blue-700 transition-all duration-300 active:bg-blue-500"
        >
          Upload
        </button>
      </div>
    </div>
  );
};

export default Modal;

// mongodb password

// 3tK3sYeJcWaE8Qhb
