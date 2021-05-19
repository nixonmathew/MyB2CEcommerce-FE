import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Route } from "react-router-dom";
import { getAdminUser } from '../../apis/auth';



const AdminRoute = ({ ...rest }) => {

    const { user } = useSelector((state) => ({ ...state }))
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        if (user && user.token) {
            getAdminUser(user.token).then(res => {
                setIsAdmin(true);
            }).catch(err => {
                console.log('admin user error', err)
                setIsAdmin(false);
            })
        }
    }, [user])
    return isAdmin ? (
        <Route {...rest} />
    ) : (
        <h2 className="text-danger">Admin Acess Only </h2>
    )
}

export default AdminRoute;