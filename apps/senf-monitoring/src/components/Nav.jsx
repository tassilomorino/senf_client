import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Box, Dropdown, Tabs } from 'senf-atomic-design-system'
import { setMonitoringBoard } from '../redux/actions/accountActions'

const Nav = () => {
    const navigate = useNavigate()
    const { t } = useTranslation()
    const [order, setOrder] = useState(1)
    const dispatch = useDispatch();
    const monitoringBoards = useSelector((state) => state.data.monitoringBoards);

    const handleOrder = (value) => {
        setOrder(value)
        if (value === 1) {
            navigate('/')
        } else if (value === 2) {
            navigate('/members')
        }
    }

    useEffect(() => {
        if (window.location.pathname === "/") {
            setOrder(1);
        } else if (window.location.pathname === "/members") {
            setOrder(2);
        }
    }, [])

    useEffect(() => {
        if (monitoringBoards) {
            dispatch(setMonitoringBoard(monitoringBoards[0]?.monitoringBoardId));
        }
    }, [monitoringBoards])
    const handleSelectMonitoringBoard = (event) => {
        const monitoringBoardId = event.target.value;
        dispatch(setMonitoringBoard(monitoringBoardId));
    }

    return (
        <Box zIndex="9999" flexDirection='column' justifyContent='' width='180px'>
            <Box>
                <Dropdown
                    id="monitoringBoardSelect"
                    initialValue={t("select_division")}
                    listItems={monitoringBoards}
                    onChange={handleSelectMonitoringBoard}
                />
            </Box>

            <Tabs
                fontSize="buttonSm"
                order={order}
                setOrder={handleOrder}
                tabs={[
                    { text: `Dashboard` },
                    { text: `Membersboard` },
                    // { icon: <Info />, text: "Interaktionen" },
                ]}
            />
        </Box>
    )
}

export default Nav