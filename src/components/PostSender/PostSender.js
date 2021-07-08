import React, { useState } from "react";
import "./PostSender.css";
//reducer
import { useStateValue } from "../../utility/StateProvider";
// database
import firebase from "firebase";
import db, { storage } from "../../utility/firebase";
// material-ui icons
import AddCommentIcon from "@material-ui/icons/AddComment";
import { Button } from "@material-ui/core";

function PostSender() {
  const [input, setInput] = useState("");
  const [isUpload, setIsUpload] = useState(false);
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);

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
    if (image) {
      const uploadTask = storage.ref(`images/${image.name}`).put(image);
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
          storage
            .ref("images")
            .child(image.name)
            .getDownloadURL()
            .then((url) => {
              //post image insiade db
              db.collection("posts").add({
                title: input,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                profilePic: "http://placeimg.com/640/480/fashion",
                user: "Agnes",
                photo: url,
                likes: [],
              });
              setProgress(0);
              setInput("");
              setImage(null);
              setIsUpload(false);
            });
        }
      );
    } else {
      alert("Photo has not been selected!");
    }
  };
  return (
    <div className="postSender">
      <div className="postSender__addMessage" onClick={handleClick} title= "Add Post">
        <AddCommentIcon
          className="postSenedr__iconMessage"
          style={{ fontSize: 72, color: isUpload ? "#da2e7e" : "#0095f6" }}
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
            <input
              className="postSender__textInput"
              placeholder="add title... (optional)"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
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
        </div>
      )}
    </div>
  );
}

export default PostSender;
