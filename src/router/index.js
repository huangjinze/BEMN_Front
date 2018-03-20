import Vue from 'vue'
import Router from 'vue-router'
import vtfStaiscticPage from '@/page/Static/vtfStaiscticPage.vue'
import tifStaiscticPage from '@/page/Static/tifStaiscticPage.vue'
import HomePage from '@/page/HomePage'
import dataManager from '@/page/DataPage'
import vtfList from '@/page/VftListPage'
import LoginPage from '@/page/User/LoginPage'
import Article from '@/page/News/ArticlePage'
import tifForestAreaAllPage from '@/page/Static/tifForestAreaAllPage.vue'
import forestDominPage from '@/page/Static/forestDominPage.vue'
import ImportPage from '@/page/ImportPage.vue'
import vftDataShowPage from '@/page/Static/vftDataShowPage.vue'
import Index from '@/page/Index.vue'
import DataWashingPage from '@/page/Washing/DataWashingPage.vue'
import UserPage from '@/page/User/UserPage.vue'
import RolesPage from '@/page/User/RolesPage.vue'
import ResetPassword from '@/page/User/ResetPassword.vue'
import PersonalInfo from '@/page/User/PersonalInfo.vue'
import vtfStation from '@/page/Station/vtfStation.vue'
import tifStation from '@/page/Station/tifStation.vue'
import OneChartPage from '@/page/Static/OneChartPage.vue'
import devicePage from '@/page/Device/devicePage'
import vtfShowStaiscticPage from '@/page/Static/vtfShowStaiscticPage.vue'
import vtfShowPaper from '@/page/Static/vtfShowPaper.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/', // 领域计数展示功能，负责人雷答
      name: 'home',
      component: HomePage
    },
    {
      path: '/vtf/staisctic', // 水土保持领域图表,负责人苏畅
      name: 'vtfstaisctic',
      component: vtfStaiscticPage
    },
    {
      path: '/tif/staisctic', // 森林领域图表,负责人苏畅
      name: 'tifstaisctic',
      component: tifStaiscticPage
    },
    {
      path: '/dataManager', // 森林领域样地信息 负责人陈宇捷
      name: 'dataManager',
      component: dataManager
    },
    {
      path: '/vtf/list', // 通量数据数据展示 负责人陈宇捷
      name: 'vtflist',
      component: vtfList
    },
    {
      path: '/vtf/Importpage', // 水保领域导入导出页面 负责人雷答
      name: 'vtfImportpage',
      component: ImportPage
    },
    {
      path: '/login', //  登录界面-陆旻祎
      name: 'login',
      component: LoginPage
    },
    {
      path: '/article', // 后台新闻管理页面 负责人陈宇捷
      name: 'article',
      component: Article
    },
    {
      path: '/tif/forestAreaAll', // 森林领域计数展示页面 负责人雷答
      name: 'forestAreaAll',
      component: tifForestAreaAllPage
    },
    {
      path: '/tif/water',
      name: 'water',
      component: forestDominPage
    },
    {
      path: '/vft/dataShow', //  水保领域数据表格展示页面 负责人雷答
      name: 'dataShow',
      component: vftDataShowPage
    },
    {
      path: '/index', //  首页-陆旻祎
      name: 'index',
      component: Index
    },
    {
      path: '/washing',
      name: 'DataWashingPage',
      component: DataWashingPage
    },
    {
      path: '/users', //  用户管理界面-陆旻祎
      name: 'users',
      component: UserPage
    },
    {
      path: '/roles', //  角色管理界面-陆旻祎
      name: 'roles',
      component: RolesPage
    },
    {
      path: '/vtfstation',  //  vtf站点信息-陆旻祎
      name: 'vtfstation',
      component: vtfStation
    },
    {
      path: '/tifstation',  //  tif站点信息-陆旻祎
      name: 'tifstation',
      component: tifStation
    },
    {
      path: '/deviceManage', //  设备管理页面，负责人雷答
      name: devicePage,
      component: devicePage
    },
    {
      path: '/personalinfo',  //  个人信息及修改-陆旻祎
      name: 'personalinfo',
      component: PersonalInfo
    },
    {
      path: '/resetpassword',  //  修改密码-陆旻祎
      name: 'resetpassword',
      component: ResetPassword
    },
    {
      path: '/one_chart_page',
      name: 'OneChartPage',
      component: OneChartPage
    },
    {
      path: '/vtf/ShowStaiscticPage',
      name: 'vtfShowStaiscticPage',
      component: vtfShowStaiscticPage
    },
    {
      path: '/vtf/ShowPaper',
      name: 'vtfShowPaper',
      component: vtfShowPaper
    }
  ]

})
