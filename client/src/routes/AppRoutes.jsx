import { Routes, Route, Navigate } from 'react-router-dom'
import ProtectedRoute from '../components/ProtectedRoute'

import Login from '../pages/auth/Login'
import Register from '../pages/auth/Register'
import Dashboard from "../pages/dashboard/Dashboard";
import DashboardLayout from "../layouts/DashboardLayout";

export default function AppRoutes() {
    return (
        <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />

            <Route path='/' element={<ProtectedRoute>
                <DashboardLayout />
            </ProtectedRoute>}>
                <Route path='dashboard' element={<Dashboard />} />
            </Route>
        </Routes>
    )
}