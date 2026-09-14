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
    component: import('@/layouts/AppLayout.vue'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('@/views/HomePage.vue'),
        meta: { title: 'Hiker Manager' },
      },
      {
        path: 'config',
        children: [
          {
            path: 'admins',
            name: 'adminsManagement',
            component: () => import('@/views/modules/config/admin/AdminsManagement.vue'),
            meta: { title: 'Gerenciamento de Administradores' },
          },
        ],
      },
      {
        path: 'users',
        children: [
          {
            path: '',
            name: 'usersListing',
            component: () => import('@/views/modules/user/UsersListing.vue'),
            meta: { title: 'Listagem de Usuários' },
          },
        ],
      },
    ],
  },
]
