import { updateDoc, doc } from "firebase/firestore";

export const useHandleSubmitEditDetails = (user, db) => {
  return async (formik) => {
    /*   if (
      user.isAdmin === false ||
      user.isSuperAdmin === false ||
      user.isModerator === false ||
      user.userId !== currentUser.userId
    ) {
      throw new Error("You are not authorized to edit this user");
    } */
    try {
      const { handle, description, postcode, age, sex } = formik.values;
      await updateDoc(doc(db, "users", user.userId), {
        handle: handle || user.handle,
        description: description || null,
        postcode: postcode || null,
        age: age || null,
        sex: sex || null,
      });
      return user;
    } catch (error) {
      throw new Error(error, "error in usehandlesubmitedit");
    }
  };
};
