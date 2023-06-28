import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import Profile from "./components/Profile";
import CreatePost from "./components/CreatePost";
import UserProfile from "./components/UserProfile";
import MyFollowingPost from "./components/MyFollowingPost";
import Modal from "./components/Modal";
import { LoginContext } from "./context/LoginContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [userLogin, setUserLogin] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    // Simulating an asynchronous login check
    const checkLoginStatus = async () => {
      try {
        // Perform your login check here, e.g., make an API request to check if the user is logged in
        const response = await fetch("/api/checkLoginStatus");
        const data = await response.json();

        // Update the userLogin state based on the login status
        setUserLogin(data.isLoggedIn);
      } catch (error) {
        // Handle any error that occurs during the login check
        console.error("Error checking login status:", error);
      }
    };

    checkLoginStatus();
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <LoginContext.Provider value={{ setUserLogin, setModalOpen }}>
          <Navbar login={userLogin} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/createPost" element={<CreatePost />} />
            <Route path="/profile/:userid" element={<UserProfile />} />
            <Route path="/followingpost" element={<MyFollowingPost />} />
          </Routes>
          <ToastContainer theme="dark" />
          {modalOpen && <Modal setModalOpen={setModalOpen} />}
        </LoginContext.Provider>
      </div>
    </BrowserRouter>
  );
}

export default App;
