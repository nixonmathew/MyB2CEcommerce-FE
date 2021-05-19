import { CheckCircleOutlined, CloseCircleOutlined, CloseOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react'
import ModalImage from "react-modal-image";
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify';

const ProductCardInCheckout = ({ p }) => {

    const colors = ['BLACK', 'BROWN', 'SILVER', 'WHITE', 'BLUE'];
    const [selectedColor, setSelectedColor] = useState('');

    const dispatch = useDispatch();

    useEffect(() => {
        setSelectedColor(p.color);
    }, [])

    const handleColorChange = (e) => {
        setSelectedColor(e.target.value);
        let cart = [];
        if (typeof window !== 'undefined') {
            cart = JSON.parse(localStorage.getItem('cart'))
            let prod = cart.find(product => product._id == p._id);
            prod.color = e.target.value;
            localStorage.setItem('cart', JSON.stringify(cart))
            dispatch({
                type: 'ADD_TO_CART',
                payload: cart
            })
        }
    }

    const handleCountChange = (e) => {
        e.target.value = e.target.value < 1 ? 1 : e.target.value;

        if (e.target.value > p.quantity) {
            toast.error('Available quantity :' + p.quantity)
            return;
        }
        let cart = [];
        if (typeof window !== 'undefined') {
            cart = JSON.parse(localStorage.getItem('cart'))
            let prod = cart.find(product => product._id == p._id);
            prod.count = e.target.value;
            localStorage.setItem('cart', JSON.stringify(cart))
            dispatch({
                type: 'ADD_TO_CART',
                payload: cart
            })
        }
    }

    const handlerRemove = () => {
        let cart = [];
        if (typeof window !== 'undefined') {
            cart = JSON.parse(localStorage.getItem('cart'))
            let ind = cart.findIndex(product => product._id == p._id);
            cart.splice(ind, 1);
            localStorage.setItem('cart', JSON.stringify(cart))
            dispatch({
                type: 'ADD_TO_CART',
                payload: cart
            })
        }
    }

    return (
        <tbody>
            <tr>
                <td>
                    <div style={{ width: "100px", height: "auto" }}>
                        {p.images.length ? (<ModalImage small={p.images[0].url}
                            large={p.images[0].url} />) : (<h4>NA</h4>)}
                    </div>
                </td>
                <td>{p.title}</td>
                <td>&#8377;{p.price}</td>
                <td>{p.brand}</td>
                <td>
                    <select onChange={handleColorChange} name="color" value={selectedColor} className="form-control" >
                        {/* {p.color ? <option value={p.color}>{p.color}</option> : <option>Select</option>} */}
                        {colors.map(c => (
                            <option key={c} value={c}>{c}</option>
                        ))}
                    </select>
                </td>
                <td className="text-center">
                    <input type="number" value={p.count} onChange={handleCountChange}
                        className="form-control text-center" style={{ width: '50px' }} />
                </td>
                <td className="text-center">
                    {p.shipping === "YES" ?
                        <CheckCircleOutlined className="text-success" /> : <CloseCircleOutlined className="text-danger" />}
                </td>
                <td><CloseOutlined onClick={handlerRemove} className="text-danger" /></td>
            </tr>

        </tbody>
    )
}

export default ProductCardInCheckout;