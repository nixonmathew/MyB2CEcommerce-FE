import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { toast } from "react-toastify";
import { createCategory, deleteCategory, listCategories } from '../../../apis/category';
import CategoryForm from '../../../components/forms/CategoryForm';
import LocalSearch from '../../../components/forms/LocalSearch';
import AdminNav from '../../../components/nav/AdminNav';


const CategoryCreate = () => {

    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const { user } = useSelector((state) => ({ ...state }))
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        getCategories();
    }, [])

    const getCategories = () => {
        listCategories().then(res => setCategories(res.data))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        createCategory(user.token, { name }).then(res => {
            toast.success(name + ' category created successfully')
            setName('');
            setLoading(false);
            getCategories();
        }).catch((err) => {
            toast.error(err.message)
            setLoading(false);
        })
    }

    const removeCategory = (slug) => {
        setLoading(true);
        deleteCategory(user.token, slug).then(res => {
            setLoading(false);
            getCategories();
            toast.success(res.data.name + " Successfully removed")
        }).catch((err) => {
            setLoading(false);
            toast.error(err.message)
        })
    }


    const categoriesList = () => (
        categories.filter(res => res.name.toLowerCase().includes(searchTerm)).map(category =>
        (<div className="alert alert-secondary" key={category._id}>
            {category.name}
            <span className="btn btn-sm float-right"><DeleteOutlined onClick={() => removeCategory(category.slug)} className="text-danger" /></span>
            <Link to={"/admin/category/" + category.slug}>
                <span className="btn btn-sm float-right">
                    <EditOutlined className="text-warning" />
                </span>
            </Link>
        </div>)
        )
    )



    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>
                <div className="col">
                    {loading ? (<h4 className="text-danger">Loading...</h4>) : (<h4>Create a Category</h4>)}
                    <CategoryForm handleSubmit={handleSubmit} name={name} setName={setName} />
                    <LocalSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                    {categories.length ? (categoriesList()) : ("No Category present")}
                </div>
            </div>
        </div>
    )
}

export default CategoryCreate;
