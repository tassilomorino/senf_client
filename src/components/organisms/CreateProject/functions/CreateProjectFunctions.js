/** @format */

export const startedCreatingProject =
  typeof Storage !== "undefined" && localStorage.getItem("createProjectData");

export const retrievedData = JSON.parse(
  localStorage.getItem("createProjectData")
);
