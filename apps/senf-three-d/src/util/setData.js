import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

export async function setDrawnData(drawnData) {
  localStorage.setItem("drawnData", JSON.stringify(drawnData));
  console.log("Localstorage successfully updated!");
}

export async function setModelsData(modelsData) {
  const modelsRawData = [];
  modelsData.forEach((model) => {
    console.log(model);

    modelsRawData.push({
      obj: model.userData.obj,
      coordinates: model.coordinates,
      labelText: model.userData.labelText || null,
      format: model.userData.type || null,
      id: model.userData.id || null,
      // rotation: model.rotation,
    });
  });

  localStorage.setItem("modelsData", JSON.stringify(modelsRawData));

  console.log("Localstorage successfully updated!");
}
