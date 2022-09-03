import React from 'react'
import styled from 'styled-components'
import { Check, AllOrganizationTypes, theme, Plus, RoundedButton, Button } from "senf-atomic-design-system"

const Wrapper = styled.div`
position: fixed;
z-index: 1;
bottom: 0;
left: 0;
width: calc(100% - 40px);
pointer-events: none;
display: flex;
justify-content: space-between;
align-items: flex-end;
box-sizing:border-box;
margin: 20px;

`
const Navigation = ({ setSwipedUp }) => {
    return (
        <Wrapper>
            <Button variant="white" icon={<AllOrganizationTypes />} onClick={() => console.log("")} />
            <RoundedButton
                size="big"
                variant="primary"
                icon={
                    <Plus
                        color={theme.colors.white.white100}
                        transform="scale(2)"
                    />
                }
                onClick={() => setSwipedUp(true)}
            />
            <Button variant="white" icon={<Check />} onClick={() => console.log("")} />
        </Wrapper>
    )
}

export default Navigation