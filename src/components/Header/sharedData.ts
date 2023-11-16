const sharedData = {
  menuItems: [
    { id: 'store', text: 'Store', link: '/' },
    { id: 'community', text: 'Community', link: '/communtiy' },
    { id: 'you-and-friends', text: 'You & Friends', link: '/profile' },
    { id: 'support', text: 'Support', link: '/support' },
  ],
  subMenus: [
    {
      title: 'Store',
      items: [
        { id: 'store-home', text: 'Home', link: '/' },
        { id: 'store-discovery', text: 'Discovery Queue', link: '/explore' },
        { id: 'store-wishlist', text: 'Wishlist', link: '/wishlist' },
        { id: 'store-points', text: 'Points Shop', link: '/points/shop' },
        { id: 'store-news', text: 'News', link: '/news' },
        { id: 'store-stats', text: 'Stats', link: '/stats' },
      ],
    },
    {
      title: 'Community',
      items: [
        { id: 'community-home', text: 'Home', link: '/communtiy' },
        { id: 'community-discussions', text: 'Discussions', link: '/discussions' },
        { id: 'community-workshop', text: 'Workshop', link: '/workshop' },
        { id: 'community-market', text: 'Market', link: '/market' },
        { id: 'community-broadcasts', text: 'Broadcasts', link: '/?subsection=broadcasts' },
      ],
    },
    {
      title: 'You & Friends',
      items: [
        { id: 'you-friends-activity', text: 'Activity', link: '/id/profile/home' },
        { id: 'you-friends-profile', text: 'Profile', link: '/id/profile' },
        { id: 'you-friends-friends', text: 'Friends', link: '/id/profile/friends' },
        { id: 'you-friends-games', text: 'Games', link: '/id/profile/games' },
        { id: 'you-friends-groups', text: 'Groups', link: '/id/profile/groups' },
        { id: 'you-friends-content', text: 'Content', link: '/id/profile/screenshots' },
        { id: 'you-friends-badges', text: 'Badges', link: '/id/profile/badges' },
        { id: 'you-friends-inventory', text: 'Inventory', link: '/id/profile/inventory' },
      ],
    },
  ],
  minorMenuItems: [
    { id: 'account-details', text: 'Account details', link: '/account' },
    { id: 'store-preferences', text: 'Store preferences', link: '/account/preferences' },
    { id: 'change-language', text: 'Change language', link: '#'},
    { id: 'change-user', text: 'Change User', link: '#'},
  ],
  privacyPolicy: { id: 'privacy-policy', text: 'My GitHub', link: 'https://github.com/IbrahemHadidy/' },
  legal: { id: 'legal', text: 'Repository', link: 'https://github.com/IbrahemHadidy/node-steam/' },
  steamSubscriberAgreement: { id: 'GitHub', text: 'Steam', link: 'https://store.steampowered.com/' },
  refunds: { id: 'refunds', text: 'Valve', link: 'https://www.valvesoftware.com/en/' },
};

export default sharedData;
