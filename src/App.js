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
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
//database
import { useStateValue } from "./utility/StateProvider";
function App() {
  const [{ user }, dispatch] = useStateValue();
  useEffect(() => {
    console.log(user);
  }, [user]);
  return (
    <Router>
     {!user ? <Redirect to="/login" /> : <Redirect to="/"/>}
      <div className="app">
        <Switch>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/">
            <div className="app__header">
              <Header />
            </div>
            <div className="app__conatiner">
              <div className="app__feed">
                <Feed />
              </div>
              <div className="app_sidebar">
                <Sidebar />
              </div>
              <div className="app__postSender">
                <PostSender />
              </div>
            </div>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
