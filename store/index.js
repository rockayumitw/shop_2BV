// import server from '../apis/http.js'
// import { apiTestData } from "../apis/course";
import axios from 'axios'
import { apiTestData,signin } from '~/api/path.js'

export const state = () => ({
  isLogin: false,       // 登入狀態
  userInfo:{},
  userToken:'',
  testData: []
})

export const getters = {  // 這邊相當於computed
  // getTestData: state=> () => state.testData,
  getUserInfo: state=> () => state.userInfo,
  getUserToken: state=> () => state.userToken
}

export const mutations = { // 這邊才是修改store資料狀態的地方
  ////// 2020 0829 ---
  SET_USERINFO (state, data){
    console.log(data)
    state.userInfo = data
  },
  SET_USERTOKEN (state, data){
    console.log(data)
    state.userToken = data
  }
}

export const actions = { // 提交的是mutation, 不是直接變更狀態
  //////// 測試api
  // nuxtServerInit(vuexContext, context){
  //   return axios.get('https://jsonplaceholder.typicode.com/users').then( res =>{
  //     console.log(res.data)
  //     const fackData =[]
  //     for(const key in res.data){
  //       fackData.push({...res.data[key], id:key})
  //     }
  //     console.log(fackData)
  //     vuexContext.commit('SET_TESTDATA', fackData)
  //   }).catch( e => context.error(e))
  // },
  async getTestData({ commit }){  // 測試取得資料
    const res = await apiTestData().then(res => res.data).catch(err => console.error(err));
    commit('SET_TESTDATA',res)
  },
  async signin({commit,params}){
    console.log(params)
    // const res = await signin()
    // .then(res => res.data)
    // .cathc(err=> console.error(err))
  }
}
