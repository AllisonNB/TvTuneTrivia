import { useState, useEffect, useContext } from 'react';
import { styled } from 'styled-components';

import Playlists from './Components/Playlists';
import SongDisplay from './Components/SongDisplay/SongDisplayContainer';

import PlaylistContextProvider from './store/PlaylistContext';
import './app.css'


const Main = styled.main` 
  display: flex;
  height: 100vh;
  background-color: #E76F51;
`

function App() {
  const [isCorrect, setIsCorrect] = useState(false);


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
