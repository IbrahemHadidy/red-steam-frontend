const sharedData = {
  menuItems: [
    { id: 'store', text: 'Store', link: '/' },
    { id: 'you-and-friends', text: 'Profile & Settings', link: '/user' },
    { id: 'contact me', text: 'Support', link: '/support' },
  ],
  subMenus: [
    {
      title: 'Store',
      items: [
        { id: 'store-home', text: 'Home', link: '/' },
        { id: 'store-wishlist', text: 'Wishlist', link: '/wishlist' },
      ],
    },
    {
      title: 'Profile & Settings',
      items: [
        { id: 'you-friends-profile', text: 'Profile', link: '/user/settings' },
        { id: 'you-friends-inventory', text: 'Inventory', link: '/library' },
        { id: 'you-friends-tags', text: 'tags', link: '/user/tags' },
      ],
    },
  ],
  minorMenuItems: [
    { id: 'view-profile', text: 'Profile Settings', link: '/user/settings' },
    { id: 'store-preferences', text: 'Tags preferences', link: '/user/tags' },
    { id: 'change-user', text: 'Sign out of account...', link: '/logout' },
  ],
  privacyPolicy: {
    id: 'privacy-policy',
    text: 'My GitHub',
    link: 'https://github.com/IbrahemHadidy/',
  },
  legal: {
    id: 'legal',
    text: 'Repository',
    link: 'https://github.com/IbrahemHadidy/node-steam/',
  },
  steamSubscriberAgreement: {
    id: 'GitHub',
    text: 'Steam',
    link: 'https://store.steampowered.com/',
  },
  refunds: {
    id: 'refunds',
    text: 'Valve',
    link: 'https://www.valvesoftware.com/en/',
  },
};

export default sharedData;
