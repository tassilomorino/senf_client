import { useContext, useEffect, useState } from "react";
import {
    Box,
    Button,
    Icon,
    LayerWhiteFirstDefault,
    TertiaryButton,
    Typography,
} from "senf-atomic-design-system";
import { Bin, Write } from "senf-atomic-design-system/src/assets/icons";
import styled from "styled-components";
import QuestionFactory from "./QuestionFactory/QuestionFactory";

const Layer = styled.div`
  ${LayerWhiteFirstDefault};
  position: relative;
  padding: 1rem;
`;

const Main = ({ qtext, setQuestions, qtype, options, questionIndex}) => {
    const questionTypeChanger = (type) => {
        setQuestions((prev) => {
            const newQuestions = prev.map((question, i) => {
                if (i !== questionIndex) return question
                question.qtype = type !== 'SingleChoice' ? 'SingleChoice' : 'MultipleChoice'
                return question
            })
            return newQuestions;
        })
    };

    const handleQuestionDeletion  = () => {
        setQuestions((prev) => prev.filter((question, i) => i !== questionIndex ? question : null))
    };

    return (
        <Box
            alignItems="center"
            justifyContent="center"
        >
            <Layer>
                <Box
                    flexDirection="column"
                >
                    <Box
                        flexWrap="wrap-reverse"
                        gap="0.5rem"
                    >
                        <Typography
                            variant="buttonBg"
                            color="rgba(35, 29, 20, 0.5)"
                        >
                            Question {questionIndex + 1}
                        </Typography>
                        {qtype && (
                            <>
                                <TertiaryButton
                                    iconRight={<Write />}
                                    text={qtype}
                                    onClick={() => questionTypeChanger(qtype)}
                                    style={{ paddingTop: 0, marginRight: 'auto' }}
                                />
                                <Button
                                    variant="secondary"
                                    size="small"
                                    borderStyle="solid"
                                    text="Remove"
                                    icon={<Bin color="rgba(35, 29, 20, 0.5);" />}
                                    onClick={() => handleQuestionDeletion()}
                                />
                            </>
                        )}
                    </Box>
                    {!qtype && (
                        <Box gap="1rem" paddingBlock="1rem">
                            <Button
                                style={{ flexDirection: "column" }}
                                variant="secondary"
                                icon={"Check"}
                                onClick={() => questionTypeChanger("MultipleChoice")}
                            >
                                Singlechoice
                            </Button>
                            <Button
                                style={{ flexDirection: "column" }}
                                variant="secondary"
                                icon={"More"}
                                onClick={() => questionTypeChanger("SingleChoice")}
                            >
                                Multiplechoice
                            </Button>
                        </Box>
                    )}
                </Box>
                {qtype && <QuestionFactory setQuestions={setQuestions} questionIndex={questionIndex}  qtext={qtext} options={options} />}
            </Layer>
        </Box>
    )
};

export default Main;
