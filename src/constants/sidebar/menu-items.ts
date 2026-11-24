export interface MenuItem {
  icon: string
  label: string
  route: {
    path: string
    name: string
  }
}

export interface MenuSection {
  icon: string
  label: string
  route: {
    path: string
  }
  children: Array<MenuItem>
}

export const items: Array<MenuSection | MenuItem> = [
  {
    icon: 'lucide:layout-dashboard',
    label: 'Dashboard',
    route: {
      path: '/dashboard',
      name: 'dashboard',
    },
  },
  {
    icon: 'lucide:users',
    label: 'Usuários',
    route: {
      path: '/users',
      name: 'users',
    },
  },
  {
    icon: 'lucide:pencil-line',
    label: 'Postagens',
    route: {
      path: '/reviews',
      name: 'reviews',
    },
  },
  {
    icon: 'lucide:message-circle-warning',
    label: 'Denúncias',
    route: {
      path: '/reports',
      name: 'reports',
    },
  },
]
