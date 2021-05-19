import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import "../styles/stripe.css"
import StripeCheckout from '../components/StripeCheckout';
const Payment = () => {

    const promise = loadStripe(process.env.REACT_APP_STRIPE_KEY)
    const { user, coupon } = useSelector((state) => ({ ...state }))

    return (
        <div className="container p-5 text-center">
            <h4>Complete your purchase</h4>
            <Elements stripe={promise}>
                <div className="col-md-8 offset-md-2">
                    <StripeCheckout />
                </div>
            </Elements>
        </div>
    )
}

export default Payment;