import React, { Component } from 'react';
import map from 'lodash.map';

class EpisodesList extends Component {
  state = {
    episodes: {}
  }
  render() {
    return (
      <div>
        {map(this.state.episodes, (episode, i) => {
          return <div key={i}>
            <img src={episode.image_url} alt="episode"/>
            <h3>{episode.title}</h3>
          </div>
        })}
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
}

export default EpisodesList;