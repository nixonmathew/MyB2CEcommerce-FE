import axios from 'axios';

export const listCategories = async () => await axios.get(process.env.REACT_APP_API + '/categories')


export const readCategory = async (slug) => await axios.get(process.env.REACT_APP_API + `/category/${slug}`)


export const createCategory = async (authToken, payload) => await axios.post(process.env.REACT_APP_API + '/category', payload, {
    headers: {
        authToken
    }
})

export const updateCategory = async (authToken, payload, slug) => await axios.put(process.env.REACT_APP_API + `/category/${slug}`, payload, {
    headers: {
        authToken
    }
})

export const deleteCategory = async (authToken, slug) => await axios.delete(process.env.REACT_APP_API + `/category/${slug}`, {
    headers: {
        authToken
    }
})

export const getAllSubcategoryInCategory = async (_id) => await axios.get(process.env.REACT_APP_API + '/category/subs/' + _id)
