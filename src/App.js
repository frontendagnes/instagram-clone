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
import { Route, Routes } from "react-router-dom";
// state
import { useStateValue } from "./utility/StateProvider";
// api
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
    <div className="app">
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <>
              {user ? (
                <>
                  <Header />
                  <div className="app__wrapper">
                    <Feed />
                    <div className="app_sidebar">
                      <Sidebar />
                    </div>
                    <PostSender />
                  </div>
                </>
              ) : (
                <Login />
              )}
            </>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
