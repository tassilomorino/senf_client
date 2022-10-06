import { addDoc, collection, doc, getDoc } from "firebase/firestore";
import React from "react";
import { Formik, Field } from "formik";
import {
  Box,
  Button,
  LayerWhiteFirstDefault,
  ToggleInput,
  Typography,
} from "senf-atomic-design-system";
import styled from "styled-components";
import { db } from "../../firebase";

const Layer = styled.div`
  ${LayerWhiteFirstDefault};
  border-radius: ${({ theme }) => theme.radii[4]}px;
`;

function Survey({ previewQuestions }) {
  function isPreviewing() {
    return typeof previewQuestions !== "undefined";
  }

  const [questions, setQuestions] = React.useState(
    isPreviewing() ? previewQuestions : []
  );

  const docId = window.location.pathname.split("/")[2];
  const docRef = doc(db, "surveys", docId);
  const entriesColRef = collection(docRef, "entries");

  React.useEffect(() => {
    if (isPreviewing()) return null;
    async function getSchema() {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setQuestions(docSnap.data().questions);
      } else {
        //! TODO show a better indicator that such survey doesn't exist
        alert("no document found");
      }
    }
    getSchema();
  }, []);

  if (questions.length < 0) return null;

  return (
    <Formik
      initialValues={Object.fromEntries(questions?.map((e) => [e.qtext, []]))}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(true);
        addDoc(entriesColRef, values)
          .then(() => setSubmitting(false))
          .catch(() => setSubmitting(false));
      }}
    >
      {({ handleSubmit }) => (
        <Box
          height="100%"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <form
            style={{ height: "100%" }}
            onSubmit={handleSubmit}
          >
            <Box
              flexDirection="column"
              gap="1rem"
              style={{ minHeight: 0 }}
            >
              {questions?.map((element, index) => {
                return (
                  <Layer key={index}>
                    <Box
                      padding="1rem 5rem 2rem 1rem"
                      flexDirection="column"
                      gap="1rem"
                    >
                      <Typography
                        variant="buttonBg"
                        color="rgba(35, 29, 20, 0.5)"
                      >
                        Question {index + 1}
                      </Typography>

                      <Typography variant="h2">{element.qtext}</Typography>
                      <Box gap="0.5rem">
                        {element.options.map((option) => (
                          <React.Fragment key={option.uid}>
                            <Field
                              type={
                                element?.qtype !== "SingleChoice"
                                  ? "checkbox"
                                  : "radio"
                              }
                              name={element.qtext}
                              id={option.uid}
                              value={option.value}
                              receiveValue={(value) => {
                                console.log(value);
                              }}
                              as={ToggleInput}
                            />
                            <label htmlFor={option.uid}>{option.value}</label>
                          </React.Fragment>
                        ))}
                      </Box>
                    </Box>
                  </Layer>
                );
              })}
              <br />
              <Button
                disabled={isPreviewing()}
                variant="primary"
                type="submit"
                text="submit"
              />
            </Box>
          </form>
        </Box>
      )}
    </Formik>
  );
}

export default Survey;
