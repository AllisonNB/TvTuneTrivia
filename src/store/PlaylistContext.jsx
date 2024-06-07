import { createContext, useState, useEffect } from "react";
import axios from 'axios';


//variables
const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_CLIENT_SECRET;
const tvPlaylistId = '17lPiWULrpKQWLrOGJy8Ls'



//context
export const TokenContext = createContext({
    access_token: null,
    token_expiration: null,
});

export const PlaylistContext = createContext({
    playlistName: null,
    tracks: [{ name: null, image: null, preview: null }],
    currentTrack: [{ name: null, image: null, preview: null }],
    isLoading: false
})

//context provider component
export default function PlaylistContextProvider({ children }) {

    const [playlist, setPlaylist] = useState(PlaylistContext);


    const getPlaylist = async () => {
        setPlaylist(
            {
                ...playlist,
                isLoading: true
            }
        )
        const initialResponse = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            body: `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        });

        const tokenResponse = await initialResponse.json();

        const playlistResponse = await fetch(`https://api.spotify.com/v1/playlists/${tvPlaylistId}`, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + tokenResponse.access_token,
            },
        });

        const playlistData = await playlistResponse.json();
        const playlistName = playlistData.name;
        const allTracks = playlistData.tracks.items;

        const tracks = allTracks
            .filter(song => song.track.preview_url !== null && song.track.album.name !== null && song.track.album.images[1].url)
            .map(song => ({
                name: song.track.name,
                image: song.track.album.images[1].url,
                preview: song.track.preview_url
            }));

        setPlaylist({ ...playlist, playlistName, tracks, isLoading: false });

        const randIndex = Math.floor(Math.random() * tracks.length);
        const currentTrack = {
            name: tracks[randIndex].name,
            image: tracks[randIndex].image,
            preview: tracks[randIndex].preview
        }

        setPlaylist({ playlistName, tracks, currentTrack, isLoading: false });


        // const randIndex = Math.floor(Math.random() * trackList.length);
        // const currentTrackIndex = trackList.indexOf(randIndex)
        // const currentSong = trackList.splice(currentTrackIndex, 1)

        // setPlaylist({ playlistName, tracks: trackList, currentTrack: currentSong[0], isLoading: false });
    }


    useEffect(() => {
        getPlaylist();
    }, [])

    return (
        <PlaylistContext.Provider value={playlist}>
            {children}
        </PlaylistContext.Provider>
    )


}