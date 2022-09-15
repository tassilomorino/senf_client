import React from "react";

const Question = ({ qtext, setQtext }) => {
  return (
    <div className="col-md-8 offset-md-2 col-12 input-group my-3">
      <div className="input-group-prepend">
        <span className="input-group-text" id="basic-addon1">
          ?
        </span>
      </div>
      <input
        type="text"
        className="form-control"
        placeholder="Question"
        value={qtext}
        onChange={(e) => {
          setQtext(e.target.value);
        }}
      />
    </div>
  );
};

export default Question;
