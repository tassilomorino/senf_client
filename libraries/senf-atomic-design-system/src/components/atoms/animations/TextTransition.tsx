import React, { useState, useEffect } from 'react'
import { useTransition, animated, useSpringRef } from '@react-spring/web'
import styled from 'styled-components'
import Typography from '../typography/Typography'


const Wrapper = styled.div`
  cursor: pointer;

-webkit-user-select: none;
  user-select: none;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-left: 5px;

`
const Span = styled(animated.div)`

  position: absolute;
  display: flex;
  justify-content: flex-start;
  will-change: transform, opacity;
    font-family: Nunito;
    font-size: 1.25rem;
    font-weight: 700;
    line-Height: 1.3em;
    color: ${({ color }) => color};
    font-weight: 900;
    text-align: left;



`
const items: string[] = [{ name: 'Baum', color: "#64966B" }, { name: 'Sandkasten', color: "#79827B" }, { name: 'Strandkorb', color: "#9B4300" }, { name: 'Getränkestand', color: "#647A6B" }]

const TextTransition = () => {
    const [index, set] = useState(0)

    const transRef = useSpringRef()
    const transitions = useTransition(index, {
        ref: transRef,
        keys: null,
        from: { opacity: 0, transform: 'translateY(-30px) rotate(-5deg)' },
        enter: { opacity: 1, transform: 'translateY(0px) rotate(0deg)' },
        leave: { opacity: 0, transform: 'translateY(30px) rotate(5deg)' },
    })

    useEffect(() => {
        transRef.start()
    }, [index])

    useEffect(() => {
        const interval = setInterval(() => {
            set(state => (state + 1) % items.length)
        }, 3000)

        return () => {
            clearInterval(interval)
        }
    }, [])

    return (
        <Wrapper>
            {transitions((style, i) => {
                const item = items[i]
                return <Span style={{ ...style }} color={item.color}>{item.name}</Span>
            })}
        </ Wrapper>
    )
}

export default TextTransition