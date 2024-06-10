import { useContext } from "react";

import { PlaylistContext } from "../../store/PlaylistContext";
import styled from "styled-components";


const Album = styled.div`
    width: 60%;
    margin: 0 auto;
    text-align: center;

    & img {
        max-width: 500px;
        width: 100%;
        filter: ${props => props.$reveal ? undefined : 'blur(1.5rem);'}
    }


`

export default function AlbumCover({ isCorrect, currentSong, tracks }) {
    const { isLoading } = useContext(PlaylistContext);

    return (
        <Album $reveal={isCorrect}>
            {
                isLoading ? <div className='test'>retrieving poster...</div> : <img src={currentSong?.image} alt="blurred album cover" />
            }
        </Album>
    )
}
