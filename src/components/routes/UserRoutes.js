import React from 'react';
import { useSelector } from 'react-redux';
import { Route } from "react-router-dom";

const UserRoute = ({ children, ...rest }) => {
    const { user } = useSelector((state) => ({ ...state }))
    return user && user.token ? (
        <Route {...rest} />
    ) : (
        <h2 className="text-danger">Not Authorized... Please Login</h2>
    )
}

export default UserRoute;