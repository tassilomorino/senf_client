import React from 'react'
import { useTranslation } from 'react-i18next'
import Box from '../../atoms/box/Box'
import Button from '../../atoms/buttons/Button'
import ImageUploadTile from '../../atoms/imageUploadTile/ImageUploadTile'
import Input from '../../atoms/inputs/Input'

const AddModel = ({ formik, uploadedImage,
    handleImageUpload,
    uploadingImage,
    handleSubmit,
    handleUploadModel }) => {
    const { t } = useTranslation()
    const [page, setPage] = React.useState(0)
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
                    photoURL={uploadedImage}
                    uploadingImage={uploadingImage}
                    handleImageUpload={handleImageUpload}
                />
                <ImageUploadTile
                    photoURL={uploadedImage}
                    uploadingImage={uploadingImage}
                    handleImageUpload={handleImageUpload}
                />
            </Box>


            <Button
                text="add model"
                onClick={handleUploadModel}
                disabled={!formik?.isValid}

            />
        </Box>
    )
}

export default AddModel