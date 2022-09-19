import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { Typography, Box, Arrow, Icon, theme } from 'senf-atomic-design-system';
import styled from 'styled-components';
import { db } from '../firebase';
import MemberBoard from './MemberBoard';


const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.greyscale.greyscale05};
  position: fixed;
  top: 0;
  left: 100px;
  width: calc(100% - 100px);
  height: 100%;
  overflow: scroll;
`;

const DivisionPage = () => {
    const params = useParams();
    const navigate = useNavigate()
    const currentMonitoringBoard = useSelector(state => state.data.currentMonitoringBoard)
    const { divisionId } = params;
    const [division, setDivision] = useState(null);

    useEffect(async () => {
        if (currentMonitoringBoard && divisionId) {
            try {
                const divisionDoc = doc(db, `monitoringBoards/${currentMonitoringBoard.monitoringBoardId}/divisions/${divisionId}`);
                const docSnapshot = await getDoc(divisionDoc);

                setDivision({ ...docSnapshot.data(), divisionId: docSnapshot.id });
            } catch (error) {
                console.log(error);
            }
        }

    }, [currentMonitoringBoard, divisionId])


    return (
        <Wrapper>
            <Box gap="50px" flexDirection="column" margin="30px">
                <Box gap="5px" alignItems='center'>
                    <Typography variant="h2" color={theme.colors.black.black60tra} onClick={() => navigate("/divisions")}>Divisions</Typography>
                    <Icon icon={<Arrow />} />
                    <Typography variant="h2">{division?.title}</Typography>
                </Box>

                <MemberBoard division={division} />
            </Box>

        </Wrapper>
    )
}

export default DivisionPage