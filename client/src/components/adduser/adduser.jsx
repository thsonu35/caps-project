import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import './adduser.css';

const AddUser = ({ onConfirm, onCancel }) => {
  const [email, setEmail] = useState('');
  const [userFound, setUserFound] = useState(false);
  const cardRef = useRef(null);

  const handleAddUser = async () => {
    try {
      const response = await axios.post('https://caps-project-8ytf.onrender.com/api/auth/check-user', { email });
      if (response.data.exists) {
        toast.success(`${email} added to board`);
        setUserFound(true);
        onConfirm(email);
      } else {
        toast.error('User not found.');
      }
    } catch (error) {
      console.error('Error checking user:', error);
      toast.error('Error checking user.');
    }
  };

  const handleInputChange = (event) => {
    setEmail(event.target.value);
    setUserFound(false);
  };

  const handleClickOutside = (event) => {
    if (cardRef.current && !cardRef.current.contains(event.target)) {
      onCancel();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="popup-container">
      <div className="popup-content" ref={cardRef}>
        {!userFound && (
          <>
            <p>Add people to the board</p>
            <input className='oinput' type="email" placeholder='Input the Email' name='email' value={email} onChange={handleInputChange} />
            <div className="cta-btns">
              <div>
                <button className="cancel" onClick={onCancel}>
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
            <button className="got-it" onClick={onCancel}>Ok, Got it</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddUser;
