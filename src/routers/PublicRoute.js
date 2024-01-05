import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../auth/authContext'

export const PublicRoute = ({ children,urlBaseFrontend }) => {
    const { user } = useContext(AuthContext);

    return user.logged ? <Navigate to={"/" + urlBaseFrontend + "/index"} /> : children
}
