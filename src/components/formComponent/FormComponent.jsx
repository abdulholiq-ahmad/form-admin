const FormComponent = ({ data }) => {
  return (
    <div>
      {data?.form.map((item) => (
        <div key={item._id}>
          <h2>{item.title}</h2>
          <p>{item.description}</p>
        </div>
      ))}
    </div>
  );
};

export default FormComponent;
