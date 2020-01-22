import React from 'react';
import { BrowserRouter as Route, Link } from 'react-router-dom'

export default function Navbar() {
   function cc(){
       console.log(localStorage.getItem('token'))
   }
    

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <Link className="navbar-brand"to="/home">  Children Management </Link>
                <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <Link to="/" className="nav-link" href="#">Home <span className="sr-only">(current)</span></Link>
                        </li>
                        
                        
                            <li className="nav-item">
                                <Link to="/login" className="nav-link" href="#">Login</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/register" className="nav-link" href="#">Sign Up</Link>
                            </li>
                       
                        
                        
                        <li className="nav-item">
                            <Link className="nav-link" to="/attendance">Attendance</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    );
}