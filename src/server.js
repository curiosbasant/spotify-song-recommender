import express from "express"
import path from "path"

import { PORT } from "./constants.js"
import {
  getRecommendedSongsFromSpotify,
  getSpotifyAccessToken,
  searchSong,
} from "./spotify.utils.js"

const rootDirectory = path.resolve()

const app = express()
app.use(express.static("public"))

app.get("/", (req, res) => {
  res.status(400).sendFile(rootDirectory + "/public/index.html")
})

app.get("/recommendations", async (req, res) => {
  const { songTitle, artistName } = req.query || null

  if (!songTitle || !artistName) {
    res.json({
      message: "Please provide valid data!",
    })
    return
  }

  try {
    const accessToken = await getSpotifyAccessToken()
    const searchedSong = await searchSong(accessToken, songTitle, artistName)

    if (!searchedSong) {
      res.status(404).json({
        message: "That is song is not available!",
      })
      return
    }

    const recommendedSongs = await getRecommendedSongsFromSpotify(accessToken, searchedSong.id)
    res.json(recommendedSongs)
  } catch (err) {
    console.log(err.message)
    res.status(500).json({ message: "Something had got failed!" })
  }
})

app.listen(PORT, () => {
  console.log(`The application is started on http://localhost:${PORT}`)
})
