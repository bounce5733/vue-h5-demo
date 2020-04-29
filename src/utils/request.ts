import axios from 'axios'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  timeout: 5000
})

service.interceptors.response.use(
  (response) => {
    const res = response.data
    if (res.code !== 0) {
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return response.data
    }
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default service