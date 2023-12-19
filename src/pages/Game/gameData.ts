export type MovieEntry = VideoEntry | ImageEntry;
export interface VideoEntry { type: "video", link: string, posterLink: string }
export interface ImageEntry { type: "image", link: string }
export interface FeatureEntry { link: string, icon: string, label: string }
export interface LanguageEntry { name: string, interface: boolean, fullAudio: boolean, subtitles: boolean }
export interface SystemRequirements {
  req64?: boolean;
  mini: SystemRequirementsDetails;
  recommended: SystemRequirementsDetails;
}
export interface SystemRequirementsDetails {
  os: string;
  cpu: string;
  ram: string;
  gpu: string;
  dx: string;
  network?: string;
  storage?: string;
  additionalNotes?: string;
  soundCard?: string;
}

export interface ReviewEntry {user: string, type: "negative" | "positive", date: string, content: string }

export interface gamesData {
  id: string;
  name: string;
  category: string;
  description: string;
  releaseDate: string;
  developer: { name: string, link: string };
  publisher: { name: string, link: string };
  mainImage: string;
  backgroundImage: string;
  menuImg: string;
  headerImage: string;
  moviesAndImages: MovieEntry[];
  reason?: "available" | "recommended";
  tags: string[];
  discount: "no-discount" | "discount";
  discountPercentage?: string;
  free: boolean;
  price: string;
  offerType?: string;
  offerEndDate?: string;
  discountPrice?: string;
  win: string;
  mac?: string;
  features: FeatureEntry[];
  languages: LanguageEntry[];
  link?: string;
  about: string;
  mature: boolean;
  matureDescription: string;
  req: SystemRequirements;
  legal?: string;
  reviews: ReviewEntry[];
}

const gameData: gamesData[] = [
  //1- PUBG: BATTLEGROUNDS
  {
    id: "1",
    name: "PUBG: BATTLEGROUNDS",
    category: "Free to Play Games",
    description: "Play PUBG: BATTLEGROUNDS for free. Land on strategic locations, loot weapons and supplies, and survive to become the last team standing across various, diverse Battlegrounds. Squad up and join the Battlegrounds for the original Battle Royale experience that only PUBG: BATTLEGROUNDS can offer.",
    releaseDate: "21 Dec, 2017",
    developer: { name: "KRAFTON, Inc.", link: ""},
    publisher: { name: "KRAFTON, Inc.", link: ""},
    mainImage:"https://cdn.akamai.steamstatic.com/steam/apps/578080/capsule_616x353.jpg",
    headerImage: "https://cdn.cloudflare.steamstatic.com/steam/apps/578080/header.jpg",
    backgroundImage: "https://cdn.akamai.steamstatic.com/steam/apps/578080/page_bg_generated_v6b.jpg",
    menuImg: "https://cdn.cloudflare.steamstatic.com/steam/apps/578080/capsule_231x87.jpg",
    moviesAndImages: [
      {
        type: "video",
        link: "https://cdn.cloudflare.steamstatic.com/steam/apps/256940388/movie480_vp9.webm",
        posterLink:
          "https://cdn.cloudflare.steamstatic.com/steam/apps/256940388/movie.293x165.jpg",
      },
      {
        type: "video",
        link: "https://cdn.cloudflare.steamstatic.com/steam/apps/256919601/movie480_vp9.webm",
        posterLink:
          "https://cdn.cloudflare.steamstatic.com/steam/apps/256919601/movie.293x165.jpg",
      },
      { type: "image", link: "https://cdn.akamai.steamstatic.com/steam/apps/578080/ss_2da334ea597d9588aaa8c716d71b3c2e60a69853.1920x1080.jpg"},
      { type: "image", link: "https://cdn.akamai.steamstatic.com/steam/apps/578080/ss_fe5340f8ea6e0d2f3899ef1e7d2ebdfc07e32f67.1920x1080.jpg"},
      { type: "image", link: "https://cdn.akamai.steamstatic.com/steam/apps/578080/ss_1fc0cca99883a1dbaeaadfffc1492f81e4e77d32.1920x1080.jpg"},
      { type: "image", link: "https://cdn.akamai.steamstatic.com/steam/apps/578080/ss_66e156cf716e72096c15c132c3443e774cb2f9a5.1920x1080.jpg"},
      { type: "image", link: "https://cdn.akamai.steamstatic.com/steam/apps/578080/ss_63bb4a659968c3417ddd2ea5fd82cd2143e458a0.1920x1080.jpg"},
      { type: "image", link: "https://cdn.akamai.steamstatic.com/steam/apps/578080/ss_3857268f02113c5095ff7bc73f814bd80ade8c2e.1920x1080.jpg"},
      { type: "image", link: "https://cdn.akamai.steamstatic.com/steam/apps/578080/ss_034714c0f118657ac694c5b9c43bb647ed9ec051.1920x1080.jpg"},
      { type: "image", link: "https://cdn.akamai.steamstatic.com/steam/apps/578080/ss_0ed7a688a11af33acc56a453d2c8274890cc83db.1920x1080.jpg"},
      { type: "image", link: "https://cdn.akamai.steamstatic.com/steam/apps/578080/ss_f148e1cd44da2972d1b61da1e12b7b3587c1f6a3.1920x1080.jpg"},
      { type: "image", link: "https://cdn.akamai.steamstatic.com/steam/apps/578080/ss_c2456a0981b61eca4e84d3ff62fff6c78d61a6d0.1920x1080.jpg"},
      { type: "image", link: "https://cdn.akamai.steamstatic.com/steam/apps/578080/ss_23af2e59855a833c22d0c11ca23a719f54a554ff.1920x1080.jpg"},
      { type: "image", link: "https://cdn.akamai.steamstatic.com/steam/apps/578080/ss_8814c071f0cce53821d8e1b1a96de78d00e5d4d1.1920x1080.jpg"},
      { type: "image", link: "https://cdn.akamai.steamstatic.com/steam/apps/578080/ss_109d7072cf85f5b3b1e3dacadf3009718db451c4.1920x1080.jpg"},
      { type: "image", link: "https://cdn.akamai.steamstatic.com/steam/apps/578080/ss_4bbcaeac1ef977d962c60c1a5e4675cdd81de564.1920x1080.jpg"},
      { type: "image", link: "https://cdn.akamai.steamstatic.com/steam/apps/578080/ss_c49417566f70eec8bf0ddbb2956b235d91504a09.1920x1080.jpg"},
      { type: "image", link: "https://cdn.akamai.steamstatic.com/steam/apps/578080/ss_0985fff929498a15793fc3df766607fb54bf5338.1920x1080.jpg"},
      { type: "image", link: "https://cdn.akamai.steamstatic.com/steam/apps/578080/ss_4454f310776c626a76baeca2d05fd82bd17c6ee0.1920x1080.jpg"},
      { type: "image", link: "https://cdn.akamai.steamstatic.com/steam/apps/578080/ss_e34bcd20c7e3f5244c17b5af5d192b2149e11d33.1920x1080.jpg"},
    ],
    reason: "available", // "available" or "recommended"
    discount: "no-discount", // "discount" or "no-discount"
    free: true,
    price: "Free to Play",
    // offerType: "",
    // offerEndDate: "",
    // discountPrice:"",
    // discountPercentage: "",
    tags: ["Battle Royal", "Multiplayer", "Martial Arts", "PvP"], // Array of tags
    win: "platform-image win",
    // mac: "platform-image mac", // Comment the varibale if the platform is not available
    features: [
      { link: "https://store.steampowered.com/search/?category2=36", icon: "/images/ico_multiPlayer.png", label: "Online PvP"},
      { link: "https://store.steampowered.com/search/?category2=15", icon: "/images/ico_stats.png",       label: "Stats"},
      { link: "https://store.steampowered.com/search/?category2=41", icon: "/images/ico_remote_play.png", label: "Remote Play on Phone"},
      { link: "https://store.steampowered.com/search/?category2=42", icon: "/images/ico_remote_play.png", label: "Remote Play on Tablet"},
    ],
    languages: [
      { name: "English",             interface: true, fullAudio: true,  subtitles: false },
      { name: "Arabic",              interface: true, fullAudio: false, subtitles: false },
      { name: "Japanese",            interface: true, fullAudio: false, subtitles: false },
      { name: "Russian",             interface: true, fullAudio: false, subtitles: false },
      { name: "Simplified Chinese",  interface: true, fullAudio: false, subtitles: false },
      { name: "Korean",              interface: true, fullAudio: false, subtitles: false },
      { name: "French",              interface: true, fullAudio: false, subtitles: false },
      { name: "German",              interface: true, fullAudio: false, subtitles: false },
      { name: "Spanish",             interface: true, fullAudio: false, subtitles: false },
      { name: "Polish",              interface: true, fullAudio: false, subtitles: false },
      { name: "Portguese",           interface: true, fullAudio: false, subtitles: false },
      { name: "Turkish",             interface: true, fullAudio: false, subtitles: false },
      { name: "Thai",                interface: true, fullAudio: false, subtitles: false },
      { name: "Italian",             interface: true, fullAudio: false, subtitles: false },
      { name: "Traditional Chinese", interface: true, fullAudio: false, subtitles: false },
      { name: "Ukrainian",           interface: true, fullAudio: false, subtitles: false },
    ],
    link: "https://www.pubg.com",
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
    req: {
      req64: true,
      mini: {
        os: "64-bit Windows 10",
        cpu: "Intel Core i5-4430 / AMD FX-6300",
        ram: "8 GB RAM",
        gpu: "NVIDIA GeForce GTX 960 2GB / AMD Radeon R7 370 2GB",
        dx: "Version 11",
        network: "Broadband Internet connection",
        storage: "40 GB available space",
      },
      recommended: {
        os: "64-bit Windows 10",
        cpu: "Intel Core i5-6600K / AMD Ryzen 5 1600",
        ram: "16 GB RAM",
        gpu: "NVIDIA GeForce GTX 1060 3GB / AMD Radeon RX 580 4GB",
        dx: "Version 11",
        network: "Broadband Internet connection",
        storage: "50 GB available space",
      }
    },
    legal: `© 2017 KRAFTON, Inc. <br />
    PUBG: BATTLEGROUNDS Korea and PUBG are registered trademarks or service marks of KRAFTON, Inc.`,
    reviews: [
      {user:"ibrahim", type:"negative", date: "1/12/2022", content:"bad game"},
      {user:"Mazen", type:"negative", date: "2/12/2022", content:"meh game"},
      {user:"mrCringe", type:"positive", date: "3/12/2022", content:"WOW BEST GAME EVERRRRRR!!!!"},
      {user:"Player20", type:"positive", date: "4/12/2022", content:"kinda good game"},
      {user:"Samy", type:"negative", date: "5/12/2022", content:"bg"},
      {user:"idiotgaming99", type:"positive", date: "6/12/2022", content:"Very nice gameplay and graphics"},
    ]
  },
  //2- NARAKA: BLADEPOINT
  {
    id: "2",
    name: "NARAKA: BLADEPOINT",
    category: "Action Games",
    description: "Dive into the legends of the Far East in NARAKA: BLADEPOINT; team up with friends in fast-paced melee fights for a Battle Royale experience unlike any other. Find your playstyle with a varied cast of heroes with unique skills. More than 20 million players have already joined the fray, play free now!",
    releaseDate: "21 Aug, 2021",
    developer: { name: "24 Entertainment", link: ""},
    publisher: { name: "NetEase Games Global", link: ""},
    mainImage:"https://cdn.akamai.steamstatic.com/steam/apps/1203220/capsule_616x353.jpg",
    headerImage: "https://cdn.cloudflare.steamstatic.com/steam/apps/1203220/header.jpg",
    backgroundImage: "https://cdn.akamai.steamstatic.com/steam/apps/1203220/page_bg_generated_v6b.jpg",
    menuImg: "https://cdn.cloudflare.steamstatic.com/steam/apps/1203220/capsule_231x87.jpg",
    moviesAndImages: [
      {
        type: "video",
        link: "https://cdn.cloudflare.steamstatic.com/steam/apps/256957929/movie480_vp9.webm",
        posterLink:
          "https://cdn.cloudflare.steamstatic.com/steam/apps/256957929/movie.293x165.jpg",
      },
      {
        type: "video",
        link: "https://cdn.cloudflare.steamstatic.com/steam/apps/256982834/movie480_vp9.webm",
        posterLink:
          "https://cdn.cloudflare.steamstatic.com/steam/apps/256982834/movie.293x165.jpg",
      },
      { type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/1203220/ss_fede743af03b94e8ccd8c1d8f156916acdce7723.1920x1080.jpg"},
      { type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/1203220/ss_508b8f677ad0278feea4c74280d3bb8aa1143d7a.1920x1080.jpg"},
      { type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/1203220/ss_c5cbb4fb8fcd71b6fd64f86b3f18dd9f00f11787.1920x1080.jpg"},
      { type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/1203220/ss_96173cebbcc3bbb6202854fccb8aad223f6c5334.1920x1080.jpg"},
      { type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/1203220/ss_e8e6ba2b5ab17a2604e1b2d26f07806a0a27f97e.1920x1080.jpg"},
      { type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/1203220/ss_f031cfa839b5c3048f4bc92233b4c8472a16ef87.1920x1080.jpg"},
      { type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/1203220/ss_8cbd1434b967cdff395a0df9b02d6b6ad2feac4a.1920x1080.jpg"},
      { type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/1203220/ss_68d5f079d8bd32dca66c1514ac00a62341cb49c6.1920x1080.jpg"},
      { type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/1203220/ss_e1f85dd9f79c8579887a1dd3346c2b366feafc08.1920x1080.jpg"},
      { type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/1203220/ss_4e6ce1b347b685dd996a7b354bd0a9fce50159c5.1920x1080.jpg"},
      { type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/1203220/ss_077b47e9b2eaaf1f1417ed48f96b4ac6e0c673fe.1920x1080.jpg"},
      { type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/1203220/ss_2aded40827ab836c40afb555600c9ca8cbd26e87.1920x1080.jpg"},
      { type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/1203220/ss_9b52b6f209db7928077f9f18d12460c71908f9c3.1920x1080.jpg"},
      { type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/1203220/ss_801635e241c3d2bec0305135e33576ac9c18c3ce.1920x1080.jpg"},
    ],
    reason: "available", // "available" or "recommended"
    discount: "no-discount", // "discount" or "no-discount"
    free: true,
    price: "Free to Play",
    // offerType: "",
    // offerEndDate: "",
    // discountPrice:"",
    // discountPercentage: "",
    tags: ["Survival", "Shooter", "Battle Royale", "Multiplayer"], // Array of tags
    win: "platform-image win",
    // mac: "platform-image mac", // Comment the varibale if the platform is not available
    features: [
      { link: "https://store.steampowered.com/search/?category2=36", icon: "/images/ico_multiPlayer.png", label: "Online PvP"},
      { link: "https://store.steampowered.com/search/?category2=35", icon: "/images/ico_cart.png",        label: "In-App Purchases"},
    ],
    languages: [
      { name: "English",             interface: true, fullAudio: true,  subtitles: true },
      { name: "Korean",              interface: true, fullAudio: true,  subtitles: true },
      { name: "Japanese",            interface: true, fullAudio: true,  subtitles: true },
      { name: "Traditional Chinese", interface: true, fullAudio: true,  subtitles: true },
      { name: "Simplified Chinese",  interface: true, fullAudio: true,  subtitles: true },
      { name: "Arabic",              interface: true, fullAudio: false, subtitles: true },
      { name: "French",              interface: true, fullAudio: false, subtitles: true },
      { name: "German",              interface: true, fullAudio: false, subtitles: true },
      { name: "Spanish",             interface: true, fullAudio: false, subtitles: true },
      { name: "Polish",              interface: true, fullAudio: false, subtitles: true },
      { name: "Portguese",           interface: true, fullAudio: false, subtitles: true },
      { name: "Turkish",             interface: true, fullAudio: false, subtitles: true },
      { name: "Thai",                interface: true, fullAudio: false, subtitles: true },
      { name: "Italian",             interface: true, fullAudio: false, subtitles: true },
      { name: "Russian",             interface: true, fullAudio: false, subtitles: true },
      { name: "Ukrainian",           interface: true, fullAudio: false, subtitles: true },
    ],
    link: "www.narakathegame.com",
    // You can use your own HTML and CSS but scripts are not allowed for security reasons
    about: `
    <img src="https://cdn.cloudflare.steamstatic.com/steam/apps/1203220/extras/1.MELEE-FOCUSED-COMBAT.png?t=1700102206">
    <br>
    <img src="https://cdn.cloudflare.steamstatic.com/steam/apps/1203220/extras/MELEE-FOCUSED_COMBAT.gif?t=1700102206">
    <br>
    <br>Dynamic, fast-paced and ever shifting; battle your enemies with punishing combos, parries and grit or outsmart them using lethal counters in an intense mind game.<br><br>
    <br><img src="https://cdn.cloudflare.steamstatic.com/steam/apps/1203220/extras/2.BOUNDLESS-MOVEMENT.png?t=1700102206">
    <br>
    <img src="https://cdn.cloudflare.steamstatic.com/steam/apps/1203220/extras/BOUNDLESS_MOVEMENT.gif?t=1700102206">
    <br>
    <br>
    Wall run, swoop down, and zip across mountains and buildings with ease as you hunt down unsuspecting foes using your grappling hook and parkour skills.
    <br>
    <br>
    <br><img src="https://cdn.cloudflare.steamstatic.com/steam/apps/1203220/extras/3.YOUR-BUILD-YOUR-PLAYSTYLE.png?t=1700102206">
    <br><img src="https://cdn.cloudflare.steamstatic.com/steam/apps/1203220/extras/YOUR_BUILD_YOUR_PLAYSTYLE.gif?t=1700102206"><br><br>Combine a variety of melee and ranged weapons with our cast of powerful heroes, each with customized skills and unique Ultimate moves.
    <br>
    <br>
    <br>
    <img src="https://cdn.cloudflare.steamstatic.com/steam/apps/1203220/extras/4.EASTERN-LEGENDS.png?t=1700102206">
    <br>
    <img src="https://cdn.cloudflare.steamstatic.com/steam/apps/1203220/extras/EASTERN_LEGENDS.gif?t=1700102206">
    <br>
    <br>Travel to the magnificent but dangerous land of Morus and Holoroth, where great battles have shaped a beautiful landscape inspired by Far Eastern legends.`,
    mature: true,
    matureDescription: `<p>The developers describe the content like this:</p>
    <p><i>
    This Game may contain content not appropriate for all ages, or may not be appropriate for viewing at work: Frequent Violence or Gore, General Mature Content				</i>
    </p>`,
    req: {
      req64: true,
      mini: {
        os: "Windows 7 64-bit or newer",
        cpu: "Intel i5 4th generation or AMD FX 6300 or equivalent",
        ram: "8 GB RAM",
        gpu: "NVIDIA GeForce GTX 750TI or equivalent",
        dx: "Version 11",
        network: "Broadband Internet connection",
        storage: "35 GB available space",
        additionalNotes: "a) Can run at 720p/60fps; b) We advise you install the game on an SSD for a more streamlined experience. c) Requires “Windows Memory integrity and VBS enablement” to be disabled"
      },
      recommended: {
        os: "Windows 10 64-bit",
        cpu: "Intel i7 7th generation or equivalent",
        ram: "16 GB RAM",
        gpu: "NVIDIA GeForce GTX 1060 6G or equivalent",
        dx: "Version 11",
        network: "Broadband Internet connection",
        storage: "35 GB available space",
        additionalNotes: "a) Can run at 720p/60fps; b) We advise you install the game on an SSD for a more streamlined experience. c) Requires “Windows Memory integrity and VBS enablement” to be disabled"
      }
    },
    reviews: [
      {user:"ibrahim", type:"positive", date: "4/12/2022", content:"good game"},
      {user:"Mazen", type:"positive", date: "5/12/2022", content:"nicu game"},
      {user:"mrCringe", type:"positive", date: "6/12/2022", content:"WOW EXCELENT GAME!"},
      {user:"Player20", type:"positive", date: "7/12/2022", content:"good game i guess"},
      {user:"Samy", type:"negative", date: "8/12/2022", content:"bg"},
      {user:"idiotgaming99", type:"positive", date: "9/12/2022", content:"Very nice gameplay and graphics"},
    ]
  },
  //3- The Elder Scrolls® Online
  {
    id: "3",
    name: "The Elder Scrolls® Online",
    category: "Massively Multiplayer Games",
    description: "Join over 22 million players in the award-winning online multiplayer RPG and experience limitless adventure in a persistent Elder Scrolls world. Battle, craft, steal, or explore, and combine different types of equipment and abilities to create your own style of play. No game subscription required.",
    releaseDate: "4 Apr, 2014",
    developer: { name: "ZeniMax Online Studios", link: ""},
    publisher: { name: "Bethesda Softworks", link: ""},
    mainImage:"https://cdn.akamai.steamstatic.com/steam/apps/306130/capsule_616x353.jpg",
    headerImage: "https://cdn.cloudflare.steamstatic.com/steam/apps/306130/header.jpg",
    backgroundImage: "https://cdn.akamai.steamstatic.com/steam/apps/306130/page_bg_generated_v6b.jpg",
    menuImg: "https://cdn.cloudflare.steamstatic.com/steam/apps/306130/capsule_231x87.jpg",
    moviesAndImages: [
      {
        type: "video",
        link: "https://cdn.cloudflare.steamstatic.com/steam/apps/256859758/movie480_vp9.webm",
        posterLink:
          "https://cdn.cloudflare.steamstatic.com/steam/apps/256859758/movie.293x165.jpg",
      },
      {
        type: "video",
        link: "https://cdn.cloudflare.steamstatic.com/steam/apps/256848720/movie480_vp9.webm",
        posterLink:
          "https://cdn.cloudflare.steamstatic.com/steam/apps/256848720/movie.293x165.jpg",
      },
      { type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/306130/ss_2b797e150cbb9ad7eec9d9089e79df4adc21e797.1920x1080.jpg"},
      { type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/306130/ss_ae00343059f2751a9bd1385383bc065d6d72a8df.1920x1080.jpg"},
      { type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/306130/ss_5d7230643e643f1d1e87320f93edf109f91c2d6c.1920x1080.jpg"},
      { type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/306130/ss_c21f3be1e15e5fcd0244c6857acd22d37b04d161.1920x1080.jpg"},
      { type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/306130/ss_def2f4813a04b9ab7e8683e4dd9cfdd5326bdb2d.1920x1080.jpg"},
      { type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/306130/ss_8782eebb5fc397cf245c7c366e898bf2ae26b1a0.1920x1080.jpg"},
      {
        type: "video",
        link: "https://cdn.cloudflare.steamstatic.com/steam/apps/256719936/movie480.webm",
        posterLink:
          "https://cdn.cloudflare.steamstatic.com/steam/apps/256719936/movie.293x165.jpg",
      },
    ],
    reason: "available", // "available" or "recommended"
    discount: "no-discount", // "discount" or "no-discount"
    free: false,
    price: "$11.99",
    // offerType: "",
    // offerEndDate: "",
    // discountPrice:"",
    // discountPercentage: "",
    tags: ["RPG", "MMORPG", "Open World", "Adventure", "PvP"], // Array of tags
    win: "platform-image win",
    mac: "platform-image mac", // Comment the varibale if the platform is not available
    features: [
      { link: "https://store.steampowered.com/search/?category2=20", icon: "/images/ico_multiPlayer.png", label: "MMO"},
      { link: "https://store.steampowered.com/search/?category2=36", icon: "/images/ico_multiPlayer.png", label: "Online PvP"},
      { link: "https://store.steampowered.com/search/?category2=38", icon: "/images/ico_coop.png",        label: "Online Co-op"},
      { link: "https://store.steampowered.com/search/?category2=29", icon: "/images/ico_cards.png",       label: "Steam Trading Cards"},
      { link: "https://store.steampowered.com/search/?category2=13", icon: "/images/ico_cc.png",          label: "Captions available"},
      { link: "https://store.steampowered.com/search/?category2=35", icon: "/images/ico_cart.png",        label: "in-App Purchases"},
    ],
    languages: [
      { name: "English",             interface: true, fullAudio: true,  subtitles: true },
      { name: "French",              interface: true, fullAudio: true,  subtitles: true },
      { name: "German",              interface: true, fullAudio: true,  subtitles: true },
      { name: "Russian",             interface: true, fullAudio: false, subtitles: true },
      { name: "Spanish",             interface: true, fullAudio: false, subtitles: true },
      { name: "Simplified Chinese",  interface: true, fullAudio: false, subtitles: true },
    ],
    link: "www.elderscrollsonline.com",
    // You can use your own HTML and CSS but scripts are not allowed for security reasons
    about: `Experience an ever-expanding story across all of Tamriel in The Elder Scrolls Online, an award-winning online RPG. Explore a rich, living world with friends or embark upon a solo adventure. Enjoy complete control over how your character looks and plays, from the weapons you wield to the skills you learn – the choices you make will shape your destiny. Welcome to a world without limits.
    <h2>PLAY THE WAY YOU LIKE</h2>
    Battle, craft, steal, siege, or explore, and combine different types of armor, weapons, and abilities to create your own style of play. The choice is yours to make in a persistent, ever-growing Elder Scrolls world.
    <h2>TELL YOUR OWN STORY</h2>
    Discover the secrets of Tamriel as you set off to regain your lost soul and save the world from Oblivion. Experience any story in any part of the world, in whichever order you choose – with others or alone.
    <h2>A MULTIPLAYER RPG</h2>
    Complete quests with friends, join fellow adventurers to explore dangerous, monster-filled dungeons, or take part in epic PvP battles with hundreds of other players.`,
    mature: true,
    matureDescription: `<p>The developers describe the content like this:</p>
    <p><i>
    Blood and gore<br>
    Sexual themes<br>
    Use of alcohol<br>
    Violence</i>
    </p>`,
    req: {
      req64: true,
      mini: {
        os: "Windows 7 64-bit",
        cpu: "Intel® Core i3 540 or AMD A6-3620 or higher",
        ram: "3 GB RAM",
        gpu: "Direct X 11.0 compliant video card with 1GB RAM (NVidia GeForce 460 or AMD Radeon 6850) 2GB",
        dx: "Version 11",
        network: "Broadband Internet connection",
        storage: "95 GB available space",
        soundCard: "DirectX compatible sound card",
      },
      recommended: {
        os: "Windows 7/Windows 8.1 64-bit",
        cpu: "Intel® Core i5 2300 or AMD FX4350",
        ram: "8 GB RAM",
        gpu: "Direct X 11.0 compliant video card with 2GB RAM (NVIDIA® GeForce® GTX 750 or AMD Radeon™ HD 7850) or higher",
        dx: "Version 11",
        network: "Broadband Internet connection",
        storage: "95 GB available space",
        soundCard: "DirectX compatible sound card",
      }
    },
    legal: `©2015 ZeniMax Media Inc. The Elder Scrolls® Online: Tamriel Unlimited™ developed by ZeniMax Online Studios LLC, a ZeniMax Media company. ZeniMax, The Elder Scrolls, ESO, ESO Plus, Tamriel Unlimited, Bethesda, Bethesda Softworks and related logos are registered trademarks or trademarks of ZeniMax Media Inc. in the US and/or other countries. All Rights Reserved.
    <br><br>
    <a href="https://steamcommunity.com/linkfilter/?u=https%3A%2F%2Fbethesda.net%2Fdocument%2Fprivacy-policy" target="_blank" rel=" noopener">Privacy Policy</a>`,
    reviews: [
      {user:"ibrahim", type:"positive", date: "1/12/2022", content:"good game"},
      {user:"Mazen", type:"positive", date: "2/12/2022", content:"good game"},
      {user:"mrCringe", type:"positive", date: "3/12/2022", content:"BEST MMO GAME EVERRRRRR!!!!"},
      {user:"Player20", type:"positive", date: "4/12/2022", content:"very good game"},
      {user:"Samy", type:"positive", date: "5/12/2022", content:"gg"},
      {user:"idiotgaming99", type:"positive", date: "6/12/2022", content:"Very nice gameplay and graphics"},
    ]
  },
  //4- Red Dead Redemption 2
  {
    id: "4",
    name: "Red Dead Redemption 2",
    category: "Adventure Games",
    description: "Winner of over 175 Game of the Year Awards and recipient of over 250 perfect scores, RDR2 is the epic tale of outlaw Arthur Morgan and the infamous Van der Linde gang, on the run across America at the dawn of the modern age. Also includes access to the shared living world of Red Dead Online.",
    releaseDate: "21 Dec, 2017",
    developer: { name: "Rockstar Games", link: ""},
    publisher: { name: "Rockstar Games", link: ""},
    mainImage:"https://cdn.akamai.steamstatic.com/steam/apps/1174180/capsule_616x353.jpg",
    headerImage: "https://cdn.cloudflare.steamstatic.com/steam/apps/1174180/header.jpg",
    backgroundImage: "https://cdn.akamai.steamstatic.com/steam/apps/1174180/page_bg_generated_v6b.jpg",
    menuImg: "https://cdn.cloudflare.steamstatic.com/steam/apps/1174180/capsule_231x87.jpg",
    moviesAndImages: [
      {
        type: "video",
        link: "https://cdn.cloudflare.steamstatic.com/steam/apps/256768371/movie480.webm",
        posterLink:
          "https://cdn.cloudflare.steamstatic.com/steam/apps/256768371/movie.293x165.jpg",
      },
      {
        type: "video",
        link: "https://cdn.cloudflare.steamstatic.com/steam/apps/256768370/movie480.webm",
        posterLink:
          "https://cdn.cloudflare.steamstatic.com/steam/apps/256768370/movie.293x165.jpg",
      },
      { type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/1174180/ss_66b553f4c209476d3e4ce25fa4714002cc914c4f.1920x1080.jpg"},
      { type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/1174180/ss_bac60bacbf5da8945103648c08d27d5e202444ca.1920x1080.jpg"},
      { type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/1174180/ss_668dafe477743f8b50b818d5bbfcec669e9ba93e.1920x1080.jpg"},
      { type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/1174180/ss_4ce07ae360b166f0f650e9a895a3b4b7bf15e34f.1920x1080.jpg"},
      { type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/1174180/ss_d1a8f5a69155c3186c65d1da90491fcfd43663d9.1920x1080.jpg"},
    ],
    reason: "available", // "available" or "recommended"
    discount: "discount", // "discount" or "no-discount"
    free: false,
    price: "$59.99",
    offerType: "SPECIAL PROMOTION",
    offerEndDate: "21 December",
    discountPrice:"$19.79",
    discountPercentage: "67%",
    tags: ["Open World", "Story Rich", "Westren", "Adventure"], // Array of tags
    win: "platform-image win",
    // mac: "platform-image mac", // Comment the varibale if the platform is not available
    features: [
      { link: "https://store.steampowered.com/search/?category2=2" , icon: "/images/ico_singlePlayer.png",label: "Single-player"},
      { link: "https://store.steampowered.com/search/?category2=36", icon: "/images/ico_multiPlayer.png", label: "Online PvP"},
      { link: "https://store.steampowered.com/search/?category2=38", icon: "/images/ico_coop.png",        label: "Online Co-op"},
      { link: "https://store.steampowered.com/search/?category2=22", icon: "/images/ico_achievements.png",label: "Steam Achievements"},
      { link: "https://store.steampowered.com/search/?category2=35", icon: "/images/ico_cart.png",        label: "in-App Purchases"},
      { link: "https://store.steampowered.com/search/?category2=41", icon: "/images/ico_remote_play.png", label: "Remote Play on Phone"},
      { link: "https://store.steampowered.com/search/?category2=42", icon: "/images/ico_remote_play.png", label: "Remote Play on Tablet"},
    ],
    languages: [
      { name: "English",             interface: true, fullAudio: true,  subtitles: false },
      { name: "Japanese",            interface: true, fullAudio: false, subtitles: false },
      { name: "Russian",             interface: true, fullAudio: false, subtitles: false },
      { name: "Simplified Chinese",  interface: true, fullAudio: false, subtitles: false },
      { name: "Korean",              interface: true, fullAudio: false, subtitles: false },
      { name: "French",              interface: true, fullAudio: false, subtitles: false },
      { name: "German",              interface: true, fullAudio: false, subtitles: false },
      { name: "Spanish",             interface: true, fullAudio: false, subtitles: false },
      { name: "Polish",              interface: true, fullAudio: false, subtitles: false },
      { name: "Portguese",           interface: true, fullAudio: false, subtitles: false },
      { name: "Italian",             interface: true, fullAudio: false, subtitles: false },
      { name: "Traditional Chinese", interface: true, fullAudio: false, subtitles: false },
    ],
    link: "www.rockstargames.com/reddeadredemption2",
    // You can use your own HTML and CSS but scripts are not allowed for security reasons
    about: `America, 1899.<br>
    <br>
    Arthur Morgan and the Van der Linde gang are outlaws on the run. With federal agents and the best bounty hunters in the nation massing on their heels, the gang must rob, steal and fight their way across the rugged heartland of America in order to survive. As deepening internal divisions threaten to tear the gang apart, Arthur must make a choice between his own ideals and loyalty to the gang who raised him.<br>
    <br>
    Now featuring additional Story Mode content and a fully-featured Photo Mode, Red Dead Redemption 2 also includes free access to the shared living world of Red Dead Online, where players take on an array of roles to carve their own unique path on the frontier as they track wanted criminals as a Bounty Hunter, create a business as a Trader, unearth exotic treasures as a Collector or run an underground distillery as a Moonshiner and much more.<br>
    <br>
    With all new graphical and technical enhancements for deeper immersion, Red Dead Redemption 2 for PC takes full advantage of the power of the PC to bring every corner of this massive, rich and detailed world to life including increased draw distances; higher quality global illumination and ambient occlusion for improved day and night lighting; improved reflections and deeper, higher resolution shadows at all distances; tessellated tree textures and improved grass and fur textures for added realism in every plant and animal.<br>
    <br>
    Red Dead Redemption 2 for PC also offers HDR support, the ability to run high-end display setups with 4K resolution and beyond, multi-monitor configurations, widescreen configurations, faster frame rates and more.`,
    mature: true,
    matureDescription: `<p>The developers describe the content like this:</p>
    <p><i>This Game may contain content not appropriate for all ages, or may not be appropriate for viewing at work: Frequent Violence or Gore, General Mature Content</i></p>`,
    req: {
      req64: true,
      mini: {
        os: "Windows 10 - April 2018 Update (v1803)",
        cpu: "Intel® Core™ i7-4770K / AMD Ryzen 5 1500X",
        ram: "12 GB RAM",
        gpu: "Nvidia GeForce GTX 1060 6GB / AMD Radeon RX 480 4GB",
        dx: "Version 11",
        network: "Broadband Internet connection",
        storage: "150 GB available space",
        soundCard: "Direct X Compatible",
      },
      recommended: {
        os: "Windows 10 - April 2018 Update (v1803)",
        cpu: "Intel® Core™ i7-4770K / AMD Ryzen 5 1500X",
        ram: "12 GB RAM",
        gpu: "Nvidia GeForce GTX 1060 6GB / AMD Radeon RX 480 4GB",
        dx: "Version 11",
        network: "Broadband Internet connection",
        storage: "150 GB available space",
        soundCard: "Direct X Compatible",
      }
    },
    legal: `Software license terms in game and at www.rockstargames.com/eula; online account terms at www.rockstargames.com/socialclub. Non-transferable access to special features, such as exclusive/unlockable/downloadable/multiplayer/online &amp; bonus content/services/functions, may require single-use serial code, additional fee, and/or non-transferrable online account registration (varies 13+). Special features access may require internet connection, may not be available to all users or at all times, and may be terminated/modified/offered under different terms without notice. Violation of EULA, Code of Conduct, or other policies may result in restriction or termination of access to game or online account. For info, customer &amp; tech support visit www.rockstargames.com/support. This game is fictional. It may depict people, places, companies, groups, events, buildings, and other things that are similar to those in the real world; they are not affiliated or associated in any way with this game, and such depictions are not factual. The makers/publishers/licensors of this video game do not endorse/condone/encourage any content. Unauthorized copying, alteration, reverse engineering, decompiling, transmission, public performance, rental, pay for play, or copy protection circumvention is prohibited &amp; violates EULA. Certain limits apply to purchase, use, and redemption. See EULA www.rockstargames.com/eula and Terms of Service www.rockstargames.com/legal for details.<br>
    <br>
   Rockstar Games, Inc.  ©2005-19. Rockstar Games, Red Dead Redemption, R*, Redemption, Red Dead, Dead Eye are marks/logos/copyrights of Take-Two Interactive. Dolby and the Double-D symbols are trademarks of Dolby Laboratories. The ratings icon is a trademark of the Entertainment Software Association. All other marks and trademarks are properties of their respective owners.  All rights reserved.`,
    reviews: [
      {user:"ibrahim", type:"positive", date: "1/12/2022", content:"Good game"},
      {user:"Mazen", type:"positive", date: "2/12/2022", content:"good game"},
      {user:"mrCringe", type:"positive", date: "3/12/2022", content:"WOW BEST GAME EVERRRRRR!!!!"},
      {user:"Player20", type:"positive", date: "4/12/2022", content:"kinda good game"},
      {user:"Samy", type:"positive", date: "5/12/2022", content:"gg"},
      {user:"idiotgaming99", type:"negative", date: "6/12/2022", content:"boring game"},
      {user:"PlayerUnknown", type:"positive", date: "7/12/2022", content:"kinda good game"},
      {user:"bullshitIsReal", type:"positive", date: "8/12/2022", content:"gg"},
      {user:"Suki", type:"positive", date: "9/12/2022", content:"Very nice gameplay and graphics"},
    ]
  },
  //5- Sekiro™: Shadows Die Twice - GOTY Edition
  {
    id: "5",
    name: "Sekiro™: Shadows Die Twice - GOTY Edition",
    category: "Action Games",
    description: "Winner of over 175 Game of the Year Awards and recipient of over 250 perfect scores, RDR2 is the epic tale of outlaw Arthur Morgan and the infamous Van der Linde gang, on the run across America at the dawn of the modern age. Also includes access to the shared living world of Red Dead Online.Game of the Year - The Game Awards 2019 Best Action Game of 2019 - IGN Carve your own clever path to vengeance in the award winning adventure from developer FromSoftware, creators of Bloodborne and the Dark Souls series. Take Revenge. Restore Your Honor. Kill Ingeniously.",
    releaseDate: "21 Mar, 2019",
    developer: { name: "FromSoftware", link: ""},
    publisher: { name: "Activision", link: ""},
    mainImage:"https://cdn.akamai.steamstatic.com/steam/apps/814380/capsule_616x353.jpg",
    headerImage: "https://cdn.cloudflare.steamstatic.com/steam/apps/814380/header.jpg",
    backgroundImage: "https://cdn.akamai.steamstatic.com/steam/apps/814380/page_bg_generated_v6b.jpg",
    menuImg: "https://cdn.cloudflare.steamstatic.com/steam/apps/814380/capsule_231x87.jpg",
    moviesAndImages: [
      {
        type: "video",
        link: "https://cdn.cloudflare.steamstatic.com/steam/apps/256806899/movie480_vp9.webm",
        posterLink:
          "https://cdn.cloudflare.steamstatic.com/steam/apps/256806899/movie.293x165.jpg",
      },
      {
        type: "video",
        link: "https://cdn.cloudflare.steamstatic.com/steam/apps/256770769/movie480.webm",
        posterLink:
          "https://cdn.cloudflare.steamstatic.com/steam/apps/256770769/movie.293x165.jpg",
      },
      { type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/814380/ss_0f7b0f8ed9ffc49aba26f9328caa9a1d59ad60f0.1920x1080.jpg"},
      { type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/814380/ss_2685dd844a2a523b6c7ec207d46a538db6a908cd.1920x1080.jpg"},
      { type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/814380/ss_15f0e9982621aed44900215ad283811af0779b1d.1920x1080.jpg"},
      { type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/814380/ss_1e6f5540866a5564d65df915c22fe1e57e336a6f.1920x1080.jpg"},
      { type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/814380/ss_3d6b38c382c0eafb02dc90d22f33fd292e4e5cf3.1920x1080.jpg"},
      {
        type: "video",
        link: "https://cdn.cloudflare.steamstatic.com/steam/apps/256745700/movie480.webm",
        posterLink:
          "https://cdn.cloudflare.steamstatic.com/steam/apps/256745700/movie.293x165.jpg",
      },
      {
        type: "video",
        link: "https://cdn.cloudflare.steamstatic.com/steam/apps/256745081/movie480.webm",
        posterLink:
          "https://cdn.cloudflare.steamstatic.com/steam/apps/256745081/movie.293x165.jpg",
      },
      {
        type: "video",
        link: "https://cdn.cloudflare.steamstatic.com/steam/apps/256742445/movie480.webm",
        posterLink:
          "https://cdn.cloudflare.steamstatic.com/steam/apps/256742445/movie.293x165.jpg",
      },
      {
        type: "video",
        link: "https://cdn.cloudflare.steamstatic.com/steam/apps/256729567/movie480.webm",
        posterLink:
          "https://cdn.cloudflare.steamstatic.com/steam/apps/256729567/movie.293x165.jpg",
      },
      {
        type: "video",
        link: "https://cdn.cloudflare.steamstatic.com/steam/apps/256724898/movie480.webm",
        posterLink:
          "https://cdn.cloudflare.steamstatic.com/steam/apps/256724898/movie.293x165.jpg",
      },
    ],
    reason: "available", // "available" or "recommended"
    discount: "no-discount", // "discount" or "no-discount"
    free: false,
    price: "$59.99",
    // offerType: "SPECIAL PROMOTION",
    // offerEndDate: "21 December",
    // discountPrice:"$19.79",
    // discountPercentage: "67%",
    tags: ["Souls-like", "Difficult", "Action", "Singleplayer", "Ninja"], // Array of tags
    win: "platform-image win",
    // mac: "platform-image mac", // Comment the varibale if the platform is not available
    features: [
      { link: "https://store.steampowered.com/search/?category2=2" , icon: "/images/ico_singlePlayer.png",label: "Single-player"},
      { link: "https://store.steampowered.com/search/?category2=22", icon: "/images/ico_achievements.png",label: "Steam Achievements"},
      { link: "https://store.steampowered.com/search/?category2=29", icon: "/images/ico_cards.png",       label: "Steam Trading Cards"},
      { link: "https://store.steampowered.com/search/?category2=23", icon: "/images/ico_cloud.png",       label: "Steam Cloud"},
      { link: "https://store.steampowered.com/search/?category2=41", icon: "/images/ico_remote_play.png", label: "Remote Play on Phone"},
      { link: "https://store.steampowered.com/search/?category2=42", icon: "/images/ico_remote_play.png", label: "Remote Play on Tablet"},
    ],
    languages: [
      { name: "English",             interface: true, fullAudio: true,  subtitles: true },
      { name: "German",              interface: true, fullAudio: true,  subtitles: true },
      { name: "Spanish",             interface: true, fullAudio: true,  subtitles: true },
      { name: "Japanese",            interface: true, fullAudio: true,  subtitles: true },
      { name: "Italian",             interface: true, fullAudio: true,  subtitles: true },
      { name: "Russian",             interface: true, fullAudio: false, subtitles: true },
      { name: "Simplified Chinese",  interface: true, fullAudio: false, subtitles: true },
      { name: "Korean",              interface: true, fullAudio: false, subtitles: true },
      { name: "French",              interface: true, fullAudio: false, subtitles: true },
      { name: "Polish",              interface: true, fullAudio: false, subtitles: true },
      { name: "Thai",                interface: true, fullAudio: false, subtitles: true },
      { name: "Portguese",           interface: true, fullAudio: false, subtitles: true },
      { name: "Traditional Chinese", interface: true, fullAudio: false, subtitles: true },
    ],
    link: "www.sekirothegame.com",
    // You can use your own HTML and CSS but scripts are not allowed for security reasons
    about: `This Game of the Year Edition now includes bonus content*:<br>
    <br>
    - Reflection and Gauntlet of Strength - new boss challenge modes<br>
    - Remnants - leave messages and recordings of your actions that other players can view and rate<br>
    - 3 unlockable cosmetic skins<br>
    <br>
    Game of the Year  - The Game Awards 2019<br>
    Best Action Game of 2019 - IGN<br>
    Over 50 awards and nominations<br>
    <br>
    Carve your own clever path to vengeance in the critically acclaimed adventure from developer FromSoftware, creators of the Dark Souls series.<br>
    <br>
    In Sekiro™: Shadows Die Twice you are the 'one-armed wolf', a disgraced and disfigured warrior rescued from the brink of death. Bound to protect a young lord who is the descendant of an ancient bloodline, you become the target of many vicious enemies, including the dangerous Ashina clan. When the young lord is captured, nothing will stop you on a perilous quest to regain your honor, not even death itself.<br>
    <br>
    Explore late 1500s Sengoku Japan, a brutal period of constant life and death conflict, as you come face to face with larger than life foes in a dark and twisted world. Unleash an arsenal of deadly prosthetic tools and powerful ninja abilities while you blend stealth, vertical traversal, and visceral head to head combat in a bloody confrontation.<br>
    <br>
    Take Revenge. Restore Your Honor. Kill Ingeniously.<br>
    <br>
    *Download required.<br>
    <br>
    Internet connection required for asynchronous Multiplayer.`,
    mature: true,
    matureDescription: `<p>The developers describe the content like this:</p>
    <p><i>This Game may contain content not appropriate for all ages, or may not be appropriate for viewing at work: Frequent Violence or Gore, General Mature Content</i></p>`,
    req: {
      req64: true,
      mini: {
        os: "Windows 7 64-bit | Windows 8 64-bit | Windows 10 64-bit",
        cpu: "Intel Core i3-2100 | AMD FX-6300",
        ram: "4 GB RAM",
        gpu: "NVIDIA GeForce GTX 760 | AMD Radeon HD 7950",
        dx: "Version 11",
        network: "Broadband Internet connection",
        storage: "25 GB available space",
        soundCard: "Direct X 11 Compatible",
      },
      recommended: {
        os: "Windows 7 64-bit | Windows 8 64-bit | Windows 10 64-bit",
        cpu: "Intel Core i5-2500K | AMD Ryzen 5 1400",
        ram: "8 GB RAM",
        gpu: "NVIDIA GeForce GTX 970 | AMD Radeon RX 570",
        dx: "Version 11",
        network: "Broadband Internet connection",
        storage: "25 GB available space",
        soundCard: "Direct X 11 Compatible",
      }
    },
    legal: `©2019-2020 FromSoftware, Inc. All rights reserved. Published and distributed by Activision. ACTIVISION is a trademark of Activision Publishing Inc. All other trademarks and trade names are the properties of their respective owners.<br>
    <br>
    Dark Souls is a trademark of BANDAI NAMCO Entertainment Inc. Bandai Namco is not the publisher of SEKIRO: SHADOWS DIE TWICE. Activision has no affiliation with Dark Souls.`,
    reviews: [
      {user:"ibrahim", type:"positive", date: "1/12/2022", content:"Good game"},
      {user:"Mazen", type:"positive", date: "2/12/2022", content:"good game"},
      {user:"mrCringe", type:"positive", date: "3/12/2022", content:"WOW BEST GAME EVERRRRRR!!!!"},
      {user:"Player20", type:"positive", date: "4/12/2022", content:"kinda good game"},
      {user:"Samy", type:"positive", date: "5/12/2022", content:"gg"},
      {user:"Reflex", type:"positive", date: "8/12/2022", content:"gg"},
      {user:"UnY", type:"positive", date: "9/12/2022", content:"now that's the real gameplay and graphics"},
      {user:"idiotgaming99", type:"negative", date: "6/12/2022", content:"Hard game"},
      {user:"PlayerUnknown", type:"positive", date: "7/12/2022", content:"kinda good game"},
      {user:"bullshitIsReal", type:"positive", date: "8/12/2022", content:"gg"},
      {user:"Suki", type:"positive", date: "9/12/2022", content:"Very nice gameplay and graphics"},
    ]
  },
  //6- ELDEN RING
  {
    id: "6",
    name: "ELDEN RING",
    category: "Action Games",
    description: "THE NEW FANTASY ACTION RPG. Rise, Tarnished, and be guided by grace to brandish the power of the Elden Ring and become an Elden Lord in the Lands Between.",
    releaseDate: "25 Feb, 2022",
    developer: { name: "FromSoftware Inc.", link: ""},
    publisher: { name: "FromSoftware Inc.", link: ""},
    mainImage:"https://cdn.akamai.steamstatic.com/steam/apps/1245620/capsule_616x353.jpg",
    headerImage: "https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/header.jpg",
    backgroundImage: "https://cdn.akamai.steamstatic.com/steam/apps/1245620/page_bg_generated_v6b.jpg",
    menuImg: "https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/capsule_231x87.jpg",
    moviesAndImages: [
      {
        type: "video",
        link: "https://cdn.cloudflare.steamstatic.com/steam/apps/256889456/movie480_vp9.webm",
        posterLink:
          "https://cdn.cloudflare.steamstatic.com/steam/apps/256889456/movie.293x165.jpg",
      },
      {
        type: "video",
        link: "https://cdn.cloudflare.steamstatic.com/steam/apps/256875482/movie480_vp9.webm",
        posterLink:
          "https://cdn.cloudflare.steamstatic.com/steam/apps/256875482/movie.293x165.jpg",
      },
      { type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/ss_ae44317e3bd07b7690b4d62cc5d0d1df30367a91.1920x1080.jpg"},
      { type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/ss_e80a907c2c43337e53316c71555c3c3035a1343e.1920x1080.jpg"},
      { type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/ss_b70e156adf9e40aed24c10fb352b7813586e7290.1920x1080.jpg"},
      { type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/ss_3aec1455923ef49f4e777c2a94dbcd0256f77eb0.1920x1080.jpg"},
      { type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/ss_b6c4cdb36cebdbd52b97ab6e0851b7d3e41f03b3.1920x1080.jpg"},
      { type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/ss_e87a3e84890ab19f8995566e62762d5f8ed39315.1920x1080.jpg"},
      { type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/ss_1e3dfe515c04f4071207f01d62b85a1d6b560ced.1920x1080.jpg"},
      { type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/ss_3e556415d1bda00d749b2166ced264bec76f06ee.1920x1080.jpg"},
      { type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/ss_c372274833ae6e5437b952fa1979430546a43ad9.1920x1080.jpg"},
      { type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/ss_b87601dee58f4dbc36e40a8d803dc6a53ceefe07.1920x1080.jpg"},
      {
        type: "video",
        link: "https://cdn.cloudflare.steamstatic.com/steam/apps/256864892/movie480_vp9.webm",
        posterLink:
          "https://cdn.cloudflare.steamstatic.com/steam/apps/256864892/movie.293x165.jpg",
      },
      {
        type: "video",
        link: "https://cdn.cloudflare.steamstatic.com/steam/apps/256859891/movie480.webm",
        posterLink:
          "https://cdn.cloudflare.steamstatic.com/steam/apps/256859891/movie.293x165.jpg",
      },
      {
        type: "video",
        link: "https://cdn.cloudflare.steamstatic.com/steam/apps/256843493/movie480.webm",
        posterLink:
          "https://cdn.cloudflare.steamstatic.com/steam/apps/256843493/movie.293x165.jpg",
      },
    ],
    reason: "available", // "available" or "recommended"
    discount: "no-discount", // "discount" or "no-discount"
    free: false,
    price: "$39.99",
    // offerType: "SPECIAL PROMOTION",
    // offerEndDate: "21 December",
    // discountPrice:"$19.79",
    // discountPercentage: "67%",
    tags: ["Souls-like", "Dark Fantasy", "Open World", "RPG"], // Array of tags
    win: "platform-image win",
    // mac: "platform-image mac", // Comment the varibale if the platform is not available
    features: [
      { link: "https://store.steampowered.com/search/?category2=2" , icon: "/images/ico_singlePlayer.png",label: "Single-player"},
      { link: "https://store.steampowered.com/search/?category2=36", icon: "/images/ico_multiPlayer.png", label: "Online PvP"},
      { link: "https://store.steampowered.com/search/?category2=38", icon: "/images/ico_coop.png",        label: "Online Co-op"},
      { link: "https://store.steampowered.com/search/?category2=22", icon: "/images/ico_achievements.png",label: "Steam Achievements"},
      { link: "https://store.steampowered.com/search/?category2=29", icon: "/images/ico_cards.png",       label: "Steam Trading Cards"},
      { link: "https://store.steampowered.com/search/?category2=23", icon: "/images/ico_cloud.png",       label: "Steam Cloud"},
    ],
    languages: [
      { name: "English",             interface: true, fullAudio: true,  subtitles: true },
      { name: "German",              interface: true, fullAudio: false, subtitles: true },
      { name: "Spanish",             interface: true, fullAudio: false, subtitles: true },
      { name: "Japanese",            interface: true, fullAudio: false, subtitles: true },
      { name: "Italian",             interface: true, fullAudio: false, subtitles: true },
      { name: "Russian",             interface: true, fullAudio: false, subtitles: true },
      { name: "Simplified Chinese",  interface: true, fullAudio: false, subtitles: true },
      { name: "Korean",              interface: true, fullAudio: false, subtitles: true },
      { name: "French",              interface: true, fullAudio: false, subtitles: true },
      { name: "Polish",              interface: true, fullAudio: false, subtitles: true },
      { name: "Thai",                interface: true, fullAudio: false, subtitles: true },
      { name: "Portguese",           interface: true, fullAudio: false, subtitles: true },
      { name: "Traditional Chinese", interface: true, fullAudio: false, subtitles: true },
    ],
    // You can use your own HTML and CSS but scripts are not allowed for security reasons
    about: `<img src="https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/extras/ER_Steam_Gif_616x260.gif?t=1700164457">
    <br>
    <br>
    THE NEW FANTASY ACTION RPG.
    <br>
    Rise, Tarnished, and be guided by grace to brandish the power of the Elden Ring and become an Elden Lord in the Lands Between.
    <h2>• A Vast World Full of Excitement</h2>
    A vast world where open fields with a variety of situations and huge dungeons with complex and three-dimensional designs are seamlessly connected. As you explore, the joy of discovering unknown and overwhelming threats await you, leading to a high sense of accomplishment.
    <h2>• Create your Own Character</h2>
    In addition to customizing the appearance of your character, you can freely combine the weapons, armor, and magic that you equip. You can develop your character according to your play style, such as increasing your muscle strength to become a strong warrior, or mastering magic.
    <h2>• An Epic Drama Born from a Myth</h2>
    A multilayered story told in fragments. An epic drama in which the various thoughts of the characters intersect in the Lands Between.
    <h2>• Unique Online Play that Loosely Connects You to Others</h2>
    In addition to multiplayer, where you can directly connect with other players and travel together, the game supports a unique asynchronous online element that allows you to feel the presence of others.`,
    mature: true,
    matureDescription: `<p>The developers describe the content like this:</p>
    <p><i>This Game may contain content not appropriate for all ages, or may not be appropriate for viewing at work: Frequent Violence or Gore, General Mature Content</i></p>`,
    req: {
      req64: true,
      mini: {
        os: "Windows 10",
        cpu: "INTEL CORE I5-8400 or AMD RYZEN 3 3300X",
        ram: "12 GB RAM",
        gpu: "NVIDIA GEFORCE GTX 1060 3 GB or AMD RADEON RX 580 4 GB",
        dx: "Version 12",
        network: "Broadband Internet connection",
        storage: "60 GB available space",
        soundCard: "Windows Compatible Audio Device",
      },
      recommended: {
        os: "Windows 10/11",
        cpu: "INTEL CORE I7-8700K or AMD RYZEN 5 3600X",
        ram: "16 GB RAM",
        gpu: "NVIDIA GEFORCE GTX 1070 8 GB or AMD RADEON RX VEGA 56 8 GB",
        dx: "Version 12",
        network: "Broadband Internet connection",
        storage: "60 GB available space",
        soundCard: "Windows Compatible Audio Device",
      }
    },
    legal: `ELDEN RING™ &amp; ©BANDAI NAMCO Entertainment Inc. / ©2022 FromSoftware, Inc.`,
    reviews: [
      {user:"ibrahim", type:"positive", date: "1/12/2022", content:"Good game"},
      {user:"Mazen", type:"positive", date: "2/12/2022", content:"good game"},
      {user:"mrCringe", type:"positive", date: "3/12/2022", content:"WOW BEST GAME EVERRRRRR!!!!"},
      {user:"Player20", type:"positive", date: "4/12/2022", content:"kinda good game"},
      {user:"Samy", type:"positive", date: "5/12/2022", content:"gg"},
      {user:"Reflex", type:"positive", date: "8/12/2022", content:"gg"},
      {user:"UnY", type:"positive", date: "9/12/2022", content:"now that's the real gameplay and graphics"},
      {user:"idiotgaming99", type:"negative", date: "6/12/2022", content:"Hard game"},
      {user:"PlayerUnknown", type:"positive", date: "7/12/2022", content:"kinda good game"},
      {user:"bullshitIsReal", type:"positive", date: "8/12/2022", content:"gg"},
      {user:"Suki", type:"positive", date: "9/12/2022", content:"Very nice gameplay and graphics"},
    ]
  },
  //7- NieR:Automata™
  {
    id: "7",
    name: "NieR:Automata™",
    category: "Action Games",
    description: "NieR: Automata tells the story of androids 2B, 9S and A2 and their battle to reclaim the machine-driven dystopia overrun by powerful machines.",
    releaseDate: "17 Mar, 2017",
    developer: { name: "Square Enix", link: ""},
    publisher: { name: "Square Enix", link: ""},
    mainImage:"https://cdn.akamai.steamstatic.com/steam/apps/524220/capsule_616x353.jpg",
    headerImage: "https://cdn.cloudflare.steamstatic.com/steam/apps/524220/header.jpg",
    backgroundImage: "https://cdn.akamai.steamstatic.com/steam/apps/524220/page_bg_generated_v6b.jpg",
    menuImg: "https://cdn.cloudflare.steamstatic.com/steam/apps/524220/capsule_231x87.jpg",
    moviesAndImages: [
      {
        type: "video",
        link: "https://cdn.cloudflare.steamstatic.com/steam/apps/256743980/movie480.webm",
        posterLink:
          "https://cdn.cloudflare.steamstatic.com/steam/apps/256743980/movie.293x165.jpg",
      },
      {
        type: "video",
        link: "https://cdn.cloudflare.steamstatic.com/steam/apps/256681393/movie480.webm",
        posterLink:
          "https://cdn.cloudflare.steamstatic.com/steam/apps/256681393/movie.293x165.jpg",
      },
      { type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/524220/ss_d0314b4c134329a483b5e43af951f60274abc66b.1920x1080.jpg"},
      { type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/524220/ss_8b29f7e1ce9a8b9313dc3eb50dbe76a4cf94eef9.1920x1080.jpg"},
      { type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/524220/ss_2c265df38c3d2d393d74ee8e74d79bdafa16b143.1920x1080.jpg"},
      { type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/524220/ss_831e0e7c9d514393b711e9ed1d6796042521a80c.1920x1080.jpg"},
      { type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/524220/ss_a6d164452c1aa00a0d7b7ca31aa76d787853b39e.1920x1080.jpg"},
      { type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/524220/ss_e926e3b5d440b4f244525745c7100edc2d717b85.1920x1080.jpg"},
      { type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/524220/ss_edcb7633ff42d7200bcb240a1ebb1116d602d9fe.1920x1080.jpg"},
      { type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/524220/ss_02d2f3f2b7b7add8e6ad50d6b9325d05fa1d7bc7.1920x1080.jpg"},
      { type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/524220/ss_b55c67ac11781513183391c18ea86819e047577d.1920x1080.jpg"},
      { type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/524220/ss_c538e630c5cc224124104cc42ec6220ab90b5852.1920x1080.jpg"},
      {
        type: "video",
        link: "https://cdn.cloudflare.steamstatic.com/steam/apps/256680536/movie480.webm",
        posterLink:
          "https://cdn.cloudflare.steamstatic.com/steam/apps/256680536/movie.293x165.jpg",
      },
    ],
    reason: "available", // "available" or "recommended"
    discount: "no-discount", // "discount" or "no-discount"
    free: false,
    price: "$31.99",
    offerType: "SPECIAL PROMOTION",
    offerEndDate: "21 May",
    discountPrice:"$12.79",
    discountPercentage: "60%",
    tags: ["Great Soundtrack", "Story Rich", "Female Protagonist"], // Array of tags
    win: "platform-image win",
    // mac: "platform-image mac", // Comment the varibale if the platform is not available
    features: [
      { link: "https://store.steampowered.com/search/?category2=2" , icon: "/images/ico_singlePlayer.png",label: "Single-player"},
      { link: "https://store.steampowered.com/search/?category2=22", icon: "/images/ico_achievements.png",label: "Steam Achievements"},
      { link: "https://store.steampowered.com/search/?category2=29", icon: "/images/ico_cards.png",       label: "Steam Trading Cards"},
      { link: "https://store.steampowered.com/search/?category2=23", icon: "/images/ico_cloud.png",       label: "Steam Cloud"},
      { link: "https://store.steampowered.com/search/?category2=41", icon: "/images/ico_remote_play.png", label: "Remote Play on Phone"},
      { link: "https://store.steampowered.com/search/?category2=42", icon: "/images/ico_remote_play.png", label: "Remote Play on Tablet"},
    ],
    languages: [
      { name: "English",             interface: true, fullAudio: true,  subtitles: true },
      { name: "Japanese",            interface: true, fullAudio: true,  subtitles: true },
      { name: "German",              interface: true, fullAudio: false, subtitles: true },
      { name: "Spanish",             interface: true, fullAudio: false, subtitles: true },
      { name: "Italian",             interface: true, fullAudio: false, subtitles: true },
      { name: "Russian",             interface: true, fullAudio: false, subtitles: true },
      { name: "Simplified Chinese",  interface: true, fullAudio: false, subtitles: true },
      { name: "Korean",              interface: true, fullAudio: false, subtitles: true },
      { name: "French",              interface: true, fullAudio: false, subtitles: true },
      { name: "Polish",              interface: true, fullAudio: false, subtitles: true },
      { name: "Thai",                interface: true, fullAudio: false, subtitles: true },
      { name: "Portguese",           interface: true, fullAudio: false, subtitles: true },
      { name: "Traditional Chinese", interface: true, fullAudio: false, subtitles: true },
    ],
    // You can use your own HTML and CSS but scripts are not allowed for security reasons
    about: `<img src="https://cdn.cloudflare.steamstatic.com/steam/apps/524220/extras/Nier_PRE_Launch-ENG_UK_Multi_06_Mod.jpg?t=1696405478">
    <br>
    NieR: Automata tells the story of androids 2B, 9S and A2 and their battle to reclaim the machine-driven dystopia overrun by powerful machines.
    <br><br>
    Humanity has been driven from the Earth by mechanical beings from another world. In a final effort to take back the planet, the human resistance sends a force of android soldiers to destroy the invaders. Now, a war between machines and androids rages on... A war that could soon unveil a long-forgotten truth of the world.
    <br><br>
    Key Features:
    <br>
    <ul class="bb_ul"><li><strong>Action-Packed Battles</strong> 
    – Players will switch between using melee and ranged attacks in battle against hordes of enemies and challenging bosses across a variety of open field maps. The tight controls and incredibly fluid combat are simple to learn for newcomers while offering plenty of depth for more experienced action gamers. Players can perform high-speed battle actions—combining light and heavy attacks—and switch through an arsenal of weaponry while evading enemies with speed and style. 
    <br></li>
    <li>
    <strong>Beautifully Desolate Open-World</strong> 
    – The game seamlessly joins together hauntingly beautiful vistas and locations with no area loading. The environments are rendered in 60fps and contain a wealth of sub-events in addition to the main storyline. 
    <br></li>
    <li>
    <strong>Masterfully Crafted Story and Characters</strong> 
    – NieR: Automata tells the story of androids 2B, 9S and A2 and their ferocious battle to reclaim a machine-driven dystopia overrun by powerful weapons known as machine lifeforms.
    <br></li>
    <li>
    <strong>Elements of an RPG</strong> 
    – Players will obtain a variety of weapon types, level up in battle, learn new combat skills, and customise a loadout that caters to their playstyle.
    <br></li>
    <li>
    <strong>Utilise the Pod Support System to Assist In and Outside of Battle</strong> 
    – Pods can attack the enemy in both manual and lock-on modes. They can also assist outside of battle, such as allowing the player to glide through the air. Pods can be enhanced throughout the game, with upgrades including new attack methods and variations.
    <br></li>
    <li>
    <strong>“Auto Mode” Available for Beginners </strong>
    – Novice players can elect “Auto Mode” for easy attacks and evasions.
    </li></ul>`,
    mature: true,
    matureDescription: `<p>The developers describe the content like this:</p>
    <p><i>This Game may contain content not appropriate for all ages, or may not be appropriate for viewing at work: Frequent Violence or Gore, General Mature Content</i></p>`,
    req: {
      req64: true,
      mini: {
        os: "Windows 7 /8.1 /10 64bit",
        cpu: "Intel Core i3 2100 or AMD A8-6500",
        ram: "4 GB RAM",
        gpu: "NVIDIA GeForce GTX 770 VRAM 2GB or AMD Radeon R9 270X VRAM 2GB",
        dx: "Version 11",
        network: "Broadband Internet connection",
        storage: "50 GB available space",
        soundCard: "DirectX® 11 supported",
        additionalNotes: "Mouse, keyboard and game pad (XInput only). Screen resolution: 1280x720. This product only supports MS-IME keyboard input. There is a possibility that other IME will not function correctly with it."
      },
      recommended: {
        os: "Windows 8.1 /10 64bit",
        cpu: "Intel Core i5 4670 or AMD A10-7850K",
        ram: "8 GB RAM",
        gpu: "NVIDIA GeForce GTX 980 VRAM 4GB or AMD Radeon R9 380X VRAM 4GB",
        dx: "Version 11",
        network: "Broadband Internet connection",
        storage: "50 GB available space",
        soundCard: "DirectX® 11 supported",
        additionalNotes: "Mouse, keyboard and game pad (XInput only). Screen resolution: 1920x1080. Depending on the monitor and PC graphics card environment and setup used, this title can expand its display resolution to 4K. However, please be aware that 4K resolutions are not officially supported. This product only supports MS-IME keyboard input. There is a possibility that other IME will not function correctly with it."
      }
    },
    legal: `© 2017 SQUARE ENIX CO., LTD. All Rights Reserved. Developed by PlatinumGames Inc. Character Design by Akihiko Yoshida. NieR: Automata is a registered trademark or trademark of Square Enix Co., Ltd. SQUARE ENIX and the SQUARE ENIX logo are registered trademarks or trademarks of Square Enix Holdings Co., Ltd. All other marks are properties of their respective owners.`,
    reviews: [
      {user:"ibrahim", type:"positive", date: "1/12/2022", content:"Good game"},
      {user:"Mazen", type:"positive", date: "2/12/2022", content:"good game"},
      {user:"mrCringe", type:"positive", date: "3/12/2022", content:"WOW BEST GAME EVERRRRRR!!!!"},
      {user:"Player20", type:"positive", date: "4/12/2022", content:"kinda good game"},
      {user:"Samy", type:"positive", date: "5/12/2022", content:"gg"},
      {user:"Reflex", type:"positive", date: "8/12/2022", content:"gg"},
      {user:"UnY", type:"positive", date: "9/12/2022", content:"now that's the real gameplay and graphics"},
      {user:"idiotgaming99", type:"negative", date: "6/12/2022", content:"Hard game"},
      {user:"PlayerUnknown", type:"positive", date: "7/12/2022", content:"kinda good game"},
      {user:"bullshitIsReal", type:"positive", date: "8/12/2022", content:"gg"},
      {user:"Suki", type:"positive", date: "9/12/2022", content:"Very nice gameplay and graphics"},
    ]
  },
  //8- ARK: Survival Ascended
  {
    id: "8",
    name: "ARK: Survival Ascended",
    category: "Action Games",
    description: "ARK is reimagined from the ground-up into the next-generation of video game technology with Unreal Engine 5! Form a tribe, tame & breed hundreds of unique dinosaurs and primeval creatures, explore, craft, build, and fight your way to the top of the food-chain. Your new world awaits!",
    releaseDate: "26 Oct, 2023",
    developer: { name: "Studio Wildcard", link: ""},
    publisher: { name: "Studio Wildcard", link: ""},
    mainImage:"https://cdn.akamai.steamstatic.com/steam/apps/2399830/capsule_616x353.jpg",
    headerImage: "https://cdn.cloudflare.steamstatic.com/steam/apps/2399830/header.jpg",
    backgroundImage: "https://cdn.akamai.steamstatic.com/steam/apps/2399830/page_bg_generated_v6b.jpg",
    menuImg: "https://cdn.cloudflare.steamstatic.com/steam/apps/2399830/capsule_231x87.jpg",
    moviesAndImages: [
      {
        type: "video",
        link: "https://cdn.cloudflare.steamstatic.com/steam/apps/256978230/movie480_vp9.webm",
        posterLink:
          "https://cdn.cloudflare.steamstatic.com/steam/apps/256978230/movie.293x165.jpg",
      },
      { type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/2399830/ss_44f74e86ebd6620a4f0a1f3f8ea97f73dc215e69.1920x1080.jpg"},
      { type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/2399830/ss_65c0de5ced28281764990a299eb3926629b2863e.1920x1080.jpg"},
      { type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/2399830/ss_0ce49e629369dbf9e8fba324667167568c05c66f.1920x1080.jpg"},
      { type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/2399830/ss_63a6ea13596a948b7873ed6de4fd4d01f9cbe57b.1920x1080.jpg"},
      { type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/2399830/ss_37b5cb9485658f91b856a0714a8cbdc69f1802b1.1920x1080.jpg"},
      { type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/2399830/ss_f9e156d2b818d808c65476997283b5da8be8324f.1920x1080.jpg"},
      { type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/2399830/ss_b3f20fcdde1cd0254fca51b342b27bff3d46e031.1920x1080.jpg"},
      { type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/2399830/ss_605387fbf8257c111978ed900f3346ef350fc236.1920x1080.jpg"},
      { type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/2399830/ss_7ff0f04cfc0eec97907eb5197c748576b15793ce.1920x1080.jpg"},
      { type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/2399830/ss_3c4d9089501a98a9dace96fd5c3ccbf1dfc7d8f4.1920x1080.jpg"},
      { type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/2399830/ss_35186898f5260a406f934132a211df6e53f39843.1920x1080.jpg"},
      { type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/2399830/ss_41510c0b426ecf626b3d1efd727a9fdd7feeb5ec.1920x1080.jpg"},
      { type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/2399830/ss_87b09e915d4447a27efb15f403de05168b8d477a.1920x1080.jpg"},
      { type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/2399830/ss_f0ed123c9b3916e8d4af8b77936d7230091a6f48.1920x1080.jpg"},
    ],
    reason: "available", // "available" or "recommended"
    discount: "no-discount", // "discount" or "no-discount"
    free: false,
    price: "$20.99",
    // offerType: "",
    // offerEndDate: "",
    // discountPrice:"",
    // discountPercentage: "",
    tags: ["Battle Royal", "Multiplayer", "Martial Arts", "PvP"], // Array of tags
    win: "platform-image win",
    // mac: "platform-image mac", // Comment the varibale if the platform is not available
    features: [
      { link: "https://store.steampowered.com/search/?category2=2",  icon: "/images/ico_singlePlayer.png",         label: "Single-player"},
      { link: "https://store.steampowered.com/search/?category2=20", icon: "/images/ico_multiPlayer.png",          label: "MMO"},
      { link: "https://store.steampowered.com/search/?category2=36", icon: "/images/ico_multiPlayer.png",          label: "Online PvP"},
      { link: "https://store.steampowered.com/search/?category2=47", icon: "/images/ico_multiPlayer.png",          label: "LAN PvP"},
      { link: "https://store.steampowered.com/search/?category2=38", icon: "/images/ico_coop.png",                 label: "Online Co-op"},
      { link: "https://store.steampowered.com/search/?category2=48", icon: "/images/ico_coop.png",                 label: "LAN Co-op"},
      { link: "https://store.steampowered.com/search/?category2=39", icon: "/images/ico_coop.png",                 label: "Shared/Split Screen Co-op"},
      { link: "https://store.steampowered.com/search/?category2=17", icon: "/images/ico_editor.png",               label: "Includes level editor"},
      { link: "https://store.steampowered.com/search/?category2=44", icon: "/images/ico_remote_play_together.png", label: "Remote Play Together"},


    ],
    languages: [
      { name: "English",             interface: true, fullAudio: true,  subtitles: false },
      { name: "Japanese",            interface: true, fullAudio: false, subtitles: false },
      { name: "Russian",             interface: true, fullAudio: false, subtitles: false },
      { name: "Simplified Chinese",  interface: true, fullAudio: false, subtitles: false },
      { name: "Korean",              interface: true, fullAudio: false, subtitles: false },
      { name: "French",              interface: true, fullAudio: false, subtitles: false },
      { name: "German",              interface: true, fullAudio: false, subtitles: false },
      { name: "Spanish",             interface: true, fullAudio: false, subtitles: false },
      { name: "Polish",              interface: true, fullAudio: false, subtitles: false },
      { name: "Portguese",           interface: true, fullAudio: false, subtitles: false },
      { name: "Turkish",             interface: true, fullAudio: false, subtitles: false },
      { name: "Italian",             interface: true, fullAudio: false, subtitles: false },
      { name: "Traditional Chinese", interface: true, fullAudio: false, subtitles: false },
      { name: "Ukrainian",           interface: true, fullAudio: false, subtitles: false },
    ],
    link: "www.playark.com",
    // You can use your own HTML and CSS but scripts are not allowed for security reasons
    about: `Respawn into a new dinosaur survival experience beyond your wildest dreams… as ARK is reimagined from the ground-up into the next-generation of videogame technology with Unreal Engine 5! You awake on a mysterious island, your senses overwhelmed by the blinding sunlight and brilliant colors bouncing off every surface around you, the azure waters of a verdant Island lapping at your bare feet. A deep roar echoes from the misty jungle, jolting you into action, and you stand up – not afraid, but intrigued. Are you ready to form a tribe, tame and breed hundreds of species of dinosaurs and other primeval creatures, explore, craft, build, and fight your way to the top of the food-chain? Your new world awaits… step through the looking-glass and join it!
    <br><br><br>
    <strong>FEATURES</strong>
    <br><br>
    ARK: Survival Ascended has completely recreated and redesigned the artwork and worlds of ARK to take advantage of the latest in videogame technology, Unreal Engine 5, using high-end graphics features such as fully dynamic Global Illumination (“Lumen”), so that light bounces realistically of off surfaces and provides realistic reflections, and advanced mesh streaming (“Nanite”) of hundreds of millions of triangles for extreme detail.
    <br><br><br>
    Advanced new physics systems such as dynamic water so that every creature creates waves, ripples, splashes, and bubbles as they move through fluids, and fully interactive physical foliage where every blade of grass, bush, and tree reacts to characters, explosions, projectiles, and physics objects. Knock down a tree, and see it crash into other trees and disturb all the foliage on its way down to smacking into the grass below! Detect an enemy moving sneakily through the grass as it shifts and sways in response to their presence. Demolish a building and watch the pieces break apart realistically, interacting with the grass and water as they fall.
    <br><br><br>
    ARK: Survival Ascended includes access to all of ARK’s worlds, including Scorched Earth, Aberration, Extinction, ARK Genesis Part 1, ARK Genesis Part 2, and more. The Island is released now, with the subsequent expansion worlds to be added at no additional cost on a regular basis.
    <br><br><br>
    The definitive survival experience returns better than ever: design your Survivor, form a tribe, and tame, train, breed &amp; ride dinosaurs within a living ecosystem. Watch your food, water, temperature, and weather patterns. Slowly expand outwards as you harvest, build structures, farm crops, customize your visual designs, and proceed to explore to uncover the true nature of The Island and the worlds beyond. 
    <br><br><br>
    Thorough Quality of Life revamps in every area: redesigned User Interfaces, dynamic navigation for intelligent creature pathfinding, Wild Babies, Photo Mode, new Camera systems, new Map system, Tracking System, new Structures and Items, new Creatures, and much more.
    <br><br><br>
    Cross-Platform Modding: Download &amp; play new custom content created by players, including new maps, creatures, items, and game modes, through a dedicated new Mod-bowser directly within the game! Enjoy an endless stream of new ARK content as the creativity and talent of the community is fully unleashed for the first time ever across gaming platforms!
    <br><br><br>
    Cross-Platform Multiplayer: form your online tribe across different gaming platforms as you work together to survive and thrive on the ARK!
    <br><br><br>
    Supports public online multiplayer for up to 70 players, private-session multiplayer for up to 8 players, and local split-screen for 2 players.`,
    mature: false,
    matureDescription: `<p>The developers describe the content like this:</p>
    <p><i>This Game may contain content not appropriate for all ages, or may not be appropriate for viewing at work: Frequent Violence or Gore, General Mature Content</i></p>`,
    req: {
      req64: true,
      mini: {
        os: "Windows 10/11 with updates",
        cpu: "AMD Ryzen 5 2600X, Intel Core i7-6800K",
        ram: "16 GB RAM",
        gpu: "AMD Radeon RX 5600 XT, NVIDIA GeForce 1080",
        dx: "Version 12",
        network: "Broadband Internet connection",
        storage: "70 GB available space",
        additionalNotes: "SSD Required",
      },
      recommended: {
        os: "Windows 10/11 with updates",
        cpu: "AMD Ryzen 5 3600X, Intel i5-10600K",
        ram: "32 GB RAM",
        gpu: "AMD Radeon RX 6800, NVIDIA GeForce RTX 3080",
        dx: "Version 12",
        network: "Broadband Internet connection",
        storage: "70 GB available space",
        additionalNotes: "SSD Required",
      }
    },
    reviews: [
      {user:"ibrahim", type:"negative", date: "1/12/2022", content:"bad game"},
      {user:"Mazen", type:"negative", date: "2/12/2022", content:"meh game"},
      {user:"mrCringe", type:"positive", date: "3/12/2022", content:"WOW BEST OPEN WORLD GAME EVERRRRRR!!!!"},
      {user:"Player20", type:"positive", date: "4/12/2022", content:"kinda good game"},
      {user:"Samy", type:"negative", date: "5/12/2022", content:"bg"},
      {user:"idiotgaming99", type:"positive", date: "6/12/2022", content:"Very nice gameplay and graphics"},
    ]
  },
  //9- Hogwarts Legacy
  {
    id: "9",
    name: "Hogwarts Legacy",
    category: "Adventure Games",
    description: "Hogwarts Legacy is an immersive, open-world action RPG. Now you can take control of the action and be at the center of your own adventure in the wizarding world.",
    releaseDate: "10 Feb, 2023",
    developer: { name: "Avalanche Software", link: ""},
    publisher: { name: "Warner Bros. Games", link: ""},
    mainImage:"https://cdn.akamai.steamstatic.com/steam/apps/990080/capsule_616x353.jpg",
    headerImage: "https://cdn.cloudflare.steamstatic.com/steam/apps/990080/header.jpg",
    backgroundImage: "https://cdn.akamai.steamstatic.com/steam/apps/990080/page_bg_generated_v6b.jpg",
    menuImg: "https://cdn.cloudflare.steamstatic.com/steam/apps/990080/capsule_231x87.jpg",
    moviesAndImages: [
      {
        type: "video",
        link: "https://cdn.cloudflare.steamstatic.com/steam/apps/256930504/movie480_vp9.webm",
        posterLink:
          "https://cdn.cloudflare.steamstatic.com/steam/apps/256930504/movie.293x165.jpg",
      },
      { type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/990080/ss_725bf58485beb4aa37a3a69c1e2baa69bf3e4653.1920x1080.jpg"},
      { type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/990080/ss_df93b5e8a183f7232d68be94ae78920a90de1443.1920x1080.jpg"},
      { type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/990080/ss_94058497bf0f8fabdde17ee8d59bece609a60663.1920x1080.jpg"},
      { type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/990080/ss_8e08976236d29b1897769257ac3c64e9264792a5.1920x1080.jpg"},
      { type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/990080/ss_d4930d675af053dc1e61a876a34fc003e85e261f.1920x1080.jpg"},
    ],
    reason: "available", // "available" or "recommended"
    discount: "no-discount", // "discount" or "no-discount"
    free: false,
    price: "$59.99",
    // offerType: "",
    // offerEndDate: "",
    // discountPrice:"",
    // discountPercentage: "",
    tags: ["RPG", "MMORPG", "Open World", "Adventure", "PvP"], // Array of tags
    win: "platform-image win",
    // mac: "platform-image mac", // Comment the varibale if the platform is not available
    features: [
      { link: "https://store.steampowered.com/search/?category2=2",  icon: "/images/ico_singlePlayer.png",label: "Single-player"},
      { link: "https://store.steampowered.com/search/?category2=22", icon: "/images/ico_achievements.png",label: "Steam Achievements"},
      { link: "https://store.steampowered.com/search/?category2=35", icon: "/images/ico_cart.png",        label: "in-App Purchases"},
      { link: "https://store.steampowered.com/search/?category2=23", icon: "/images/ico_cloud.png",       label: "Steam Cloud"},
      { link: "https://store.steampowered.com/search/?category2=35", icon: "/images/ico_hdr.png",         label: "HDR available"},
    ],
    languages: [
      { name: "English",             interface: true, fullAudio: true,  subtitles: true },
      { name: "French",              interface: true, fullAudio: true,  subtitles: true },
      { name: "German",              interface: true, fullAudio: true,  subtitles: true },
      { name: "Russian",             interface: true, fullAudio: true,  subtitles: true },
      { name: "Spanish",             interface: true, fullAudio: false, subtitles: true },
      { name: "Simplified Chinese",  interface: true, fullAudio: false, subtitles: true },
      { name: "Arabic",              interface: true, fullAudio: false, subtitles: true },
    ],
    link: "www.elderscrollsonline.com",
    // You can use your own HTML and CSS but scripts are not allowed for security reasons
    about: `<h2>About This Game</h2>
    Hogwarts Legacy is an open-world action RPG set in the world first introduced in the Harry Potter books. Embark on a journey through familiar and new locations as you explore and discover magical beasts, customize your character and craft potions, master spell casting, upgrade talents and become the wizard you want to be.
    <br><br>
    <img src="https://cdn.cloudflare.steamstatic.com/steam/apps/990080/extras/HWL_Featured_Animation.png?t=1699983982">
    <br><br>
    Experience Hogwarts in the 1800s. Your character is a student who holds the key to an ancient secret that threatens to tear the wizarding world apart. Make allies, battle Dark wizards, and ultimately decide the fate of the wizarding world. Your legacy is what you make of it. Live the Unwritten.
    <br><br>
    <img src="https://cdn.cloudflare.steamstatic.com/steam/apps/990080/extras/HWL_Features_600_Transparency.png?t=1699983982">
    <br><br>
    <img src="https://cdn.cloudflare.steamstatic.com/steam/apps/990080/extras/HWL_Pub_Dev_Logo.png?t=1699983982">`,
    mature: false,
    matureDescription: `<p>The developers describe the content like this:</p>
    <p><i>
    Blood and gore<br>
    Sexual themes<br>
    Use of alcohol<br>
    Violence</i>
    </p>`,
    req: {
      req64: true,
      mini: {
        os: "64-bit Windows 10",
        cpu: "Intel Core i5-6600 (3.3Ghz) or AMD Ryzen 5 1400 (3.2Ghz)",
        ram: "16 GB RAM",
        gpu: "NVIDIA GeForce GTX 960 4GB or AMD Radeon RX 470 4GB",
        dx: "Version 12",
        storage: "85 GB available space",
        additionalNotes: "SSD (Preferred), HDD (Supported), 720p/30 fps, Low Quality Settings",
      },
      recommended: {
        os: "64-bit Windows 10",
        cpu: "Intel Core i7-8700 (3.2Ghz) or AMD Ryzen 5 3600 (3.6 Ghz)",
        ram: "16 GB RAM",
        gpu: "NVIDIA GeForce 1080 Ti or AMD Radeon RX 5700 XT or INTEL Arc A770",
        dx: "Version 12",
        storage: "85 GB available space",
        additionalNotes: " SSD, 1080p/60 fps, High Quality Settings",
      }
    },
    legal: `HOGWARTS LEGACY software © 2023 Warner Bros. Entertainment Inc. Developed by Avalanche Software. WIZARDING WORLD and HARRY POTTER&nbsp;Publishing Rights © J.K. Rowling. PORTKEY GAMES, HOGWARTS LEGACY, WIZARDING WORLD AND HARRY POTTER characters, names and&nbsp;related indicia © and ™ Warner Bros. Entertainment Inc.<br>
    <br>
    WARNER BROS. GAMES LOGO, WB SHIELD: ™ &amp; © Warner Bros. Entertainment Inc. (s23)`,
    reviews: [
      {user:"ibrahim", type:"positive", date: "1/12/2022", content:"good game"},
      {user:"Mazen", type:"positive", date: "2/12/2022", content:"good game"},
      {user:"mrCringe", type:"positive", date: "3/12/2022", content:"BEST MMO GAME EVERRRRRR!!!!"},
      {user:"Player20", type:"positive", date: "4/12/2022", content:"very good game"},
      {user:"Samy", type:"positive", date: "5/12/2022", content:"gg"},
      {user:"idiotgaming99", type:"negative", date: "6/12/2022", content:"yuk magik is for kids"},
    ]
  },
  //10- Resident Evil 4
  {
    id: "10",
    name: "Resident Evil 4",
    category: "Action Games",
    description: "Survival is just the beginning. Six years have passed since the biological disaster in Raccoon City. Leon S. Kennedy, one of the survivors, tracks the president's kidnapped daughter to a secluded European village, where there is something terribly wrong with the locals.",
    releaseDate: "24 Mar, 2023",
    developer: { name: "CAPCOM Co., Ltd.", link: ""},
    publisher: { name: "CAPCOM Co., Ltd.", link: ""},
    mainImage:"https://cdn.akamai.steamstatic.com/steam/apps/2050650/capsule_616x353.jpg",
    headerImage: "https://cdn.cloudflare.steamstatic.com/steam/apps/2050650/header.jpg",
    backgroundImage: "https://cdn.akamai.steamstatic.com/steam/apps/2050650/page_bg_generated_v6b.jpg",
    menuImg: "https://cdn.cloudflare.steamstatic.com/steam/apps/2050650/capsule_231x87.jpg",
    moviesAndImages: [
      { type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/2050650/ss_59d1b19964cc532213df92c8287b75a0bffeb33c.1920x1080.jpg"},
      { type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/2050650/ss_ab807f8ad9e968a620777caf483cb6020367b9ee.1920x1080.jpg"},
      { type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/2050650/ss_0442f7fb4327d79802c2db8ea8d23d228a28d896.1920x1080.jpg"},
      { type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/2050650/ss_69810f4cd155912fdfdd21da70181df7d454c874.1920x1080.jpg"},
      { type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/2050650/ss_0596bac955340495562f3ff2538756ebd9a7f073.1920x1080.jpg"},
      { type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/2050650/ss_0554b945aafc847d55f780f7968de00aafa968a3.1920x1080.jpg"},
      { type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/2050650/ss_29ffb23060c862bcbe1d1434e83d41ab10484d8e.1920x1080.jpg"},
      { type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/2050650/ss_5a4297e594297a13f1f4c665966eb3d88d37b58d.1920x1080.jpg"},
      { type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/2050650/ss_440756cbcb0231dd325991d38b85d3b60d976b95.1920x1080.jpg"},
      { type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/2050650/ss_72888d13c9e3995f05a2886a51f0dc8791e28afa.1920x1080.jpg"},
      { type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/2050650/ss_d90819dc43141eee26b69a6cab43be00164adcb0.1920x1080.jpg"},
      { type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/2050650/ss_b9fbb8b2d7e1204a074033e9bb9a19fa54f765fb.1920x1080.jpg"},
      { type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/2050650/ss_d8967ced32ccbbd94f852b3843a5b76febf3ef16.1920x1080.jpg"},
      { type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/2050650/ss_98d9687b6acf5feff600b483d9f30e52079091e9.1920x1080.jpg"},
      { type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/2050650/ss_82cef99075c8e19ec71d2aae8b0a19815695c5a7.1920x1080.jpg"},
      { type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/2050650/ss_2f026b10ab2facd11820737453512b3b88c5a863.1920x1080.jpg"},
    ],
    reason: "available", // "available" or "recommended"
    discount: "discount", // "discount" or "no-discount"
    free: false,
    price: "$44.99",
    offerType: "SPECIAL PROMOTION",
    offerEndDate: "21 December",
    discountPrice:"$22.49",
    discountPercentage: "43%",
    tags: ["Action", "Horror", "Survival Horror", "Zombies", "Dark"], // Array of tags
    win: "platform-image win",
    // mac: "platform-image mac", // Comment the varibale if the platform is not available
    features: [
      { link: "https://store.steampowered.com/search/?category2=2",  icon: "/images/ico_singlePlayer.png",label: "Single-player"},
      { link: "https://store.steampowered.com/search/?category2=22", icon: "/images/ico_achievements.png",label: "Steam Achievements"},
      { link: "https://store.steampowered.com/search/?category2=29", icon: "/images/ico_cards.png",       label: "Steam Trading Cards"},
      { link: "https://store.steampowered.com/search/?category2=23", icon: "/images/ico_cloud.png",       label: "Steam Cloud"},
      { link: "https://store.steampowered.com/search/?category2=35", icon: "/images/ico_hdr.png",         label: "HDR available"},


    ],
    languages: [
      { name: "English",             interface: true, fullAudio: true,  subtitles: false },
      { name: "Japanese",            interface: true, fullAudio: true,  subtitles: false },
      { name: "Russian",             interface: true, fullAudio: true,  subtitles: false },
      { name: "Simplified Chinese",  interface: true, fullAudio: true,  subtitles: false },
      { name: "Korean",              interface: true, fullAudio: true,  subtitles: false },
      { name: "French",              interface: true, fullAudio: true,  subtitles: false },
      { name: "German",              interface: true, fullAudio: true,  subtitles: false },
      { name: "Spanish",             interface: true, fullAudio: true,  subtitles: false },
      { name: "Polish",              interface: true, fullAudio: false, subtitles: false },
      { name: "Portguese",           interface: true, fullAudio: true,  subtitles: false },
      { name: "Turkish",             interface: true, fullAudio: false, subtitles: false },
      { name: "Italian",             interface: true, fullAudio: true,  subtitles: false },
      { name: "Traditional Chinese", interface: true, fullAudio: false, subtitles: false },
      { name: "Ukrainian",           interface: true, fullAudio: false, subtitles: false },
    ],
    link: "www.residentevil.com",
    // You can use your own HTML and CSS but scripts are not allowed for security reasons
    about: `Survival is just the beginning.<br>
    <br>
    Six years have passed since the biological disaster in Raccoon City.
    <br>
    Agent Leon S. Kennedy, one of the survivors of the incident, has been sent to rescue the president's kidnapped daughter.<br>
    He tracks her to a secluded European village, where there is something terribly wrong with the locals.
    <br>
    And the curtain rises on this story of daring rescue and grueling horror where life and death, terror and catharsis intersect.
    <br><br>
    Featuring modernized gameplay, a reimagined storyline, and vividly detailed graphics,
    <br>
    Resident Evil 4 marks the rebirth of an industry juggernaut.
    <br><br>
    Relive the nightmare that revolutionized survival horror.`,
    mature: false,
    matureDescription: `<p>The developers describe the content like this:</p>
    <p><i>This Game may contain content not appropriate for all ages, or may not be appropriate for viewing at work: Frequent Violence or Gore, General Mature Content</i></p>`,
    req: {
      req64: true,
      mini: {
        os: "Windows 10 (64 bit)",
        cpu: "AMD Ryzen 3 1200 / Intel Core i5-7500",
        ram: "8 GB RAM",
        gpu: "AMD Radeon RX 560 with 4GB VRAM / NVIDIA GeForce GTX 1050 Ti with 4GB VRAM",
        dx: "Version 12",
        network: "Broadband Internet connection",
        additionalNotes: "Estimated performance (when set to Prioritize Performance): 1080p/45fps. ・Framerate might drop in graphics-intensive scenes. ・AMD Radeon RX 6700 XT or NVIDIA GeForce RTX 2060 required to support ray tracing.",
      },
      recommended: {
        os: "Windows 10 (64 bit)/Windows 11 (64 bit)",
        cpu: "AMD Ryzen 5 3600 / Intel Core i7 8700",
        ram: "16 GB RAM",
        gpu: "AMD Radeon RX 5700 / NVIDIA GeForce GTX 1070",
        dx: "Version 12",
        network: "Broadband Internet connection",
        additionalNotes: "Estimated performance: 1080p/60fps ・Framerate might drop in graphics-intensive scenes. ・AMD Radeon RX 6700 XT or NVIDIA GeForce RTX 2070 required to support ray tracing.",
      }
    },
    reviews: [
      {user:"ibrahim", type:"positive", date: "1/12/2022", content:"good game"},
      {user:"Mazen", type:"positive", date: "2/12/2022", content:"good game"},
      {user:"mrCringe", type:"positive", date: "3/12/2022", content:"WOW BEST HORROR GAME EVERRRRRR!!!!"},
      {user:"Player20", type:"positive", date: "4/12/2022", content:"kinda good game"},
      {user:"Samy", type:"positive", date: "5/12/2022", content:"gg"},
      {user:"idiotgaming99", type:"positive", date: "6/12/2022", content:"Very nice gameplay and graphics"},
    ]
  },
  //11- Assassin's Creed Valhalla
  {
    id: "11",
    name: "Assassin's Creed Valhalla",
    category: "Action Games",
    description: "Become a legendary Viking on a quest for glory. Raid your enemies, grow your settlement, and build your political power.",
    releaseDate: "6 Dec, 2022",
    developer: { name: "Ubisoft Montreal", link: ""},
    publisher: { name: "Ubisoft", link: ""},
    mainImage:"https://cdn.akamai.steamstatic.com/steam/apps/2208920/capsule_616x353.jpg",
    headerImage: "https://cdn.cloudflare.steamstatic.com/steam/apps/2208920/header.jpg",
    backgroundImage: "https://cdn.akamai.steamstatic.com/steam/apps/2208920/page_bg_generated_v6b.jpg",
    menuImg: "https://cdn.cloudflare.steamstatic.com/steam/apps/2208920/capsule_231x87.jpg",
    moviesAndImages: [
      {
        type: "video",
        link: "https://cdn.cloudflare.steamstatic.com/steam/apps/256917295/movie480_vp9.webm",
        posterLink:
          "https://cdn.cloudflare.steamstatic.com/steam/apps/256917310/movie.293x165.jpg",
      },
      { type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/2208920/ss_103481084a59b34837113daf27c04679caf743f3.1920x1080.jpg"},
      { type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/2208920/ss_e7310b36689ec722d2ea4643efc15bd8fa720c67.1920x1080.jpg"},
      { type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/2208920/ss_c3bff917ead50268eb7708ef3bf30e07b58929e9.1920x1080.jpg"},
      { type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/2208920/ss_5e527e1e063ef041ca6680f503081274dcc5513a.1920x1080.jpg"},
      { type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/2208920/ss_83a5e49815eed62911f27240390c6735b898c13e.1920x1080.jpg"},
    ],
    reason: "available", // "available" or "recommended"
    discount: "discount", // "discount" or "no-discount"
    free: false,
    price: "$47.99",
    offerType: "WEEKEND DEAL",
    offerEndDate: "15 December",
    discountPrice:"$11.99",
    discountPercentage: "75%",
    tags: ["Action", "Open World", "RPG", "Adventure", "Vikings"], // Array of tags
    win: "platform-image win",
    // mac: "platform-image mac", // Comment the varibale if the platform is not available
    features: [
      { link: "https://store.steampowered.com/search/?category2=2",  icon: "/images/ico_singlePlayer.png",label: "Single-player"},
      { link: "https://store.steampowered.com/search/?category2=13", icon: "/images/ico_cc.png",          label: "Captions available"},
      { link: "https://store.steampowered.com/search/?category2=35", icon: "/images/ico_cart.png",        label: "in-App Purchases"},
    ],
    languages: [
      { name: "English",             interface: true, fullAudio: true,  subtitles: true },
      { name: "French",              interface: true, fullAudio: true,  subtitles: true },
      { name: "German",              interface: true, fullAudio: true,  subtitles: true },
      { name: "Russian",             interface: true, fullAudio: true,  subtitles: true },
      { name: "Spanish",             interface: true, fullAudio: true,  subtitles: true },
      { name: "Simplified Chinese",  interface: true, fullAudio: false, subtitles: true },
      { name: "Traditional Chinese", interface: true, fullAudio: false, subtitles: true },
      { name: "Arabic",              interface: true, fullAudio: false, subtitles: true },
      { name: "Korean",              interface: true, fullAudio: false, subtitles: true },
      { name: "japanese",            interface: true, fullAudio: true,  subtitles: true },
      { name: "Polish",              interface: true, fullAudio: false, subtitles: true },
    ],
    link: "www.assassinscreed.com",
    // You can use your own HTML and CSS but scripts are not allowed for security reasons
    about: `<img src="https://cdn.cloudflare.steamstatic.com/steam/apps/2208920/extras/KeyFeature_Banner_1_Intro.png?t=1697654233">
    <br><br>
    Become Eivor, a legendary Viking raider on a quest for glory. 
    <br><br>
    - Lead epic Viking raids against Saxon troops and fortresses.
    <br>
    - Relive the visceral fighting style of the Vikings as you dual-wield powerful weapons.
    <br>
    - Challenge yourself with the most varied collection of enemies ever in Assassin's Creed.
    <br>
    - Shape the growth of your character and your clan's settlement with every choice you make.
    <br>
    - Explore a Dark Age open world, from the harsh shores of Norway to the beautiful kingdoms of England.
    <br><br>
    Includes the Forgotten Saga, a FREE new rogue-lite game mode for all Assassin's Creed® Valhalla players.`,
    mature: true,
    matureDescription: `<p>The developers describe the content like this:</p>
    <p><i>
    This Game may contain content not appropriate for all ages, or may not be appropriate for viewing at work: Some Nudity or Sexual Content, Frequent Violence or Gore, General Mature Content</i>`,
    req: {
      req64: true,
      mini: {
        os: "Windows 10 (versions 64 bits uniquement)",
        cpu: "AMD Ryzen 3 1200 3.1 GHz / Intel Core i5-4460 3.2 GHz",
        ram: "8 GB RAM",
        gpu: "AMD R9 380 /NVIDIA GeForce GTX 960",
        dx: "Version 12",
        storage: "160 GB available space",
      },
      recommended: {
        os: "Windows 10 (versions 64 bits uniquement)",
        cpu: "AMD Ryzen 5 1600 3.2 GHz / Intel Core i7-4790 3.6 GHz",
        ram: "8 GB RAM",
        gpu: "AMD R9 380 /NVIDIA GeForce GTX 960",
        dx: "Version 12",
        storage: "160 GB available space",
      }
    },
    legal: `© 2022 Ubisoft Entertainment. All Rights Reserved. Assassin’s Creed, Ubisoft, and the Ubisoft logo are registered or unregistered trademarks of Ubisoft Entertainment in the US and/or other countries.`,
    reviews: [
      {user:"ibrahim", type:"positive", date: "1/12/2022", content:"good game"},
      {user:"Mazen", type:"positive", date: "2/12/2022", content:"good game"},
      {user:"mrCringe", type:"positive", date: "3/12/2022", content:"BEST MMO GAME EVERRRRRR!!!!"},
      {user:"Player20", type:"positive", date: "4/12/2022", content:"very good game"},
      {user:"Samy", type:"positive", date: "5/12/2022", content:"gg"},
      {user:"idiotgaming99", type:"negative", date: "6/12/2022", content:"yuk I hate this viking killers"},
    ]
  },
  //12- Tower of Fantasy
  {
    id: "12",
    name: "Tower of Fantasy",
    category: "Massively Multiplayer Games",
    description: "Embark together on your fantasy adventure! Set hundreds of years in the future on the distant planet of Aida, the shared open-world RPG, anime-infused sci-fi adventure Tower of Fantasy now is officially available on Steam.",
    releaseDate: "20 Oct, 2022",
    developer: { name: "Hotta Studio", link: ""},
    publisher: { name: "Level Infinite", link: ""},
    mainImage:"https://cdn.akamai.steamstatic.com/steam/apps/2064650/capsule_616x353.jpg",
    headerImage: "https://cdn.cloudflare.steamstatic.com/steam/apps/2064650/header.jpg",
    backgroundImage: "https://cdn.akamai.steamstatic.com/steam/apps/2064650/page_bg_generated_v6b.jpg",
    menuImg: "https://cdn.cloudflare.steamstatic.com/steam/apps/2064650/capsule_231x87.jpg",
    moviesAndImages: [
      {
        type: "video",
        link: "https://cdn.cloudflare.steamstatic.com/steam/apps/256962503/movie480_vp9.webm",
        posterLink:
          "https://cdn.cloudflare.steamstatic.com/steam/apps/256962503/movie.293x165.jpg",
      },
      { type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/2064650/ss_cadfb0d5f288b6738d4299839d98e321665423c4.1920x1080.jpg"},
      { type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/2064650/ss_fc4ba498a4b2984fbad2c5625eb76004a33cbdaf.1920x1080.jpg"},
      { type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/2064650/ss_5376f537c6fdbb104626fbc112b60a65aa395298.1920x1080.jpg"},
      { type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/2064650/ss_03d84606f1079083a8e2ea61f021c056d0b08192.1920x1080.jpg"},
      { type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/2064650/ss_99464d63a0ba796a00c404687bafc369c1304f72.1920x1080.jpg"},
      { type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/2064650/ss_ac45db938493bfaca15ec7a1a3579c95e3d386c7.1920x1080.jpg"},
      { type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/2064650/ss_83dd24994bf94c3e1a7993d517c9e05224dbe865.1920x1080.jpg"},
      { type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/2064650/ss_a113b72928b8a15ec7be1d377a9d4bdff95bd83e.1920x1080.jpg"},
      { type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/2064650/ss_cd93032fe83f53d8ebf47fc058b0c2a275a3c3c3.1920x1080.jpg"},
      { type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/2064650/ss_64dbd380db8e80da0c2c8d166246019863b58b88.1920x1080.jpg"},
      { type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/2064650/ss_f7df5329d64af42b5af1b81280c546624c34af27.1920x1080.jpg"},
      { type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/2064650/ss_8bf607cf5eea4c64e063e0dbe03ed8de3d6a0449.1920x1080.jpg"},
      { type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/2064650/ss_670e1dad03d6e4b224da0c71e568ab875d1c70cd.1920x1080.jpg"},
      { type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/2064650/ss_0e885b85647f4f434fba43c9a4d71ad574b0c8d0.1920x1080.jpg"},
      { type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/2064650/ss_c561b9785c221e20965e4196444bcaa8815f8ba3.1920x1080.jpg"},
      { type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/2064650/ss_afac4f48ca77323370ce4a1cef972ed40e23fb44.1920x1080.jpg"},
      { type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/2064650/ss_dd5444a5e384ffddd8fa98443bcef40ff5aaf088.1920x1080.jpg"},
      { type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/2064650/ss_59744b227fbb8abca13bd4fb42cd5139d063575e.1920x1080.jpg"},
      { type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/2064650/ss_fe55eaead3a844ed7728b1aa45413cd1a31e6338.1920x1080.jpg"},
      {
        type: "video",
        link: "https://cdn.cloudflare.steamstatic.com/steam/apps/256928575/movie480_vp9.webm?t=1675424239",
        posterLink:
          "https://cdn.cloudflare.steamstatic.com/steam/apps/256928575/movie.293x165.jpg",
      },
    ],
    reason: "available", // "available" or "recommended"
    discount: "no-discount", // "discount" or "no-discount"
    free: true,
    price: "Free To Play",
    // offerType: "",
    // offerEndDate: "",
    // discountPrice:"",
    // discountPercentage: "",
    tags: ["RPG", "MMORPG", "Open World", "Anime", "Action"], // Array of tags
    win: "platform-image win",
    mac: "platform-image mac", // Comment the varibale if the platform is not available
    features: [
      { link: "https://store.steampowered.com/search/?category2=20", icon: "/images/ico_multiPlayer.png", label: "MMO"},
      { link: "https://store.steampowered.com/search/?category2=36", icon: "/images/ico_multiPlayer.png", label: "Online PvP"},
      { link: "https://store.steampowered.com/search/?category2=38", icon: "/images/ico_coop.png",        label: "Online Co-op"},
      { link: "https://store.steampowered.com/search/?category2=27", icon: "/images/ico_multiPlayer.png", label: "Cross-Platform Multiplayer"},
      { link: "https://store.steampowered.com/search/?category2=35", icon: "/images/ico_cart.png",        label: "in-App Purchases"},
    ],
    languages: [
      { name: "English",             interface: true, fullAudio: true,  subtitles: true },
      { name: "French",              interface: true, fullAudio: false, subtitles: true },
      { name: "German",              interface: true, fullAudio: false, subtitles: true },
      { name: "Japanese",            interface: true, fullAudio: true,  subtitles: true },
      { name: "Russian",             interface: true, fullAudio: false, subtitles: true },
      { name: "Spanish",             interface: true, fullAudio: false, subtitles: true },
      { name: "Portuguese",          interface: true, fullAudio: true,  subtitles: true },
      { name: "Thai",                interface: true, fullAudio: false, subtitles: true },
    ],
    link: "www.toweroffantasy-global.com",
    // You can use your own HTML and CSS but scripts are not allowed for security reasons
    about: `<strong>Embark together on your fantasy adventure!</strong>
    <br>
    <br>
    Set hundreds of years in the future on the distant planet of Aida, the shared open-world MMORPG, anime-infused sci-fi adventure Tower of Fantasy from developer Hotta Studio and publisher Level Infinite, is now available on PC and mobile platforms globally. Players will be able to experience an anime-inspired post-apocalyptic sci-fi art style, freeform character development, and exciting combat through thrilling battles and exciting open-world exploration.
    <br><br>
    In Tower of Fantasy, dwindling resources and a lack of energy have forced mankind to leave earth and migrate to Aida, a lush and habitable alien world. There, they observed the comet Mara and discovered an unknown but powerful energy called "Omnium" contained in it. They built the Omnium Tower to capture Mara, but due to the influence of Omnium radiation, a catastrophic disaster occurred on their new homeworld.
    <br><br>
    <strong>Immersive Open-World</strong>
    <br>
    Experience a vast alien world full of beautiful open vistas and imposing futuristic structures.
    <br><br>
    <strong>Unique Characters</strong>
    <br>
    Wield the unique weapons of each character that grant different gameplay styles as you explore their compelling backstories.
    <br><br>
    <strong>Grow and Explore Together</strong>
    <br>Party up with friends online and take on new adventures in the shared open world.
    <br><br>
    <strong>Epic Combat</strong>
    <br>
    Engage in epic battles against enemies of all shapes and sizes as you switch weapons and gameplay styles on the fly to unlock your own personal fighting style. 
    <br><br>
    <strong>Explore and Interact</strong>
    <br>
    Explore and interact with a vibrant living world as you discover your own journey through it.
    <br><br>
    <strong>To learn more about Tower of Fantasy, go to <a href="https://steamcommunity.com/linkfilter/?u=https%3A%2F%2Ftoweroffantasy-global.com" target="_blank" rel=" noopener">https://toweroffantasy-global.com</a> or check out our other official channels:</strong>
    <br>
    Facebook: <a href="https://steamcommunity.com/linkfilter/?u=https%3A%2F%2Fwww.facebook.com%2FTower.of.Fantasy.Official" target="_blank" rel=" noopener">https://www.facebook.com/Tower.of.Fantasy.Official</a>
    <br>
    Instagram: <a href="https://steamcommunity.com/linkfilter/?u=https%3A%2F%2Fwww.instagram.com%2F%40toweroffantasy_official" target="_blank" rel=" noopener">https://www.instagram.com/@toweroffantasy_official</a>
    <br>
    Twitter: <a href="https://twitter.com/ToF_EN_Official" target="_blank" rel="">https://twitter.com/ToF_EN_Official</a>
    <br>
    YouTube: <a href="https://www.youtube.com/channel/UC1NbDLZjc41RQk-pV94mu_A/about" target="_blank" rel="">https://www.youtube.com/channel/UC1NbDLZjc41RQk-pV94mu_A/about</a>
    <br>
    Discord: <a href="https://steamcommunity.com/linkfilter/?u=https%3A%2F%2Fdiscord.gg%2FeDgkQJ4aYe" target="_blank" rel=" noopener">https://discord.gg/eDgkQJ4aYe</a>`,
    mature: false,
    matureDescription: `<p>The developers describe the content like this:</p>
    <p><i>
    Blood and gore<br>
    Sexual themes<br>
    Use of alcohol<br>
    Violence</i>
    </p>`,
    req: {
      req64: true,
      mini: {
        os: "Windows 7 SP1 64-bit",
        cpu: "Intel Core i5 or equivalent",
        ram: "8 GB RAM",
        gpu: "NVIDIA GeForce GT 1030",
        dx: "Version 11",
        network: "Broadband Internet connection",
        storage: "25 GB available space",
      },
      recommended: {
        os: "Windows 10 64-bit",
        cpu: "Intel Core i7",
        ram: "16 GB RAM",
        gpu: "NVIDIA GeForce GT 1060 6GB",
        dx: "Version 12",
        network: "Broadband Internet connection",
        storage: "30 GB available space",
      }
    },
    legal: `Tower of Fantasy©2022 Hotta Studio, a Perfect World company. All Rights Reserved.<br>
    ©2022 Proxima Beta Pte. Ltd. All rights reserved.`,
    reviews: [

    ]
  },
];

export default gameData;
