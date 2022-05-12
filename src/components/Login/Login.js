import React, { useState } from "react";
import "./Login.css";
// react-router-dom
import { Link } from "react-router-dom";
// API
import {
  auth,
  signInWithEmailAndPassword,
  signInWithPopup,
  provider,
} from "../../utility/firebase";
// materia-ui icons
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import GoogleButton from "react-google-button";
// components
import ValidationError from "../ValidatinError/ValidationError";
const validate = (email, password, test) => {
  if (!email) {
    return "E-mail is required";
  } else if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email)) {
    return "Invalid e-mail format";
  }
  if (!password) {
    return "Password is required";
  }
  if (test) {
    return "You have not passed the spam filter. Please refresh the page and try again";
  }
  return null;
};

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  // filtr antyspam
  const [test, setTest] = useState("");

  const signIn = (e) => {
    e.preventDefault();

    const errMsg = validate(email, password, test);
    if (errMsg) {
      setError(errMsg);
      return;
    }
    //firebase login
    signInWithEmailAndPassword(auth, email, password).catch((error) =>
      alert(error.message)
    );
  };
  const loginWithGoogle = (e) => {
    e.preventDefault();
    signInWithPopup(auth, provider).catch((error) =>
      console.log("Login Google Error>>", error.message)
    );
  };
  return (
    <div className="login">
      <div className="login__error">
        {error && <ValidationError text={error} />}
      </div>
      <div className="login__wrapper">
        <div className="login__logo">SocialApp</div>
        <form onSubmit={signIn}>
          <TextField
            autoComplete="off"
            className="login__input"
            label="Enter login"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            autoComplete="off"
            className="login__input"
            label="Enter password"
            variant="outlined"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {/* input antyspam */}
          <input
            autoComplete="off"
            type="text"
            name="age"
            className="login__age"
            value={test}
            onChange={(e) => setTest(e.target.value)}
          />
          
          <Button type="submit" className="login__button">
            Log In
          </Button>
          <div className="login__comma">OR</div>
          <GoogleButton type="light" onClick={loginWithGoogle} />
        </form>
      </div>
      <div className="login__infoRegister">
        You do not have an account? Register
        <Link to="/register"> here</Link>
      </div>
    </div>
  );
}

export default Login;
