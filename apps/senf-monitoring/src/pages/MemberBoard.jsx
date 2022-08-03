import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";


import { Typography, ImagePlaceholder, Box, Icon, Table, Button, ModalButton, Input, isMobileCustom } from "senf-atomic-design-system";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import AddMemberToList from "./AddMemberToList";
import { db } from "../firebase";



const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.beige.beige20};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: scroll;
`;

const MemberBoard = () => {
  const isMobile = isMobileCustom()

  const [members, setMembers] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const { t } = useTranslation();

  const getMembers = async () => {
    try {
      const membersRef = collection(db, "exampleUsers");
      const q = query(
        membersRef,
        // where("variable", ">", parameter),
        orderBy("createdAt", "desc")
      );
      const membersQuerySnapshot = await getDocs(q);
      const membersData = [];

      membersQuerySnapshot.forEach((doc) => {
        membersData.push({
          ...doc.data(),
          userId: doc.id,
        });
      });
      setMembers(membersData);
    } catch (error) {
      throw new Error(error, "Error in Memberlist");
    }
  };
  const handleDeleteMember = async (userId) => {
    try {
      const docRef = doc(db, `exampleUsers/${userId}`);
      await deleteDoc(docRef).then(() => {
        getMembers();
      });
    } catch (error) {
      throw new Error(error, "error in deleteScreamFunc");
    }
  };

  useEffect(() => {
    getMembers();
  }, []);

  useEffect(() => {
    setFilteredMembers(members.filter(e => Object.values(e).join(' ').toLowerCase().indexOf(searchTerm.toLowerCase()) > -1));
  }, [searchTerm, members]);
  return (
    <React.Fragment>
      <Wrapper>
        <Box gap="20px" flexDirection="column" margin="30px">
          <Typography variant="h2">MemberBoard</Typography>
          <Box justifyContent="between" gap="16px">
            <Box>
              <ModalButton text="add" options={{ swipe: true }}>
                <ModalButton text="add" options={{ swipe: true, height: 550, size: "lg" }}>
                  <AddMemberToList />
                </ModalButton>
              </ModalButton>
            </Box>
            <Box margin="0 0 0 auto">
              <ModalButton text="1">
                <ModalButton text="2" options={{ height: 800 }}>
                  <ModalButton text="3.1" options={{ swipe: true }}>
                    <p>vite hot updated: /@fs/Users /Leon/Sites/senf-monorepo/libraries/senf-atomic-design-system/src/components/mo lecules/modalStack/ModalWrap per.tsx</p>
                    <p>vite hot updated: /@fs/Users/Leon/Site s/senf-monorep o/libraries/senf-atomic-design-system/src/components/ molecules/modalStack/ModalWrapper.tsx</p>
                    <p>vite hot updated: /@fs/Users/Leon/Sites/senf-monorepo/libraries/senf-atom ic-design-system/src/components/m olecules/modalStack/ModalWrapper.tsx</p>
                    <p>vite hot updated: /@fs/Users /Leon/Sites/senf-monorepo/libraries/senf-atomic-design-system/src/components/mo lecules/modalStack/ModalWrap per.tsx</p>
                    <p>vite hot updated: /@fs/Users/Leon/Site s/senf-monorep o/libraries/senf-atomic-design-system/src/components/ molecules/modalStack/ModalWrapper.tsx</p>
                    <p>vite hot updated: /@fs/Users/Leon/Sites/senf-monorepo/libraries/senf-atom ic-design-system/src/components/m olecules/modalStack/ModalWrapper.tsx</p>
                    <p>vite hot updated: /@fs/Users/Leon/Sites/senf-monorepo/libraries/senf-atom ic-design-system/src/components/m olecules/modalStack/ModalWrapper.tsx</p>
                    <p>vite hot updated: /@fs/Users /Leon/Sites/senf-monorepo/libraries/senf-atomic-design-system/src/components/mo lecules/modalStack/ModalWrap per.tsx</p>
                    <p>vite hot updated: /@fs/Users/Leon/Site s/senf-monorep o/libraries/senf-atomic-design-system/src/components/ molecules/modalStack/ModalWrapper.tsx</p>
                    <p>vite hot updated: /@fs/Users/Leon/Sites/senf-monorepo/libraries/senf-atom ic-design-system/src/components/m olecules/modalStack/ModalWrapper.tsx</p>
                    <p>vite hot updated: /@fs/Users/Leon/Sites/senf-monorepo/libraries/senf-atom ic-design-system/src/components/m olecules/modalStack/ModalWrapper.tsx</p>
                    <p>vite hot updated: /@fs/Users /Leon/Sites/senf-monorepo/libraries/senf-atomic-design-system/src/components/mo lecules/modalStack/ModalWrap per.tsx</p>
                    <p>vite hot updated: /@fs/Users/Leon/Site s/senf-monorep o/libraries/senf-atomic-design-system/src/components/ molecules/modalStack/ModalWrapper.tsx</p>
                    <p>vite hot updated: /@fs/Users/Leon/Sites/senf-monorepo/libraries/senf-atom ic-design-system/src/components/m olecules/modalStack/ModalWrapper.tsx</p>
                    <p>last line</p>
                  </ModalButton>
                  <ModalButton text="3.2">
                    <span>3.2 title</span>
                  </ModalButton>
                </ModalButton>
              </ModalButton>
            </Box>
          </Box>
          <Box justifyContent="between" gap="16px">
            <Box>
              <Input type="search" setSearchTerm={setSearchTerm} />
            </Box>
          </Box>

          {filteredMembers && (
            <Table
              data={filteredMembers}
              checkbox="userId"
              bulkEdit={<Icon icon="Search" />}
              // this could be an alternative structure
              // template={(member) => ([{
              //     header: t("username"),
              //     value: <Box gap="16px">
              //       <ImagePlaceholder
              //         width="64px"
              //         height="64px"
              //         img="#"
              //       />
              //       <Box flexDirection="column" justifyContent="center" alignItems="flex-start">
              //         <Typography variant="h3">{member?.handle}</Typography>
              //         { member?.email && <Typography variant="bodySm">{member.email}</Typography> }
              //       </Box>
              //     </Box>
              //   },
              //   {
              //     header: t("division"),
              //     value: <Typography variant="bodySm">{member?.division}</Typography>
              //   },
              //   {
              //     header: t("role"),
              //     value: <Typography variant="bodySm">{member?.roles}</Typography>
              //   },
              //   {
              //     header: 'actions',
              //     value: <Button
              //       variant="white"
              //       text="Delete"
              //       onClick={() => handleDeleteMember(member?.userId)}
              //     />
              //   },
              // ])}
              columns={[
                t('username'),
                t('division'),
                t('roles'),
              ]}
            >
              {
                (row) => (
                  <>
                    <Box gap="16px">
                      {!isMobile &&
                        <ImagePlaceholder
                          width="64px"
                          height="64px"
                          img="#"
                        />
                      }
                      <Box flexDirection="column" justifyContent="center" alignItems="flex-start">
                        <Typography variant="h3">{row.handle}</Typography>
                        {row?.email && <Typography variant="bodySm">{row.email}</Typography>}
                      </Box>
                    </Box>
                    <Typography variant="bodySm">{row.division}</Typography>
                    <Typography variant="bodySm">{row.role}</Typography>
                    <Button
                      variant="white"
                      text="Delete"
                      onClick={() => handleDeleteMember(row.userId)}
                    />
                  </>
                )
              }
            </Table>
          )}
        </Box>
      </Wrapper>
    </React.Fragment>
  );
};

export default MemberBoard;
