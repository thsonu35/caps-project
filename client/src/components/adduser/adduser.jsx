import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import './adduser.css'; // Import CSS for styling
import { useNavigate } from 'react-router-dom';

const AddUser = () => {
    const [email, setEmail] = useState('');
    const [userFound, setUserFound] = useState(false); // State to track if user is found
    const [isCardVisible, setIsCardVisible] = useState(true); // State to control visibility of the card
    const navigate = useNavigate(); // Initialize useNavigate
    const cardRef = useRef(null); // Ref to the card element

    const handleAddUser = async () => {
        try {
            const response = await axios.post('https://serverside-api.onrender.com/api/auth/check-user', { email });
            if (response.data.exists) {
                toast.success(`${email} added to board`);
                setUserFound(true); // Set state to indicate user is found
            } else {
                toast.error('User not found.'); // Show message if user does not exist
            }
        } catch (error) {
            console.error('Error checking user:', error);
            toast.error('Error checking user.'); // Show error message if API call fails
        }
    };

    const handleInputChange = (event) => {
        setEmail(event.target.value);
        setUserFound(false); // Reset userFound state when typing
    };

    const handleGotIt = () => {
        window.history.back();
    };

    const handleClickOutside = (event) => {
        if (cardRef.current && !cardRef.current.contains(event.target)) {
            setIsCardVisible(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    if (!isCardVisible) return null; // Don't render the card if it's not visible

    return (
        <div className="popup-container">
            <div className="popup-content" ref={cardRef}>
                {!userFound && (
                    <>
                        <p>Add people to the board</p>
                        <input className='oinput' type="email" placeholder='Input the Email' name='email' value={email} onChange={handleInputChange} />
                        <div className="cta-btns">
                            <div>
                                <button className="cancel" onClick={handleGotIt}>
                                    Cancel
                                </button>
                                <button className="confirm" onClick={handleAddUser}>
                                    Add Email <span></span>
                                </button>
                            </div>
                        </div>
                    </>
                )}
                {userFound && (
                    <div className="user-found">
                        <p>{email} added to board</p>
                        <button className="got-it" onClick={handleGotIt}>Ok, Got it</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AddUser;
