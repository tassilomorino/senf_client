import * as React from 'react';
import useOnClickOutside from "../../../Hooks/useOnClickOutside"
import { List } from '../../../types/List';
import { EditableTitleContainer, InputTitle } from "./Styled.Title"
import { Store } from '../../../util/store';

interface TitleProps {
    title: List['title'];
    listId: List['id'];
}

const Title: React.FC<TitleProps> = ({ title, listId }) => {
    const [open, setOpen] = React.useState(false);
    const [openOptions, setOpenOptions] = React.useState(false);
    const [newTitle, setNewTitle] = React.useState(title);
    const { updateListTitle, deleteList } = React.useContext(Store);
    
    const ele = React.useRef(null)
    useOnClickOutside(ele, () => {
        setOpenOptions(!openOptions);
    }, 'mousedown');

    const handleOnBlur = () => {
        updateListTitle(newTitle, listId);
        setOpen(!open);
    };


    return (<>
        {open ? (
            <div>
                <InputTitle
                    type="text"
                    className="input-title"
                    value={newTitle}
                    onChange={(e) => {
                        setNewTitle(e.target.value);
                    }}
                    onBlur={handleOnBlur}
                    onKeyPress={(e) => {
                        if (e.key === "Enter") {
                            handleOnBlur();
                        }
                        return null;
                    }}
                    autoFocus
                />
            </div>
        ) : (
            <EditableTitleContainer>
                <h2 onClick={() => setOpen(!open)} className="editable-title">
                    {title}
                </h2>
                <button
                    onClick={() => setOpenOptions(!openOptions)}
                >
                    <svg focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path></svg>
                </button>

                {openOptions && (
                    <ul className="menu-card" ref={ele}>
                        <li
                            onClick={() => {
                                setOpenOptions(!openOptions);
                                deleteList(listId);
                            }}
                        >
                            Delete list
                        </li>
                        <li
                            onClick={() => {
                                setOpenOptions(!openOptions);
                                setOpen(!open);
                            }}
                        >
                            Edit card title
                        </li>
                    </ul>
                )}
            </EditableTitleContainer>
        )}
    </>);
}

export default Title;