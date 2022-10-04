/* eslint-disable react/jsx-key */
import React, { useCallback, useContext, useMemo, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Question from "../../components/Question";
import Option from "../../components/Option/Option";
import { Wrapper } from "./Styled.EditSurvey";
import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import Nav from "./Nav/Nav";
import Main from "./Main";
import { Box, Button, Plus } from "senf-atomic-design-system";
import useSurveyStore from "../../state/Survey";
import Survey from "../Survey";

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
const EditSurvey = () => {
  const [order, setOrder] = React.useState(1);
  const [title, setTitle] = useState();
  const [type, setType] = useState();
  const [questions, setQuestions] = useState();

  React.useEffect(() => {
    const docId = window.location.pathname.replace("/edit/", "");
    const schemaRef = doc(db, "surveys", docId);
    const fetchSurvey = async (schemaRef) => {
      const docSnap = await getDoc(schemaRef);
      if (!docSnap.exists()) {
        //! TODO show a better indicator that such survey doesn't exist
        throw new Error("Error fetching the survey");
      }

      setTitle(docSnap.data().title);
      setType(docSnap.data().type);
      setQuestions(docSnap.data().questions);
    };
    fetchSurvey(schemaRef);
  }, []);

  const updateTextOption = (id, text) => {
    const updatedOption = [...options];
    const changedIndex = updatedOption.findIndex((x) => x.uid === id);
    updatedOption[changedIndex].value = text;
    setOptions(updatedOption);
  };
  const addQuestion = useCallback(async () => {
    const newSurveyQuestion = [...questions];
    const newQuestion = {
      qtext: "",
      qtype: "",
      options: [
        {
          uid: uuidv4(),
          value: "",
        },
        {
          uid: uuidv4(),
          value: "",
        },
      ],
    };
    newSurveyQuestion.push(newQuestion);
    setQuestions(newSurveyQuestion);
  }, [questions])
  const publish = () => { };
  
  const componetsList = useMemo(() => ([
    <>
      {questions?.map(({ options, qtext, qtype }, index) => (
        <Main
          options={options}
          qtext={qtext}
          qtype={qtype}
          setQuestions={setQuestions}
          questionIndex={index}
          key={index}
        />
      ))}
      <Box justifyContent="center">
        <Button
          onClick={addQuestion}
          variant="white"
          text="Add Question"
          icon={<Plus />}
        />
      </Box>
    </>, <Survey previewQuestions={questions} />
  ]), [addQuestion, questions]);

  return (
    <Wrapper>
      <Box
        height="100%"
        flexDirection="column"
      >
        <Nav title={title} order={order} setOrder={setOrder} />
        <Box
          style={{ flex: 1 }}
          gap="1rem"
          justifyContent="center"
          flexDirection="column"
        >
          {componetsList[order - 1]}
        </Box>
      </Box>
    </Wrapper>
  );
};

export default EditSurvey;
