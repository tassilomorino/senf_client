import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

export async function setDrawnData(drawnData) {
  console.log("setDrawnData", drawnData);
  const updateData = {
    drawnData: JSON.stringify(drawnData),
  };
  const ref = doc(db, "threeD_ideas", "GS4MT3HDv3YcojewHeLx");
  await updateDoc(ref, updateData).then(() => {
    console.log("Document successfully updated!");
  });
}

export async function setModelsData(modelsData) {
  const updateData = {
    modelsData,
  };
  const ref = doc(db, "threeD_ideas", "GS4MT3HDv3YcojewHeLx");
  await updateDoc(ref, updateData).then(() => {
    console.log("Document successfully updated!");
  });
}
