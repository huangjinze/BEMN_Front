import Vue from 'vue'
import Router from 'vue-router'
import vtfStaiscticPage from '@/page/Static/vtfStaiscticPage.vue'
import tifStaiscticPage from '@/page/Static/tifStaiscticPage.vue'
import HomePage from '@/page/HomePage'
import dataManager from '@/page/DataPage'
import vtfList from '@/page/VtfListPage'
import LoginPage from '@/page/User/LoginPage'
import Article from '@/page/News/ArticlePage'
import tifForestAreaAllPage from '@/page/Static/tifForestAreaAllPage.vue'
import forestDominPage from '@/page/Static/forestDominPage.vue'
import ImportPage from '@/page/ImportPage.vue'
import vftDataShowPage from '@/page/Static/vftDataShowPage.vue'
import Index from '@/page/Index.vue'
import DataWashingPage from '@/page/Washing/DataWashingPage.vue'
import UserPage from '@/page/user/UserPage.vue'
import RolesPage from '@/page/user/RolesPage.vue'
import vtfStation from '@/page/Station/vtfStation.vue'
import tifStation from '@/page/Station/tifStation.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
    },
    {
      path: '/vtf/staisctic',
      name: 'vtfstaisctic',
      component: vtfStaiscticPage
    },
    {
      path: '/tif/staisctic',
      name: 'tifstaisctic',
      component: tifStaiscticPage
    },
    {
      path: '/dataManager', // 森林领域样地信息 负责人陈宇捷
      name: 'dataManager',
      component: dataManager
    },
    {
      path: '/vtf/list', // 水土保持领域数据展示 负责人陈宇捷
      name: 'vtflist',
      component: vtfList
    },
    {
      path: '/vtf/Importpage',
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
      path: '/tif/forestAreaAll',
      name: 'forestAreaAll',
      component: tifForestAreaAllPage
    },
    {
      path: '/tif/water',
      name: 'water',
      component: forestDominPage
    },
    {
      path: '/vft/dataShow',
      name: 'dataShow',
      component: vftDataShowPage
    },
    {
      path: '/index',
      name: 'index',
      component: Index
    },
    {
      path: '/washing',
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
    }
  ]

})
