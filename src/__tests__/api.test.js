import * as api from '../api'



describe('fetchSingleEpisode', () => {
  const episodeId = 16105972

  it('returns an object', async () => {
    const episode = await api.fetchSingleEpisode(episodeId);
    expect(typeof episode.response.episode).toBe('object');
  })
  it('returns corresponding object for passed ID', async () => {
    expect.hasAssertions();
    const res = await api.fetchSingleEpisode(episodeId);
    expect(res.response.episode.episode_id).toBe(episodeId);
    expect(res.response.episode.published_at).toBe("2018-10-31 22:09:02");
    expect(res.response.episode.author.fullname).toBe("Spreaker Live Show");
  })
})

describe('fetchEpisodes', () => {
  it('returns an array of episodes', async() => {
    expect.hasAssertions()
    const res = await api.fetchEpisodes();
    expect(Array.isArray(res.response.items)).toBe(true);
  })
  it('returned array contains objects with corresponding keys', async() => {
    expect.hasAssertions()
    const res = await api.fetchEpisodes();
    const testObj = res.response.items[0]
    expect(typeof testObj).toBe('object');
    expect(testObj).toHaveProperty('episode_id')
    expect(testObj).toHaveProperty('duration')
    expect(testObj).toHaveProperty('image_url')
    expect(testObj).toHaveProperty('title')
    expect(testObj).toHaveProperty('published_at')
  })
})