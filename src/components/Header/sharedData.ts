const sharedData = {
  menuItems: [
    { id: 'store', text: 'Store', link: '/' },
    { id: 'profile', text: 'Profile', link: '/user' },
    { id: 'admin', text: 'Admin', link: '/admin' },
    { id: 'contact me', text: 'Support', link: '/support' },
  ],
  subMenus: [
    {
      title: 'Profile',
      items: [
        { id: 'profile-settings', text: 'Settings', link: '/user/settings' },
        { id: 'store-preferences', text: 'tags', link: '/user/tags' },
        { id: 'inventory', text: 'Inventory', link: '/library' },
        { id: 'wishlish', text: 'Wishlish', link: '/wishlist' },
        { id: 'cart', text: 'Cart', link: '/cart' },
      ],
    },
    {
      title: 'Admin',
      items: [
        { id: 'create-game', text: 'Create game', link: '/admin/create-game' },
        { id: 'developers', text: 'Developers', link: '/admin/developers' },
        { id: 'publishers', text: 'Publishers', link: '/admin/publishers' },
        { id: 'features', text: 'Features', link: '/create/features' },
        { id: 'tags', text: 'Tags', link: '/admin/tags' },
        { id: 'languages', text: 'Languages', link: '/admin/languages' },
        { id: 'users', text: 'Users', link: '/admin/users' },
        { id: 'reviews', text: 'Reviews', link: '/admin/reviews' },
        { id: 'offers', text: 'Offers', link: '/admin/offers' },
      ],
    },
  ],
  minorMenuItems: [
    { id: 'profile-settings', text: 'Profile Settings', link: '/user/settings' },
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
