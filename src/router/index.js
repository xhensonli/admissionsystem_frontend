import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import{request} from "../network/request";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../components/login/Login')
  },
  {
    path: '/backstage',
    name: 'BackStage',
    component: () => import('../components/backstage/BackStageController'),
    children: [
      {
        path: 'studentPlan',
        name: 'StudentPlan',
        component: () => import('../components/backstage/StudentPlan')
      },
      {
        path: 'situation',
        name: 'Situation',
        component: () => import('../components/backstage/Situation')
      },
      {
        path: 'studentInfo',
        name: 'StudentInfo',
        component: () => import('../components/backstage/StudentInfo')
      },
      {
        path: 'gradeDistribute',
        name: 'GradeDistribute',
        component: () => import('../components/backstage/GradeDistribute')
      },
      {
        path: 'geoDistribute',
        name: 'GeoDistribute',
        component: () => import('../components/backstage/GeoDistribute')
      },
      {
        path: 'countDistribute',
        name: 'CountDistribute',
        component: () => import('../components/backstage/CountDistribute')
      },
      {
        path: 'gradeAnalyze',
        name: 'GradeAnalyze',
        component: () => import('../components/backstage/GradeAnalyze')
      },
      {
        path: 'result',
        name: 'Result',
        component: () => import('../components/backstage/Result')
      },
      {
        path: 'adjustQueue',
        name: 'AdjustQueue',
        component: () => import('../components/backstage/AdjustQueue')
      },
      {
        path: 'exitQueue',
        name: 'ExitQueue',
        component: () => import('../components/backstage/ExitQueue')
      },
      {
        path: 'searchResult',
        name: 'SearchResult',
        component: () => import('../components/backstage/SearchResult')
      }
    ]
  }
]

const router = new VueRouter({
  // mode: 'history',
  routes
})
router.beforeEach((to, from, next) => {
  if (to.matched[0].path === '/backstage'){
    request({
      url: 'login/checkLogin'
    }).then( res => {
      if( res.code === '000'){
        next();
      } else {
        next('/login')
      }
    }).catch( err => {next('/login')})
  } else {
    next();
  }
})

export default router
