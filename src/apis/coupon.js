import axios from 'axios';


export const createCoupon = async (authToken, coupon) => {
    return await axios.post(process.env.REACT_APP_API + '/coupon', { coupon }, {
        headers: {
            authToken
        }
    })
}

export const listCoupons = async (authToken) => {
    return await axios.get(process.env.REACT_APP_API + '/coupons')
}

export const removeCoupon = async (authToken, couponName) => {
    return await axios.delete(process.env.REACT_APP_API + `/coupon/${couponName}`, {
        headers: {
            authToken
        }
    })
}