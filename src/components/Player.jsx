import React, { Component } from 'react';

class Player extends Component {
  state = {
    playing: false
  }
  render() {
    return (
      <div className=''>
        <audio ref='audio' src="https://api.spreaker.com/v2/episodes/16105972/play"></audio>
        <div className='player-center'>
          <i className="fas fa-step-backward"></i>
          <i onClick={this.togglePlay} className={this.state.playing ? "far fa-pause-circle" : "far fa-play-circle"}></i>
          <i className="fas fa-step-forward"></i>
        </div>
      </div>
    )
  }

  togglePlay = (e) => {
    if(this.state.playing) {
      this.refs.audio.pause()
      this.setState({playing: false})
    } else {
      this.refs.audio.play()
      this.setState({playing: true})
    }
  }
}

export default Player;