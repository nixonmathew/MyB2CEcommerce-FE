import React, { useEffect, useState } from 'react';
import { listSubCategories } from '../../apis/subCategory';
import { toast } from "react-toastify";
import { Link } from 'react-router-dom';

const SubCategoryList = () => {

    const [subCategories, setSubCategories] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        listSubCategories().then(subs => {
            console.log(subs);
            setSubCategories(subs.data)
            setLoading(false);
        }).catch(err => {
            setLoading(false);
            toast.error(err.message);
        })
    }, [])

    const showSubCategories = () => (
        subCategories.map((sub) => (
            <div key={sub._id} className="col btn btn-outlined-primary btn-lg btn-block btn-raised m-3">
                <Link to={`/subcategory/${sub.slug}`}>
                    {sub.name}
                </Link>
            </div>
        ))
    )

    return (
        <div className="container">
            <div className="row">
                {loading ? (<h4 className="text-center">Loading...</h4>) : (showSubCategories())}
            </div>
        </div>
    )
}

export default SubCategoryList;