/** @format */

import React, { useState, useEffect, useRef } from "react";
import { ThreeDToolSwipeList, isMobileCustom, Input } from "senf-atomic-design-system";
import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";
import styled from "styled-components";
import { useFormik } from "formik";
import { doc, updateDoc } from "firebase/firestore";
import imageCompression from "browser-image-compression";
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, Hits, connectHits, connectHighlight } from 'react-instantsearch-dom';
import { ModelsData } from "../data/Models";
import { createModel } from "../util/setModels";
import { db } from "../firebase";
import { Grounds } from "../data/Grounds";
import Search from "./Search";


const searchClient = algoliasearch("AERQKCMI5M", 'ae11cb36d2946300bd8860b2a23bc1ab');


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
const InputNew = styled.input`
color:green;
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
    },
    // validationSchema,
    validateOnChange: true,
    validateOnBlur: true,
  });

  const [uploadingImage, setUploadingImage] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [uploadImageHover, setUploadImageHover] = useState(false);

  async function handleImageUpload(event) {
    const imageFile = event.target.files[0];
    const options = {
      maxSizeMB: 0.03,
      maxWidthOrHeight: 700,
      useWebWorker: true,
    };
    try {
      setUploadingImage(true);
      const compressedFile = await imageCompression(imageFile, options);

      const storage = getStorage();
      const storageRef = ref(
        storage,
        `ThreeDmodels/images/${compressedFile.name}`
      );
      const ThreeDmodelsRef = doc(
        db,
        `ThreeDmodels/${"id"}`
      );

      await uploadBytes(storageRef, compressedFile).then((snapshot) => {
        console.log("Uploaded a file!");
      });
      const logoURL = await getDownloadURL(storageRef);
      setUploadedImage(logoURL);
      await updateDoc(ThreeDmodelsRef, { logoURL });
      setUploadingImage(false);
    } catch (error) {
      console.log(error);
    }
  }



  const [objectTypeSelected, setObjectTypeSelected] = useState([
    "Infrastruktur",
    "Mobiliar",
    "Natur",
    "Gebäude",
    "Spielen",
    "Sport",
  ]);

  useEffect(() => {
    if (ModelsData) {
      const NewModels = ModelsData.filter(({ objectType }) =>
        objectTypeSelected.includes(objectType)
      );

      NewModels.sort((a, b) => parseFloat(a.index) - parseFloat(b.index));

      if (NewModels) {
        setModels(NewModels);
      }
    }
  }, [objectTypeSelected]);

  const handleobjectTypeelector = (objectType) => {
    const index = objectTypeSelected.indexOf(objectType);
    if (objectType === "Alle") {
      setObjectTypeSelected([
        "Infrastruktur",
        "Mobiliar",
        "Natur",
        "Gebäude",
        "Spielen",
        "Sport",
      ]);
    } else if (objectTypeSelected.length === 6) {
      setObjectTypeSelected([objectType]);
    } else if (index === -1) {
      setObjectTypeSelected(objectTypeSelected.concat(objectType));
    } else {
      const newobjectType = objectTypeSelected.filter(
        (item) => item !== objectType
      );

      if (newobjectType.length === 0) {
        setObjectTypeSelected([
          "Infrastruktur",
          "Mobiliar",
          "Natur",
          "Gebäude",
          "Spielen",
          "Sport",
        ]);
      } else {
        setObjectTypeSelected(...[newobjectType]);
      }
    }
  };

  const handleSearch = (dbDataKeys = [
    "title",
    "objectType",
  ]) => {

    const sanitizedUserInput = searchTerm.toString().toLowerCase();

    if (searchTerm === "") {
      return;
    }
    const newModels = models.filter((object) => {
      return dbDataKeys.some((dbDataKey) => {
        if (
          object[dbDataKey] &&
          object[dbDataKey].toString().toLowerCase().includes(sanitizedUserInput)
        ) {
          return true;
        }
      });
    });
    setModels(newModels)
  };

  useEffect(() => {
    handleSearch()
  }, [searchTerm])


  const handlePlaceModel = (
    // event, cardType,
    modelData) => {
    setLoadingModel(true);
    setSwipedUp(false);
    if (isMobile) {
      setSwipedUp(false)
    }
    const storage = getStorage();
    const storageRef = ref(
      storage,
      `3dModels/${modelData.modelPath}`
    );
    function onResolve(foundURL) {
      setLoadingModel(false);
      createModel(
        `${Math.floor(Math.random() * 1000)}`,
        foundURL,
        modelData.format,
        setOpenContextPanel,
        setSwipedUp

      );
    }
    getDownloadURL(storageRef).then(onResolve, (error) => { setLoadingModel(false); console.log(error) });

  }

  const CustomHighlight = connectHighlight(({ highlight, attribute, hit }) => {
    const parsedHit = highlight({
      highlightProperty: '_highlightResult',
      attribute,
      hit
    });

    return (
      <div>
        <h3>{hit.title}</h3>
        {/* <img src={hit.avatar} alt={hit.username} />
        {parsedHit.map(
          part => part.isHighlighted ? <mark>{part.value}</mark> : part.value
        )} */}
      </div>
    );
  });

  const Hit = ({ hit }) => (
    <p>
      <CustomHighlight attribute="bio" hit={hit} />
    </p>
  );

  const CustomHits = connectHits(Hit);

  const changeSearchText = (event, refine) => {
    refine(event.currentTarget.value); // this line is ok
    // if i need the text or i need to set an attribute to show or no the result everything is broken
    // setSearchText(event.currentTarget.value); // With this line nothing is working any more
  };

  const inputRef = useRef('');

  const SearchBox = ({ currentRefinement, refine }) => {
    console.log('render', currentRefinement);
    return (
      <form noValidate action="" role="search">
        <input
          type="search"
          id="livesearchInput"
          value={currentRefinement} // if i put something else here like searchText variable nothing is working as expected
          onChange={(event) => changeSearchText(event, refine)}
          placeholder={'Search'}
          ref={inputRef} // ref seems ok like this
        />
      </form>
    );
  };

  return (
    <Wrapper>
      {/* <SearchWrapper>
        <InstantSearch searchClient={searchClient} indexName="threeD_models">
          <header className="header">
            <Search />
          </header>

          <div className="container">
            <div className="search-panel">
              <div className="search-panel__filters"></div>

              <div className="search-panel__results"></div>
            </div>
          </div>
        </InstantSearch>
      </SearchWrapper> */}
      <ThreeDToolSwipeList data={models} handlePlaceModel={handlePlaceModel} setSearchTerm={setSearchTerm} searchTerm={searchTerm} swipedUp={swipedUp} setSwipedUp={setSwipedUp} formik={formik} grounds={Grounds} setMode={setMode} /></Wrapper>
  );
};
export default ModelsList;
