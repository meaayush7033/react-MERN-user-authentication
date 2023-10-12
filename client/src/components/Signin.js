import React, { useContext, useState } from "react";
import img from "../imgs/about.jpg";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../App";

function Signin() {
// eslint-disable-next-line
  const {state, dispatch} = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();
    const res = await fetch("/login", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (res.status === 400 || res.status === 422 || !data) {
      setMsg(data.error);
      setTimeout(() => {
        setMsg("");
      },3000);
    } else {
      dispatch({type:"USER", payload:true});
      navigate("/");
    }
  };

  return (
    <section className="signin">
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-12 col-xl-11">
            <div className="card text-black ">
              <div className="card-body card-color">
                <div className="row justify-content-center">
                  <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center">
                    <img
                      src={img}
                      className="img-fluid mx-auto w-75 h-75"
                      alt=""
                    />
                  </div>

                  <div className="col-md-10 col-lg-6 col-xl-5">
                    <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-3 text-success">
                      Log in
                    </p>

                    <form method="POST" className="mx-1 mx-md-4">
                      <div className="d-flex flex-row align-items-center mb-3 text-center login-error">
                        <div className="form-outline flex-fill mb-0 text-danger">
                          <label
                            className="form-label"
                            htmlFor="form3Example3c"
                          >
                            {msg}
                          </label>
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-3">
                        <i className="fas fa-envelope fa-lg me-3 fa-fw mt-4"></i>
                        <div className="form-outline flex-fill mb-0">
                          <input
                            name="email"
                            type="email"
                            value={email}
                            className="form-control"
                            placeholder="Enter your Email"
                            autoComplete="off"
                            onChange={(e) => setEmail(e.target.value)}
                          />
                          <label
                            className="form-label"
                            htmlFor="form3Example3c"
                          >
                            Your Email
                          </label>
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-3">
                        <i className="fas fa-lock fa-lg me-3 fa-fw mt-4"></i>
                        <div className="form-outline flex-fill mb-0">
                          <input
                            name="password"
                            type="password"
                            value={password}
                            className="form-control"
                            placeholder="Enter your password"
                            autoComplete="off"
                            onChange={(e) => setPassword(e.target.value)}
                          />
                          <label
                            className="form-label"
                            htmlFor="form3Example4c"
                          >
                            Password
                          </label>
                        </div>
                      </div>

                      <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                        <button
                          type="submit"
                          onClick={login}
                          className="btn btn-outline-danger btn-lg"
                        >
                          Login
                        </button>
                      </div>

                      <div className="text-center justify-content-center mx-4 mb-3 mb-lg-4">
                        <p>
                          Create a new account{" "}
                          <Link to="/signup">
                            <span>
                              <button
                                type="button"
                                className="btn btn-outline-danger mx-1"
                              >
                                Register
                              </button>
                            </span>
                          </Link>
                        </p>
                        <p>or sign up with:</p>
                        <i className="fab fa-facebook-f btn btn-outline-success mx-2"></i>
                        <i className="fab fa-google btn btn-outline-success mx-2"></i>
                        <i className="fab fa-twitter  btn btn-outline-success mx-2"></i>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Signin;
