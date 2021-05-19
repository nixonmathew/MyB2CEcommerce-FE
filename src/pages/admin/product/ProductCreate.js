import React, { useEffect, useState } from 'react';
import AdminNav from '../../../components/nav/AdminNav';
import { createProduct } from '../../../apis/product'
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import ProductCreateForm from '../../../components/forms/ProductCreateForm';
import { getAllSubcategoryInCategory, listCategories } from '../../../apis/category';
import FileUpload from '../../../components/forms/FileUpload';
import { LoadingOutlined } from "@ant-design/icons";

const InitialState = {
    title: '',
    description: '',
    price: '',
    category: '',
    subCategories: [],
    shipping: '',
    quantity: '',
    images: [],
    categories: [],
    colors: ['BLACK', 'BROWN', 'SILVER', 'WHITE', 'BLUE'],
    brands: ['APPLE', 'SAMSUNG', 'MICROSOFT', 'LENOVO', 'ASUS'],
    color: '',
    brand: '',
}

const ProductCreate = () => {

    const [formValues, setFormValues] = useState(InitialState)
    const [loading, setLoading] = useState(false);
    const { user } = useSelector((state) => ({ ...state }))
    const [subOptions, setSubOptions] = useState([]);
    const [showSubCategories, setShowSubCategories] = useState(false);
    useEffect(() => {
        getCategories();
    }, [])

    const getCategories = () => {
        listCategories().then(res => setFormValues({ ...formValues, categories: res.data }))
    }

    const handleChange = (e) => {
        setFormValues({ ...formValues, [e.target.name]: e.target.value });
    }
    const handleSubCategoryChange = (e) => {
        setFormValues({ ...formValues, subCategories: e })
    }

    const onCategorySelect = (e) => {
        e.preventDefault();
        setFormValues({ ...formValues, category: e.target.value, subCategories: [] });
        getAllSubcategoryInCategory(e.target.value).then(res => {
            setSubOptions(res.data);
        })
        setShowSubCategories(true);
        console.log(formValues)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        await createProduct(user.token, formValues).then(res => {
            setLoading(false);
            toast.success('Product created successfully')
            // window.location.reload();
        }).catch(err => {
            toast.error(err.response.data.err)
            setLoading(false);
        })
    }

    return (
        <div className='container-fluid'>
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>
                <div className="col-md-10">
                    {!loading ? (<h4>Product create</h4>) : (<LoadingOutlined className="text-danger h1" />)}

                    <div className="p-3">
                        <FileUpload formValues={formValues} setFormValues={setFormValues} setLoading={setLoading} />
                    </div>
                    <ProductCreateForm handleChange={handleChange} onCategorySelect={onCategorySelect}
                        handleSubCategoryChange={handleSubCategoryChange} handleSubmit={handleSubmit} formValues={formValues}
                        subOptions={subOptions} showSubCategories={showSubCategories} />
                </div>
            </div>
        </div>
    )
}

export default ProductCreate;