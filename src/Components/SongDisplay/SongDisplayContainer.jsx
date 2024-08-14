import { PlaylistContext } from "../../store/PlaylistContext";
import { useState, useEffect, useContext } from 'react';

import { styled } from 'styled-components';
import Header from './Header';
import AlbumCover from './AlbumCover';
import Player from './Player';
import Guesser from './Guesser';



const SongDisplayContainer = styled.div`
  display: flex;
  flex-direction: column;

    @media (max-width: 600px) { 
       width: 375px;
    }

    @media (min-width: 601px) and (max-width: 1023px) { 
        min-width: 600px;
        max-width: 800px;
    }

    @media (min-width: 1024px) { 
        min-width: 800px;
    }
`

export default function SongDisplay() {
    const { tracks } = useContext(PlaylistContext);

    const [isCorrect, setIsCorrect] = useState(false);
    const [currentSong, setCurrentSong] = useState({});
    const [player, setPlayer] = useState({
        url: null,
        isPlaying: false,
        volume: 0.5,
    });


    const getSong = (resetAlbumCover) => {
        if (player.isPlaying) {
            togglePlay();
        }
        const randIndex = Math.floor(Math.random() * tracks?.length);
        const current = tracks?.splice(randIndex, 1)
        setCurrentSong(current?.[0]);

        if (resetAlbumCover) {
            setIsCorrect(false)
        }
    }

    useEffect(() => {
        getSong()
    }, [tracks])


    const togglePlay = () => {
        setPlayer(prevplayer => ({ ...prevplayer, isPlaying: !prevplayer.isPlaying }));
    }

    const changeVolume = (event) => {
        setPlayer(prevplayer => ({ ...prevplayer, volume: +event.target.value }));
    }

    const stopPlaying = () => {
        setPlayer(prevplayer => ({ ...prevplayer, isPlaying: false }));
    }

    const resetPlayer = () => {
        if (player.isPlaying) {
            togglePlay();
        }
    }

    return (
        <SongDisplayContainer>
            <Header />
            <AlbumCover isCorrect={isCorrect} currentSong={currentSong} />
            <Player currentSong={currentSong} player={player} togglePlay={togglePlay} changeVolume={changeVolume} stopPlaying={stopPlaying} />
            <Guesser isCorrect={isCorrect} setIsCorrect={setIsCorrect} currentSong={currentSong} getSong={getSong} tracks={tracks} resetPlayer={resetPlayer} />
        </SongDisplayContainer>
    )
}
