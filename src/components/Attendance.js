import React, { useEffect, useState } from "react";
import { attendanceRoute, attendanceUpdateRoute } from "./helperConstants";
import { Link, useHistory } from "react-router-dom";
import md5 from "md5";
import "../css/login.css";

export default function Attendance() {
  const [dummy, setDummy] = useState(0);
  const [fingerPrintHash, setFingerPrintHash] = useState("");

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
        console.log("From Attendance Page ");

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
  const markPresent = (e, index, id) => {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];

    reader.readAsDataURL(file);
    reader.onloadend = () => {
      const hash = md5(reader.result);
      console.log(students[index].fingerprint_hash);
    
      if (hash === students[index].fingerprint_hash) {
        const formData = new FormData();
        formData.append("unique_id", id);
        formData.append("is_present", true);
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
          });
      } else {
        alert("Error");
      }
    };
  };

  const markAbsent = (e, index, id) => {
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
      <div className="container">
        <div className="row pt-5 pl-1">
          <div className="col-8 detail-title">Attendance</div>
        </div>
        <div className="pt-3">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">S NO </th>
                <th scope="col">Name </th>
                <th scope="col">Attendance </th>
              </tr>
            </thead>
            <tbody>
              {students.map((item, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>

                  <td>
                    <Link to={"student/" + item.unique_id}>{item.name}</Link>{" "}
                  </td>
                  {item.attendance_marked === true ? (
                    <td>
                      <div style={{ fontSize: "18px", fontWeight: "500" }}>
                        {item.is_present === true ? (
                          <span style={{ color: "green" }}> Present</span>
                        ) : (
                          <span style={{ color: "red" }}> Absent</span>
                        )}
                      </div>
                    </td>
                  ) : (
                    <td>
                      <div className="row">
                        <input
                          required
                          type="file"
                          id="uploadimg"
                          className="file-upload btn btn-danger"
                          name="upload"
                          size="70"
                          accept="image/*"
                          onChange={e => markPresent(e, index, item.unique_id)}
                        />
                        <label htmlFor="uploadimg" className="btn upload-btn">
                          {" "}
                          Present
                        </label>
                        <button
                          className="btn btn-danger ml-5"
                          value={false}
                          onClick={e =>
                            online
                              ? markAbsent(e, index, item.unique_id)
                              : markAttendanceOffline(e, index)
                          }
                        >
                          Absent
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
