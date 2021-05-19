import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getFilteredProducts, getProduct, getRelatedProducts, productRating } from '../apis/product'
import SingleProduct from '../components/cards/SingleProduct'
import ProductCard from "../components/cards/ProductCard";

const Product = ({ match }) => {

    const [product, setProduct] = useState({})
    const [star, setStar] = useState(0);
    const { user } = useSelector((state) => ({ ...state }))
    const [related, setRelated] = useState([]);

    useEffect(() => {
        loadSingleProduct();
    }, [])

    useEffect(() => {

    })

    const loadSingleProduct = () => {
        getProduct(match.params.slug).then(res => {
            setProduct(res.data)
            if (user && user.token && res.data) {
                let usersProduct = res.data.ratings.find(prod => prod.postedBy.toString() == user._id.toString());
                if (usersProduct) {
                    setStar(usersProduct.star)
                }
            }
            getRelatedProducts(res.data._id).then(res => {
                setRelated(res.data);
            })
        })
    }

    const onStarClicked = (newRating, name) => {
        setStar(newRating);
        productRating(name, user.token, newRating).then(res => {
            loadSingleProduct();
        })
    }

    return (
        <>
            <div className="container-fluid">
                <div className="row pt-4">
                    <SingleProduct product={product} star={star} onStarClicked={onStarClicked} />
                </div>
                <div className="row">
                    <div className="text-center col pt-5 pb-5">
                        <hr />
                        <h4>Related Products</h4>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    {related.length ? related.map((product) => (
                        <div className='col-md-4' key={product._id}>
                            <ProductCard product={product} />
                        </div>
                    )) : <div className="text-center col">No Products found</div>}
                </div>
            </div>
        </>
    )

}

export default Product;