import { useContext } from "react";
import { styled } from "styled-components";

import { PlaylistContext } from "../store/PlaylistContext";


const List = styled.div`
    border: 2px solid blue;
    width: 15%;
    margin: 0;
    padding: 10% 1% 1% 1%;

    & h1 {
        font-size: 1rem;
    }
`



export default function Playlists() {

    const { playlist } = useContext(PlaylistContext);


    return (
        <List>
            <h1>{playlist}</h1>
        </List>
    )
}