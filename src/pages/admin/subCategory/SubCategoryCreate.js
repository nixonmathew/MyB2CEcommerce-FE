import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { toast } from "react-toastify";
import { createSubCategory, deleteSubCategory, listSubCategoriesInACategory } from '../../../apis/subCategory';
import { listCategories } from '../../../apis/category';

import CategoryForm from '../../../components/forms/CategoryForm';
import LocalSearch from '../../../components/forms/LocalSearch';
import AdminNav from '../../../components/nav/AdminNav';


const SubCategoryCreate = () => {

    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [parentCategory, setParentCategory] = useState("");
    const { user } = useSelector((state) => ({ ...state }))
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        loadCategories();
        loadSubCategories();
    }, [parentCategory])

    const loadCategories = () => {
        listCategories().then(res => setCategories(res.data))
    }
    const loadSubCategories = () => {
        listSubCategoriesInACategory(parentCategory).then(res => setSubCategories(res.data))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        createSubCategory(user.token, { name, parentCategory }).then(res => {
            toast.success(name + ' sub category created successfully')
            setName('');
            setLoading(false);
            loadSubCategories();
        }).catch((err) => {
            toast.error(err.message)
            setLoading(false);
        })
    }

    const removeSubCategory = (slug) => {
        setLoading(true);
        deleteSubCategory(user.token, slug).then(res => {
            setLoading(false);
            toast.success(res.data.name + " Successfully removed")
            loadSubCategories();
        }).catch((err) => {
            setLoading(false);
            toast.error(err.message)
        })
    }


    const subCategoriesList = () => (
        subCategories.filter(res => res.name.toLowerCase().includes(searchTerm)).map(subCategory =>
        (<div className="alert alert-secondary" key={subCategory._id}>
            {subCategory.name}
            <span className="btn btn-sm float-right"><DeleteOutlined onClick={() => removeSubCategory(subCategory.slug)} className="text-danger" /></span>
            <Link to={"/admin/subcategory/" + subCategory.slug}>
                <span className="btn btn-sm float-right">
                    <EditOutlined className="text-warning" />
                </span>
            </Link>
        </div>)
        )
    )

    const handleSelectChange = (e) => {
        setParentCategory(e.target.value);
    }


    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>
                <div className="col">
                    {loading ? (<h4 className="text-danger">Loading...</h4>) : (<h4>Create a sub category</h4>)}

                    <div className="form-group">
                        <label>Parent Category</label>
                        <select name="category" onChange={handleSelectChange} className="form-control">
                            <option key="" value="">Please Select</option>
                            {categories.length && categories.map(category => (
                                <option key={category._id} value={category._id}>{category.name}</option>
                            ))}
                        </select>
                    </div>
                    <CategoryForm handleSubmit={handleSubmit} name={name} setName={setName} />
                    <LocalSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

                    {parentCategory && subCategories.length ? (subCategoriesList()) : ("No Sub Category present")}

                </div>
            </div>
        </div>
    )
}

export default SubCategoryCreate;
