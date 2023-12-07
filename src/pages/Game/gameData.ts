export type MovieEntry = VideoEntry | ImageEntry;
export interface VideoEntry { type: "video", link: string, posterLink: string }
export interface ImageEntry { type: "image", link: string }
export interface FeatureEntry { link: string, icon: string, label: string }
export interface LanguageEntry { name: string, interface: boolean, fullAudio: boolean, subtitles: boolean }
export interface SystemRequirements {
  req64: boolean;
  mini: SystemRequirementsDetails;
  recommended: SystemRequirementsDetails;
}
export interface SystemRequirementsDetails {
  os: string;
  cpu: string;
  ram: string;
  gpu: string;
  dx: string;
  network: string;
  storage: string;
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
  backgroundImage: string;
  capsulePic: string;
  headerImage: string;
  moviesAndImages: MovieEntry[];
  reason: "available" | "recommended";
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
  menuImg: string;
  features: FeatureEntry[];
  languages: LanguageEntry[];
  link: string;
  about: string;
  mature: boolean;
  matureDescription: string;
  req: SystemRequirements;
  legal: string;
  reviews: ReviewEntry[];
}

const gameData: gamesData[] = [
  // PUBG: BATTLEGROUNDS
  {
    id: "1",
    name: "PUBG: BATTLEGROUNDS",
    category: "Free to Play Games",
    description: "Play PUBG: BATTLEGROUNDS for free. Land on strategic locations, loot weapons and supplies, and survive to become the last team standing across various, diverse Battlegrounds. Squad up and join the Battlegrounds for the original Battle Royale experience that only PUBG: BATTLEGROUNDS can offer.",
    releaseDate: "21 Dec, 2017",
    developer: { name: "KRAFTON, Inc.", link: "https://store.steampowered.com/developer/KRAFTON"},
    publisher: { name: "KRAFTON, Inc.", link: "https://store.steampowered.com/publisher/KRAFTON"},
    headerImage: "https://cdn.cloudflare.steamstatic.com/steam/apps/578080/header.jpg",
    backgroundImage: "https://cdn.cloudflare.steamstatic.com/steam/apps/2344520/page_bg_generated_v6b.jpg",
    capsulePic: "https://cdn.cloudflare.steamstatic.com/steam/apps/578080/capsule_231x87.jpg",
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
      { type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/578080/ss_63bb4a659968c3417ddd2ea5fd82cd2143e458a0.600x338.jpg"},
      { type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/578080/ss_93e6e1fa807c3b3b09ce4e1e4800e7723dc308a1.600x338.jpg"},
      { type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/578080/ss_11e51d12d854712ed7c83e69f1b21d246ab018b3.600x338.jpg"},
      { type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/578080/ss_034714c0f118657ac694c5b9c43bb647ed9ec051.600x338.jpg"},
      { type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/578080/ss_109d7072cf85f5b3b1e3dacadf3009718db451c4.600x338.jpg"},
      { type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/578080/ss_66e156cf716e72096c15c132c3443e774cb2f9a5.600x338.jpg"},
      { type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/578080/ss_0ed7a688a11af33acc56a453d2c8274890cc83db.600x338.jpg"},
      { type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/578080/ss_c2456a0981b61eca4e84d3ff62fff6c78d61a6d0.600x338.jpg"},
      { type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/578080/ss_f148e1cd44da2972d1b61da1e12b7b3587c1f6a3.600x338.jpg"},
      { type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/578080/ss_8814c071f0cce53821d8e1b1a96de78d00e5d4d1.600x338.jpg"},
      { type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/578080/ss_0985fff929498a15793fc3df766607fb54bf5338.600x338.jpg"},
      { type: "image", link: "https://cdn.cloudflare.steamstatic.com/steam/apps/578080/ss_e34bcd20c7e3f5244c17b5af5d192b2149e11d33.600x338.jpg"},
      {
        type: "video",
        link: "https://cdn.cloudflare.steamstatic.com/steam/apps/256896251/movie480_vp9.webm",
        posterLink:
          "https://cdn.cloudflare.steamstatic.com/steam/apps/256896251/movie.293x165.jpg",
      },
      {
        type: "video",
        link: "https://cdn.cloudflare.steamstatic.com/steam/apps/256842241/movie480_vp9.webm",
        posterLink:
          "https://cdn.cloudflare.steamstatic.com/steam/apps/256842241/movie.293x165.jpg",
      },
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
    menuImg: "https://cdn.cloudflare.steamstatic.com/steam/apps/578080/capsule_231x87.jpg",
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
    about: `<strong>LAND, LOOT, SURVIVE!</strong><br>Play PUBG: BATTLEGROUNDS for free.<br>Land on strategic locations, loot weapons and supplies, and survive to become the last team standing across various, diverse Battlegrounds.<br>Squad up and join the Battlegrounds for the original Battle Royale experience that only&nbsp;PUBG: BATTLEGROUNDS can offer.<br><br>This content download will also provide access to the BATTLEGROUNDS Test Server, which requires a separate download to play.&nbsp;<br>Optional in-game purchases available.`,
    mature: true,
    matureDescription: `<p>The developers describe the content like this:</p>
    <p><i>
    This Game may contain content not appropriate for all ages, or may not be appropriate for viewing at work: Frequent Violence or Gore, General Mature Content				</i>
    </p>`,
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
      {user:"idiotgaming69", type:"positive", date: "6/12/2022", content:"Very nice gameplay and graphics"},
    ]
  },
];

export default gameData;
