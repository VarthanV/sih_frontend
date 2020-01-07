import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import AddChild from "./components/AddChild";
import ViewStudents from "./components/ViewStudents";
import StudentDetail from "./components/StudentDetail";
import Attendance from "./components/Attendance";
<<<<<<< HEAD
import Home from "./components/Home";
import Navbar from './components/navbar';

=======
import AddGuardians from "./components/AddGuardians";
>>>>>>> fdac980e9f250ff1a0fd21682161caf9677d5289
function App() {
  useEffect(() => {
    localStorage.setItem("center_id", "12345678");
    
  });
  return (
    <Router>
      <div>
        <Route path="/register" exact component={SignUp}></Route>
        <Route path="/login" exact component={Login}></Route>
        <Route path="/addchild" exact component={AddChild}></Route>
        <Route path="/students" exact component={ViewStudents}></Route>
        <Route path="/student/:id" exact component={StudentDetail}></Route>
        <Route path="/attendance" exact component={Attendance}></Route>
<<<<<<< HEAD
        <Route path="/" exact component={Home}></Route>
=======
        <Route path="/addguardian/:id" exact component={AddGuardians}></Route>
>>>>>>> fdac980e9f250ff1a0fd21682161caf9677d5289
      </div>
    </Router>
  );
}

export default App;
