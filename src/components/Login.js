import React, { useState } from "react";
import { loginRoute } from "./helperConstants";
import './login.css';
import { BrowserRouter as Route,Link } from 'react-router-dom';

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
        console.log(err);
        setError(true);
      });
  };
  return (

      <div>
        <div className="container pb-5 signup-card ">
          <div>
            <div className="container-login100">
              <div className="wrap-login100">
                <form onSubmit={e => handleSubmit(e)} className="login100-form">
                  <span className="login100-form-title">
                    Login
                  </span>
                  {error === true ? (
                    <p className="alert alert-danger" role="alert">
                      {" "}
                      Incorrect email or password ,Please try again later
                    </p>
                  ) : (
                    <div> </div>
                  )}
                  <div>
                    <div className="wrap-input100">
                      <input
                        className={`input100 ${email === "" ? "" : "has-val"}`} 
                        type="text" 
                        name="email" 
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        autoComplete="off"
                        required
                      />
                      <span className="focus-input100"></span>
                      <span className="label-input100">Email</span>
                    </div>
                    <div className="wrap-input100">
                      <input 
                        className={`input100 ${password === "" ? "" : "has-val"}`} 
                        type="password" 
                        name="pass"
                        value={password}
                        onChange={e => setPassowrd(e.target.value)} 
                        autoComplete="off"
                        required
                      />
                      <span className="focus-input100"></span>
                      <span className="label-input100">Password</span>
                    </div>
                    <div class="container-login100-form-btn">
                      <button type="submit" class="login100-form-btn">
                        Login
                      </button>
                    </div>
                    <div class="text-center">
                      <span class="txt2">
                        Don't have an account? <Link to="/register" className="signup-link">Sign Up</Link>
                      </span>
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
