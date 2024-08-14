import { useState } from "react";
import { styled } from "styled-components";


const FormContainer = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #264653;
    margin: 10px 20px;
    font-size: 1rem;
    font-weight: 700;
    text-align: center;
    gap: 10px;

    & div {
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
        row-gap: 15px;
        margin-top: 10px;

        @media (min-width: 1025px) { 
            min-width: 600px;    
            flex-wrap: nowrap;
            column-gap: 15px;
        }
    }

    @media (min-width: 1025px) { 
        margin: 20px 20px;
        font-size: 1.5rem;
    }
`
const Input = styled.input`
        border: none;
        border-radius: 10px;
        background: #fefae0;
        margin: 0 0 0 5px;
        height: 20px;
        width: 200px;
        ${props => props.$numOfGuesses > 0 && `border: ${props.$isCorrect ? '4px solid green;' : '4px solid red;'}}`}
`
const Button = styled.button`
        background: #264653;
        color: #fefae0;
        font-weight: 400;
        border: none;
        padding: 1rem;
        border-radius: 10px;
        cursor: pointer;
        transition: background 0.25s ease-in-out;

    & :hover, 
    &:focus {
        background: #E9C46A;
        color: #264653;
    }

    @media (max-width: 1024px) { 
        margin-right: 5px;
    }

    @media (min-width: 1025px) { 
        font-size: 1rem;
        padding: 1rem;
    }
`

const Feedback = styled.div`
    display: flex; 
    align-items: center; 
    justify-content: center;
    gap: 5px;
`


export default function Guesser({ isCorrect, setIsCorrect, currentSong, getSong, tracks, resetPlayer }) {

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
        <FormContainer action="submit">
            <label htmlFor="title">What's your guess?</label>
            <Feedback aria-live='polite'>
                <Input
                    id="title"
                    name="guess"
                    type="text"
                    onChange={handleChange}
                    value={guess}
                    $isCorrect={isCorrect}
                    $numOfGuesses={numOfGuesses}
                />
                {isCorrect && numOfGuesses > 0 ? <p aria-label='feedback'>Correct!</p> : null}
                {!isCorrect && numOfGuesses > 0 ? <p aria-label='feedback'>Incorrect!</p> : null}
            </Feedback>
            <div>
                <Button
                    onClick={handleSubmit}
                    aria-label='submit guess'
                >
                    Submit
                </Button>
                <Button
                    type='button'
                    onClick={() => setIsCorrect(true)}
                    aria-label='reveal song'
                >
                    Reveal
                </Button>
                <Button
                    type='button'
                    onClick={() => { resetPlayer(); getSong(true); setGuess(''); setNumOfGuesses(0); }}
                    disabled={tracks?.length === 0}
                >
                    {tracks?.length === 0 ? 'Finished!' : 'Next Song'}
                </Button>
            </div>
        </FormContainer>
    )
}