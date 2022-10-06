import { FC, useState } from "react";
import InputCard from "../InputCard";
import { Wrapper } from "./Styled.InputContainer";

interface InputContainerProps {
  type: string;
  listId: string;
}

const InputContainer: FC<InputContainerProps> = ({ type, listId }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Wrapper>
      <div
        className={`Collapse-root ${
          isOpen ? "Collapse-entered" : "Collapse-hidden"
        }`}
        style={{
          minHeight: 0,
          height: isOpen ? "auto" : 0,
          transitionDuration: 300,
        }}
      >
        <div className="Collapse-wrapper">
          <div className="Collapse-wrapperInner">
            <InputCard setIsOpen={setIsOpen} listId={listId} type={type} />
          </div>
        </div>
      </div>
      <div
        className={`Collapse-root ${
          isOpen ? "Collapse-hidden" : "Collapse-entered"
        }`}
        style={{
          minHeight: 0,
          height: isOpen ? 0 : "auto",
          transitionDuration: 300,
        }}
      >
        <div className="Collapse-wrapper">
          <div className="Collapse-wrapperInner">
            <div className="input-content">
              <button onClick={() => setIsOpen((prev) => !prev)}>
                {type === "card" ? "+ Add Card" : "+ Add List"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default InputContainer;
