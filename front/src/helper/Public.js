import React from 'react';
import useAuth from '../hooks/useAuth';
import { Navigate, Outlet } from 'react-router-dom';

const Public = () => {
    const { employee } = useAuth();
    return (
        !employee ? (<Outlet />) : (<Navigate to="/" replace/>)
    )
};

export default Public;