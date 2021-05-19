import React, { useEffect, useState } from 'react'
import { Card, Tabs, Tooltip } from "antd";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Link } from 'react-router-dom';
import ProductDetailItem from './ProductDetailItem';
import StarRating from "react-star-ratings";
import RatingModal from '../modal/RatingModal';
import { showAverage } from '../../apis/rating';
import _ from 'lodash'
import { useDispatch, useSelector } from "react-redux";
import { addUserWishlist } from '../../apis/user';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';

const { TabPane } = Tabs;
const { Meta } = Card;

const SingleProduct = ({ product, star, onStarClicked }) => {

    const { title, description, images, slug, rating, _id } = product;
    const [tooltip, setTooltip] = useState('Click to add')

    const dispatch = useDispatch();
    const { user, cart } = useSelector((state) => ({ ...state }))
    const history = useHistory();

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

    const handleAddToWishlist = (e) => {
        e.preventDefault();
        addUserWishlist(user.token, product._id).then(res => {
            toast.success("Added to wishlist");
            history.push('/user/wishlist')
        })
    }

    return (
        <>
            <div className="col-md-7">
                {/* image carousel */}
                <Carousel showArrows autoPlay infiniteLoop>
                    {images && images.length && images.map(image => <img src={image.url} key={image.public_id} />)}
                </Carousel>
                <Tabs type="card">
                    <TabPane tab="Description" key="1">{description}</TabPane>
                    <TabPane tab="More" key="2">Call us </TabPane>
                </Tabs>
            </div>
            <div className="col-md-5">
                <h1 className="bg-info p-3">{title}</h1>

                {product && product.ratings && product.ratings.length ? showAverage(product) :
                    (<div className="text-center pt-1 pb-3">No ratings yet</div>)}

                <Card actions={[
                    <Tooltip title={tooltip}>
                        <a onClick={handleCart}>
                            <ShoppingCartOutlined className="text-danger" /><br />Add to Cart
                        </a>
                    </Tooltip>,
                    <a onClick={handleAddToWishlist}>
                        <HeartOutlined className="text-info" /><br />Add to Wishlist
                    </a>,
                    <RatingModal>
                        <StarRating rating={star}
                            starRatedColor="red"
                            changeRating={onStarClicked}
                            isSelectable={true}
                            numberOfStars={5}
                            name={_id}></StarRating>
                    </RatingModal>
                ]}>
                    <ProductDetailItem product={product} />
                </Card>
            </div>
        </>
    )

}

export default SingleProduct;