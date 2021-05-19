import axios from 'axios';

export const listOrders = async (authToken) => await axios.get(process.env.REACT_APP_API + '/admin/orders', {
    headers: {
        authToken
    }
});

export const updateOrderState = async (authToken, orderId, orderState) =>
    await axios.put(process.env.REACT_APP_API + `/admin/order-status`, { orderId, orderState }, {
        headers: {
            authToken
        }
    })
