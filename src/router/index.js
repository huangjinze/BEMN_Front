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
      name: 'staisctic',
      component: vtfStaiscticPage
    },
    {
      path: '/tif/staisctic',
      name: 'staisctic',
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
    }
  ]

})
