const sharedData = {
  menuItems: [
    { id: 'store', text: 'Store', link: 'https://store.steampowered.com/' },
    { id: 'community', text: 'Community', link: 'https://steamcommunity.com/' },
    { id: 'you-and-friends', text: 'You & Friends', link: 'https://steamcommunity.com/id/iTankDestroyer/home/' },
    { id: 'support', text: 'Support', link: 'https://help.steampowered.com/en/' },
  ],
  subMenus: [
    {
      title: 'Store',
      items: [
        { id: 'store-home', text: 'Home', link: 'https://store.steampowered.com/' },
        { id: 'store-discovery', text: 'Discovery Queue', link: 'https://store.steampowered.com/explore/' },
        { id: 'store-wishlist', text: 'Wishlist', link: 'https://steamcommunity.com/my/wishlist/' },
        { id: 'store-points', text: 'Points Shop', link: 'https://store.steampowered.com/points/shop/' },
        { id: 'store-news', text: 'News', link: 'https://store.steampowered.com/news/' },
        { id: 'store-stats', text: 'Stats', link: 'https://store.steampowered.com/stats/' },
      ],
    },
    {
      title: 'Community',
      items: [
        { id: 'community-home', text: 'Home', link: 'https://steamcommunity.com/' },
        { id: 'community-discussions', text: 'Discussions', link: 'https://steamcommunity.com/discussions/' },
        { id: 'community-workshop', text: 'Workshop', link: 'https://steamcommunity.com/workshop/' },
        { id: 'community-market', text: 'Market', link: 'https://steamcommunity.com/market/' },
        { id: 'community-broadcasts', text: 'Broadcasts', link: 'https://steamcommunity.com/?subsection=broadcasts' },
      ],
    },
    {
      title: 'You & Friends',
      items: [
        { id: 'you-friends-activity', text: 'Activity', link: 'https://steamcommunity.com/id/iTankDestroyer/home/' },
        { id: 'you-friends-profile', text: 'Profile', link: 'https://steamcommunity.com/id/iTankDestroyer/' },
        { id: 'you-friends-friends', text: 'Friends', link: 'https://steamcommunity.com/id/iTankDestroyer/friends/' },
        { id: 'you-friends-games', text: 'Games', link: 'https://steamcommunity.com/id/iTankDestroyer/games/' },
        { id: 'you-friends-groups', text: 'Groups', link: 'https://steamcommunity.com/id/iTankDestroyer/groups/' },
        { id: 'you-friends-content', text: 'Content', link: 'https://steamcommunity.com/id/iTankDestroyer/screenshots/' },
        { id: 'you-friends-badges', text: 'Badges', link: 'https://steamcommunity.com/id/iTankDestroyer/badges/' },
        { id: 'you-friends-inventory', text: 'Inventory', link: 'https://steamcommunity.com/id/iTankDestroyer/inventory/' },
      ],
    },
  ],
  minorMenuItems: [
    { id: 'account-details', text: 'Account details', link: 'https://store.steampowered.com/account/' },
    { id: 'store-preferences', text: 'Store preferences', link: 'https://store.steampowered.com/account/preferences' },
    { id: 'change-language', text: 'Change language', link: '#'},
    { id: 'change-user', text: 'Change User', link: '#'},
  ],
  privacyPolicy: { id: 'privacy-policy', text: 'My GitHub', link: 'https://github.com/IbrahemHadidy/' },
  legal: { id: 'legal', text: 'Repository', link: '' },
  steamSubscriberAgreement: { id: 'GitHub', text: 'Steam', link: 'https://store.steampowered.com/' },
  refunds: { id: 'refunds', text: 'Valve', link: 'https://www.valvesoftware.com/en/' },
};

export default sharedData;
