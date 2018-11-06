export const fetchEpisodes = () => {
  return fetch("https://api.spreaker.com/v2/shows/1433865/episodes").then(
    buffer => buffer.json()
  );
};

export const fetchSingleEpisode = episodeId => {
  return fetch(`https://api.spreaker.com/v2/episodes/${episodeId}`).then(
    buffer => buffer.json()
  );
};
