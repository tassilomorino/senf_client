import { setDoc, doc } from "firebase/firestore";

export async function createUserFromProviderInDatabase(db, user) {
  try {
    if (user) {
      await setDoc(doc(db, "users", user.uid), {
        handle: user.displayName,
        createdAt: new Date().toISOString(),
        userId: user.uid,
        photoURL: user.photoURL ?? "",
        providerId: user.providerData[0].providerId ?? "",
      });
      await setDoc(doc(db, "users", user.uid, "Private", user.uid), {
        email: user.providerData[0].email ?? "",
        userId: user.uid,
      });
    }
  } catch (error) {
    throw new Error(error, "error in createUserFromProviderInDatabase");
  }
}
