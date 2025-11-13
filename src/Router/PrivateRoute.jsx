import React, { use } from 'react';

import { Navigate, useLocation } from 'react-router';


import LoadingSpinner from '../components/LoadingSpinner';
import { AuthContext } from '../context/AuthContext';


const PrivateRoute = ({ children }) => {
    const { user, loading } = use(AuthContext);

    const location = useLocation();
 

    if (loading) {
        return <LoadingSpinner></LoadingSpinner>
    }

    if (user && user?.email) {
        return children;

    }
    return <Navigate state={location.pathname} to='/login'></Navigate>


};

export default PrivateRoute;