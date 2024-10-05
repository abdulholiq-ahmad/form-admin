import Form from "@/components/form/Form";

const Questions = ({ title }) => {
  return (
    <>
      <main className="min-h-full">
        <div className="bg-white shadow">
          <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">{title}</h1>
          </div>
        </div>
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <Form />
        </div>
      </main>
    </>
  );
};

export default Questions;
