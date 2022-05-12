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
import { auth, onAuthStateChanged } from "./utility/firebase";
import CookieConsent from "react-cookie-consent";
function App() {
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    onAuthStateChanged(auth, (authUser) => {
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
      <CookieConsent location="bottom" cookieName="app-cookie" expires={7}>This website uses cookies to enhance the user experience.</CookieConsent>
    </div>
  );
}

export default App;
