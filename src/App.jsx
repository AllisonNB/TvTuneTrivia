import { useState, useEffect, useContext } from 'react';
import { styled } from 'styled-components';

import Playlists from './Components/Playlists';
// import AlbumCover from './Components/AlbumCover';
// import Player from './Components/Player';
// import Guesser from './Components/Guesser';
import SongDisplay from './Components/SongDisplay/SongDisplayContainer';

import PlaylistContextProvider from './store/PlaylistContext';
import './app.css'


const Main = styled.main`
  display: flex;
  height: 100vh;
  width: 100%;
  background-color: #E76F51;
`

function App() {
  const [isCorrect, setIsCorrect] = useState(false)

  return (
    <PlaylistContextProvider>
      <Main>
        <Playlists />
        <SongDisplay isCorrect={isCorrect} setIsCorrect={setIsCorrect} />
      </Main>
    </PlaylistContextProvider>
  )
}

export default App
