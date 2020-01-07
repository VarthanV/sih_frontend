import React, { useState } from "react";
export default function AddGuardians(props) {
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
    formData.append("district", district);
    formData.append("city", city);
    formData.append("married", isMarried);
    formData.append("unique_id", id);
  };

  return (
    <div className="container">
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
            type="email"
            value={email}
            onChange={e => handleChange(setEmail, e.target.value)}
            placeholder="Enter your Email "
            autoComplete="off"
            required
          ></input>{" "}
          <br></br>
          <input
            className="form-control mt-5"
            type="text"
            value={age}
            onChange={e => handleChange(setFirstName, e.target.value)}
            placeholder="Enter your  First Name "
            autoComplete="off"
            required
          ></input>{" "}
          <br></br>
          <input
            className="form-control mt-5"
            type="text"
            value={gender}
            onChange={e => handleChange(setGender, e.target.value)}
            placeholder="Gender"
            autoComplete="off"
            required
          ></input>{" "}
          <br></br>
          <textarea
            value={address}
            onChange={e => handleChange(setAddress, e.target.value)}
          ></textarea>
          <input
            className="form-control mt-5"
            type="text"
            value={age}
            onChange={e => handleChange(setLastName, e.target.value)}
            placeholder="Enter your  Last Name "
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
            value={aadharNo}
            onChange={e => handleChange(setAadharNo, e.target.value)}
            placeholder="Enter your Aadhar No "
            autoComplete="off"
            required
          ></input>{" "}
          <br></br>
          <label> Is married ?</label>
          <input
            type="checkbox"
            value={isMarried}
            required
            onChange={() => {
              setIsMarried(!isMarried);
              console.log(isMarried);
            }}
          ></input>{" "}
          <label> Has child ?</label>
          <input
            type="checkbox"
            value={hasChild}
            required
            onChange={() => {
              setHasChild(!hasChild);
            }}
          ></input>{" "}
          <input
            type="text"
            value={noOfChild}
            onChange={e => handleChange(setChild, parseInt(e.target.value))}
          ></input>
          <br></br>
          <button type="submit" className="btn btn-primary">
            {" "}
            Submit{" "}
          </button>
        </div>
      </form>
    </div>
  );
}
