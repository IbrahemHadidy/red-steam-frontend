interface vrGame {
  link: string;
  img: string;
  discount: "no-discount" | "discount";
  discountPrecentage?: string;
  price: string;
  discountPrice?: string;
}

const popularVRGames: vrGame[] = [
  {
    link: "https://store.steampowered.com/app/1811260/EA_SPORTS_FIFA_23/",
    img: "https://cdn.cloudflare.steamstatic.com/steam/apps/1811260/header_292x136.jpg",
    discount: "no-discount", // "discount" or "no-discount"
    // discountPrecentage: "-10%",
    price: "$54.99 USD",
    // discountPrice: "$40.49 USD",
  },
  {
    link: "https://store.steampowered.com/app/1938090/Call_of_Duty/",
    img: "https://cdn.cloudflare.steamstatic.com/steam/apps/1938090/header_292x136.jpg",
    discount: "no-discount", // "discount" or "no-discount"
    discountPrecentage: "-10%",
    price: "$59.99 USD",
    discountPrice: "$40.49 USD",
  },
  {
    link: "https://store.steampowered.com/app/1245620/ELDEN_RING/",
    img: "https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/header_292x136.jpg",
    discount: "no-discount", // "discount" or "no-discount"
    discountPrecentage: "-10%",
    price: "$59.99 USD",
    discountPrice: "$40.49 USD",
  },
  {
    link: "https://store.steampowered.com/app/1815780/Asphalt_9_Legends/",
    img: "https://cdn.cloudflare.steamstatic.com/steam/apps/1815780/header_292x136.jpg",
    discount: "no-discount", // "discount" or "no-discount"
    discountPrecentage: "-10%",
    price: "Free to Play",
    discountPrice: "$40.49 USD",
  },
  {
    link: "https://store.steampowered.com/app/1677740/Stumble_Guys/",
    img: "https://cdn.cloudflare.steamstatic.com/steam/apps/1677740/header_292x136.jpg",
    discount: "no-discount", // "discount" or "no-discount"
    // discountPrecentage: "-10%",
    price: "Free to Play",
    // discountPrice: "$40.49 USD",
  },
  {
    link: "https://store.steampowered.com/app/2281730/Combat_Master_Season_1/",
    img: "https://cdn.cloudflare.steamstatic.com/steam/apps/2281730/header_292x136.jpg?t=1695332851",
    discount: "no-discount", // "discount" or "no-discount"
    discountPrecentage: "-10%",
    price: "Free to Play",
    discountPrice: "$40.49 USD",
  },
  {
    link: "https://store.steampowered.com/app/1721470/Poppy_Playtime/",
    img: "https://cdn.cloudflare.steamstatic.com/steam/apps/1721470/header_292x136.jpg",
    discount: "no-discount", // "discount" or "no-discount"
    discountPrecentage: "-10%",
    price: "Free to Play",
    discountPrice: "$40.49 USD",
  },
  {
    link: "https://store.steampowered.com/app/1063730/New_World/",
    img: "https://cdn.cloudflare.steamstatic.com/steam/apps/1063730/header_292x136.jpg",
    discount: "no-discount", // "discount" or "no-discount"
    discountPrecentage: "-10%",
    price: "$39.99 USD",
    discountPrice: "$40.49 USD",
  },
  {
    link: "https://store.steampowered.com/app/1326470/Sons_Of_The_Forest/",
    img: "https://cdn.cloudflare.steamstatic.com/steam/apps/1326470/header_292x136.jpg",
    discount: "no-discount", // "discount" or "no-discount"
    // discountPrecentage: "-10%",
    price: "$29.99 USD",
    // discountPrice: "$40.49 USD",
  },
  {
    link: "https://store.steampowered.com/app/1782210/Crab_Game/",
    img: "https://cdn.cloudflare.steamstatic.com/steam/apps/1782210/header_292x136.jpg",
    discount: "no-discount", // "discount" or "no-discount"
    discountPrecentage: "-10%",
    price: "Free",
    discountPrice: "$40.49 USD",
  },
  {
    link: "https://store.steampowered.com/app/1665460/eFootball_2024/",
    img: "https://cdn.cloudflare.steamstatic.com/steam/apps/1665460/header_292x136.jpg",
    discount: "no-discount", // "discount" or "no-discount"
    discountPrecentage: "-10%",
    price: "Free to Play",
    discountPrice: "$40.49 USD",
  },
  {
    link: "https://store.steampowered.com/app/1961460/PROJECT_PLAYTIME/",
    img: "https://cdn.cloudflare.steamstatic.com/steam/apps/1961460/header_292x136.jpg",
    discount: "discount", // "discount" or "no-discount"
    discountPrecentage: "-10%",
    price: "$44.99",
    discountPrice: "$40.49 USD",
  },
];

export default popularVRGames;
