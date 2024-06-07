import { useState, useContext } from "react";


import { styled } from "styled-components";



const FormContainer = styled.div`
    border: 2px solid purple;
    margin: 2% 0 2% 0;
    height: 25%;
    display: flex;
    justify-content: center;
`

import { PlaylistContext } from "../store/PlaylistContext";

export default function Guesser({ setIsCorrect }) {

    const { currentTrack } = useContext(PlaylistContext);
    const trackName = currentTrack?.name

    const [guess, setGuess] = useState('');

    const handleChange = (evt) => {
        setGuess(evt.target.value);
    };


    let removedWords = ['theme', 'series', 'from', 'theme', 'the', 'Tv', 'main', ' - ', 'title', 'medley', 'song'];

    let wordsRegex = new RegExp('\\b(' + removedWords.join('|') + ')\\b', 'gi');
    let parenthesesRegex = /\(.*?\)/gi;

    let editedTrack = trackName?.replace(wordsRegex, '').replace(parenthesesRegex, '').trim().toLowerCase().split(' ');
    let editedGuess = guess.toLowerCase().trim().split(' ');

    console.log(editedTrack, 'chicken t')
    console.log(editedGuess, 'chicken')

    const evaluateGuess = () => {
        let commonWords = editedTrack?.filter(word => editedGuess.includes(word));

        if (commonWords.length === editedTrack.length) {
            setIsCorrect(true)
        } else {
            setIsCorrect(false)
        }
    }


    const handleSubmit = (evt) => {
        evt.preventDefault();
        evaluateGuess();
    };


    return (
        <FormContainer>
            <form action="submit">
                <div>
                    <label htmlFor="title">Guess the Show!</label>
                    <input id="title" name="guess" type="text" onChange={handleChange} value={guess} />
                </div>
                <div>
                    <button onClick={handleSubmit}>Submit</button>
                </div>
            </form>
        </FormContainer>
    )
}