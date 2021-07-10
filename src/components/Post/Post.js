import React, { useState, useEffect } from "react";
import "./Post.css";
// components
import Comment from "./Comment";
import { Picker } from "emoji-mart";
// emoji mart
import "emoji-mart/css/emoji-mart.css";
//database
import db from "../../utility/firebase";
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
//database
import { useStateValue } from "../../utility/StateProvider";
import { red } from "@material-ui/core/colors";
function Post({
  username,
  postId,
  title,
  timestamp,
  photo,
  profilePic,
  favorite,
}) {
  const [comment, setComment] = useState([]);
  const [input, setInput] = useState("");
  const [likes, setLikes] = useState([]);
  const [isEmoji, setIsEmoji] = useState(false);
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    setLikes(favorite);
  }, []);

  useEffect(() => {
    let comments;
    if (postId) {
      comments = db
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) => {
          setComment(snapshot.docs.map((doc) => doc.data()));
        });
    }
    return () => {
      comments();
    };
  }, [postId]);

  const commentsSender = (e) => {
    e.preventDefault();
    if (comment) {
      db.collection("posts").doc(postId).collection("comments").add({
        comment: input,
        user: user.displayName,
        timestamp: Date.now(),
      });
    }
    setInput("");
  };

  const like = () => {
    let newLike = [...likes, user.uid];
    db.collection("posts").doc(postId).update({
      likes: newLike,
    });
    setLikes(newLike);
  };

  const unLike = () => {
    let newLike = likes.filter((item) => item !== user.uid);
    db.collection("posts").doc(postId).update({
      likes: newLike,
    });
    setLikes(newLike);
  };
  const addEmoji = (e) => {
    let emoji = e.native;
    setInput(input + emoji);
  };
  return (
    <div className="post">
      <div className="post__top">
        <div className="post__topLeft">
          <Avatar src={profilePic} />
          <div>
            <p>{username}</p>
            <small>{new Date(timestamp?.toDate()).toUTCString()}</small>
          </div>
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
              {likes?.includes(user?.uid) ? (
                <FavoriteIcon color="secondary" onClick={() => unLike()} />
              ) : (
                <FavoriteIcon onClick={() => like()} />
              )}
            </IconButton>
            <IconButton className="post__option">
              <ChatBubbleIcon />
            </IconButton>
            <IconButton className="post__option">
              <SendIcon />
            </IconButton>
          </div>
          <div className="post__optionsRight">
            <IconButton className="post__option">
              <BookmarkIcon />
            </IconButton>
          </div>
        </div>
        <div className="post__favorties">Number of likes: {likes?.length}</div>
        <div className="post__title">
          <p>{title && username}</p>
          <p>{title}</p>
        </div>
        <div className="post__comment">
          <div className="post__comments">
            {comment.map((item) => (
              <Comment key={item.id} user={item.user} comment={item.comment} />
            ))}
          </div>
          <div className="post__sender">
            <InsertEmoticonIcon
              className="post__emojiButton"
              fontSize="large"
              onClick={() => setIsEmoji(!isEmoji)}
              style={{ color: isEmoji ? "#f50057" : "#000000" }}
            />
            {isEmoji && (
              <span>
                <Picker onSelect={addEmoji} />
              </span>
            )}

            <input
              placeholder="add comment..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <Button disabled={input ? false : true} onClick={commentsSender}>
              ADD
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
