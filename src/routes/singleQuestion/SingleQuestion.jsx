import { useParams } from "react-router-dom";
import { useGetSingeQuestionQuery } from "@/redux/api/questionApi";
import Dropdown from "@/components/questions/Dropdown";
import { useState } from "react"; // useState hookini import qilish

const SingleQuestion = () => {
  const { id, lang } = useParams();
  const { data } = useGetSingeQuestionQuery({ id, lang });
  const [selectedDropdownOption, setSelectedDropdownOption] = useState(""); // Tanlangan dropdown qiymatini saqlash

  return (
    <div className="container flex items-center justify-center ">
      <h1 className="sr-only">{data?.title}</h1>

      <div className="py-5 px-4 mt-10 rounded-md">
        <div className="mb-2 p-3 bg-gray-100 rounded-md">
          <h2 className="text-3xl font-bold mb-2">{data?.title}</h2>
          <p className="text-xl font-medium text-gray-700">{data?.description}</p>
        </div>
        <ul className="flex flex-col gap-3">
          {data?.questions?.map((item) => (
            <div className="p-3 bg-gray-100 rounded-md" key={item._id}>
              <li>
                <h3 className="text-lg font-semibold mb-3">{item.questionText}</h3>
                {item.options.map((option, index) => (
                  <div className="flex gap-3 w-full" key={index}>
                    {item.questionType === "checkbox" ? (
                      <div className="flex items-center gap-2">
                        <label className="flex items-center cursor-pointer relative">
                          <input
                            type="checkbox"
                            className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded border border-slate-300 checked:bg-slate-800 checked:border-slate-800"
                            id={option}
                            name="answer"
                          />
                          <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-3.5 w-3.5"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              stroke="currentColor"
                              strokeWidth="1"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              ></path>
                            </svg>
                          </span>
                        </label>
                        <label className="cursor-pointer" htmlFor={option}>
                          {option}
                        </label>
                      </div>
                    ) : (
                      <div className="w-full">
                        {item.questionType !== "dropdown" ? (
                          <div className={`${item.questionType === "text" ? "" : "flex items-center gap-2"}`}>
                            <input
                              className={`p-1 text-sm ${
                                item.questionType === "text"
                                  ? "w-full border border-gray-200  ring-1 ring-transparent focus:outline-none focus:ring-gray-400 ring-offset-2"
                                  : "accent-gray-800 w-[18px] h-[18px]"
                              }`}
                              name="answer"
                              type={item.questionType}
                              id={option}
                              placeholder={option}
                            />
                            {item.questionType !== "text" && <label htmlFor={option}>{option}</label>}
                          </div>
                        ) : null}
                      </div>
                    )}
                  </div>
                ))}
                {item.questionType === "dropdown" && (
                  <Dropdown
                    options={item.options}
                    handleChangeText={(text) => setSelectedDropdownOption(text)}
                    selectedOption={selectedDropdownOption}
                  />
                )}
              </li>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SingleQuestion;
