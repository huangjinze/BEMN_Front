import Vue from 'vue'
import Router from 'vue-router'
import StaiscticPage from '@/page/StaiscticPage'
import HomePage from '@/page/HomePage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
    },
    {
      path: '/staisctic',
      name: 'staisctic',
      component: StaiscticPage
    }
  ]

})
