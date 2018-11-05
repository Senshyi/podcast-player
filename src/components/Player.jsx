import React, { Component } from 'react';
import { setInterval } from 'timers';

class Player extends Component {
  state = {
    currentTime: '0:00',
    percent: ''
  }
  render() {
    return (
      <div className='player'>
        <div className='player-center'>
          <p>{this.props.episode.title}</p>
          <div className='player-controller'>
            <i onClick={this.props.previous} className="fas fa-step-backward"></i>
            <i onClick={this.togglePlay} className={this.props.playing ? "far fa-pause-circle" : "far fa-play-circle"}></i>
            <i onClick={this.props.next} className="fas fa-step-forward"></i>
          </div>
          <div className='player-progress'>
              <span className='currentTime'>{this.state.currentTime}</span>
            <div onClick={this.scrub} className='progress'>
              <div style={{ flexBasis: this.state.percent}} className='progress_filled'>
              </div>
            </div>
            <span className='duration'>
              {Object.keys(this.props.episode).length ? this.formatTime(this.props.episode.duration / 1000) : '0:00'}
            </span>
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

  scrub = (e) => {
    this.props.audio.currentTime = (e.nativeEvent.offsetX / e.target.offsetWidth) * (this.props.episode.duration / 1000)
  }

  progressUpdate = () => {
    if(this.props.playing) {
      const audioDurInSec = this.props.episode.duration / 1000
      const percent = Math.floor((this.props.audio.currentTime / audioDurInSec) * 100)
      if(percent === 100) this.props.next()
      this.setState({
        percent: `${percent}%`,
        currentTime: this.formatTime(this.props.audio.currentTime)
      })
    }
  }

  formatTime = (seconds) => {
    const sec = parseInt(seconds % 60);
    const min = parseInt((seconds / 60) % 60);
    return `${min}:${sec < 10 ? '0' + sec : sec}`
  }
}

export default Player;