export const APP_MENU: AppMenuItem[] = [

  {
    name: 'Home',
    description: 'Home page',
    icon: 'public',
    link: ['']
  },
  {
    name: 'Playground',
    description: 'Playground page',
    icon: 'casino',
    link: ['playground']
  },
  {
    name: 'Crud',
    description: 'Simple crud',
    icon: 'edit',
    link: ['crud'],
    roles: ['ROLE_ADMIN']
  },
  {
    name: 'About',
    description: 'About page',
    icon: 'person',
    link: ['about']
  },
  {
    name: 'User',
    description: 'user page',
    icon: 'user',
    link: ['user']
  },
  {
    name: 'Form Control',
    description: 'form example',
    icon: 'form',
    link: ['formcontrol']
  }
];

export interface AppMenuItem {
  name: string;
  description: string;
  icon: string;
  link: string[];
  roles?: string[];
}
