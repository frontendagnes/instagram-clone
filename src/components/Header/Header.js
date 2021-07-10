import React, { useState } from "react";
import "./Header.css";
// icons material-ui
import SearchIcon from "@material-ui/icons/Search";
import HomeIcon from "@material-ui/icons/Home";
import SendIcon from "@material-ui/icons/Send";
import ExploreIcon from "@material-ui/icons/Explore";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
//database
import { useStateValue } from "../../utility/StateProvider";
function Header() {
  const [input, setInput] = useState("");
  const [{ user }, dispatch] = useStateValue();
  const logout = () => {
    dispatch({
      type: "DELETE_USER"
    })
  }
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
          <input
            placeholder="Search..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
      </div>
      <div className="header__right">
        <IconButton className="header__option">
          <HomeIcon fontSize="large" style={{ color: "black" }} />
        </IconButton>
        <IconButton className="header__option">
          <SendIcon fontSize="large" />
        </IconButton>
        <IconButton className="header__option">
          <ExploreIcon fontSize="large" />
        </IconButton>
        <IconButton className="header__option">
          <FavoriteBorderIcon fontSize="large" />
        </IconButton>
        <IconButton className="header__option">
          <Avatar src={user?.photoURL} />
        </IconButton>
        <IconButton className="header__option" onClick={logout}>
          <ExitToAppIcon fontSize="large" />
        </IconButton>
      </div>
    </div>
  );
}

export default Header;
