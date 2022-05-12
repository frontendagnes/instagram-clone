import React, { useState } from "react";
import "./PostSender.css";
// database
import db, {
  storage,
  serverTimestamp,
  addDoc,
  collection,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} from "../../utility/firebase";
import { useStateValue } from "../../utility/StateProvider";
// material-ui icons
import AddCommentIcon from "@mui/icons-material/AddComment";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import Button from "@mui/material/Button";
// emoji mart
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";

function PostSender() {
  const [input, setInput] = useState("");
  const [isUpload, setIsUpload] = useState(false);
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const [isEmoji, setIsEmoji] = useState(false);
  const [{ user }] = useStateValue();

  const handleClick = () => {
    setIsUpload(!isUpload);
  };

  const handleChangeImage = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };
  const handleUpload = (e) => {
    e.preventDefault();
    if (!image) return;

    const storageRef = ref(storage, `images/${image.name}`);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        //error function...
        console.log(error);
        alert(error.message);
      },
      () => {
        //complete function...
        getDownloadURL(uploadTask.snapshot.ref).then(async (url) => {
          await addDoc(collection(db, "posts"), {
            title: input,
            timestamp: serverTimestamp(),
            profilePic: user.photoURL,
            user: user.displayName,
            photo: url,
            likes: [],
          }).catch((error) => console.log("post send error>>>", error.message));
        });
        setProgress(0);
        setInput("");
        setImage(null);
        setIsUpload(false);
        setIsEmoji(false);
      }
    );
  };

  const addEmoji = (e) => {
    let emoji = e.native;
    setInput(input + emoji);
  };
  return (
    <div className="postSender">
      <div
        className="postSender__addMessage"
        onClick={handleClick}
        title="Add Post"
        style={{ marginBottom: !isUpload ? "100px" : "0" }}
      >
        <AddCommentIcon
          className="postSenedr__iconMessage"
          style={{ fontSize: 72, color: isUpload ? "#f50057" : "#0095f6" }}
        />
      </div>
      {isUpload && (
        <div className="postSender__uploadImage">
          <form>
            <progress
              className="postSender__progress"
              value={progress}
              max="100"
            />
            <div className="postSender__textInput">
              <input
                className="postSender__input"
                placeholder="add title... (optional)"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <InsertEmoticonIcon
                className="postSender__emojiButton"
                onClick={() => setIsEmoji(!isEmoji)}
                style={{ color: isEmoji ? "#f50057" : "#808080" }}
              />
            </div>
            <div>
              <input
                className="postSender__fileInput"
                type="file"
                onChange={handleChangeImage}
              />
              <Button
                className="postSender__upload"
                onClick={handleUpload}
                disabled={image ? false : true}
              >
                Send Post
              </Button>
            </div>
          </form>
          {isEmoji && (
            <span className="postSendr__emoji">
              <Picker onSelect={addEmoji} />
            </span>
          )}
        </div>
      )}
    </div>
  );
}

export default PostSender;
