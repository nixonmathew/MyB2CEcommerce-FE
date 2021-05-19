import axios from 'axios';

export const createProduct = async (authToken, product) => await axios.post(process.env.REACT_APP_API + '/product', product, {
    headers: {
        authToken
    }
})

export const listProductsByCount = async (count) => await axios.get(process.env.REACT_APP_API + '/products/' + count)

export const removeProduct = async (authToken, slug) => await axios.delete(process.env.REACT_APP_API + '/product/' + slug, {
    headers: {
        authToken
    }
})

export const getProduct = async (slug) => await axios.get(process.env.REACT_APP_API + '/product/' + slug)

export const updateProduct = async (slug, authToken, product) => await axios.put(process.env.REACT_APP_API + '/product/' + slug, product, {
    headers: {
        authToken
    }
})

export const getFilteredProducts = async (sort, order, page) => await axios.post(process.env.REACT_APP_API + '/products', { sort, order, page })

export const getProductsCount = async () => await axios.get(process.env.REACT_APP_API + '/products/total')

export const productRating = async (productId, authToken, rating) => await axios.put(process.env.REACT_APP_API + '/product/star/' + productId, { rating }, {
    headers: {
        authToken
    }
})

export const getRelatedProducts = async (productId) => await axios.get(process.env.REACT_APP_API + `/product/related/${productId}`)

export const fetchProductsWithFilter = async (filters) => await axios.post(process.env.REACT_APP_API + '/search/filters', filters)
