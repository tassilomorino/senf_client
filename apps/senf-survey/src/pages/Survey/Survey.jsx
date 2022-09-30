import { addDoc, collection, doc, getDoc } from "firebase/firestore";
import React from "react";
import { Formik, Field } from "formik";
import { db } from "../../firebase";

function Survey(props) {
  const [schema, setSchema] = React.useState([]);
  const docId = window.location.pathname.replace("/survey/", "");
  const docRef = doc(db, "surveys", docId);
  const entriesColRef = collection(docRef, "entries");

  React.useEffect(() => {
    async function getSchema() {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setSchema(docSnap.data().scehma);
      } else {
        //! TODO show a better indicator that such survey doesn't exist
        alert("no document found");
      }
    }
    getSchema();
  }, []);

  if (schema.length < 0) return null;

  return (
    <Formik
      initialValues={Object.fromEntries(schema?.map((e) => [e.qtext, []]))}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(true);
        addDoc(entriesColRef, values)
          .then(() => setSubmitting(false))
          .catch(() => setSubmitting(false));
      }}
    >
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          {schema?.map((element, index) => {
            return (
              <React.Fragment key={index}>
                <p>
                  {element.qtext}
                  <br />
                </p>
                {element.options.map((option, i) => (
                  <React.Fragment key={option.uid}>
                    <Field
                      type={element.qtype === 1 ? "checkbox" : "radio"}
                      name={element.qtext}
                      id={option.uid}
                      value={option.value}
                    />
                    <label htmlFor={option.uid}>{option.value}</label>
                  </React.Fragment>
                ))}
              </React.Fragment>
            );
          })}
          <br />
          <button type="submit">Submit</button>
        </form>
      )}
    </Formik>
  );
}

export default Survey;
