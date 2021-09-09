import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import Controls from "../controls/controls";

// ----------------------------------------------------------------------------------------------
class Music extends React.Component {
  state = { audio: null, duration: "00:00", currentTime: "00:00" };
  componentDidMount = () => {
    const audio = React.createRef();

    this.setState({ audio });

    document.addEventListener("keyup", (event) => {
      if (event.code === "Space") {
        this.props.handleTooglePlay(this.state.audio);
      }
    });
  };

  componentDidUpdate = () => {
    if (this.props.song.isPlaying) {
      var playPromise = this.state.audio.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then((_) => {
            this.updateDuration();
          })
          .catch((error) => {});
      }
    }
  };
  updateDuration = () => {
    try {
      setTimeout(() => {
        const duration_string = this.state.audio.current.duration;
        this.setState({ duration: duration_string });
      }, 400);
    } catch (err) {
      setTimeout(() => {
        this.updateDuration();
      }, 200);
    }
  };

  updateCurrentTime = () => {
    try {
      setTimeout(() => {
        const currentTime = this.state.audio.current.currentTime;
        this.setState({ currentTime: currentTime });
      }, 400);
    } catch (err) {
      setTimeout(() => {
        this.updateCurrentTime();
      }, 200);
    }
  };

  onChangeSlider = (e) => {
    let v = e.target.value;
    this.setState({ currentTime: v });
    const audio = this.state.audio;
    audio.current.currentTime = v;
    this.setState({ audio });
  };
  render() {
    const {
      song,
      handleSkipForward,
      handleTooglePlay,
      handleSkipBackward,
      hideSidebar,
    } = this.props;
    return (
      <div className="song" onClick={hideSidebar}>
        {!song.image ? (
          <FontAwesomeIcon icon={faPlay} />
        ) : (
          <img
            className="song-image"
            style={
              this.props.song.isPlaying
                ? { animationPlayState: "running" }
                : { animationPlayState: "paused" }
            }
            src={song.image}
            alt={song.name}
          />
        )}
        <h1
          style={
            this.props.song.isPlaying
              ? { animationPlayState: "running" }
              : { animationPlayState: "paused" }
          }
          className="song-name"
        >
          {song.name}
        </h1>
        <p className="song-artist">{song.artist}</p>
        <audio
          src={song.src}
          ref={this.state.audio}
          onEnded={() => {
            handleSkipForward();
          }}
          onTimeUpdate={this.updateCurrentTime()}
          preload="metadata"
        ></audio>
        <Controls
          hadleTogglePlay={() => handleTooglePlay(this.state.audio)}
          isPlaying={song.isPlaying}
          handleSkipForward={handleSkipForward}
          handleSkipBackward={handleSkipBackward}
          duration={this.state.duration}
          currentTime={this.state.currentTime}
          onChangeSlider={this.onChangeSlider}
        />
      </div>
    );
  }
}

export default Music;
