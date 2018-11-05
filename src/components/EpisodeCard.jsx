import React, { Component } from 'react';
import * as api from '../api'

class EpisodeCard extends Component {
  state = {
    episode: {}
  }
  render() {
    return (
      <div>
        <h2>{this.state.episode.title}</h2>
        <img src={this.state.episode.image_url} alt=""/>
        <div className='description'>
          <p>{this.state.episode.description}</p>
        </div>
      </div>
    );
  }

  componentDidMount() {
    api.fetchSingleEpisode(this.props.match.params.episode_id)
      .then(({response: {episode}}) => {
        this.setState({
          episode
        })
      })
  }
}

export default EpisodeCard;