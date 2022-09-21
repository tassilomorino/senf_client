import React, { useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { ExpandMap } from 'senf-atomic-design-system'
import styled from 'styled-components'

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.white.white100};
  position: relative;
  top: 0;
  right: 0;
  max-width: 800px;
  width: 100%;
  height: 100vh;
  overflow: scroll;
  padding: 30px;
    
  `

const ExpandMapWrapper = styled.div`
top: 0;
left: 0;
`
const IdeaProcessPage = () => {
    const params = useParams();
    const { ideaId } = params;
    const [idea, setIdea] = React.useState(null)
    const [mode, setMode] = useState("selectMunicipalities");
    const [statefulMap, setStatefulMap] = useState(null);

    const initialMapViewport = {
        latitude: 50.96,
        longitude: 6.95,
        zoom: 9.2,
        duration: 0,
        pitch: 0,
    };

    useEffect(() => {

        if (ideaId) {
            // query idea from db


        }
    }, [ideaId])


    return (
        <Wrapper>
            IdeaProcessPage

            <ExpandMapWrapper>
                <ExpandMap
                    initialMapViewport={initialMapViewport}
                    statefulMap={statefulMap}
                    setStatefulMap={setStatefulMap}
                    mapType={mode}
                    setMode={setMode}
                />
            </ExpandMapWrapper>
        </Wrapper>

    )
}

export default IdeaProcessPage