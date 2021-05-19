import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { createPaymentIntent } from '../apis/stripe';
import { Link } from 'react-router-dom';
import { Card } from 'antd';
import { DollarOutlined, CheckOutlined } from "@ant-design/icons";
import { createOrder, emptyUserCart } from '../apis/user';

const StripeCheckout = () => {

    const { user, coupon } = useSelector((state) => ({ ...state }))

    const [succeeded, setSucceeded] = useState(false);
    const [error, setError] = useState(null);
    const [processing, setProcessing] = useState("");
    const [disabled, setDisabled] = useState(true);
    const [clientSecret, setClientSecret] = useState("");

    const [cartTotal, setCartTotal] = useState(0);
    const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);
    const [payable, setPayable] = useState(0);


    const stripe = useStripe();
    const elements = useElements();
    const dispatch = useDispatch();

    useEffect(() => {
        createPaymentIntent(user.token, coupon).then(res => {
            setClientSecret(res.data.clientSecret);
            setCartTotal(res.data.cartTotal);
            setTotalAfterDiscount(res.data.totalAfterDiscount)
            setPayable(res.data.payable);
        }).catch(err => {

        })
    }, [])


    const cardStyle = {
        style: {
            base: {
                color: "#32325d",
                fontFamily: 'Arial, sans-serif',
                fontSmoothing: "antialiased",
                fontSize: "16px",
                "::placeholder": {
                    color: "#32325d"
                }
            },
            invalid: {
                color: "#fa755a",
                iconColor: "#fa755a"
            }
        }
    };

    const handleChange = async (event) => {
        // Listen for changes in the CardElement
        // and display any errors as the customer types their card details
        setDisabled(event.empty);
        setError(event.error ? event.error.message : "");
    };

    const handleSubmit = async ev => {
        ev.preventDefault();
        setProcessing(true);

        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    name: ev.target.name.value
                }
            }
        });

        if (payload.error) {
            setError(`Payment failed ${payload.error.message}`);
            setProcessing(false);
        } else {

            createOrder(user.token, payload).then(res => {
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

                    // Empty Cart
                    emptyUserCart(user.token);
                }
            })

            setError(null);
            setProcessing(false);
            setSucceeded(true);

        }
    };

    return (
        <>
            { !succeeded && (
                <div>
                    { coupon && totalAfterDiscount ?
                        (<p className="alert alert-success">Coupon Applied Successfully</p>)
                        :
                        (<p className="alert alert-danger">No Coupon Applied</p>)}
                </div>
            )}
            <div className="text-center pb-5">
                <Card
                    actions={[
                        <p className="text-info"> <DollarOutlined /><br />Total: {cartTotal}</p>,
                        <p className="text-info"> <CheckOutlined /><br /> Total payable: {payable / 100}</p>
                    ]}>

                </Card>
            </div>
            <form id="payment-form" className="stripe-form" onSubmit={handleSubmit}>
                <CardElement id="card-element" options={cardStyle} onChange={handleChange} />
                <button className="stripe-button"
                    disabled={processing || disabled || succeeded}
                    id="submit"
                >
                    <span id="button-text">
                        {processing ? (
                            <div className="spinner" id="spinner"></div>
                        ) : (
                            "Pay now"
                        )}
                    </span>
                </button>
                {/* Show any error that happens when processing the payment */}
                {error && (
                    <div className="card-error" role="alert">
                        {error}
                    </div>
                )}
                {/* Show a success message upon completion */}
                <p className={succeeded ? "result-message" : "result-message hidden"}>
                    Payment succeeded.
                <Link to={`/user/history`} >
                        {" "}
                    see the result in your purchase history.
                </Link>
                </p>
            </form>
        </>
    )
}

export default StripeCheckout;