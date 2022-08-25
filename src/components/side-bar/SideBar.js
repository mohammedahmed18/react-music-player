import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faTimes } from "@fortawesome/free-solid-svg-icons";

const Sidebar = ({ toggleSideBar, isSideBarShown, songs, handleClickCard }) => {
  const [likedSongs, setLikedSongs] = useState(
    JSON.parse(localStorage.getItem("likes")).filter((s) =>
      JSON.parse(localStorage.getItem("likes")).includes(s._id)
    )
  );
  useEffect(() => {
    let likedIds = JSON.parse(localStorage.getItem("likes"));
    const _likedSongs = songs.filter((s) => likedIds.includes(s._id));

    if (JSON.stringify(likedSongs) != JSON.stringify(_likedSongs)) {
      setLikedSongs(_likedSongs);
    }
  });
  return (
    <>
      <FontAwesomeIcon
        onClick={toggleSideBar}
        icon={isSideBarShown ? faTimes : faHeart}
        color="#c4c4c4"
        size="3x"
        className="like-icon"
      />
      <div
        className="sidebar"
        style={isSideBarShown ? { left: "0" } : { left: "-100%" }}
      >
        <div className="liked-songs">
          {likedSongs.length !== 0 ? (
            likedSongs.map((s) => (
              <div
                className="liked-song"
                key={s._id}
                onClick={() => {
                  handleClickCard(s);
                }}
              >
                <p>{s.name}</p>
                <p>{s.artist}</p>
              </div>
            ))
          ) : (
            <p className="no-fav">you don't have any favourite songs yet !</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
