import { useState } from "react";
import { Box, Button, Input } from "senf-atomic-design-system";
import { Bin, Plus } from "senf-atomic-design-system/src/assets/icons";
import { v4 as uuidv4 } from "uuid";

const Option = ({ options, option, setQuestions, questionIndex, index }) => {
  const deleteOptions = (id) => {
    if (options.length > 2) {
      const updatedOption = [...options].filter((item) => item.uid !== id);
      setQuestions((prev) =>
        prev.map((question, i) => {
          if (questionIndex !== i) return question;
          question.options = updatedOption;
          return question;
        })
      );
    }
  };
  const updateTextOption = (id, text) => {
    const updatedOption = [...options];
    const changedIndex = updatedOption.findIndex((x) => x.uid === id);
    updatedOption[changedIndex].value = text;
    setQuestions((prev) => {
      prev[questionIndex].options = updatedOption;
      return [...prev];
    });
  };
  return (
    <Box gap="1rem">
      <Input
        size="sm"
        value={option.value}
        onChange={(e) => updateTextOption(option.uid, e.currentTarget.value)}
        placeholder={`option ${index + 1}`}
      />
      <Button
        variant="secondary"
        size="small"
        borderStyle="solid"
        text="Remove"
        style={{ paddingInline: "1rem" }}
        onClick={() => deleteOptions(option.uid)}
        leadingIcon={
          <Bin
            transform="rotateY(180deg)"
            color="rgba(35, 29, 20, 0.5);"
          />
        }
      />
    </Box>
  );
};

export default Option;
