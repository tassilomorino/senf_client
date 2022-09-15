import React, { useState, useEffect } from "react";

import { SwipeModal, Auth as AuthComponent, ModalButton, useModals, Button, Box, Input, Loader } from "senf-atomic-design-system";

import {
  // useHandleSubmitEditDetails,
  // ifAllUserDetailsAreFilled,
  useAuthContext,
  AuthModal
} from "senf-shared";

import styled from "styled-components";
// import { getUserData } from "../redux/actions/userActions";

import { auth, db } from "../firebase";
import { getUserData } from "../redux/actions/userActions";
import { SET_AUTHENTICATED } from "../redux/types";



const Section = styled.section`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: ${({ theme }) => theme.colors.beige.beige20};
`;

const Test = () => {
  const [input, setInput] = useState("This is an example text, edit me!");
  return <Box padding="20px" flexDirection="column" gap="10px"><Input value={input} onChange={(e) => setInput(e.target.value)} />
    {input}
  </Box>
}


const AuthPage = ({ authAddDetails }) => {

  const { user, signOut } = useAuthContext();

  const { openModal, setModal, closeModal } = useModals();

  const Modal = <AuthModal
    success={() => closeModal()}
    error={(err) => console.error(err)}
    handleClose={() => closeModal()}
    authAddDetails={authAddDetails}
  />

  useEffect(() => {
    const timeoutID = setTimeout(() => {
      if (!user) setModal(Modal, {
        swipe: true,
        afterOpen: () => console.log('after open'),
        beforeClose: () => console.log('before close'),
        afterClose: () => console.log('after close'),
      })
    }, 800);
    return () => clearTimeout(timeoutID);
  }, [user])

  const [l, setL] = useState(false)

  return (
    <Section>
      <Box margin="20px">
        {!user && <Button onClick={() => setModal(Modal, { swipe: true })}>Login</Button>}
        {user && <Button onClick={signOut}>Logout</Button>}
      </Box>
      <Box padding="20px">
        <ModalButton text="open 1" loading={l} options={{
          // swipe: true,
          cancelText: "Cancel",
          submitText: "Submit",
          onSubmit: () => { console.log("submitted") },
          title: "Modal Title",
          description: "The description of the modal",
          swipe: true,
          beforeOpen: () => { setL(true); return new Promise((resolve, reject) => { console.log('before, and wait a sec'); setTimeout(() => { setL(false); resolve() }, 1000) }) },
          afterOpen: () => console.log('after open'),
          beforeClose: () => console.log('before close'),
          afterClose: () => console.log('after close'),

        }}>
          <>
            <Box paddingInline="20px">
              <div>
                <p>Ich könnte jetzt nicht zeichnen, nicht einen Strich, und bin nie ein größerer Maler gewesen als in diesen Augenblicken. Wenn das liebe Tal um mich dampft, und die hohe Sonne an der Oberfläche der undurchdringlichen Finsternis meines Waldes ruht, und nur einzelne Strahlen sich in das innere Heiligtum stehlen, ich dann im hohen Grase am fallenden Bache liege, und näher an der Erde tausend mannigfaltige Gräschen mir merkwürdig werden; wenn ich das Wimmeln der kleinen Welt zwischen Halmen, die unzähligen, unergründlichen Gestalten der Würmchen, der Mückchen näher an meinem Herzen fühle, und fühle die Gegenwart des Allmächtigen, der uns nach seinem Bilde schuf, das Wehen des Alliebenden, der uns in ewiger Wonne schwebend trägt und erhält; mein Freund! Ich könnte jetzt nicht zeichnen, nicht einen Strich, und bin nie ein größerer Maler gewesen als in diesen Augenblicken. Wenn das liebe Tal um mich dampft, und die hohe Sonne an der Oberfläche der undurchdringlichen Finsternis meines Waldes ruht, und nur einzelne Strahlen sich in das innere Heiligtum stehlen, ich dann im hohen Grase am fallenden Bache liege, und näher an der Erde tausend mannigfaltige Gräschen mir merkwürdig werden; wenn ich das Wimmeln der kleinen Welt zwischen Halmen, die unzähligen, unergründlichen Gestalten der Würmchen, der Mückchen näher an meinem Herzen fühle, und fühle die Gegenwart des Allmächtigen, der uns nach seinem Bilde schuf, das Wehen des Alliebenden, der uns in ewiger Wonne schwebend trägt und erhält; mein Freund! Ich könnte jetzt nicht zeichnen, nicht einen Strich, und bin nie ein größerer Maler gewesen als in diesen Augenblicken. Wenn das liebe Tal um mich dampft, und die hohe Sonne an der Oberfläche der undurchdringlichen Finsternis meines Waldes ruht, und nur einzelne Strahlen sich in das innere Heiligtum stehlen, ich dann im hohen Grase am fallenden Bache liege, und näher an der Erde tausend mannigfaltige Gräschen mir merkwürdig werden; wenn ich das Wimmeln der kleinen Welt zwischen Halmen, die unzähligen, unergründlichen Gestalten der Würmchen, der Mückchen näher an meinem Herzen fühle, und fühle die Gegenwart des Allmächtigen, der uns nach seinem Bilde schuf, das Wehen des Alliebenden, der uns in ewiger Wonne schwebend trägt und erhält; mein Freund! </p>
              </div>
            </Box>
            <Box padding="20px">
              <ModalButton text="open 2" options={{
                size: "sm",
                title: "This is another title, and this time a little longer", cancelText: "cancel", submitText: "Open Modal", onSubmit: () => openModal(<Test />)
              }}>
                <Box padding="20px" flexDirection="column" gap="10px">

                  <ModalButton text="open 4">
                    <Box padding="20px">
                      <Button onClick={() => openModal(Modal, { swipe: true })}>Login</Button>
                    </Box>
                  </ModalButton>
                </Box>
              </ModalButton>
            </Box>
          </>
        </ModalButton>
      </Box>

      {
        user &&
        <Box margin="20px">
          User: {JSON.stringify(user)}
        </Box>
      }
    </Section >
  );
};

export default AuthPage;
