import req from '../plugins/http.js'

let api_url = 'rockayumitw'

export const apiTestData = params => req.get(`api/${api_url}/admin/products?page=1`)



// export const apiTestData = () => req.get('/users/')

//const apiTestData = params => req.post(`/users/${param}`)

// export const signin = param => req.post(`/signin/${param}`)

// export const getProductsAdmin = () => req.get('/users/')

// export const apiTestData = () => req('get', '/users')
// export const apiUserLogin = params => req('post', '/WebLogin/Login', params)

