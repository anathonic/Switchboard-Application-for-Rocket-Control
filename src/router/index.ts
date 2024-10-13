import {createRouter, createWebHistory} from 'vue-router'
import Dashboard from '../components/Dashboard.vue';

const routes = [
  {
    path: '/',
    component: Dashboard,
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('../views/SwitchboardView.vue')
      }
    ]
  }
];


const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router


