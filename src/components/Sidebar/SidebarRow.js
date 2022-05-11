import React from "react";
import "./SidebarRow.css";
import Avatar from "@mui/material/Avatar";
function SidebarRow({ profilePic, nick, user, width, height }) {
  return (
    <div className="sidebarRow">
      <Avatar
        src={profilePic}
        className="sidebarRow__avatar"
        style={{ width: width, height: height }}
      />
      <div className="sidebarRow__user">
        <p>{nick}</p>
        <small>{user}</small>
      </div>
    </div>
  );
}

export default SidebarRow;
