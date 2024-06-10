import { useContext, useState } from "react";
import { styled } from "styled-components";

import { PlaylistContext } from "../store/PlaylistContext";


const List = styled.div`
    width: 15%;
    margin: 5% 0 5% 0;
    padding: 10% 1% 1% 1%;
    background-color: #264653;
    border-radius: 0 5% 5% 0; 
`

const Item = styled.li`
    list-style-type: none;  
    margin-bottom: 20px;  
    font-family: "Lilita One", sans-serif;
    font-weight: 400;
    font-style: normal;
    font-size: 2.2rem;
    color: #fefae0;
`



export default function Playlists() {

    const { playlistName } = useContext(PlaylistContext);



    return (
        <List>
            <Item>{playlistName}</Item>
        </List>
    )
}