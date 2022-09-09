/** @format */
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  arrayUnion,
  doc,
  updateDoc,
  deleteDoc,
  addDoc,
} from "firebase/firestore";
import * as React from "react";
import styled from "styled-components";
import { v4 as uuid } from "uuid";
import List from "./components/List";
import { db, timestamp } from "./firebase";
import { Store } from "./util/store";
import type { Card, List as ListType } from "../types/Todo";
import InputContainer from "./components/List/InputContainer";



const Wrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 0 0.5rem;
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 5rem);
  overflow-y: auto;
`;

function App() {
  const [lists, setLists] = React.useState([]);

  //! DB METHODS
  const addCardToList = async (title: Card["title"], listId: ListType["id"]) => {
    if (!title) {
      return;
    }
    const newCardId = uuid();
    const newCard = {
      id: newCardId,
      title,
    };
    const listRef = doc(db, "lists", listId);

    await updateDoc(listRef, {
      cards: arrayUnion(newCard),
    });
  };

  const removeCardFromList = async (
    index: number,
    listId: ListType["id"],
    cardId: Card["id"]
  ) => {
    const listRef = doc(db, "lists", listId);

    lists.forEach(async (list) => {
      if (list.id === listId) {
        list.cards.splice(index, 1);
        await updateDoc(listRef, {
          cards: list.cards.filter((card) => card.id !== cardId),
        });
      }
      return list;
    });
  };

  const updateCardTitle = (
    title: Card["title"],
    index: number,
    listId: ListType["id"],
    cardId: Card["id"]
  ) => {
    const listRef = doc(db, "lists", listId);

    lists.forEach(async (list) => {
      if (list.id === listId) {
        list.cards[index].title = title;
        await updateDoc(listRef, {
          cards: list.cards.map((card) => {
            if (card.id === cardId) {
              card.title = title;
              return card;
            }
            return card;
          }),
        });
      }
      return list;
    });
  };

  const addList = async (title: ListType["title"]) => {
    if (!title) {
      return;
    }
    await addDoc(collection(db, "lists"), {
      title,
      cards: [],
      timestamp,
    });
  };

  const updateListTitle = (title: ListType["title"], listId: ListType["id"]) => {
    const listRef = doc(db, "lists", listId);

    lists.forEach(async (list) => {
      if (list.id === listId) {
        list.title = title;
        await updateDoc(listRef, {
          title: title,
        });
      }
      return list;
    });
  };

  const deleteList = async (listId: ListType["id"]) => {
    await deleteDoc(doc(db, "lists", listId));
  };

  React.useEffect(() => {
    const q = query(collection(db, "lists"), orderBy("timestamp", "asc"));
    onSnapshot(q, (snapShot) => {
      setLists(
        snapShot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        })
      );
    });
  }, []);
  // console.log(lists);

  return (
    <Wrapper>
      <h3>Todo App</h3>
      <Store.Provider
        value={{
          addCardToList,
          addList,
          deleteList,
          removeCardFromList,
          updateCardTitle,
          updateListTitle,
        }}
      >
        <div style={{ display: "flex" }}>
          {lists?.map((list, index) => {
            return <List list={list} key={list.id} index={index} />;
          })}
          <InputContainer type="List" />
        </div>
      </Store.Provider>
    </Wrapper>
  );
}
// items={"hello I'm mo yo hey hoe".split(' ').map((todo, i) => ({ completed: false, id: i, text: todo }))}
export default App;
