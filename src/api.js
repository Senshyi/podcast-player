export const fetchEpisodes = () => {
  return fetch('https://api.spreaker.com/v2/shows/1433865/episodes')
    .then(buffer => buffer.json())
}