import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/register'
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('./views/Home.vue')

    },

    {
      path: '/register',
      name: 'register',
      component: () => import('views/register/Register.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('views/login/Login.vue')
    },
    {
      path:'/test',
      name:'name',
      component:()=>import('views/test/Test.vue')
    },
    // 404要放在最后面
    {
      path: '*',
      name: 'notFound',
      component: () => import('views/404/NotFound.vue')
    },

  ]
})

// 路由收尾
router.beforeEach((to, from, next) => {
  // 
  let isLogin = localStorage.getItem('userToken') ? true : false
 
  if (to.path == '/login' || to.path == "/register") {
    next()
  }
  else {
    // 访问其他页面，首先判断是否登录，登录正常访问， 没有登录就定向到login页面
    isLogin ? next() : next('/login')
  }
})
export default router
