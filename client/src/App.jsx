import React from 'react';
import { BrowserRouter, Router, Route, Routes  } from 'react-router-dom';
import LoginPage from './pages/user/loginPage';
import RegisterPage from './pages/user/registerPage';
import { Toaster } from "react-hot-toast";
import Dashboard from './pages/dashboard/dashboard';
import Analytics from './pages/analytics/Analytics';
import Settings from './components/setting/Settings';
import Sharepage from './pages/share/Sharepage';
import ProtectedRoute from './components/ProtectedRoute';
function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="https://serverside-api.onrender.com/api/auth/register/login" element={<LoginPage />} />

                <Route path="https://serverside-api.onrender.com/api/auth/register/register" element={<RegisterPage />} />
                <Route path="https://serverside-api.onrender.com/api/auth/register/share/:id" element={<Sharepage/>}/>


                <Route 
                    path="https://serverside-api.onrender.com/api/auth/register/dashboard" 
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    } 
                />
                <Route 
                    path="https://serverside-api.onrender.com/api/auth/register/analytics" 
                    element={
                        <ProtectedRoute>
                            <Analytics />
                        </ProtectedRoute>
                    } 
                />
                <Route 
                    path="https://serverside-api.onrender.com/api/auth/register/setting" 
                    element={
                        <ProtectedRoute>
                            <Settings />
                        </ProtectedRoute>
                    } 
                />
              
            </Routes>
            <Toaster />
        </BrowserRouter>
    );
}

export default App;
