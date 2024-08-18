import type { Game } from 'types/game.types';

const gameData: Game[] = [
  //1- PUBG: BATTLEGROUNDS
  {
    id: 1,
    name: 'PUBG: BATTLEGROUNDS',
    category: 'Free to Play Games',
    description:
      'Play PUBG: BATTLEGROUNDS for free. Land on strategic locations, loot weapons and supplies, and survive to become the last team standing across various, diverse Battlegrounds. Squad up and join the Battlegrounds for the original Battle Royale experience that only PUBG: BATTLEGROUNDS can offer.',
    releaseDate: new Date('21 Dec 2017'),
    featured: true,
    developers: [{ id: 1, name: 'KRAFTON, Inc.', website: 'https://krafton.com' }],
    publishers: [{ id: 1, name: 'KRAFTON, Inc.', website: 'https://krafton.com' }],
    thumbnailEntries: {
      mainImage: 'https://cdn.akamai.steamstatic.com/steam/apps/578080/capsule_616x353.jpg',
      horizontalHeaderImage: 'https://cdn.cloudflare.steamstatic.com/steam/apps/578080/header.jpg',
      verticalHeaderImage: 'https://cdn.akamai.steamstatic.com/steam/apps/578080/hero_capsule.jpg',
      smallHeaderImage:
        'https://cdn.cloudflare.steamstatic.com/steam/apps/578080/header_292x136.jpg',
      backgroundImage:
        'https://cdn.akamai.steamstatic.com/steam/apps/578080/page_bg_generated_v6b.jpg',
      menuImg: 'https://cdn.cloudflare.steamstatic.com/steam/apps/578080/capsule_231x87.jpg',
      searchImage: 'https://cdn.cloudflare.steamstatic.com/steam/apps/578080/capsule_sm_120.jpg',
      tabImage: 'https://cdn.akamai.steamstatic.com/steam/apps/578080/capsule_184x69.jpg',
    },
    imageEntries: [
      {
        order: 3,
        link: 'https://cdn.akamai.steamstatic.com/steam/apps/578080/ss_2da334ea597d9588aaa8c716d71b3c2e60a69853.1920x1080.jpg',
        featured: true,
      },
      {
        order: 4,
        link: 'https://cdn.akamai.steamstatic.com/steam/apps/578080/ss_fe5340f8ea6e0d2f3899ef1e7d2ebdfc07e32f67.1920x1080.jpg',
        featured: true,
      },
      {
        order: 5,
        link: 'https://cdn.akamai.steamstatic.com/steam/apps/578080/ss_1fc0cca99883a1dbaeaadfffc1492f81e4e77d32.1920x1080.jpg',
        featured: true,
      },
      {
        order: 6,
        link: 'https://cdn.akamai.steamstatic.com/steam/apps/578080/ss_66e156cf716e72096c15c132c3443e774cb2f9a5.1920x1080.jpg',
        featured: true,
      },
      {
        order: 7,
        link: 'https://cdn.akamai.steamstatic.com/steam/apps/578080/ss_63bb4a659968c3417ddd2ea5fd82cd2143e458a0.1920x1080.jpg',
      },
      {
        order: 8,
        link: 'https://cdn.akamai.steamstatic.com/steam/apps/578080/ss_3857268f02113c5095ff7bc73f814bd80ade8c2e.1920x1080.jpg',
      },
      {
        order: 9,
        link: 'https://cdn.akamai.steamstatic.com/steam/apps/578080/ss_034714c0f118657ac694c5b9c43bb647ed9ec051.1920x1080.jpg',
      },
      {
        order: 10,
        link: 'https://cdn.akamai.steamstatic.com/steam/apps/578080/ss_0ed7a688a11af33acc56a453d2c8274890cc83db.1920x1080.jpg',
      },
      {
        order: 11,
        link: 'https://cdn.akamai.steamstatic.com/steam/apps/578080/ss_f148e1cd44da2972d1b61da1e12b7b3587c1f6a3.1920x1080.jpg',
      },
      {
        order: 12,
        link: 'https://cdn.akamai.steamstatic.com/steam/apps/578080/ss_c2456a0981b61eca4e84d3ff62fff6c78d61a6d0.1920x1080.jpg',
      },
      {
        order: 13,
        link: 'https://cdn.akamai.steamstatic.com/steam/apps/578080/ss_23af2e59855a833c22d0c11ca23a719f54a554ff.1920x1080.jpg',
      },
      {
        order: 14,
        link: 'https://cdn.akamai.steamstatic.com/steam/apps/578080/ss_8814c071f0cce53821d8e1b1a96de78d00e5d4d1.1920x1080.jpg',
      },
      {
        order: 15,
        link: 'https://cdn.akamai.steamstatic.com/steam/apps/578080/ss_109d7072cf85f5b3b1e3dacadf3009718db451c4.1920x1080.jpg',
      },
      {
        order: 16,
        link: 'https://cdn.akamai.steamstatic.com/steam/apps/578080/ss_4bbcaeac1ef977d962c60c1a5e4675cdd81de564.1920x1080.jpg',
      },
      {
        order: 17,
        link: 'https://cdn.akamai.steamstatic.com/steam/apps/578080/ss_c49417566f70eec8bf0ddbb2956b235d91504a09.1920x1080.jpg',
      },
      {
        order: 18,
        link: 'https://cdn.akamai.steamstatic.com/steam/apps/578080/ss_0985fff929498a15793fc3df766607fb54bf5338.1920x1080.jpg',
      },
      {
        order: 19,
        link: 'https://cdn.akamai.steamstatic.com/steam/apps/578080/ss_4454f310776c626a76baeca2d05fd82bd17c6ee0.1920x1080.jpg',
      },
      {
        order: 20,
        link: 'https://cdn.akamai.steamstatic.com/steam/apps/578080/ss_e34bcd20c7e3f5244c17b5af5d192b2149e11d33.1920x1080.jpg',
      },
    ],
    videoEntries: [
      {
        order: 1,
        link: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256940388/movie480_vp9.webm',
        posterLink: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256940388/movie.293x165.jpg',
      },
      {
        order: 2,
        link: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256919601/movie480_vp9.webm',
        posterLink: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256919601/movie.293x165.jpg',
      },
    ],
    tags: [
      { id: 1, name: 'Survival' },
      { id: 2, name: 'Shooter' },
      { id: 3, name: 'Battle Royale' },
      { id: 4, name: 'Multiplayer' },
      { id: 5, name: 'FPS' },
      { id: 6, name: 'PvP' },
      { id: 7, name: 'Third-Person Shooter' },
      { id: 8, name: 'Action' },
      { id: 9, name: 'Online Co-Op' },
      { id: 10, name: 'Tactical' },
      { id: 11, name: 'Co-op' },
      { id: 12, name: 'First-Person' },
      { id: 13, name: 'Strategy' },
      { id: 14, name: 'Early Access' },
      { id: 15, name: 'Competitive' },
      { id: 16, name: 'Third Person' },
      { id: 17, name: 'Team-Based' },
      { id: 18, name: 'Difficult' },
      { id: 19, name: 'Simulation' },
    ],
    pricing: {
      id: 1,
      free: true,
      basePrice: 0.0,
      discount: false,
      discountPercentage: undefined,
      discountPrice: undefined,
      discountStartDate: undefined,
      discountEndDate: undefined,
      offerType: undefined,
      price: 0.0,
    },
    gamesFeatures: [
      {
        id: 1,
        link: 'https://store.steampowered.com/search/?category2=36',
        icon: {
          data: 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAABhJREFUeNpiZGBgAACAEJQFwQAAAAB3RJTUUH4wMzCQwCQYgQJgRbXgAAAABJRU5ErkJggg==',
        },
        name: 'Online PvP',
      },
      {
        id: 2,
        link: 'https://store.steampowered.com/search/?category2=15',
        icon: {
          data: 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAABhJREFUeNpiZGBgAACAEJQFwQAAAAB3RJTUUH4wMzCQwCQYgQJgRbXgAAAABJRU5ErkJggg==',
        },
        name: 'Stats',
      },
      {
        id: 3,
        link: 'https://store.steampowered.com/search/?category2=41',
        icon: {
          data: 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAABhJREFUeNpiZGBgAACAEJQFwQAAAAB3RJTUUH4wMzCQwCQYgQJgRbXgAAAABJRU5ErkJggg==',
        },
        name: 'Remote Play on Phone',
      },
      {
        id: 4,
        link: 'https://store.steampowered.com/search/?category2=42',
        icon: {
          data: 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAABhJREFUeNpiZGBgAACAEJQFwQAAAAB3RJTUUH4wMzCQwCQYgQJgRbXgAAAABJRU5ErkJggg==',
        },
        name: 'Remote Play on Tablet',
      },
    ],
    languages: [
      { id: 1, name: 'English' },
      { id: 2, name: 'Arabic' },
      { id: 3, name: 'Japanese' },
      { id: 4, name: 'Russian' },
      { id: 5, name: 'Simplified Chinese' },
      { id: 6, name: 'Korean' },
      { id: 7, name: 'French' },
      { id: 8, name: 'German' },
      { id: 9, name: 'Spanish' },
      { id: 10, name: 'Polish' },
      { id: 12, name: 'Portguese' },
      { id: 13, name: 'Turkish' },
      { id: 14, name: 'Thai' },
      { id: 15, name: 'Italian' },
      { id: 16, name: 'Traditional Chinese' },
      { id: 17, name: 'Ukrainian' },
    ],
    languageSupport: [
      { name: 'English', interface: true, fullAudio: true, subtitles: false },
      { name: 'Arabic', interface: true, fullAudio: false, subtitles: false },
      { name: 'Japanese', interface: true, fullAudio: false, subtitles: false },
      { name: 'Russian', interface: true, fullAudio: false, subtitles: false },
      { name: 'Simplified Chinese', interface: true, fullAudio: false, subtitles: false },
      { name: 'Korean', interface: true, fullAudio: false, subtitles: false },
      { name: 'French', interface: true, fullAudio: false, subtitles: false },
      { name: 'German', interface: true, fullAudio: false, subtitles: false },
      { name: 'Spanish', interface: true, fullAudio: false, subtitles: false },
      { name: 'Polish', interface: true, fullAudio: false, subtitles: false },
      { name: 'Portguese', interface: true, fullAudio: false, subtitles: false },
      { name: 'Turkish', interface: true, fullAudio: false, subtitles: false },
      { name: 'Thai', interface: true, fullAudio: false, subtitles: false },
      { name: 'Italian', interface: true, fullAudio: false, subtitles: false },
      { name: 'Traditional Chinese', interface: true, fullAudio: false, subtitles: false },
      { name: 'Ukrainian', interface: true, fullAudio: false, subtitles: false },
    ],
    platformEntries: {
      win: true,
      mac: true,
    },
    link: 'https://www.pubg.com',
    // You can use your own HTML and CSS but scripts are not allowed for security reasons
    about: `<strong>LAND, LOOT, SURVIVE!</strong>
		<br>
		Play PUBG: BATTLEGROUNDS for free.<br>Land on strategic locations, loot weapons and supplies, and survive to become the last team standing across various, diverse Battlegrounds.
		<br>
		Squad up and join the Battlegrounds for the original Battle Royale experience that only&nbsp;PUBG: BATTLEGROUNDS can offer.
		<br>
		<br>
		This content download will also provide access to the BATTLEGROUNDS Test Server, which requires a separate download to play.&nbsp;
		<br>
		Optional in-game purchases available.`,
    mature: true,
    matureDescription: `<p>The developers describe the content like this:</p>
		<p><i>This Game may contain content not appropriate for all ages, or may not be appropriate for viewing at work: Frequent Violence or Gore, General Mature Content</i></p>`,
    systemRequirements: {
      req64: true,
      mini: {
        os: '64-bit Windows 10',
        cpu: 'Intel Core i5-4430 / AMD FX-6300',
        ram: '8 GB RAM',
        gpu: 'NVIDIA GeForce GTX 960 2GB / AMD Radeon R7 370 2GB',
        dx: 'Version 11',
        network: 'Broadband Internet connection',
        storage: '40 GB available space',
      },
      recommended: {
        os: '64-bit Windows 10',
        cpu: 'Intel Core i5-6600K / AMD Ryzen 5 1600',
        ram: '16 GB RAM',
        gpu: 'NVIDIA GeForce GTX 1060 3GB / AMD Radeon RX 580 4GB',
        dx: 'Version 11',
        network: 'Broadband Internet connection',
        storage: '50 GB available space',
      },
    },
    legal: `© 2017 KRAFTON, Inc. <br />
		PUBG: BATTLEGROUNDS Korea and PUBG are registered trademarks or service marks of KRAFTON, Inc.`,
    reviews: [],
    totalSales: 0,
    averageRating: 0,
    reviewsCount: 0,
  },
  {
    id: 2,
    name: 'NARAKA: BLADEPOINT',
    category: 'Free to Play Games',
    description:
      'Dive into the legends of the Far East in NARAKA: BLADEPOINT; team up with friends in fast-paced melee fights for a Battle Royale experience unlike any other. Find your playstyle with a varied cast of heroes with unique skills. More than 20 million players have already joined the fray, play free now!',
    releaseDate: new Date('21 Aug 2021'),
    featured: false,
    developers: [{ id: 1, name: '24 Entertainment', website: 'https://www.24ent.com' }],
    publishers: [{ id: 1, name: 'NetEase Games Global', website: 'https://www.neteasegames.com' }],
    thumbnailEntries: {
      mainImage: 'https://cdn.akamai.steamstatic.com/steam/apps/1203220/capsule_616x353.jpg',
      horizontalHeaderImage: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1203220/header.jpg',
      verticalHeaderImage: 'https://cdn.akamai.steamstatic.com/steam/apps/1203220/hero_capsule.jpg',
      smallHeaderImage:
        'https://cdn.cloudflare.steamstatic.com/steam/apps/1203220/header_292x136.jpg',
      backgroundImage:
        'https://cdn.akamai.steamstatic.com/steam/apps/1203220/page_bg_generated_v6b.jpg',
      menuImg: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1203220/capsule_231x87.jpg',
      searchImage: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1203220/capsule_sm_120.jpg',
      tabImage: 'https://cdn.akamai.steamstatic.com/steam/apps/1203220/capsule_184x69.jpg',
    },
    imageEntries: [
      {
        order: 1,
        link: 'https://cdn.akamai.steamstatic.com/steam/apps/1203220/ss_01.jpg',
        featured: true,
      },
      {
        order: 2,
        link: 'https://cdn.akamai.steamstatic.com/steam/apps/1203220/ss_02.jpg',
        featured: true,
      },
      {
        order: 3,
        link: 'https://cdn.akamai.steamstatic.com/steam/apps/1203220/ss_03.jpg',
        featured: true,
      },
      {
        order: 4,
        link: 'https://cdn.akamai.steamstatic.com/steam/apps/1203220/ss_04.jpg',
        featured: true,
      },
      {
        order: 5,
        link: 'https://cdn.akamai.steamstatic.com/steam/apps/1203220/ss_05.jpg',
      },
      // Additional images can be added here
    ],
    videoEntries: [
      {
        order: 1,
        link: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1203220/video1.mp4',
        posterLink: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1203220/video1_poster.jpg',
      },
      {
        order: 2,
        link: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1203220/video2.mp4',
        posterLink: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1203220/video2_poster.jpg',
      },
      // Additional videos can be added here
    ],
    tags: [
      { id: 1, name: 'Battle Royale' },
      { id: 2, name: 'Multiplayer' },
      { id: 3, name: 'PvP' },
      { id: 4, name: 'Action' },
      { id: 5, name: 'Survival' },
      { id: 6, name: 'Character Customization' },
      // Additional tags can be added here
    ],
    pricing: {
      id: 1,
      free: true,
      basePrice: 0.0,
      discount: false,
      discountPercentage: undefined,
      discountPrice: undefined,
      discountStartDate: undefined,
      discountEndDate: undefined,
      offerType: undefined,
      price: 0.0,
    },
    gamesFeatures: [
      {
        id: 1,
        link: 'https://www.naraka.com/features/pvp',
        icon: Buffer.from(
          'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAABhJREFUeNpiZGBgAACAEJQFwQAAAAB3RJTUUH4wMzCQwCQYgQJgRbXgAAAABJRU5ErkJggg=='
        ),
        name: 'Online PvP',
      },
      {
        id: 2,
        link: 'https://www.naraka.com/features/character-customization',
        icon: Buffer.from(
          'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAABhJREFUeNpiZGBgAACAEJQFwQAAAAB3RJTUUH4wMzCQwCQYgQJgRbXgAAAABJRU5ErkJggg=='
        ),
        name: 'Character Customization',
      },
      // Additional features can be added here
    ],
    languages: [
      { id: 1, name: 'English' },
      { id: 2, name: 'Chinese' },
      // Additional languages can be added here
    ],
    languageSupport: [
      { name: 'English', interface: true, fullAudio: true, subtitles: true },
      { name: 'Chinese', interface: true, fullAudio: false, subtitles: true },
      // Additional language support entries can be added here
    ],
    platformEntries: {
      win: true,
      mac: false,
    },
    link: 'https://www.naraka.com',
    about:
      '<strong>UNLEASH YOUR LEGEND!</strong><br>Join the fast-paced melee combat of NARAKA: BLADEPOINT. With diverse heroes and strategic gameplay, experience the ultimate Battle Royale.',
    mature: false,
    matureDescription:
      '<p>The developers describe the content like this:</p><p><i>This Game may contain content not appropriate for all ages: Mild Violence</i></p>',
    systemRequirements: {
      req64: true,
      mini: {
        os: '64-bit Windows 7',
        cpu: 'Intel Core i5-4430 / AMD FX-6300',
        ram: '8 GB RAM',
        gpu: 'NVIDIA GeForce GTX 960 / AMD Radeon R7 370',
        dx: 'Version 11',
        network: 'Broadband Internet connection',
        storage: '20 GB available space',
      },
      recommended: {
        os: '64-bit Windows 10',
        cpu: 'Intel Core i5-6600 / AMD Ryzen 5 1600',
        ram: '16 GB RAM',
        gpu: 'NVIDIA GeForce GTX 1060 / AMD Radeon RX 580',
        dx: 'Version 11',
        network: 'Broadband Internet connection',
        storage: '30 GB available space',
      },
    },
    legal:
      '© 2021 24 Entertainment. NARAKA: BLADEPOINT is a registered trademark of 24 Entertainment.',
    reviews: [],
    totalSales: 0,
    averageRating: 0,
    reviewsCount: 0,
  },
];

export default gameData;
