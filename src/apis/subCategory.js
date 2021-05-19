import axios from 'axios';

export const listSubCategories = async () => await axios.get(process.env.REACT_APP_API + '/subCategories/')

export const listSubCategoriesInACategory = async (parentId) => await axios.get(process.env.REACT_APP_API + '/subCategories/' + parentId)

export const readSubCategory = async (slug) => await axios.get(process.env.REACT_APP_API + `/subCategory/${slug}`)


export const createSubCategory = async (authToken, payload) => await axios.post(process.env.REACT_APP_API + '/subCategory', payload, {
    headers: {
        authToken
    }
})

export const updateSubCategory = async (authToken, payload, slug) => await axios.put(process.env.REACT_APP_API + `/subCategory/${slug}`, payload, {
    headers: {
        authToken
    }
})

export const deleteSubCategory = async (authToken, slug) => await axios.delete(process.env.REACT_APP_API + `/subCategory/${slug}`, {
    headers: {
        authToken
    }
})


