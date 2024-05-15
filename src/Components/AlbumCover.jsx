import { useContext, useEffect } from "react";

import { PlaylistContext } from "../store/PlaylistContext";
import { styled } from "styled-components";




const Album = styled.div`
    border: 2px solid orange;
    width: 60%;
    margin: 0 20% 5% 20%;

    & img {
        width: 100%;
        height: auto;
        filter: blur(1.5rem)
    }

`

export default function AlbumCover() {

    const { tracks } = useContext(PlaylistContext);

    const randIndex = Math.floor(Math.random() * tracks?.length);


    return (
        <Album>
            <img src={tracks?.[randIndex].image} alt="disguised album cover" />
        </Album>
    )
}
