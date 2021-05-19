import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { toast } from "react-toastify";
import { deleteSubCategory, updateSubCategory, readSubCategory } from '../../../apis/subCategory';
import { listCategories } from '../../../apis/category';

import CategoryForm from '../../../components/forms/CategoryForm';
import LocalSearch from '../../../components/forms/LocalSearch';
import AdminNav from '../../../components/nav/AdminNav';


const SubCategoryUpdate = ({ match, history }) => {

    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [parentCategory, setParentCategory] = useState("");
    const { user } = useSelector((state) => ({ ...state }))

    useEffect(() => {
        loadCategories();
        loadSubCategory();
    }, [])

    const loadCategories = () => {
        listCategories().then(res => setCategories(res.data))
    }
    const loadSubCategory = () => {
        readSubCategory(match.params.slug).then((res) => {
            setName(res.data.name);
            setParentCategory(res.data.parentCategory);
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        updateSubCategory(user.token, { name, parentCategory }, match.params.slug).then(res => {
            toast.success(name + ' sub category updated successfully')
            console.log(res);
            setLoading(false);
            history.push('/admin/subcategory')
        }).catch((err) => {
            toast.error(err.message)
            setLoading(false);
        })
    }

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
                    {loading ? (<h4 className="text-danger">Loading...</h4>) : (<h4>Update sub category</h4>)}

                    <div className="form-group">
                        <label>Parent Category</label>
                        <select disabled name="category" value={parentCategory} onChange={handleSelectChange} className="form-control">
                            <option key="" value="">Please Select</option>
                            {categories.length && categories.map(category => (
                                <option key={category._id} value={category._id}>{category.name}</option>
                            ))}
                        </select>
                    </div>
                    <CategoryForm handleSubmit={handleSubmit} name={name} setName={setName} />
                    {/* <LocalSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} /> */}
                </div>
            </div>
        </div>
    )
}

export default SubCategoryUpdate;
