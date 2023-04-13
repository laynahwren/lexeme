import axios from 'axios'

export const login = (creds) => {
    axios.post('/auth/login', { ...creds })
        .then(function (response) {
            return response.data
        })
}