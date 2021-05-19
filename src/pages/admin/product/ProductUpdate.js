import React, { useEffect, useState } from 'react';
import AdminNav from '../../../components/nav/AdminNav';
import { createProduct, getProduct, updateProduct } from '../../../apis/product'
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import ProductCreateForm from '../../../components/forms/ProductCreateForm';
import { getAllSubcategoryInCategory, listCategories } from '../../../apis/category';
import FileUpload from '../../../components/forms/FileUpload';
import { LoadingOutlined } from "@ant-design/icons";
import { useParams } from 'react-router';
import ProductUpdateForm from '../../../components/forms/ProductUpdateForm';


const InitialState = {
    title: '',
    description: '',
    price: '',
    category: '',
    subCategories: [],
    shipping: '',
    quantity: '',
    images: [],
    colors: ['BLACK', 'BROWN', 'SILVER', 'WHITE', 'BLUE'],
    brands: ['APPLE', 'SAMSUNG', 'MICROSOFT', 'LENOVO', 'ASUS'],
    color: '',
    brand: '',
}

const ProductUpdate = ({ history }) => {

    const [formValues, setFormValues] = useState(InitialState);
    const [loading, setLoading] = useState(false);
    const { user } = useSelector((state) => ({ ...state }));
    const [subOptions, setSubOptions] = useState([]);
    const { slug } = useParams();
    const [categories, setCategories] = useState([]);
    const [existingSubCategories, setExistingSubCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');


    useEffect(() => {
        loadProduct();
        getCategories();
    }, [])

    const getCategories = () => {
        listCategories().then(res => setCategories(res.data))
    }

    const loadProduct = () => {
        getProduct(slug).then((p) => {
            setFormValues({ ...formValues, ...p.data });
            console.log(p.data);
            getAllSubcategoryInCategory(p.data.category._id).then(res => {
                setSubOptions(res.data);
            })
            let arr = [];
            p.data.subCategories.map((sub) => {
                arr.push(sub._id)
            })
            setExistingSubCategories(arr);
        }).catch(err => console.log(err))
    }

    const handleChange = (e) => {
        setFormValues({ ...formValues, [e.target.name]: e.target.value });
    }

    const onCategorySelect = (e) => {
        e.preventDefault();
        setSelectedCategory(e.target.value);
        getAllSubcategoryInCategory(e.target.value).then(res => {
            setSubOptions(res.data);
        })
        if (formValues.category._id === e.target.value) {
            loadProduct();
        } else {
            setExistingSubCategories([])
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        formValues.category = selectedCategory ? selectedCategory : formValues.category;
        formValues.subCategories = existingSubCategories;
        console.log(formValues);
        updateProduct(slug, user.token, formValues).then(res => {
            setLoading(false);
            toast.success('Product updated successfully');
            history.push("/admin/products")
        }).catch(err => {
            setLoading(false);
            console.log(err);
            toast.error(err.message);
        })

    }

    return (
        <div className='container-fluid'>
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>
                <div className="col-md-10">
                    {!loading ? (<h4>Product update</h4>) : (<LoadingOutlined className="text-danger h1" />)}

                    <div className="p-3">
                        <FileUpload formValues={formValues} setFormValues={setFormValues} setLoading={setLoading} />
                    </div>
                    <ProductUpdateForm handleChange={handleChange} handleSubmit={handleSubmit} formValues={formValues}
                        onCategorySelect={onCategorySelect} categories={categories}
                        subOptions={subOptions} existingSubCategories={existingSubCategories}
                        setExistingSubCategories={setExistingSubCategories}
                        selectedCategory={selectedCategory}
                    />
                </div>
            </div>
        </div>
    )
}

export default ProductUpdate;