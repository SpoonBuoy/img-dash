import { useState } from "react";
import { uploadFiles } from "../../services/user.service";

export default function UploadImages() {
   const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadButton, setUploadButton] = useState(false);
const[uploadButtonText, setUploadButtonText] = useState("upload");
  const handleUploadImages = (e) => {
    const chosenFiles = Array.prototype.slice.call(e.target.files);
    const selected = [...selectedFiles];

    chosenFiles.forEach((file) => {
      if (selected.findIndex((f) => f.name === file.name) === -1) {
        selected.push(file);
      }
    });

    setSelectedFiles(selected);

    if (selected.length > 0) {
      setUploadButton(true);
    } else {
      setUploadButton(false);
    }
  };

  const handleUploadButton = () => {
    const formData = new FormData();
    selectedFiles.forEach((file) => {
      formData.append('files', file);
    });

    // Assuming uploadFiles is an async function
    uploadFiles(formData, setUploadButtonText);

    // Clear the selected files and hide the upload button after uploading
    setSelectedFiles([]);
    setUploadButton(false);
  };

  return (
    <div className="lg:w-[30%] flex flex-col items-center space-y-10 bg-blue-100 p-5 rounded-md">
      <h1 className="text-lg font-bold bg-slate-400 p-3 rounded-md">
        Upload Images
      </h1>
      <div className="">
        <input
          hidden
          id="fileUpload"
          type="file"
          multiple
          onChange={handleUploadImages}
          className="border-2 border-gray-400 rounded-lg bg-gray-200 p-2"
        ></input>
        <label htmlFor="fileUpload">
          <a className="text-lg font-semibold bg-blue-300 py-1 px-5 rounded-full">
            Select Files
          </a>
        </label>
        <div>
          <h1 className="text-md font-semibold text-green-600 m-3">
            Selected Files
          </h1>
          {selectedFiles.map((file, index) => (
            <h1 key={index} className="text-sm bg-gray-100 p-1 rounded-md mb-2">
              {file.name}
            </h1>
          ))}
        </div>
      </div>
      <button
        onClick={handleUploadButton}
        disabled={!uploadButton}
        className={`${
          !uploadButton ? "bg-gray-300" : ""
        } text-md text-white font-semibold bg-blue-500 py-2 px-5 rounded-lg`}
      >
	  {uploadButtonText}
      </button>
    </div>
  );
}
