import NotFoundDataIcon from "@/assets/not-found-data.svg";

const NotFoundData = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <img src={NotFoundDataIcon} alt="not found data icon" width={100} />
      <h2 className="text-2xl font-bold text-gray-800 mb-1">Not found data</h2>
      <p className="text-sm text-gray-500">If you want to create data, click the create button.</p>
    </div>
  );
};

export default NotFoundData;
