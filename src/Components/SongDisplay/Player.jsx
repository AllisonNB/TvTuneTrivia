import React, { useState } from 'react';
import ReactPlayer from 'react-player';


import { styled } from "styled-components";
import { FaPlay, FaPause } from "react-icons/fa";



const PlayerContainer = styled.div`  
    color: #fefae0;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
`

const Volume = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 1.2rem;
`

const Button = styled.button`  
    display: flex;
    justify-content: center;
    align-items: center;
    background: ${props => props.$playing ? '#E9C46A;' : '#264653;'} 
    color: #fefae0;
    border: none;
    font-size: 1.5rem;
    padding: 10px;
    border-radius: 50%;
    margin: 14px;
    cursor: pointer;

    transition: background 0.25s ease-in-out;

    &:hover {
        background: #E9C46A;
        color: #264653;
    }
`

const Range = styled.input.attrs({ type: 'range' })`
    -webkit-appearance: none;
    width: 170px;
    height: 10px;
    border-radius: 5px;  
    background: #fefae0;
    outline: none;
    margin: 5px;

    &::-webkit-slider-thumb {
        -webkit-appearance: none;
        width: 20px;
        height: 20px;
        border-radius: 12.5px; 
        background:  #264653;
        cursor: pointer;
        transition: background 0.25s ease-in-out;
    }

    &:hover::-webkit-slider-thumb {
        background: #E9C46A;
    }
`;




export default function Player({ currentSong, player, togglePlay, changeVolume, stopPlaying }) {

    return (
        <PlayerContainer>
            <ReactPlayer
                width='0%'
                height='0%'
                url={currentSong?.preview}
                playing={player.isPlaying}
                volume={player.volume}
                onEnded={stopPlaying}
                onError={e => console.log(e)}
            />
            <Button onClick={togglePlay} $playing={player.isPlaying}>{player.isPlaying ? <FaPause /> : <FaPlay />}</Button>
            <Volume>
                <label htmlFor="volume">Volume</label>
                <Range id='volume' type='range' min={0} max={1} step={0.1} value={player.volume} onChange={changeVolume} />
            </Volume>
        </PlayerContainer>
    );
}