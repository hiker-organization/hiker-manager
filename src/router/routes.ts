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
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('@/views/HomePage.vue'),
        meta: { title: 'Hiker Manager' },
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
    ],
  },
  {
    path: '/restrict',
    name: 'restrict',
    component: () => import('@/layouts/RestrictLayout.vue'),
    meta: { title: 'Área Restrita' },
  },
]
