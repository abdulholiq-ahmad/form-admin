import { IoAdd } from "react-icons/io5";
import { memo } from "react";
import { Link } from "react-router-dom";
import { HiPencilAlt } from "react-icons/hi";
import QuestionItem from "@/components/questions/QuestionItem";

const Questions = ({ title }) => {
  return (
    <>
      <main className="min-h-full">
        <div className="bg-white shadow">
          <div className="container flex items-center justify-between mx-auto px-4 py-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-semibold tracking-tight text-gray-900">{title}</h1>

            <Link
              to={"/create-question"}
              className="p-2 px-4 bg-gray-800 hover:bg-gray-700 text-white rounded-md flex items-center gap-2"
            >
              <span className="text-sm font-medium uppercase">create</span>
              <IoAdd className="text-white text-xl" />
            </Link>
          </div>
        </div>
        <div className="container sm:px-6 lg:px-8 py-4">
          <ul className="flex flex-col gap-3">
            <li className="relative py-2 px-2 pr-9 flex items-center justify-between border-b-2 border-gray-300 hover:border-b-4 hover:border-r-4 hover:cursor-pointer hover:bg-gray-200/20 transition-all ease-in duration-150 rounded-md">
              <QuestionItem />

              <Link className="group absolute right-2 p-1 flex items-center justify-center h-full">
                <HiPencilAlt className="group-hover:text-gray-600 text-xl text-gray-700" />
              </Link>
            </li>
          </ul>
        </div>
      </main>
    </>
  );
};

export default memo(Questions);
