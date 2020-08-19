import axios from 'axios'

const api = axios.create({ baseURL: 'https://pscj-backend.herokuapp.com' })

export default api