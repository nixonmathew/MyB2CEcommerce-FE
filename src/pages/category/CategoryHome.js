import React, { useEffect, useState } from 'react';
import { listCategories, readCategory } from '../../apis/category';
import { toast } from "react-toastify";
import { Link } from 'react-router-dom';
import ProductCard from '../../components/cards/ProductCard'

const CategoryHome = ({ match }) => {

    const [category, setCategory] = useState({});
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    const { slug } = match.params;

    useEffect(() => {
        setLoading(true);
        readCategory(slug).then(res => {
            setCategory(res.data.category)
            setProducts(res.data.products)
            setLoading(false);
        }).catch(err => {
            setLoading(false);
            toast.error(err.message);
        })
    }, [])

    // const showCategories = () => (
    //     categories.map((c) => (
    //         <div key={c._id} className="col btn btn-outlined-primary btn-lg btn-block btn-raised m-3">
    //             <Link to={`/category/${c.slug}`}>
    //                 {c.name}
    //             </Link>
    //         </div>
    //     ))
    // )

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col">
                    {loading ?
                        (<h4 className="text-center jumbotron p-3 mt-5 mb-5 display-4">Loading...</h4>) :
                        (
                            (<h4 className="text-center jumbotron p-3 mt-5 mb-5 display-4">
                                {products.length} Products in "{category.name}" category
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

export default CategoryHome;