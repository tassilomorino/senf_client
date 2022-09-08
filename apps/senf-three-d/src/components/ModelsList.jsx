/** @format */

import React, { useState, useEffect, useRef } from "react";
import { ThreeDToolSwipeList, isMobileCustom, Input } from "senf-atomic-design-system";
import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";
import styled from "styled-components";
import { useFormik } from "formik";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import imageCompression from "browser-image-compression";
import { async } from "@firebase/util";
import { ModelsData } from "../data/Models";
import { createModel } from "../util/setModels";
import { db } from "../firebase";
import { Grounds } from "../data/Grounds";




const tags = [
  { objectType: "Alle" },
  { objectType: "Infrastruktur" },
  { objectType: "Mobiliar" },
  { objectType: "Natur" },
  { objectType: "Gebäude" },
  { objectType: "Spielen" },
  { objectType: "Sport" },
];
const SearchWrapper = styled.div`
pointer-events: all;
`

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
  const isMobile = isMobileCustom();
  // const { t } = useTranslation()
  const [models, setModels] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");




  // const validationSchema = yup.object({
  //   title: yup
  //     .string()
  //     .required(t("enter_email"))
  //     .min(3, t("username_too_short"))
  //     .max(40, t("username_too_long")),
  //   brief: yup
  //     .string()
  //     .required(t("enter_email"))
  //     .min(3, t("username_too_short"))
  //     .max(500, t("username_too_long")),

  //   description_about: yup
  //     .string()
  //     .required(t("enter_email"))
  //     .min(10, t("username_too_short"))
  //     .max(5000, t("username_too_long")),

  //   description_procedure: yup
  //     .string()
  //     .required(t("enter_email"))
  //     .min(10, t("username_too_short"))
  //     .max(3000, t("username_too_long")),
  // });

  const formik = useFormik({
    initialValues: {
      title: "",
      imageURL: null,
      modelURL: null
    },
    // validationSchema,
    validateOnChange: true,
    validateOnBlur: true,
  });



  const handleImageUpload = (event) => {
    formik.setFieldValue("imageURL", event.target.files[0]);
  }

  const handleModelUpload = (event) => {
    formik.setFieldValue("modelURL", event.target.files[0]);
  }

  const handleUploadImageToFirestore = async (docId) => {
    const options = {
      maxSizeMB: 0.03,
      maxWidthOrHeight: 700,
      useWebWorker: true,
    };
    // const img = new Blob(formik.values.imageURL)
    const img = new File([formik.values.imageURL], "img.png", {
      type: "image/jpeg",
      lastModified: Date.now()
    });

    const compressedFile = await imageCompression(img, options);
    const storage = getStorage();
    const storageRef = ref(storage, `threeD_models/${docId}/image/img.png`);
    await uploadBytes(storageRef, compressedFile).then((snapshot) => {
      console.log("Uploaded a file!");
    });
  }

  const handleSubmit = async (event) => {


    // First create document -> add the title -> upload image and add the url to the document and then upload the model and add to the document

    console.log(formik?.values.imageURL)
    console.log(formik?.values.modelURL)

    // create new firestore document with an id

    const data = {
      title: formik?.values.title
    }


    await addDoc(collection(db, "threeD_models"), data).then((docId) => {

      console.log("added title to", docId.id)
      handleUploadImageToFirestore(docId.id)

    })






    // try {
    //   const compressedFile = await imageCompression(imageFile, options);

    //   const storage = getStorage();
    //   const storageRef = ref(
    //     storage,
    //     `threeD_models/images/${compressedFile.name}`
    //   );
    //   const ThreeDmodelsRef = doc(
    //     db,
    //     `ThreeDmodels/${"id"}`
    //   );

    //   await uploadBytes(storageRef, compressedFile).then((snapshot) => {
    //     console.log("Uploaded a file!");
    //   });
    //   const logoURL = await getDownloadURL(storageRef);
    //   setUploadedImage(logoURL);
    //   await updateDoc(ThreeDmodelsRef, { logoURL });
    //   setUploadingImage(false);
    // } catch (error) {
    //   console.log(error);
    // }
  }







  const handlePlaceModel = (
    // event, cardType,
    modelData) => {
    setLoadingModel(true);
    setSwipedUp(false);
    if (isMobile) {
      setSwipedUp(false)
    }
    console.log(modelData)

    setLoadingModel(false);
    createModel(
      `${Math.floor(Math.random() * 100000000)}`,
      modelData.modelPath,
      modelData.format,
      setOpenContextPanel,
      setSwipedUp,
      modelData.labelText

    );


  }




  return (
    <Wrapper>
      <ThreeDToolSwipeList data={models} handlePlaceModel={handlePlaceModel} swipedUp={swipedUp} setSwipedUp={setSwipedUp} formik={formik} grounds={Grounds} setMode={setMode}
        handleImageUpload={handleImageUpload}
        uploadedImage={formik?.values.imageURL && URL.createObjectURL(formik?.values.imageURL)}
        uploadedModel={formik?.values.modelURL && URL.createObjectURL(formik?.values.modelURL)}
        handleModelUpload={handleModelUpload}
        handleSubmit={handleSubmit} />
    </Wrapper>
  );
};
export default ModelsList;
