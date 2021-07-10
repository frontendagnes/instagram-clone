import React, { useState } from "react";
import "./Login.css";
// react-router-dom
import { Link, useHistory } from "react-router-dom";
// databse
import { auth } from "../../utility/firebase";
import { useStateValue } from '../../utility/StateProvider'
import { actionTypes } from '../../utility/reducer'
// materia-ui icons
import { TextField, Button } from "@material-ui/core";

function Login() {
const history = useHistory();
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

const [state, dispatch] = useStateValue()

const signIn = (e) => {
  e.preventDefault();
  //firebase login
  auth
    .signInWithEmailAndPassword(email, password)
    .then(result => {
      dispatch({
        type: actionTypes.SET_USER,
        user: result.user,
      })
    })
    // .then(() => {
    //   history.push("/");
    // })
    .catch((error) => console.log(error))
};
  return (
    <div className="login">
      <div className="login__wrapper">
        <img
          className="login__logo"
          src="https://cdn2.downdetector.com/static/uploads/c/300/a3eac/Instagram_Logo_Large.png"
          alt=""
        />
        <form onSubmit={signIn} >
          <TextField
            className="login__input"
            label="login"
            variant="outlined"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <TextField
            className="login__input"
            label="password"
            variant="outlined"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
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