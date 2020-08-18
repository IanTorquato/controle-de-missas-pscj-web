import axios from 'axios'

const api = axios.create({ baseURL: 'https://api-node-missas-pscj.herokuapp.com' })

export default api