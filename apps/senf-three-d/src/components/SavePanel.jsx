/** @format */
import React, { FC, useState, memo, useEffect } from "react";

import { useSpring, animated } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { Button, Box, isMobileCustom, Input, Typography } from "senf-atomic-design-system";
import * as yup from "yup";
import { useFormik } from "formik";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";

const DragWrapper = styled(animated.div)`
  z-index: 5;
  overscroll-behavior: contain;
  overflow-x: hidden;
  width: 100%;
  height: 100%;
  left: 0px;
  overflow: ${({ overflow }) => overflow || "scroll"};
  background-color: ${({ theme }) => theme.colors.white.white100};
  border-radius: ${({ theme }) => theme.radii[5]}px
    ${({ theme }) => theme.radii[5]}px 0px 0px;
  box-shadow: ${({ theme }) => theme.shadows[3]}
    ${({ theme }) => theme.colors.brown.brown20tra};

  position: absolute;
  pointer-events: all;
  

  @media (min-width: 768px) {
    left:initial;
    position: fixed;
    right: 10px;
    width: 400px;
    max-width: 400px;
    border-radius: 18px;
    margin: 10px;
    height: 400px;
    overflow: hidden;
    transition:0.3s;
  }
`;

const InnerWrapper = styled.div`
  @media (min-width: 768px) {
    padding-left: 66px;
    height: 100%;

    position: absolute;
  }
`;

const ContentWrapper = styled.div`
  overflow-y: scroll;
  pointer-events: all;
  height: calc(100vh - 120px);
  width: 100%;
  z-index: 1;
  margin-left: 50%;
  transform: translateX(-50%);
  position: fixed;
  margin-top:-10px;
  padding-top:50px;
  top: ${({ swipedUp }) => swipedUp && "110px"};

  @media (min-width: 768px) {
    height: calc(100% - 150px);
    padding-top:20px;
    width: 400px;
    position: relative;
    top: 0;
  }
`;





const HandleBar = styled.div`
  position: absolute;
  top: 8px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 99;
  width: 50px;
  height: 5px;
  background-color: ${({ theme }) => theme.colors.primary.primary120};
  border-radius: 5px;
`;



const SavePanel = ({
    swipedUp,
    setSwipedUp,
}) => {
    const { t } = useTranslation();
    const isMobile = isMobileCustom();
    const [showResults, setShowResults] = useState(false);
    const [swipePercentage, setSwipePercentage] = useState(0);


    const validationSchema = yup.object({
        title: yup
            .string()
            .required(t("enter_title")),

    });

    const formik = useFormik({
        initialValues: {
            title: "",
        },
        validationSchema,
        validateOnMount: true,
        validateOnChange: true,
        validateOnBlur: true,
    });




    const [springProps, setSpring] = useSpring(() => ({
        x: 0,
        y: 0,
        scale: 1,
        transform: `translateY(${window.innerHeight}px)`,
        overflow: "visible",
        touchAction: "none",
        userSelect: "none",
    }));


    useEffect(() => {
        if (swipedUp) {
            setSpring({
                transform: `translateY(${window.innerHeight - 420}px)`,
                touchAction: "unset",
            });
        } else {
            setSpring({
                transform: `translateY(${window.innerHeight}px)`,
                touchAction: "unset",
            });

        }
    }, [swipedUp]);

    const bind = useDrag(
        ({ last, down, movement: [, my], offset: [, y] }) => {
            setSpring({
                transition: "0s",
            });
            if (last && my > 50) {
                setSpring({
                    transform: `translateY(${window.innerHeight}px)`,
                    touchAction: "none",
                });
                setSwipedUp(false);
                // setSearchOpen(false);
            }

            if (last && my < -50) {
                setSpring({
                    transform: `translateY(${window.innerHeight - 420}px)`,
                    touchAction: "unset",
                });

                setSwipedUp(true);
            }
            setSwipePercentage(Math.abs(my) / (window.innerHeight - 190));
            setSpring({ y: down ? my : 0 });
        },
        {
            pointer: { touch: true },
            bounds: {
                enabled: true,
            },
        }
    );



    const handleSave = async () => {
        const drawnData = localStorage.getItem("drawnData");
        const modelsData = localStorage.getItem("modelsData");
        const updateData = {
            drawnData,
            modelsData,
        };
        await addDoc(collection(db, "threeD_models"), updateData).then((docId) => {
            console.log("Document successfully updated!");
            setSwipedUp(false)
        })
    }



    return (
        <DragWrapper
            {...bind()}
            swipedUp={swipedUp}
            style={springProps}
        >

            {isMobile && <HandleBar />}
            <Box
                margin="16px 16px 0px 16px"
                justifyContent="space-between"
                alignItems="center"
            >
                <Typography variant="h3">{t("save_design")}</Typography>
                <Button
                    variant="secondary"
                    onClick={() => { console.log("hi") }}
                    icon="Close" />
            </Box>

            <Box margin="0px 16px 0px 16px" flexDirection="column" gap="20px">

                <Input
                    name="title"
                    type="text"
                    placeholder={t("add_title")}
                    label={t("title")}
                    onChange={formik?.handleChange}
                    onBlur={formik?.handleBlur}
                    value={formik?.values.title}
                    error={formik?.touched.title && Boolean(formik?.errors.title)}
                    note={formik?.touched.title && formik?.errors.title}
                />
                <Input
                    name="description"
                    type="textarea"
                    placeholder={t("add_description")}
                    label={t("description")}
                    rows={5}
                    onChange={formik?.handleChange}
                    onBlur={formik?.handleBlur}
                    value={formik?.values.description}
                    error={formik?.touched.description && Boolean(formik?.errors.description)}
                    note={formik?.touched.description && formik?.errors.description}
                // minRows="4"
                // maxRows="6"
                />

                <Box
                    width="100%"
                    gap="8px"
                    marginTop="0px"
                >
                    <Button
                        variant="secondary"
                        fillWidth="max"
                        onClick={() => setSwipedUp(false)}
                        text={t("cancel")}
                    />
                    <Button
                        variant="primary"
                        fillWidth="max"
                        onClick={() => handleSave()}
                        disabled={!formik?.isValid}
                        text={t("save")}
                    />

                </Box>

            </Box>
        </DragWrapper>
    );
};

export default memo(SavePanel);
