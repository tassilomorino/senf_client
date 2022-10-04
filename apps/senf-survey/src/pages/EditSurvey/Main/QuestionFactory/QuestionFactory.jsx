import { Box, Button, Input } from "senf-atomic-design-system";
import { Plus } from "senf-atomic-design-system/src/assets/icons";
import { v4 as uuidv4 } from 'uuid';
import Option from "./Option";

const QuestionFactory = ({ setQuestions, questionIndex, qtext, options }) => {
  const addOptions = () => {
    const uid = uuidv4();
    const newOption = {
      uid,
      value: "",
    };
    const newOptions = [...options]
    newOptions.push(newOption)
    setQuestions(prev => {
      prev[questionIndex].options = newOptions;
      return [...prev];
    })
  };
  const updateQuestionText = (text) => {
    setQuestions(prev => {
      prev[questionIndex].qtext = text;
      return [...prev]
    })
  };
  return (
    <>
      <Box
        flexDirection="column"
        gap="1rem"
      >
        <Input
          label="Title of your question"
          size="md"
          value={qtext}
          onChange={(e) => updateQuestionText(e.currentTarget.value)}
        />
        {options.map((option, index, options) => (
          <Option setQuestions={setQuestions} questionIndex={questionIndex} options={options} option={option} index={index} key={index} />
        ))}
        <Box>
          <Button
            variant="tertiary"
            icon={<Plus />}
            transform="translate(42px, 18px);"
            size="small"
            text="Add answer option"
            onClick={addOptions}
          />
        </Box>
      </Box>
    </>
  );
};

export default QuestionFactory;
