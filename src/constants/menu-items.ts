interface MenuItem {
  icon: string
  label: string
  routeName: string
}

interface MenuSection {
  icon: string
  label: string
  chidlren: Array<MenuItem>
}

export const items: Array<MenuSection | MenuItem> = [
  {
    icon: 'lucide:home',
    label: 'Home',
    routeName: 'home',
  },
  {
    icon: 'lucide:settings',
    label: 'Configurações',
    chidlren: [
      {
        icon: 'lucide:shield',
        label: 'Administradores',
        routeName: 'adminsManagement',
      },
    ],
  },
  {
    icon: 'lucide:users',
    label: 'Usuários',
    chidlren: [
      {
        icon: 'lucide:list',
        label: 'Listagem',
        routeName: 'usersListing',
      },
    ],
  },
]
