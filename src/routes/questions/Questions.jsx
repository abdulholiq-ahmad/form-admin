import { IoAdd } from "react-icons/io5";
import { memo } from "react";
import { Link } from "react-router-dom";
import { HiPencilAlt } from "react-icons/hi";

const Questions = ({ title }) => {
  return (
    <>
      <main className="min-h-full">
        <div className="bg-white shadow">
          <div className="container flex items-center justify-between mx-auto px-4 py-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-semibold tracking-tight text-gray-900">{title}</h1>

            <Link
              to={"/create-question"}
              className="p-2 px-4 mt-5 bg-gray-800 hover:bg-gray-700 text-white rounded-md flex items-center gap-2"
            >
              <span className="text-sm font-medium uppercase">create</span>
              <IoAdd className="text-white text-xl" />
            </Link>
          </div>
        </div>
        <div className="container sm:px-6 lg:px-8 py-4">
          <ul className="flex flex-col gap-3">
            <li className="relative py-2 px-2 pr-9 flex items-center justify-between border-b-2 border-gray-300 hover:cursor-pointer hover:bg-gray-200/20 transition-all ease-in duration-150 rounded-md">
              <div>
                <h3
                  className="text-xl font-semibold text-gray-800 line-clamp-1 max-w-[95%]"
                  title="Perspiciatis sit soluta alias corporis voluptates quidem maiores. Dolorum ut sunt quasi dolorem fuga cumque laborum magnam. Animi consectetur eum ut error nesciunt"
                >
                  Perspiciatis sit soluta alias corporis voluptates quidem maiores. Dolorum ut sunt quasi dolorem fuga cumque
                  laborum magnam. Animi consectetur eum ut error nesciunt
                </h3>
                <p className="text-sm text-gray-400 mt-2 w-[90%]">
                  Eum aut qui. Modi voluptates velit numquam deleniti repellendus vel cupiditate totam eos. Consequatur dolorem et
                  voluptas aut. Quisquam autem velit fugit est ratione labore odit impedit.
                </p>
              </div>

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
