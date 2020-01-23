import React, { useState } from "react";
import { useHistory } from 'react-router-dom'
import axios from "axios";
import "../css/login.css";
import { addGuardianRoute } from "./helperConstants";
export default function AddGuardians(props) {
  const history = useHistory();
  const id = props.match.params.id;
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [lastName, setLastName] = useState("");
  const [aadharNo, setAadharNo] = useState("");
  const [imageFile, setImageFile] = useState("");
  const [imgURL, setImgURL] = useState("");
  const [age, setAge] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("");
  const [city, setCity] = useState("");
  const [isMarried, setIsMarried] = useState(true);
  const [noOfChild, setChild] = useState(0);
  const [hasChild, setHasChild] = useState(true);
  const [district, setDistrict] = useState("");

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
      //console.log(reader.result);

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
    formData.append("district", district);
    formData.append("city", city);
    formData.append("married", isMarried);
    formData.append("child", hasChild);
    formData.append("no_child", noOfChild);
    formData.append("unique_id", id);
    formData.append("email", email);
    axios({
      method: "post",
      url: addGuardianRoute,
      data: formData,
      headers: {
        "content-type": "application/form-data",
        Authorization: localStorage.getItem("token")
      }
    })
      .then(data => {
        
        console.log(data);
        history.push("/student/" + id)
      })
      .catch(err => console.log(err));
  };

  return (
    <div>
      <div className="container">

        <div className="signup-card">
          <div className="loginformcontainer">
            <div className="container-login100">
              <div className="wrap-login100">
                <form onSubmit={e => handleSubmit(e)} className="login100-form">
                  <span className="login100-form-title">Register</span>
                  <div className="form-group">
                    <div className="top-layer row">
                      <div className="col-sm-4 col-lg-3">
                        <div className="user-img-div">
                          {imgURL ? (
                            <img
                              src={imgURL}
                              alt="profile"
                              className="user-img"
                            ></img>
                          ) : (
                              <img
                                className="user-img"
                                src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"
                                alt="profile"
                                width="30%"
                              ></img>
                            )}
                          <br></br>
                          <hr></hr>
                          <input
                            required
                            type="file"
                            id="uploadimg"
                            className="file-upload"
                            name="upload"
                            size="70"
                            accept="image/*"
                            onChange={e => handleFileUpload(e)}
                          />
                          <label htmlFor="uploadimg" className="btn upload-btn">
                            {" "}
                            Upload Image{" "}
                          </label>
                        </div>
                      </div>

                      <div className="col">
                        <div className="row">
                          <div className="user col">
                            <label htmlFor="childFirstName" className="emp-id">
                              First Name
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              id="childFirstName"
                              value={firstName}
                              onChange={e =>
                                handleChange(setFirstName, e.target.value)
                              }
                              placeholder="Enter your First Name"
                              autoComplete="off"
                              required
                            ></input>
                          </div>
                          <div className="user col">
                            <label htmlFor="childLastName" className="emp-id">
                              Last Name
                            </label>
                            <input
                              className="form-control"
                              id="childLastName"
                              type="text"
                              value={lastName}
                              onChange={e =>
                                handleChange(setLastName, e.target.value)
                              }
                              placeholder="Enter your Last Name "
                              autoComplete="off"
                              required
                            ></input>
                          </div>
                        </div>
                        <div className="row">
                          <div className="user col">
                            <label htmlFor="childAge" className="emp-id">
                              Age
                            </label>
                            <input
                              className="form-control"
                              type="number"
                              id="childAge"
                              value={age}
                              onChange={e =>
                                handleChange(setAge, e.target.value)
                              }
                              placeholder="Enter your  Age  "
                              autoComplete="off"
                              required
                            ></input>{" "}
                          </div>
                          <div className="user col">
                            <label htmlFor="childCity" className="emp-id">
                              City
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              id="childCity"
                              value={city}
                              onChange={e =>
                                handleChange(setCity, e.target.value)
                              }
                              placeholder="Enter your  City "
                              autoComplete="off"
                              required
                            ></input>{" "}
                          </div>
                        </div>
                        <div className="row">
                          <div className="user col">
                            <label htmlFor="childDistrict" className="emp-id">
                              District
                            </label>
                            <input
                              className="form-control"
                              id="childDistrict"
                              type="text"
                              value={district}
                              onChange={e =>
                                handleChange(setDistrict, e.target.value)
                              }
                              placeholder="Enter your  District "
                              autoComplete="off"
                              required
                            ></input>{" "}
                          </div>
                          <div className="user col">
                            <label htmlFor="childAadhar" className="emp-id">
                              Aadhar Number
                            </label>
                            <input
                              className="form-control"
                              type="number"
                              id="childAadhar"
                              value={aadharNo}
                              required
                              onChange={e =>
                                handleChange(setAadharNo, e.target.value)
                              }
                              placeholder="Enter your Aadhar No "
                              autoComplete="off"
                            ></input>{" "}
                          </div>
                        </div>
                        <div className="row">
                          <div className="user col">
                            <label htmlFor="childEmail" className="emp-id">Email</label>
                            <input
                              className="form-control"
                              type="email"
                              id="childEmail"
                              value={email}
                              onChange={e =>
                                handleChange(setEmail, e.target.value)
                              }
                              placeholder="Enter your Email "
                              autoComplete="off"
                            />
                          </div>

                        </div>
                      </div>
                    </div>
                    <div className="row bottom-layer">
                      <div className="user1">
                        <label htmlFor="childGender" className="emp-id">
                          Gender
                        </label>
                        <select
                          required
                          className="form-control"
                          id="employeeGender"
                          value={gender}
                          onChange={e =>
                            handleChange(setGender, e.target.value)
                          }
                        >
                          <option value="">Choose . . .</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Transgender">Transgender</option>
                        </select>
                      </div>
                      <div className="user1">
                        <label htmlFor="childCWC" className="emp-id">
                          Is married ?
                        </label>
                        <input
                          type="checkbox"
                          id="childCWC"
                          value={isMarried}
                          onChange={() => {
                            setIsMarried(!isMarried);
                            console.log(isMarried);
                          }}
                        ></input>{" "}
                      </div>
                      <div className="user1">
                        <label htmlFor="childCWC" className="emp-id">
                          Has child ?
                        </label>
                        <input
                          type="checkbox"
                          id="childCWC"
                          value={hasChild}
                          onChange={() => {
                            setHasChild(!hasChild);
                          }}
                        ></input>{" "}
                      </div>
                      <div className="user1">
                        <label htmlFor="childAge" className="emp-id">
                          No of Children
                        </label>
                        <input
                          className="form-control"
                          type="number"
                          id="childAge"
                          value={noOfChild}
                          onChange={e =>
                            handleChange(setChild, parseInt(e.target.value))
                          }
                          placeholder="No. of Children  "
                          autoComplete="off"
                        ></input>{" "}
                      </div>
                      <div className="user1">
                        <label htmlFor="childAddress" className="emp-id">
                          Address
                        </label>
                        <textarea
                          value={address}
                          className="form-control"
                          id="childAddress"
                          rows="2"
                          onChange={e =>
                            handleChange(setAddress, e.target.value)
                          }
                        ></textarea>
                      </div>
                    </div>
                    <div className="submit-layer">
                      <button type="submit" className="btn submit-btn">
                        {" "}
                        Add Guardian{" "}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
