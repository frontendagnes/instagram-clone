import React, { useEffect } from "react";
import "./App.css";
//components
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import Feed from "./components/Feed/Feed";
import PostSender from "./components/PostSender/PostSender";
import Login from "./components/Login/Login";
import Register from "./components/Regieter/Register";
// react-router-dom
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
// API
import { useStateValue } from "./utility/StateProvider";
import { auth } from "./utility/firebase";
function App() {
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        dispatch({
          type: "DELETE_USER",
        });
      }
    });
  }, [dispatch]);
  return (
    <Router>
      {!user ? <Redirect to="/login" /> : <Redirect to="/" />}
      <div className="app">
        <Switch>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/">
            <Header />
            <div className="app__wrapper">
              <Feed />
              <div className="app_sidebar">
                <Sidebar />
              </div>
              <PostSender />
            </div>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
