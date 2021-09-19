import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
// Admin
import AdminView from '../views/Admin/AdminView';
import Accounts from '../views/Admin/Accounts';
import AdminsView from '../views/Admin/AdminsView';
import AdminRegisterView from '../views/Admin/AdminRegisterView';

// Dentists
import DentistDashboard from '../views/Dentist/DentistDashboard';
import Appointments from '../views/Dentist/Appointments';
import Profile from '../views/Dentist/Profile';
import PatientsList from '../views/Dentist/PatientsList';
import GlobalEvents from '../views/Dentist/GlobalEvents';
import CompleteAppointment from '../views/Dentist/CompleteAppointment';
import PatientMedicalRecord from '../views/Dentist/PatientMedicalRecord';
import DentistBlacklistView from '../views/Dentist/DentistBlacklistView';

// Patients
import PatientDashboard from '../views/Patient/PatientDashboard';
import PatientProfile from '../views/Patient/PatientProfile';
import PatientAppointments from '../views/Patient/PatientAppointments';
import PatientMedRecord from '../views/Patient/PatientMedRecord';
import PatientDentistsView from '../views/Patient/PatientDentistsView';
import PatientViewDentist from '../views/Patient/PatientViewDentist';
import PatientCompletedAppointment from '../views/Patient/PatientCompletedAppointment';
import PatientMedRecordDetails from '../views/Patient/PatientMedRecordDetails';
import PatientBlacklistView from '../views/Patient/PatientBlacklistView';

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
        name: 'Accounts',
        path: '/admin/accounts',
        component: Accounts
      },
      {
        name: 'AdminsView',
        path: '/admin/admins',
        component: AdminsView
      },
      {
        name: 'AdminRegisterView',
        path: '/admin/new',
        component: AdminRegisterView
      },
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
        path: '/dentist/events',
        name: 'GlobalEvents',
        component: GlobalEvents
      },
      {
        path: '/dentist/patients/:p_id',
        name: 'PatientsMedicalRecord',
        component: PatientMedicalRecord
      },
      {
        path: '/dentist/patients',
        name: 'Patients',
        component: PatientsList
      },
      {
        path: '/dentist/complete/:a_id/:p_id',
        name: 'CompleteAppointment',
        component: CompleteAppointment
      },
      {
        name: 'DentistBlacklistView',
        path: '/dentist/blacklist',
        component: DentistBlacklistView
      }
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
        name: 'Dentists',
        path: '/patient/dentists',
        component: PatientDentistsView
      },
      {
        name: 'ViewDentist',
        path: '/patient/dentists/:id',
        component: PatientViewDentist
      },
      {
        path: '/patient/appointments',
        name: 'PatientAppointments',
        component: PatientAppointments
      },
      {
        path: '/patient/complete/:a_id/:d_id',
        name: 'PatientCompletedAppointment',
        component: PatientCompletedAppointment
      },
      {
        path: '/patient/medical-record',
        name: 'PatientMedRecord',
        component: PatientMedRecord
      },
      {
        path: '/patient/medical-record/:d_id/',
        name: 'PatientMedRecordDetails',
        component: PatientMedRecordDetails
      },
      {
        name: 'PatientBlacklist',
        path: '/patient/blacklist',
        component: PatientBlacklistView
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router
