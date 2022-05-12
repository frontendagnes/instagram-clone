import React, { useState, useEffect } from "react";
import "./Post.css";
// components
import Comment from "./Comment";
// emoji mart
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
//database
import db, {
  doc,
  query,
  collection,
  onSnapshot,
  orderBy,
  setDoc,
  addDoc,
} from "../../utility/firebase";
// mui
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import SendIcon from "@mui/icons-material/Send";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
//state
import { useStateValue } from "../../utility/StateProvider";
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
  const [{ user }] = useStateValue();

  useEffect(() => {
    setLikes(favorite);
  }, [favorite]);

  useEffect(() => {
    if (postId) {
      const docRef = doc(db, "posts", postId);
      const ref = collection(docRef, "comments");
      const sortRef = query(ref, orderBy("timestamp", "desc"));
      const unsuscribe = onSnapshot(sortRef, (snapshot) => {
        setComment(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });
      return () => {
        unsuscribe();
      };
    }
  }, [postId]);

  const commentsSender = async (e) => {
    e.preventDefault();
    if (comment) {
      const docRef = doc(db, "posts", postId);
      const ref = collection(docRef, "comments");
      await addDoc(ref, {
        comment: input,
        user: user.displayName,
        timestamp: Date.now(),
      })
        .then(() => {
          setInput("");
        })
        .catch((error) => console.log("add coment error>>", error.message));
    }
  };

  const like = async () => {
    let newLike = [...likes, user.uid];
    const refDoc = doc(db, "posts", postId);
    await setDoc(
      refDoc,
      {
        likes: newLike,
      },
      { merge: true }
    )
      .then(() => {
        setLikes(newLike);
      })
      .catch((error) => {
        console.error("Like Error>>", error.message);
      });
  };

  const unLike = async () => {
    let filterItem = likes.filter((item) => item !== user.uid);
    const refDoc = doc(db, "posts", postId);
    await setDoc(
      refDoc,
      {
        likes: filterItem,
      },
      { merge: true }
    )
      .then(() => {
        setLikes(filterItem);
      })
      .catch((error) => {
        console.error("Dislike Error>>", error.message);
      });
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
          <Stack className="post__optionsLeft" direction="row" spacing={2}>
            {likes?.includes(user?.uid) ? (
              <IconButton className="post__option" onClick={() => unLike()}>
                <FavoriteIcon color="secondary" />
              </IconButton>
            ) : (
              <IconButton className="post__option" onClick={() => like()}>
                <FavoriteIcon sx={{ color: "#707070" }} />
              </IconButton>
            )}
            <IconButton className="post__option">
              <ChatBubbleIcon sx={{ color: "#707070" }} />
            </IconButton>
            <IconButton className="post__option">
              <SendIcon sx={{ color: "#707070" }} />
            </IconButton>
          </Stack>
          <Stack className="post__optionsRight">
            <IconButton className="post__option">
              <BookmarkIcon sx={{ color: "#707070" }} />
            </IconButton>
          </Stack>
        </div>
        <div className="post__favorties">Number of likes: {likes?.length}</div>
        <div className="post__title">
          <p>{title && username}</p>
          <p>{title}</p>
        </div>
        <div className="post__comment">
          <div className="post__comments">
            {comment.map((item) => (
              <Comment
                key={item.id}
                user={item.data.user}
                comment={item.data.comment}
              />
            ))}
          </div>
          <div className="post__sender">
            <InsertEmoticonIcon
              className="post__emojiButton"
              fontSize="large"
              onClick={() => {
                setIsEmoji(!isEmoji);
              }}
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
            <Button
              type="button"
              disabled={input ? false : true}
              onClick={commentsSender}
            >
              add
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
