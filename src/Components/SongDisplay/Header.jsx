import React from 'react';
import styled from 'styled-components';
import { PiTelevisionFill } from "react-icons/pi";

const Title = styled.div`
    text-align: center;
    font-size: 3em;
    font-weight: 700;
    margin: 0 0 20px 0;
`

export default function Header() {
    return (
        <>
            <Title> <PiTelevisionFill /> TV Tune Trivia <PiTelevisionFill /> </Title>
        </>
    )
}
