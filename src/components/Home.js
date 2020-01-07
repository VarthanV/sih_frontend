import React, { useEffect } from 'react';
import Navbar from './navbar';

export default function Home() {
    useEffect(() => {
        const tk = localStorage.getItem('token');
    },[]);

    return (
        <div>
            <Navbar></Navbar>          
        </div>
            );
}