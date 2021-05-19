import React, { useEffect, useState } from 'react';
import { listCategories } from '../../apis/category';
import { toast } from "react-toastify";
import { Link } from 'react-router-dom';

const CategoryList = () => {

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        listCategories().then(categories => {
            setCategories(categories.data)
            setLoading(false);
        }).catch(err => {
            setLoading(false);
            toast.error(err.message);
        })
    }, [])

    const showCategories = () => (
        categories.map((c) => (
            <div key={c._id} className="col btn btn-outlined-primary btn-lg btn-block btn-raised m-3">
                <Link to={`/category/${c.slug}`}>
                    {c.name}
                </Link>
            </div>
        ))
    )

    return (
        <div className="container">
            <div className="row">
                {loading ? (<h4 className="text-center">Loading...</h4>) : (showCategories())}
            </div>
        </div>
    )
}

export default CategoryList;