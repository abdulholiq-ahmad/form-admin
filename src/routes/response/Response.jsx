import React from "react";

const Response = ({ title }) => {
  return (
    <section className="min-w-full">
      <div className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">{title}</h1>
        </div>
      </div>
      <div className="container"></div>
    </section>
  );
};

export default Response;
