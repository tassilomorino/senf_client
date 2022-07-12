/** @format */

import React, { useState, useEffect } from "react";

import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

//firebase

import { db } from "../../../../firebase";
import {
  getDocs,
  getDoc,
  collectionGroup,
  query,
  orderBy,
  startAt,
  endAt,
  collection,
  doc,
  where,
  arrayRemove,
  arrayUnion,
  updateDoc,
} from "firebase/firestore";

import {
  Title,
  SubTitle,
  ButtonsWrapper,
  ComponentInnerWrapper,
  ComponentWrapper,
} from "../styles/sharedStyles";
import {
  StyledH2,
  StyledH3,
  StyledH4,
  StyledText,
} from "../../../../styles/GlobalStyle";
import Navigation from "../Components/Navigation";
import { Box, Input, Button } from "senf-atomic-design-system";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
    const users = [];
    // define queries

    if (searchTerm.includes("@")) {
      const emailsRef = collectionGroup(db, "Private");
      const q = query(
        emailsRef,
        orderBy("email", "asc"),
        startAt(searchTerm),
        endAt(searchTerm + "~")
      );
      const emailQuerySnapshot = await getDocs(q);
      for (const doc of emailQuerySnapshot.docs) {
        const parentDoc = await getDoc(doc.ref.parent.parent);
        users.push(parentDoc.data());
      }

      setUsersList(users);
    } else {
      const postRef = collection(db, "users");
      const q = query(
        postRef,
        orderBy("handle", "asc"),
        startAt(searchTerm),
        endAt(searchTerm + "~")
      );
      const usersQuerySnapshot = await getDocs(q);
      usersQuerySnapshot.forEach((doc) => {
        users.push(doc.data());
      });
      setUsersList(users);
    }
  };

  async function fetchData() {
    if (
      typeof Storage !== "undefined" &&
      localStorage.getItem("createOrganizationId")
    ) {
      /* const ref = await db
        .collection("organizations")
        .doc(localStorage.getItem("createOrganizationId"))
        .get(); */
      const ref = doc(
        db,
        "organizations",
        localStorage.getItem("createOrganizationId")
      );
      const DocumentSnapshot = await getDoc(ref);

      if (!DocumentSnapshot.exists()) {
        console.log("No such document!");
      } else {
        const data = DocumentSnapshot.data();

        if (data.userIds) {
          /* const refUsers = await db
            .collection("users")
            .where("userId", "in", data.userIds)
            .get();
 */
          const refUsers = collection(db, "users");
          const q = query(refUsers, where("userId", "in", data.userIds));
          const usersQuerySnapshot = await getDocs(q);
          const authorizedUserNamesRaw = [];

          usersQuerySnapshot.forEach((doc) =>
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

    if (
      typeof Storage !== "undefined" &&
      localStorage.getItem("createOrganizationId")
    ) {
      const update = {
        userIds: arrayRemove(userId),
      };

      const ref = doc(
        db,
        "organizations",
        localStorage.getItem("createOrganizationId")
      );

      await updateDoc(ref, update).then(() => {
        fetchData();
      });
    }
  };

  const handleAdd = async (userId) => {
    if (
      typeof Storage !== "undefined" &&
      localStorage.getItem("createOrganizationId")
    ) {
      const update = {
        userIds: arrayUnion(userId),
      };

      const ref = doc(
        db,
        "organizations",
        localStorage.getItem("createOrganizationId")
      );

      await updateDoc(ref, update).then(() => {
        fetchData();
      });
    }
  };

  const handleNext = async () => {
    setNextClicked(true);

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
          <Box gap="10px" justifyContent="center">
            <Input
              type="search"
              placeholder="Durchsuche Nutzernamen oder Email-Adressen..."
              onChange={setSearchTerm}
              value={searchTerm}
              setSearchTerm={setSearchTerm}
            />

            <Button onClick={search}>Suchen</Button>
          </Box>
          <div style={{ display: "flex", justifyContent: "center" }}>
            {userList &&
              userList.map(
                (user) =>
                  user && (
                    <React.Fragment key={user.userId}>
                      {!authorizedUserIds.includes(user.userId) && (
                        <AddableUser onClick={() => handleAdd(user.userId)}>
                          <StyledH4>{user.handle ?? user.email}</StyledH4>
                          <EditIcon> +</EditIcon>
                        </AddableUser>
                      )}
                    </React.Fragment>
                  )
              )}
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
