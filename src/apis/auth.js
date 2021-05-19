import axios from 'axios';


export const createOrUpdateUser = async (authToken) => {
    return await axios.post(process.env.REACT_APP_API + '/create-or-update-user', {}, {
        headers: {
            authToken
        }
    })
}

export const getCurrentUser = async (authToken) => {
    return await axios.post(process.env.REACT_APP_API + '/current-user', {}, {
        headers: {
            authToken
        }
    })
}

export const getAdminUser = async (authToken) => {
    return await axios.post(process.env.REACT_APP_API + '/admin-user', {}, {
        headers: {
            authToken
        }
    })
}