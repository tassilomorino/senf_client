/** @format */
import React, { FC, useState, memo, useEffect } from "react";

import { useSpring, animated } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { Button, Box, isMobileCustom, Input, Typography, useModals } from "senf-atomic-design-system";
import * as yup from "yup";
import { useFormik } from "formik";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";
import ThanksNote from "./ThanksNote";

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
    height: auto;
    overflow: hidden;
    transition:0.3s;
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
    const { openModal } = useModals()
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
            description: ""
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
            title: formik.values.title,
            description: formik.values.description,
            drawnData,
            modelsData,
        };
        await addDoc(collection(db, "threeD_ideas"), updateData).then((docId) => {
            console.log("Document successfully updated!");
            setSwipedUp(false)
            openModal(<ThanksNote />, { swipe: isMobile, size: "md", padding: 0 })

        })

    }

    const handleClose = async () => {
        setSwipedUp(false)
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
                    onClick={handleClose}
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
                    marginBottom="20px"
                >
                    <Button
                        variant="secondary"
                        width="max"
                        onClick={() => setSwipedUp(false)}
                        text={t("cancel")}
                    />
                    <Button
                        variant="primary"
                        width="max"
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
