const QuestionItem = ({ title }) => {
  return (
    <div className="w-full">
      <h3 className="text-xl font-semibold text-gray-800 w-[90%]" title={title}>
        {title}
      </h3>
    </div>
  );
};

export default QuestionItem;
