import { useFormik } from 'formik';
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import { Box, ExpandMap, Input } from 'senf-atomic-design-system';
import styled from 'styled-components';
import * as yup from "yup"

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.greyscale.greyscale05};
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  overflow: scroll;
`;


const CreateMonitoringBoardPage = () => {
    const { t } = useTranslation()
    const [mode, setMode] = useState("selectMunicipalities");
    const [statefulMap, setStatefulMap] = useState(null);
    const initialMapViewport = {
        latitude: 50.96,
        longitude: 6.95,
        zoom: 9.2,
        duration: 0,
        pitch: 0,
    };


    const validationSchema = yup.object({
        title: yup
            .string()
            .required(t("enter_email"))

    });

    const formik = useFormik({
        initialValues: {
            title: "",
        },
        validationSchema,
        validateOnChange: true,
        validateOnBlur: true,
    });

    return (
        <Wrapper>
            <Box margin="20px auto" flexDirection='column' maxWidth='500px' gap="20px">
                <Input
                    name="title"
                    type="text"
                    placeholder={t("add_title")}
                    label={t("add_title")}
                    onChange={formik?.handleChange}
                    onBlur={formik?.handleBlur}
                    value={formik?.values.title}
                    error={formik?.touched.title && Boolean(formik?.errors.title)}
                    note={formik?.touched.title && formik?.errors.title}
                />

                <Box width="100%" justifyContent="center">
                    <ExpandMap
                        initialMapViewport={initialMapViewport}
                        statefulMap={statefulMap}
                        setStatefulMap={setStatefulMap}
                        mapType="selectMunicipalities"
                    />
                </Box>
            </Box>
        </Wrapper>
    )
}

export default CreateMonitoringBoardPage