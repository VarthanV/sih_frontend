import React from 'react'
import { baseImgRoute } from './helperConstants'

export default function Guardians({uniqueid,image,name}) {
    return (
        <div>
            
            <img src={baseImgRoute+ image} width ="50%" alt ={name}></img>
    <h1> Name : {name}</h1>
        </div>
    )
}
