import React from "react";
import "./ValidationError.css";
// material-ui
import ErrorIcon from "@material-ui/icons/Error";
function ValidationError({ text }) {
  return (
    <div className="validationError">
      <ErrorIcon fontSize="large" color="secondary" /> <p>{text}</p>
    </div>
  );
}

export default ValidationError;
