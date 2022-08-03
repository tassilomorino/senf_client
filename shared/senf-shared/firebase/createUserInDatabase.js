import { setDoc, doc } from "firebase/firestore";

export async function createUserInDatabase(
  db,
  userCredential,
  formikRegisterStore
) {
  if (userCredential && userCredential.user) {
    try {
      await setDoc(doc(db, "users", userCredential.user.uid), {
        handle: formikRegisterStore.values.handle,
        createdAt: new Date().toISOString(),
        userId: userCredential.user.uid,
      });
      await setDoc(
        doc(
          db,
          "users",
          userCredential.user.uid,
          "Private",
          userCredential.user.uid
        ),
        {
          email: formikRegisterStore.values.email,
          userId: userCredential.user.uid,
        }
      );
    } catch (error) {
      throw new Error(error, "Error in createUserInDatabase");
    }
  }
}
