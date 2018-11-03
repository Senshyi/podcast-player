import React, { Component } from 'react';
import { setInterval } from 'timers';

class Player extends Component {
  state = {
    percent: ''
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
            <div style={{ flexBasis: this.state.percent}} className='progress_filled'>
            </div>
          </div>
        </div>
      </div>
    )
  }
  componentDidMount() {
    setInterval(_ => this.progressUpdate(), 1000)
  }

  togglePlay = () => {
    this.props.playing ? this.props.pause() : this.props.play()
  }

  progressUpdate = () => {
    if(this.props.playing) {
      const audioDurInSec = this.props.episode.duration / 1000
      const percent = (this.props.audio.currentTime / audioDurInSec) * 100
      this.setState({
        percent: `${percent}%`
      })
    }
  }
}

export default Player;