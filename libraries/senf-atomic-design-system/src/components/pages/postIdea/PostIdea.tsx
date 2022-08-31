/** @format */

import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import Box from "../../atoms/box/Box";
import Button from "../../atoms/buttons/Button";
import { PostIdeaProps } from "./PostIdea.types";
import PostIdeaForm from "./PostIdeaForm";

const Wrapper = styled.div<PostIdeaProps>``;

const PostIdea: FC<PostIdeaProps> = ({ formik, handleSubmit, loading, Out }) => {
  const { t } = useTranslation()

  return <Wrapper>
    <PostIdeaForm formik={formik} />

    <Box
      margin="10px 0px 10px 0px"
      justifyContent="center"
      position="absolute"
      top="100%"
      width="100%"
    >
      <Button
        onClick={handleSubmit}
        variant="white"
        text={t("postScream_shareIdea")}
        loading={loading}
        disabled={
          formik.values.body === "" ||
          formik.values.title === "" ||
          !formik.values.address ||
          Out === true
        }
      />
    </Box>

  </Wrapper >;
};

export default PostIdea;
