const ButtonLang = ({ lang, onClick, active = true }) => {
  return (
    <>
      <button
        onClick={onClick}
        className={`${active ? "bg-green-400" : "bg-slate-500 hover:bg-gray-600"} p-1 px-2  text-white text-sm font-sm rounded-md uppercase`}
      >
        {lang}
      </button>
    </>
  );
};

export default ButtonLang;
