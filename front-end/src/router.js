import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/main.vue'

Vue.use(Router)

// path
const view = './views'
const member = `${view}/member`

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: Home
    },
    {
    	path:'/signup',
    	component: () => import(`${member}/signup.vue`)
    }
    
  ]
})
