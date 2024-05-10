import { styled } from 'styled-components';

import Playlists from './Components/Playlists';
import AlbumCover from './Components/AlbumCover';
import Player from './Components/Player';
import Guesser from './Components/Guesser';

import SongContextProvider from './store/SongContext';


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




function App() {


  return (
    <SongContextProvider>
      <Main>
        <Playlists />
        <SongDisplay>
          <AlbumCover />
          <Player />
          <Guesser />
        </SongDisplay>
      </Main>
    </SongContextProvider>
  )
}

export default App
