import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';

import Login from '../views/Login.vue';
import Register from '../views/Register.vue';

import AdminView from '../views/Admin/AdminView';
import AdminLogin from '../views/Admin/AdminLogin';

const routes = [
  {
    name: 'Home',
    path: '/',
    component: Home
  },
  {
    name: 'Admin',
    path: '/admin',
    component: AdminView,
    children: [
      {
        name: 'AdminLogin',
        path: 'login',
        component: AdminLogin
      }
    ]
  },
  {
    name: 'Login',
    path: '/login',
    component: Login
  },
  {
    name: 'Register',
    path: '/register/:type?',
    component: Register,
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
