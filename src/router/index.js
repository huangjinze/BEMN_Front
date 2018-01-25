import Vue from 'vue'
import Router from 'vue-router'
import vtfStaiscticPage from '@/page/Static/vtfStaiscticPage.vue'
import tifStaiscticPage from '@/page/Static/tifStaiscticPage.vue'
import HomePage from '@/page/HomePage'
import dataManager from '@/page/DataPage'
import vftList from '@/page/VftListPage'
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
import vtfStation from '@/page/Station/vtfStation.vue'
import tifStation from '@/page/Station/tifStation.vue'
import devicePage from '@/page/Device/devicePage'

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
      path: '/vft/list', // 水土保持领域数据展示 负责人陈宇捷
      name: 'vftlist',
      component: vftList
    },
    {
      path: '/vtf/Importpage', // 水保领域导入导出页面 负责人雷答
      name: 'vtfImportpage',
      component: ImportPage
    },
    {
      path: '/login',
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
      path: '/index',
      name: 'index',
      component: Index
    },
    {
      path: '/washing', // 数据清洗,负责人苏畅
      name: 'DataWashingPage',
      component: DataWashingPage
    },
    {
      path: '/users',
      name: 'users',
      component: UserPage
    },
    {
      path: '/roles',
      name: 'roles',
      component: RolesPage
    },
    {
      path: '/vtfstation',
      name: 'vtfstation',
      component: vtfStation
    },
    {
      path: '/tifstation',
      name: 'tifstation',
      component: tifStation
    },
    {
      path: '/deviceManage', //  设备管理页面，负责人雷答
      name: devicePage,
      component: devicePage
    }
  ]

})
