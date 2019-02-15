import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// path
const view = './views'
const member = `${view}/member`
const _class = `${view}/class`

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
  {
    path:'',
    component: () => import(`${view}/main.vue`),
    children: [
    {
      path:'/home',
      component: () => import(`${view}/home.vue`),
    },
    {
      path: '/class/:cidx',
      component: () => import(`${_class}/class-main.vue`),
      children: [

      ]
    }
    ]
  },

  {
   path:'/signup',
   component: () => import(`${member}/signup.vue`)
 },
 

 ]
})
