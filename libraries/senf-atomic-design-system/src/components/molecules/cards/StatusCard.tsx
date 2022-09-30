/** @format */

import React, { FC } from "react";
import styled from "styled-components";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import Box from "../../atoms/box/Box";
import Typography from "../../atoms/typography/Typography";
import { StatusCardProps } from "./StatusCard.types";
import theme from "../../../styles/theme";
import TertiaryButton from "../../atoms/buttons/TertiaryButton";
import Button from "../../atoms/buttons/Button";
import More from "../../../assets/icons/More";
import ModalButton from "../modalStack/ModalButton";
import Avatar from "../../atoms/avatar/Avatar";
import { LayerGreyButtonsDefault } from "../../atoms/layerStyles/LayerStyles";

const Wrapper = styled.div<StatusCardProps>`
  overflow: hidden;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: auto;
  overflow: hidden;
  /* border-top: 1px solid ${({ theme }) => theme.colors.brown.brown20tra}; */
  animation: opacityTranslateYFrom50Animation 0.8s;
`;

const InnerWrapper = styled.div`
  ${(props) => LayerGreyButtonsDefault};
  width: 100%;
  border-radius: ${({ theme }) => theme.radii[1]}px;
`;

const StatusCard: FC<CommentCardProps> = ({ data, ...props }) => {
  const { t } = useTranslation();
  const { title, createdAt, userHandle, userId } = data;

  return (
    <Wrapper>
      <Box gap="10px">
        <Avatar placeholder={userHandle?.slice(0, 1)} />
        <Box
          alignItems="center"
          gap="5px"
          width="100%"
          style={{ cursor: "pointer" }}
        >
          <Box
            flexDirection="column"
            width="100%"
          >
            <Typography
              variant="buttonBg"
              onClick={() => props.handle.openProfilePage(userId)}
            >
              christian
              {userHandle}{" "}
            </Typography>
            <Typography
              variant="bodySm"
              color={theme.colors.black.black40tra}
            >
              {dayjs(createdAt).format("DD.MM.YYYY")}
            </Typography>
            <InnerWrapper>
              {/* <Box justifyContent="space-between">
                {props.user?.authenticated && (
                  <ModalButton
                    button={TertiaryButton}
                    iconLeft={<More />}
                    options={{
                      style: {
                        padding: 20,
                      },
                      title: t("contactModalTitle"),
                      cancelText: t("cancel"),
                    }}
                  >
                    <Box
                      width="100%"
                      flexDirection="column"
                      gap="8px"
                    >
                      {props.handle.reportComment &&
                        props.user?.userId !== userId && (
                          <Button
                            text={t("report")}
                            width="max"
                            onClick={() => props.handle.reportComment(data)}
                          />
                        )}
                      {props.handle.deleteComment &&
                        (props.user?.userId === userId ||
                          props.user?.isAdmin === true ||
                          props.user?.isModerator === true) && (
                          <ModalButton
                            text={t("delete_comment")}
                            width="max"
                            options={{
                              style: {
                                padding: 20,
                              },
                              title: t("delete_comment_confirm"),
                              cancelText: t("cancel"),
                              submitText: t("delete"),
                              onSubmit: () => props.handle.deleteComment(data),
                            }}
                          />
                        )}
                    </Box>
                  </ModalButton>
                )}
              </Box> */}
              <Box
                alignItems="flex-start"
                flexDirection="column"
                margin="8px"
              >
                <Typography variant="bodyBg"> {title}</Typography>
              </Box>
            </InnerWrapper>
          </Box>
        </Box>
      </Box>
    </Wrapper>
  );
};

export default StatusCard;
