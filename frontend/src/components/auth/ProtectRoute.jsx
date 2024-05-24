import React from 'react'
import { Navigate } from 'react-router-dom'

const ProtectRoute = ({ children, isAuthenticated, redirect = "/login" }) => {
    if (!isAuthenticated) return <Navigate to={redirect} />

    return children;
}


export default ProtectRoute;