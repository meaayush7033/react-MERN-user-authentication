import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Contact() {
  const [success, setSuccess] = useState("");
  const [user, setUser] = useState("");
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [err, setErr] = useState("");

  const callContact = async () => {
    try {
      const res = await fetch("/getuser", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      setUser(data);

      if (res.status !== 200 || !data) {
        navigate("/login");
      }
    } catch (error) {
      navigate("/login");
    }
  };

  useEffect(() => {
    callContact();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const send = async (e) => {
    e.preventDefault();
    const res = await fetch("/contactus", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });
    const data = await res.json();

    if (res.status === 200) {
      setMessage("");
      setSuccess("Your Message sent successfully");
      setTimeout(() => {
        setSuccess("");
      }, 3000);
    } else {
      setErr(data.error);
      setTimeout(() => {
        setErr("");
      }, 3000);
    }
  };

  return (
    <section className="contact container">
      <div className="container-fluid">
        <div className="row d-flex justify-content-center align-items-center">
          <div className="col-md10 col-lg-10 col-xl-10">
            <div className="row justify-content-between align-items-center offset-1">
              <div className="col-md-3 col-lg-3 col-xl-3 order-1 order-lg-1">
                {/* phone number */}
                <div className="d-flex justify-content-start align-items-center">
                  <i className="fas fa-mobile fa-lg me-3 fa-fw mt-auto"></i>
                  <div>
                    <div className="heading">Phone</div>
                    <div className="para">+91 7033 587 821</div>
                  </div>
                </div>
              </div>

              <div className="col-md-3 col-lg-3 col-xl-3 d-flex order-2 order-lg-2">
                {/* email */}
                <div className="d-flex justify-content-start align-items-center">
                  <i className="fas fa-mobile fa-lg me-3 fa-fw mt-auto"></i>
                  <div>
                    <div className="heading">Email</div>
                    <div className="para">meaayushmishra@gmail.com</div>
                  </div>
                </div>
              </div>

              <div className="col-md-3 col-lg-3 col-xl-3 d-flex order-3 order-lg-3">
                {/* phone number */}
                <div className="d-flex justify-content-start align-items-center">
                  <i className="fas fa-mobile fa-lg me-3 fa-fw mt-auto"></i>
                  <div>
                    <div className="heading">Address</div>
                    <div className="para">patna city, patna</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* form */}

        <div className="container my-5 py-2 h-100">
          <div className="row justify-content-center align-items-center">
            <div className="col-12 col-lg-10 col-xl-8">
              <div className="card card-color shadow-2-strong card-registration">
                <div className="card-body p-4 p-md-5">
                  <h3 className="mb-4 pb-2 pb-md-0 mb-md-5">Get in touch</h3>
                  <form method="POST">
                    <div className="row d-flex justify-content-center align-items-center">
                      <div className="form-outline flex-fill mb-3 text-danger text-center success">
                        <label className="form-label" htmlFor="form3Example3c">
                          <h3>{success}{err}</h3>
                        </label>
                      </div>

                      <div className="col-md-4 mb-4 mx-auto">
                        <div className="form-outline">
                          <input
                            defaultValue={user.name}
                            type="text"
                            id="name"
                            className="form-control form-control-lg"
                            autoComplete="off"
                            readOnly
                          />
                        </div>
                      </div>
                      <div className="col-md-4 mb-4 mx-auto">
                        <div className="form-outline">
                          <input
                            defaultValue={user.email}
                            type="email"
                            id="email"
                            name="email"
                            className="form-control form-control-lg"
                            autoComplete="off"
                            readOnly
                          />
                        </div>
                      </div>
                      <div className="col-md-4 mb-4 mx-auto">
                        <div className="form-outline">
                          <input
                            defaultValue={user.phone}
                            type="tel"
                            id="phone"
                            name="phone"
                            className="form-control form-control-lg"
                            autoComplete="off"
                            readOnly
                          />
                        </div>
                      </div>
                    </div>

                    <div className="text-message">
                      <textarea
                        className="form-control mt-5"
                        placeholder="Message"
                        id="message"
                        name="message"
                        cols="30"
                        rows="10"
                        autoComplete="off"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                      ></textarea>
                    </div>

                    <div className="mt-4 pt-2">
                      <input
                        className="btn btn-outline-dark"
                        type="submit"
                        value="Send Message"
                        onClick={send}
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
