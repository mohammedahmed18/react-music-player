import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { v4 as uuidv4 } from "uuid";

const SongsList = ({
  songs,
  displayedSong,
  handleClickCard,
  Sidebar,
  toggleSideBar,
  isSideBarShown,
  hideSidebar,
}) => {
  const [test, setTest] = useState("");

  if (!localStorage.getItem("likes")) {
    var likes = [];
    localStorage.setItem("likes", JSON.stringify(likes));
  }
  const isThisSongLiked = (_id) => {
    const likes = JSON.parse(localStorage.getItem("likes"));
    return likes.includes(_id);
  };
  const addOrRemoveSongsToLikes = (_id, e) => {
    const likes = JSON.parse(localStorage.getItem("likes"));
    if (isThisSongLiked(_id)) {
      // remove the song from the likes
      const likes = JSON.parse(localStorage.getItem("likes")).filter(
        (id) => id != _id
      );
      localStorage.setItem("likes", JSON.stringify(likes));
    } else {
      localStorage.setItem("likes", JSON.stringify([...likes, _id]));
    }

    e.stopPropagation();
    setTest(uuidv4());
  };

  return (
    <div className="songs-list">
      {songs.map((song) => (
        <div
          key={song._id}
          onClick={() => {
            hideSidebar();
            handleClickCard(song);
          }}
          className={`song-card ${song.name == displayedSong ? "active" : ""}`}
        >
          <img src={song.image} className="card-image" alt={songs.name} />
          <div className="card-info">
            <h2 className="card-title">{song.name}</h2>
            <p className="card-artist">{song.artist}</p>
          </div>
          <FontAwesomeIcon
            icon={faHeart}
            size="2x"
            color={isThisSongLiked(song._id) ? "red" : "#cfcfcf"}
            onClick={(e) => {
              addOrRemoveSongsToLikes(song._id, e);
            }}
          />
        </div>
      ))}
      <Sidebar
        songs={songs}
        toggleSideBar={toggleSideBar}
        isSideBarShown={isSideBarShown}
        handleClickCard={handleClickCard}
      />
    </div>
  );
};

export default SongsList;
