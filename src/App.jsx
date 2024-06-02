import { useState, useEffect } from 'react';
import { styled } from 'styled-components';

import Playlists from './Components/Playlists';
import AlbumCover from './Components/AlbumCover';
import Player from './Components/Player';
import Guesser from './Components/Guesser';

import PlaylistContextProvider from './store/PlaylistContext';


const Main = styled.main`
  border: 2px solid green;
  display: flex;
`

const SongDisplay = styled.div`
  border: 2px solid black;
  width: 60%;
  margin: 1% 1% 1% 10%;
  display: flex;
  flex-direction: column;
`

//utilize react routing to make sure data is loaded before components render? --> will limit excessive re-rendering?
function App() {

  return (
    <PlaylistContextProvider>
      <Main>
        <Playlists />
        <SongDisplay>
          <AlbumCover />
          <Player />
          <Guesser />
        </SongDisplay>
      </Main>
    </PlaylistContextProvider>
  )
}

export default App
