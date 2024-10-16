import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usePostQuestionMutation } from "@/redux/api/questionApi";
import {
  addQuestion,
  updateOption,
  removeOption,
  removeQuestion,
  addOption,
  setRequired,
  updateQuestion,
} from "@/redux/slices/questionSlice";
import TypeQuestion from "./FormRadio";
import { IoClose } from "react-icons/io5";

import { IoIosCheckbox, IoIosRadioButtonOn } from "react-icons/io";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { IoText } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";

function Form() {
  const questionData = useSelector((state) => state.questions?.questionsList[0].questions || []);
  const [visible, setVisible] = useState(false);
  const [questionAnswers, setQuestionAnswers] = useState([""]);
  const [postQuestions] = usePostQuestionMutation();
  const dispatch = useDispatch();

  // Handle Change Type
  const handleChangeType = (index, newType) => {
    if (newType === "text") {
      dispatch(
        updateQuestion({
          questionIndex: index,
          questionData: {
            questionType: newType,
            options: ["Answer"],
          },
        })
      );
    } else {
      dispatch(
        updateQuestion({
          questionIndex: index,
          questionData: {
            questionType: newType,
          },
        })
      );
    }
  };

  // Handle Remove Question
  const handleRemoveQuestion = (index) => {
    dispatch(removeQuestion(index));
  };

  // Handle Add Option
  const handleAddOption = (questionIndex) => {
    dispatch(addOption({ questionIndex }));
  };

  // Handle Update Option
  const handleUpdateOption = (questionIndex, optionIndex, value) => {
    dispatch(updateOption({ questionIndex, optionIndex, value }));
  };

  // Handle Remove Option
  const handleRemoveOption = (questionIndex, optionIndex) => {
    dispatch(removeOption({ questionIndex, optionIndex }));
  };

  // Handle Set Required
  const handleSetRequired = (index, value) => {
    dispatch(setRequired({ questionIndex: index, value }));
  };

  const handleCloseAlert = () => {
    setVisible(!visible);
  };

  // Handle Update Question
  const handleUpdateQuestionText = (index, value) => {
    dispatch(updateQuestion({ questionIndex: index, questionData: { questionText: value } }));
    console.log("Question text updated:", value);
  };

  // Render Question
  const renderQuestion = (question, index) => {
    return (
      <div key={index} className="relative p-3 flex flex-col gap-4 shadow rounded-xl">
        <div className="flex items-end gap-4">
          <textarea
            required
            className="resize-y h-[40px] text-lg border rounded-md w-full pl-2 py-1.5"
            type="text"
            placeholder="Question"
            onChange={(e) => handleUpdateQuestionText(index, e.target.value)}
            name="question"
            defaultValue={question.questionText}
          />

          <TypeQuestion title={question.questionType} handleChangeType={(newType) => handleChangeType(index, newType)} />
        </div>

        {question.options?.map((item, optionIndex) => (
          <div key={optionIndex} className="flex gap-3">
            <div className="flex items-center gap-4 w-full">
              {(question.questionType === "checkbox" && <IoIosCheckbox className="size-6 text-gray-700" />) ||
                (question.questionType === "radio" && <IoIosRadioButtonOn className="size-6 text-gray-700" />) ||
                (question.questionType === "dropdown" && <IoIosArrowDropdownCircle className="size-6 text-gray-700" />) ||
                (question.questionType === "text" && <IoText className="size-6 text-gray-700" />)}

              <input
                required
                name="option"
                onChange={(e) => {
                  console.log(e.target.value);
                  handleUpdateOption(index, optionIndex, e.target.value);
                }}
                className="border rounded-md pl-2 w-full py-1"
                type="text"
                placeholder="Option"
                defaultValue={item}
              />
            </div>

            {question.options.length > 1 && (
              <button
                type="button"
                onClick={() => handleRemoveOption(index, optionIndex)}
                className="border rounded-md px-3 bg-gray-800 text-white"
              >
                <IoClose className="size-4" />
              </button>
            )}
          </div>
        ))}

        <div>
          {question.questionType !== "text" ? (
            <button
              onClick={() => handleAddOption(index)}
              type="button"
              className="text-blue-500 text-sm font-medium border-b inline-block hover:opacity-80"
            >
              Add option
            </button>
          ) : null}
        </div>

        <div className="flex items-center gap-3 ml-auto ">
          <label className="flex items-center cursor-pointer relative">
            <input
              type="checkbox"
              checked={question.required}
              onChange={(e) => handleSetRequired(index, e.target.checked)}
              className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded border border-slate-300 checked:bg-slate-800 checked:border-slate-800"
              id={`required-${index}`}
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
          <label className="cursor-pointer" htmlFor={`required-${index}`}>
            Required
          </label>
          <button
            onClick={() => handleRemoveQuestion(index)}
            type="button"
            className="p-2 px-4 bg-gray-800 text-white rounded-md hover:bg-gray-700"
          >
            <MdDeleteOutline className="size-4" />
          </button>
        </div>
      </div>
    );
  };

  // Handle Create Question
  const handleCreateQuestion = () => {
    const newQuestionData = {
      questionText: "Question Text",
      questionType: "checkbox",
      options: ["Option 1", "Option 2"],
      required: false,
    };

    dispatch(addQuestion(newQuestionData));
  };

  // Render Questions
  const renderQuestions = (questionData) => {
    return questionData.map((question, questionIndex) => (
      <div key={questionIndex} className="flex flex-col gap-4">
        {renderQuestion(question, questionIndex)}
      </div>
    ));
  };

  // Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    const newQuestionData = {
      title: data.get("title"),
      description: data.get("description"),
      questions: questionData,
    };

    console.log(newQuestionData);

    try {
      const result = await postQuestions(newQuestionData).unwrap();

      e.target.reset();
      console.log("Savol muvaffaqiyatli yaratildi:", result.error || result);

      setQuestionAnswers([""]);
    } catch (error) {
      console.error("Savol yaratishda xato:", error);
    }
  };

  return (
    <>
      <div className="container">
        <div className="w-full py-6">
          <form onSubmit={handleSubmit}>
            <div className="p-3 mb-8 shadow rounded-xl">
              <div className="flex flex-col gap-4">
                <input
                  name="title"
                  id="title"
                  type="text"
                  defaultValue="Untitled form"
                  className="w-full border p-2 rounded-md text-3xl"
                />
                <input
                  name="description"
                  id="description"
                  type="text"
                  defaultValue="Untitled description"
                  className="w-full border p-2 rounded-md text-xl"
                />
              </div>
            </div>

            <div className="flex flex-col gap-4">{renderQuestions(questionData)}</div>

            <div className="mt-6 flex items-center justify-between">
              <button
                onClick={() => handleCreateQuestion()}
                className="p-2 px-5 bg-gray-800 text-white rounded-md hover:bg-gray-700"
                type="button"
              >
                Add Question
              </button>
              <button type="submit" className="p-2 px-5 bg-gray-800 text-white rounded-md hover:bg-gray-700">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Form;
