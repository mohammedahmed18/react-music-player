import React from "react";
const Overlay = ({ bg, color }) => {
  return (
    <div>
      <img className="bg" src={bg} />
      <div className="overlay"></div>
    </div>
  );
};
export default Overlay;
