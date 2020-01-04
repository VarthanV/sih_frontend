import React, { useEffect } from 'react';
import './App.css';
import {BrowserRouter as Router,Route} from 'react-router-dom';
import SignUp from './components/SignUp';
import Login from './components/Login';
import AddChild from './components/AddChild';
function App() {
  useEffect(() =>{
    localStorage.setItem("center_id","12345678")
  })
  return (
    <Router>
    <div>
      <Route path="/register" exact component={SignUp}></Route>
      <Route path ="/login" exact component={Login}></Route>
      <Route path="/addchild/" exact component ={AddChild}></Route>
    </div>
    </Router>
  );
}

export default App;
