import React, { useState } from "react";
import "./Login.css";
// react-router-dom
import { Link } from "react-router-dom";
// API
import { auth } from "../../utility/firebase";
import { useStateValue } from "../../utility/StateProvider";
import { actionTypes } from "../../utility/reducer";
// materia-ui icons
import { TextField, Button } from "@material-ui/core";
// componets
import ValidationError from "../ValidatinError/ValidationError";
const validate = (email, password) => {
  if (!email) {
    return "E-mail is required";
  } else if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email)) {
    return "Invalid e-mail format";
  }
  if (!password) {
    return "Password is required";
  }
  return null;
};

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const [state, dispatch] = useStateValue();
  const signIn = (e) => {
    e.preventDefault();

    const errMsg = validate(email, password);
    if (errMsg) {
      setError(errMsg);
      return;
    }

    //firebase login
    auth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        dispatch({
          type: actionTypes.SET_USER,
          user: result.user,
        });
      })
      .catch((error) => alert(error.message));
  };

  return (
    <div className="login">
      <div className="login__wrapper">
        {error && <ValidationError text={error} />}
        <div className="login__logo">SocialApp</div>
        {/* <img
          className="login__logo"
          src="https://cdn2.downdetector.com/static/uploads/c/300/a3eac/Instagram_Logo_Large.png"
          alt=""
        /> */}
        <form onSubmit={signIn}>
          <TextField
            className="login__input"
            label="Enter login"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            className="login__input"
            label="Enter password"
            variant="outlined"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" className="login__button">
            Log In
          </Button>
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
