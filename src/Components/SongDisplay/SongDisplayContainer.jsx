import { PlaylistContext } from "../../store/PlaylistContext";
import { useState, useEffect, useContext } from 'react';

import { styled } from 'styled-components';
import Header from './Header';
import AlbumCover from './AlbumCover';
import Player from './Player';
import Guesser from './Guesser';



const SongDisplayContainer = styled.div`
  width: 850px;
  margin: 10px 10px 10px 120px;
  display: flex;
  flex-direction: column;
`

const SongDisplay = ({ isCorrect, setIsCorrect }) => {
    const { tracks } = useContext(PlaylistContext);

    const [currentSong, setCurrentSong] = useState({});
    const [player, setPlayer] = useState({
        url: null,
        isPlaying: false,
        volume: 0.5,
    });


    const getSong = (resetAlbumCover) => {
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


    return (
        <SongDisplayContainer>
            <Header />
            <AlbumCover isCorrect={isCorrect} currentSong={currentSong} />
            <Player currentSong={currentSong} player={player} togglePlay={togglePlay} changeVolume={changeVolume} stopPlaying={stopPlaying} />
            <Guesser isCorrect={isCorrect} setIsCorrect={setIsCorrect} currentSong={currentSong} getSong={getSong} tracks={tracks} stopPlaying={stopPlaying} />
        </SongDisplayContainer>
    )
}

export default SongDisplay