import React, { useState } from "react";
import Question from "../../components/Question";
import Option from "../../components/Option/Option";
import { Wrapper } from "./Styled.EditSurvey";
import { arrayUnion, collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";

const TypeSelector = ({ qtype, setQtype }) => {
  const handleChange = (e) => {
    const type = parseInt(e.target.value);
    setQtype(type);
  };
  return (
    <div className="col-md-6 offset-md-3 col-12">
      <select
        className="custom-select"
        value={qtype}
        onChange={handleChange}
      >
        <option value="0">Choose Question Type</option>
        <option value="1">Multi-Select</option>
        <option value="2">Single-Select</option>
      </select>
    </div>
  );
};

const CreateSurvey = ({ squestions, setSquestion }) => {
  const generateRandomNumber = () => Math.floor(Math.random() * 1000 + 1);
  const docId = window.location.pathname.replace("/edit/", "");
  const schemaRef = doc(db, "surveys", docId);
  const [qtext, setQtext] = useState("");
  const [qtype, setQtype] = useState(0);
  const [options, setOptions] = useState([
    { uid: generateRandomNumber(), value: "" },
    { uid: generateRandomNumber(), value: "" },
  ]);
  const addOptions = () => {
    const newOption = {
      uid: generateRandomNumber(),
      value: "",
    };
    const updatedOption = [...options];
    updatedOption.push(newOption);
    setOptions(updatedOption);
  };
  const deleteOptions = (id) => {
    if (options.length > 2) {
      console.log(id);
      let updatedOption = [...options].filter((item) => item.uid !== id);
      setOptions(updatedOption);
    }
  };
  const updateTextOption = (id, text) => {
    const updatedOption = [...options];
    const changedIndex = updatedOption.findIndex((x) => x.uid === id);
    updatedOption[changedIndex].value = text;
    setOptions(updatedOption);
  };
  const addQuestion = async () => {
    const newSurveyQuestion = [...squestions];
    const newQuestion = {
      qtext,
      qtype,
      options,
    };
    newSurveyQuestion.push(newQuestion);
    setSquestion(newSurveyQuestion);
    setQtext("");
    console.log(newSurveyQuestion);
    await updateDoc(schemaRef, {
      scehma: arrayUnion(newSurveyQuestion[newSurveyQuestion.length - 1]),
    });
    setQtype(0);
    setOptions([
      { uid: generateRandomNumber(), value: "" },
      { uid: generateRandomNumber(), value: "" },
    ]);
  };
  const publish = () => {};
  return (
    <Wrapper>
      <TypeSelector
        qtype={qtype}
        setQtype={setQtype}
      />
      {qtype !== 0 ? (
        <>
          <Question
            qtext={qtext}
            setQtext={setQtext}
          />
          {options.map((opt, key) => (
            <Option
              key={key}
              opt={opt}
              addOptions={addOptions}
              deleteOptions={deleteOptions}
              updateText={updateTextOption}
            />
          ))}
          <button
            className="btn btn-danger m-3"
            onClick={addQuestion}
          >
            Add Question
          </button>
          <button
            className="btn btn-danger m-3"
            onClick={publish}
          >
            Publish
          </button>
        </>
      ) : null}
    </Wrapper>
  );
};

export default CreateSurvey;
