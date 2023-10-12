import React, { createContext, useReducer } from "react";
import Nav from "./components/Nav";
import { Route, Routes } from "react-router-dom";
import About from "./components/About";
import Home from "./components/Home";
import Contact from "./components/Contact";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import "./App.css";
import Logout from "./components/Logout";
import Edit from "./components/Edit";
import { initialState, reducer } from "../src/reducer/UseReducer";
// context Api
export const UserContext = createContext();

function App() {
const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      <UserContext.Provider value={{ state, dispatch }}>
        <Nav />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/contact" element={<Contact />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/login" element={<Signin />} />
          <Route exact path="/logout" element={<Logout />} />
          <Route exact path="/editprofile" element={<Edit />} />
        </Routes>
      </UserContext.Provider>
    </>
  );
}

export default App;
