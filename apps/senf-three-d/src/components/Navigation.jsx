import React from 'react'
import styled from 'styled-components'
import { Check, Arrow, AllOrganizationTypes, theme, Plus, RoundedButton, Button, isMobileCustom } from "senf-atomic-design-system"

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

@media (min-width: 768px) {
    bottom: 50%;
left: ${({ swipedUp }) => swipedUp ? "440px" : "30px"};
transform: translateY(50%);
width: auto;
z-index: ${({ swipedUp }) => swipedUp ? 1 : 5};;
transition:0.3s ;
}

`
const Navigation = ({ setSwipedUp, swipedUp }) => {
    const isMobile = isMobileCustom()
    return (
        <Wrapper swipedUp={swipedUp}>
            {isMobile && <Button variant="white" icon={<AllOrganizationTypes />} onClick={() => console.log("")} />}
            <RoundedButton
                style={swipedUp && !isMobile ? { backgroundColor: theme.colors.beige.beige20, borderColor: theme.colors.beige.beige20 } : {}}
                size={
                    isMobile || !swipedUp ?
                        "big" : "small"
                }
                variant="primary"
                icon={
                    isMobile || !swipedUp ?
                        <Plus
                            color={"white"}
                            transform="scale(2)"
                        /> : <Arrow
                            transform="scale(1) rotate(180deg)"
                        />
                }
                onClick={() => setSwipedUp(!swipedUp)}
            />
            {isMobile && <Button variant="white" icon={<Check />} onClick={() => console.log("")} />}
        </Wrapper>
    )
}

export default Navigation