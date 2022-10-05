import React from "react";
import { Button } from "senf-atomic-design-system";
import { ButtonsGroup, Container } from "./Styled.Option";

const Option = ({ opt, addOptions, deleteOptions, updateText }) => {
  return (
    <Container>
      <input
        type="text"
        className="form-control"
        placeholder="Option Text"
        value={opt.value}
        onChange={(e) => {
          updateText(opt.uid, e.target.value);
        }}
      />
      <ButtonsGroup>
        <Button
          size="small"
          type="button"
          onClick={addOptions}
        >
          <b>+</b>
        </Button>
        <Button
          size="small"
          type="button"
          onClick={(e) => {
            deleteOptions(opt.uid);
          }}
          variant="secondary"
          width="max"
        >
          <b>-</b>
        </Button>
      </ButtonsGroup>
    </Container>
  );
};

export default Option;
