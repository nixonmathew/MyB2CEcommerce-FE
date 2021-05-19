import React, { useEffect, useState } from 'react';
import { listProductsByCount, removeProduct } from '../../../apis/product';
import AdminProductCard from '../../../components/cards/AdminProductCard';
import AdminNav from '../../../components/nav/AdminNav';
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const AllProducts = () => {

    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);

    const { user } = useSelector((state) => ({ ...state }))

    const loadAllProducts = () => {
        listProductsByCount(100).then((res) => {
            setProducts(res.data);
            setLoading(false);
        }).catch(err => {
            setLoading(false);
            console.log('error in fetching products', err)
        })
    }

    useEffect(() => {
        setLoading(true);
        loadAllProducts();
    }, [])

    const handleRemove = (slug) => {
        if (window.confirm(`Are you sure you want to delete ${slug}`)) {
            removeProduct(user.token, slug).then((res) => {
                loadAllProducts();
                toast.error(`${res.data.title} deleted`)
            }).catch(err => {
                toast.error(err.response.data)
                console.log(err)
            })
        }
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>
                <div className="col">
                    {loading ? (<h4 className="text-danger">Loading...</h4>) : (<h4>All Products</h4>)}
                    <div className="row">
                        {products.map(product => (
                            <div key={product._id} className="col-md-4 pb-3">
                                <AdminProductCard product={product} handleRemove={handleRemove} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AllProducts;