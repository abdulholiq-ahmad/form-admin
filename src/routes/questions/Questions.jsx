import { memo } from "react";
import { IoAdd } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useGetQuestionsQuery } from "@/redux/api/questionApi";
import BackButton from "@/components/button/BackButton";
import TableComponent from "@/components/table/TableComponent";

const Questions = ({ title }) => {
  const { data: questionsData } = useGetQuestionsQuery({});

  return (
    <>
      <main className="min-h-full">
        <div className="bg-white shadow">
          <div className="container flex items-center justify-between mx-auto px-4 py-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-semibold tracking-tight text-gray-900">{title}</h1>

            <Link to={"/create-question"} className="p-2 px-4 bg-gray-800 hover:bg-gray-700 text-white rounded-md flex items-center gap-2">
              <span className="text-sm font-medium uppercase">create</span>
              <IoAdd className="text-white text-xl" />
            </Link>
          </div>
        </div>
        <div className="container sm:px-6 lg:px-8 py-4">
          <BackButton />
          <TableComponent data={questionsData} />
        </div>
      </main>
    </>
  );
};

export default memo(Questions);
