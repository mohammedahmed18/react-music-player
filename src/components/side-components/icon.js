import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
const Icon = ({ icon, handleClick, size }) => {
  return (
    <span onClick={handleClick} className="control-icon">
      <FontAwesomeIcon
        icon={icon}
        cursor="pointer"
        size={size || "2x"}
        color="white"
      />
    </span>
  );
};

export default Icon;
