import React from "react";
import "./Header.css";
// icons material-ui
import SearchIcon from "@material-ui/icons/Search";
import HomeIcon from "@material-ui/icons/Home";
import SendIcon from "@material-ui/icons/Send";
import ExploreIcon from "@material-ui/icons/Explore";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import Avatar from "@material-ui/core/Avatar";

function Header() {
  return (
    <div className="header">
      <div className="header__left">
        <img
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          alt="Instagram Clone"
        />
      </div>
      <div className="header__center">
        <div className="header__search">
          <SearchIcon fontSize="small" />
          <input placeholder="Search..." />
        </div>
      </div>
      <div className="header__right">
        <div className="header__option">
          <HomeIcon fontSize="large" />
        </div>
        <div className="header__option">
          <SendIcon fontSize="large" />
        </div>
        <div className="header__option">
          <ExploreIcon fontSize="large" />
        </div>
        <div className="header__option">
          <FavoriteBorderIcon fontSize="large" />
        </div>
        <div className="header__option header__avatar">
          <Avatar src="http://placeimg.com/640/480/animals" />
        </div>
      </div>
    </div>
  );
}

export default Header;
