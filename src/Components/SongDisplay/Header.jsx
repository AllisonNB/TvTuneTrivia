import React from 'react';
import styled from 'styled-components';
import { PiTelevisionFill } from "react-icons/pi";

const Title = styled.div`
    text-align: center;
    margin: 20px;

    @media (max-width: 600px) { 
        font-size: 1.5em;
        margin: 10px;
    }

    @media (min-width: 601px) and (max-width: 1024px) { 
        font-size: 2em;
    }

    @media (min-width: 1025px) { 
        font-size: 2.5em;
        font-weight: 700;
    }
`

export default function Header() {
    return (
        <Title aria-label='Tv Tune Trivia' role='heading' tabindex='0'> <PiTelevisionFill /> TV Tune Trivia <PiTelevisionFill /> </Title>
    )
}
