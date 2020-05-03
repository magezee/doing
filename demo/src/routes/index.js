import {
    DashBoard,
    Login,
    Notfound,
    Settings,
    ArticleList,
    ArticleEdit

} from '../views'
import {SettingOutlined, UnorderedListOutlined, DashboardOutlined} from '@ant-design/icons'

export const mainRouter = [
    {
        pathname: '/404',
        component: Notfound
    },{
        pathname: '/login',
        component: Login
}]

export const adminRouter =[{
    pathname: '/admin/dashBoard',
    component: DashBoard,
    title: '仪表盘',
    isNav: true,
    icon :DashboardOutlined
},{
    pathname: '/admin/article',
    component: ArticleList,
    title: '文章管理',
    isNav: true,
    icon :UnorderedListOutlined,
    exact: true     // 配置往下配置

},{
    pathname: '/admin/article/edit/:id',
    component: ArticleEdit,
    title: '文章',
    icon :SettingOutlined
    
},{
    pathname: '/admin/settings',
    component: Settings,
    title: '设置',
    icon :SettingOutlined,
    isNav: true
    
}]