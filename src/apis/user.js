import axios from 'axios';

export const userCart = async (authToken, cart) => await axios.post(process.env.REACT_APP_API + '/user/cart', cart, {
    headers: {
        authToken
    }
})

export const getUserCart = async (authToken) => await axios.get(process.env.REACT_APP_API + '/user/cart', {
    headers: {
        authToken
    }
})

export const emptyUserCart = async (authToken) => await axios.delete(process.env.REACT_APP_API + '/user/cart', {
    headers: {
        authToken
    }
})

export const userAddress = async (authToken, address) => await axios.post(process.env.REACT_APP_API + '/user/address', { address }, {
    headers: {
        authToken
    }
})

export const userCoupon = async (authToken, coupon) => await axios.post(process.env.REACT_APP_API + '/user/cart/coupon', { coupon }, {
    headers: {
        authToken
    }
})

export const createOrder = async (authToken, stripeResponse) => await axios.post(process.env.REACT_APP_API + '/user/order', { stripeResponse }, {
    headers: {
        authToken
    }
})

export const getUserOrders = async (authToken) => await axios.get(process.env.REACT_APP_API + '/user/orders', {
    headers: {
        authToken
    }
})

export const getUserWishlist = async (authToken) => await axios.get(process.env.REACT_APP_API + '/user/wishlist', {
    headers: {
        authToken
    }
})

export const removeUserWishlist = async (authToken, productId) => await axios.put(process.env.REACT_APP_API + '/user/wishlist/' + productId, {}, {
    headers: {
        authToken
    }
})

export const addUserWishlist = async (authToken, productId) => await axios.post(process.env.REACT_APP_API + '/user/wishlist', { productId }, {
    headers: {
        authToken
    }
})

export const cashOrder = async (authToken, coupon) => await axios.post(process.env.REACT_APP_API + '/user/cash-order', { coupon }, {
    headers: {
        authToken
    }
})