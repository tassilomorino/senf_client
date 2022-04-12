/** @format */

import React, { useState, useEffect } from "react";

import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

//firebase
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import { getDocs, getDoc } from "firebase/firestore";

import { SubmitButton } from "../../../atoms/CustomButtons/SubmitButton";
import {
  Title,
  SubTitle,
  ButtonsWrapper,
  ComponentInnerWrapper,
  ComponentWrapper,
} from "../styles/sharedStyles";
import Searchbar from "../../../atoms/Searchbar/Searchbar";
import {
  StyledH2,
  StyledH3,
  StyledH4,
  StyledText,
} from "../../../../styles/GlobalStyle";
import Navigation from "../Components/Navigation";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SearchbarWrapper = styled.div`
  width: 100%;
`;

const User = styled.div`
  width: max-content;
  height: 50px;

  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;

  box-sizing: border-box;

  padding: 0px 20px;

  box-shadow: 0px 12px 18px -8px rgba(186, 160, 79, 0.2),
    0px -4px 10px 4px rgba(255, 255, 255, 0.2);
  background-color: #fcfbf8;
  overflow: visible;
  border-radius: 18px;
  border: 2px solid #ffffff;
  margin-right: 10px;
  transition: 0.4s;
`;

const RemovableUser = styled(User)`
  &:hover {
    background-color: #ff3c3e;
    border: 2px solid #ca3336;
  }
`;

const AddableUser = styled(User)`
  &:hover {
    background-color: #009a8e;
    border: 2px solid #00857b;
  }
`;

const EditIcon = styled.div`
  font-size: 20px;
  margin-left: 20px;
`;

const Divider = styled.div`
  width: 90%;
  height: 1px;
  background-color: rgba(186, 160, 79, 0.2);
  overflow: visible;
  margin: 10px 24px 10px 24px;
`;

const CreateOrganizationPage6 = ({
  onClickNext,
  onClickPrev,
  set,
  pagesData,
  index,
}) => {
  const { t } = useTranslation();
  const [nextClicked, setNextClicked] = useState(false);

  const user = useSelector((state) => state.user);

  const [searchTerm, setSearchTerm] = useState("");
  const [authorizedUserIds, setAuthorizedUserIds] = useState(null);
  const [authorizedUserNames, setAuthorizedUserNames] = useState(null);
  const [userList, setUsersList] = useState(null);

  const search = async (e) => {
    const db = firebase.firestore();
    if (e.key === "Enter") {
      const users = [];
      // define queries

      if (searchTerm.includes("@")) {
        const postRef = db.collectionGroup("Private");

        const usersRef = await postRef
          .orderBy("email")
          .startAt(searchTerm)
          .endAt(searchTerm + "~")
          .get();

        // get queries
        // usersRef.docs.forEach((doc) => {
        //   users.push(doc.data());

        //   if (usersRef.size === users.length) {
        //     setUsersList(users);
        //   }
        // });

        for (const doc of usersRef.docs) {
          const parentDoc = await getDoc(doc.ref.parent.parent);

          users.push(parentDoc.data());

          if (usersRef.size === users.length) {
            setUsersList(users);
          }
        }
      } else {
        const postRef = db.collection("users");

        const usersRef = await postRef
          .orderBy("handle")
          .startAt(searchTerm)
          .endAt(searchTerm + "~")
          .get();

        // get queries
        usersRef.docs.forEach((doc) => {
          users.push(doc.data());

          if (usersRef.size === users.length) {
            setUsersList(users);
          }
        });
      }
    }
  };

  async function fetchData() {
    const db = firebase.firestore();
    if (
      typeof Storage !== "undefined" &&
      localStorage.getItem("createOrganizationId")
    ) {
      const ref = await db
        .collection("organizations")
        .doc(localStorage.getItem("createOrganizationId"))
        .get();

      if (!ref.exists) {
        console.log("No such document!");
      } else {
        const data = ref.data();

        if (data.userIds) {
          const refUsers = await db
            .collection("users")
            .where("userId", "in", data.userIds)
            .get();

          const authorizedUserNamesRaw = [];

          refUsers.docs.forEach((doc) =>
            authorizedUserNamesRaw.push({ ...doc.data() })
          );
          setAuthorizedUserNames(authorizedUserNamesRaw);
          setAuthorizedUserIds(data.userIds);
        }
      }
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handleRemove = async (userId) => {
    if (userId === user.userId) {
      alert("You can not remove yourself from the list of moderators");
      return;
    }
    const db = firebase.firestore();

    if (
      typeof Storage !== "undefined" &&
      localStorage.getItem("createOrganizationId")
    ) {
      const update = {
        userIds: firebase.firestore.FieldValue.arrayRemove(userId),
      };
      const ref = await db
        .collection("organizations")
        .doc(localStorage.getItem("createOrganizationId"));
      return ref.update(update).then(() => {
        fetchData();
      });
    }
  };

  const handleAdd = async (userId) => {
    const db = firebase.firestore();

    if (
      typeof Storage !== "undefined" &&
      localStorage.getItem("createOrganizationId")
    ) {
      const update = {
        userIds: firebase.firestore.FieldValue.arrayUnion(userId),
      };
      const ref = await db
        .collection("organizations")
        .doc(localStorage.getItem("createOrganizationId"));
      return ref.update(update).then(() => {
        fetchData();
      });
    }
  };

  const handleNext = async () => {
    setNextClicked(true);

    const db = firebase.firestore();

    //Remove organizationid from UserArray
    // userRef.update({
    //   organizationId: firebase.firestore.FieldValue.arrayRemove(doc.id),
    // });

    if (
      typeof Storage !== "undefined" &&
      localStorage.getItem("createOrganizationId")
    ) {
      //UPDATING AN EXISTING PROJECTROOM
      // const updateProject = {
      //   userIds: firebase.firestore.FieldValue.arrayUnion(authorizedUserIds),
      // };
      // const ref = await db
      //   .collection("organizations")
      //   .doc(localStorage.getItem("createOrganizationId"));
      // return ref.update(updateProject).then(() => {
      //   onClickNext();
      // });
      setTimeout(() => {
        if (localStorage.getItem("createOrganizationPostEdit") === "true") {
          set(pagesData.length - 1);
        } else {
          onClickNext();
        }
      }, 200);
    }
  };

  return (
    <React.Fragment>
      <ComponentWrapper>
        <ComponentInnerWrapper>
          <StyledH3 textAlign="center" margin="20px">
            {pagesData[index].subTitle}
          </StyledH3>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            {authorizedUserNames &&
              authorizedUserNames.map(({ handle, userId }) => (
                <RemovableUser
                  onClick={() => handleRemove(userId)}
                  key={userId}
                >
                  <StyledH4>{handle}</StyledH4>
                  {userId !== user.userId && <EditIcon> -</EditIcon>}
                </RemovableUser>
              ))}
          </div>
          <br /> <br />
          <Divider />
          <StyledH3 textAlign="center" margin="20px">
            {pagesData[index].subTitle2}
          </StyledH3>
          <SearchbarWrapper>
            <Searchbar
              placeholder="Durchsuche Nutzernamen oder Email-Adressen..."
              setSearchTerm={setSearchTerm}
              searchTerm={searchTerm}
              handleSearch={search}
              backgroundColor="#f8f8f8"
            />
          </SearchbarWrapper>
          <div style={{ display: "flex", justifyContent: "center" }}>
            {userList &&
              userList.map(({ handle, userId }) => (
                <React.Fragment key={userId}>
                  {!authorizedUserIds.includes(userId) && (
                    <AddableUser onClick={() => handleAdd(userId)}>
                      <StyledH4>{handle}</StyledH4>
                      <EditIcon> +</EditIcon>
                    </AddableUser>
                  )}
                </React.Fragment>
              ))}
          </div>
          <br /> <br />
          {/* <StyledH2 textAlign="center" fontWeight="900">
            Lade deine Teammitglieder:innen zu Senf ein
          </StyledH2>
          <StyledH3 textAlign="center" margin="20px">
            https://dummy-einladungslink.app
          </StyledH3> */}
        </ComponentInnerWrapper>
      </ComponentWrapper>

      <Navigation
        nextLabel={t("next")}
        prevLabel={t("back")}
        handleNext={handleNext}
        handlePrev={onClickPrev}
        set={set}
        index={index}
        pagesData={pagesData}
        // disabled={!data || nextClicked}
        // loading={nextClicked}
      />
    </React.Fragment>
  );
};

export default CreateOrganizationPage6;
