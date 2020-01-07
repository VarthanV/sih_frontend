import React, { useState } from "react";
import './login.css';
import { authRoute } from "./helperConstants";
import { useHistory } from "react-router-dom";
import axios from 'axios'
import Navbar from './navbar';
export default function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassowrd] = useState("");
  const [lastName, setLastName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(false);
  const [employeeID, setEmployeeID] = useState("");
  const [aadharNo, setAadharNo] = useState("");
  const [imageFile, setImageFile] = useState("");
  const [imgURL, setImgURL] = useState("");
  const [age,setAge]  = useState("");
const [address,setAddress] = useState("");
const [gender,setGender] = useState("");
const [city,setCity] = useState("");
  const history = useHistory();
  const handleChange = (setFunc, value) => {
    setFunc(value);
  };
  const handleFileUpload = e => {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    setImageFile(e.target.files[0]);
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      console.log(reader.result);
      
      setImgURL(reader.result);

      

    };
  };
  const handleSubmit = e => {
    e.preventDefault();
    let formData = new FormData();
    //formData.append("username", name);
    formData.append("email", email);
    formData.append("aadhar_no",aadharNo);
    formData.append("first_name",firstName);
    formData.append("last_name",lastName);
    formData.append("employee_id",employeeID);
    formData.append("image",imageFile); 
    formData.append("password", password);
    formData.append("age", parseInt(age));
    formData.append("address",address);
    formData.append("center_id",localStorage.getItem("center_id"))
    formData.append("gender",gender)
    formData.append("city",city);
    console.log(formData.email);
    console.log(formData.gender);
    
    axios({
      method: "post",
      url:authRoute,
      data: formData,
      headers:{
        'content-type': 'application/form-data',
      }

    })
      .then(res => res.json())
      .then(data => {
        if (data["registered"]) {
          history.push("/login");
        }
      })
      .catch(err => setError(true));
  };
  return (
    <div>
      <div className=" container signup-card">
        <div>
          <div className="container-login100">
            <div className="wrap-login100">
              <form onSubmit={e => handleSubmit(e)} className="login100-form">
              <span className="login100-form-title">
                Sign Up
              </span>
              {error === true ? (
                <p className="alert alert-danger" role="alert">
                  {" "}
                  Email or Username already exist,Please login with your credentials{" "}
                </p>
              ) : (
                <div> </div>
              )}
              <div className="form-group">
                <div className="top-layer row">
                  <div className="col-sm-4 col-lg-3">
                    <div className="user-img-div">
                      {imgURL ? <img src={imgURL} alt="profile" className="user-img"></img> : <img className="user-img" src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png" alt="profile" width="30%"></img>}
                      <br></br>
                      <hr></hr>
                      <input
                        type="file"
                        id="uploadimg"
                        className="file-upload"
                        name="upload"
                        size="70"
                        accept="image/*"
                        onChange={e => handleFileUpload(e)}
                      />
                      <label for="uploadimg" className="btn upload-btn"> Upload Image </label>
                    </div>
                  </div> 
                  <div className="col">
                    <div className="row">
                      <div className="user col">
                        <label for="employeeId" className="emp-id">Employee ID</label>
                        <input
                          className="form-control mt-1"
                          type="text"
                          id="employeeId"
                          value={employeeID}
                          onChange={e => handleChange(setEmployeeID, e.target.value)}
                          placeholder="Enter your  Employee ID "
                          autoComplete="off"
                          required
                        ></input>{" "}
                      </div>
                      <div className="user col">
                        <label for="employeeAge" className="emp-id">Age</label>
                        <input
                          className="form-control mt-1"
                          id="employeeAge"
                          type="number"
                          value={age}
                          onChange={e => handleChange(setAge, e.target.value)}
                          placeholder="Enter your  Age  "
                          autoComplete="off"
                          required
                        ></input>{" "}
                      </div>
                    </div>
                    <div className="row">
                      <div className="user col">
                        <label for="employeeCity" className="emp-id">City</label>
                        <input
                          className="form-control mt-1"
                          id="employeeCity"
                          type="text"
                          value={city}
                          onChange={e => handleChange(setCity ,e.target.value)}
                          placeholder="Enter your  City "
                          autoComplete="off"
                          required
                        ></input>{" "}
                      </div>     
                      <div className="user col">
                        <label for="employeeEmail" className="emp-id">Email</label>
                        <input
                          className="form-control"
                          type="email"
                          id="employeeEmail"
                          value={email}
                          onChange={e => handleChange(setEmail, e.target.value)}
                          placeholder="Enter your Email"
                          autoComplete="off"
                          required
                        ></input>{" "}
                      </div>
                    </div> 
                    <div className="row">
                      <div className="user col">
                        <label for="employeeFirstName" className="emp-id">First Name</label>
                        <input
                          className="form-control"
                          id="employeeFirstName"
                          type="text"
                          value={firstName}
                          onChange={e => handleChange(setFirstName, e.target.value)}
                          placeholder="Enter your First Name"
                          autoComplete="off"
                          required
                        ></input>
                      </div>
                      <div className="user col">
                        <label for="employeeLastName" className="emp-id">Last Name</label>
                        <input
                          className="form-control"
                          id="employeeLastName"
                          type="text"
                          value={lastName}
                          onChange={e => handleChange(setLastName, e.target.value)}
                          placeholder="Enter your Last Name "
                          autoComplete="off"
                          required
                        ></input>
                      </div>
                    </div> 
                  </div>                 
                </div>
                <div className="row bottom-layer">
                  <div className="user1">
                    <label for="employeeAadharNo" className="emp-id">Aadhar No</label>
                    <input
                      className="form-control"
                      type="number"
                      id="employeeAadharNo"
                      value={aadharNo}
                      onChange={e => handleChange(setAadharNo, e.target.value)}
                      placeholder="Enter your Aadhar No "
                      autoComplete="off"
                      required
                    ></input>{" "}
                  </div>
                  <div className="user1">
                    <label for="employeeGender" className="emp-id">Gender</label>
                    <select 
                      className="form-control" 
                      id="employeeGender"
                      value={gender}
                      onChange={e => handleChange(setGender, e.target.value)}
                      required
                    >
                      <option>Choose . . .</option>
                      <option>Male</option>
                      <option>Female</option>
                      <option>Transgender</option>
                    </select>
                  </div>
                  <div className="user1">
                    <label for="employeePassword" className="emp-id">Password</label>
                    <input
                      className="form-control"
                      type="password"
                      id="employeePassword"
                      value={password}
                      onChange={e => setPassowrd(e.target.value)}
                      placeholder="Enter your password"
                      autoComplete="off"
                    ></input>
                  </div>
                  <div className="user1">
                    <label for="employeeConfirmPassword" className="emp-id">Confirm Password</label>
                    <input
                      className="form-control"
                      id="employeeConfirmPassword"
                      type="password"
                      value={confirmPassword}
                      onChange={e => setConfirmPassword(e.target.value)}
                      placeholder="Confirm your password"
                      autoComplete="off"
                      required
                    ></input>
                  </div>
                  <div className="user1">
                    <label for="employeeAddress" className="emp-id">Address</label>
                    <textarea 
                    value={address}
                    className="form-control"
                    id="employeeAddress"
                    rows="3"
                    onChange= {(e) =>handleChange(setAddress,e.target.value)}
                    ></textarea>
                  </div>
                </div>
                <div className="submit-layer">
                  <button type="submit" className="btn submit-btn">
                    {" "}
                    Sign Up{" "}
                  </button>
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
