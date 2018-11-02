import React, { Component } from 'react';

class Player extends Component {
  state = {
    playing: false
  }
  render() {
    return (
      <div className='player'>
        <div className='player-center'>
          <p>{this.props.episode.title}</p>
          <div className='player-controller'>
          <i className="fas fa-step-backward"></i>
          <i onClick={this.togglePlay} className={this.props.playing ? "far fa-pause-circle" : "far fa-play-circle"}></i>
          <i className="fas fa-step-forward"></i>
          </div>
          <div className='progress'>
            <div className='progress_filled'>
            </div>
          </div>
        </div>
      </div>
    )
  }

  togglePlay = () => {
    this.props.playing ? this.props.pause() : this.props.play()
  }
}

export default Player;