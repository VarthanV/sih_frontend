import React, { useState } from "react";
import { addStudentRoute } from "./helperConstants";
import Navbar from './navbar';
import './login.css';
import axios from "axios";
export default function AddChild() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState(false);
  const [aadharNo, setAadharNo] = useState("");
  const [imageFile, setImageFile] = useState("");
  const [imgURL, setImgURL] = useState("");
  const [age, setAge] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("");
  const [city, setCity] = useState("");
  const [hasBiologicalParent, setBiologicalParent] = useState(true);
  const [CWCeligible, setCWCeligible] = useState(true);
  const [parentLeft, setparentLeft] = useState(true);
  const [district, setDistrict] = useState("");
  const [schoolName, setSchoolName] = useState("");
  const handleChange = (setFunc, value) => {
    setFunc(value);
  };
  const handleFileUpload = e => {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    setImageFile(e.target.files[0]);
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      console.log(reader.result);

      setImgURL(reader.result);
    };
  };

  const handleSubmit = e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("aadhar_no", aadharNo);
    formData.append("first_name", firstName);
    formData.append("last_name", lastName);
    formData.append("image", imageFile);
    formData.append("address", address);
    formData.append("center_id", localStorage.getItem("center_id"));
    formData.append("gender", gender);
    formData.append("age", parseInt(age));
    formData.append("biological_parent", hasBiologicalParent);
    formData.append("cwc_eligible", CWCeligible);
    formData.append("parent_left", parentLeft);
    formData.append("district", district);
    formData.append("school_name", schoolName);
    formData.append("date_registered",null)
    formData.append('city',city);
    axios({
      method: "post",
      url: addStudentRoute,
      data: formData,
      headers: {
        "content-type": "application/form-data",
        Authorization: localStorage.getItem("token")
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
      })
      .catch(err => setError(true));
  };
  return (
    <div>
      <Navbar></Navbar>
      
      <div className=" container signup-card">
        <div>
          <div className="container-login100">
            <div className="wrap-login100">
            
        <form onSubmit={e => handleSubmit(e)} className="login100-form">
              <span className="login100-form-title">
                Add Child
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
                    <label for="childFirstName" className="emp-id">First Name</label>
                    <input
                      className="form-control"
                      type="text"
                      id="childFirstName"
                      value={firstName}
                      onChange={e => handleChange(setFirstName, e.target.value)}
                      placeholder="Enter your First Name"
                      autoComplete="off"
                      required
                    ></input>
                  </div>
                  <div className="user col">
                    <label for="childLastName" className="emp-id">Last Name</label>
                    <input
                      className="form-control"
                      id="childLastName"
                      type="text"
                      value={lastName}
                      onChange={e => handleChange(setLastName, e.target.value)}
                      placeholder="Enter your Last Name "
                      autoComplete="off"
                      required
                    ></input>
                  </div>
                </div>
                <div className="row">
                  <div className="user col">
                    <label for="childAge" className="emp-id">Age</label>
                    <input
                      className="form-control"
                      type="number"
                      id="childAge"
                      value={age}
                      onChange={e => handleChange(setAge, e.target.value)}
                      placeholder="Enter your  Age  "
                      autoComplete="off"
                      required
                    ></input>{" "}
                  </div>
                  <div className="user col">
                    <label for="childCity" className="emp-id">City</label>
                    <input
                      className="form-control"
                      type="text"
                      id="childCity"
                      value={city}
                      onChange={e => handleChange(setCity, e.target.value)}
                      placeholder="Enter your  City "
                      autoComplete="off"
                      required
                    ></input>{" "}
                  </div>
                </div>
                <div className="row">
                  <div className="user col">
                    <label for="childDistrict" className="emp-id">District</label>
                    <input
                      className="form-control"
                      id="childDistrict"
                      type="text"
                      value={district}
                      onChange={e => handleChange(setDistrict, e.target.value)}
                      placeholder="Enter your  District "
                      autoComplete="off"
                      required
                    ></input>{" "}
                  </div>
                  <div className="user col">
                    <label for="childSchoolName" className="emp-id">School Name</label>
                    <input
                      className="form-control"
                      id="childSchoolName"
                      type="text"
                      value={schoolName}
                      onChange={e => handleChange(setSchoolName, e.target.value)}
                      placeholder="Enter School Name "
                      autoComplete="off"
                    ></input>{" "}
                  </div>
                </div>
              </div>
            </div>
            <div className="row bottom-layer">
              <div className="user1">
                <label for="childAadhar" className="emp-id">Aadhar Number</label>
                <input
                  className="form-control"
                  type="number"
                  id="childAadhar"
                  value={aadharNo}
                  onChange={e => handleChange(setAadharNo, e.target.value)}
                  placeholder="Enter your Aadhar No "
                  autoComplete="off"
                  required
                ></input>{" "}
              </div>
              <div className="user1">
                <label for="childGender" className="emp-id">Gender</label>
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
                <label for="childBioParent" className="emp-id"> Has Biological Parent ?</label>
                <input
                  type="checkbox"
                  id="childBioParent"
                  value={hasBiologicalParent}
                  required
                  onChange={() => {
                    setBiologicalParent(!hasBiologicalParent);
                    console.log(hasBiologicalParent);
                  }}
                ></input>{" "}
              </div>
              <div className="user1">
                <label for="childCWC" className="emp-id"> Is CWC Eligible?</label>
                <input
                  type="checkbox"
                  id="childCWC"
                  value={CWCeligible}
                  required
                  onChange={() => {
                    setCWCeligible(!CWCeligible);
                  }}
                ></input>{" "}
              </div>
              <div className="user1">
                <label for="childParentLeft" className="emp-id"> Has Parent Left ?</label>
                <input
                  type="checkbox"
                  id="childParentLeft"
                  value={parentLeft}
                  required
                  onChange={() => {
                    setparentLeft(!parentLeft);
                  }}
                ></input>{" "}
              </div>
              <div className="user1">
                <label for="childAddress" className="emp-id">Address</label>
                <textarea
                  value={address}
                  className="form-control"
                  id="childAddress"
                  rows="3"
                  onChange={e => handleChange(setAddress, e.target.value)}
                ></textarea>
              </div>
            </div>
            <div className="submit-layer">
              <button type="submit" className="btn submit-btn">
                {" "}
                Add Child{" "}
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
