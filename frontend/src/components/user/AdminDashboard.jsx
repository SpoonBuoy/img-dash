import CreateLabel from "./CreateLabel";
import DeleteLabels from "./DeleteLabels";
import UploadImages from "./UploadImages";

export default function AdminDashboard() {

  return (
    <div className="flex flex-col lg:flex-row space-y-20 lg:space-x-20 lg:space-y-0 justify-between">
      <CreateLabel />
      <DeleteLabels />
      <UploadImages />
    </div>
  );
}
