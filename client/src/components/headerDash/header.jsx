// src/components/Header.js
import React, { useEffect, useState } from 'react';
import './header.css';

const fetchUserData = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ name: localStorage.getItem('name')
            }); 
        }, 1000);
    });
};

const Header = () => {
    const [userName, setUserName] = useState('');
    const [currentDate, setCurrentDate] = useState('');

    useEffect(() => {
        fetchUserData().then(user => {
            setUserName(user.name);
        });

        const date = new Date();
        const options = { day: '2-digit', month: 'short', year: 'numeric' };
        setCurrentDate(date.toLocaleDateString(undefined, options));
    }, []);

    return (
        <header>
            <h3><b>Welcome! {userName}</b></h3>
            <div className="date">{currentDate}</div>
        </header>
    );
};

export default Header;
