import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Store from '@/components/Store'
import Article from '@/components/Article'
import ArticlesByStore from '../components/ArticlesByStore'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/stores',
      name: 'Store',
      component: Store
    },
    {
      path: '/articles',
      name: 'Article',
      component: Article
    },
    {
      path: '/articles/stores/:id',
      name: 'ArticlesByStore',
      component: ArticlesByStore
    }
  ]
})
