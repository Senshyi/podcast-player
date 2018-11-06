import React, { Component } from "react";
import * as api from "../api";

class EpisodeCard extends Component {
  state = {
    episode: {}
  };
  render() {
    return (
      <div className="episode-card">
        <header>
          <img src={this.state.episode.image_url} alt="" />
          {Object.keys(this.state.episode).length !== 0 ? (
            <div className="header-right">
              <h2>{this.state.episode.title}</h2>
              <p>Author: {this.state.episode.author.fullname}</p>
              <p>Pusblished at: {this.state.episode.published_at}</p>
            </div>
          ) : (
            ""
          )}
        </header>
        <div className="description">
          <p>{this.state.episode.description}</p>
        </div>
      </div>
    );
  }

  componentDidMount() {
    api
      .fetchSingleEpisode(this.props.match.params.episode_id)
      .then(({ response: { episode } }) => {
        this.setState({
          episode
        });
      });
  }
}

export default EpisodeCard;
