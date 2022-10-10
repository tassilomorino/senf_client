import { addDoc, collection } from "firebase/firestore";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Box,
  Input,
  LayerGreyButtonsDefault,
  LayerGreyDefault,
  DropdownButton,
  Arrow,
  Button,
} from "senf-atomic-design-system";
import styled from "styled-components";
import * as yup from "yup";
import { useAuthContext } from "senf-shared";
import { OptionsStati } from "../../data/OptionsStati";
import { db } from "../../firebase";

const Wrapper = styled.div`
  bottom: 0px;

  ${(props) => LayerGreyButtonsDefault}
  background-color: ${({ theme }) => theme.colors.greyscale.greyscale10};
  height: auto;
  width: 540px;
  padding: 20px;
  box-sizing: border-box;
  display: block;
  border-radius: ${({ theme }) => theme.radii[2]}px;
  margin: 0px;
  margin-top: auto;
`;

const EditStatusPanel = ({ ideaId, getStatusLogDocs }) => {
  const { t } = useTranslation();
  const { user } = useAuthContext();

  const statusOptions = OptionsStati();
  const [activeStatusOptionLabel, setActiveStatusOptionLabel] = useState(
    statusOptions[0].label
  );
  const [checkedStatusOption, setCheckedStatusOption] = useState(
    statusOptions[0].value
  );

  const validationSchema = yup.object({
    title: yup
      .string()
      .required(t("enter_email"))
      .min(3, t("username_too_short"))
      .max(40, t("username_too_long")),
  });

  const formik = useFormik({
    initialValues: {
      title: "",
    },
    validationSchema,
    validateOnChange: true,
    validateOnBlur: true,
  });

  const handleSubmit = async () => {
    try {
      await addDoc(collection(db, `screams/${ideaId}/statusLog`), {
        title: formik.values.title,
        createdAt: new Date().toISOString(),
        userId: user.userId,
      }).then((doc) => {
        getStatusLogDocs();
      });
    } catch (error) {
      throw new Error(error, "Error in add exampleUser");
    }
  };

  return (
    <Wrapper>
      <Box
        flexDirection="column"
        gap="10px"
      >
        <Box gap="8px">
          <DropdownButton
            variant="secondary"
            size="small"
            text={activeStatusOptionLabel}
            trailingIcon="ArrowDown"
            options={{ itemType: "check" }}
            data={Object.values(
              statusOptions as { label: string; value: string }[]
            ).map((item) => ({
              text: item.label,
              leadingIcon: item.icon,
              checked: checkedStatusOption === item.value,
              onClick: () => {
                setCheckedStatusOption(item.value);
                setActiveStatusOptionLabel(item.label);
              },
            }))}
          />

          <DropdownButton
            variant="secondary"
            size="small"
            text={"Vernetzen"}
            trailingIcon={<Arrow />}
            // options={{ itemType: "check" }}
            // data={Object.values(
            //   statusOptions as { label: string; value: string }[]
            // ).map((item) => ({
            //   text: item.label,
            //   leadingIcon: item.icon,
            //   checked: checkedStatusOption === item.value,
            //   onClick: () => {
            //     setCheckedStatusOption(item.value);
            //     setActiveStatusOptionLabel(item.label);
            //   },
            // }))}
          />
          <DropdownButton
            variant="secondary"
            size="small"
            text={"Entwürfe"}
            trailingIcon={<Arrow />}
            // options={{ itemType: "check" }}
            // data={Object.values(
            //   statusOptions as { label: string; value: string }[]
            // ).map((item) => ({
            //   text: item.label,
            //   leadingIcon: item.icon,
            //   checked: checkedStatusOption === item.value,
            //   onClick: () => {
            //     setCheckedStatusOption(item.value);
            //     setActiveStatusOptionLabel(item.label);
            //   },
            // }))}
          />
        </Box>
        <Input
          name="title"
          type="textarea"
          placeholder={t("add_title")}
          //   label={t("title")}
          onChange={formik?.handleChange}
          onBlur={formik?.handleBlur}
          value={formik?.values.title}
          error={formik?.touched.title && Boolean(formik?.errors.title)}
          note={formik?.touched.title && formik?.errors.title}
          rows={6}
          maxRows="20"
        />
        <Button
          onClick={handleSubmit}
          text="Send"
        />
      </Box>
    </Wrapper>
  );
};

export default EditStatusPanel;
