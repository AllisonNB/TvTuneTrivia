import express from "express";
import SpotifyWebApi from 'spotify-web-api-node'

const app = express();



app.post('/login', (req, res) => {
    const code = req.body.code

    const spotifyApi = new SpotifyWebApi({
        clientId: import.meta.env.VITE_CLIENT_ID,
        clientSecret: import.meta.env.VITE_CLIENT_SECRET,
        redirectUri: 'http://localhost:5173'
    })

    spotifyApi.authorizationCodeGrant(code)
        .then(data => {
            res.json({
                accessToken: data.body.access_token,
                refreshToken: data.body.refresh_token,
                expiration: data.body.expires_in
            })
        })
        .catch(() => {
            res.sendStatus(400)
        })
});



app.listen(8080, () => {
    console.log('listening on port 8080');
})












