import { useEffect, useState } from "react";
import Image from "./Image";
import { getLabels, getImages } from "../../services/user.service";

export default function ViewImages() {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [filteredImages, setFilteredImages] = useState([]);
  const [labels, setLabels] = useState([]);
  const [selectedLabels, setSelectedLabels] = useState([]);
  const [filterButton, setFilterButton] = useState(false);
  const [showLabels, setShowLabels] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);

  useEffect(() => {
    const data = {
      filters : []
    }
    getImages(data, setImages);
    getLabels(setLabels);
  }, [buttonClicked]);
  


  const handleOptionToggle = (e) => {
    if (selectedLabels.includes(e.target.value)) {
      const currentLabels = selectedLabels.filter(
        (label) => label !== e.target.value
      );
      setSelectedLabels(currentLabels);

      if (currentLabels.length > 0) setFilterButton(true);
      else {
        setFilteredImages([]);
        setFilterButton(false);
      }
    } else {
      const currentLabels = [...selectedLabels, e.target.value];
      setSelectedLabels(currentLabels);

      if (currentLabels.length > 0) setFilterButton(true);
      else {
        setFilteredImages([]);
        setFilterButton(false);
      }
    }
  };

  const filterImages = () => {
    const filteredImages = images.filter((img) =>
      img.labels.some((item) => selectedLabels.includes(item))
    );

    setFilteredImages(filteredImages);
    setShowLabels(false);
  };

  const toggleLabels = () => {
    setShowLabels((prev) => !prev);
  };

  const handleScroll = (e) => {
    const { offsetHeight, scrollTop, scrollHeight } = e.target;
    if (offsetHeight + scrollTop >= scrollHeight) {
      const data = {
      filters : []
    }
      getImages(data, setImages, page+1);
      setPage(prev => prev+1);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-20">
      <div className="flex flex-row items-center space-x-3">
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
            {labels.map((label, index) => (
              <div key={index} className="flex items-center mb-4">
                <input
                  id={index}
                  type="checkbox"
                  value={label}
                  checked={selectedLabels.includes(label)}
                  onChange={handleOptionToggle}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-2"
                />
                <label
                  htmlFor={index}
                  className="ms-2 text-sm font-medium whitespace-nowrap"
                >
                  {label}
                </label>
              </div>
            ))}
          </div>
        </div>
        <button
          onClick={filterImages}
          disabled={!filterButton}
          className={`${
            filterButton ? "bg-blue-400" : "bg-gray-400"
          } text-white p-1 rounded-md`}
        >
          Filter Images
        </button>
      </div>

      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 h-new scroll-smooth overflow-y-scroll"
        onScroll={handleScroll}
      >
        {filterButton
          ? filteredImages.map((img, index) => (
              <Image setButtonClicked = {setButtonClicked} key={index} image={img} labels={labels} />
            ))
          : images.map((img, index) => (
              <Image setButtonClicked = {setButtonClicked} key={index} id={img.path} image={img} labels={labels} />
            ))}
      </div>
    </div>
  );
}
