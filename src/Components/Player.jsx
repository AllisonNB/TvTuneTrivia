import React, { useState, useContext } from 'react';
import ReactPlayer from 'react-player';

import { PlaylistContext } from "../store/PlaylistContext";
import { styled } from "styled-components";



const PlayerContainer = styled.div`
    border: 2px solid pink;
    padding: 2% 2%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
`



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
            <div>
                <button onClick={togglePlay}>{player.isPlaying ? 'Pause' : 'Play'}</button>
            </div>
            <div>
                <input type='range' min={0} max={1} step={0.1} value={player.volume} onChange={changeVolume} />
            </div>
        </PlayerContainer>
    );
}