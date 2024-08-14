import ReactPlayer from 'react-player';

import { styled } from "styled-components";
import { FaPlay, FaPause } from "react-icons/fa";


const PlayerContainer = styled.div`  
    position: relative;
    color: #fefae0;
    margin: 10px;

    & div{
        margin: 10px 10px;
        text-align: center;
    }

    @media (max-width: 600px) { 
       font-size: 0.75rem;
    }

    @media (min-width: 601px) and (max-width: 1024px) { 
        font-size: 1rem;
    }

    @media (min-width: 1025px) { 
        font-size: 1.2rem;
    }
`
const StyledReactPlayer = styled(ReactPlayer)`  
    position: absolute;
`
const Volume = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`
const Button = styled.button`  
    background: ${props => props.$playing ? '#E9C46A;' : '#264653;'} 
    color: #fefae0;
    border: none;
    padding: 1% 2% 1% 2%;
    border-radius: 50%;
    cursor: pointer;

    transition: background 0.25s ease-in-out;

    &:hover, 
    &:focus {
        background: #E9C46A;
        color: #264653;
    }
`
const Range = styled.input.attrs({ type: 'range' })`
    -webkit-appearance: none;
    border-radius: 5px;  
    background: #fefae0;
    outline: none;
    margin: 5px;

    &::-webkit-slider-thumb {
        -webkit-appearance: none;
        border-radius: 12.5px; 
        background:  #264653;
        cursor: pointer;
        transition: background 0.25s ease-in-out;

        @media (max-width: 1024px) { 
            width: 15px;
            height: 15px;
        }

        @media (min-width: 1025px) { 
            width: 20px;
            height: 20px;
        }
    }

    &:hover::-webkit-slider-thumb,
    &:focus::-webkit-slider-thumb {
        background: #E9C46A;
    }


    @media (max-width: 600px) { 
        width: 100px;
        height: 5px;
    }

    @media (min-width: 601px) and (max-width: 1024px) { 
        width: 100px;
        height: 7px;
    }

    @media (min-width: 1025px) { 
        width: 170px;
        height: 10px;
    }
`


export default function Player({ currentSong, player, togglePlay, changeVolume, stopPlaying }) {

    return (
        <PlayerContainer>
            <StyledReactPlayer
                width='0%'
                height='0%'
                url={currentSong?.preview}
                playing={player.isPlaying}
                volume={player.volume}
                onEnded={stopPlaying}
                onError={e => console.log(e)}
            />
            <div>
                <Button 
                onClick={togglePlay} 
                $playing={player.isPlaying}
                aria-label={player.isPlaying ? 'pause song' : 'play song'}
                >
                    {player.isPlaying ? <FaPause /> : <FaPlay />}
                    </Button>
            </div>
            <div>
                <Volume>
                    <label htmlFor="volume">Volume</label>
                    <Range id='volume' type='range' min={0} max={1} step={0.1} value={player.volume} onChange={changeVolume} />
                </Volume>
            </div>
        </PlayerContainer>
    );
}