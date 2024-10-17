import { memo } from "react";
import { IoAdd } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useGetQuestionsQuery } from "@/redux/api/questionApi";
import QuestionItem from "@/components/questions/QuestionItem";
import ButtonLang from "@/components/button/ButtonLang";
import BackButton from "@/components/button/BackButton";

const Questions = ({ title }) => {
  const { data: questionsData } = useGetQuestionsQuery({});
  console.log(questionsData);

  const questionsItem = questionsData?.form?.map((item) => (
    <li
      key={item._id}
      className="p-4 flex items-center justify-between border border-gray-300 hover:cursor-pointer hover:bg-gray-200/20 transition-all ease-in duration-150 rounded-md"
    >
      <QuestionItem title={item.title} />

      <div className="flex items-center px-2 gap-5">
        <div className="flex items-center justify-center gap-3">
          {["uz", "ru", "en"].map((lang) => (
            <Link key={lang} to={`/update-question/${item._id}`}>
              <ButtonLang key={lang} lang={lang} />
            </Link>
          ))}
        </div>
      </div>
    </li>
  ));

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
          <BackButton />
          <ul className="flex flex-col gap-5 mt-4">{questionsItem}</ul>
        </div>
      </main>
    </>
  );
};

export default memo(Questions);
