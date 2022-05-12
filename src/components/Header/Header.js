import React, { useState } from "react";
import "./Header.css";
// mui
import SearchIcon from "@mui/icons-material/Search";
import HomeIcon from "@mui/icons-material/Home";
import SendIcon from "@mui/icons-material/Send";
import ExploreIcon from "@mui/icons-material/Explore";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
// API
import { useStateValue } from "../../utility/StateProvider";
import { auth, signOut } from "../../utility/firebase";
function Header() {
  const [input, setInput] = useState("");
  const [{ user }] = useStateValue();
  const logout = () => {
    if (user) {
      signOut(auth);
    }
  };
  return (
    <div className="header">
      <div className="header__left">
        <div className="header__logo">SocialApp</div>
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
        <Stack direction="row" spacing={2} className="header__options">
          <IconButton className="header__option">
            <HomeIcon fontSize="large" sx={{ color: "#000000" }} />
          </IconButton>
          <IconButton className="header__option">
            <SendIcon fontSize="large" sx={{ color: "#707070" }} />
          </IconButton>
          <IconButton className="header__option">
            <ExploreIcon fontSize="large" sx={{ color: "#707070" }} />
          </IconButton>
          <IconButton className="header__option">
            <FavoriteBorderIcon fontSize="large" sx={{ color: "#707070" }} />
          </IconButton>
        </Stack>
        <Stack direction="row" spacing={2} marginLeft="20px">
          <IconButton className="header__option">
            <Avatar src={user?.photoURL} />
          </IconButton>
          <IconButton className="header__option" onClick={logout} title="Exit">
            <ExitToAppIcon fontSize="large" sx={{ color: "#707070" }} />
          </IconButton>
        </Stack>
      </div>
    </div>
  );
}

export default Header;
