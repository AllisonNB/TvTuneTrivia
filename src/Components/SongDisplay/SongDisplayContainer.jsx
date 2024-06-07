
import { useState, useEffect, useContext } from 'react';
import { styled } from 'styled-components';
import AlbumCover from '../AlbumCover';
import Player from '../Player';
import Guesser from '../Guesser';

import { PlaylistContext } from "../../store/PlaylistContext";


const SongDisplayContainer = styled.div`
  border: 2px solid black;
  width: 60%;
  margin: 1% 1% 1% 10%;
  display: flex;
  flex-direction: column;
`

const SongDisplay = ({ isCorrect, setIsCorrect }) => {
    const { tracks } = useContext(PlaylistContext)

    console.log(tracks, 'TEST')
    return (
        <SongDisplayContainer>
            <AlbumCover isCorrect={isCorrect} />
            <Player />
            <Guesser setIsCorrect={setIsCorrect} />
        </SongDisplayContainer>
    )
}

export default SongDisplay