
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import UserNav from '../../components/nav/UserNav';
import { getUserOrders } from '../../apis/user';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons'
import ShowPaymentInfo from '../../components/cards/ShowPaymentInfo';
import { PDFDownloadLink } from '@react-pdf/renderer';
import Invoice from '../../components/order/invoice';


const History = () => {

    const [orders, setOrders] = useState([]);
    const { user } = useSelector((state) => ({ ...state }))
    const dispatch = useDispatch();

    useEffect(() => {
        loadOrders();
    }, [])

    const loadOrders = () => {
        getUserOrders(user.token).then(res => {
            console.log(res);
            setOrders(res.data);
        })
    }

    const showDownloadLink = (order) => (
        <PDFDownloadLink document={
            <Invoice order={order} />
        }
            fileName="invoice.pdf"
            className="btn btn-sm btn-block btn-outline-primary"
        >
            Download PDF
        </PDFDownloadLink>
    )

    const showEachOrder = () => orders.map((order, i) => (
        <div key={i} className="m-5 p-3 card">
            <ShowPaymentInfo order={order} />
            {showOrderInTable(order)}
            <div className="row">
                <div className="col">
                    {showDownloadLink(order)}
                </div>
            </div>
        </div>
    ))

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


    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <UserNav />
                </div>
                <div className="col text-center">
                    <h4>
                        {orders.length ? "User purchase orders" : "No purchase orders"}
                    </h4>
                    {showEachOrder()}
                </div>
            </div>
        </div>
    )
}

export default History