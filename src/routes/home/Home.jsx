import FormComponent from "@/components/formComponent/FormComponent";
import { useGetQuestionsQuery } from "@/redux/api/questionApi";
import { Alert } from "antd";
import { memo, useEffect, useState } from "react";

const Home = ({ title }) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [visible, setVisible] = useState(false);
  const { data } = useGetQuestionsQuery();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsSuccess(true);
      setVisible(true);

      const timer = setTimeout(() => {
        setVisible(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isSuccess]);

  const handleClose = () => {
    setVisible(false);
  };

  return (
    <>
      <main className="min-h-full">
        {isSuccess && visible ? (
          <Alert
            className="flex items-center top-2 left-1/2 transform -translate-x-1/2 absolute"
            message="You are logged successfully!"
            type="success"
            closable
            onClose={handleClose}
            showIcon
          />
        ) : null}
        <div className="bg-white shadow">
          <div className="container mx-auto px-4 py-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-semibold tracking-tight text-gray-900">{title}</h2>
          </div>
        </div>
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <FormComponent data={data} />
        </div>
      </main>
    </>
  );
};

export default memo(Home);
