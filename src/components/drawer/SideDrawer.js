import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Drawer } from 'antd'
import { Link } from 'react-router-dom';

const SideDrawer = () => {

    const dispatch = useDispatch();
    const { cart, drawer } = useSelector((state) => ({ ...state }));

    const imageStyle = {
        width: '100%',
        height: '50px',
        objectFit: 'cover'
    }

    const handleClose = () => {
        dispatch({
            type: 'SET_DRAWER_VISIBILITY',
            payload: false
        })
    }

    return (
        <Drawer
            className="text-center" title={`Cart /${cart.length} Product`}
            visible={drawer} onClose={handleClose}
        >
            {cart.map((p) => (
                <div key={p._id} className="row">
                    <div className="col">
                        <img src={p.images[0].url} style={imageStyle} />
                        <p className="text-center bg-secondary text-light">{p.title} x {p.count}</p>
                    </div>
                </div>
            ))}
            <Link to="/cart" >
                <button onClick={() =>
                    dispatch({
                        type: "SET_DRAWER_VISIBILITY",
                        payload: false
                    })
                } className="text-center btn btn-primary btn-raised btn-block">
                    Go To Cart
                </button>
            </Link>
        </Drawer>
    )

}

export default SideDrawer;