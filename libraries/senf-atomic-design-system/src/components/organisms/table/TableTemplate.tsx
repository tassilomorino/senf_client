import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import Box from "../../atoms/box/Box";
import Button from "../../atoms/buttons/Button";
import Input from "../../atoms/inputs/Input";
import { LayerWhiteFirstDefault } from "../../atoms/layerStyles/LayerStyles";
import Typography from "../../atoms/typography/Typography";
import Table from "./Table";

interface TableTemplateProps {
  children: React.ReactNode | React.ReactNode[];
  button?: React.Node;
}

const Wrapper = styled.div`
  padding: ${({ variant }) => variant === "white" && "10px"};
  border: ${({ variant }) =>
    variant === "white" &&
    `4px solid ${({ theme }) => theme.colors.greyscale.greyscale10tra}`};
  border-radius: ${({ variant }) =>
    variant === "white" && `${({ theme }) => theme.radii[2]}px`};
  ${({ variant }) => variant === "white" && LayerWhiteFirstDefault}
  overflow-x: scroll;
`;

const TableTemplate: FC<TableTemplateProps> = ({
  variant = "white",
  title,
  searchTerm,
  setSearchTerm,
  children,
  button,
  ...props
}) => {
  const { t } = useTranslation();
  return (
    <Wrapper variant={variant}>
      <Box margin="10px ">
        <Typography variant="h2"> {title} </Typography>
      </Box>
      <Box margin="10px 0px">
        <Input
          type="search"
          placeholder={t("search")}
          onChange={(e) => setSearchTerm(e?.target?.value)}
          value={searchTerm}
        />
      </Box>
      <Table
        {...props}
        children={children}
      />
    </Wrapper>
  );
};

export default TableTemplate;
