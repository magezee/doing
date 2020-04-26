import Loadable from 'react-loadable'
import {Loading} from '../components'
//import Loadable from './Loader'

// 使用react-loadable进行懒加载

const loaderFun = (loader, loading = Loading) => {
    return Loadable({
        loader,
        loading
    })
}

const DashBoard = loaderFun(() =>import('./DashBoard'))
const ArticleList = loaderFun(() =>import('./Article'))
const ArticleEdit = loaderFun(() =>import('./Article/Edit'))
const Login = loaderFun(() =>import('./Login'))
const Notfound = loaderFun(() =>import('./Notfound'))
const Settings = loaderFun(() =>import('./Settings'))


export {
    ArticleList,
    ArticleEdit,
    DashBoard,
    Login,
    Notfound,
    Settings
}