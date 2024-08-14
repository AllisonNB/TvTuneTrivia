import { createContext, useState, useEffect } from "react";


//variables
const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_CLIENT_SECRET;
const tvPlaylistId = '17lPiWULrpKQWLrOGJy8Ls'



//context
export const PlaylistContext = createContext({
    playlistName: null,
    tracks: [{ name: null, image: null, preview: null }],
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