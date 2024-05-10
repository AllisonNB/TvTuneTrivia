import { useContext } from "react";
import { styled } from "styled-components";


import { SongContext } from '../store/SongContext';

const List = styled.div`
    border: 2px solid blue;
    width: 15%;
    margin: 0;
    padding-top: 10%;

    & h1 {
        font-size: 1rem;
    }
`



export default function Playlists() {

    const songInfo = useContext(SongContext);

    const playlist = songInfo.active_playlist;

    return (
        <List>
            <h1>{playlist}</h1>
        </List>
    )
}