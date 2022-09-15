export async function setModelsToLocalStorage(modelsData) {
  const modelsRawData = [];
  modelsData.forEach((model) => {
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

  console.log("Localstorage successfully updated!", modelsRawData);
}
