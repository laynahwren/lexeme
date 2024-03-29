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

export const updateLibrary = async (params) => {
    const response = await axios.put('/api/library', params)
    return response.data
}

export const updateCurrentRead = async (params) => {
    const response = await axios.put('/api/currentRead', params)
    return response.data
}

export const updateLexicon = async (params) => {
    const response = await axios.put('/api/lexicon', params)
    return response.data
}