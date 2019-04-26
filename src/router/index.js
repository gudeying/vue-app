import Vue from 'vue'
import Router from 'vue-router'
import Navgation from '@/components/NavgationDrawer'
import Index from '@/components/Index'
import Detail from '@/components/Detail'
import ArtList from '@/components/ArticleList'

Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',redirect:'/index'
    // },
    {
      path:'/index',
      name:'Index',
      component:Index
    },{
      path:'/detail/:id',
      name:'detail',
      component:Detail
    },{
      path:'/article/list',
      name:'articleList',
      component:ArtList
    }
    



  ]
})
