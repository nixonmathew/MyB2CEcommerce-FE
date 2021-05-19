import React, { useEffect, useState } from 'react';
import { listOrders, updateOrderState } from '../../apis/admin';
import AdminNav from '../../components/nav/AdminNav';
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify';
import Orders from '../../components/order/Orders';

const AdminDashboard = () => {

    const [orders, setOrders] = useState([]);

    const { user } = useSelector((state) => ({ ...state }))
    useEffect(() => {
        loadOrders();
    }, [])

    const loadOrders = () => {
        listOrders(user.token).then(res => {
            setOrders(res.data);
        }).catch(err => {
            toast.error(err.message);
        })
    }
    const handleStatusChange = (orderId, orderState) => {
        updateOrderState(user.token, orderId, orderState).then(res => {
            toast.success("Status updated")
            loadOrders();
        })
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>
                <div className="col-md-10">
                    <h4>Admin Dashboard</h4>
                    <Orders orders={orders} handleStatusChange={handleStatusChange} />
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard;