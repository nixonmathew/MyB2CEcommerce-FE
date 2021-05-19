import React, { useState } from 'react'
import { Badge, Menu } from 'antd';
import { AppstoreAddOutlined, LogoutOutlined, SettingOutlined, ShoppingCartOutlined, ShoppingOutlined, UserAddOutlined, UserOutlined } from '@ant-design/icons';
import { Link, useHistory } from 'react-router-dom';
import firebase from 'firebase';
import { useDispatch, useSelector } from 'react-redux';
import SearchForm from '../forms/SearchForm';

const { SubMenu, Item } = Menu;

const Header = () => {

    const [current, setCurrent] = useState('home');
    const dispatch = useDispatch();
    const { user, cart } = useSelector((state) => ({ ...state }))
    const history = useHistory();

    const handleClick = (e) => {
        setCurrent(e.key)
    }

    const logout = () => {
        firebase.auth().signOut();
        dispatch({
            type: 'LOGOUT',
            payload: null
        })
        history.push('/login')
    }

    return (
        <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
            <Item key="home" icon={<AppstoreAddOutlined />}>
                <Link to="/">Home</Link>
            </Item>

            <Item key="shop" icon={<ShoppingOutlined />}>
                <Link to="/shop">Shop</Link>
            </Item>

            <Item key="cart" icon={<ShoppingCartOutlined />}>
                <Link to="/cart">
                    <Badge count={cart.length} offset={[9, 0]}>
                        Cart
                    </Badge>
                </Link>
            </Item>

            {
                !user &&
                <Item key="register" icon={<UserAddOutlined />} className="float-right">
                    <Link to="/register">Register</Link>
                </Item>
            }

            {
                !user &&
                <Item key="login" icon={<UserOutlined />} className="float-right">
                    <Link to="/login">Login</Link>
                </Item>
            }
            {
                user &&
                <SubMenu icon={<SettingOutlined />} title={user.email && user.email.split('@')[0]} className="float-right">
                    {user && user.role === 'SUBSCRIBER' &&
                        <Item><Link to="/user/history">Dashboard</Link></Item>
                    }
                    {user && user.role === 'ADMIN' &&
                        <Item><Link to="/admin/dashboard">Dashboard</Link></Item>
                    }
                    <Item icon={<LogoutOutlined />} onClick={logout}>Logout</Item>
                </SubMenu>
            }
            <span className="float-right p-1" >
                <SearchForm />
            </span>
        </Menu>
    )
}

export default Header;