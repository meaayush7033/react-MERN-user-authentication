import React, { useContext,useEffect } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../App";

function Nav() {
  // eslint-disable-next-line
  const { state, dispatch } = useContext(UserContext);
  const RenderMenu = () => {
    if (state) {
      return (
        <>
          <li className="nav-item mx-4">
            <Link className="nav-link" aria-current="page" to="/">
              Home
            </Link>
          </li>
          <li className="nav-item mx-4">
            <Link className="nav-link" to="/about">
              About
            </Link>
          </li>
          <li className="nav-item mx-4">
            <Link className="nav-link" to="/contact">
              Contact
            </Link>
          </li>
          <li className="nav-item mx-4">
            <Link className="nav-link" to="/logout">
              logout
            </Link>
          </li>
        </>
      );
    } else {
      return (
        <>
          <li className={`nav-item mx-4 mr-5`}>
            <Link className="nav-link" to="/signup">
              SignUp
            </Link>
          </li>
          <li className="nav-item mx-4">
            <Link className="nav-link" to="/login">
              login
            </Link>
          </li>
        </>
      );
    }
  };

  const callAbout = async () => {
      const res = await fetch("/getuser", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if(res.status === 200){
        dispatch({type:"USER", payload:true});
      }
  };

  useEffect(() => {
    callAbout();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <nav className="navbar navbar-expand-lg py-3">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            MERN <span>project</span>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <RenderMenu />
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Nav;
