import { doc, getDoc } from "firebase/firestore";
import React from "react";
import { db } from "../../firebase";

function Survey(props) {
  const [schema, setSchema] = React.useState();
  React.useEffect(() => {
    const docId = window.location.pathname.replace("/survey/", "");
    async function getSchema() {
      const docRef = doc(db, "surveys", docId);
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
  console.log(schema);
  return (
    <form>
      {schema?.map((element, index) => {
        return (
          <React.Fragment key={index}>
            <p>
              {element.qtext}
              <br />
            </p>
            {element.options.map((option) => (
              <React.Fragment key={option.uid}>
                <input
                  type={element.qtype === 1 ? "checkbox" : "radio"}
                  name={element.qtext}
                  id={option.uid}
                />
                <label htmlFor={option.uid}>{option.value}</label>
              </React.Fragment>
            ))}
          </React.Fragment>
        );
      })}
    </form>
  );
}

export default Survey;
