import { useFormik } from 'formik'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import Box from '../../atoms/box/Box'
import Button from '../../atoms/buttons/Button'
import ImageUploadTile from '../../atoms/imageUploadTile/ImageUploadTile'
import Input from '../../atoms/inputs/Input'

const AddModel = ({
  uploadedImage,
  handleImageUpload,
  uploadedModel,
  handleModelUpload,
  handleSubmit,
  formik: initial,
  validationSchema,

}) => {
  const { t } = useTranslation()
  const [page, setPage] = React.useState(0)

  const formik = useFormik({
    initialValues: initial.values,
    validationSchema,
  });
  useEffect(() => initial.setValues(formik.values), [formik.values]);
  return (
    <Box flexDirection="column" gap="20px">

      <Input
        name="title"
        type="text"
        placeholder={t("add_title")}
        label={t("title")}
        onChange={formik?.handleChange}
        onBlur={formik?.handleBlur}
        value={formik?.values.title}
      />
      <Box gap="20px">
        <ImageUploadTile
          id="imageURL"
          photoURL={formik?.values?.imgURL || uploadedImage}
          handleImageUpload={(e) => handleImageUpload(e, formik)}
        />
        <ImageUploadTile
          id="modelURL"
          photoURL={formik?.values?.modelURL || uploadedModel}
          handleImageUpload={(e) => handleModelUpload(e, formik)}
        />


      </Box>


      <Button
        text="add model"
        // onClick={(e) => console(e, formik)}
        onClick={(e) => handleSubmit(e, formik)}
        disabled={!formik?.isValid}

      />
    </Box>
  )
}

export default AddModel