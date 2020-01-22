import React, { useState, useEffect } from "react";
import { studentDetailRoute, baseImgRoute } from "./helperConstants";
import '../css/login.css';
import Navbar from './navbar'

import { Link } from "react-router-dom";
export default function StudentDetail(props) {
  const id = props.match.params.id;
  const [student, setStudent] = useState({});
  const [achievements, setAchievements] = useState([]);

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
        console.log(data.achievements);

        setStudent(data);
        setAchievements(data.achievements);


      });
  }, []);

  return (
    <div>
      <Navbar></Navbar>
      <div className="container">
        <div className="">
          {/* <div className="card-body">
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
          <div>
            
            Has Biological Parent :{student.has_biologicalParent ?  <p>Yes</p>  :  <p>No</p> }
          </div>
          <p> School Name : {student.school_name}</p>
        </div> */}
          {/* <div className="card">
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
        </div> */}
        </div>

        <div className="container">
          <div>
            <div className="row  pt-5 mt-5">
              <div className="col-8 detail-title">Student Details</div>
              <div className="col-4 detail-edit">edit</div>
            </div>
            <div className="top-layer row pt-4">
              <div className="col-sm-4 col-lg-3">
                <div className="user-img-div">
                  <img
                    className="user-img"
                    src={baseImgRoute + student.image}
                    alt={student.name}
                  />
                </div>
              </div>
              <div className="col ">
                <div className="row">
                  <div className="user col">
                    <div className="row emp-di">
                      Name :<div className="emp-d">{student.name}</div>
                    </div>
                  </div>
                  <div className="user col">
                    <div className="row emp-di">
                      Age :<div className="emp-d">{student.age}</div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="user col">
                    <div className="row emp-di">
                      City :<div className="emp-d">{student.city}</div>
                    </div>
                  </div>
                  <div className="user col">
                    <div className="row emp-di">
                      District :<div className="emp-d">{student.district}</div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="user col">
                    <div className="row emp-di">
                      School :<div className="emp-d">{student.school_name === "" ? 'Not entered yet' : student.school_name}</div>
                    </div>
                  </div>
                  <div className="user col">
                    <div className="row emp-di">
                      Gender :<div className="emp-d">{student.gender}</div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="user col">
                    <div className="row emp-di">
                      Aadhar No :<div className="emp-d">{student.aadhar_no === "" ? 'Not entered yet' : student.aadhar_no}</div>
                    </div>
                  </div>
                  <div className="user col">
                    <div className="row emp-di">
                      Biological Parent :<div className="emp-d">{student.has_biologicalParent === true ? 'Available' : 'Not Available'}</div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="user col">
                    <div className="row emp-di">
                      CWC :<div className="emp-d">{student.is_cwc_eligible === true ? 'Eligible' : 'Not Eligible'}</div>
                    </div>
                  </div>
                  <div className="user col">
                    <div className="row emp-di">
                      Achievements :<div className="emp-d">{achievements.length === 0 ? 'No achievements yet' : 'Achievements available'}</div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="user col">
                    <div className="row emp-di">
                      Address:
                    <div className="emp-d">{student.address}</div>
                    </div>
                  </div>
                  <div className="user col"></div>
                </div>
              </div>
            </div>
            <div className="row pt-5">
              <div className="col-8 detail-title">Guardian Details</div>
              <div className="col-4 detail-edit">add Guardian</div>
            </div>
            <div className="row pt-5 justify-content-center">
              {true ? 'No guardians available' : 'guardians available'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
