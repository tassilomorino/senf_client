import React from "react";
import { useTranslation } from "react-i18next";
import { Box, Button, Input } from "senf-atomic-design-system";
import { ButtonsGroup, Container } from "./Styled.Option";

const Option = ({ opt, addOptions, deleteOptions, updateText }) => {
  const { t } = useTranslation();
  return (
    <Box
      justifyContent="center"
      alignItems="center"
    >
      <Container>
        <Box
          padding="20px"
          flexDirection="column"
        >
          <Box>
            <Input
              name="title"
              type="text"
              placeholder={t("add_description")}
              label={t("projectRoom_title")}
              // onChange={formik?.handleChange}
              // onBlur={formik?.handleBlur}
              // value={formik?.values.title}
              // error={formik?.touched.title && Boolean(formik?.errors.title)}
              // note={formik?.touched.title && formik?.errors.title}
            />
            {/* <input
        type="text"
        className="form-control"
        placeholder="Option Text"
        value={opt.value}
        onChange={(e) => {
          updateText(opt.uid, e.target.value);
        }}
      /> */}
            <ButtonsGroup>
              <Button
                size="small"
                type="button"
                onClick={addOptions}
                leadingIcon="Plus"
              />
              <Button
                size="small"
                type="button"
                onClick={(e) => {
                  deleteOptions(opt.uid);
                }}
                variant="secondary"
                fillWidth="max"
                leadingIcon="Minus"
              />
            </ButtonsGroup>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Option;
