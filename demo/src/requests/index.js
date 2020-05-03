import axios from 'axios'
import { message } from 'antd';
const isDev = process.env.NODE_ENV === 'development'    // webpack自动生成的process.env.NODE_ENV
// 在node中，有全局变量process表示的是当前的node进程，process.env包含着关于系统环境的信息，但是process.env中并不存在NODE_ENV这个东西，NODE_ENV是用户一个自定义的变量，在webpack中它的用途是判断生产环境或开发环境的依据的

const service = axios.create({
    baseURL: isDev ? 'http://rap2.taobao.org:38080/app/mock/252971' : ''
})

// 请求拦截器
service.interceptors.request.use((config) => {

    config.data = Object.assign({},config.data, {
        // 需要添加的请求参数
        authToken: "请求过去的必选参数"          
    })
    return config
})

// 响应拦截器
service.interceptors.response.use((resp) => {
    if (resp.data.code === 200) {
        return resp.data.data
    } else {
        // 全局处理错误
        message.error(resp.data.errMsg)
    }
})

export const getArticles = (offset = 0, limited = 10) => {
    return service.post('/api/v1/articleList',{
        offset,
        limited
    })
}