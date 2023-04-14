import axios from 'axios'

export const login = async (creds) => {
    const response = await axios.post('/auth/login', creds)
    .catch((err) => {return err})
    return response.data
}