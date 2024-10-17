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
  const [questionAnswers, setQuestionAnswers] = useState([""]);
  const [postQuestions] = usePostQuestionMutation();
  const dispatch = useDispatch();

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

  const handleRemoveQuestion = (index) => {
    dispatch(removeQuestion(index));
  };

  const handleAddOption = (questionIndex) => {
    dispatch(addOption({ questionIndex }));
  };

  const handleUpdateOption = (questionIndex, optionIndex, value) => {
    dispatch(updateOption({ questionIndex, optionIndex, value }));
  };

  const handleRemoveOption = (questionIndex, optionIndex) => {
    dispatch(removeOption({ questionIndex, optionIndex }));
  };

  const handleSetRequired = (index, value) => {
    dispatch(setRequired({ questionIndex: index, value }));
  };

  const handleUpdateQuestionText = (index, value) => {
    dispatch(updateQuestion({ questionIndex: index, questionData: { questionText: value } }));
    console.log("Question text updated:", value);
  };

  const renderQuestion = (question, index) => {
    return (
      <div key={index} className="relative p-3 flex flex-col gap-4 shadow rounded-xl">
        <div className="flex items-end gap-4">
          <input
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
          {question.questionType !== "text" && (
            <button
              onClick={() => handleAddOption(index)}
              type="button"
              className="text-blue-500 text-sm font-medium border-b inline-block hover:opacity-80"
            >
              Add option
            </button>
          )}
        </div>

        <div className="flex items-center gap-3 ml-auto ">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={question.required}
              onChange={(e) => handleSetRequired(index, e.target.checked)}
              className="accent-gray-800 w-[15px] h-[15px]"
            />
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

  const handleCreateQuestion = () => {
    const newQuestionData = {
      questionText: "Question Text",
      questionType: "checkbox",
      options: ["Option 1", "Option 2"],
      required: false,
    };

    dispatch(addQuestion(newQuestionData));
  };

  const renderQuestions = (questionData) => {
    return questionData.map((question, questionIndex) => (
      <div key={questionIndex} className="flex flex-col gap-4">
        {renderQuestion(question, questionIndex)}
      </div>
    ));
  };

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
      <div>
        <div className="w-full py-6">
          <form onSubmit={handleSubmit}>
            <div className="p-3 mb-8 shadow rounded-xl">
              <div className="flex flex-col gap-4">
                <input
                  name="title"
                  id="title"
                  type="text"
                  defaultValue="Untitled form"
                  className="w-full border p-2 rounded-md text-2xl"
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
