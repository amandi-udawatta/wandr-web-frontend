// NAVIGATION
import {
  PieChartOutlined ,
  EnvironmentOutlined,
  FundOutlined ,
  ShopOutlined,
  SafetyCertificateOutlined,
  SettingOutlined,
  LogoutOutlined,
} from '@ant-design/icons';

export const NAV_LINKS = [
    { href: '/', key: 'home', label: 'Home' },
    { href: '/api/blogs', key: 'blog', label: 'Blog' },
    { href: '/api/register', key: 'register', label: 'Register' },
    { href: '/api/contact', key: 'contact', label: 'Contact Us' },
  ];


  export const SIDEBAR_ITEMS = [

    { href: '/api/admin/dashboard', key: 'dashboard', label: 'Dashboard', icon: PieChartOutlined  },
    { href: '/api/admin/places', key: 'places', label: 'Places Management', icon: EnvironmentOutlined },
    { href: '/api/admin/businesses', key: 'businesses', label: 'Businesses', icon: ShopOutlined },
    { href: '/api/admin/advertisements', key: 'advertisements', label: 'Advertisements', icon: FundOutlined  },
    { href: '/api/admin/plans', key: 'plans', label: 'Buiness Plans', icon: SafetyCertificateOutlined },
    { href: '/api/admin/settings', key: 'settings', label: 'Settings', icon: SettingOutlined },
    { href: '/api/admin/signout', key: 'signout', label: 'Sign Out', icon: LogoutOutlined },

  ];
  
  // CAMP SECTION
  export const PEOPLE_URL = [
    '/person-1.png',
    '/person-2.png',
    '/person-3.png',
    '/person-4.png',
  ];
  
  // FEATURES SECTION
  export const FEATURES = [
    {
      title: 'Tailored Travel Tips',
      icon: '/map.svg',
      variant: 'green',
      description:
        'Discover personalized recommendations based on your preferences and past travel experiences, ensuring every journey is uniquely yours.',
    },
    {
      title: 'Digital Travel Diary',
      icon: '/calendar.svg',
      variant: 'green',
      description:
        "Capture and chronicle your adventures with ease. Write about your experiences, upload photos, and revisit cherished memories anytime, anywhere.",
    },
    {
      title: 'Trusted Local Services',
      icon: '/tech.svg',
      variant: 'green',
      description:
        ' Connect with vetted local service providers for accommodations, tours, activities, and more. Gain insider knowledge and support local businesses effortlessly.',
    },
    {
      title: 'Your Route, Your Way',
      icon: '/location.svg',
      variant: 'orange',
      description:
        'Plan and customize your routes with interactive maps. Tailor your journey to explore hidden gems, scenic routes, and must-see landmarks with precision.',
    },
  ];
  
  // FOOTER SECTION
  export const FOOTER_LINKS = [
    {
      title: 'Learn More',
      links: [
        'About Wandr',
        'Press Releases',
        'Environment',
        'Jobs',
        'Privacy Policy',
        'Contact Us',
      ],
    },
    {
      title: 'Our Community',
      links: ['Kitulgala Rafting', 'Best Camping Place', 'Hospitality at its best'],
    },
  ];
  
  export const FOOTER_CONTACT_INFO = {
    title: 'Contact Us',
    links: [
      { label: 'Admin Officer', value: '077-123-4567' },
      { label: 'Email Officer', value: 'wandr@admin.com' },
    ],
  };
  
  export const SOCIALS = {
    title: 'Social',
    links: [
      '/facebook.svg',
      '/instagram.svg',
      '/twitter.svg',
      '/youtube.svg',
      '/wordpress.svg',
    ],
  };