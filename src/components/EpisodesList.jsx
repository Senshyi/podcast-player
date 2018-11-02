import React, { Component } from 'react';
import map from 'lodash.map'

class EpisodesList extends Component {
  state = {
    episodes: {}
  }
  render() {
    return (
      <div>
        {map(this.state.episodes, (episode, i) => {
          return <div key={i}>
            <h1>{episode.title}</h1>
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