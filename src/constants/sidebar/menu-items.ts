interface MenuItem {
  icon: string
  label: string
  routeName: string
}

interface MenuSection {
  icon: string
  label: string
  children: Array<MenuItem>
}

export const items: Array<MenuSection | MenuItem> = [
  {
    icon: 'lucide:home',
    label: 'Home',
    routeName: 'home',
  },
  {
    icon: 'lucide:users',
    label: 'Usuários',
    children: [
      {
        icon: 'lucide:list',
        label: 'Listagem',
        routeName: 'usersListing',
      },
    ],
  },
]
