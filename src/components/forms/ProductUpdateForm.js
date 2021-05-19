import React from 'react';
import { Select } from 'antd';

const { Option } = Select;

const ProductUpdateForm = ({
    formValues, handleChange, handleSubmit, onCategorySelect,
    subOptions, categories, existingSubCategories, setExistingSubCategories, selectedCategory
}) => {
    const { title,
        description,
        price,
        category, subCategories,
        shipping, quantity,
        images,
        colors, brands,
        color, brand } = formValues;
    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Title</label>
                <input type="text" name="title" className="form-control" value={title} onChange={handleChange} />
            </div>
            <div className="form-group">
                <label>Description</label>
                <input type="text" name="description" className="form-control"
                    value={description}
                    onChange={handleChange} />
            </div>
            <div className="form-group">
                <label>Price</label>
                <input type="number" name="price" className="form-control"
                    value={price}
                    onChange={handleChange} />
            </div>
            <div className="form-group">
                <label>Shipping</label>
                <select name="shipping" value={shipping} className="form-control" onChange={handleChange}>
                    <option >Please select </option>
                    <option value="NO">NO</option>
                    <option value="YES">YES</option>
                </select>
            </div>
            <div className="form-group">
                <label>Quantity</label>
                <input type="number" name="quantity" className="form-control"
                    value={quantity}
                    onChange={handleChange} />
            </div>
            <div className="form-group">
                <label>Color</label>
                <select name="color" value={color} className="form-control" onChange={handleChange}>
                    <option >Please select </option>
                    {colors.map(color => (
                        <option key={color} value={color}>{color}</option>
                    ))}
                </select>
            </div>
            <div className="form-group">
                <label>Brand</label>
                <select name="brand" value={brand} className="form-control" onChange={handleChange}>
                    <option >Please select </option>
                    {brands.map(brand => (
                        <option key={brand} value={brand}>{brand}</option>
                    ))}
                </select>
            </div>
            <div className="form-group">
                <label>Category</label>
                <select name="category" onChange={onCategorySelect}
                    value={selectedCategory ? selectedCategory : category._id} className="form-control">
                    {categories.length && categories.map(category => (
                        <option key={category._id} value={category._id}>{category.name}</option>
                    ))}
                </select>
            </div>
            <div className="form-group">
                <label>Sub Categories</label>
                <Select name="subCategory"
                    mode="multiple"
                    style={{ width: '100%' }}
                    value={existingSubCategories}
                    onChange={(value) => setExistingSubCategories(value)}
                    className="form-control">
                    {subOptions && subOptions.length && subOptions.map(sub => (
                        <Option key={sub._id} value={sub._id}>{sub.name}</Option>
                    ))}
                </Select>
            </div>
            <button className="btn btn-outline-info">Save</button>
        </form>
    )
}

export default ProductUpdateForm;