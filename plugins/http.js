import axios from 'axios'
axios.defaults.withCredentials = true
// 測試資料
// const server = axios.create({
//     baseURL: "https://jsonplaceholder.typicode.com"
// })

//axios實例
console.log('1')
var service = axios.create({
    // baseURL: "https://jsonplaceholder.typicode.com",
    baseURL: "https://vue-course-api.hexschool.io/",
    // baseURL: process.env.BASE_URL,
    // baseURL:'http://127.0.0.1',
    timeout: 15000,
    credentials: 'same-origin',
    withCredentials : true,
    // headers: {
    //   'Access-Control-Allow-Origin': '*',
    //   'Access-Control-Allow-Credentials': true,
    //   'Access-Control-Allow-Headers': 'X-Requested-Width, Content-Type',
    //   'Content-Type': 'application/json;charset=utf-8',
    //   'Access-Control-Allow-Methods': 'PUT,POST,GET,DELETE,OPTIONS'
    // }
})

// // 請求失敗的統一處裡
// // @param {Number} status 請求失敗的狀態碼
// let _this = this
// const errorHandle = (status, msg) => {
//     console.log(status, msg)
//     switch (status) {
//         case 400: // 登入失敗, 帳密錯誤
//             break;
//         case 401: // 登入過期, 請重新登入
//             break;
//         case 403: // 權限不足
//             console.log('403')
//             break;
//         case 404: // 請求失敗
//             console.log('404')
//             // to404page()
//             break;
//         default:
//             console.log('res沒有攔截到錯誤: ' + msg)
//             break;
//     }
// }


// axios request攔截器
service.interceptors.request.use(
    config=>{
        // console.log(config)
        return config
    },
    error=>{
        // console.log(config)
        return Promise.reject(error)
    }
)

// // response攔截器
service.interceptors.response.use((res) => {
    // console.log(res)
    
        return res
    }, (error) => {
        const { res } = error
        if (res) {
            // 成功發處請求且收到res, 但有error
            errorHandle(res.status, res.data.error)
            return Promise.reject(error)
        } else {
          // 成功發出請求但沒收到res
            if (!window.navigator.onLine) {
                console.log('網路斷線: ' + window.navigator.onLine)
                // 網路斷線
                alert('網路斷線')
            }else {
                // 可能跨域, 或程式問題
                console.log('可能跨域, 或程式問題: ' + window.navigator.onLine)
                alert('可能跨域, 或程式上有問題')
                return Promise.reject(error)
            }
        }
    }
)




// let api_url = 'rockayumitw'
// // 封裝請求方法, 並使用export default導出函數
// export default function (method, url, data=null) {
//     console.log(url)
//     console.log(method)
//     method = method.toLowerCase()
//     if (method == 'post'){
//         return instance.post(url, data)
//     } else if (method == 'get') {
//         return instance.get(url, {params: data})
//     } else if (method == 'delete') {
//         return instance.get(url, {params: data})
//     } else if (method == 'put') {
//         return instance.get(url, data)
//     } else {
//         console.log('未知method: ' + method)
//         alert('未知method')
//         return false
//     }
// }

export default service;