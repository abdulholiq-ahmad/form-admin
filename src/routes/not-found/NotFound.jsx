import React, { memo } from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen">
      <h2 className="text-4xl font-bold uppercase text-gray-800">Not Found</h2>
      <span className="text-9xl font-bold text-gray-800">404</span>

      <div className="flex items-center gap-2">
        <button
          onClick={() => navigate(-1)}
          className="p-2 px-4 mt-5 bg-gray-800 hover:bg-gray-700 text-white text-sm font-medium rounded-md uppercase"
        >
          Go back
        </button>
        <button
          onClick={() => navigate("/")}
          className="p-2 px-4 mt-5 bg-gray-800 hover:bg-gray-700 text-white text-sm font-medium rounded-md uppercase"
        >
          Go home
        </button>
      </div>
    </div>
  );
};

export default memo(NotFound);
