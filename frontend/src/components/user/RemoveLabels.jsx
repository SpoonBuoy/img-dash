import { useState } from "react";
import { removeLabels } from "../../services/user.service";

export default function RemoveLabels({ id, labels, setButtonClicked}) {
  const [selectedLabels, setSelectedLabels] = useState([]);
  const [showLabels, setShowLabels] = useState(false);
  const [removeButton, setRemoveButton] = useState(false);

  const handleOptions = (e) => {
    if (selectedLabels.includes(e.target.value)) {
      const currentLabels = selectedLabels.filter(
        (label) => label !== e.target.value
      );
      setSelectedLabels(currentLabels);

      if (currentLabels.length > 0) setRemoveButton(true);
      else setRemoveButton(false);
    } else {
      const currentLabels = [...selectedLabels, e.target.value];
      setSelectedLabels(currentLabels);

      if (currentLabels.length > 0) setRemoveButton(true);
      else setRemoveButton(false);
    }
  };

  const toggleLabels = () => {
    setShowLabels((prev) => !prev);
  };

  const handleRemoveButton = () => {
    const data = {
      image: id,
      labels: selectedLabels,
    };

    removeLabels(data);
    setSelectedLabels([]);
    setRemoveButton(false);
    setShowLabels(false);
    setButtonClicked(prev => !prev)
  };

  return (
    <div className="flex flex-row items-center space-x-3 p-2">
      <div className="flex flex-col items-center relative">
        <button
          onClick={toggleLabels}
          className="border-2 border-slate-400 bg-gray-200 rounded-lg px-1"
        >
          select labels
        </button>
        <div
          className={`${
            showLabels ? "" : "hidden"
          } overflow-y-auto h-48 px-5 py-1 absolute z-50 top-7 bg-white rounded-lg shadow-lg border-2`}
        >
          {labels != null && labels.map((label, index) => (
            <div key={index} className="flex items-center mb-4">
              <input
                id={`remove-label-${index}-${id}`}
                type="checkbox"
                value={label}
                checked={selectedLabels.includes(label)}
                onChange={handleOptions}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-2"
              />
              <label
                htmlFor={`remove-label-${index}-${id}`}
                className="ms-2 text-sm font-medium whitespace-nowrap"
              >
                {label}
              </label>
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={handleRemoveButton}
        disabled={!removeButton}
        className={`${
          removeButton ? "bg-red-400" : "bg-gray-400"
        } text-white p-1 rounded-md`}
      >
        Remove Labels
      </button>
    </div>
  );
}
