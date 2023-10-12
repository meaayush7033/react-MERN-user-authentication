import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import empPic from "../imgs/about1.jpg";

function About() {
  const navigate = useNavigate();
  const [user, setUser] = useState("");

  const callAbout = async () => {
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
      setUser(data);

      if (res.status !== 200) {
        navigate("/login");
      }
    } catch (error) {
      navigate("/login");
    }
  };

  useEffect(() => {
    callAbout();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container about mt-5">
      <div className="card border-0 card-color">
        <div className="card-body my-5">
          <div className="row align-items-center justify-content-center">
            <div className="col-md-10 col-xl-8">
              <form method="post">
                <div className="row">
                  <div className="col-sm-3 col-md-3 ms-2 my-2">
                    <img
                      src={empPic}
                      className="img-fluid img-thumbnail"
                      alt="me"
                    />
                  </div>

                  <div className="col-sm-6 col-md-6 my-auto">
                    <div className="profile-head">
                      <h5>{user.name}</h5>
                      <h6>web development</h6>
                      <p className="mt-3 mb-5">
                        Ranking: <span>1/10</span>
                      </p>
                    </div>
                  </div>

                  <div className="col-sm-2 col-md-2 ms-auto mt-2 me-3">
                    <Link to="/editprofile">
                      <input
                        type="submit"
                        className="btn btn-outline-secondary"
                        name="btn"
                        value="edit profile"
                      ></input>
                    </Link>
                  </div>
                </div>
                <div className="row mt-4 ms-3">
                  {/* left side */}

                  <div className="col-md-4">
                    <div className="profile-work">
                      <p>WORK LINK</p>
                      <a
                        href="https://www.youtube.com/"
                        target="_blank"
                        rel="noreferrer"
                      >
                        YOU TUBE
                      </a>
                      <br />
                      <a
                        href="https://www.instagram.com/"
                        target="_blank"
                        rel="noreferrer"
                      >
                        INSTAGRAM
                      </a>
                      <br />
                      <a
                        href="https://mail.google.com/"
                        target="_blank"
                        rel="noreferrer"
                      >
                        GMAIL
                      </a>
                      <br />
                      <a
                        href="https://www.facebook.com/"
                        target="_blank"
                        rel="noreferrer"
                      >
                        FACEBOOK
                      </a>
                      <br />
                      <a
                        href="https://www.github.com/"
                        target="_blank"
                        rel="noreferrer"
                      >
                        GITHUB
                      </a>
                      <br />
                      <a
                        href="https://www.amazon.in/"
                        target="_blank"
                        rel="noreferrer"
                      >
                        AMAZON
                      </a>
                    </div>
                  </div>

                  {/* right side */}

                  <div className="col-md-8 pl-5">
                    <div className="tab-content">
                      <div className="row">
                        <div className="col-md-6">
                          <label>user ID</label>
                        </div>
                        <div className="col-md-6">
                          <p>{user._id}</p>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-6">
                          <label>NAME</label>
                        </div>
                        <div className="col-md-6">
                          <p>{user.name}</p>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-6">
                          <label>EMAIL</label>
                        </div>
                        <div className="col-md-6">
                          <p>{user.email}</p>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-6">
                          <label>PHONE NO.</label>
                        </div>
                        <div className="col-md-6">
                          <p>{user.phone}</p>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-6">
                          <label>PROFESSION</label>
                        </div>
                        <div className="col-md-6">
                          <p>{user.profession}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
