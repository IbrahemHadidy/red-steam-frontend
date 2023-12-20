export interface FeaturedGame {
  gameName: string;
  gameLink: string;
  mainImage: string;
  image1?: string;
  image2?: string;
  image3?: string;
  image4?: string;
  reason: "available" | "recommended";
  tag1?: string;
  tag2?: string;
  tag3?: string;
  tag4?: string;
  discount: "no-discount" | "discount";
  discountPercentage?: string;
  price: string;
  discountPrice?: string;
  win: string;
  mac?: string;
}

const featuredGames: FeaturedGame[] = [
  {
    // PUBG: BATTLEGROUNDS
    gameName: "PUBG: BATTLEGROUNDS",
    gameLink: "/game/1",
    mainImage:
      "https://cdn.cloudflare.steamstatic.com/steam/apps/578080/capsule_616x353.jpg",
    image1:
      "https://cdn.akamai.steamstatic.com/steam/apps/578080/ss_2da334ea597d9588aaa8c716d71b3c2e60a69853.1920x1080.jpg",
    image2:
      "https://cdn.akamai.steamstatic.com/steam/apps/578080/ss_fe5340f8ea6e0d2f3899ef1e7d2ebdfc07e32f67.1920x1080.jpg",
    image3:
      "https://cdn.akamai.steamstatic.com/steam/apps/578080/ss_1fc0cca99883a1dbaeaadfffc1492f81e4e77d32.1920x1080.jpg",
    image4:
      "https://cdn.akamai.steamstatic.com/steam/apps/578080/ss_66e156cf716e72096c15c132c3443e774cb2f9a5.1920x1080.jpg",
    reason: "available", // "available" or "recommended"
    discount: "no-discount", // "discount" or "no-discount"
    price: "Free to Play",
    // discountPrice:"",
    // discountPercentage: "",
    tag1: "Survival",
    tag2: "Shooter",
    tag3: "Battle Royale",
    tag4: "Multiplayer",
    win: "platform-image win",
    // mac: "platform-image mac", // Comment the varibale if the platform is not available
  },
  {
    // NARAKA: BLADEPOINT
    gameName: "NARAKA: BLADEPOINT",
    gameLink: "/game/2",
    mainImage:
      "https://cdn.akamai.steamstatic.com/steam/apps/1203220/capsule_616x353.jpg",
    image1:
      "https://cdn.akamai.steamstatic.com/steam/apps/1203220/ss_508b8f677ad0278feea4c74280d3bb8aa1143d7a.1920x1080.jpg",
    image2:
      "https://cdn.akamai.steamstatic.com/steam/apps/1203220/ss_c5cbb4fb8fcd71b6fd64f86b3f18dd9f00f11787.1920x1080.jpg",
    image3:
      "https://cdn.akamai.steamstatic.com/steam/apps/1203220/ss_fede743af03b94e8ccd8c1d8f156916acdce7723.1920x1080.jpg",
    image4:
      "https://cdn.akamai.steamstatic.com/steam/apps/1203220/ss_96173cebbcc3bbb6202854fccb8aad223f6c5334.1920x1080.jpg",
    reason: "available", // "available" or "recommended"
    discount: "no-discount", // "discount" or "no-discount"
    price: "Free to Play",
    // discountPrice:"",
    // discountPercentage: "",
    tag1: "Top Seller",
    // tag2: "",
    // tag3: "",
    // tag4: "",
    win: "platform-image win",
    // mac: "platform-image mac", // Comment the varibale if the platform is not available
  },
  {
    // The Elder Scrolls® Online
    gameName: "The Elder Scrolls® Online",
    gameLink:
      "/game/3",
    mainImage:
      "https://cdn.cloudflare.steamstatic.com/steam/apps/306130/capsule_616x353.jpg",
    image1:
      "https://cdn.cloudflare.steamstatic.com/steam/apps/306130/ss_ae00343059f2751a9bd1385383bc065d6d72a8df.1920x1080.jpg",
    image2:
      "https://cdn.cloudflare.steamstatic.com/steam/apps/306130/ss_5d7230643e643f1d1e87320f93edf109f91c2d6c.1920x1080.jpg",
    image3:
      "https://cdn.cloudflare.steamstatic.com/steam/apps/306130/ss_2b797e150cbb9ad7eec9d9089e79df4adc21e797.1920x1080.jpg",
    image4:
      "https://cdn.cloudflare.steamstatic.com/steam/apps/306130/ss_c21f3be1e15e5fcd0244c6857acd22d37b04d161.1920x1080.jpg",
    reason: "recommended", // "available" or "recommended"
    discount: "no-discount", // "discount" or "no-discount"
    price: "$19.99",
    // discountPrice:"",
    // discountPercentage: "",
    tag1: "RPG",
    tag2: "Open World",
    tag3: "Story Rich",
    tag4: "Fantasy",
    win: "platform-image win",
    mac: "platform-image mac", // Comment the varibale if the platform is not available
  },
  {
    // Red Dead Redemption 2
    gameName: "Red dead Redemption 2",
    gameLink:
      "/game/4",
    mainImage:
      "https://cdn.akamai.steamstatic.com/steam/apps/1174180/capsule_616x353.jpg",
    image1:
      "https://cdn.akamai.steamstatic.com/steam/apps/1174180/ss_d1a8f5a69155c3186c65d1da90491fcfd43663d9.1920x1080.jpg",
    image2:
      "https://cdn.akamai.steamstatic.com/steam/apps/1174180/ss_4ce07ae360b166f0f650e9a895a3b4b7bf15e34f.1920x1080.jpg",
    image3:
      "https://cdn.akamai.steamstatic.com/steam/apps/1174180/ss_668dafe477743f8b50b818d5bbfcec669e9ba93e.1920x1080.jpg",
    image4:
      "https://cdn.akamai.steamstatic.com/steam/apps/1174180/ss_66b553f4c209476d3e4ce25fa4714002cc914c4f.1920x1080.jpg",
    reason: "available", // "available" or "recommended"
    discount: "discount", // "discount" or "no-discount"
    discountPercentage: "60%",
    price: "$59.99",
    discountPrice: "$23.99",
    tag1: "Top Seller",
    // tag2: "",
    // tag3: "",
    // tag4: "",
    win: "platform-image win",
    // mac: "platform-image mac", // Comment the varibale if the platform is not available
  },
  {
    // Sekiro™: Shadows Die Twice - GOTY Edition
    gameName: "Sekiro™: Shadows Die Twice - GOTY Edition",
    gameLink:
      "/game/5",
    mainImage:
      "https://cdn.akamai.steamstatic.com/steam/apps/814380/capsule_616x353.jpg",
    image1:
      "https://cdn.akamai.steamstatic.com/steam/apps/814380/ss_2685dd844a2a523b6c7ec207d46a538db6a908cd.1920x1080.jpg",
    image2:
      "https://cdn.akamai.steamstatic.com/steam/apps/814380/ss_0f7b0f8ed9ffc49aba26f9328caa9a1d59ad60f0.1920x1080.jpg",
    image3:
      "https://cdn.akamai.steamstatic.com/steam/apps/814380/ss_15f0e9982621aed44900215ad283811af0779b1d.1920x1080.jpg",
    image4:
      "https://cdn.akamai.steamstatic.com/steam/apps/814380/ss_1e6f5540866a5564d65df915c22fe1e57e336a6f.1920x1080.jpg",
    reason: "recommended", // "available" or "recommended"
    discount: "no-discount", // "discount" or "no-discount"
    price: "$59.99",
    // discountPrice:"",
    // discountPercentage: "",
    tag1: "Action",
    tag2: "Adventure",
    tag3: "RPG",
    tag4: "Singleplayer",
    win: "platform-image win",
    // mac: "platform-image mac", // Comment the varibale if the platform is not available
  },
  {
    // ELDEN RING
    gameName: "ELDEN RING",
    gameLink: "/game/6",
    mainImage:
      "https://cdn.akamai.steamstatic.com/steam/apps/1245620/capsule_616x353.jpg",
    image1:
      "https://cdn.akamai.steamstatic.com/steam/apps/1245620/ss_3e556415d1bda00d749b2166ced264bec76f06ee.1920x1080.jpg",
    image2:
      "https://cdn.akamai.steamstatic.com/steam/apps/1245620/ss_ae44317e3bd07b7690b4d62cc5d0d1df30367a91.1920x1080.jpg",
    image3:
      "https://cdn.akamai.steamstatic.com/steam/apps/1245620/ss_3aec1455923ef49f4e777c2a94dbcd0256f77eb0.1920x1080.jpg",
    image4:
      "https://cdn.akamai.steamstatic.com/steam/apps/1245620/ss_e80a907c2c43337e53316c71555c3c3035a1343e.1920x1080.jpg",
    reason: "recommended", // "available" or "recommended"
    discount: "no-discount", // "discount" or "no-discount"
    price: "$59.99",
    // discountPrice:"",
    // discountPercentage: "",
    tag1: "RPG",
    tag2: "Dark Fantasy",
    tag3: "Open World",
    tag4: "Fantasy",
    win: "platform-image win",
    // mac: "platform-image mac", // Comment the varibale if the platform is not available
  },
  {
    // Tower of Fantasy
    gameName: "Tower of Fantasy",
    gameLink: "/game/12",
    mainImage:
      "https://cdn.cloudflare.steamstatic.com/steam/apps/2064650/capsule_616x353.jpg",
    image1:
      "https://cdn.cloudflare.steamstatic.com/steam/apps/2064650/ss_a6ea63ea992a2206066b684cfd420c1faf284021.1920x1080.jpg",
    image2:
      "https://cdn.cloudflare.steamstatic.com/steam/apps/2064650/ss_2476717c83b6328404b5809cfbaecbd292a08bb4.1920x1080.jpg",
    image3:
      "https://cdn.cloudflare.steamstatic.com/steam/apps/2064650/ss_8e2043e60ee96e2fdac4eb612bbcec9019575420.1920x1080.jpg",
    image4:
      "https://cdn.cloudflare.steamstatic.com/steam/apps/2064650/ss_7fcfea85a2100fac45e603f8d2d9bcb31c25f5d5.1920x1080.jpg",
    reason: "recommended", // "available" or "recommended"
    discount: "no-discount", // "discount" or "no-discount"
    price: "Free to Play",
    // discountPrice:"",
    // discountPercentage: "",
    tag1: "RPG",
    tag2: "Free to Play",
    tag3: "Open World",
    tag4: "Story Rich",
    win: "platform-image win",
    // mac: "platform-image mac", // Comment the varibale if the platform is not available
  },
  {
    // ARK: Survival Ascended
    gameName: "ARK: Survival Ascended",
    gameLink:
      "/game/8",
    mainImage:
      "https://cdn.cloudflare.steamstatic.com/steam/apps/2399830/capsule_616x353.jpg",
    image1:
      "https://cdn.cloudflare.steamstatic.com/steam/apps/2399830/ss_65c0de5ced28281764990a299eb3926629b2863e.1920x1080.jpg",
    image2:
      "https://cdn.cloudflare.steamstatic.com/steam/apps/2399830/ss_f9e156d2b818d808c65476997283b5da8be8324f.1920x1080.jpg",
    image3:
      "https://cdn.cloudflare.steamstatic.com/steam/apps/2399830/ss_63a6ea13596a948b7873ed6de4fd4d01f9cbe57b.1920x1080.jpg",
    image4:
      "https://cdn.cloudflare.steamstatic.com/steam/apps/2399830/ss_0ce49e629369dbf9e8fba324667167568c05c66f.1920x1080.jpg",
    reason: "recommended", // "available" or "recommended"
    discount: "discount", // "discount" or "no-discount"
    discountPercentage: "10%",
    price: "$44.99",
    discountPrice: "$40.49",
    tag1: "RPG",
    tag2: "Open World",
    tag3: "Fantasy",
    tag4: "Action",
    win: "platform-image win",
    // mac: "platform-image mac", // Comment the varibale if the platform is not available
  },
  {
    // Hogwarts Legacy
    gameName: "Hogwarts Legacy",
    gameLink: "/game/9",
    mainImage:
      "https://cdn.cloudflare.steamstatic.com/steam/apps/990080/capsule_616x353.jpg",
    image1:
      "https://cdn.cloudflare.steamstatic.com/steam/apps/990080/ss_94058497bf0f8fabdde17ee8d59bece609a60663.1920x1080.jpg",
    image2:
      "https://cdn.cloudflare.steamstatic.com/steam/apps/990080/ss_8e08976236d29b1897769257ac3c64e9264792a5.1920x1080.jpg",
    image3:
      "https://cdn.cloudflare.steamstatic.com/steam/apps/990080/ss_725bf58485beb4aa37a3a69c1e2baa69bf3e4653.1920x1080.jpg",
    image4:
      "https://cdn.cloudflare.steamstatic.com/steam/apps/990080/ss_df93b5e8a183f7232d68be94ae78920a90de1443.1920x1080.jpg",
    reason: "recommended", // "available" or "recommended"
    discount: "no-discount", // "discount" or "no-discount"
    price: "$59.99",
    // discountPrice:"",
    // discountPercentage: "",
    tag1: "RPG",
    tag2: "Open World",
    tag3: "Story Rich",
    tag4: "Fantasy",
    win: "platform-image win",
    // mac: "platform-image mac", // Comment the varibale if the platform is not available
  },
  {
    // Resident Evil 4
    gameName: "Resident Evil 4",
    gameLink: "/game/10",
    mainImage:
      "https://cdn.cloudflare.steamstatic.com/steam/apps/2050650/capsule_616x353.jpg",
    image1:
      "https://cdn.cloudflare.steamstatic.com/steam/apps/2050650/ss_59d1b19964cc532213df92c8287b75a0bffeb33c.1920x1080.jpg",
    image2:
      "https://cdn.cloudflare.steamstatic.com/steam/apps/2050650/ss_ab807f8ad9e968a620777caf483cb6020367b9ee.1920x1080.jpg",
    image3:
      "https://cdn.cloudflare.steamstatic.com/steam/apps/2050650/ss_0442f7fb4327d79802c2db8ea8d23d228a28d896.1920x1080.jpg",
    image4:
      "https://cdn.cloudflare.steamstatic.com/steam/apps/2050650/ss_69810f4cd155912fdfdd21da70181df7d454c874.1920x1080.jpg",
    reason: "available", // "available" or "recommended"
    discount: "discount", // "discount" or "no-discount"
    price: "$44.99",
    discountPrice: "$22.49",
    discountPercentage: "43%",
    tag1: "Top Seller",
    // tag2: "Ooen World",
    // tag3: "Story Rich",
    // tag4: "Fantasy",
    win: "platform-image win",
    // mac: "platform-image mac", // Comment the varibale if the platform is not available
  },
  {
    // Assassin's Creed® Valhalla
    gameName: "Assassin's Creed® Valhalla",
    gameLink:
      "/game/11",
    mainImage:
      "https://cdn.cloudflare.steamstatic.com/steam/apps/2208920/capsule_616x353.jpg",
    image1:
      "https://cdn.cloudflare.steamstatic.com/steam/apps/2208920/ss_103481084a59b34837113daf27c04679caf743f3.1920x1080.jpg",
    image2:
      "https://cdn.cloudflare.steamstatic.com/steam/apps/2208920/ss_e7310b36689ec722d2ea4643efc15bd8fa720c67.1920x1080.jpg",
    image3:
      "https://cdn.cloudflare.steamstatic.com/steam/apps/2208920/ss_c3bff917ead50268eb7708ef3bf30e07b58929e9.1920x1080.jpg",
    image4:
      "https://cdn.cloudflare.steamstatic.com/steam/apps/2208920/ss_5e527e1e063ef041ca6680f503081274dcc5513a.1920x1080.jpg",
    reason: "recommended", // "available" or "recommended"
    discount: "discount", // "discount" or "no-discount"
    price: "$47.99",
    discountPrice:"11.99",
    discountPercentage: "75%",
    tag1: "Action",
    tag2: "Open World",
    tag3: "RPG",
    tag4: "Adventure",
    win: "platform-image win",
    // mac: "platform-image mac", // Comment the varibale if the platform is not available
  },
  {
    //7- NieR:Automata™
    gameName: "NieR:Automata™",
    gameLink:
      "/game/7",
    mainImage:
      "https://cdn.cloudflare.steamstatic.com/steam/apps/524220/capsule_616x353.jpg",
    image1:
      "https://cdn.cloudflare.steamstatic.com/steam/apps/524220/ss_d0314b4c134329a483b5e43af951f60274abc66b.1920x1080.jpg",
    image2:
      "https://cdn.cloudflare.steamstatic.com/steam/apps/524220/ss_8b29f7e1ce9a8b9313dc3eb50dbe76a4cf94eef9.1920x1080.jpg",
    image3:
      "https://cdn.cloudflare.steamstatic.com/steam/apps/524220/ss_2c265df38c3d2d393d74ee8e74d79bdafa16b143.1920x1080.jpg",
    image4:
      "https://cdn.cloudflare.steamstatic.com/steam/apps/524220/ss_831e0e7c9d514393b711e9ed1d6796042521a80c.1920x1080.jpg",
    reason: "recommended", // "available" or "recommended"
    discount: "no-discount", // "discount" or "no-discount"
    price: "$49.99",
    // discountPrice:"",
    // discountPercentage: "",
    tag1: "RPG",
    tag2: "Open World",
    tag3: "Great Soundtrack",
    tag4: "Action",
    win: "platform-image win",
    // mac: "platform-image mac", // Comment the varibale if the platform is not available
  },
];

export default featuredGames;
