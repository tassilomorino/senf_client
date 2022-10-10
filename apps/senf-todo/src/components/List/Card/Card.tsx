import * as React from "react";
import TextareaAutosize from "react-textarea-autosize";
import { Store } from "../../../util/store";
import { CardContainer, CardTitleContainer, Content } from "./Styled.Card";

interface CardProps {
    card: {
        title: string;
        id: string;
    };
    index: number;
    listId: string;
}

const Card: React.FC<CardProps> = ({ card, index, listId }) => {
    const [open, setOpen] = React.useState(false);
    const [newTitle, setNewTitle] = React.useState(card.title);
    const { removeCardFromList, updateCardTitle } = React.useContext(Store);

    const handleOnBlur = (cardId: CardProps['card']['id']) => {
        updateCardTitle(newTitle, index, listId, cardId);
        setOpen(!open);
    };

    return (
        <CardContainer>
            <Content>
                {open ? (
                    <TextareaAutosize
                        type="text"
                        className="input-card-title"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        onBlur={handleOnBlur}
                        onKeyPress={(e) => {
                            if (e.key === "Enter") {
                                handleOnBlur(card.id);
                            }
                            return null;
                        }}
                        autoFocus
                    />) : (
                    <CardTitleContainer onClick={() => setOpen(!open)}>
                        <p>{card.title}</p>
                        <button onClick={() => {
                            removeCardFromList(index, listId, card.id);
                        }}>
                            <svg focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9zm7.5-5l-1-1h-5l-1 1H5v2h14V4z"></path>
                            </svg>
                        </button>
                    </CardTitleContainer>
                )}
            </Content>
        </CardContainer>
    );
};

export default Card;
