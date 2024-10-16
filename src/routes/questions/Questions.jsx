import { IoAdd } from "react-icons/io5";
import { memo, useState } from "react";
import { Link } from "react-router-dom";
import QuestionItem from "@/components/questions/QuestionItem";
import { useGetQuestionsQuery } from "@/redux/api/questionApi";
import ButtonLang from "@/components/button/ButtonLang";
import { Modal } from "antd";

const Questions = ({ title }) => {
  const { data: questionsData } = useGetQuestionsQuery({});

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const questionsItem = questionsData?.form?.map((item) => (
    <li
      key={item._id}
      className="p-4 flex items-center justify-between border border-gray-300 hover:cursor-pointer hover:bg-gray-200/20 transition-all ease-in duration-150 rounded-md"
    >
      <QuestionItem title={item.title} />

      <div className="flex items-center px-2 gap-5">
        <div className="flex items-center justify-center gap-3">
          {["uz", "ru", "en"].map((lang) => (
            <ButtonLang onClick={showModal} key={lang} lang={lang} />
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
          <ul className="flex flex-col gap-5">{questionsItem}</ul>
        </div>
      </main>

      <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
  );
};

export default memo(Questions);
