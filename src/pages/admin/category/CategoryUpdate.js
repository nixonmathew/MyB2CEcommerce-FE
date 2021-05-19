import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { toast } from "react-toastify";
import { readCategory, updateCategory } from '../../../apis/category';
import AdminNav from '../../../components/nav/AdminNav';
import CategoryForm from '../../../components/forms/CategoryForm'

const CategoryUpdate = ({ history, match }) => {

    const { user } = useSelector((state) => ({ ...state }))
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getCategory();
    }, [])

    const getCategory = () => {
        readCategory(match.params.slug).then(res => setName(res.data.name))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        console.log(name);
        updateCategory(user.token, { name }, match.params.slug).then(res => {
            setName('');
            setLoading(false);
            toast.success(name + ' category updated successfully')
            history.push("/admin/category")
        }).catch((err) => {
            toast.error(err.message)
            setLoading(false);
        })
    }
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>
                <div className="col">
                    {loading ? (<h4 className="text-danger">Loading...</h4>) : (<h4>Update a Category</h4>)}
                    <CategoryForm handleSubmit={handleSubmit} name={name} setName={setName} />
                </div>
            </div>
        </div>
    )
}

export default CategoryUpdate;
