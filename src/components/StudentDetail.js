import React, { useState, useEffect, useContext } from "react";
import { studentDetailRoute, baseImgRoute } from "./helperConstants";
import "../css/login.css";
import { StudentContext } from "../context/StudentContext";
import md5 from 'md5';
import { Link } from "react-router-dom";
import Guardians from "./Guardians";
import Achievements from "./Achievements";
export default function StudentDetail(props) {
  const { attendance, getStudent, addStudents ,markPresent } = useContext(StudentContext);
  const id = props.match.params.id;
  const [student, setStudent] = useState({});
  const [achievements, setAchievements] = useState([]);
  const [guardians, setGuardians] = useState([]);
  const [fingerPrintHash,setFingerPrintHash] = useState("");
  const hashImage = e =>{
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];

    reader.readAsDataURL(file);
    reader.onloadend = () => {
      const hash = md5(reader.result);
      setFingerPrintHash(hash);
      console.log(fingerPrintHash);
      markPresent(fingerPrintHash);
      

  }
}
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
        setGuardians(data.guardians);
        addStudents();
        getStudent(id);
        console.log(attendance);

      });
  }, []);

  return (
    <div>
      <div className="container">
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
                      School :
                      <div className="emp-d">
                        {student.school_name === ""
                          ? "Not entered yet"
                          : student.school_name}
                      </div>
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
                      Aadhar No :
                      <div className="emp-d">
                        {student.aadhar_no === ""
                          ? "Not entered yet"
                          : student.aadhar_no}
                      </div>
                    </div>
                  </div>
                  <div className="user col">
                    <div className="row emp-di">
                      Biological Parent :
                      <div className="emp-d">
                        {student.has_biologicalParent === true
                          ? "Available"
                          : "Not Available"}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="user col">
                    <div className="row emp-di">
                      CWC :
                      <div className="emp-d">
                        {student.is_cwc_eligible === true
                          ? "Eligible"
                          : "Not Eligible"}
                      </div>
                    </div>
                  </div>
                  <div className="user col">
                    <div className="row emp-di">
                      Address:
                      <div className="emp-d">{student.address}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row pt-5">
              <div className="col-8 detail-title">Guardian Details</div>
              <div className="col-4 detail-edit">
                <Link to={id + "/addguardian"}>Add Guardian</Link>
              </div>
            </div>

            {guardians.length === 0 ? (
              <div className="row pt-5 justify-content-centent">
                No guardians
              </div>
            ) : (
              guardians.map(item => (
                <div className="pt-5">
                  <Guardians
                    name={item.name}
                    uniqueid={item.unique_id}
                    image={item.image}
                    age={item.age}
                    city={item.city}
                    district={item.district}
                    gender={item.gender}
                    aadhar_no={item.aadhar_no}
                    marital_status={item.is_married}
                    has_child={item.has_child}
                    address={item.address}
                    no_of_child={item.no_of_child}
                  ></Guardians>
                </div>
              ))
            )}

            <div className="row pt-5 pl-1">
              <div className="col-8 detail-title">Achievement Details</div>
              <div className="col-4 detail-edit">
                <Link to={id + "/addachievements"}>Add Achievement</Link>
              </div>
            </div>

            {achievements.length === 0 ? (
              <div className="row pt-5 justify-content-center">
                No Achievements yet
              </div>
            ) : (
              achievements.map(item => (
                <div className="pt-5 pl-3">
                  <Achievements
                    image={item.image}
                    title={item.title}
                    description={item.description}
                  ></Achievements>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
