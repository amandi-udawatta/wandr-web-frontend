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
    { href: '/api/business', key: 'business', label: 'Join as a Business' },
    // { href: '/api/contact', key: 'contact', label: 'Contact Us' },
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

  export const CATEGORY_IMAGES = [
    { category: 'Mountain', image: '/categories/categoryMountain.png' },
    { category: 'Beach', image: '/categories/categoryBeach.png' },
    { category: 'National Park', image: '/categories/categoryNationalPark.png' },
    { category: 'Historic Site', image: '/categories/categoryHistoricSite.png' },
    { category: 'Museum', image: '/categories/categoryMuseum.png' },
    { category: 'Art Gallery', image: '/categories/categoryArtGallery.png' },
    { category: 'Temple', image: '/categories/categoryTemple.png' },
    { category: 'Church', image: '/categories/categoryChurch.png' },
    { category: 'Monument', image: '/categories/categoryMonument.png' },
    { category: 'Archaeological Site', image: '/categories/categoryArchaeologicalSite.png' },
    { category: 'Waterfall', image: '/categories/categoryWaterfall.png' },
    { category: 'Lake', image: '/categories/categoryLake.png' },
    { category: 'River', image: '/categories/categoryRiver.png' },
    { category: 'Zoo', image: '/categories/categoryZoo.png' },
    { category: 'Botanical Garden', image: '/categories/categoryBotanicalGarden.png' },
    { category: 'Theme Park', image: '/categories/categoryThemePark.png' },
    { category: 'Wildlife Sanctuary', image: '/categories/categoryWildlifeSanctuary.png' },
    { category: 'Scenic Viewpoint', image: '/categories/categoryScenicViewpoint.png' },
    { category: 'Village', image: '/categories/categoryVillage.png' },
    { category: 'City', image: '/categories/categoryCity.png' },
    { category: 'Neighborhood', image: '/categories/categoryNeighborhood.png' },
    { category: 'Market', image: '/categories/categoryMarket.png' },
    { category: 'Shopping Mall', image: '/categories/categoryShoppingMall.png' },
    { category: 'Library', image: '/categories/categoryLibrary.png' },
    { category: 'University', image: '/categories/categoryUniversity.png' },
    { category: 'Cave', image: '/categories/categoryCave.png' },
    { category: 'Fortress', image: '/categories/categoryFortress.png' },
    { category: 'Lighthouse', image: '/categories/categoryLighthouse.png' },
    { category: 'Aquarium', image: '/categories/categoryAquarium.png' },
    { category: 'Cultural Landmark', image: '/categories/categoryCulturalLandmark.png' },
  ];

  export const ACTIVITY_IMAGES = [
    { activity: 'Hiking', image: '/activities/activityHiking.png' },
    { activity: 'Surfing', image: '/activities/activitySurfing.png' },
    { activity: 'Scuba Diving', image: '/activities/activityScubaDiving.png' },
    { activity: 'Wildlife Safari', image: '/activities/activityWildlifeSafari.png' },
    { activity: 'Bird Watching', image: '/activities/activityBirdWatching.png' },
    { activity: 'Cultural Tours', image: '/activities/activityCulturalTours.png' },
    { activity: 'Historical Tours', image: '/activities/activityHistoricalTours.png' },
    { activity: 'Temple Visits', image: '/activities/activityTempleVisits.png' },
    { activity: 'Waterfall Visits', image: '/activities/activityWaterfallVisits.png' },
    { activity: 'Whale Watching', image: '/activities/activityWhaleWatching.png' },
    { activity: 'Fishing', image: '/activities/activityFishing.png' },
    { activity: 'Camping', image: '/activities/activityCamping.png' },
    { activity: 'Rock Climbing', image: '/activities/activityRockClimbing.png' },
    { activity: 'Cycling', image: '/activities/activityCycling.png' },
    { activity: 'Kayaking', image: '/activities/activityKayaking.png' },
    { activity: 'Canoeing', image: '/activities/activityCanoeing.png' },
    { activity: 'Boating', image: '/activities/activityBoating.png' },
    { activity: 'Hot Air Ballooning', image: '/activities/activityHotAirBallooning.png' },
    { activity: 'Tea Plantation Tours', image: '/activities/activityTeaPlantationTours.png' },
    { activity: 'Elephant Rides', image: '/activities/activityElephantRides.png' },
    { activity: 'Village Tours', image: '/activities/activityVillageTours.png' },
    { activity: 'Food Tours', image: '/activities/activityFoodTours.png' },
    { activity: 'Trekking', image: '/activities/activityTrekking.png' },
    { activity: 'Photography', image: '/activities/activityPhotography.png' },
    { activity: 'Caving', image: '/activities/activityCaving.png' }
  ];


  // constants.ts

  export const SHOP_CATEGORIES = [
    { id: 1, name: 'Handicrafts' },
    { id: 2, name: 'Gems and Jewelry' },
    { id: 3, name: 'Souvenirs' },
    { id: 4, name: 'Tea and Spices' },
    { id: 5, name: 'Clothing and Textiles' },
    { id: 6, name: 'Antiques' },
    { id: 7, name: 'Art and Paintings' },
    { id: 8, name: 'Books and Stationery' },
    { id: 9, name: 'Local Food and Snacks' },
    { id: 10, name: 'Health and Wellness Products' },
    { id: 11, name: 'Sports and Outdoor Equipment' },
    { id: 12, name: 'Electronics and Gadgets' },
    { id: 13, name: 'Leather Goods' },
    { id: 14, name: 'Footwear' },
    { id: 15, name: 'Fashion Accessories' },
    { id: 16, name: 'Musical Instruments' },
    { id: 17, name: 'Perfumes and Cosmetics' },
    { id: 18, name: 'Organic Products' },
    { id: 19, name: 'Ayurvedic Products' },
    { id: 20, name: 'Gift Shops' },
    { id: 21, name: 'Local Markets' },
    { id: 22, name: 'Bakeries and Confectioneries' },
    { id: 23, name: 'Farmers’ Markets' },
    { id: 24, name: 'Furniture and Carpets' },
    { id: 25, name: 'Camping and Hiking Gear' },
    { id: 26, name: 'Pet Shops' },
    { id: 27, name: 'Wine and Spirits' },
    { id: 28, name: 'Toy Shops' },
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