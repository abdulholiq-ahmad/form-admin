function Form() {
  return (
    <>
      <div className="container">
        <div className="border-t-[10px] border-t-gray-700 rounded-md px-[25px] border-l-[5px] border-l-indigo-600 py-5">
          <form>
            <input
              className="w-full pb-2 pl-2 border-b-2 focus:border-b-indigo-500 focus:border-b-3 outline-none text-4xl transition-all ease-in duration-150"
              type="text"
              defaultValue={"Untitled question"}
            />
            <div className={``}></div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Form;
