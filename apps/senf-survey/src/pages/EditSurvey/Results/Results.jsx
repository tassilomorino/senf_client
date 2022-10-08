import { collection, doc, getDocs, query } from "firebase/firestore";
import React from "react";
import { db } from "../../../firebase";

function Results() {
    const [result, setResult] = React.useState([]);
    const docId = window.location.pathname.replace("/results/", "");
    const docRef = doc(db, "surveys", docId);
    const entriesColRef = collection(db, `${docRef.path}/entries`);

    React.useEffect(() => {
        const getResults = async () => {
            try {
                const q = query(entriesColRef);
                const docSnap = await getDocs(q);
                const surveyResultsData = [];
                docSnap.forEach(doc => {
                    surveyResultsData.push({
                        ...doc.data(),
                        resultId: doc.id,
                    })
                });
                setResult(surveyResultsData);
            } catch (error) {
                throw new Error(error, "Error displaying results for the given surveyId");
            }
        }
        getResults();
    }, []);

    if (result.length < 1) return null;
    
    return (
        'food'
    );
}

export default Results;
