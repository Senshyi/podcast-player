import React, { Component } from "react";
import { setInterval } from "timers";

class Player extends Component {
  state = {
    currentTime: "0:00",
    percent: ""
  };
  render() {
    const { episode, previous, next, playing } = this.props;
    const { currentTime, percent } = this.state;
    return (
      <div className="player">
        <div className="player-left">
          {Object.keys(episode).length > 0 && (
            <img src={episode.image_url} alt="cover" />
          )}
        </div>
        <div className="player-center">
          <p>{episode.title}</p>
          <div className="player-controller">
            <i onClick={previous} className="fas fa-step-backward" />
            <i
              onClick={this.togglePlay}
              className={playing ? "far fa-pause-circle" : "far fa-play-circle"}
            />
            <i onClick={next} className="fas fa-step-forward" />
          </div>
          <div className="player-progress">
            <span className="currentTime">{currentTime}</span>
            <div onClick={this.scrub} className="progress">
              <div style={{ flexBasis: percent }} className="progress_filled" />
            </div>
            <span className="duration">
              {Object.keys(episode).length
                ? this.formatTime(episode.duration / 1000)
                : "0:00"}
            </span>
          </div>
        </div>

        <div className="player-right">
          <i className="fas fa-volume-up" />
          <input
            onChange={this.volumeChange}
            type="range"
            name="volume"
            min="0"
            max="1"
            step="0.05"
          />
        </div>
      </div>
    );
  }
  componentDidMount() {
    setInterval(_ => this.progressUpdate(), 1000);
  }

  togglePlay = () => {
    if (Object.keys(this.props.episode).length) {
      this.props.playing ? this.props.pause() : this.props.play();
    }
  };

  scrub = e => {
    const { audio, episode } = this.props;
    audio.currentTime =
      (e.nativeEvent.offsetX / e.target.offsetWidth) *
      (episode.duration / 1000);
  };

  progressUpdate = () => {
    const { playing, episode, audio, next } = this.props;
    if (playing) {
      const audioDurInSec = episode.duration / 1000;
      const percent = (audio.currentTime / audioDurInSec) * 100;
      if (Math.floor(percent) === 100) next();
      this.setState({
        percent: `${percent}%`,
        currentTime: this.formatTime(audio.currentTime)
      });
    }
  };

  formatTime = seconds => {
    const sec = parseInt(seconds % 60);
    const min = parseInt((seconds / 60) % 60);
    return `${min}:${sec < 10 ? "0" + sec : sec}`;
  };

  volumeChange = e => {
    this.props.audio.volume = e.target.value;
  };
}

export default Player;
