import axios from 'axios'

export const login = async (creds) => {
    const response = await axios.post('/auth/login', creds)
    .catch((err) => {return err})
    return response.data
}

export const signup = async (params) => {
    const response =  await axios.post('/auth/signup', params)
    .catch((err) => { return err})
    return response.data
}

export const checkLoggedIn = async () => {
    const response = await axios.get('/auth/logged-in')
    return response.data
}

export const logout = async () => {
    const response = await axios.post('/auth/logout')
    .catch((err) => {return err})
    return response.data
}