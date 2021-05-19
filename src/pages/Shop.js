import React, { useEffect, useState } from 'react'
import { fetchProductsWithFilter, listProductsByCount } from '../apis/product';
import ProductCard from '../components/cards/ProductCard';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Menu, Radio, Slider } from 'antd';
import { listCategories } from '../apis/category';
import { DownSquareOutlined, StarOutlined } from '@ant-design/icons';
import Checkbox from 'antd/lib/checkbox/Checkbox';
import StarNav from '../components/forms/StarsNav';
import { listSubCategories } from '../apis/subCategory';

const { SubMenu, ItemGroup } = Menu;

const Shop = () => {

    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [subCategory, setSubCategory] = useState('');
    const [checkedCategories, setCheckedCategories] = useState([]);
    const [products, setProducts] = useState([])
    const [price, setPrice] = useState([0, 0]);
    const [ok, setOk] = useState(false);
    const [star, setStar] = useState("");
    const [brands, setBrands] = useState([
        'APPLE', 'SAMSUNG', 'MICROSOFT', 'LENOVO', 'ASUS'
    ])
    const [colors, setColors] = useState([
        'BLACK', 'BROWN', 'SILVER', 'WHITE', 'BLUE'
    ])
    const [brand, setBrand] = useState('');
    const [color, setColor] = useState('');
    const [shipping, setShipping] = useState('');

    const { search } = useSelector((state) => ({ ...state }))
    const { searchText } = search;
    const dispatch = useDispatch();

    useEffect(() => {
        loadAllProducts();
        listCategories().then(res => setCategories(res.data))
        listSubCategories().then(res => setSubCategories(res.data))
    }, [])

    const loadAllProducts = () => {
        setLoading(true);
        listProductsByCount(12).then(({ data }) => {
            setProducts(data);
            setLoading(false);
        }).catch(err => {
            setLoading(false);
            toast.error(err.message)
        })
    }

    useEffect(() => {
        if (searchText.length == 0) {
            loadAllProducts();
            return;
        }
        // RESET
        setPrice([0, 0])
        setCheckedCategories([])
        setStar('');
        setSubCategory('');
        setBrand('');
        setColor('');
        setShipping('');
        const delayed = setTimeout(() => {
            fetchProducts({ searchText });
        }, 400)
        return () => clearTimeout(delayed);
    }, [searchText])

    const fetchProducts = (arg) => {
        setLoading(true);
        fetchProductsWithFilter(arg).then(({ data }) => {
            setProducts(data);
            setLoading(false);
        }).catch(err => {
            setLoading(false);
            toast.error(err.message)
        })
    }

    useEffect(() => {
        fetchProducts({ price })
    }, [ok])

    const handleSlider = (value) => {
        // RESET
        dispatch({
            type: 'SEARCH_QUERY',
            payload: { searchText: "" }
        })
        setCheckedCategories([]);
        setPrice(value)
        setStar('');
        setBrand('');
        setColor('');
        setShipping('');
        setTimeout(() => {
            setOk(!ok)
        }, 300)
    }

    const handleCheck = (e) => {
        // RESET
        dispatch({
            type: 'SEARCH_QUERY',
            payload: { searchText: "" }
        })
        setPrice([0, 0])
        setStar('');
        setSubCategory('');
        setBrand('');
        setColor('');
        setShipping('');
        let index = checkedCategories.indexOf(e.target.value);
        let newSelectedList = [...checkedCategories];
        if (index > -1) {
            newSelectedList.splice(index, 1);
        }
        else {
            newSelectedList.push(e.target.value);
        }
        console.log(newSelectedList)
        setCheckedCategories(newSelectedList);
        fetchProducts({ category: newSelectedList })
    }

    const handleStarClick = (num) => {
        dispatch({
            type: 'SEARCH_QUERY',
            payload: { searchText: "" }
        })
        setPrice([0, 0])
        setCheckedCategories([])
        setStar(num);
        setBrand('');
        setSubCategory('');
        setColor('');
        setShipping('');
        fetchProducts({ stars: num })
    }

    const showStars = () => (
        <div className="pr-4 pl-4 pb-2">
            <StarNav starClick={handleStarClick} numberOfStars={5} />
            <StarNav starClick={handleStarClick} numberOfStars={4} />
            <StarNav starClick={handleStarClick} numberOfStars={3} />
            <StarNav starClick={handleStarClick} numberOfStars={2} />
            <StarNav starClick={handleStarClick} numberOfStars={1} />
        </div>
    )

    const handleSubCategories = (subCategory) => {
        console.log(subCategory)
        setSubCategory(subCategory);
        dispatch({
            type: 'SEARCH_QUERY',
            payload: { searchText: "" }
        })
        setPrice([0, 0])
        setCheckedCategories([])
        setBrand('');
        setColor('');
        setShipping('');
        setStar('');
        fetchProducts({ subCategories: subCategory })

    }

    const showSubCategories = () => (
        subCategories && subCategories.map((s) => (
            <div key={s._id} className="p-1 m-1 badge badge-secondary" style={{ cursor: 'pointer' }} onClick={() => handleSubCategories(s)}>
                {s.name}
            </div>
        ))
    )

    const showBrands = () => (
        brands.map((b) => (
            <div key={b} >
                <Radio className="p-1" onChange={handleBrand} value={b} checked={b == brand}>{b}</Radio><br />
            </div>
        ))
    )
    const handleBrand = (e) => {
        dispatch({
            type: 'SEARCH_QUERY',
            payload: { searchText: "" }
        })
        setPrice([0, 0])
        setCheckedCategories([])
        setSubCategory('');
        setStar('');
        setColor('');
        setShipping('');
        setBrand(e.target.value);
        fetchProducts({ brand: e.target.value })
    }

    const handleColor = (e) => {
        dispatch({
            type: 'SEARCH_QUERY',
            payload: { searchText: "" }
        })
        setPrice([0, 0])
        setCheckedCategories([])
        setSubCategory('');
        setStar('');
        setBrand('');
        setColor(e.target.value);
        setShipping('');
        fetchProducts({ color: e.target.value })
    }
    const showColors = () => (
        colors.map((c) => (
            <div key={c}>
                <Radio className="p-1" onChange={handleColor} value={c} checked={c == color}>{c}</Radio><br />
            </div>
        ))
    )
    const handleShippingChange = (e) => {
        dispatch({
            type: 'SEARCH_QUERY',
            payload: { searchText: "" }
        })
        setPrice([0, 0])
        setCheckedCategories([])
        setSubCategory('');
        setStar('');
        setBrand('');
        setColor('');
        setShipping(e.target.value);
        fetchProducts({ shipping: e.target.value })
    }

    const showShipping = () => (
        <>
            <Checkbox
                className="pb-2 pl-4 pr-2"
                onChange={handleShippingChange}
                value="YES"
                checked={shipping == "YES"}
            />Yes
            <Checkbox
                className="pb-2 pl-4 pr-4"
                onChange={handleShippingChange}
                value="NO"
                checked={shipping == "NO"}
            />NO
        </>
    )

    return (
        <div className="container-fluid">
            <div className="row">

                <div className="col-md-3 pt-2">
                    <h4>Search/Filter</h4>
                    <hr />
                    <Menu defaultOpenKeys={['3']} mode="inline">
                        <SubMenu key="1"
                            title={<span className="h6">&#x20B9; Price</span>}>
                            <div>
                                <Slider className="ml-4 mr-4" range tipFormatter={(v) => `${v}`}
                                    value={price} onChange={handleSlider}
                                    max="500000"
                                ></Slider>
                            </div>
                        </SubMenu>
                        <SubMenu key="2"
                            title={<span className="h6"><DownSquareOutlined />Category</span>}>
                            {categories.map((category) => (
                                <div key={category._id} className="">
                                    <Checkbox name="category" className="pl-4 pr-4 pb-2"
                                        value={category._id} onChange={handleCheck}
                                        checked={checkedCategories.includes(category._id)}
                                    >{category.name}</Checkbox>
                                </div>
                            ))}
                        </SubMenu>
                        <SubMenu key="3"
                            title={<span className="h6"><StarOutlined />Rating</span>}>
                            <div>
                                {showStars()}
                            </div>
                        </SubMenu>
                        <SubMenu key="4"
                            title={<span className="h6"><DownSquareOutlined />Sub Categories</span>}>
                            <div className="pl-4">
                                {showSubCategories()}
                            </div>
                        </SubMenu>
                        <SubMenu key="5"
                            title={<span className="h6"><DownSquareOutlined />Brands</span>}>
                            <div className="pl-4">
                                {showBrands()}
                            </div>
                        </SubMenu>
                        <SubMenu key="6"
                            title={<span className="h6"><DownSquareOutlined />Colors</span>}>
                            <div className="pl-4">
                                {showColors()}
                            </div>
                        </SubMenu>
                        <SubMenu key="7"
                            title={<span className="h6"><DownSquareOutlined />Shipping</span>}>
                            <div className="pl-4">
                                {showShipping()}
                            </div>
                        </SubMenu>
                    </Menu>

                </div>

                <div className="col-md-9 pt-2">
                    {loading ? (<h4 className="text-danger">Loading...</h4>) :
                        (<h4 className="text-danger">Products</h4>)}
                    {!products.length && (<p>No products found </p>)}

                    <div className="row pb-5">
                        {products.map((product) => (
                            <div key={product._id} className="col-md-4 mt-3" >
                                <ProductCard product={product} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Shop;