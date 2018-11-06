import React, { Component } from 'react';
import map from 'lodash.map';
import { Link } from 'react-router-dom'

class EpisodesList extends Component {
  state = {
    episodes: {}
  }
  render() {
    return (
      <div className='episodes-list'>
        {map(this.props.episodes, (episode, i) => {
          return <div className='episode' key={i}>
            <div  className='thumbnail'>
              <i onClick={() => this.props.selectEpisode(episode, i)} className={this.props.playing && this.props.index === i ? "far fa-pause-circle" : "far fa-play-circle"}></i>
              <img src={episode.image_url} alt="episode"/>
            </div>
            <Link to={`/episodes/${episode.episode_id}`}>
              <h3>{episode.title}</h3>
            </Link>
            <p>Show Duration: {this.formatTime(episode.duration / 1000)}</p>
          </div>
        })}
      </div>
    );
  }

  formatTime = (seconds) => {
    const sec = parseInt(seconds % 60);
    const min = parseInt((seconds / 60) % 60);
    return `${min}:${sec < 10 ? '0' + sec : sec}`
  }
}

export default EpisodesList;