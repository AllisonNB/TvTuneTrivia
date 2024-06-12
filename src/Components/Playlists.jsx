import { useContext, useState } from "react";
import { styled } from "styled-components";

import { PlaylistContext } from "../store/PlaylistContext";


const List = styled.div`
    font-family: "Marhey", sans-serif;   
    background-color: #264653;
    border-radius: 0 2% 0 0;
    list-style-type: none;  
    color: #fefae0; 

    @media (max-width: 600px) { 
        min-width: 70px;
        margin: 75px 0 75px 0;
        padding: 15px 0 0 5px;
        font-weight: 300;
        font-size: 0.75rem;
    }

    @media (min-width: 601px) and (max-width: 1024px) { 
        min-width: 100px;
        margin: 50px 0 0 0;
        padding: 10px 10px 0 15px;
        font-weight: 500;
        font-size: 1.2rem;
        
    }

    @media (min-width: 1025px) { 
        max-width: 400px;
        min-width: 250px;
        margin: 150px 0 0 0;
        padding:  30px 10px 0 15px;
        font-weight: 700;
        font-size: 2.2rem;
    }
`


export default function Playlists() {

    const { playlistName } = useContext(PlaylistContext);



    return (
        <List>
            <li>{playlistName}</li>
        </List>
    )
}