import React, { Component } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import EpisodesList from './components/EpisodesList';
import Player from './components/Player';
import EpisodeCard from './components/EpisodeCard';
import * as api from './api'
import { Route } from 'react-router-dom';

class App extends Component {
  state = {
    playing: false,
    episodes: [],
    filteredEp: [],
    currentlyPlaying: {},
    episodeIndex: 0
  }
  render() {
    return (
      <div className="App">
        {Object.keys(this.state.currentlyPlaying).length !== 0 && <audio ref='audio' src={`https://api.spreaker.com/v2/episodes/${this.state.currentlyPlaying.episode_id}/play`}></audio>}
        <Navbar filter={this.filterEpisodes}/>
        <Route path='/episodes/:episode_id' render={({match}) =><EpisodeCard match={match} /> } />
        <Route exact path='/' render={({ match }) => <EpisodesList match={match} episodes={this.state.filteredEp.length ? this.state.filteredEp : this.state.episodes} selectEpisode={this.selectEpisode} 
          index={this.state.episodeIndex} playing={this.state.playing} setEpisode={this.setEpisode}/> } />
        <Player episode={this.state.currentlyPlaying} playing={this.state.playing} play={this.play} pause={this.pause} audio={this.refs.audio} next={this.nextEpisode} previous={this.previousEpisode}/>
      </div>
    );
  }

  componentDidMount() {
    api.fetchEpisodes()
      .then(({ response: { items } }) => {
        this.setState({
          episodes: items
        })
      })
  }

  filterEpisodes = (title) => {
    const filteredEp = this.state.episodes.filter(ep => ep.title.includes(title))
    this.setState({
      filteredEp
    })
  }

  selectEpisode = (episode, i) => {
    if (episode.episode_id === this.state.currentlyPlaying.episode_id) {
      this.state.playing ? this.pause() : this.play()
    } else {
      this.setState({
        currentlyPlaying: episode,
        episodeIndex: i
      }, _ => this.play())
    }
  }

  setEpisode = (episode, i) => {
    this.setState({
      currentlyPlaying: episode,
      episodeIndex: i
    })
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

  nextEpisode = () => {
    this.setState({
      currentlyPlaying: this.state.episodes[this.state.episodeIndex + 1],
      episodeIndex: this.state.episodeIndex + 1
    },_ => this.play())
  }

  previousEpisode = () => {
    this.setState({
      currentlyPlaying: this.state.episodes[this.state.episodeIndex - 1],
      episodeIndex: this.state.episodeIndex - 1
    }, _ => this.play())
  }
}

export default App;
