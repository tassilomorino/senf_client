import React from "react";
import { useTranslation } from "react-i18next";
import {
  Box,
  Input,
  LayerGreyButtonsDefault,
  LayerGreyDefault,
} from "senf-atomic-design-system";
import styled from "styled-components";

const Wrapper = styled.div`
  bottom: 0px;

  ${(props) => LayerGreyButtonsDefault}
  background-color: ${({ theme }) => theme.colors.greyscale.greyscale10};
  height: 200px;
  width: 540px;
  padding: 20px;
  box-sizing: border-box;
  display: block;
  border-radius: ${({ theme }) => theme.radii[2]}px;
  margin: 0px;
  margin-top: auto;
`;

const EditStatusPanel = () => {
  const { t } = useTranslation();
  return (
    <Wrapper>
      <Box
        flexDirection="column"
        gap="20px">
        <Input
          name="brief"
          type="textarea"
          placeholder={t("add_brief")}
          //   label={t("brief")}
          rows={5}
          //   onChange={formik?.handleChange}
          //   onBlur={formik?.handleBlur}
          //   value={formik?.values.brief}
          //   error={formik?.touched.brief && Boolean(formik?.errors.brief)}
          //   note={formik?.touched.brief && formik?.errors.brief}
          // minRows="4"
          // maxRows="6"
        />
      </Box>
    </Wrapper>
  );
};

export default EditStatusPanel;
