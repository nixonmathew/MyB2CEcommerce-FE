
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { DeleteOutlined } from '@ant-design/icons'
import UserNav from '../../components/nav/UserNav';
import { getUserWishlist, removeUserWishlist } from '../../apis/user';
import { Link } from 'react-router-dom';


const Wishlist = () => {

    const [wishlist, setWishlist] = useState([]);
    const { user } = useSelector((state) => ({ ...state }))
    const dispatch = useDispatch();

    useEffect(() => {
        loadWishlist();
    }, [])

    const loadWishlist = () => {
        getUserWishlist(user.token).then(res => {
            console.log(res);
            setWishlist(res.data.wishlist);
        })
    }

    const handleRemove = productId => removeUserWishlist(user.token, productId).then(res => {
        loadWishlist();
    })

    return (
        <div className="container-fluid" >
            <div className="row">
                <div className="col-md-2">
                    <UserNav />
                </div>
                <div className="col">
                    <h4>Wishlist</h4>
                    {wishlist && wishlist.map((p) => {
                        return (
                            <div key={p._id} className="alert alert-secondary">
                                <Link to={`/product/${p.slug}`}>{p.title}</Link>
                                <span className="btn btn-sm float-right" onClick={() => handleRemove(p._id)}>
                                    <DeleteOutlined className='text-danger' />
                                </span>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div >
    )
}

export default Wishlist