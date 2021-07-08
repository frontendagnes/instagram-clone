import React, { useState } from "react";
import "./Post.css";
//emoji picker
import Picker, { SKIN_TONE_MEDIUM_DARK } from 'emoji-picker-react';
// material-ui icones
import Avatar from "@material-ui/core/Avatar";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import SendIcon from "@material-ui/icons/Send";
import Button from "@material-ui/core/Button";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
function Post({ user, postId, title, timestamp, photo, profilePic }) {
  const [comment, setComment] = useState([]);
  const [input, setInput] = useState("");



  return (
    <div className="post">
      <div className="post__top">
        <div className="post__topLeft">
          <Avatar src={profilePic} />
          <p>{user}</p>
        </div>
        <IconButton className="post__topRight">
          <MoreHorizIcon fontSize="large" />
        </IconButton>
      </div>
      <div className="post__center">
        <img src={photo} alt="" />
      </div>
      <div className="post__bottom">
        <div className="post__options">
          <div className="post__optionsLeft">
            <IconButton className="post__option">
              <FavoriteIcon />
            </IconButton>
            <IconButton className="post__option">
              <ChatBubbleIcon  />
            </IconButton>
            <IconButton className="post__option">
              <SendIcon  />
            </IconButton>
          </div>
          <div className="post__optionsRight">
            <IconButton className="post__option">
              <BookmarkIcon />
            </IconButton>
          </div>
        </div>
        <div className="post__title">
          <p>{user}</p>
          <p>{title}</p>
        </div>
        <div className="post__comment">
          <div className="post__comments"></div>
          <div className="post__sender">
            <InsertEmoticonIcon fontSize="large" />
            <input
              placeholder="add comment..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <Button disabled={input ? false : true}>ADD</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
