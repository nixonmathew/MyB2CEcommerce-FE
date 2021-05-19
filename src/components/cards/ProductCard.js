import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Card, Tooltip } from "antd";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Link } from 'react-router-dom';
import { showAverage } from '../../apis/rating';
import _ from 'lodash'


const { Meta } = Card

const ProductCard = ({ product }) => {

    const { images, price, title, description, slug } = product;
    const [tooltip, setTooltip] = useState('Click to add')

    const dispatch = useDispatch();
    const { user, cart } = useSelector((state) => ({ ...state }))

    const handleCart = () => {
        let cart = [];
        if (typeof window != "undefined") {
            if (localStorage.getItem('cart')) {
                cart = JSON.parse(localStorage.getItem('cart'));
            }
            cart.push({ ...product, count: 1 });
            // remove duplicates
            let unique = _.uniqWith(cart, _.isEqual);
            localStorage.setItem("cart", JSON.stringify(unique));
            setTooltip('Added');
            dispatch({
                type: "ADD_TO_CART",
                payload: unique
            })
            dispatch({
                type: "SET_DRAWER_VISIBILITY",
                payload: true
            })
        }
    }

    return (
        <>
            {product && product.ratings && product.ratings.length ? showAverage(product) :
                (<div className="text-center pt-1 pb-3">No ratings yet</div>)}
            <Card cover={
                <img src={images && images.length ? images[0].url : ""}
                    style={{ height: "150px", objectFit: 'cover' }}
                    className="p-1"
                />}
                actions={[
                    <Link to={`/product/${slug}`}>
                        <EyeOutlined className="text-primary" /><br />View Product
                    </Link>,
                    <Tooltip title={tooltip}>
                        <a onClick={handleCart} disabled={product.quantity < 1}>
                            <ShoppingCartOutlined className="text-danger" /><br />
                            {product.quantity < 1 ? 'Out of stock' : 'Add to Cart'}
                        </a>
                    </Tooltip>,
                ]}
            >
                <Meta title={`${title} - ${price}`} description={`${description && description.substring(0, 40)}...`} />
            </Card >
        </>
    )
}

export default ProductCard;