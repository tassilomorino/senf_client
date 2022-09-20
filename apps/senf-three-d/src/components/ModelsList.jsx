/** @format */

import React, { useState, useEffect, useRef } from "react";
import { ThreeDToolSwipeList, isMobileCustom, Input, useModals } from "senf-atomic-design-system";
import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";
import styled from "styled-components";
import { useFormik } from "formik";
import { addDoc, collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import imageCompression from "browser-image-compression";
import { async } from "@firebase/util";
import * as yup from "yup"
import { useTranslation } from "react-i18next";
import { AuthModal } from "senf-shared"
import { createModel } from "../util/setModels";
import { db } from "../firebase";
import { Grounds } from "../data/Grounds";





const Wrapper = styled.div`
width: 100vw;
height:100vh;
position: fixed;
top:0;
left:0;
z-index: 2;
pointer-events:none;
`


const ModelsList = ({ setLoadingModel, swipedUp, setSwipedUp, setOpenContextPanel, setMode }) => {
  const [models, setModels] = useState([]);
  const { t } = useTranslation()
  const { openModal } = useModals();

  const validationSchema = yup.object({
    title: yup
      .string()
      .required(t("enter_title")),
    imgURL: yup
      .string()
      .required(t("add_img")),
    modelURL: yup
      .string()
      .required(t("add_model")),
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      imgURL: null,
      modelURL: null
    },
    validationSchema,
    validateOnMount: true,
    validateOnChange: true,
    validateOnBlur: true,
  });


  const handleImageUpload = (event, localFormik = formik) => {
    localFormik.setFieldValue("imgURL", event.target.files[0]);
  }

  const handleModelUpload = (event, localFormik = formik) => {
    localFormik.setFieldValue("modelURL", event.target.files[0]);
  }

  const handleUploadImageToFirestore = async (docId) => {
    const options = {
      maxSizeMB: 0.03,
      maxWidthOrHeight: 700,
      useWebWorker: true,
    };
    // const img = new Blob(formik.values.imgURL)
    const imageFile = new File([formik.values.imgURL], formik.values.imgURL.name, {
      type: `image/${formik?.values.imgURL.name.split('.')[1]}`,
      lastModified: Date.now()
    });

    const compressedFile = await imageCompression(imageFile, options);
    const storage = getStorage();
    const imgStorageRef = ref(
      storage, `threeD_models/${docId}/image/${formik.values.imgURL.name}`
    );
    const docRef = doc(
      db,
      `threeD_models/${docId}`
    );
    await uploadBytes(imgStorageRef, compressedFile).then((snapshot) => {
      console.log("Uploaded a file!");
    });
    const imgURL = await getDownloadURL(imgStorageRef);
    await updateDoc(docRef, { imgURL });
  }

  const handleModelUploadToFirestiore = async (docId) => {
    const storage = getStorage();
    const modelStorageRef = ref(
      storage, `threeD_models/${docId}/model/${formik.values.modelURL.name}`
    );
    const docRef = doc(
      db,
      `threeD_models/${docId}`
    );
    await uploadBytes(modelStorageRef, formik.values.modelURL).then((snapshot) => {
      console.log("Uploaded a file!");
    });
    const modelURL = await getDownloadURL(modelStorageRef);
    await updateDoc(docRef, { modelURL });
  }




  const handleSubmit = async (event, formik) => {
    const data = {
      title: formik?.values.title,
      format: formik?.values.modelURL.name.split('.')[1]
    }
    await addDoc(collection(db, "threeD_models"), data).then((docId) => {
      handleUploadImageToFirestore(docId.id)
      handleModelUploadToFirestiore(docId.id)
    })
  }

  const handlePlaceModel = (
    // event, cardType,
    modelData) => {
    console.log("Creating model in handlePlaceModel",);

    createModel(
      `${Math.floor(Math.random() * 100000000)}`,
      modelData.modelURL,
      modelData.format,
      setOpenContextPanel,
      setSwipedUp,
      modelData.labelText
    );
  }
  const handleOpenMyAccount = () => {
    openModal(<AuthModal authAddDetails={true} />)
  }

  // const handleSearchQuery = async () => {
  //   const searchtext = "Ba"
  //   const modelsRef = collection(db, "threeD_models");
  //   // const q = query(
  //   //   modelsRef,
  //   const q = query(modelsRef, where('title', ">=", searchtext))
  //   // where('title', "<", searchtext.substring(0, searchtext.length - 1))
  //   // + String.fromCharCode(query.codeUnitAt(searchtext.length - 1) + 1))
  //   const modelsSnapshot = await getDocs(q);
  //   const models = [];

  //   modelsSnapshot.forEach((doc) => {
  //     models.push({
  //       ...doc.data(),
  //       userId: doc.id,
  //     });
  //   });

  // }

  return (
    <Wrapper>
      <ThreeDToolSwipeList data={models} handlePlaceModel={handlePlaceModel} swipedUp={swipedUp} setSwipedUp={setSwipedUp} grounds={Grounds} setMode={setMode}
        handleOpenMyAccount={handleOpenMyAccount}
        handleImageUpload={handleImageUpload}
        uploadedImage={formik?.values.imgURL}
        uploadedModel={formik?.values.modelURL}
        handleModelUpload={handleModelUpload}
        handleSubmit={handleSubmit}
        formik={formik}
        validationSchema={validationSchema}
      />
    </Wrapper>
  );
};
export default ModelsList;
