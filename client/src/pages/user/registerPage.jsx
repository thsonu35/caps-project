import React, { useState } from 'react';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import './Register.css';
import astronautImage from '/Artastronot.png';
import logo from '/Backastro.png';
import eyeIcon from '/eye.png'; 
import lockIcon from '/lock.png';
import userIcon from '/user.png';
import emailIcon from '/email.png';
import hideye from '/clarity_eye-hide-lineunhide.png'; 

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validatePassword = (password) => {
        const minLength = 8;
        const hasNumber = /\d/;
        const hasLetter = /[a-zA-Z]/;
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;
        if (password.length < minLength) return 'Password must be at least 8 characters long';
        if (!hasNumber.test(password)) return 'Password must contain at least one number';
        if (!hasLetter.test(password)) return 'Password must contain at least one letter';
        if (!hasSpecialChar.test(password)) return 'Password must contain at least one special character';
        return '';
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { name, email, password, confirmPassword } = formData;

        if (!name || !email || !password || !confirmPassword) {
            toast.error('Please fill in all fields');
            return;
        }

        if (password !== confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }

        const passwordValidationError = validatePassword(password);
        if (passwordValidationError) {
            toast.error(passwordValidationError);
            return;
        }

        try {
            const response = await axios.post('https://caps-project-8ytf.onrender.com/api/auth/register', { name, email, password }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log('Registration successful:', response);
            toast.success('Registration successful');
            navigate('/login');
        } catch (error) {
            console.error('Registration failed:', error);
            toast.error('Registration failed. Please try again.');
        }
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const toggleShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    return (
        <div className="body">
            <div className="register-container">
                <Toaster />
                <div className="register-left">
                    <div className="register-welcome">
                        <div className='img-Div'>
                            <img src={logo} alt="Logo" className="logo-img" />
                            <img src={astronautImage} alt="Astronaut" className="astronaut-img" />
                        </div>
                        <div className='onboarding-msg'>
                            <h1>Welcome aboard my friend</h1>
                            <p>Just a couple of clicks and we start</p>
                        </div>
                    </div>
                </div>
                <div className="register-right">
                    <div className="register-form-container">
                        <div className="forigis">
                            <h2>Register</h2>
                        </div>
                        <div className="forinput">
                            <form onSubmit={handleSubmit}>
                                <div className="input-box">
                                    <div className='inpwlogo'>
                                        <img src={userIcon} alt="User Icon" />
                                        <input 
                                            type="text" 
                                            name="name" 
                                            id="name" 
                                            placeholder="Name" 
                                            onChange={handleChange} 
                                        />
                                    </div>
                                </div>
                                <div className="input-box">
                                    <div className='inpwlogo'>
                                        <img src={emailIcon} alt="Email Icon" />
                                        <input 
                                            type="email" 
                                            name="email" 
                                            id="email" 
                                            placeholder="Email" 
                                            onChange={handleChange} 
                                        />
                                    </div>
                                </div>
                                <div className="input-box">
                                    <div className='inpwlogo'>
                                        <img src={lockIcon} alt="Lock Icon" />
                                        <input 
                                            type={showPassword ? "text" : "password"} 
                                            name="password" 
                                            id="password" 
                                            placeholder="Password" 
                                            onChange={handleChange} 
                                        />
                                        <img 
                                            src={showPassword ? hideye : eyeIcon} 
                                            alt="Toggle Password Visibility" 
                                            className="eye-icon" 
                                            onClick={toggleShowPassword} 
                                        />
                                    </div>
                                </div>
                                <div className="input-box">
                                    <div className='inpwlogo'>
                                        <img src={lockIcon} alt="Lock Icon" />
                                        <input 
                                            type={showConfirmPassword ? "text" : "password"} 
                                            name="confirmPassword" 
                                            id="confirmPassword" 
                                            placeholder="Confirm password" 
                                            onChange={handleChange} 
                                        />
                                        <img 
                                            src={showConfirmPassword ? hideye : eyeIcon} 
                                            alt="Toggle Confirm Password Visibility" 
                                            className="eye-icon" 
                                            onClick={toggleShowConfirmPassword} 
                                        />
                                    </div>
                                </div>
                                <button type="submit" className="register-button">Register</button>
                            </form>
                        </div>
                        <footer>
                            <p>Already have an account? <a onClick={() => navigate('/login')}>Log in</a></p>
                        </footer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
