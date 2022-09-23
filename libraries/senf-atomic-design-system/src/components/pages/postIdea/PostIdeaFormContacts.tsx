import { useFormik } from "formik";
import React, { useEffect } from "react";
import Box from "../../atoms/box/Box";
import Input from "../../atoms/inputs/Input";
import Typography from "../../atoms/typography/Typography";

const PostIdeaFormContacts = ({ formikEditIdea: initial, contactData }) => {
  const formikEditIdea = useFormik({ initialValues: initial.values });
  useEffect(() => {
    initial.setValues(formikEditIdea.values);
  }, [formikEditIdea]);
  return contactData.map((item, index) => {
    return (
      <React.Fragment key={`PostIdeaFormContacts-${index}`}>
        <Typography variant="bodyBg">{item.description}</Typography>
        <Box
          gap="16px"
          flexDirection="column"
          marginTop="20px">
          <Input
            name={item.name}
            type="text"
            placeholder={item.placeholder}
            onChange={formikEditIdea?.handleChange}
            onBlur={formikEditIdea?.handleBlur}
            value={formikEditIdea?.values?.[item.name]}
            error={
              formikEditIdea?.touched.contact &&
              Boolean(formikEditIdea?.errors.contact)
            }
            note={
              formikEditIdea?.touched.contact && formikEditIdea?.errors.contact
            }
          />
        </Box>
      </React.Fragment>
    );
  });
};

export default PostIdeaFormContacts;
