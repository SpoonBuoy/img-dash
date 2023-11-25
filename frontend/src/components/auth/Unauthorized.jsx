export default function Unauthorized({ message }) {
  return (
    <div className="flex items-center justify-center">
      <div className="bg-red-500 p-3 rounded-lg inline-block align-middle items-center">
        <h1 className="text-lg font-bold text-white text-center">{message}</h1>
      </div>
    </div>
  );
}
