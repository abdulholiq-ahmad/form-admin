import React from "react";
import Form from "@/components/form/Form";

const CreateQuestions = ({ title }) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="bg-white shadow">
        <div className="container mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-semibold tracking-tight text-gray-900">{title}</h1>
        </div>
      </div>
      <div>
        <Form />
      </div>
    </div>
  );
};

export default CreateQuestions;
