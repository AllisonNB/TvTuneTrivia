import { useState, useEffect, useContext } from "react";
import { styled } from "styled-components";

import Playlists from "./Components/Playlists";
import SongDisplay from "./Components/SongDisplay/SongDisplay";
import Alert from "./Components/Alert";

import PlaylistContextProvider from "./store/PlaylistContext";
import "./app.css";

const Main = styled.main`
  display: flex;
  height: 100vh;
  background-color: #e76f51;
`;

function App() {
  const [showAlert, setShowAlert] = useState(true);

  const hideAlert = () => {
    setShowAlert(false); //only needs to show on initial load
  };

  return (
    <PlaylistContextProvider>
      <Main>
        {showAlert && <Alert hideAlert={hideAlert} />}
        <Playlists />
        <SongDisplay />
      </Main>
    </PlaylistContextProvider>
  );
}

export default App;
