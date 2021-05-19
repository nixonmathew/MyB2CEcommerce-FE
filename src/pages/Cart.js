import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { userCart } from '../apis/user';
import ProductCardInCheckout from '../components/cards/ProductCardInCheckout';


const Cart = ({ history }) => {

    const dispatch = useDispatch();
    const { user, cart } = useSelector((state) => ({ ...state }))

    const showCartItems = () => {
        return (
            <table className="table table-bordered">
                <thead className="thead-light">
                    <tr>
                        <th scope="col">Image</th>
                        <th scope="col">Title</th>
                        <th scope="col">Price</th>
                        <th scope="col">Brand</th>
                        <th scope="col">Color</th>
                        <th scope="col">Count</th>
                        <th scope="col">Shipping</th>
                        <th scope="col">Remove</th>
                    </tr>
                </thead>
                {cart.map((p) => (
                    <ProductCardInCheckout key={p._id} p={p} />
                ))}
            </table>
        )
    }

    const getTotal = () => {
        return cart.reduce((current, next) => {
            return current + (next.price * next.count);
        }, 0)
    }

    const saveOrderToDB = (cod) => {
        if (cod === 'COD') {
            dispatch({
                type: 'COD_APPLIED',
                payload: true
            });
        }
        else {
            dispatch({
                type: 'COD_APPLIED',
                payload: false
            });
        }
        userCart(user.token, { cart }).then(res => {
            if (res.data.ok) history.push('/checkout')
        })
            .catch(err => console.log('cart save err ', err))
    }

    return (
        <div className="container-fluid pt-2">
            <div className="row">
                <div className="col-md-8">
                    <h4>Cart / {cart.length} Product</h4>
                    {!cart.length ? <p>No products in cart.<Link to="/shop">Continue Shopping</Link></p> : showCartItems()}
                </div>
                <div className="col-md-4">
                    <h4>Order Summary</h4>
                    <hr />
                    <p>Products</p>
                    {cart.map((c, i) => (
                        <div key={i}>
                            <p>{c.title} x {c.count} = {c.price * c.count}</p>
                        </div>
                    ))}
                    <hr />
                        Total : <b>&#8377; {getTotal()}</b>
                    <hr />
                    {user ? (
                        <>
                            <button onClick={() => saveOrderToDB('')} disabled={!cart.length}
                                className="btn btn-sm btn-primary mt-2">Proceed to Checkout</button>
                            <br />
                            <button onClick={() => saveOrderToDB('COD')} disabled={!cart.length}
                                className="btn btn-sm btn-warning mt-2">Pay Cash on delivery</button>
                        </>
                    ) : (
                        <button className="btn btn-sm btn-primary mt-2">
                            <Link to={{ pathname: '/login', state: { from: "cart" } }}>Login to Checkout</Link>
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}
export default Cart;
