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
  const modelsRawData = [];
  const updateData = {
    modelsData: modelsRawData,
  };
  modelsData.forEach((model) => {
    console.log(model);

    modelsRawData.push({
      obj: model.userData.obj,
      coordinates: model.coordinates,
      labelText: model.userData.labelText || null,
      objFormat: model.userData.objFormat || null,
      id: model.userData.id || null,
      // rotation: model.rotation,
    });
  });

  const ref = doc(db, "threeD_ideas", "GS4MT3HDv3YcojewHeLx");
  await updateDoc(ref, updateData).then(() => {
    console.log("Document successfully updated!");
  });
}
