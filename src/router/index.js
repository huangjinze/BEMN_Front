import Vue from 'vue'
import Router from 'vue-router'
import vtfStaiscticPage from '@/page/Static/vtfStaiscticPage.vue'
import tifStaiscticPage from '@/page/Static/tifStaiscticPage.vue'
import HomePage from '@/page/HomePage'
import dataManager from '@/page/DataPage'
import LoginPage from '@/page/User/LoginPage'
import ImportPage from '@/page/ImportPage.vue'
import Index from '@/page/Index.vue'
import Department from '@/page/Department.vue'
import RolesPage from '@/page/RolesPage.vue'
import tifStation from '@/page/Station/tifStation.vue'
import vtfStation from '@/page/Station/vtfStation.vue'

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
    },
    {
      path: '/index',
      name: 'index',
      component: Index
    //  系统进去的首页——陆旻祎
    },
    {
      path: '/department',
      name: 'department',
      component: Department
    //  用户管理界面——陆旻祎
    },
    {
      path: '/roles',
      name: 'roles',
      component: RolesPage
    //  角色管理界面——陆旻祎
    },
    {
      path: '/tifstation',
      name: 'tifstation',
      component: tifStation
    //  森林领域站点信息增删改查——陆旻祎
    },
    {
      path: '/vtfstation',
      name: 'vtfstation',
      component: vtfStation
    //  水土保持领域站点信息增删改查——陆旻祎
    }
  ]

})
