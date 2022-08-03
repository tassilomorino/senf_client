import React, { useState } from "react";
import { updateDoc, doc } from "firebase/firestore";

export const useHandleSubmitEditDetails = (userIdInFirebase, user, db) => {
  // try bringingin userIdInFirebase here ?
  // const userIdInFirebase = getAuth().currentUser?.uid;

  const [updatedUser, setUpdatedUser] = useState();
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmitEditDetails = async (data) => {
    setIsLoading(true);
    setError(undefined);
    setUpdatedUser(undefined);

    if (
      userIdInFirebase !== user.userId ||
      user.isAdmin === false ||
      user.isSuperAdmin === false ||
      user.isModerator === false
    ) {
      setError("You are not authorized to edit this user");
      setIsLoading(false);
      return;
    }
    try {
      await updateDoc(doc(db, "users", user.userId), {
        handle: data.handle ? data.handle : user.handle,
        description: data.description ? data.description : null,
        zipcode: data.zipcode ? data.zipcode : null,
        age: data.age ? data.age : null,
        sex: data.sex ? data.sex : null,
      });
      setUpdatedUser(data);
    } catch (error) {
      setError(error);
      console.log(error, "error in usehandlesubmitedit");
    } finally {
      setIsLoading(false);
    }
  };
  return [handleSubmitEditDetails, updatedUser, isLoading, error];
};
