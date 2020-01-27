import React from 'react'
import { baseImgRoute } from './helperConstants'

export default function Guardians({uniqueid,image,name,age,city,district,gender,aadhar_no,marital_status,address,has_child,no_of_child}) {
    return (
        <div>
            <div className="top-layer row">
                <div className="col-sm-4 col-lg-3">
                    <div className="user-img-div">
                        <img 
                            className="user-img"
                            src = { baseImgRoute + image }
                        />
                    </div>
                </div>
                    <div className="col">
                        <div className="row">
                            <div className="user col">
                                <div className="row emp-di">
                                    Name :<div className="emp-d">{name}</div>
                                </div>
                            </div>
                            <div className="user col">
                                <div className="row emp-di">
                                    Age :<div className="emp-d">{age}</div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="user col">
                                <div className="row emp-di">
                                    City :<div className="emp-d">{city}</div>
                                </div>
                            </div>
                            <div className="user col">
                                <div className="row emp-di">
                                    District :<div className="emp-d">{district}</div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="user col">
                                <div className="row emp-di">
                                    Gender :<div className="emp-d">{gender}</div>
                                </div>
                            </div>
                            <div className="user col">
                                <div className="row emp-di">
                                    Aadhar No :<div className="emp-d">{aadhar_no}</div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="user col">
                                <div className="row emp-di">
                                    Marital Status :<div className="emp-d">{marital_status === true ? 'Married' : 'Un Married'}</div>
                                </div>
                            </div>
                            <div className="user col">
                                <div className="row emp-di">
                                    Address :<div className="emp-d">{address}</div>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
        </div>
    )
}
