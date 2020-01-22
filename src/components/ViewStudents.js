import React, { useState, useEffect } from "react";
import { studentsRoute, baseImgRoute } from "./helperConstants";
import Navbar from './navbar';
import {Link} from 'react-router-dom';

export default function ViewStudents() {
  const [students, setStudents] = useState([]);
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
      .then(data => setStudents(data));
  },[]);
  return (
    <div className="">
      <Navbar></Navbar>
      <div className="container pt-5 mt-5">
        <Link to="/addchild" className="btn btn-info">add students</Link>
        <h3 className="pb-3">Students</h3>
       <table className="table">
        <thead>
          <tr>
            <th scope="col">S NO </th>
            <th scope="col">Image </th>
            <th scope="col">Name </th>
            <th scope="col">Gender</th>
            <th scope="col" > Age </th>
          </tr>
        </thead>
        <tbody>

          {students.map((item,index) =>(
            <tr key={index}>
              <th scope="row">{index+1}</th>
            <td><img src ={baseImgRoute+item.image} alt={item.name} width="50"></img></td>
          <td><Link  to={"student/"+item.unique_id}>{item.name}</Link> </td>
          <td>{item.gender}</td>
          <td>{item.age}</td>
          </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
}
