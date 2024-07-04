import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import 'react-toastify/dist/ReactToastify.css';
import './adduser.css'; // Import CSS for styling

const AddUser = () => {
    const [email, setEmail] = useState('');
    const [userFound, setUserFound] = useState(false); // State to track if user is found
  
    const handleAddUser = async () => {
      try {
        const response = await axios.post('http://localhost:3000/api/auth/check-user', { email });
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
      window.location.reload(); // Reload the page
    };
  
    return (
      <div className="popup-container">
        <div className="popup-content">
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