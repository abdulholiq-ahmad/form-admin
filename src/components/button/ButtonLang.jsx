const ButtonLang = ({ lang, onClick }) => {
  return (
    <>
      <button
        onClick={onClick}
        className="p-1 px-2 bg-gray-800 hover:bg-gray-700 text-white text-sm font-sm rounded-md uppercase"
      >
        {lang}
      </button>
    </>
  );
};

export default ButtonLang;
