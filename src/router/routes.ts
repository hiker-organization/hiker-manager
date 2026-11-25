import type { RouteRecordRaw } from 'vue-router'

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/auth',
    component: () => import('@/layouts/AuthLayout.vue'),
    children: [
      {
        path: '',
        name: 'login',
        component: () => import('@/views/auth/LoginForm.vue'),
        meta: { title: 'Login' },
      },
    ],
  },
  {
    path: '/',
    component: () => import('@/layouts/AppLayout.vue'),
    meta: { requiresAuth: true }, // Vale para todas as rotas filhas.
    children: [
      {
        path: '',
        name: 'home',
        redirect: { name: 'dashboard' },
        meta: { title: 'Hiker Manager' },
      },
      {
        path: 'dashboard',
        name: 'dashboard',
        redirect: { name: 'usersDashboard' },
        component: () => import('@/views/modules/dashboard/DashboardLayout.vue'),
        children: [
          {
            path: 'users',
            name: 'usersDashboard',
            component: () => import('@/views/modules/dashboard/UsersDashboard.vue'),
            meta: { title: 'Dashboard de Usuários' },
          },
          {
            path: 'reviews',
            name: 'reviewsDashboard',
            component: () => import('@/views/modules/dashboard/ReviewsDashboard.vue'),
            meta: { title: 'Dashboard de Postagens' },
          },
        ],
      },
      {
        path: 'users',
        name: 'users',
        redirect: { name: 'usersListing' },
        component: () => import('@/views/modules/user/UserLayout.vue'),
        children: [
          {
            path: '',
            name: 'usersListing',
            component: () => import('@/views/modules/user/UsersListing.vue'),
            meta: { title: 'Listagem de Usuários' },
          },
          {
            path: ':user',
            name: 'userForm',
            component: () => import('@/views/modules/user/UserForm.vue'),
            meta: { title: 'Detalhes do Usuário' },
          },
        ],
      },
      {
        path: 'reviews',
        name: 'reviews',
        redirect: { name: 'reviewsListing' },
        component: () => import('@/views/modules/review/ReviewLayout.vue'),
        children: [
          {
            path: '',
            name: 'reviewsListing',
            component: () => import('@/views/modules/review/ReviewListing.vue'),
            meta: { title: 'Listagem de Postagens' },
          },
          {
            path: 'auto-blocked',
            name: 'autoBlockedReviewsListing',
            component: () => import('@/views/modules/review/AutoBlockedReviewsListing.vue'),
            meta: { title: 'Postagens Bloqueadas pelo Modelo' },
          },
          {
            path: ':reviewCode',
            name: 'reviewForm',
            component: () => import('@/views/modules/review/ReviewForm.vue'),
            meta: { title: 'Detalhes da Postagem' },
          },
        ],
      },
      {
        path: 'reports',
        name: 'reports',
        redirect: { name: 'reportsListing' },
        component: () => import('@/views/modules/report/ReportLayout.vue'),
        children: [
          {
            path: '',
            name: 'reportsListing',
            component: () => import('@/views/modules/report/ReportsListing.vue'),
            meta: { title: 'Listagem de Denúncias' },
          },
        ],
      },
      {
        path: 'reviews/:reviewCode/reports',
        name: 'reviewReports',
        redirect: { name: 'reviewReportsListing' },
        component: () => import('@/views/modules/review-reports/ReviewReportLayout.vue'),
        children: [
          {
            path: '',
            name: 'reviewReportsListing',
            component: () => import('@/views/modules/review-reports/ReviewReportsListing.vue'),
            meta: { title: 'Listagem de Denúncias da Postagem' },
          },
        ],
      },
    ],
  },
  {
    path: '/restrict',
    name: 'restrict',
    component: () => import('@/layouts/RestrictLayout.vue'),
    meta: { title: 'Área Restrita' },
  },
]
