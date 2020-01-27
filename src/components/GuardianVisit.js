import React, { useState, useEffect } from "react";
import { guardianVisitRotue } from "./helperConstants";

export default function GuardianVisit(props) {
  const id = props.match.params.id;

  const headers = {
    Authorization: localStorage.getItem("token")
  };
  const [guardians, setGuardians] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  useEffect(() => {
    fetch(guardianVisitRotue, {
      method: "GET",
      headers: headers
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);

        setGuardians(data);
      });
  });
  return <div>
      {id}
      
  </div>;
}
