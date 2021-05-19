import React from 'react'
import { Link } from 'react-router-dom';

const ProductDetailItem = ({ product }) => {

    const { price, category, subCategories, brand, color, shipping, quantity, sold } = product;

    return (
        <ul className="list-group">
            <li className="list-group-item">
                Price{" "}
                <span className="label label-default label-pill pull-xs-right"> $ {price}</span>
            </li>
            <li className="list-group-item">
                Category{" "}
                {
                    category
                    &&
                    <Link to={`/category/${category.slug}`} className="label label-default label-pill pull-xs-right">{category.name}</Link>
                }
            </li>

            {subCategories && subCategories.length &&
                <li className="list-group-item">
                    Sub Categories
                    {subCategories.map(sub => <Link key={sub._id} to={`/subcategory/${sub.slug}`} className="label label-default label-pill pull-xs-right">{sub.name}</Link>)}
                </li>
            }
            <li className="list-group-item">
                Shipping{" "}
                <span className="label label-default label-pill pull-xs-right">{shipping}</span>
            </li>
            <li className="list-group-item">
                Color{" "}
                <span className="label label-default label-pill pull-xs-right">{color}</span>
            </li>
            <li className="list-group-item">
                Brand{" "}
                <span className="label label-default label-pill pull-xs-right">{brand}</span>
            </li>
            <li className="list-group-item">
                Available{" "}
                <span className="label label-default label-pill pull-xs-right">{quantity}</span>
            </li>
            <li className="list-group-item">
                Sold{" "}
                <span className="label label-default label-pill pull-xs-right">{sold}</span>
            </li>
        </ul>
    )
}

export default ProductDetailItem;

