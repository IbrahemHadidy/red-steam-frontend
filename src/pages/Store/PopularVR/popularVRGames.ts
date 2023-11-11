interface vrGame {
  link: string;
  img: string;
  discount: "no-discount" | "discount";
  discountPercentage?: string;
  price: string;
  discountPrice?: string;
}

const popularVRGames: vrGame[] = [
  {
    link: "https://store.steampowered.com/app/496240/Onward/",
    img: "https://cdn.cloudflare.steamstatic.com/steam/apps/496240/header_292x136.jpg",
    discount: "no-discount", // "discount" or "no-discount"
    discountPercentage: "",
    price: "$24.99 USD",
    discountPrice: "",
  },
  {
    link: "https://store.steampowered.com/app/1032430/Blood_Trail/",
    img: "https://cdn.cloudflare.steamstatic.com/steam/apps/1032430/header_292x136.jpg",
    discount: "no-discount", // "discount" or "no-discount"
    discountPercentage: "",
    price: "$24.99 USD",
    discountPrice: "",
  },
  {
    link: "https://store.steampowered.com/app/1032670/FOCUS_on_YOU/",
    img: "https://cdn.cloudflare.steamstatic.com/steam/apps/1032670/header_292x136.jpg",
    discount: "discount", // "discount" or "no-discount"
    discountPercentage: "-70%",
    price: "$39.99 USD",
    discountPrice: "$11.99 USD",
  },
  {
    link: "https://store.steampowered.com/app/1079800/Pistol_Whip/",
    img: "https://cdn.cloudflare.steamstatic.com/steam/apps/1079800/header_292x136.jpg",
    discount: "no-discount", // "discount" or "no-discount"
    discountPercentage: "",
    price: "$29.99 USD",
    discountPrice: "",
  },
  {
    link: "https://store.steampowered.com/app/448280/Job_Simulator/",
    img: "https://cdn.cloudflare.steamstatic.com/steam/apps/448280/header_292x136.jpg",
    discount: "no-discount", // "discount" or "no-discount"
    discountPercentage: "",
    price: "$19.99 USD",
    discountPrice: "",
  },
  {
    link: "https://store.steampowered.com/app/916840/The_Walking_Dead_Saints__Sinners/",
    img: "https://cdn.cloudflare.steamstatic.com/steam/apps/916840/header_292x136.jpg",
    discount: "no-discount", // "discount" or "no-discount"
    discountPercentage: "",
    price: "$39.99 USD",
    discountPrice: "",
  },
  {
    link: "https://store.steampowered.com/app/450540/Hot_Dogs_Horseshoes__Hand_Grenades/",
    img: "https://cdn.cloudflare.steamstatic.com/steam/apps/450540/header_292x136.jpg",
    discount: "no-discount", // "discount" or "no-discount"
    discountPercentage: "",
    price: "$19.99 USD",
    discountPrice: "",
  },
  {
    link: "https://store.steampowered.com/app/2296380/I_Expect_You_To_Die_3_Cog_in_the_Machine/",
    img: "https://cdn.cloudflare.steamstatic.com/steam/apps/2296380/header_292x136.jpg",
    discount: "no-discount", // "discount" or "no-discount"
    discountPercentage: "",
    price: "$24.99 USD",
    discountPrice: "",
  },
  {
    link: "https://store.steampowered.com/app/1501820/Ziggys_Cosmic_Adventures/",
    img: "https://cdn.cloudflare.steamstatic.com/steam/apps/1501820/header_292x136.jpg",
    discount: "discount", // "discount" or "no-discount"
    discountPercentage: "-10%",
    price: "$19.99 USD",
    discountPrice: "$17.99 USD",
  },
  {
    link: "https://store.steampowered.com/app/555160/Pavlov_VR/",
    img: "https://cdn.cloudflare.steamstatic.com/steam/apps/555160/header_292x136.jpg",
    discount: "no-discount", // "discount" or "no-discount"
    discountPercentage: "",
    price: "$24.99 USD",
    discountPrice: "",
  },
  {
    link: "https://store.steampowered.com/app/1533390/Gorilla_Tag/",
    img: "https://cdn.cloudflare.steamstatic.com/steam/apps/1533390/header_292x136.jpg",
    discount: "no-discount", // "discount" or "no-discount"
    discountPercentage: "",
    price: "$19.99 USD",
    discountPrice: "",
  },
  {
    link: "https://store.steampowered.com/app/1294760/HARD_BULLET/",
    img: "https://cdn.cloudflare.steamstatic.com/steam/apps/1294760/header_292x136.jpg",
    discount: "no-discount", // "discount" or "no-discount"
    discountPercentage: "",
    price: "$19.99 USD",
    discountPrice: "",
  },
];

export default popularVRGames;
