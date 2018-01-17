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

Vue.use(Router)

export default new Router({
  routes: [
    // 首页，负责人：雷答
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
      path: '/dataManager',
      name: 'dataManager',
      component: dataManager
    },
    {
      path: '/vtf/list',
      name: 'vtflist',
      component: vtfList
    },
    // 水保领域_导入导出页面，负责人：雷答
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
      path: '/article',
      name: 'article',
      component: Article
    },
    // 森林领域_卡片显示统计值的页面，负责人：雷答
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
    // 水保领域_选择标签显示表格的页面，负责人：雷答
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
    }
  ]

})
