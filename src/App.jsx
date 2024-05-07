import { styled } from 'styled-components';
import { useEffect, useState } from 'react';

import Playlists from './Components/Playlists';
import AlbumCover from './Components/AlbumCover';
import Player from './Components/Player';
import Guesser from './Components/Guesser';


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


const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_CLIENT_SECRET;


function App() {
  const [token, setToken] = useState(null);


  useEffect(() => {
    const getToken = async () => {
      const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        body: `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        }
      });
      const resData = await response.json();
      setToken(resData.access_token)
    }

    getToken();
  }, [])







  return (
    <Main>
      <Playlists />
      <SongDisplay>
        <AlbumCover />
        <Player />
        <Guesser />
      </SongDisplay>
    </Main>
  )
}

export default App
