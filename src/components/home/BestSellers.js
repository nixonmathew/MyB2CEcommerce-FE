import React, { useEffect, useState } from 'react';
import { getFilteredProducts, getProductsCount } from '../../apis/product';
import LoadingCard from '../cards/LoadingCard';
import ProductCard from '../cards/ProductCard';
import { Pagination } from "antd";

const BestSellers = () => {

    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [productsCount, setProductsCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        getProducts();
    }, [currentPage])

    useEffect(() => {
        getProductsCount().then(res => setProductsCount(res.data))
    }, [])

    const getProducts = () => {
        setLoading(true);
        getFilteredProducts('sold', 'desc', currentPage).then(res => {
            setLoading(false);
            setProducts(res.data);
        }).catch(err => {
            setLoading(false);
            console.log(err)
        })
    }

    return (
        <>
            <div className="container">
                {loading ? <LoadingCard count={3} /> : (
                    <div className="row">
                        {
                            products.map((product) => (
                                <div key={product._id} className="col-md-4">
                                    <ProductCard product={product} />
                                </div>
                            ))
                        }
                    </div>
                )}
            </div>
            <div className="row">
                <nav className="col-md-4 offset-md-4 text-center pt-5">
                    <Pagination
                        current={currentPage}
                        total={(productsCount / 3) * 10}
                        onChange={value => setCurrentPage(value)}
                    />
                </nav>
            </div>
        </>
    )
}

export default BestSellers;