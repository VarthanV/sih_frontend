import React, { useState, useEffect } from "react";
import { studentDetailRoute, baseImgRoute } from "./helperConstants";
import { Link } from "react-router-dom";
export default function StudentDetail(props) {
  const id = props.match.params.id;
  const [student, setStudent] = useState({});

  useEffect(() => {
    let url = new URL(studentDetailRoute);
    let params = {
      unique_id: id
    };
    url.search = new URLSearchParams(params).toString();
    const headers = {
      Authorization: localStorage.getItem("token")
    };
    fetch(url, {
      method: "GET",
      headers: headers
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);

        setStudent(data);
        
        
      });
  }, {});

  return (
    <div className="container text-center">
      <div class="card mt-5 ">
        <div class="card-body">
          <div className="row">
            <img
              className="avatar mr-10"
              src={baseImgRoute + student.image}
              alt={student.name}
            ></img>
            <h4 className="lead ml-10"> {student.name}</h4>
          </div>
          <div className="left-align pt-5">
            <h3> Address :</h3> <p> {student.address}</p>
          </div>
          <p> Gender : {student.gender}</p>
          <p> Age :{student.age}</p>
          <p> District : {student.district}</p>
          <p>
            {" "}
            Has Biological Parent :{" "}
            {student.has_biologicalParent ? <p> Yes </p> : <p> No </p>}{" "}
          </p>
          <p> School Name : {student.school_name}</p>
        </div>
        <div className="card">
          <h3> Guardians </h3>
          {student.guardians !== undefined ? (
            student.guardians.map((item, index) => (
              <div key={index} className="row">
                <img
                  className="avatar mr-10"
                  src={baseImgRoute + item.image}
                  alt={item.name}
                ></img>
                <h4 className="lead ml-10"> {item.name}</h4>
                <Link
                  to={"addguardian/" + student.unique_id}
                  className="btn btn-danger"
                >
                  {" "}
                  Add Guardian{" "}
                </Link>
              </div>
            ))
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
}
