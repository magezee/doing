import {
    DashBoard,
    Login,
    Notfound,
    Settings,
    ArticleList,
    ArticleEdit

} from '../views'

export const mainRouter = [{
    pathname: '/Login',
    component: Login
},{
    pathname: '/404',
    component: Notfound
}]

export const adminRouter =[{
    pathname: '/admin/dashBoard',
    component: DashBoard
},{
    pathname: '/admin/settings',
    component: Settings
},{
    pathname: '/admin/article',
    component: ArticleList,
    exact: true     // 配置往下配置
},{
    pathname: '/admin/article/edit/:id',
    component: ArticleEdit
}]