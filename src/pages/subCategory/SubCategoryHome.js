import React, { useEffect, useState } from 'react';
import { toast } from "react-toastify";
import { Link } from 'react-router-dom';
import ProductCard from '../../components/cards/ProductCard'
import { readSubCategory } from '../../apis/subCategory';

const SubCategoryHome = ({ match }) => {

    const [subCategory, setSubCategory] = useState({});
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    const { slug } = match.params;

    useEffect(() => {
        setLoading(true);
        readSubCategory(slug).then(res => {
            setSubCategory(res.data.subCategory)
            setProducts(res.data.products)
            setLoading(false);
        }).catch(err => {
            setLoading(false);
            toast.error(err.message);
        })
    }, [])

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col">
                    {loading ?
                        (<h4 className="text-center jumbotron p-3 mt-5 mb-5 display-4">Loading...</h4>) :
                        (
                            (<h4 className="text-center jumbotron p-3 mt-5 mb-5 display-4">
                                {products.length} Products in "{subCategory.name}" sub category
                            </h4>)
                        )}
                </div>
            </div>
            <div className="row">
                            {products.map(product=>(
                                <div className="col" key={product._id}>
                                    <ProductCard product={product}/>
                                </div>
                            ))}
            </div>
        </div>
    )
}

export default SubCategoryHome;