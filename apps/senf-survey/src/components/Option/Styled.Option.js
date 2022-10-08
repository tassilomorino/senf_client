import { LayerWhiteFirstDefault } from "senf-atomic-design-system";
import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    border-radius: ${({ theme }) => theme.radii[2]}px;
    ${LayerWhiteFirstDefault};
`
export const ButtonsGroup = styled.div`
    display: flex;
`