import React, { FC } from 'react'
import styled from 'styled-components'
import { isTablet } from "react-device-detect";
import { useTranslation } from 'react-i18next';
import { isMobileCustom } from '../../../hooks/customDeviceDetect';
import Typography from '../../atoms/typography/Typography';
import { LayerYellowDefault } from '../../atoms/layerStyles/LayerStyles';

const PhoneWrapper = styled.div`

  display: none;


@media screen and (min-aspect-ratio: 15/9) and (orientation: landscape) {
    display: block;
    z-index: 99999;
    position: fixed;
    top: 0;
    height: 100vh;
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-size: 40pt;
    color: white;
    text-align: center;
    ${(props) => LayerYellowDefault}
  
}
`

const TabletWrapper = styled.div`
  display: none;


@media screen and (min-aspect-ratio: 9/15) and (min-width: 768px) and (max-width: 1000px) and (orientation: portrait) {

    display: block;
    z-index: 99999;
    position: fixed;
    top: 0;
    height: 100vh;
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-size: 40pt;
    color: white;
    text-align: center;
    ${(props) => LayerYellowDefault}

  
}
`

const RotateDevice: FC = () => {
    const isMobile = isMobileCustom()
    const { t } = useTranslation()

    return (
        <React.Fragment>

            {isTablet && (
                <TabletWrapper>
                    <Typography variant="h1">{t("rotate_tablet")}</Typography>
                </TabletWrapper>
            )}

            {isMobile && (
                <PhoneWrapper>
                    <Typography variant="h1">{t("rotate_phone")}</Typography>
                </PhoneWrapper>
            )}
        </React.Fragment>
    )
}

export default RotateDevice