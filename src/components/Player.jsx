import React, { Component } from 'react';

class Player extends Component {
  state = {
    playing: false
  }
  render() {
    return (
      <div className=''>
        <div className='player-center'>
          <h3>{this.props.episode.title}</h3>
          <i className="fas fa-step-backward"></i>
          <i onClick={this.togglePlay} className={this.props.playing ? "far fa-pause-circle" : "far fa-play-circle"}></i>
          <i className="fas fa-step-forward"></i>
        </div>
      </div>
    )
  }

  togglePlay = () => {
    this.props.playing ? this.props.pause() : this.props.play()
  }
}

export default Player;