import { createRouter, createWebHashHistory } from 'vue-router'
import mainComponent from '@/components/mainComponent.vue';
import assignments from '@/views/assignments.vue';
import detailedCardInfo from '@/views/detailedCardInfo.vue';

const routes = [
  {
    path: '/',
    name: 'mainComponent',
    component: mainComponent,
    children: [
      {
        path: '/',
        name: 'assignments',
        component: assignments,
      },
      {
        path: '/detailedCardInfo',
        name: 'detailedCardInfo',
        component: detailedCardInfo,
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        // component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
      }
    ],
  },
  
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
