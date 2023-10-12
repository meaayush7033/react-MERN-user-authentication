import React, { useState, useEffect } from "react";
import img from "../imgs/card-3.png";
import { useNavigate } from "react-router-dom";

function Edit() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    profession: "",
  });
  const [msg, setMsg] = useState("");

  const callHome = async () => {
    try {
      const res = await fetch("/getuser", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await res.json();
      const { _id, name, email, phone, profession } = data;
      setUser({ _id, name, email, phone, profession });

      if (res.status !== 200) {
        navigate("/login");
      }
    } catch (error) {
      navigate("/login");
    }
  };

  useEffect(() => {
    callHome();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let fieldName, value;
  const handelInputs = (e) => {
    fieldName = e.target.name;
    value = e.target.value;
    setUser({ ...user, [fieldName]: value });
  };
  const editData = async (e) => {
    e.preventDefault();
    const { _id, name, email, phone, profession } = user;
    const res = await fetch("/edituser", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id,
        name,
        email,
        phone,
        profession,
      }),
    });

    const data = await res.json();
    if (res.status === 200) {
      navigate("/about");
    } else {
      setMsg(data.error);
    }
  };

  return (
    <section className="signup vh-75 mt-5">
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-12 col-xl-11">
            <div className="card text-black ">
              <div className="card-body card-color">
                <div className="row justify-content-center">
                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                    <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-3 text-success">
                      Edit Your Profile
                    </p>

                    <form method="PATCH" className="mx-1 mx-md-4">
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

                      <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4 text-danger">
                        <label className="form-label" htmlFor="form3Example3c">
                          {msg}
                        </label>
                      </div>

                      <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                        <button
                          type="submit"
                          className="btn btn-outline-success btn-lg"
                          onClick={editData}
                        >
                          Update
                        </button>
                      </div>
                    </form>
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

export default Edit;
