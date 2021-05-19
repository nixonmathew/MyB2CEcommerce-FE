import { SearchOutlined } from '@ant-design/icons';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router';

const SearchForm = () => {

    const dispatch = useDispatch();
    const { search } = useSelector((state) => ({ ...state }))
    const { searchText } = search;

    const history = useHistory();

    useEffect(() => {

    })

    const handleChange = (e) => {
        dispatch({
            type: 'SEARCH_QUERY',
            payload: { searchText: e.target.value }
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        history.push(`/shop?${searchText}`)
    }

    return (
        <form className="form-inline my-2 my-lg-0" onSubmit={handleSubmit}>
            <input type="search" value={searchText} onChange={handleChange}
                className="form-control mr-sm-2" placeholder="Search" />
            <SearchOutlined onClick={handleSubmit} style={{ cursor: 'pointer' }} />
        </form>
    )
}

export default SearchForm;