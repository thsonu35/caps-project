// Sidebar.jsx

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './sidebar.css';
import PopupComponent from '../popup/popup'; 

const Sidebar = () => {
    const [activeLink, setActiveLink] = useState('Board');
    const [showPopup, setShowPopup] = useState(false);
    const navigate = useNavigate();

    const handleLinkClick = (link) => {
        if (link === 'Logout') {
            setShowPopup(true); 
        } else {
            setActiveLink(link);
        }
    };

    const handleOpen = () => {
        setShowPopup(true); 
    };

    const closePopup = () => {
        setShowPopup(false); 
    };

    const handleLogoutConfirm = () => {
        localStorage.removeItem("token");
        console.log('Logout confirmed');
        navigate("/login");
        setShowPopup(false); 
    };

    const handleLogoutCancel = () => {
        setShowPopup(false); 
    };

    return (
        <div className="container">
            <div className="sidebar">
                <div className="logo">
                    <img src="codesandboxpromanagelogo.png" alt="pro manage" />
                    <h1> Pro Manage</h1>
                </div>
                <nav>
                    <ul>
                        <li className=''>
                            <Link
                                to="/dashboard"
                                className={`${activeLink === 'Board' ? 'active' : ''} sidebar-sub-container`}
                                onClick={() => handleLinkClick('Board')}
                            >
                                <img src="layoutboard.png" alt="" />
                                <b>Board</b>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/analytics"
                                className={`${activeLink === 'Analytics' ? 'active' : ''} sidebar-sub-container`}
                                onClick={() => handleLinkClick('Analytics')}
                            >
                                <img src="databaseAnalytics.png" alt="" />
                                <b>Analytics</b>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/setting"
                                className={`${activeLink === 'Settings' ? 'active' : ''} sidebar-sub-container`}
                                onClick={() => handleLinkClick('Settings')}
                            >
                                <img src="settingssetting.png" alt="" />
                                <b>Settings</b>
                            </Link>
                        </li>
                    </ul>
                </nav>
                <div className="logout" onClick={() => handleOpen()}>
                    <img src="Logoutlogout.png" alt="Logout" />
                    <span >Logout</span>
                </div>
            </div>
            {showPopup && (
                <PopupComponent
                    actionText="Logout"
                    onConfirm={handleLogoutConfirm}
                    onCancel={handleLogoutCancel}
                />
            )}
        </div>
    );
};

export default Sidebar;
