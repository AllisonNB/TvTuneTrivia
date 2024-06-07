import { useContext } from "react";

import { PlaylistContext } from "../store/PlaylistContext";
import styled from "styled-components";


const Album = styled.div`
    width: 60%;
    margin: 0 20% 5% 20%;

    & img {
        width: 100%;
        height: auto;
        filter: ${props => props.$reveal ? undefined : 'blur(1.5rem);'}
    }
`

export default function AlbumCover({ isCorrect }) {
    const { currentTrack, isLoading } = useContext(PlaylistContext);

    return (
        <Album $reveal={isCorrect}>
            {
                isLoading ? 'CHICKEN' : <img src={currentTrack?.image} alt="blurred album cover" />
            }

        </Album>
    )
}
