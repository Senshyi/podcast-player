import React, { Component } from "react";
import * as api from "../api";

class EpisodeCard extends Component {
  state = {
    episode: {}
  };
  render() {
    const { episode } = this.state;
    return (
      <div className="episode-card">
        <header>
          <img src={episode.image_url} alt="" />
          {Object.keys(episode).length !== 0 ? (
            <div className="header-right">
              <h2>{episode.title}</h2>
              <p>Author: {episode.author.fullname}</p>
              <p>Pusblished at: {episode.published_at}</p>
            </div>
          ) : (
            ""
          )}
        </header>
        <div className="description">
          <p>{episode.description}</p>
        </div>
      </div>
    );
  }

  componentDidMount() {
    const { episode_id } = this.props.match.params;
    api.fetchSingleEpisode(episode_id).then(({ response: { episode } }) => {
      this.setState({ episode });
    });
  }
}

export default EpisodeCard;
