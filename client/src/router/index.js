import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
// Admin
import AdminView from '../views/Admin/AdminView';
import AdminAccounts from '../views/Admin/Accounts';

// Dentists
import DentistDashboard from '../views/Dentist/DentistDashboard';
import Appointments from '../views/Dentist/Appointments';
import Profile from '../views/Dentist/Profile';
import PatientsList from '../views/Dentist/PatientsList';

// Patients
import PatientDashboard from '../views/Patient/PatientDashboard';
import PatientProfile from '../views/Patient/PatientProfile';
import Search from '../views/Patient/Search';
import PatientAppointments from '../views/Patient/PatientAppointments';
import PatientMedRecord from '../views/Patient/PatientMedRecord';

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
        name: 'AdminAccounts',
        path: '/admin/accounts',
        component: AdminAccounts
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
  },
  {
    path: '/patient',
    name: 'Patient',
    component: PatientDashboard,
    children: [
      {
        path: '/patient/profile',
        name: 'PatientProfile',
        component: PatientProfile
      },
      {
        path: '/patient/search',
        name: 'Search',
        component: Search
      },
      {
        path: '/patient/appointments',
        name: 'PatientAppointments',
        component: PatientAppointments
      },
      {
        path: '/patient/medical-record',
        name: 'PatientMedRecord',
        component: PatientMedRecord
      },
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router
