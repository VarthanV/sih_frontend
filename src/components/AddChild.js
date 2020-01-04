import React, { useState } from "react";
import { addStudentRoute } from "./helperConstants";
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
            {imgURL ? (
              <img src={imgURL} alt="profile" width="30%"></img>
            ) : (
              <div> </div>
            )}
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
              onChange={e => handleChange(setCity, e.target.value)}
              placeholder="Enter your  City "
              autoComplete="off"
              required
            ></input>{" "}
            <br></br>
            <input
              className="form-control mt-5"
              type="text"
              value={district}
              onChange={e => handleChange(setDistrict, e.target.value)}
              placeholder="Enter your  District "
              autoComplete="off"
              required
            ></input>{" "}
            <br></br>
            <input
              className="form-control mt-5"
              type="text"
              value={schoolName}
              onChange={e => handleChange(setSchoolName, e.target.value)}
              placeholder="Enter School Name "
              autoComplete="off"
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
            <label> Has Biological Parent ?</label>
            <input
              type="checkbox"
              value={hasBiologicalParent}
              required
              onChange={() => {
                setBiologicalParent(!hasBiologicalParent);
                console.log(hasBiologicalParent);
              }}
            ></input>{" "}
            <br></br>
            <label> IS CWC Eligible?</label>
            <input
              type="checkbox"
              value={CWCeligible}
              required
              onChange={() => {
                setCWCeligible(!CWCeligible);
              }}
            ></input>{" "}
            <br></br>
            <label> Has Parent Left ?</label>
            <input
              type="checkbox"
              value={parentLeft}
              required
              onChange={() => {
                setparentLeft(!parentLeft);
              }}
            ></input>{" "}
            <br></br>
            <h4> Address </h4>
            <textarea
              value={address}
              onChange={e => handleChange(setAddress, e.target.value)}
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
