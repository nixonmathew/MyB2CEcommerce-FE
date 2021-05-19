import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import AdminNav from '../../../components/nav/AdminNav';
import { createCoupon, listCoupons, removeCoupon } from "../../../apis/coupon";
import { DeleteOutlined } from '@ant-design/icons';

const InitialState = {
    name: '',
    expiry: '',
    discount: ''
}

const Coupon = () => {

    const [coupon, setCoupon] = useState(InitialState);
    const [loading, setLoading] = useState(false);
    const [coupons, setCoupons] = useState([]);

    const { user } = useSelector((state) => ({ ...state }))

    useEffect(() => {
        setLoading(true);
        listAllCoupons();
    }, [])

    const listAllCoupons = () => {
        listCoupons(user.token).then(coupons => {
            setLoading(false);
            console.log(coupons)
            setCoupons(coupons.data);
        }).catch(err => {
            setLoading(false);
            toast.error(err.message);
        })
    }

    const handleCreate = (e) => {
        e.preventDefault();
        setLoading(true);
        createCoupon(user.token, coupon).then(createdCoupon => {
            setLoading(false);
            toast.success('Coupon Created')
            setCoupon(InitialState);
            listAllCoupons();
        }).catch(err => {
            setLoading(false);
            toast.error(err.message);
        })
    }

    const handleRemove = (couponName) => {
        setLoading(true);
        removeCoupon(user.token, couponName).then(deletedCoupon => {
            setLoading(false);
            toast.success('Coupon Removed')
            listAllCoupons();
        }).catch(err => {
            setLoading(false);
            toast.error(err.message);
        })
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>
                <div className="col-md-10">
                    {loading ? (<h4 className="text-danger">Loading...</h4>) : (<h4>All Coupons</h4>)}
                    <form onSubmit={handleCreate}>
                        <div className="form-group">
                            <label className="text-muted">Name</label>
                            <input type="text" className="form-control"
                                value={coupon.name} autoFocus required
                                onChange={(e) => setCoupon({ ...coupon, name: e.target.value })} />
                        </div>
                        <div className="form-group">
                            <label className="text-muted">Discount %</label>
                            <input type="text" className="form-control"
                                value={coupon.discount} required
                                onChange={(e) => setCoupon({ ...coupon, discount: e.target.value })} />
                        </div>
                        <div className="form-group">
                            <label className="text-muted">Expiry Date</label>
                            <br />
                            <DatePicker className="form-control"
                                value={coupon.expiry} required selected={new Date()}
                                onChange={(date) => setCoupon({ ...coupon, expiry: date })} />
                        </div>
                        <button className="btn btn-outline-primary">Save</button>
                    </form>
                    {
                        coupons && coupons.length &&
                        <table className="table table-bordered">
                            <thead className="thead-light">
                                <tr>
                                    <th scope="col">Name</th>
                                    <th scope="col">Expiry</th>
                                    <th scope="col">Discount</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {coupons.map(coupon => (
                                    <tr key={coupon._id}>
                                        <td>{coupon.name}</td>
                                        <td>{new Date(coupon.expiry).toLocaleDateString()}</td>
                                        <td>{coupon.discount}</td>
                                        <td><DeleteOutlined onClick={() => handleRemove(coupon.name)}
                                            className="text-danger pointer" /></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    }
                </div>

            </div>
        </div>
    )
}

export default Coupon;