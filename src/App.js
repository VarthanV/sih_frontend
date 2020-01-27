import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import AddChild from "./components/AddChild";
import ViewStudents from "./components/ViewStudents";
import StudentDetail from "./components/StudentDetail";
import Attendance from "./components/Attendance";
import AddGuardians from "./components/AddGuardians";
import AddAchievements from "./components/AddAchievements";
import Navbar from "./components/Navbar";
import UserContextProvider from "./context/userContext";
import StudentContextProvider from "./context/StudentContext";
import GuardianVisit from "./components/GuardianVisit";

function App() {
  const [authInfo, setAuthInfo] = useState({
    isLogin: true,
    token: null
  });

  useEffect(() => {
    localStorage.setItem("center_id", "12345678");
    const token = localStorage.getItem("token");

    if (token) {
      setAuthInfo({
        isLogin: true,
        token
      });
    }
  }, []);

  const authHandler = token => {
    if (token) {
      setAuthInfo({
        isLogin: true,
        token
      });
    } else {
      setAuthInfo({
        isLogin: false,
        token: null
      });
    }
  };

  return (
    <>
      <UserContextProvider>
        <Router>
          <Navbar token={authInfo.token} />
          <Switch>
            <Route
              path="/register"
              authHandler={authHandler}
              exact
              component={SignUp}
            ></Route>
            <Route
              path="/login"
              authHandler={authHandler}
              exact
              component={Login}
            ></Route>
            <Route path="/addchild" exact component={AddChild}></Route>
            <StudentContextProvider>
              <Route path="/students" exact component={ViewStudents}></Route>
              <Route
                path="/student/:id"
                exact
                component={StudentDetail}
              ></Route>
              <Route
                path="/student/:id/addguardian"
                exact
                component={AddGuardians}
              ></Route>
              <Route path="/attendance" exact component={Attendance}></Route>
            </StudentContextProvider>
            <Route
              path="/"
              authHandler={authHandler}
              exact
              component={Login}
            ></Route>
            <Route
              path="/student/:id/addachievements"
              exact
              component={AddAchievements}
            ></Route>
             <Route
              path="/student/:id/addvisit"
              exact
              component={GuardianVisit}
            ></Route>
          </Switch>
        </Router>
      </UserContextProvider>
    </>
  );
}

export default App;
