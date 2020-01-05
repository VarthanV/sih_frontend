import React, { useEffect, useState } from "react";
import { attendanceRoute } from "./helperConstants";
import { Link,useHistory } from "react-router-dom";

export default function Attendance() {
  const headers = {
    Authorization: localStorage.getItem("token")
  };
  useEffect(() => {
    let url = new URL(attendanceRoute);
    let params = {
      center_id: localStorage.getItem("center_id")
    };
    url.search = new URLSearchParams(params).toString();

    fetch(url, {
      method: "GET",
      headers: headers
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setStudents(data);
      });
  }, []);
  const [students, setStudents] = useState([]);
  const [dummy,setDummy] = useState(0);
  const history =useHistory();
  const markAttendance = (e, index, id) => {
    e.preventDefault();
    const value = e.target.value;
    const formData = new FormData();
    formData.append("unique_id", id);
    formData.append("is_present", value);
    fetch(attendanceRoute, {
      method: "POST",
      body: formData,
      headers: headers
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        const newStudents = students;
        newStudents[index].is_present = value;
        setStudents(newStudents);
        history.pushState("/attendance")
      });
  };
  return (
    <div>
      <div className="container">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">S NO </th>
              <th scope="col">Name </th>
              <th scope="col"> Attendance </th>
            </tr>
          </thead>
          <tbody>
            {students.map((item, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>

                <td>
                  <Link to={"student/" + item.unique_id}>{item.name}</Link>{" "}
                </td>
                <td>{item.gender}</td>
                <td>{item.age}</td>
                <td>
                  {" "}
                  {item.attendance_marked === true ? (
                    <h4>
                      {" "}
                      Attendance Marked (
                      {item.status === true ? (
                        <span> Present</span>
                      ) : (
                        <span> Absent</span>
                      )}
                      ){" "}
                    </h4>
                  ) : (
                    <div className="row">
                      {" "}
                      <button
                        className="btn btn-primary"
                        value={true}
                        onClick={e => markAttendance(e, index, item.unique_id)}
                      >
                        {" "}
                        Present{" "}
                      </button>{" "}
                      <button
                        className="btn btn-danger ml-5"
                        value={false}
                        onClick={e => markAttendance(e, index, item.unique_id)}
                      >
                        {" "}
                        Absent
                      </button>
                    </div>
                  )}{" "}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
