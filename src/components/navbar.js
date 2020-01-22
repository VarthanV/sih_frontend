import React from 'react';
import {Link} from 'react-router-dom';
import Emblem from '../assests/images/emblem.png'
import '../css/login.css';

export default function Navbar() {
//    function cc(){
//        console.log(localStorage.getItem('token'))
//    }
    

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light">
                <a className="navbar-brand" href="">
                    <div className="row">
                        <img src={Emblem} width="30" className="emblem-img" alt="img" />
                        <div className="vertical-line">Child Care Institution</div>
                    </div> 
                </a>
                
                <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <Link to="/students" className="nav-link" href="#">Home <span className="sr-only">(current)</span></Link>
                        </li>
                        
                        
                            {/* <li className="nav-item">
                                <Link to="/login" className="nav-link" href="#">Login</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/register" className="nav-link" href="#">Sign Up</Link>
                            </li> */}
                       
                        
                        
                        <li className="nav-item">
                            <Link to="/attendance" className="nav-link">Attendance</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    );
}