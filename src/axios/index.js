import axios from 'axios'

const API_URL = 'http://localhost:3000/api'

const securedHttp = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
})

const plainHttp = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
})

securedHttp.interceptors.request.use(config => {
  const method = config.method.toUpperCase()
  if (method !== 'OPTIONS') {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${localStorage.token}`,
    }
  }
  return config
})

securedHttp.interceptors.response.use(null, error => {
  // If 401 by expired access cookie, we do a refresh request
  if (error.response && error.response.config && error.response.status === 401) {
    const config =  { 
      headers: { 
        Authorization: `Bearer ${localStorage.token}`, 
      } 
    }

    return plainHttp.post('/refresh', {}, config)
      .then(response => {
        localStorage.token = response.data.token
        localStorage.signedIn = true

        // After another successfull refresh - repeat original request
        let retryConfig = error.response.config
        retryConfig.headers['Authorization'] = `Bearer ${localStorage.token}`

        return plainHttp.request(retryConfig)
      }).catch(error => {
        delete localStorage.token
        delete localStorage.signedIn
        location.replace('/')
        return Promise.reject(error)
      })
  } else {
    return Promise.reject(error)
  }
})

export { securedHttp, plainHttp }
