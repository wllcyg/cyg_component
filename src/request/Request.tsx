import axios from "axios";

const service = axios.create({
  baseURL:'http://localhost:8081',
  timeout:5000
})

service.interceptors.request.use(
  config => {
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    if (response.data.code === 200){
      return response.data.data
    }
  },
  error => {
    return Promise.reject(error)
  }
)

export default service
