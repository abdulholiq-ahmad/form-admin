import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();
  return (
    <>
      <button
        onClick={() => navigate(-1)}
        className="flex gap-2 items-center p-2 pl-0 mt-2 text-gray-800 text-xs font-bold uppercase hover:opacity-70"
      >
        <IoArrowBack className="text-xl" />
        Go to back
      </button>
    </>
  );
};

export default BackButton;
