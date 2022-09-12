export async function fetchData() {
  const data = {
    drawnData: localStorage.getItem("drawnData"),
    modelsData: localStorage.getItem("modelsData"),
  };
  return data;
}
