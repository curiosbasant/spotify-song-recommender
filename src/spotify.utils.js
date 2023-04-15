import { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } from "./constants.js"

export function getSpotifyAccessToken() {
  const encodedToken = Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString(
    "base64"
  )

  return fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${encodedToken}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "client_credentials",
    }),
  })
    .then((res) => res.json())
    .then((data) => data.access_token)
}

export function searchSong(accessToken, songTitle, artistName) {
  return fetch(
    `https://api.spotify.com/v1/search?q=track:${songTitle}+artist=${artistName}&type=track`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  )
    .then((res) => res.json())
    .then((data) => data.tracks.items?.[0] || null)
}

export function getRecommendedSongsFromSpotify(accessToken, songId) {
  return fetch(`https://api.spotify.com/v1/recommendations?seed_tracks=${songId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
  })
    .then((res) => res.json())
    .then((data) => data.tracks)
}
