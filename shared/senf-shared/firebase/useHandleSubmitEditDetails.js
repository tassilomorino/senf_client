import React, { useState } from "react";
import { updateDoc, doc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

export const useHandleSubmitEditDetails = (user, db) => {
  const [updatedUser, setUpdatedUser] = useState();
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmitEditDetails = async (formik) => {
    console.log(formik);
    setIsLoading(true);
    setError(undefined);
    setUpdatedUser(undefined);

    /*   if (
      user.isAdmin === false ||
      user.isSuperAdmin === false ||
      user.isModerator === false ||
      user.userId !== currentUser.userId
    ) {
      setError("You are not authorized to edit this user");
      setIsLoading(false);
      throw new Error("You are not authorized to edit this user");
    } */
    try {
      await updateDoc(doc(db, "users", user.userId), {
        handle: formik.values.handle ? formik.values.handle : user.handle,
        description: formik.values.description
          ? formik.values.description
          : null,
        zipcode: formik.values.zipcode ? formik.values.zipcode : null,
        age: formik.values.age ? formik.values.age : null,
        sex: formik.values.sex ? formik.values.sex : null,
      });
      setUpdatedUser(formik);
    } catch (error) {
      setError(error);
      console.log(error, "error in usehandlesubmitedit");
    } finally {
      setIsLoading(false);
    }
  };
  return [handleSubmitEditDetails, updatedUser, isLoading, error];
};
