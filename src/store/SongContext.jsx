import { createContext, useState, useEffect } from "react";
import axios from 'axios';


//variables
const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_CLIENT_SECRET;

const tvPlaylistId = '2GZYy4NQKYIRCqvRhIdnJH'



//context
export const SongContext = createContext({
    access_token: null,
    token_expiration: null,
    active_playlist: null,
    active_song: null,
});


//context provider component
export default function SongContextProvider({ children }) {

    const [songData, setSongData] = useState({
        access_token: null,
        token_expiration: null,
        active_playlist: null,
        active_song: null,
    });



    useEffect(() => {

        axios('https://accounts.spotify.com/api/token', {
            method: 'POST',
            data: `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        })
            .then(tokenResponse => {
                setSongData(oldSongData => {
                    return {
                        ...oldSongData,
                        access_token: tokenResponse.data.access_token,
                        token_expiration: tokenResponse.data.expires_in,
                    }
                });


                axios(`https://api.spotify.com/v1/playlists/${tvPlaylistId}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': 'Bearer ' + tokenResponse.data.access_token,
                    }
                })
                    .then(playlistResponse => {
                        setSongData(prevSongData => {
                            return {
                                ...prevSongData,
                                active_playlist: playlistResponse.data.name
                            }
                        })
                    });
            });
    }, [])



    const ctxValue = songData




    return (
        <SongContext.Provider value={ctxValue}>
            {children}
        </SongContext.Provider>
    )


}