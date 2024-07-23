import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import './Register.css';
import astronautImage from '/Artastronot.png';
import logo from '/Backastro.png';
import eyeIcon from '/eye.png'; 
import lockIcon from '/lock.png';
import emailIcon from '/email.png';
import hideye from '/clarity_eye-hide-lineunhide.png'; 

const LoginPage = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Check if the user is already logged in
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/dashboard');
        }
    }, [navigate]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegisterClick = () => {
        navigate('/register');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://caps-project-8ytf.onrender.com/api/auth/login', formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.status === 200) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('email', response.data.email);
                localStorage.setItem('name', response.data.name);
                navigate('/dashboard');
                toast.success('Login successful');
            } else {
                setError('Invalid email or password');
                toast.error('Login failed');
            }
        } catch (error) {
            setError('An error occurred while logging in');
            toast.error('An error occurred while logging in');
        }
    };

    const toggleShowPassword = () => {
        setShowPassword(prev => !prev);
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
                            <h2>Login</h2>
                        </div>
                        <div className="forinput">
                            <form onSubmit={handleSubmit}>
                                <div className="input-box">
                                    <div className='inpwlogo'>
                                        <img src={emailIcon} alt="Email Icon" />
                                        <input 
                                            type="email" 
                                            name="email" 
                                            id="email" 
                                            placeholder="Email" 
                                            value={formData.email} 
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
                                            value={formData.password} 
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
                                <button type="submit" className="register-button">Login</button>
                            </form>
                        </div>
                        <footer>
                            <p>Don't have an account yet? <a onClick={handleRegisterClick}>Register</a></p>
                        </footer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
