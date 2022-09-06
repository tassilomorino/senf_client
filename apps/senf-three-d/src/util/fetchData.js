import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

export async function fetchData() {
  const ref = doc(db, "threeD_ideas", "GS4MT3HDv3YcojewHeLx");
  const docSnapshot = await getDoc(ref);
  if (!docSnapshot.exists()) {
    console.log("No such document!");
    return null;
  }
  const data = docSnapshot.data();
  return data;
  // formik.setFieldValue("title", data.title);
}
