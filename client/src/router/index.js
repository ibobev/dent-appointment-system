import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import DentistDashboard from '../views/Dentist/DentistDashboard'
import Appointments from '../views/Dentist/Appointments'
import Profile from '../views/Dentist/Profile'
import PatientsList from '../views/Dentist/PatientsList'
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
  },
  {
    path: '/dentist',
    name: 'Dentist',
    component: DentistDashboard,
    meta:{
      isAuth: true,
      isDentist: true
    },
    children: [
      {
        path: '/dentist/profile',
        name: 'Profile',
        component: Profile
      },
      {
        path: '/dentist/appointments',
        name: 'Appointments',
        component: Appointments
      },
      {
        path: '/dentist/patients',
        name: 'Patients',
        component: PatientsList
      },
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

/*router.beforeEach((to, from, next) => {
  if (to.meta.isAuth);
});*/

export default router
