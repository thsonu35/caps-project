import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/user/loginPage';
import Register from './pages/user/registerPage';
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
                <Route path="/login" element={<LoginPage />} />

                <Route path="/register" element={<Register />} />
                <Route path="/share/:id" element={<Sharepage />} />


                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/analytics"
                    element={
                        <ProtectedRoute>
                            <Analytics />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/setting"
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
