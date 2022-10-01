/** @format */

import React, { FC, useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { Trans, useTranslation } from "react-i18next";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "../../atoms/buttons/Button";
import Box from "../../atoms/box/Box";
import Form from "../../molecules/form/Form";
import { AuthAddDetailsProps } from "./AuthAddDetails.types";

import Typography from "../../atoms/typography/Typography";
import { openLink } from "../../../util/helpers";
import Dropdown from "../../atoms/dropdown/Dropdown";
import ImagePlaceholder from "../../atoms/imagePlaceholder/ImagePlaceholder";
import { LayerWhiteFirstDefault } from "../../atoms/layerStyles/LayerStyles";
import Input from "../../atoms/inputs/Input";
import MultiDropdown from "../../atoms/dropdown/multi/MultiDropdown";
import Bulb from "../../../assets/icons/Bulb";
import Icon from "../../atoms/icons/Icon";
import Loader from "../../atoms/animations/Loader";

const ImageWrapper = styled.label`
  ${(props) => LayerWhiteFirstDefault}
  width:158px;
  height: 158px;
  border-radius: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const AuthAddDetails: FC<AuthAddDetailsProps> = ({ user, authHandler }) => {
  const { t } = useTranslation();

  const addDetailsValidationSchema = yup.object({
    handle: yup
      .string()
      .required(t("enter_username"))
      .min(3, t("username_too_short"))
      .max(20, t("username_too_long"))
      .matches(/^\S*$/, t("spaces_username"))
      .matches(/^[a-zA-Z0-9\-\_\.]*$/, t("username_latin_only")),
    description: yup
      .string()
      .min(10, t("description_too_short"))
      .max(100, t("description_too_long")),
  });

  const formik = useFormik({
    initialValues: {
      handle: "",
      description: "",
      postcode: "",
      age: "",
      sex: "",
    },
    validationSchema: addDetailsValidationSchema,
    validateOnMount: true,
    validateOnChange: true,
    validateOnBlur: true,
  });

  useEffect(() => {
    // Set up canvas
    formik.setFieldValue("handle", user?.handle);
    formik.setFieldValue("description", user?.description);
    formik.setFieldValue("postcode", user?.postcode);
    formik.setFieldValue("age", user?.age);
    formik.setFieldValue("sex", user?.sex);

    // if (data.contact) {
    //   formik.setFieldValue("contact", data.contact);
    // }
  }, [user]);

  function generateArrayOfYears() {
    const max = new Date().getFullYear() - 14;
    const min = max - 100;
    const years = [];

    for (let i = max; i >= min; i--) {
      years.push({ value: i, label: i });
    }
    return years;
  }

  const years = generateArrayOfYears();

  const [image, setImage] = useState(user?.photoURL);

  return (
    <Box
      flexDirection="column"
      margin="80px 10% 0px 10%"
      position="relative"
      zIndex={9999}
    >
      <Typography
        variant="h1"
        style={{ position: "relative" }}
      >
        {/* {t("auth_add_details_header1")} */}
        Vervollständige
      </Typography>
      <Typography
        variant="h1"
        style={{ position: "relative" }}
      >
        dein Profil
        {/* {t("auth_add_details_header2")} */}
      </Typography>

      <Box
        margin="25px 0px 24px 0px"
        flexDirection="column"
        gap="10px"
      >
        <Box
          justifyContent="center"
          margin="20px"
        >
          <ImageWrapper
            // onMouseEnter={() => setUploadImageHover(true)}
            // onMouseLeave={() => setUploadImageHover(false)}
            htmlFor="imageUploader"
          >
            {image ? (
              <ImagePlaceholder
                img={image}
                borderRadius="18"
              />
            ) : authHandler.authLoading ? (
              <Loader />
            ) : (
              <Icon icon={<Bulb />} />
            )}
          </ImageWrapper>
          <input
            type="file"
            onChange={(e) => authHandler.handleImageUpload(e).then(setImage)}
            style={{ display: "none" }}
            id="imageUploader"
          />
        </Box>
        <Input
          name="handle"
          type="text"
          placeholder={t("username")}
          onChange={formik?.handleChange}
          value={formik?.values.handle}
        />

        <Input
          name="description"
          type="textarea"
          rows={3}
          placeholder={t("auth_add_details_description")}
          onChange={formik?.handleChange}
          value={formik?.values.description}
        />
        <Input
          name="postcode"
          type="text"
          placeholder={t("postcode")}
          onChange={formik?.handleChange}
          value={formik?.values.postcode}
        />
        <Box gap="8px">
          <Dropdown
            name="sex"
            listItems={[
              {
                label: t("diverse"),
                value: "diverse",
              },
              {
                label: t("female"),
                value: "female",
              },
              {
                label: t("male"),
                value: "male",
              },
            ]}
            onChange={formik?.handleChange}
            value={formik?.values.sex}
          />
          <Dropdown
            name="age"
            listItems={years}
            onChange={formik?.handleChange}
            value={formik?.values.age}
          />
        </Box>
        <br />
        <Button
          variant="white"
          onClick={() => authHandler.submitEditDetails(formik)}
          loading={authHandler.loadingAuth === "edit"}
        >
          {t("save")}
        </Button>
      </Box>
    </Box>
  );
};

export default AuthAddDetails;
