import React, { useState, useContext } from 'react';
import ReactPlayer from 'react-player';

import { PlaylistContext } from "../store/PlaylistContext";
import { styled } from "styled-components";



const PlayerContainer = styled.div`
    font-family: "LXGW WenKai Mono TC", monospace;
    font-weight: 700;
    font-style: normal;
    color: #fefae0;
    border: 2px solid pink;
    padding: 3% 3%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
`

const Volume = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 1.2rem;
`

const Button = styled.button`
    font-family: "LXGW WenKai Mono TC", monospace;
    font-weight: 700;    
    font-size: 2rem;
    background: #264653;
    color: #fefae0;
    border: none;
    border-radius: 50%;
    padding: 5%;
    margin: 2% 2%;
    cursor: pointer;
    transition: background 0.25s ease-in-out;

    &:hover {
        background: #E9C46A;
        color: #264653;
        font-weight: 700;
    }
`


const Range = styled.input.attrs({ type: 'range' })`
    -webkit-appearance: none;
    width: 100%;
    height: 25%;
    border-radius: 5px;  
    background: #fefae0;
    outline: none;
    margin: 5% 5%;

    &::-webkit-slider-thumb {
        -webkit-appearance: none;
        width: 25px;
        height: 25px;
        border-radius: 50%; 
        background: #2A9D8F;
        cursor: pointer;
        transition: background 0.25s ease-in-out;
    }

    &:hover::-webkit-slider-thumb {
        background: #E9C46A;
    }
`;







export default function Player() {

    const { currentTrack } = useContext(PlaylistContext);

    const [player, setPlayer] = useState({
        url: null,
        isPlaying: false,
        volume: 0.5,
    });

    const togglePlay = () => {
        setPlayer(prevplayer => ({ ...prevplayer, isPlaying: !prevplayer.isPlaying }));
    }

    const changeVolume = (event) => {
        setPlayer(prevplayer => ({ ...prevplayer, volume: +event.target.value }));
    }

    const handleSongEnd = () => {
        setPlayer(prevplayer => ({ ...prevplayer, isPlaying: false }));
    }

    return (
        <PlayerContainer>
            <ReactPlayer
                width='0%'
                height='0%'
                url={currentTrack?.preview}
                playing={player.isPlaying}
                volume={player.volume}
                onEnded={handleSongEnd}
                onError={e => console.log(e)}
            />
            <Button onClick={togglePlay}>{player.isPlaying ? 'Pause' : 'Play'}</Button>
            <Volume>
                <label htmlFor="volume">Volume</label>
                <Range id='volume' type='range' min={0} max={1} step={0.1} value={player.volume} onChange={changeVolume} />
            </Volume>
        </PlayerContainer>
    );
}