import { useState } from "react";
import { styled } from "styled-components";


const FormContainer = styled.div`
    margin: auto 14px;
    padding: 14px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 1.2rem;
    color: #264653;

    & div {
        display: flex;
        justify-content: space-between;
        margin: 0 0 5px 0; 
    }

    form {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
`

const Input = styled.input`
        border: none;
        border-radius: 10px;
        background: #fefae0;
        margin: 0 0 0 14px;
        ${props => props.$numOfGuesses > 0 && `border: ${props.$isCorrect ? '4px solid green;' : '4px solid red;'}}`}
`

const Button = styled.button`
        background: #264653;
        color: #fefae0;
        font-size: 1rem;
        border: none;
        padding: 10px;
        margin: 2px;
        border-radius: 10px;
        cursor: pointer;
        transition: background 0.25s ease-in-out;

    & :hover {
        background: #E9C46A;
        color: #264653;
    }
`



export default function Guesser({ isCorrect, setIsCorrect, currentSong, getSong, tracks, stopPlaying }) {

    const trackName = currentSong?.name

    const [guess, setGuess] = useState('');
    const [numOfGuesses, setNumOfGuesses] = useState(0);

    const handleChange = (evt) => {
        setGuess(evt.target.value);
    };


    const evaluateGuess = () => {
        const removedWords = ['theme', 'series', 'from', 'theme', 'the', 'Tv', 'main', ' - ', 'title', 'medley', 'song'];

        const wordsRegex = new RegExp('\\b(' + removedWords.join('|') + ')\\b', 'gi');
        const parenthesesRegex = /\(.*?\)/gi;

        const editedTrack = trackName?.replace(wordsRegex, '').replace(parenthesesRegex, '').trim().toLowerCase().split(' ');
        const editedGuess = guess?.toLowerCase().trim().split(' ');
        const commonWords = editedTrack?.filter(word => editedGuess.includes(word));

        if (commonWords.length === editedTrack.length) {
            setIsCorrect(true)
        } else {
            setIsCorrect(false)
        }
    };


    const handleSubmit = (evt) => {
        evt.preventDefault();
        evaluateGuess();
        setNumOfGuesses(prevNumOfGuesses => prevNumOfGuesses + 1);
    };

    return (
        <FormContainer >
            <form action="submit" >
                <div>
                    <label htmlFor="title">What's your guess?</label>
                    <Input id="title" name="guess" type="text" onChange={handleChange} value={guess} $isCorrect={isCorrect} $numOfGuesses={numOfGuesses} />
                </div>
                <div>
                    <Button onClick={handleSubmit}>Submit Guess</Button>
                    <Button type='button' onClick={() => setIsCorrect(true)}>Reveal?</Button>
                    {tracks?.length === 0 ? <p>Finished!</p> :
                        <Button
                            type='button'
                            onClick={() => { getSong(true); setGuess(''); setNumOfGuesses(0); stopPlaying() }}
                        >
                            Next Song
                        </Button>
                    }
                </div>
            </form>
        </FormContainer>
    )
}