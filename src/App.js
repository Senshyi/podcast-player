import React, { Component } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import EpisodesList from './components/EpisodesList';
import Player from './components/Player';

class App extends Component {
  state = {
    playing: false,
    episodes: {},
    currentlyPlaying: {}
  }
  render() {
    return (
      <div className="App">
        {Object.keys(this.state.currentlyPlaying).length !== 0 && <audio ref='audio' src={`https://api.spreaker.com/v2/episodes/${this.state.currentlyPlaying.episode_id}/play`}></audio>}
        <Navbar />
        <EpisodesList episodes={this.state.episodes} selectEpisode={this.selectEpisode} />
        <Player episode={this.state.currentlyPlaying} playing={this.state.playing} play={this.play} pause={this.pause} audio={this.refs.audio}/>
      </div>
    );
  }

  componentDidMount() {
    fetch('https://api.spreaker.com/v2/shows/1433865/episodes')
      .then(buffer => buffer.json())
      .then(({ response: { items } }) => {
        this.setState({
          episodes: items
        })
      })
  }

  selectEpisode = (episode) => {
    if (episode.episode_id === this.state.currentlyPlaying.episode_id) {
      this.state.playing ? this.pause() : this.play()
    } else {
      this.setState({
        currentlyPlaying: episode,
      }, _ => this.play())
    }
  }
  pause = () => {
    this.refs.audio.pause();
    this.setState({
      playing: false
    })
  }
  play = () => {
    this.refs.audio.play()
    this.setState({
      playing: true
    })
  }
}

export default App;
