import axios from "axios";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import AddPost from "./components/AddPost";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
const App = () => {
  return (
    <>
    <NavBar></NavBar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-post" element={<AddPost />} />
      </Routes>

      <Toaster />
    </>
  );
};

export default App;
