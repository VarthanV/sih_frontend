import React, { useState, useEffect, useContext } from "react";
import { studentsRoute, baseImgRoute } from "./helperConstants";
import { Link } from "react-router-dom";
import { StudentContext } from "../context/StudentContext";
export default function ViewStudents() {
  const [students, setStudents] = useState([]);
  const { addStudents } = useContext(StudentContext);
  useEffect(() => {
    let url = new URL(studentsRoute);
    let params = {
      center_id: localStorage.getItem("center_id")
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
        setStudents(data);
        console.log(data);
        addStudents();
      });
  }, []);
  return (
    <div className="">
      <div className="container pt-2">
        <div className="row pt-5 pl-1">
          <div className="col-8 detail-title">Students</div>
          <div className="col-4 detail-edit">
            <Link to="/addchild" className="btn btn-info">
              Add Student
            </Link>
          </div>
        </div>
        <div className="pt-3">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">S No</th>
                <th scope="col">Image</th>
                <th scope="col">Name</th>
                <th scope="col">Gender</th>
                <th scope="col">Age</th>
              </tr>
            </thead>
            <tbody>
              {students.length !== 0 ? (
                students.map((item, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>
                      <img
                        src={baseImgRoute + item.image}
                        alt={item.name}
                        width="30"
                      ></img>
                    </td>
                    <td>
                      <Link to={"student/" + item.unique_id }>{item.name}</Link>{" "}
                    </td>
                    <td>{item.gender}</td>
                    <td>{item.age}</td>
                  </tr>
                ))
              ) : (
                <p> No students available </p>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
