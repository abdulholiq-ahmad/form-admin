import BackButton from "@/components/button/BackButton";
import UpdateForm from "@/components/update-form/UpdateForm";
import { useGetSingeQuestionQuery } from "@/redux/api/questionApi";
import { useParams } from "react-router-dom";

const UpdateQuestions = ({ title }) => {
  const { id } = useParams();
  const { data: singleData } = useGetSingeQuestionQuery({ id, lang: "ru" });

  return (
    <>
      <div className="bg-white shadow">
        <div className="container flex items-center justify-between mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-semibold tracking-tight text-gray-900">{title}</h1>
        </div>
      </div>
      <div className="container">
        <BackButton />
        <UpdateForm data={singleData} />
      </div>
    </>
  );
};

export default UpdateQuestions;
