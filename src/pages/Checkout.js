import React, { useEffect, useState } from "react";
import { emptyUserCart, cashOrder, getUserCart, userAddress, userCoupon } from "../apis/user";
import { useSelector, useDispatch } from 'react-redux'
import { toast } from "react-toastify";
import ReactQuill from 'react-quill';

const Checkout = ({ history }) => {

    const [products, setProducts] = useState([])
    const [total, setTotal] = useState(0)
    const [address, setAddress] = useState('')
    const [addressSaved, setAddressSaved] = useState(false)
    const [couponApplied, setCouponApplied] = useState('')
    const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);
    const [discountError, setDiscountError] = useState('')

    const { user, cod, coupon } = useSelector((state) => ({ ...state }))
    const dispatch = useDispatch();

    useEffect(() => {
        getUserCart(user.token).then(res => {
            setProducts(res.data.products);
            setTotal(res.data.cartTotal);
        }).catch(err => console.log(err))
    }, [])

    const saveAddressToDb = () => {
        userAddress(user.token, address).then(res => {
            setAddressSaved(true);
        })
    }

    const emptyCart = () => {
        if (typeof window !== "undefined") {
            localStorage.removeItem("cart")
        }
        dispatch({
            type: 'ADD_TO_CART',
            payload: []
        })
        emptyUserCart(user.token).then(res => {
            setProducts([]);
            setTotal(0);
            toast.info('Cart is empty');
            setTotalAfterDiscount(0);
            setCouponApplied("");
        })
    }

    const applyDiscount = () => {
        userCoupon(user.token, couponApplied).then(res => {
            if (res.data.err) {
                setDiscountError(res.data.err);
                dispatch({
                    type: 'COUPON_APPLIED',
                    payload: ''
                })
            }
            else {
                setTotalAfterDiscount(res.data);
                dispatch({
                    type: 'COUPON_APPLIED',
                    payload: couponApplied
                })
            }
        })
    }

    const couponApplySection = () => (
        <>
            <input type='text'
                onChange={(e) => {
                    setCouponApplied(e.target.value)
                    setDiscountError("");
                }
                }
                value={couponApplied} className="form-control"
            />
            <button onClick={applyDiscount} className="btn btn-primary mt-2">Apply</button>
            { discountError && <p className="bg-danger p-2">{discountError}</p>}
        </>
    )
    const createCashOrder = () => {
        cashOrder(user.token, coupon).then(res => {
            if (res.data.orderCreated) {
                if (typeof window != 'undefined') {
                    localStorage.removeItem('cart');
                }
                // Empty Cart
                dispatch({
                    type: 'ADD_TO_CART',
                    payload: []
                })
                // Empty Coupon
                dispatch({
                    type: 'COUPON_APPLIED',
                    payload: ''
                })
                dispatch({
                    type: 'COD_APPLIED',
                    payload: false
                })
                emptyUserCart(user.token);
                setTimeout(() => {
                    history.push('/user/history')
                }, 1000)
            }
        })
    }

    return (
        <div className="container-fluid row">
            <div className="col-md-6">
                <h4>Delivery Address</h4>
                <br />
                <br />
                <ReactQuill theme="snow" value={address} onChange={setAddress} />
                <button onClick={saveAddressToDb} className="btn btn-primary mt-2" >Save</button>
                <hr />
                <h4>Got Coupons?</h4>
                <br />
                {couponApplySection()}
            </div>
            <div className="col-md-6">
                <h4>Order Summary</h4>
                <hr />
                <p>Products {products.length}</p>
                <hr />
                {products.map((p) => (
                    <div key={p._id}>
                        <p>{p.product.title} ( {p.color} ) x {p.count} = {p.product.price * p.count} </p>
                    </div>
                ))}
                <hr />
                <p>Cart total = {total}</p>
                {
                    totalAfterDiscount > 0 && <p className="bg-success p-2">Discount Applied: Payable Amount : {totalAfterDiscount}</p>

                }
                <div className="row">
                    <div className="col-md-6">
                        {cod ?
                            (
                                <button className="btn btn-primary"
                                    onClick={createCashOrder}
                                    disabled={!addressSaved}>Place Order</button>
                            ) : (
                                <button className="btn btn-primary"
                                    onClick={() => history.push('/payment')}
                                    disabled={!addressSaved}>Place Order</button>
                            )}
                    </div>
                    <div className="col-md-6">
                        <button disabled={!products.length} onClick={emptyCart}
                            className="btn btn-primary">Empty Cart</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Checkout;