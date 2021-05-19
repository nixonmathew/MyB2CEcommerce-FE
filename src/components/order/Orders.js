import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import React from 'react';
import ShowPaymentInfo from '../cards/ShowPaymentInfo';


const showOrderInTable = (order) => (
    <table className="table table-bordered">
        <thead className="thead-light">
            <tr>
                <th scope="col">Title</th>
                <th scope="col">Price</th>
                <th scope="col">Brand</th>
                <th scope="col">Color</th>
                <th scope="col">Count</th>
                <th scope="col">Shipping</th>
            </tr>
        </thead>
        <tbody>
            {order.products.map((product, i) => (
                <tr key={i}>
                    <td>
                        <b>{product.product.title}</b>
                    </td>
                    <td>
                        {product.product.price}
                    </td>
                    <td>
                        {product.product.brand}
                    </td>
                    <td>
                        {product.color}
                    </td>
                    <td>
                        {product.count}
                    </td>
                    <td>
                        {product.product.shipping == "YES" ?
                            <CheckCircleOutlined style={{ color: 'green' }} /> :
                            <CloseCircleOutlined style={{ color: 'red' }} />}
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
)


const Orders = ({ orders, handleStatusChange }) => (
    orders.map((order) => (
        <div key={order._id} className="row pb-5">
            <div className="btn btn-block bg-light">
                <ShowPaymentInfo showStatus={false} order={order} />
                <div className="row">
                    <div className="col-md-4">Delivery Status</div>
                    <div className="col-md-8">
                        <select className="form-control"
                            defaultValue={order.orderState}
                            onChange={(e) => handleStatusChange(order._id, e.target.value)}>
                            <option value='PROCESSING' >PROCESSING</option>
                            <option value='NOT PROCESSED' >NOT PROCESSED</option>
                            <option value='CASH ON DELIVERY' >CASH ON DELIVERY</option>
                            <option value='DISPATCHED' >DISPATCHED</option>
                            <option value='CANCELLED' >CANCELLED</option>
                            <option value='COMPLETED' >COMPLETED</option>
                        </select>
                    </div>
                </div>
            </div>
            { showOrderInTable(order)}
        </div>
    ))
)
export default Orders;