// Helper function to generate menu items
const generateMenuItem = (
  label: string,
  url: string,
  className: string,
  category: string,
  specialClass: string = ''
): { label: string; url: string; className: string; category?: string; specialClass?: string } => {
  const item: {
    label: string;
    url: string;
    className: string;
    category?: string;
    specialClass?: string;
  } = { label, url, className };
  if (category) item.category = category;
  if (specialClass) item.specialClass = specialClass;
  return item;
};

const menuData = {
  'Your Store': {
    items: [
      generateMenuItem('Home', '#', 'custom-label', 'store-div'),
      generateMenuItem('Followed Games & Software', '#', 'custom-label', 'store-div'),
      generateMenuItem('Prefernces', '#', 'custom-label', 'store-div'),
      generateMenuItem('RECOMMENDITATIONS', '', 'custom-tag', 'store-div'),
      generateMenuItem('Discovery Queue', '#', 'custom-label', 'store-div'),
      generateMenuItem('New Releases Queue', '#', 'custom-label', 'store-div'),
      generateMenuItem('Community Recommendations', '#', 'custom-label', 'store-div'),
      generateMenuItem('Interactive Recommender', '#', 'custom-label', 'store-div'),
      generateMenuItem('Poular Among Friends', '#', 'custom-label', 'store-div'),
      generateMenuItem('Steam Curators', '#', 'custom-label', 'store-div'),
      generateMenuItem('DLC For You', '#', 'custom-label', 'store-div'),
      generateMenuItem('BECAUSE YOU LOVE', '', 'custom-tag', 'store-div'),
      generateMenuItem('Mod', '#', 'custom-label', 'store-div'),
      generateMenuItem('RPG', '#', 'custom-label', 'store-div'),
      generateMenuItem('Dark Fantasy', '#', 'custom-label', 'store-div'),
      generateMenuItem('Free to Play', '#', 'custom-label', 'store-div'),
      generateMenuItem('More Tags for You...', '#', 'custom-label', 'store-div'),
    ],
  },
  'New & Noteworthy': {
    items: [
      generateMenuItem('POPULAR', '', 'custom-tag', 'new-first-div'),
      generateMenuItem('Top Sellers', '#', 'custom-label', 'new-first-div'),
      generateMenuItem('Most Played', '#', 'custom-label', 'new-first-div'),
      generateMenuItem('', '', 'break', 'new-first-div'),
      generateMenuItem('New Releases', '#', 'custom-label', 'new-first-div'),
      generateMenuItem('Upcoming Releases', '#', 'custom-label', 'new-first-div'),
      generateMenuItem('NEWS & UPDATES', '', 'custom-tag', 'new-first-div'),
      generateMenuItem('Recently Updated', '#', 'custom-label', 'new-first-div'),
      generateMenuItem('PROMOS & EVENTS', '', 'custom-tag', 'new-second-div'),
      generateMenuItem('Special Offers', '#', 'custom-label', 'new-second-div'),
      generateMenuItem('Sale Events', '#', 'custom-label', 'new-second-div'),
      generateMenuItem('', '', 'break', 'new-second-div'),
      generateMenuItem('Steam Replay 2022', '#', 'custom-label', 'new-second-div'),
      generateMenuItem('Steam Next Fest', '#', 'custom-label', 'new-second-div'),
    ],
  },
  Categories: {
    items: [
      generateMenuItem('SPECIAL SECTIONS', '', 'custom-tag', 'category-first-div'),
      generateMenuItem('Free to Play', '#', 'custom-label', 'category-first-div'),
      generateMenuItem('Demos', '#', 'custom-label', 'category-first-div'),
      generateMenuItem('Early Access', '#', 'custom-label', 'category-first-div'),
      generateMenuItem('', '', 'break', 'category-first-div'),
      generateMenuItem('Steam Deck', '#', 'custom-label', 'category-first-div'),
      generateMenuItem('Great on Deck', '#', 'custom-label', 'category-first-div'),
      generateMenuItem('', '', 'break', 'category-first-div'),
      generateMenuItem('Controller-Friendly', '#', 'custom-label', 'category-first-div'),
      generateMenuItem('Remote Play', '#', 'custom-label', 'category-first-div'),
      generateMenuItem('', '', 'break', 'category-first-div'),
      generateMenuItem('VR Titles', '#', 'custom-label', 'category-first-div'),
      generateMenuItem('VR Hardware', '#', 'custom-label', 'category-first-div'),
      generateMenuItem('', '', 'break', 'category-first-div'),
      generateMenuItem('Software', '#', 'custom-label', 'category-first-div'),
      generateMenuItem('Soundtracks', '#', 'custom-label', 'category-first-div'),
      generateMenuItem('', '', 'break', 'category-first-div'),
      generateMenuItem('macOS', '#', 'custom-label', 'category-first-div'),
      generateMenuItem('SteamOS + Linux', '#', 'custom-label', 'category-first-div'),
      generateMenuItem('For PC Cafés', '#', 'custom-label', 'category-first-div'),
      generateMenuItem('GENRES', '', 'custom-tag', 'category-second-div'),
      generateMenuItem('Action', '#', 'custom-label', 'category-second-div', 'first-special-title'),
      generateMenuItem('Arcade & Rhythm', '#', 'custom-label', 'category-second-div'),
      generateMenuItem('Fighting & Martial Arts', '#', 'custom-label', 'category-second-div'),
      generateMenuItem('First-Person Shooter', '#', 'custom-label', 'category-second-div'),
      generateMenuItem('Hack & Slash', '#', 'custom-label', 'category-second-div'),
      generateMenuItem('Platformer & Runner', '#', 'custom-label', 'category-second-div'),
      generateMenuItem('Third-Person Shooter', '#', 'custom-label', 'category-second-div'),
      generateMenuItem('shmup', '#', 'custom-label', 'category-second-div'),
      generateMenuItem(
        'Adventure',
        '#',
        'custom-label',
        'category-second-div',
        'fourth-special-title'
      ),
      generateMenuItem('Adventure RPG', '#', 'custom-label', 'category-second-div'),
      generateMenuItem('Casual', '#', 'custom-label', 'category-second-div'),
      generateMenuItem('Hidden Object', '#', 'custom-label', 'category-second-div'),
      generateMenuItem('Metroidvania', '#', 'custom-label', 'category-second-div'),
      generateMenuItem('Puzzle', '#', 'custom-label', 'category-second-div'),
      generateMenuItem('Story-Rich', '#', 'custom-label', 'category-second-div'),
      generateMenuItem('Visual Novel', '#', 'custom-label', 'category-second-div'),
      generateMenuItem(
        'Role-Playing',
        '#',
        'custom-label',
        'category-third-div',
        'second-special-title'
      ),
      generateMenuItem('Action RPG', '#', 'custom-label', 'category-third-div'),
      generateMenuItem('Adventure RPG', '#', 'custom-label', 'category-third-div'),
      generateMenuItem('JRPG', '#', 'custom-label', 'category-third-div'),
      generateMenuItem('Party-Based', '#', 'custom-label', 'category-third-div'),
      generateMenuItem('Rogue-Like', '#', 'custom-label', 'category-third-div'),
      generateMenuItem('Strategy RPG', '#', 'custom-label', 'category-third-div'),
      generateMenuItem('Turn-Based', '#', 'custom-label', 'category-third-div'),
      generateMenuItem(
        'Simulation',
        '#',
        'custom-label',
        'category-third-div',
        'fifth-special-title'
      ),
      generateMenuItem('Building & Automation', '#', 'custom-label', 'category-third-div'),
      generateMenuItem('Dating', '#', 'custom-label', 'category-third-div'),
      generateMenuItem('Farming & Crafting', '#', 'custom-label', 'category-third-div'),
      generateMenuItem('Hobby & Job', '#', 'custom-label', 'category-third-div'),
      generateMenuItem('Life & Immersive', '#', 'custom-label', 'category-third-div'),
      generateMenuItem('Sandbox & Physics', '#', 'custom-label', 'category-third-div'),
      generateMenuItem('Space & Flight', '#', 'custom-label', 'category-third-div'),
      generateMenuItem(
        'Strategy',
        '#',
        'custom-label',
        'category-fourth-div',
        'third-special-title'
      ),
      generateMenuItem('Card & Board', '#', 'custom-label', 'category-fourth-div'),
      generateMenuItem('City & Settlement', '#', 'custom-label', 'category-fourth-div'),
      generateMenuItem('Grand & 4X', '#', 'custom-label', 'category-fourth-div'),
      generateMenuItem('Military', '#', 'custom-label', 'category-fourth-div'),
      generateMenuItem('Real-Time Strategy', '#', 'custom-label', 'category-fourth-div'),
      generateMenuItem('Tower Defense', '#', 'custom-label', 'category-fourth-div'),
      generateMenuItem('Turn-Based Strategy', '#', 'custom-label', 'category-fourth-div'),
      generateMenuItem(
        'Sports & Racing',
        '#',
        'custom-label',
        'category-fourth-div',
        'sixth-special-title'
      ),
      generateMenuItem('All Sports', '#', 'custom-label', 'category-fourth-div'),
      generateMenuItem('Fishing & Hunting', '#', 'custom-label', 'category-fourth-div'),
      generateMenuItem('Individual Sports', '#', 'custom-label', 'category-fourth-div'),
      generateMenuItem('Racing', '#', 'custom-label', 'category-fourth-div'),
      generateMenuItem('Racing Sim', '#', 'custom-label', 'category-fourth-div'),
      generateMenuItem('Sports Sim', '#', 'custom-label', 'category-fourth-div'),
      generateMenuItem('Team Sports', '#', 'custom-label', 'category-fourth-div'),
      generateMenuItem('THEMES', '', 'custom-tag', 'category-fifth-div'),
      generateMenuItem('Anime', '#', 'custom-label', 'category-fifth-div'),
      generateMenuItem('Horror', '#', 'custom-label', 'category-fifth-div'),
      generateMenuItem('Mystery & Detective', '#', 'custom-label', 'category-fifth-div'),
      generateMenuItem('Open World', '#', 'custom-label', 'category-fifth-div'),
      generateMenuItem('Sci-Fi & Cyberpunk', '#', 'custom-label', 'category-fifth-div'),
      generateMenuItem('Space', '#', 'custom-label', 'category-fifth-div'),
      generateMenuItem('Survival', '#', 'custom-label', 'category-fifth-div'),
      generateMenuItem('', '', '', 'category-fifth-div'),
      generateMenuItem('SPECIAL SECTIONS', '', 'custom-tag', 'category-fifth-div'),
      generateMenuItem('Co-Operative', '#', 'custom-label', 'category-fifth-div'),
      generateMenuItem('LAN', '#', 'custom-label', 'category-fifth-div'),
      generateMenuItem('Local & Party', '#', 'custom-label', 'category-fifth-div'),
      generateMenuItem('MMO', '#', 'custom-label', 'category-fifth-div'),
      generateMenuItem('Multiplayer', '#', 'custom-label', 'category-fifth-div'),
      generateMenuItem('Online Competitive', '#', 'custom-label', 'category-fifth-div'),
      generateMenuItem('Singleplayer', '#', 'custom-label', 'category-fifth-div'),
    ],
  },
};

export default menuData;
