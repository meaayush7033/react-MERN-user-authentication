import React, { useContext, useState } from "react";
import img from "../imgs/card-3.png";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../App";


function Signup() {
  // eslint-disable-next-line
  const {state, dispatch} = useContext(UserContext);
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    profession: "",
    password: "",
    cpassword: "",
  });
  const [msg, setMsg] = useState("");

  let fieldName, value;
  const handelInputs = (e) => {
    fieldName = e.target.name;
    value = e.target.value;
    setUser({ ...user, [fieldName]: value });
  };

  const regData = async (e) => {
    e.preventDefault();
    const { name, email, phone, profession, password, cpassword } = user;
    const res = await fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        profession,
        password,
        cpassword,
      }),
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
    <section className="signup vh-100">
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-12 col-xl-11">
            <div className="card text-black ">
              <div className="card-body card-color">
                <div className="row justify-content-center">
                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                    <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-3 text-success">
                      Sign up
                    </p>

                    <form method="POST" className="mx-1 mx-md-4">
                      <div className="d-flex flex-row align-items-center mb-2">
                        <i className="fas fa-user fa-lg me-3 fa-fw mt-4"></i>
                        <div className="form-outline flex-fill mb-0">
                          <input
                            type="text"
                            id="name"
                            value={user.name}
                            className="form-control"
                            placeholder="Enter your full name"
                            name="name"
                            onChange={handelInputs}
                            autoComplete="off"
                          />
                          <label
                            className="form-label"
                            htmlFor="form3Example1c"
                          >
                            Your Name
                          </label>
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-2">
                        <i className="fas fa-envelope fa-lg me-3 fa-fw mt-4"></i>
                        <div className="form-outline flex-fill mb-0">
                          <input
                            name="email"
                            type="email"
                            id="email"
                            value={user.email}
                            className="form-control"
                            placeholder="Enter your Email"
                            onChange={handelInputs}
                            autoComplete="off"
                          />
                          <label
                            className="form-label"
                            htmlFor="form3Example3c"
                          >
                            Your Email
                          </label>
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-2">
                        <i className="fas fa-mobile fa-lg me-3 fa-fw mt-4"></i>
                        <div className="form-outline flex-fill mb-0">
                          <input
                            name="phone"
                            type="text"
                            id="phone"
                            value={user.phone}
                            className="form-control"
                            placeholder="Enter your mobile number"
                            onChange={handelInputs}
                            autoComplete="off"
                          />
                          <label
                            className="form-label"
                            htmlFor="form3Example3c"
                          >
                            Your Phone Number
                          </label>
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-2">
                        <i className="fas fa-user-tie fa-lg me-3 fa-fw mt-4"></i>
                        <div className="form-outline flex-fill mb-0">
                          <input
                            name="profession"
                            type="text"
                            id="profession"
                            value={user.profession}
                            className="form-control"
                            placeholder="Enter your Profession"
                            onChange={handelInputs}
                            autoComplete="off"
                          />
                          <label
                            className="form-label"
                            htmlFor="form3Example3c"
                          >
                            Your Profession
                          </label>
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-2">
                        <i className="fas fa-lock fa-lg me-3 fa-fw mt-4"></i>
                        <div className="form-outline flex-fill mb-0">
                          <input
                            name="password"
                            type="password"
                            id="password"
                            value={user.password}
                            className="form-control"
                            onChange={handelInputs}
                            autoComplete="off"
                            placeholder="Enter your password"
                          />
                          <label
                            className="form-label"
                            htmlFor="form3Example4c"
                          >
                            Password
                          </label>
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-2">
                        <i className="fas fa-key fa-lg me-3 fa-fw mt-4"></i>
                        <div className="form-outline flex-fill mb-0">
                          <input
                            name="cpassword"
                            type="password"
                            id="cpassword"
                            value={user.cpassword}
                            className="form-control"
                            onChange={handelInputs}
                            autoComplete="off"
                            placeholder="Confirm your password"
                          />
                          <label
                            className="form-label"
                            htmlFor="form3Example4cd"
                          >
                            Confirm password
                          </label>
                        </div>
                      </div>

                      <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4 text-danger">
                        <label className="form-label" htmlFor="form3Example3c">
                          {msg}
                        </label>
                      </div>

                      <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                        <button
                          type="submit"
                          className="btn btn-outline-success btn-lg"
                          onClick={regData}
                        >
                          Create account
                        </button>
                      </div>
                    </form>
                    <div className="d-flex justify-content-center mx-4 mb-1 mb-lg-4">
                      <p className="text-center mt-2 mb-0">
                        Have already an account?{" "}
                        <Link to="/login" className="fw-bold text-body">
                          <u>Login here</u>
                        </Link>
                      </p>
                    </div>
                  </div>
                  <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                    <img
                      src={img}
                      className="img-fluid mx-auto w-75 h-75"
                      alt=""
                    />
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

export default Signup;
