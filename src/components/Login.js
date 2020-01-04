import React, { useState } from "react";
import { loginRoute } from "./helperConstants";
export default function Login() {
  const [error, setError] = useState(false);
  const [password, setPassowrd] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    formData.append("deviceid", null);
    fetch(loginRoute, {
      method: "post",
      body: formData
    })
      .then(res => res.json())
      .then(data => {
        localStorage.setItem("token", `Token ${data.token}`);
      })
      .catch(err => {
        setError(true);
      });
  };
  return (
    <div>
      <div className="container pb-5 signup-card ">
        <h4 className="signup-header">Login </h4>
        {error === true ? (
          <p className="alert alert-danger" role="alert">
            {" "}
            Incorrect email or password ,Please try again later
          </p>
        ) : (
          <div> </div>
        )}
        <form onSubmit={e => handleSubmit(e)}>
          <div className="form-group">
            <input
              className="form-control"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Enter your Email"
              autoComplete="off"
              required
            ></input>{" "}
            <br></br>
            <input
              className="form-control"
              type="password"
              value={password}
              onChange={e => setPassowrd(e.target.value)}
              placeholder="Enter your password"
              autoComplete="off"
              required
            ></input>
            <br></br>
            <br></br>
            <button type="submit" className="btn btn-primary">
              {" "}
              Submit{" "}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
