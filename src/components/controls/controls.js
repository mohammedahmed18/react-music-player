import {
  faPlay,
  faPause,
  faForward,
  faBackward,
  faVolumeMute,
  faVolumeUp,
} from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import Icon from "../side-components/icon";

const toMMSS = function (d) {
  var sec_num = parseInt(d, 10); // don't forget the second param
  var hours = Math.floor(sec_num / 3600);
  var minutes = Math.floor((sec_num - hours * 3600) / 60);
  var seconds = sec_num - hours * 3600 - minutes * 60;

  if (hours < 10) {
    hours = "0" + hours;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  return minutes + ":" + seconds;
};
const Controls = ({
  hadleTogglePlay,
  isPlaying,
  handleSkipForward,
  handleSkipBackward,
  duration,
  currentTime,
  onChangeSlider,
  onChangeVolume,
  vol,
  toggleMute,
}) => {
  const [footerStyle, setFooterStyle] = useState({});
  setTimeout(() => {
    setFooterStyle({ transform: "translateY(0)" });
  }, 200);
  return (
    <div style={footerStyle} className="footer">
      <div className="time">
        <span className="current-time">{toMMSS(currentTime)}</span>

        <input
          className="slider"
          type="range"
          max={String(duration)}
          min={0}
          value={String(currentTime)}
          onChange={(e) => onChangeSlider(e)}
          step={0.001}
        />

        <span className="total-time">
          {toMMSS(duration) == "NaN:NaN" ? "00:00" : toMMSS(duration)}
        </span>
      </div>

      <div className="controls">
        <div className="basic-controllers">
          <Icon handleClick={handleSkipBackward} icon={faBackward} />
          <Icon
            handleClick={hadleTogglePlay}
            icon={isPlaying ? faPause : faPlay}
          />
          <Icon handleClick={handleSkipForward} icon={faForward} />
        </div>
        {/* audio controller */}

        <div className="audio-wrapper">
          <Icon
            icon={vol == 0 ? faVolumeMute : faVolumeUp}
            handleClick={toggleMute}
          />

          <input
            type="range"
            className="audio-range"
            // min="0"
            // max="100"
            min={0}
            max={100}
            value={vol}
            onChange={(e) => onChangeVolume(e)}
          />
        </div>
      </div>
    </div>
  );
};

export default Controls;
