import React, { useState } from "react";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import axios from "axios";
import { useHistory } from 'react-router-dom';
import { addAchievementRoute } from "./helperConstants";
export default function AddAchievements(props) {
  const history = useHistory()
  const id = props.match.params.id;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState("");
  const [imgURL, setImgURL] = useState("");
  const [error, setError] = useState(false);

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
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", imageFile);
    formData.append("unique_id", id);
    axios({
      method: "post",
      data: formData,
      url: addAchievementRoute,
      headers: {
        "content-type": "application/form-data",
        Authorization: localStorage.getItem("token")
      }
    })
      .then(data => {
        history.push("/student/" + id)
        console.log(data)
      })
      .catch(err => console.log(err));
  };
  const handleChange = (setFunc, value) => {
    setFunc(value);
  };
  return (
    <div className=" addChildBody mt-10 pt-10 ">
    

      <div className="signup-card">
        <div className="loginformcontainer">
          <div className="container-login100">
            <div className="wrap-login100">
              <form onSubmit={e => handleSubmit(e)} className="login100-form">
                <span className="login100-form-title">Register</span>
                {error === true ? (
                  <p className="alert alert-danger" role="alert">
                    {" "}
                    Email or Username already exist,Please login with your
                    credentials{" "}
                  </p>
                ) : (
                  <div> </div>
                )}
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
                            Title{" "}
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            id="childFirstName"
                            value={title}
                            onChange={e =>
                              handleChange(setTitle, e.target.value)
                            }
                            placeholder="Title"
                            autoComplete="off"
                            required
                          ></input>
                        </div>
                        <div className="user col">
                          <label htmlFor="childLastName" className="emp-id">
                            Description
                          </label>
                          <CKEditor
                            editor={ClassicEditor}
                            data="<p>Hello from CKEditor 5!</p>"
                            onInit={editor => {
                              // You can store the "editor" and use when it is needed.
                              console.log("Editor is ready to use!", editor);
                            }}
                            onChange={(event, editor) => {
                              const data = editor.getData();
                              setDescription(data);
                              console.log(data);
                            }}
                            onBlur={(event, editor) => {
                              console.log("Blur.", editor);
                            }}
                            onFocus={(event, editor) => {
                              console.log("Focus.", editor);
                            }}
                          />
                        </div>
                      </div>
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
