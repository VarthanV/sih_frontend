import React, { useEffect, useState } from "react";
import { attendanceRoute, attendanceUpdateRoute } from "./helperConstants";
import { Link, useHistory } from "react-router-dom";
import Navbar from "./navbar";

export default function Attendance() {
  const [dummy, setDummy] = useState(0);
  const headers = {
    Authorization: localStorage.getItem("token")
  };
  const updateAttendance = () => {
    console.log(localStorage.getItem("students"));

    if (localStorage.getItem("students") !== null) {
      const studentData = JSON.parse(localStorage.getItem("students"));
      const data = studentData.filter(item => item.attendance_marked === true);
      fetch(attendanceUpdateRoute, {
        method: "POST",
        body: JSON.stringify({ students: data }),
        headers: headers
      })
        .then(res => res.json())
        .then(data => {
          if (data["success"]) {
            localStorage.removeItem("students");
          }
        })
        .catch(err => console.log(err));
    } else {
    }
  };
  useEffect(() => {
    if (navigator.onLine) {
      updateAttendance();
      setOnline(true);
    } else {
      const studentData = JSON.parse(localStorage.getItem("students"));
      setStudents(studentData);
    }
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
        if (localStorage.getItem("students") === null) {
          localStorage.setItem("students", JSON.stringify(data));
        }
      });
    return () => localStorage.setItem("students", JSON.stringify(students));
  }, []);
  const [students, setStudents] = useState([]);
  const [online, setOnline] = useState(false);
  const history = useHistory();

  const markAttendance = (e, index, id) => {
    e.preventDefault();
    const value = e.target.value;
    console.log(value);
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
        //const newStudents = students;
        setStudents(students => {
          students[index].is_present = data.is_present;
          students[index].attendance_marked = true;
          console.log(students);
          
          return [...students];
        });
        history.push("/attendance");
        setDummy(dummy + 1);
      });
  };
  const markAttendanceOffline = (e, index) => {
    e.preventDefault();
    const value = e.target.value;
    students[index].is_present = value;
    students[index].attendance_marked = true;
    setDummy(dummy);
    localStorage.setItem("students", JSON.stringify(students));
  };
  return (
    <div>
      <div className="container mt-5">
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
                      {item.is_present === true ? (
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
                        onClick={e =>
                          online
                            ? markAttendance(e, index, item.unique_id)
                            : markAttendanceOffline(e, index)
                        }
                      >
                        {" "}
                        Present{" "}
                      </button>{" "}
                      <button
                        className="btn btn-danger ml-5"
                        value={false}
                        onClick={e =>
                          online
                            ? markAttendance(e, index, item.unique_id)
                            : markAttendanceOffline(e, index)
                        }
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
