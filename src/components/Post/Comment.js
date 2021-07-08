import React from "react";
import "./Comment.css";

function Comment({ user, comment }) {
  return (
    <div className="comment">
      <p className="comment__user">{user}</p>
      <p className="comment__title">{comment}</p>
    </div>
  );
}

export default Comment;
