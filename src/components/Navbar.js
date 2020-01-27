import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import Emblem from '../assests/images/emblem.png'
import { useHistory } from 'react-router'
import '../css/login.css';

import { UserContext } from '../context/userContext'


const Navbar = () => {
    const history = useHistory()
    const {user, removeUser} = useContext(UserContext)

    const [isLogin, setisLogin] = useState(false)
    useEffect(() => {
        console.log(user);
        console.log('from out if condt');
        if (user.isLoggedIn) {
            console.log('from if condt');
            
            setisLogin(state => true)
        }
    }, [user, user.isLoggedin])


    const logout = () => {

        localStorage.removeItem('token')
        //props.authHandler(null)
        setisLogin(false)
        removeUser()
        history.push('/login')
    }
    const loginButton = <div><li className="nav-item">
        <Link to="/login" className="nav-link" href="#">Login</Link>
    </li>
        <li className="nav-item">
            <Link to="/register" className="nav-link" href="#">Sign Up</Link>
        </li></div>
    const logoutButton = <div>
        <li className="nav-item">
            <button onClick={logout} className="nav-link">Logout</button>
        </li>
    </div>


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
                        {!isLogin && (loginButton)}

                        <li className="nav-item active">
                            <Link to="/students" className="nav-link" href="#">Home <span className="sr-only">(current)</span></Link>
                        </li>



                        <li className="nav-item">
                            <Link to="/attendance" className="nav-link">Attendance</Link>
                        </li>

                        {isLogin  && (logoutButton)}
                    </ul>
                </div>
            </nav>
        </div>
    );
}

export default Navbar