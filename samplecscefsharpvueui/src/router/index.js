import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Selection from '../views/Selection.vue'
import Schema from '../views/Schema.vue'
import All from '../views/All.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    children: [
      {
        path: 'selection',
        name: 'selection',
        component: Selection
      },
      {
        path: 'schema',
        name: 'schema',
        component: Schema
      },
      {
        path: 'all',
        name: 'all',
        component: All
      }
    ]
  }
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
