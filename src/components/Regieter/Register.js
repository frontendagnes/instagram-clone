import React, { useState } from "react";
import "./Register.css";
// materia-ui icons
import { TextField, Button } from "@material-ui/core";
//react-roter-dom
import { useHistory, Link } from "react-router-dom";
// API
import { auth } from "../../utility/firebase";
//component
import ValidationError from "../ValidatinError/ValidationError";

const validate = (email, password, test) => {
  if (!email) {
    return "E-mail is required";
  } else if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email)) {
    return "Invalid e-mail format";
  }
  if (!password) {
    return "Password is required";
  } else if (password.length < 6) {
    return "The password must be 6 characters long";
  }
  if (test) {
    return "You have not passed the spam filter. Please refresh the page and try again";
  }
  return null;
};

function Register() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [error, setError] = useState(null);
  // filtr antyspam
  const [test, setTest] = useState("");
  const register = (e) => {
    e.preventDefault();
    const errMsg = validate(email, password, test);
    if (errMsg) {
      setError(errMsg);
      return;
    }
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(function (result) {
        return result.user.updateProfile({
          displayName: userName,
          photoURL: photoUrl,
        });
      })
      .then(() => {
        history.push("/login");
      })
      .catch((error) => alert(error.message));
    setEmail("");
    setPassword("");
    setUserName("");
    setPhotoUrl("");
  };

  return (
    <div className="register">
      <div className="register__wrapper">
        {error && <ValidationError text={error} />}
        <div className="register__logo">SocialApp</div>
        {/* <img
          className="register__logo"
          src="https://cdn2.downdetector.com/static/uploads/c/300/a3eac/Instagram_Logo_Large.png"
          alt=""
        /> */}
        <form onSubmit={register}>
          <TextField
            className="register__input"
            label="Enter nickname"
            variant="outlined"
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <TextField
            className="register__input"
            label="Enter e-mail"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            className="register__input"
            label="Enter password"
            variant="outlined"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            className="register__input"
            label="Enter the avatar url"
            variant="outlined"
            type="text"
            value={photoUrl}
            onChange={(e) => setPhotoUrl(e.target.value)}
          />
          {/* input antyspam */}
          <input
            autocomplete="off"
            type="text"
            name="age"
            className="register__age"
            value={test}
            onChange={(e) => setTest(e.target.value)}
          />
          <Button type="submit" className="register__button">
            Create Acount
          </Button>
        </form>
      </div>
      <div>
        Have an account? <Link to="/login">Sign In</Link>
      </div>
    </div>
  );
}

export default Register;
