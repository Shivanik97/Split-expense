import axios from 'axios'
import { getAccessToken } from '../config/config'

const baseURL = 'https://bill-buddy-dev.onrender.com/api'

const axiosInstance = axios.create({
  baseURL,
  headers: {
    'Content-type': 'application/json'
  },
})
axiosInstance.interceptors.request.use(
  async (config) => {
    const accessToken = await getAccessToken()
    config.headers.Authorization = `Bearer ${accessToken}`
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default axiosInstance;