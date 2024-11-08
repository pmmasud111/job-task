import axios from "axios";
import React from "react";
import { FiUpload } from "react-icons/fi";

interface FileUploadProps {
  data: any;
  setShowModal: (value: boolean) => void;
  setReFetch: (value: any) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({
  data,
  setShowModal,
  setReFetch,
}) => {
  const [files, setFiles] = React.useState<File[]>([]);
  const filterdData = data?.files;

  const handleSubmit = async () => {
    const formData = new FormData();
    try {
      for (const item of files) {
        formData.append("files", item);
      }
      formData.append("taskId", data?.id);
      await axios.post("/api/task/uploadFile", formData);
      setShowModal(false);
      setReFetch((prev: any) => !prev);
    } catch (error) {
      console.error("Error uploading files:", error);
    }
  };
  return (
    <div>
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
      <div className="mb-4  space-y-1">
        {filterdData &&
          filterdData.map((item: any, index: number) => (
            <p
              key={index}
              className="text-gray-600 text-sm bg-slate-200 p-1 px-2"
            >
              <span>{index + 1}. </span>
              {item.fileName}
            </p>
          ))}
      </div>
      <div className="flex items-center justify-center">
        <button
          type="submit"
          onClick={handleSubmit}
          disabled={files.length === 0}
          className="p-2 px-4 bg-blue-600 rounded-md text-white mt-4 hover:bg-blue-700 transition-all duration-300 active:bg-blue-500 w-full"
        >
          Upload
        </button>
      </div>
    </div>
  );
};

export default FileUpload;
