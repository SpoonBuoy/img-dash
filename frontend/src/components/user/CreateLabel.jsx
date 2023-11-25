import { useState } from "react";
import { createLabels } from "../../services/user.service";

export default function CreateLabel() {
  const [createLabel, setCreateLabel] = useState("");
  const [createButton, setCreateButton] = useState(false);
  const [Labels, setLabels] = useState([])

  const handleCreateLabel = (e) => {
    setCreateLabel(e.target.value);
    if (e.target.value !== "") setCreateButton(true);
    else setCreateButton(false);
  };

  const handleCreateButton = () => {
    const data = {
      labels: Labels,
    };
    createLabels(data);
    setCreateButton(false);
    setCreateLabel('');
    setLabels([])
  };

   const handleAddButton = () => {
      setLabels([...Labels, createLabel])
      setCreateLabel("")
  }

  return (
    <div className="lg:w-[30%] flex flex-col items-center space-y-10 bg-blue-100 p-5 rounded-md">
      <h1 className="text-lg font-bold bg-slate-400 p-3 rounded-md">
        Create Label
      </h1>
      <input
        type="text"
        className="border-2 border-gray-400 rounded-lg bg-gray-200 p-2"
        value={createLabel}
        onChange={handleCreateLabel}
        placeholder="Enter Label Name"
      ></input>
       <button
        onClick={handleAddButton}
        //disabled={!createButton}
        className={`${
          !createButton ? "bg-gray-300" : ""
        } text-md text-white font-semibold bg-blue-500 py-2 px-5 rounded-lg`}
      >
        Add
      </button>
      <button
        onClick={handleCreateButton}
        disabled={!createButton}
        className={`${
          !createButton ? "bg-gray-300" : ""
        } text-md text-white font-semibold bg-blue-500 py-2 px-5 rounded-lg`}
      >
        Create
      </button>
      <ul className="list-disc overflow-x-auto h-96 px-5 scrollbar-hide">
        {Labels.map((label, index) => (
          <li key={index} className="overflow-x-auto flex items-center mb-4 w-60 scrollbar-hide whitespace-nowrap">
              {label}
          </li>
        ))}
      </ul>
    </div>
  );
}
