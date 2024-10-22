import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { IoIosCheckbox, IoIosRadioButtonOn } from "react-icons/io";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { IoText } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";
import { useUpdateQeustionMutation } from "@/redux/api/questionApi";
import TypeQuestion from "../form/FormRadio";

function UpdateForm({ data, id, lang }) {
  const [questionsList, setQuestionsList] = useState(data?.questions || []);
  const [disabled, setDisabled] = useState(false);
  const [updateQuestion] = useUpdateQeustionMutation();

  useEffect(() => {
    if (lang === "en" || lang === "uz") {
      setDisabled(true);
    }
  }, [disabled]);

  useEffect(() => {
    if (data?.questions) {
      setQuestionsList(data.questions);
    }
  }, [data]);

  const renderQuestionIcon = (questionType) => {
    switch (questionType) {
      case "checkbox":
        return <IoIosCheckbox className="text-gray-700 size-6" />;
      case "radio":
        return <IoIosRadioButtonOn className="text-gray-700 size-6" />;
      case "text":
        return <IoText className="text-gray-700 size-6" />;
      default:
        return <IoIosArrowDropdownCircle className="text-gray-700 size-6" />;
    }
  };

  const handleCreateQuestions = (newType) => {
    const newQuestionData = {
      questionText: "New Question Text",
      questionType: newType || "checkbox",
      options: newType === "text" ? ["Answer"] : ["Option 1", "Option 2"],
      required: false,
    };

    setQuestionsList((prevQuestions) => [...prevQuestions, newQuestionData]);
  };

  const handleDeleteOption = (questionIndex, optionIndex) => {
    setQuestionsList((prevQuestions) => {
      const updatedQuestions = prevQuestions.map((question, qIndex) => {
        if (qIndex === questionIndex) {
          return {
            ...question,
            options: question.options.filter((_, idx) => idx !== optionIndex),
          };
        }
        return question;
      });
      return updatedQuestions;
    });
  };

  const handleQuestionTextChange = (e, questionIndex) => {
    const newText = e.target.value;
    setQuestionsList((prevQuestions) => {
      const updatedQuestions = prevQuestions.map((question, index) => {
        if (index === questionIndex) {
          return { ...question, questionText: newText };
        }
        return question;
      });
      return updatedQuestions;
    });
  };

  const handleOptionTextChange = (e, questionIndex, optionIndex) => {
    const newOptionText = e.target.value;
    setQuestionsList((prevQuestions) => {
      return prevQuestions.map((question, index) => {
        if (index === questionIndex) {
          return {
            ...question,
            options: question.options.map((option, idx) => {
              if (idx === optionIndex) {
                return newOptionText;
              }
              return option;
            }),
          };
        }
        return question;
      });
    });
  };

  const handleQuestionTypeChange = (newType, questionIndex) => {
    setQuestionsList((prevQuestions) => {
      return prevQuestions.map((question, index) => {
        if (index === questionIndex) {
          const updatedOptions = newType === "text" ? [""] : question.options;
          return { ...question, questionType: newType, options: updatedOptions };
        }
        return question;
      });
    });
  };

  const handleRemoveQuestion = (questionIndex) => {
    setQuestionsList((prevQuestions) => prevQuestions.filter((_, idx) => idx !== questionIndex));
  };

  const handleSetRequired = (questionIndex, value) => {
    setQuestionsList((prevQuestions) => {
      return prevQuestions.map((question, index) => {
        if (index === questionIndex) {
          return { ...question, required: value };
        }
        return question;
      });
    });
  };

  const renderQuestions = () => {
    const filteredQuestions = questionsList.filter((question) => question.options && question.options.length > 0);
    return filteredQuestions.map((question, questionIndex) => (
      <div key={questionIndex} className="flex flex-col gap-6 p-4 border rounded-md shadow">
        <div className="flex gap-2">
          <input
            type="text"
            value={lang === "ru" ? question.questionText : undefined}
            onChange={(e) => handleQuestionTextChange(e, questionIndex)}
            placeholder={question.questionText}
            className="border rounded-md pl-2 w-full py-1"
            required
          />
          <TypeQuestion
            disabled={disabled}
            title={question.questionType}
            handleChangeType={(newType) => handleQuestionTypeChange(newType, questionIndex)}
          />
        </div>

        <div className="flex flex-col gap-3">
          {question.questionType === "text" ? (
            <div className="flex items-center gap-2 w-full">
              {renderQuestionIcon(question.questionType)}
              <input
                type="text"
                value={lang === "ru" ? question.options[0] : undefined}
                onChange={(e) => handleOptionTextChange(e, questionIndex, 0)}
                placeholder={question.options[0]}
                className="border rounded-md pl-2 w-full py-1.5"
                required
              />
            </div>
          ) : (
            question.options.map((option, optionIndex) => (
              <div key={optionIndex} className="flex items-center gap-2 w-full">
                {renderQuestionIcon(question.questionType)}
                <input
                  type="text"
                  value={lang === "ru" ? option : undefined}
                  onChange={(e) => handleOptionTextChange(e, questionIndex, optionIndex)}
                  placeholder={option}
                  className="border rounded-md pl-2 w-full py-1.5"
                  required
                />
                {question.options.length > 1 && (
                  <button
                    disabled={disabled}
                    type="button"
                    onClick={() => handleDeleteOption(questionIndex, optionIndex)}
                    className={`border rounded-md px-3 py-2 bg-gray-800 text-white hover:bg-gray-600 ${
                      disabled ? "cursor-not-allowed opacity-80" : "cursor-pointer"
                    }`}
                    title="Delete Option"
                  >
                    <IoClose />
                  </button>
                )}
              </div>
            ))
          )}
        </div>

        {question.questionType !== "text" && (
          <button
            disabled={disabled}
            type="button"
            onClick={() => {
              setQuestionsList((prevQuestions) => {
                const updatedQuestions = [...prevQuestions];
                updatedQuestions[questionIndex].options.push(`Option ${updatedQuestions[questionIndex].options.length + 1}`);
                return updatedQuestions;
              });
            }}
            className={`self-start bg-transparent ${
              disabled ? "cursor-not-allowed opacity-80" : "cursor-pointer"
            }   text-blue-500 text-sm border-b border-gray-400`}
          >
            Add Option
          </button>
        )}

        <div className="flex items-center gap-3 ml-auto ">
          <label className={`flex items-center gap-2 ${disabled ? "cursor-not-allowed opacity-70" : "cursor-pointer"}`}>
            <input
              disabled={disabled}
              type="checkbox"
              checked={question.required}
              onChange={() => handleSetRequired(questionIndex, !question.required)}
              className={`accent-gray-800 w-[15px] h-[15px] ${disabled ? "cursor-not-allowed opacity-70" : "cursor-pointer"}`}
            />
            Required
          </label>
          <button
            disabled={disabled}
            type="button"
            onClick={() => handleRemoveQuestion(questionIndex)}
            className={`p-2 px-4  ${disabled ? "bg-gray-600 cursor-not-allowed" : "bg-gray-800 hover:bg-gray-700"} text-white rounded-md`}
            title="Remove Question"
          >
            <MdDeleteOutline />
          </button>
        </div>
      </div>
    ));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedData = {
      title: e.target.title.value,
      description: e.target.description.value,
      _id: id,
      language: lang,
      questions: questionsList,
    };
    updateQuestion({
      questionData: updatedData,
    });
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-3">
          <input
            type="text"
            name="title"
            id="title"
            defaultValue={lang === "ru" ? data?.title : undefined}
            placeholder="Question title"
            className="border rounded-md pl-2 py-2 text-2xl"
            required
          />
          <input
            name="description"
            id="description"
            defaultValue={lang === "ru" ? data?.description : undefined}
            placeholder="Question description"
            className="border rounded-md pl-2 py-2"
            required
          />
        </div>

        <div>{renderQuestions()}</div>

        <div className="flex items-center justify-between">
          {!disabled ? (
            <button
              type="button"
              onClick={() => handleCreateQuestions()}
              className="mt-4 p-2 px-4 bg-gray-800 text-white rounded-md hover:bg-gray-700"
            >
              Add Question
            </button>
          ) : (
            ""
          )}

          <button type="submit" className="mt-4 p-2 px-4 bg-gray-800 text-white rounded-md hover:bg-gray-700">
            Update
          </button>
        </div>
      </form>
    </div>
  );
}

export default UpdateForm;
