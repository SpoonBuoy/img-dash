import AssignLabels from "./AssignLabels";
import RemoveLabels from "./RemoveLabels";

export default function Image({ id, image, labels, setButtonClicked, setLabels }) {

  return (
    <div className="bg-blue-100 rounded-md flex flex-col justify-between">
      <img
        src={image.path}
        alt="img"
        className="object-contain rounded-md"
      ></img>

      <div className="">
        <div className="p-2 flex flex-row overflow-auto space-x-3 items-center">
          <h1 className="text-sm font-semibold bg-slate-300 rounded-md p-1">
            Labels:
          </h1>
          {image.labels != null && image.labels.map((label, index) => (
            <div
              key={index}
              className="whitespace-nowrap bg-slate-100 rounded-md p-1 text-sm"
            >
              {label}
            </div>
          ))}
        </div>

        <AssignLabels id={id} labels={labels} setButtonClicked = {setButtonClicked} setLabels = {setLabels}/>

        <RemoveLabels id={id} labels={image.labels} setButtonClicked = {setButtonClicked} setLabels = {setLabels} />
      </div>
    </div>
  );
}
