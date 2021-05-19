
import axios from 'axios';


export const createPaymentIntent = async (authToken, coupon) => await axios.post(process.env.REACT_APP_API + '/create-payment-intent', { coupon }, {
    headers: {
        authToken
    }
})
