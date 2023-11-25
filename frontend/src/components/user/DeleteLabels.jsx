import { useEffect, useState } from "react";
import { getLabels, deleteLabels } from "../../services/user.service";

export default function DeleteLabels() {
  const [labels, setLabels] = useState([]);
  const [selectedLables, setSelectedLabels] = useState([]);
  const [deleteButton, setDeleteButton] = useState(false);
  const [checkedState, setCheckedState] = useState([]);

  useEffect(() => {
    getLabels(setLabels);
  }, []);

  useEffect(() => {
    setCheckedState(new Array(labels.length).fill(false));
  }, [labels]);

  const handleLabels = (e) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === parseInt(e.target.id) ? !item : item
    );
    setCheckedState(updatedCheckedState);

    const currentChecked = labels.filter(
      (label, index) => updatedCheckedState[index]
    );
    setSelectedLabels(currentChecked);

    if (currentChecked.length > 0) setDeleteButton(true);
    else setDeleteButton(false);
  };

  const handleDeleteButton = () => {
    const data = {
      labels: selectedLables,
    };
    deleteLabels(data);
    setSelectedLabels([]);
    setCheckedState(new Array(labels.length).fill(false));
    setDeleteButton(false);
  };

  return (
    <div className="lg:w-[30%] flex flex-col items-center space-y-10 bg-blue-100 p-5 rounded-md">
      <h1 className="text-lg font-bold bg-slate-400 p-3 rounded-md">
        Delete Labels
      </h1>
      <div className="overflow-y-auto h-96 px-5">
        {labels.map((label, index) => (
          <div key={index} className="flex items-center mb-4">
            <input
              id={index}
              type="checkbox"
              value={label}
              checked={checkedState[index]}
              onChange={handleLabels}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-2"
            />
            <label htmlFor={index} className="ms-2 text-sm font-medium">
              {label}
            </label>
          </div>
        ))}
      </div>
      <button
        onClick={handleDeleteButton}
        disabled={!deleteButton}
        className={`${
          !deleteButton ? "bg-gray-300" : ""
        } text-md text-white font-semibold bg-blue-500 py-2 px-5 rounded-lg`}
      >
        Delete
      </button>
    </div>
  );
}
