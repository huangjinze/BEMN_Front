import Vue from 'vue'
import Router from 'vue-router'
import vtfStaiscticPage from '@/page/Static/vtfStaiscticPage.vue'
import tifStaiscticPage from '@/page/Static/tifStaiscticPage.vue'
import HomePage from '@/page/HomePage'
import dataManager from '@/page/DataPage'
import LoginPage from '@/page/User/LoginPage'
import ImportPage from '@/page/ImportPage.vue'

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
      path: '/vtf/Importpage',
      name: 'vtfImportpage',
      component: ImportPage
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage
    }
  ]

})
