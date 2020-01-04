import React, { useState } from "react";
import { authRoute } from "./helperConstants";
import { useHistory } from "react-router-dom";
import axios from 'axios'
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
        <h4 className="signup-header"> SignUp ! </h4>
        {error === true ? (
          <p className="alert alert-danger" role="alert">
            {" "}
            Email or Username already exist,Please login with your credentials{" "}
          </p>
        ) : (
          <div> </div>
        )}
        <form onSubmit={e => handleSubmit(e)}>
          <div className="form-group">
            {imgURL ? <img src={imgURL} alt="profile" width="30%"></img> : <div> </div>}
            <h3> Upload your image </h3> <br></br>
            <input
              type="file"
              className="btn btn-primary"
              size="70"
              accept="image/*"
              onChange={e => handleFileUpload(e)}
            />
            <input
              className="form-control mt-5"
              type="text"
              value={employeeID}
              onChange={e => handleChange(setEmployeeID, e.target.value)}
              placeholder="Enter your  Employee ID "
              autoComplete="off"
              required
            ></input>{" "}
            <br></br>

            <input
              className="form-control mt-5"
              type="text"
              value={age}
              onChange={e => handleChange(setAge, e.target.value)}
              placeholder="Enter your  Age  "
              autoComplete="off"
              required
            ></input>{" "}
            <br></br>
            <input
              className="form-control mt-5"
              type="text"
              value={city}
              onChange={e => handleChange(setCity ,e.target.value)}
              placeholder="Enter your  City "
              autoComplete="off"
              required
            ></input>{" "}
            <br></br>
            <input
              className="form-control"
              type="email"
              value={email}
              onChange={e => handleChange(setEmail, e.target.value)}
              placeholder="Enter your Email"
              autoComplete="off"
              required
            ></input>{" "}
            <br></br>
            <input
              className="form-control"
              type="text"
              value={firstName}
              onChange={e => handleChange(setFirstName, e.target.value)}
              placeholder="Enter your First Name"
              autoComplete="off"
              required
            ></input>
            <br></br>
            <input
              className="form-control"
              type="text"
              value={lastName}
              onChange={e => handleChange(setLastName, e.target.value)}
              placeholder="Enter your Last Name "
              autoComplete="off"
              required
            ></input>
            <br></br>
            <input
              className="form-control"
              type="text"
              value={aadharNo}
              onChange={e => handleChange(setAadharNo, e.target.value)}
              placeholder="Enter your Aadhar No "
              autoComplete="off"
              required
            ></input>{" "}
            <br></br>
            <input
              className="form-control mt-5"
              type="text"
              value={gender}
              onChange={e => handleChange(setGender, e.target.value)}
              placeholder="Enter your Gender "
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
            ></input>
            <br></br>
            <input
              className="form-control"
              type="password"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              autoComplete="off"
              required
            ></input>
            <br></br>
            <h4> Address </h4>
            <textarea 
            value={address}
            onChange= {(e) =>handleChange(setAddress,e.target.value)}
            ></textarea>
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
