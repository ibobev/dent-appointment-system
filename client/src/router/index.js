import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import DentistDashboard from '../views/Dentist/DentistDashboard'
import Appointments from '../views/Dentist/Appointments'
import Profile from '../views/Dentist/Profile'
import PatientsList from '../views/Dentist/PatientsList'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register/:type?',
    name: 'Register',
    component: Register,
  },
  {
    path: '/dentist',
    name: 'Dentist',
    component: DentistDashboard,
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
})

export default router
