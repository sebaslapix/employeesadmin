import React from 'react';
import useAuth from '../hooks/useAuth';
import { Navigate, Outlet } from 'react-router-dom';

const Private = () => {
    const { employee } = useAuth();
    return (
        employee ? (<Outlet />) : (<Navigate to="/login" replace/>)
    )
};

export default Private;