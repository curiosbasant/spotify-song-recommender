function main() {}

async function submitForm(ev) {
  ev.preventDefault()
  const songTitle = ev.currentTarget.elements.namedItem("songTitle").value
  const artistName = ev.currentTarget.elements.namedItem("artistName").value

  const recommendedSongs = await fetch(
    `/recommendations?${new URLSearchParams({
      songTitle,
      artistName,
    })}`
  ).then((res) => res.json())

  console.log(recommendedSongs)

  const songsListElement = document.getElementById("recommended-songs-list")
  console.log(songsListElement)

  songsListElement.innerHTML = recommendedSongs
    .slice(0, 3)
    .reduce(
      (acc, song) =>
        acc +
        `<li class="rounded-md bg-slate-200"><a href=${song.external_urls.spotify} type="__blank">${song.name}<a></li>`,
      ""
    )
}
