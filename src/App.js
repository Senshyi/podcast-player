import React, { Component } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import EpisodesList from "./components/EpisodesList";
import Player from "./components/Player";
import EpisodeCard from "./components/EpisodeCard";
import * as api from "./api";
import { Route } from "react-router-dom";

class App extends Component {
  state = {
    playing: false,
    episodes: [],
    filteredEp: [],
    currentlyPlaying: {},
    episodeIndex: 0
  };
  render() {
    const {
      playing,
      episodes,
      filteredEp,
      currentlyPlaying,
      episodeIndex
    } = this.state;
    return (
      <div className="App">
        {Object.keys(currentlyPlaying).length !== 0 && (
          <audio
            ref="audio"
            src={`https://api.spreaker.com/v2/episodes/${
              currentlyPlaying.episode_id
            }/play`}
          />
        )}
        <Navbar filter={this.filterEpisodes} />
        <Route
          path="/episodes/:episode_id"
          render={({ match }) => <EpisodeCard match={match} />}
        />
        <Route
          exact
          path="/"
          render={({ match }) => (
            <EpisodesList
              match={match}
              episodes={filteredEp.length ? filteredEp : episodes}
              selectEpisode={this.selectEpisode}
              index={episodeIndex}
              playing={playing}
            />
          )}
        />
        <Player
          episode={currentlyPlaying}
          playing={playing}
          play={this.play}
          pause={this.pause}
          audio={this.refs.audio}
          next={this.nextEpisode}
          previous={this.previousEpisode}
        />
      </div>
    );
  }

  componentDidMount() {
    api.fetchEpisodes().then(({ response: { items } }) => {
      this.setState({
        episodes: items.sort((a, b) => {
          return a.published_at > b.published_at ? -1 : 1;
        })
      });
    });
  }

  filterEpisodes = title => {
    const { episodes } = this.state;
    const filteredEp = episodes.filter(ep =>
      ep.title.toLowerCase().includes(title.toLowerCase())
    );
    this.setState({
      filteredEp
    });
  };

  selectEpisode = (episode, i) => {
    const { currentlyPlaying, playing } = this.state;
    if (episode.episode_id === currentlyPlaying.episode_id) {
      playing ? this.pause() : this.play();
    } else {
      this.setState(
        {
          currentlyPlaying: episode,
          episodeIndex: i
        },
        _ => this.play()
      );
    }
  };

  pause = () => {
    this.refs.audio.pause();
    this.setState({
      playing: false
    });
  };
  play = () => {
    this.refs.audio.play();
    this.setState({
      playing: true
    });
  };

  nextEpisode = () => {
    const { currentlyPlaying, episodes, episodeIndex } = this.state;
    if (Object.keys(currentlyPlaying).length) {
      this.setState(
        {
          currentlyPlaying: episodes[episodeIndex + 1],
          episodeIndex: episodeIndex + 1
        },
        _ => this.play()
      );
    }
  };

  previousEpisode = () => {
    const { currentlyPlaying, episodes, episodeIndex } = this.state;
    if (Object.keys(currentlyPlaying).length) {
      this.setState(
        {
          currentlyPlaying: episodes[episodeIndex - 1],
          episodeIndex: episodeIndex - 1
        },
        _ => this.play()
      );
    }
  };
}

export default App;
