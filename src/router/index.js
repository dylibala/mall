import Vue from 'vue'
import Router from 'vue-router'

const Home = () => import('../views/home/home.vue')
const Category = () => import('../views/category/category.vue')
const Cart = () => import('../views/cart/cart.vue')
const Mine = () => import('../views/mine/mine.vue')
const Detail = () => import('../views/detail/detail')

Vue.use(Router)

const router = new Router({
  mode:'history',
  routes:[
    {
      path: '',
      redirect: '/home'
    },
    {
      path:'/home',
      component: Home
    },
    {
      path:'/category',
      component: Category
    },
    {
      path:'/cart',
      component: Cart
    },
    {
      path:'/mine',
      component: Mine
    },
    {
      path: '/detail:iid',
      component: Detail
    }
]
})

export default router

