/** @format */

import React, { FC } from "react";
import styled from "styled-components";
import { t } from "i18next";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import Icon from "../../atoms/icons/Icon";
import {
  LayerWhiteFirstDefault,
  LayerWhiteSecondDefault,
} from "../../atoms/layerStyles/LayerStyles";
import Box from "../../atoms/box/Box";
import Typography from "../../atoms/typography/Typography";
import { CommentCardProps } from "./CommentCard.types";
import theme from "../../../styles/theme";
import TertiaryButton from "../../atoms/buttons/TertiaryButton";
import Button from "../../atoms/buttons/Button";
import More from "../../../assets/icons/More";
import ModalButton from "../modalStack/ModalButton";

const Wrapper = styled.div<CommentCardProps>`
  cursor: pointer;
  float: left;
  overflow: hidden;
  position: relative;
  box-sizing: border-box;

  width: 100%;

  height: auto;
  overflow: hidden;
  border-top: 1px solid ${({ theme }) => theme.colors.brown.brown20tra};

  animation: opacityTranslateYFrom50Animation 0.8s;
`;

const InnerWrapper = styled.div`
  margin: 12px 0px 12px 0px;
`;

const CommentCard: FC<CommentCardProps> = ({ data, ...props }) => {
  console.log(data, props)
  const { t } = useTranslation();
  const { title, createdAt, userHandle, userId, commentId } = data;

  return (
    <Wrapper>
      <InnerWrapper>
        <Box justifyContent="space-between">
          <Box alignItems="flex-end" gap="3px">
            <Typography variant="buttonBg">{userHandle} </Typography>

            <Typography
              variant="buttonBg"
              color={theme.colors.black.black40tra}
            >
              {t("at")}
            </Typography>
            <Typography
              variant="buttonBg"
              color={theme.colors.black.black40tra}
            >
              {dayjs(createdAt).format("DD.MM.YYYY")}
            </Typography>
          </Box>
          {props.user?.authenticated &&
            <ModalButton
              button={TertiaryButton}
              iconLeft={<More />}
              options={{
                title: t("contactModalTitle"),
                cancelText: t("cancel")
              }}
            >
              <Box width="100%" flexDirection="column" gap="8px">
                {props.handle.reportComment && props.user?.userId !== userId && <Button
                  text={t("report")}
                  fillWidth="max"
                  onClick={() => props.handle.reportComment(data)}
                />}
                {
                  props.handle.deleteComment &&
                  (props.user?.userId === userId || props.user?.isAdmin === true || props.user?.isModerator === true) &&
                  <ModalButton
                    text={t("delete_comment")}
                    fillWidth="max"
                    options={{ title: t('delete_comment_confirm'), cancelText: t('cancel'), submitText: t('delete'), onSubmit: () => props.handle.deleteComment(data) }}
                  />}
              </Box>
            </ModalButton>
          }
        </Box>
        <Box
          alignItems="flex-start"
          flexDirection="row"
          margin="8px 0px 8px 0px"
        >
          <Typography variant="bodyBg"> {title}</Typography>
        </Box>
      </InnerWrapper>
    </Wrapper>
  );
};

export default CommentCard;
