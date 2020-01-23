import React, { createContext, useState } from "react";
import { attendanceRoute } from "../components/helperConstants";
export const StudentContext = createContext();
const StudentContextProvider = props => {
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState([]);

  const addStudents = () => {
    const headers = {
      Authorization: localStorage.getItem("token")
    };
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
  };
  const getStudent = id => {
    console.log(id);

    setAttendance(
      students.filter(item => {
        return id === item.unique_id;
      })
    );
    console.log(attendance);
  };
  const markAttendance = hash =>{
      
  }

  return (
    <StudentContext.Provider value={{ students, addStudents, getStudent,attendance }}>
      {props.children}
    </StudentContext.Provider>
  );
};

export default StudentContextProvider;
