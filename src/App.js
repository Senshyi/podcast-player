import React, { Component } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import EpisodesList from './components/EpisodesList';
import Player from './components/Player';

class App extends Component {
  render() {
    return (
      <div className="App">
      <Navbar />
      <EpisodesList />
      <Player />
      </div>
    );
  }
}

export default App;
