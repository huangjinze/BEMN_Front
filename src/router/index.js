import Vue from 'vue'
import Router from 'vue-router'
import navi from '@/components/layout/navi'
import StaiscticPage from '@/page/StaiscticPage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'navi',
      component: navi
    },
    {
      path: '/staisctic',
      name: 'home',
      component: StaiscticPage
    },
    {
      path: '/home1',
      name: 'home1',
      component: {}
    }
  ]

})
