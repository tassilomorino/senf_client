import { useContext, useState } from 'react';
import type { Dispatch, SetStateAction, FC } from "react"
import { Store } from '../../../util/store';

interface InputCardProps {
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    listId: string;
    type: string;
}

const InputCard: FC<InputCardProps> = ({ setIsOpen, listId, type }) => {
    const [title, setTitle] = useState("");
    const { addCardToList, addList } = useContext(Store);
    const handleOnChange = (e) => {
        setTitle(e.target.value);
    };
    const handleBtnConfirm = () => {
        if (type === "card") {
            addCardToList(title, listId);
        } else {
            addList(title);
        }
        setIsOpen(false);
        setTitle("");
    };
    return (
        <div className="input-card">
            <div className="input-card-container">
                <textarea
                    className="input-text"
                    placeholder={
                        type === "card"
                            ? "Enter a title of this card..."
                            : "Enter list title"
                    }
                    value={title}
                    onChange={handleOnChange}
                    autoFocus
                ></textarea>
            </div>
            <div className="confirm">
                <button className="button-confirm" onClick={handleBtnConfirm}>{type === "card" ? "Add Card" : "Add List"}</button>
                <button className="button-cancel" onClick={() => {
                    setTitle("");
                    setIsOpen(false);
                }}>
                    <svg
                        className="SvgIcon-root"
                        focusable="false"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                    >
                        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
                    </svg>
                </button>
            </div>
        </div>
    );
}

export default InputCard;