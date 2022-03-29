import React from "react";

const Form = ({ inputValue, setInputValue, handleSubmit }) => {
  return (
    <div className="form">
      <input
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
        className="input"
        placeholder={"Type here..."}
      />
      <button onClick={handleSubmit} className="submit">
        Submit
      </button>
    </div>
  );
};

export default Form;
