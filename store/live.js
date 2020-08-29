import axios from 'axios'
// import { apiTestData } from '~/api/course.js'

export const state = () => ({
    videoListData:[           // 直播清單 -fackData...
        {
            id:'1',
            title: '1. 學習AE前應有的基本認識',
            teacher: '老師名稱',
            total: '301',
            timer: '1:02:31',
            data_status:'download',
            status: 'live', // live
        },
        {
            id:'2',
            title: '2. AE的基礎工具與操作',
            teacher: '老師名稱',
            total: '302',
            timer: '1:50:31',
            data_status:'none',
            status: 'play', // live
        },
        {
            id:'3',
            title: '2. AE的3D圖層與攝影機動態設定',
            teacher: '老師名稱',
            total: '302',
            timer: '1:50:31',
            data_status:'lock',
            status: 'trailer', // 預告
        },
    ],
    coursesDiscuessData:[{                  // 課程討論
        id:'01',
        authorName:'Emily',
        imageUrl:'https://placekitten.com/300/300',
        title:'想請問取縣的問題',
        timer:'1個月',
        content:'老師您好',
        commentTotal:'2',
        subCommentGroup:[
            {
            id:'001',
            authorName:'網師名稱',
            imageUrl:'https://placekitten.com/300/300',
            timer:'2020/06/26 11:37',
            content:'Fusce condimentum nunc ac nisi vulpu',
            },{
            id:'002',
            authorName:'網師名稱',
            imageUrl:'https://placekitten.com/300/300',
            timer:'2020/06/26 11:37',
            content:'Fusce condimentum nunc ac nisi vulpu',
            }
        ]},{
        id:'02',
        authorName:'Eric',
        imageUrl:'https://placekitten.com/300/300',
        title:'想請問取縣的問題',
        timer:'1個月',
        content:'老師您好',
        commentTotal:'2',
        subCommentGroup:[{
            id:'001',
            authorName:'網師名稱',
            imageUrl:'https://placekitten.com/300/300',
            timer:'2020/06/26 11:37',
            content:'Fusce condimentum nunc ac nisi vulpu',
        },{
            id:'002',
            authorName:'網師名稱',
            imageUrl:'https://placekitten.com/300/300',
            timer:'2020/06/26 11:37',
            content:'Fusce condimentum nunc ac nisi vulpu',
        }]
    }]
})

export const getters = {  // 取得變數, 取用state資料計算
  getVideoListData: state => () => state.videoListData,      // 取得直播清單                           // 設定登入地方
}

export const mutations = { // 這邊才是修改store資料狀態的地方
  SET_VIDEOLISTDATA (state, val) {
    state.videoListData = val
  },
}

export const actions = { // 提交的是mutation, 不是直接變更狀態
  setVideoListData(state, val) {
    state.commit("SET_VIDEOLISTDATA", val)
  },
}
