import { createRouter, createWebHistory } from 'vue-router';
import Reports from '@/pages/reports/reports.vue';
import Login from '@/pages/auth/Login.vue';
import Users from '@/pages/Users.vue';
import Locations from '@/pages/Locations.vue';
import Configuration from '@/pages/configuration.vue';
import UserDetail from '@/pages/userDetail.vue';
import UnitDetail from '@/pages/unitDetail.vue';
import Units from '@/pages/Units.vue';
import Devices from '@/pages/devices.vue';
import ForgetPassword from '@/pages/auth/forgetPass.vue';
import ChangePass from '@/pages/auth/changePass.vue';
import store from './store';
import { computed } from 'vue';

const routes = [
  {
    path: '',
    component: () => import('@/layout/default-layout.vue'),
    redirect: '/dashboard',
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import('./components/Dashboard.vue'),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: '/locations',
        name: 'locations',
        component: Locations,
      },
      {
        path: '/configuration',
        name: 'configuration',
        component: Configuration,
      },
      {
        path: '/units',
        name: 'units',
        component: Units,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: '/units/:id',
        name: 'unitDetails',
        component: UnitDetail,
        meta: {
          requiresAuth: true,
        },
      },

      {
        path: '/formlayout',
        name: 'formlayout',
        component: () => import('./components/FormLayoutDemo.vue'),
      },
      {
        path: '/input',
        name: 'input',
        component: () => import('./components/InputDemo.vue'),
      },
      {
        path: '/floatlabel',
        name: 'floatlabel',
        component: () => import('./components/FloatLabelDemo.vue'),
      },
      {
        path: '/invalidstate',
        name: 'invalidstate',
        component: () => import('./components/InvalidStateDemo.vue'),
      },
      {
        path: '/button',
        name: 'button',
        component: () => import('./components/ButtonDemo.vue'),
      },
      {
        path: '/list',
        name: 'list',
        component: () => import('./components/ListDemo.vue'),
      },
      {
        path: '/tree',
        name: 'tree',
        component: () => import('./components/TreeDemo.vue'),
      },
      {
        path: '/panel',
        name: 'panel',
        component: () => import('./components/PanelsDemo.vue'),
      },
      {
        path: '/overlay',
        name: 'overlay',
        component: () => import('./components/OverlayDemo.vue'),
      },
      {
        path: '/menu',
        component: () => import('./components/MenuDemo.vue'),
        children: [
          {
            path: '',
            component: () => import('./components/menu/PersonalDemo.vue'),
          },
          {
            path: '/menu/seat',
            component: () => import('./components/menu/SeatDemo.vue'),
          },
          {
            path: '/menu/payment',
            component: () => import('./components/menu/PaymentDemo.vue'),
          },
          {
            path: '/menu/confirmation',
            component: () => import('./components/menu/ConfirmationDemo.vue'),
          },
        ],
      },
      {
        path: '/messages',
        name: 'messages',
        component: () => import('./components/MessagesDemo.vue'),
      },
      {
        path: '/file',
        name: 'file',
        component: () => import('./components/FileDemo.vue'),
      },
      {
        path: '/chart',
        name: 'chart',
        component: () => import('./components/ChartDemo.vue'),
      },
      {
        path: '/misc',
        name: 'misc',
        component: () => import('./components/MiscDemo.vue'),
      },
      {
        path: '/crud',
        name: 'crud',
        component: () => import('./pages/CrudDemo.vue'),
      },
      {
        path: '/timeline',
        name: 'timeline',
        component: () => import('./pages/TimelineDemo.vue'),
      },
      {
        path: '/empty',
        name: 'empty',
        component: () => import('./components/EmptyPage.vue'),
      },
      {
        path: '/documentation',
        name: 'documentation',
        component: () => import('./components/Documentation.vue'),
      },
      {
        path: '/users',
        name: 'users',
        component: Users,
      },
      {
        path: '/users/:id',
        name: 'userDetail',
        component: UserDetail,
      },
      {
        path: '/alerts',
        name: 'alerts',
        component: () => import('@/pages/alert/Alerts.vue'),
      },
      {
        path: '/reports',
        name: 'reports',
        component: Reports,
      },
      {
        path: '/devices',
        name: 'devices',
        component: Devices,
      },
    ],
  },
  // ================================= auth layout=========================
  {
    path: '',
    component: () => import('@/layout/auth-layout.vue'),
    meta: {
      requiresAuth: false,
    },
    children: [
      {
        path: '/login',
        name: 'login',
        component: Login,
        meta: {
          requiresAuth: false,
        },
      },
      {
        path: '/forget-password',
        name: 'forgetPassword',
        component: ForgetPassword,
        meta: {
          requiresAuth: false,
        },
      },
      {
        path: '/changePass/:id/:token',
        name: 'changePassword',
        component: ChangePass,
        meta: {
          requiresAuth: false,
        },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// router guards
router.beforeEach(function (to, from, next) {
  window.scrollTo(0, 0);
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const token = computed(() => store.getters.token);
  if (requiresAuth && token.value) {
    next();
  } else if (requiresAuth && !token.value) {
    next('/login');
  } else if (!requiresAuth && token.value) {
    next('/');
  } else {
    next();
  }
});

export default router;
