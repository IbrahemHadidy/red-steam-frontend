interface VideoEntry {
  type: "video";
  link: string;
  posterLink: string;
}

interface ImageEntry {
  type: "image";
  link: string;
}

type MovieEntry = VideoEntry | ImageEntry;

interface gamesData {
    id: string;
    name: string;
    category: string;
    description: string;
    releaseDate: string;
    developer: {
        name: string,
        link: string,
    };
    publisher: {
        name: string,
        link: string,
    };
    backgroundImage: string;
    headerImage: string;
    moviesAndImages: MovieEntry[];
    reason: "available" | "recommended";
    tags: string[];
    discount: "no-discount" | "discount";
    discountPercentage?: string;
    free: boolean;
    price: string;
    discountPrice?: string;
    win: string;
    mac?: string;
  }

const gameData: gamesData[] = [
  {
    // PUBG: BATTLEGROUNDS
    id: "1",
    name: "PUBG: BATTLEGROUNDS",
    category: "Free to Play Games",
    description: "Play PUBG: BATTLEGROUNDS for free. Land on strategic locations, loot weapons and supplies, and survive to become the last team standing across various, diverse Battlegrounds. Squad up and join the Battlegrounds for the original Battle Royale experience that only PUBG: BATTLEGROUNDS can offer.",
    releaseDate: "21 Dec,2017",
    developer: {
        name: "KRAFTON, Inc.",
        link: "https://store.steampowered.com/developer/KRAFTON",
    },
    publisher: {
        name: "KRAFTON, Inc.",
        link: "https://store.steampowered.com/publisher/KRAFTON",
    },
    headerImage: "https://cdn.cloudflare.steamstatic.com/steam/apps/578080/header.jpg",
    backgroundImage: "https://cdn.cloudflare.steamstatic.com/steam/apps/2344520/page_bg_generated_v6b.jpg",
    moviesAndImages: [
      {
        type: "video",
        link: "https://cdn.cloudflare.steamstatic.com/steam/apps/256940388/movie480_vp9.webm",
        posterLink: "https://cdn.cloudflare.steamstatic.com/steam/apps/256940388/movie.293x165.jpg",
      },
      {
        type: "video",
        link: "https://cdn.cloudflare.steamstatic.com/steam/apps/256919601/movie480_vp9.webm",
        posterLink: "https://cdn.cloudflare.steamstatic.com/steam/apps/256919601/movie.293x165.jpg",
      },
      {
        type: "image",
        link: "https://cdn.cloudflare.steamstatic.com/steam/apps/578080/ss_63bb4a659968c3417ddd2ea5fd82cd2143e458a0.600x338.jpg",
      },
      {
        type: "image",
        link: "https://cdn.cloudflare.steamstatic.com/steam/apps/578080/ss_93e6e1fa807c3b3b09ce4e1e4800e7723dc308a1.600x338.jpg",
      },
      {
        type: "image",
        link: "https://cdn.cloudflare.steamstatic.com/steam/apps/578080/ss_11e51d12d854712ed7c83e69f1b21d246ab018b3.600x338.jpg",
      },
      {
        type: "image",
        link: "https://cdn.cloudflare.steamstatic.com/steam/apps/578080/ss_034714c0f118657ac694c5b9c43bb647ed9ec051.600x338.jpg",
      },
      {
        type: "image",
        link: "https://cdn.cloudflare.steamstatic.com/steam/apps/578080/ss_109d7072cf85f5b3b1e3dacadf3009718db451c4.600x338.jpg",
      },
      {
        type: "image",
        link: "https://cdn.cloudflare.steamstatic.com/steam/apps/578080/ss_66e156cf716e72096c15c132c3443e774cb2f9a5.600x338.jpg",
      },
      {
        type: "image",
        link: "https://cdn.cloudflare.steamstatic.com/steam/apps/578080/ss_0ed7a688a11af33acc56a453d2c8274890cc83db.600x338.jpg",
      },
      {
        type: "image",
        link: "https://cdn.cloudflare.steamstatic.com/steam/apps/578080/ss_c2456a0981b61eca4e84d3ff62fff6c78d61a6d0.600x338.jpg",
      },
      {
        type: "image",
        link: "https://cdn.cloudflare.steamstatic.com/steam/apps/578080/ss_f148e1cd44da2972d1b61da1e12b7b3587c1f6a3.600x338.jpg",
      },
      {
        type: "image",
        link: "https://cdn.cloudflare.steamstatic.com/steam/apps/578080/ss_8814c071f0cce53821d8e1b1a96de78d00e5d4d1.600x338.jpg",
      },
      {
        type: "image",
        link: "https://cdn.cloudflare.steamstatic.com/steam/apps/578080/ss_0985fff929498a15793fc3df766607fb54bf5338.600x338.jpg",
      },
      {
        type: "image",
        link: "https://cdn.cloudflare.steamstatic.com/steam/apps/578080/ss_e34bcd20c7e3f5244c17b5af5d192b2149e11d33.600x338.jpg",
      },
      {
        type: "video",
        link: "https://cdn.cloudflare.steamstatic.com/steam/apps/256896251/movie480_vp9.webm",
        posterLink: "https://cdn.cloudflare.steamstatic.com/steam/apps/256896251/movie.293x165.jpg",
      },
      {
        type: "video",
        link: "https://cdn.cloudflare.steamstatic.com/steam/apps/256842241/movie480_vp9.webm",
        posterLink: "https://cdn.cloudflare.steamstatic.com/steam/apps/256842241/movie.293x165.jpg",
      },
    ],
    reason: "available", // "available" or "recommended"
    discount: "no-discount", // "discount" or "no-discount"
    free: true,
    price: "Free to Play",
    // discountPrice:"",
    // discountPercentage: "",
    tags: ["Survival", "Shooter", "Battle Royale", "Multiplayer"], // Array of tags
    win: "platform-image win",
    // mac: "platform-image mac", // Comment the varibale if the platform is not available
  },
];

export default gameData;
