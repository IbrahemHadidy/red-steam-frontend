export interface tabItem {
    gameName: string;
    gameLink: string;
    mainImage: string;
    image1?: string;
    image2?: string;
    image3?: string;
    image4?: string;
    tag1?: string;
    tag2?: string;
    tag3?: string;
    tag4?: string;
    tag5?: string;
    discount: "no-discount" | "discount";
    discountPercentage?: string;
    price: string;
    discountPrice?: string;
    win: string;
    mac?: string;
    reviews: {
      positive: number
      negative: number
    };
  }
  
  export const newAndTrending: tabItem[] = [
    {
      // PUBG: BATTLEGROUNDS
      gameName: "PUBG: BATTLEGROUNDS",
      gameLink: "https://store.steampowered.com/app/578080/PUBG_BATTLEGROUNDS/",
      mainImage:
        "https://cdn.akamai.steamstatic.com/steam/apps/886250/capsule_184x69.jpg",
      image1:
        "https://cdn.akamai.steamstatic.com/steam/apps/578080/ss_1564a5c49d7fa5328c2c1fc71f369bdb39edb58f.600x338.jpg",
      image2:
        "https://cdn.cloudflare.steamstatic.com/steam/apps/578080/ss_3857268f02113c5095ff7bc73f814bd80ade8c2e.600x338.jpg",
      image3:
        "https://cdn.cloudflare.steamstatic.com/steam/apps/578080/ss_63bb4a659968c3417ddd2ea5fd82cd2143e458a0.600x338.jpg",
      image4:
        "https://cdn.cloudflare.steamstatic.com/steam/apps/578080/ss_622c5bc5bc0de0f9a3af7b337a4b8eaba7ef045b.600x338.jpg",
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
      reviews: {
        positive: 1000,
        negative: 1000,
      },
    },
    {
      // NARAKA: BLADEPOINT
      gameName: "NARAKA: BLADEPOINT",
      gameLink: "https://store.steampowered.com/app/1203220/NARAKA_BLADEPOINT/",
      mainImage:
        "https://cdn.akamai.steamstatic.com/steam/apps/886250/capsule_184x69.jpg",
      image1:
        "https://cdn.akamai.steamstatic.com/steam/apps/1203220/ss_508b8f677ad0278feea4c74280d3bb8aa1143d7a.600x338.jpg",
      image2:
        "https://cdn.akamai.steamstatic.com/steam/apps/1203220/ss_c5cbb4fb8fcd71b6fd64f86b3f18dd9f00f11787.600x338.jpg",
      image3:
        "https://cdn.akamai.steamstatic.com/steam/apps/1203220/ss_fede743af03b94e8ccd8c1d8f156916acdce7723.600x338.jpg",
      image4:
        "https://cdn.akamai.steamstatic.com/steam/apps/1203220/ss_96173cebbcc3bbb6202854fccb8aad223f6c5334.600x338.jpg",
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
      reviews: {
        positive: 1000,
        negative: 1000,
      },
    },
    {
      // The Elder Scrolls® Online
      gameName: "The Elder Scrolls® Online",
      gameLink:
        "https://store.steampowered.com/app/306130/The_Elder_Scrolls_Online/",
      mainImage:
        "https://cdn.akamai.steamstatic.com/steam/apps/886250/capsule_184x69.jpg",
      image1:
        "https://cdn.cloudflare.steamstatic.com/steam/apps/306130/ss_ae00343059f2751a9bd1385383bc065d6d72a8df.600x338.jpg",
      image2:
        "https://cdn.cloudflare.steamstatic.com/steam/apps/306130/ss_5d7230643e643f1d1e87320f93edf109f91c2d6c.600x338.jpg",
      image3:
        "https://cdn.cloudflare.steamstatic.com/steam/apps/306130/ss_2b797e150cbb9ad7eec9d9089e79df4adc21e797.600x338.jpg",
      image4:
        "https://cdn.cloudflare.steamstatic.com/steam/apps/306130/ss_c21f3be1e15e5fcd0244c6857acd22d37b04d161.600x338.jpg",
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
      reviews: {
        positive: 1000,
        negative: 1000,
      },
    },
    {
      // Red Dead Redemption 2
      gameName: "Red dead Redemption 2",
      gameLink:
        "https://store.steampowered.com/app/1174180/Red_Dead_Redemption_2/",
      mainImage:
        "https://cdn.akamai.steamstatic.com/steam/apps/886250/capsule_184x69.jpg",
      image1:
        "https://cdn.akamai.steamstatic.com/steam/apps/1174180/ss_d1a8f5a69155c3186c65d1da90491fcfd43663d9.600x338.jpg",
      image2:
        "https://cdn.akamai.steamstatic.com/steam/apps/1174180/ss_4ce07ae360b166f0f650e9a895a3b4b7bf15e34f.600x338.jpg",
      image3:
        "https://cdn.akamai.steamstatic.com/steam/apps/1174180/ss_668dafe477743f8b50b818d5bbfcec669e9ba93e.600x338.jpg",
      image4:
        "https://cdn.akamai.steamstatic.com/steam/apps/1174180/ss_66b553f4c209476d3e4ce25fa4714002cc914c4f.600x338.jpg",
      discount: "discount", // "discount" or "no-discount"
      discountPercentage: "-60%",
      price: "$59.99",
      discountPrice: "$23.99",
      tag1: "Top Seller",
      // tag2: "",
      // tag3: "",
      // tag4: "",
      win: "platform-image win",
      // mac: "platform-image mac", // Comment the varibale if the platform is not available
      reviews: {
        positive: 1000,
        negative: 1000,
      },
    },
    {
      // Sekiro™: Shadows Die Twice - GOTY Edition
      gameName: "Sekiro™: Shadows Die Twice - GOTY Edition",
      gameLink:
        "https://store.steampowered.com/app/814380/Sekiro_Shadows_Die_Twice__GOTY_Edition//",
      mainImage:
        "https://cdn.akamai.steamstatic.com/steam/apps/886250/capsule_184x69.jpg",
      image1:
        "https://cdn.akamai.steamstatic.com/steam/apps/814380/ss_2685dd844a2a523b6c7ec207d46a538db6a908cd.600x338.jpg",
      image2:
        "https://cdn.akamai.steamstatic.com/steam/apps/814380/ss_0f7b0f8ed9ffc49aba26f9328caa9a1d59ad60f0.600x338.jpg",
      image3:
        "https://cdn.akamai.steamstatic.com/steam/apps/814380/ss_15f0e9982621aed44900215ad283811af0779b1d.600x338.jpg",
      image4:
        "https://cdn.akamai.steamstatic.com/steam/apps/814380/ss_1e6f5540866a5564d65df915c22fe1e57e336a6f.600x338.jpg",
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
      reviews: {
        positive: 1000,
        negative: 1000,
      },
    },
    {
      // ELDEN RING
      gameName: "ELDEN RING",
      gameLink: "https://store.steampowered.com/app/1245620/ELDEN_RING/",
      mainImage:
        "https://cdn.akamai.steamstatic.com/steam/apps/886250/capsule_184x69.jpg",
      image1:
        "https://cdn.akamai.steamstatic.com/steam/apps/1245620/ss_3e556415d1bda00d749b2166ced264bec76f06ee.600x338.jpg",
      image2:
        "https://cdn.akamai.steamstatic.com/steam/apps/1245620/ss_ae44317e3bd07b7690b4d62cc5d0d1df30367a91.600x338.jpg",
      image3:
        "https://cdn.akamai.steamstatic.com/steam/apps/1245620/ss_3aec1455923ef49f4e777c2a94dbcd0256f77eb0.600x338.jpg",
      image4:
        "https://cdn.akamai.steamstatic.com/steam/apps/1245620/ss_e80a907c2c43337e53316c71555c3c3035a1343e.600x338.jpg",
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
      reviews: {
        positive: 1000,
        negative: 1000,
      },
    },
    {
      // Tower of Fantasy
      gameName: "Tower of Fantasy",
      gameLink: "https://store.steampowered.com/app/2064650/Tower_of_Fantasy/",
      mainImage:
        "https://cdn.akamai.steamstatic.com/steam/apps/886250/capsule_184x69.jpg",
      image1:
        "https://cdn.cloudflare.steamstatic.com/steam/apps/2064650/ss_a6ea63ea992a2206066b684cfd420c1faf284021.600x338.jpg",
      image2:
        "https://cdn.cloudflare.steamstatic.com/steam/apps/2064650/ss_2476717c83b6328404b5809cfbaecbd292a08bb4.600x338.jpg",
      image3:
        "https://cdn.cloudflare.steamstatic.com/steam/apps/2064650/ss_8e2043e60ee96e2fdac4eb612bbcec9019575420.600x338.jpg",
      image4:
        "https://cdn.cloudflare.steamstatic.com/steam/apps/2064650/ss_7fcfea85a2100fac45e603f8d2d9bcb31c25f5d5.600x338.jpg",
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
      reviews: {
        positive: 1000,
        negative: 1000,
      },
    },
    {
      // ARK: Survival Ascended
      gameName: "ARK: Survival Ascended",
      gameLink:
        "https://store.steampowered.com/app/2399830/ARK_Survival_Ascended/",
      mainImage:
        "https://cdn.akamai.steamstatic.com/steam/apps/886250/capsule_184x69.jpg",
      image1:
        "https://cdn.cloudflare.steamstatic.com/steam/apps/2399830/ss_65c0de5ced28281764990a299eb3926629b2863e.600x338.jpg",
      image2:
        "https://cdn.cloudflare.steamstatic.com/steam/apps/2399830/ss_f9e156d2b818d808c65476997283b5da8be8324f.600x338.jpg",
      image3:
        "https://cdn.cloudflare.steamstatic.com/steam/apps/2399830/ss_63a6ea13596a948b7873ed6de4fd4d01f9cbe57b.600x338.jpg",
      image4:
        "https://cdn.cloudflare.steamstatic.com/steam/apps/2399830/ss_0ce49e629369dbf9e8fba324667167568c05c66f.600x338.jpg",
      discount: "discount", // "discount" or "no-discount"
      discountPercentage: "-10%",
      price: "$44.99",
      discountPrice: "$40.49",
      tag1: "RPG",
      tag2: "Open World",
      tag3: "Fantasy",
      tag4: "Action",
      win: "platform-image win",
      // mac: "platform-image mac", // Comment the varibale if the platform is not available
      reviews: {
        positive: 1000,
        negative: 1000,
      },
    },
    {
      // Hogwarts Legacy
      gameName: "Hogwarts Legacy",
      gameLink: "https://store.steampowered.com/app/990080/Hogwarts_Legacy/",
      mainImage:
        "https://cdn.akamai.steamstatic.com/steam/apps/886250/capsule_184x69.jpg",
      image1:
        "https://cdn.cloudflare.steamstatic.com/steam/apps/990080/ss_94058497bf0f8fabdde17ee8d59bece609a60663.600x338.jpg",
      image2:
        "https://cdn.cloudflare.steamstatic.com/steam/apps/990080/ss_8e08976236d29b1897769257ac3c64e9264792a5.600x338.jpg",
      image3:
        "https://cdn.cloudflare.steamstatic.com/steam/apps/990080/ss_725bf58485beb4aa37a3a69c1e2baa69bf3e4653.600x338.jpg",
      image4:
        "https://cdn.cloudflare.steamstatic.com/steam/apps/990080/ss_df93b5e8a183f7232d68be94ae78920a90de1443.600x338.jpg",
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
      reviews: {
        positive: 1000,
        negative: 1000,
      },
    },
    {
      // Cyberpunk 2077
      gameName: "Cyberpunk 2077",
      gameLink: "https://store.steampowered.com/app/1091500/Cyberpunk_2077/",
      mainImage:
        "https://cdn.akamai.steamstatic.com/steam/apps/886250/capsule_184x69.jpg",
      image1:
        "https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/ss_8640d9db74f7cad714f6ecfb0e1aceaa3f887e58.600x338.jpg",
      image2:
        "https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/ss_4bda6f67580d94832ed2d5814e41ebe018ba1d9e.600x338.jpg",
      image3:
        "https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/ss_b529b0abc43f55fc23fe8058eddb6e37c9629a6a.600x338.jpg",
      image4:
        "https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/ss_9284d1c5b248726760233a933dbb83757d7d5d95.600x338.jpg",
      discount: "discount", // "discount" or "no-discount"
      price: "$59.99",
      discountPrice: "$35.99",
      discountPercentage: "-40%",
      tag1: "Top Seller",
      // tag2: "Open World",
      // tag3: "Story Rich",
      // tag4: "Fantasy",
      win: "platform-image win",
      // mac: "platform-image mac", // Comment the varibale if the platform is not available
      reviews: {
        positive: 1000,
        negative: 1000,
      },
    },
  ];

  export const topSellers: tabItem[] = [
    {
      // PUBG: BATTLEGROUNDS
      gameName: "PUBG: BATTLEGROUNDS",
      gameLink: "https://store.steampowered.com/app/578080/PUBG_BATTLEGROUNDS/",
      mainImage:
        "https://cdn.akamai.steamstatic.com/steam/apps/2083210/capsule_184x69.jpg",
      image1:
        "https://cdn.akamai.steamstatic.com/steam/apps/578080/ss_1564a5c49d7fa5328c2c1fc71f369bdb39edb58f.600x338.jpg",
      image2:
        "https://cdn.cloudflare.steamstatic.com/steam/apps/578080/ss_3857268f02113c5095ff7bc73f814bd80ade8c2e.600x338.jpg",
      image3:
        "https://cdn.cloudflare.steamstatic.com/steam/apps/578080/ss_63bb4a659968c3417ddd2ea5fd82cd2143e458a0.600x338.jpg",
      image4:
        "https://cdn.cloudflare.steamstatic.com/steam/apps/578080/ss_622c5bc5bc0de0f9a3af7b337a4b8eaba7ef045b.600x338.jpg",
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
      reviews: {
        positive: 1000,
        negative: 1000,
      },
    },
    {
      // NARAKA: BLADEPOINT
      gameName: "NARAKA: BLADEPOINT",
      gameLink: "https://store.steampowered.com/app/1203220/NARAKA_BLADEPOINT/",
      mainImage:
        "https://cdn.akamai.steamstatic.com/steam/apps/2083210/capsule_184x69.jpg",
      image1:
        "https://cdn.akamai.steamstatic.com/steam/apps/1203220/ss_508b8f677ad0278feea4c74280d3bb8aa1143d7a.600x338.jpg",
      image2:
        "https://cdn.akamai.steamstatic.com/steam/apps/1203220/ss_c5cbb4fb8fcd71b6fd64f86b3f18dd9f00f11787.600x338.jpg",
      image3:
        "https://cdn.akamai.steamstatic.com/steam/apps/1203220/ss_fede743af03b94e8ccd8c1d8f156916acdce7723.600x338.jpg",
      image4:
        "https://cdn.akamai.steamstatic.com/steam/apps/1203220/ss_96173cebbcc3bbb6202854fccb8aad223f6c5334.600x338.jpg",
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
      reviews: {
        positive: 1000,
        negative: 1000,
      },
    },
    {
      // The Elder Scrolls® Online
      gameName: "The Elder Scrolls® Online",
      gameLink:
        "https://store.steampowered.com/app/306130/The_Elder_Scrolls_Online/",
      mainImage:
        "https://cdn.akamai.steamstatic.com/steam/apps/2083210/capsule_184x69.jpg",
      image1:
        "https://cdn.cloudflare.steamstatic.com/steam/apps/306130/ss_ae00343059f2751a9bd1385383bc065d6d72a8df.600x338.jpg",
      image2:
        "https://cdn.cloudflare.steamstatic.com/steam/apps/306130/ss_5d7230643e643f1d1e87320f93edf109f91c2d6c.600x338.jpg",
      image3:
        "https://cdn.cloudflare.steamstatic.com/steam/apps/306130/ss_2b797e150cbb9ad7eec9d9089e79df4adc21e797.600x338.jpg",
      image4:
        "https://cdn.cloudflare.steamstatic.com/steam/apps/306130/ss_c21f3be1e15e5fcd0244c6857acd22d37b04d161.600x338.jpg",
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
      reviews: {
        positive: 1000,
        negative: 1000,
      },
    },
    {
      // Red Dead Redemption 2
      gameName: "Red dead Redemption 2",
      gameLink:
        "https://store.steampowered.com/app/1174180/Red_Dead_Redemption_2/",
      mainImage:
        "https://cdn.akamai.steamstatic.com/steam/apps/2083210/capsule_184x69.jpg",
      image1:
        "https://cdn.akamai.steamstatic.com/steam/apps/1174180/ss_d1a8f5a69155c3186c65d1da90491fcfd43663d9.600x338.jpg",
      image2:
        "https://cdn.akamai.steamstatic.com/steam/apps/1174180/ss_4ce07ae360b166f0f650e9a895a3b4b7bf15e34f.600x338.jpg",
      image3:
        "https://cdn.akamai.steamstatic.com/steam/apps/1174180/ss_668dafe477743f8b50b818d5bbfcec669e9ba93e.600x338.jpg",
      image4:
        "https://cdn.akamai.steamstatic.com/steam/apps/1174180/ss_66b553f4c209476d3e4ce25fa4714002cc914c4f.600x338.jpg",
      discount: "discount", // "discount" or "no-discount"
      discountPercentage: "-60%",
      price: "$59.99",
      discountPrice: "$23.99",
      tag1: "Top Seller",
      // tag2: "",
      // tag3: "",
      // tag4: "",
      win: "platform-image win",
      // mac: "platform-image mac", // Comment the varibale if the platform is not available
      reviews: {
        positive: 1000,
        negative: 1000,
      },
    },
    {
      // Sekiro™: Shadows Die Twice - GOTY Edition
      gameName: "Sekiro™: Shadows Die Twice - GOTY Edition",
      gameLink:
        "https://store.steampowered.com/app/814380/Sekiro_Shadows_Die_Twice__GOTY_Edition//",
      mainImage:
        "https://cdn.akamai.steamstatic.com/steam/apps/2083210/capsule_184x69.jpg",
      image1:
        "https://cdn.akamai.steamstatic.com/steam/apps/814380/ss_2685dd844a2a523b6c7ec207d46a538db6a908cd.600x338.jpg",
      image2:
        "https://cdn.akamai.steamstatic.com/steam/apps/814380/ss_0f7b0f8ed9ffc49aba26f9328caa9a1d59ad60f0.600x338.jpg",
      image3:
        "https://cdn.akamai.steamstatic.com/steam/apps/814380/ss_15f0e9982621aed44900215ad283811af0779b1d.600x338.jpg",
      image4:
        "https://cdn.akamai.steamstatic.com/steam/apps/814380/ss_1e6f5540866a5564d65df915c22fe1e57e336a6f.600x338.jpg",
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
      reviews: {
        positive: 1000,
        negative: 1000,
      },
    },
    {
      // ELDEN RING
      gameName: "ELDEN RING",
      gameLink: "https://store.steampowered.com/app/1245620/ELDEN_RING/",
      mainImage:
        "https://cdn.akamai.steamstatic.com/steam/apps/2083210/capsule_184x69.jpg",
      image1:
        "https://cdn.akamai.steamstatic.com/steam/apps/1245620/ss_3e556415d1bda00d749b2166ced264bec76f06ee.600x338.jpg",
      image2:
        "https://cdn.akamai.steamstatic.com/steam/apps/1245620/ss_ae44317e3bd07b7690b4d62cc5d0d1df30367a91.600x338.jpg",
      image3:
        "https://cdn.akamai.steamstatic.com/steam/apps/1245620/ss_3aec1455923ef49f4e777c2a94dbcd0256f77eb0.600x338.jpg",
      image4:
        "https://cdn.akamai.steamstatic.com/steam/apps/1245620/ss_e80a907c2c43337e53316c71555c3c3035a1343e.600x338.jpg",
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
      reviews: {
        positive: 1000,
        negative: 1000,
      },
    },
    {
      // Tower of Fantasy
      gameName: "Tower of Fantasy",
      gameLink: "https://store.steampowered.com/app/2064650/Tower_of_Fantasy/",
      mainImage:
        "https://cdn.akamai.steamstatic.com/steam/apps/2083210/capsule_184x69.jpg",
      image1:
        "https://cdn.cloudflare.steamstatic.com/steam/apps/2064650/ss_a6ea63ea992a2206066b684cfd420c1faf284021.600x338.jpg",
      image2:
        "https://cdn.cloudflare.steamstatic.com/steam/apps/2064650/ss_2476717c83b6328404b5809cfbaecbd292a08bb4.600x338.jpg",
      image3:
        "https://cdn.cloudflare.steamstatic.com/steam/apps/2064650/ss_8e2043e60ee96e2fdac4eb612bbcec9019575420.600x338.jpg",
      image4:
        "https://cdn.cloudflare.steamstatic.com/steam/apps/2064650/ss_7fcfea85a2100fac45e603f8d2d9bcb31c25f5d5.600x338.jpg",
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
      reviews: {
        positive: 1000,
        negative: 1000,
      },
    },
    {
      // ARK: Survival Ascended
      gameName: "ARK: Survival Ascended",
      gameLink:
        "https://store.steampowered.com/app/2399830/ARK_Survival_Ascended/",
      mainImage:
        "https://cdn.akamai.steamstatic.com/steam/apps/2083210/capsule_184x69.jpg",
      image1:
        "https://cdn.cloudflare.steamstatic.com/steam/apps/2399830/ss_65c0de5ced28281764990a299eb3926629b2863e.600x338.jpg",
      image2:
        "https://cdn.cloudflare.steamstatic.com/steam/apps/2399830/ss_f9e156d2b818d808c65476997283b5da8be8324f.600x338.jpg",
      image3:
        "https://cdn.cloudflare.steamstatic.com/steam/apps/2399830/ss_63a6ea13596a948b7873ed6de4fd4d01f9cbe57b.600x338.jpg",
      image4:
        "https://cdn.cloudflare.steamstatic.com/steam/apps/2399830/ss_0ce49e629369dbf9e8fba324667167568c05c66f.600x338.jpg",
      discount: "discount", // "discount" or "no-discount"
      discountPercentage: "-10%",
      price: "$44.99",
      discountPrice: "$40.49",
      tag1: "RPG",
      tag2: "Open World",
      tag3: "Fantasy",
      tag4: "Action",
      win: "platform-image win",
      // mac: "platform-image mac", // Comment the varibale if the platform is not available
      reviews: {
        positive: 1000,
        negative: 1000,
      },
    },
    {
      // Hogwarts Legacy
      gameName: "Hogwarts Legacy",
      gameLink: "https://store.steampowered.com/app/990080/Hogwarts_Legacy/",
      mainImage:
        "https://cdn.akamai.steamstatic.com/steam/apps/2083210/capsule_184x69.jpg",
      image1:
        "https://cdn.cloudflare.steamstatic.com/steam/apps/990080/ss_94058497bf0f8fabdde17ee8d59bece609a60663.600x338.jpg",
      image2:
        "https://cdn.cloudflare.steamstatic.com/steam/apps/990080/ss_8e08976236d29b1897769257ac3c64e9264792a5.600x338.jpg",
      image3:
        "https://cdn.cloudflare.steamstatic.com/steam/apps/990080/ss_725bf58485beb4aa37a3a69c1e2baa69bf3e4653.600x338.jpg",
      image4:
        "https://cdn.cloudflare.steamstatic.com/steam/apps/990080/ss_df93b5e8a183f7232d68be94ae78920a90de1443.600x338.jpg",
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
      reviews: {
        positive: 1000,
        negative: 1000,
      },
    },
    {
      // Cyberpunk 2077
      gameName: "Cyberpunk 2077",
      gameLink: "https://store.steampowered.com/app/1091500/Cyberpunk_2077/",
      mainImage:
        "https://cdn.akamai.steamstatic.com/steam/apps/2083210/capsule_184x69.jpg",
      image1:
        "https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/ss_8640d9db74f7cad714f6ecfb0e1aceaa3f887e58.600x338.jpg",
      image2:
        "https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/ss_4bda6f67580d94832ed2d5814e41ebe018ba1d9e.600x338.jpg",
      image3:
        "https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/ss_b529b0abc43f55fc23fe8058eddb6e37c9629a6a.600x338.jpg",
      image4:
        "https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/ss_9284d1c5b248726760233a933dbb83757d7d5d95.600x338.jpg",
      discount: "discount", // "discount" or "no-discount"
      price: "$59.99",
      discountPrice: "$35.99",
      discountPercentage: "-40%",
      tag1: "Top Seller",
      // tag2: "Open World",
      // tag3: "Story Rich",
      // tag4: "Fantasy",
      win: "platform-image win",
      // mac: "platform-image mac", // Comment the varibale if the platform is not available
      reviews: {
        positive: 1000,
        negative: 1000,
      },
    },
  ];

  export const popularUpcoming: tabItem[] = [
    {
      // PUBG: BATTLEGROUNDS
      gameName: "PUBG: BATTLEGROUNDS",
      gameLink: "https://store.steampowered.com/app/578080/PUBG_BATTLEGROUNDS/",
      mainImage:
        "https://cdn.akamai.steamstatic.com/steam/apps/2391710/capsule_184x69.jpg",
      image1:
        "https://cdn.akamai.steamstatic.com/steam/apps/578080/ss_1564a5c49d7fa5328c2c1fc71f369bdb39edb58f.600x338.jpg",
      image2:
        "https://cdn.cloudflare.steamstatic.com/steam/apps/578080/ss_3857268f02113c5095ff7bc73f814bd80ade8c2e.600x338.jpg",
      image3:
        "https://cdn.cloudflare.steamstatic.com/steam/apps/578080/ss_63bb4a659968c3417ddd2ea5fd82cd2143e458a0.600x338.jpg",
      image4:
        "https://cdn.cloudflare.steamstatic.com/steam/apps/578080/ss_622c5bc5bc0de0f9a3af7b337a4b8eaba7ef045b.600x338.jpg",
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
      reviews: {
        positive: 1000,
        negative: 1000,
      },
    },
    {
      // NARAKA: BLADEPOINT
      gameName: "NARAKA: BLADEPOINT",
      gameLink: "https://store.steampowered.com/app/1203220/NARAKA_BLADEPOINT/",
      mainImage:
        "https://cdn.akamai.steamstatic.com/steam/apps/2391710/capsule_184x69.jpg",
      image1:
        "https://cdn.akamai.steamstatic.com/steam/apps/1203220/ss_508b8f677ad0278feea4c74280d3bb8aa1143d7a.600x338.jpg",
      image2:
        "https://cdn.akamai.steamstatic.com/steam/apps/1203220/ss_c5cbb4fb8fcd71b6fd64f86b3f18dd9f00f11787.600x338.jpg",
      image3:
        "https://cdn.akamai.steamstatic.com/steam/apps/1203220/ss_fede743af03b94e8ccd8c1d8f156916acdce7723.600x338.jpg",
      image4:
        "https://cdn.akamai.steamstatic.com/steam/apps/1203220/ss_96173cebbcc3bbb6202854fccb8aad223f6c5334.600x338.jpg",
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
      reviews: {
        positive: 1000,
        negative: 1000,
      },
    },
    {
      // The Elder Scrolls® Online
      gameName: "The Elder Scrolls® Online",
      gameLink:
        "https://store.steampowered.com/app/306130/The_Elder_Scrolls_Online/",
      mainImage:
        "https://cdn.akamai.steamstatic.com/steam/apps/2391710/capsule_184x69.jpg",
      image1:
        "https://cdn.cloudflare.steamstatic.com/steam/apps/306130/ss_ae00343059f2751a9bd1385383bc065d6d72a8df.600x338.jpg",
      image2:
        "https://cdn.cloudflare.steamstatic.com/steam/apps/306130/ss_5d7230643e643f1d1e87320f93edf109f91c2d6c.600x338.jpg",
      image3:
        "https://cdn.cloudflare.steamstatic.com/steam/apps/306130/ss_2b797e150cbb9ad7eec9d9089e79df4adc21e797.600x338.jpg",
      image4:
        "https://cdn.cloudflare.steamstatic.com/steam/apps/306130/ss_c21f3be1e15e5fcd0244c6857acd22d37b04d161.600x338.jpg",
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
      reviews: {
        positive: 1000,
        negative: 1000,
      },
    },
    {
      // Red Dead Redemption 2
      gameName: "Red dead Redemption 2",
      gameLink:
        "https://store.steampowered.com/app/1174180/Red_Dead_Redemption_2/",
      mainImage:
        "https://cdn.akamai.steamstatic.com/steam/apps/2391710/capsule_184x69.jpg",
      image1:
        "https://cdn.akamai.steamstatic.com/steam/apps/1174180/ss_d1a8f5a69155c3186c65d1da90491fcfd43663d9.600x338.jpg",
      image2:
        "https://cdn.akamai.steamstatic.com/steam/apps/1174180/ss_4ce07ae360b166f0f650e9a895a3b4b7bf15e34f.600x338.jpg",
      image3:
        "https://cdn.akamai.steamstatic.com/steam/apps/1174180/ss_668dafe477743f8b50b818d5bbfcec669e9ba93e.600x338.jpg",
      image4:
        "https://cdn.akamai.steamstatic.com/steam/apps/1174180/ss_66b553f4c209476d3e4ce25fa4714002cc914c4f.600x338.jpg",
      discount: "discount", // "discount" or "no-discount"
      discountPercentage: "-60%",
      price: "$59.99",
      discountPrice: "$23.99",
      tag1: "Top Seller",
      // tag2: "",
      // tag3: "",
      // tag4: "",
      win: "platform-image win",
      // mac: "platform-image mac", // Comment the varibale if the platform is not available
      reviews: {
        positive: 1000,
        negative: 1000,
      },
    },
    {
      // Sekiro™: Shadows Die Twice - GOTY Edition
      gameName: "Sekiro™: Shadows Die Twice - GOTY Edition",
      gameLink:
        "https://store.steampowered.com/app/814380/Sekiro_Shadows_Die_Twice__GOTY_Edition//",
      mainImage:
        "https://cdn.akamai.steamstatic.com/steam/apps/2391710/capsule_184x69.jpg",
      image1:
        "https://cdn.akamai.steamstatic.com/steam/apps/814380/ss_2685dd844a2a523b6c7ec207d46a538db6a908cd.600x338.jpg",
      image2:
        "https://cdn.akamai.steamstatic.com/steam/apps/814380/ss_0f7b0f8ed9ffc49aba26f9328caa9a1d59ad60f0.600x338.jpg",
      image3:
        "https://cdn.akamai.steamstatic.com/steam/apps/814380/ss_15f0e9982621aed44900215ad283811af0779b1d.600x338.jpg",
      image4:
        "https://cdn.akamai.steamstatic.com/steam/apps/814380/ss_1e6f5540866a5564d65df915c22fe1e57e336a6f.600x338.jpg",
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
      reviews: {
        positive: 1000,
        negative: 1000,
      },
    },
    {
      // ELDEN RING
      gameName: "ELDEN RING",
      gameLink: "https://store.steampowered.com/app/1245620/ELDEN_RING/",
      mainImage:
        "https://cdn.akamai.steamstatic.com/steam/apps/2391710/capsule_184x69.jpg",
      image1:
        "https://cdn.akamai.steamstatic.com/steam/apps/1245620/ss_3e556415d1bda00d749b2166ced264bec76f06ee.600x338.jpg",
      image2:
        "https://cdn.akamai.steamstatic.com/steam/apps/1245620/ss_ae44317e3bd07b7690b4d62cc5d0d1df30367a91.600x338.jpg",
      image3:
        "https://cdn.akamai.steamstatic.com/steam/apps/1245620/ss_3aec1455923ef49f4e777c2a94dbcd0256f77eb0.600x338.jpg",
      image4:
        "https://cdn.akamai.steamstatic.com/steam/apps/1245620/ss_e80a907c2c43337e53316c71555c3c3035a1343e.600x338.jpg",
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
      reviews: {
        positive: 1000,
        negative: 1000,
      },
    },
    {
      // Tower of Fantasy
      gameName: "Tower of Fantasy",
      gameLink: "https://store.steampowered.com/app/2064650/Tower_of_Fantasy/",
      mainImage:
        "https://cdn.akamai.steamstatic.com/steam/apps/2391710/capsule_184x69.jpg",
      image1:
        "https://cdn.cloudflare.steamstatic.com/steam/apps/2064650/ss_a6ea63ea992a2206066b684cfd420c1faf284021.600x338.jpg",
      image2:
        "https://cdn.cloudflare.steamstatic.com/steam/apps/2064650/ss_2476717c83b6328404b5809cfbaecbd292a08bb4.600x338.jpg",
      image3:
        "https://cdn.cloudflare.steamstatic.com/steam/apps/2064650/ss_8e2043e60ee96e2fdac4eb612bbcec9019575420.600x338.jpg",
      image4:
        "https://cdn.cloudflare.steamstatic.com/steam/apps/2064650/ss_7fcfea85a2100fac45e603f8d2d9bcb31c25f5d5.600x338.jpg",
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
      reviews: {
        positive: 1000,
        negative: 1000,
      },
    },
    {
      // ARK: Survival Ascended
      gameName: "ARK: Survival Ascended",
      gameLink:
        "https://store.steampowered.com/app/2399830/ARK_Survival_Ascended/",
      mainImage:
        "https://cdn.akamai.steamstatic.com/steam/apps/2391710/capsule_184x69.jpg",
      image1:
        "https://cdn.cloudflare.steamstatic.com/steam/apps/2399830/ss_65c0de5ced28281764990a299eb3926629b2863e.600x338.jpg",
      image2:
        "https://cdn.cloudflare.steamstatic.com/steam/apps/2399830/ss_f9e156d2b818d808c65476997283b5da8be8324f.600x338.jpg",
      image3:
        "https://cdn.cloudflare.steamstatic.com/steam/apps/2399830/ss_63a6ea13596a948b7873ed6de4fd4d01f9cbe57b.600x338.jpg",
      image4:
        "https://cdn.cloudflare.steamstatic.com/steam/apps/2399830/ss_0ce49e629369dbf9e8fba324667167568c05c66f.600x338.jpg",
      discount: "discount", // "discount" or "no-discount"
      discountPercentage: "-10%",
      price: "$44.99",
      discountPrice: "$40.49",
      tag1: "RPG",
      tag2: "Ooen World",
      tag3: "Fantasy",
      tag4: "Action",
      win: "platform-image win",
      // mac: "platform-image mac", // Comment the varibale if the platform is not available
      reviews: {
        positive: 1000,
        negative: 1000,
      },
    },
    {
      // Hogwarts Legacy
      gameName: "Hogwarts Legacy",
      gameLink: "https://store.steampowered.com/app/990080/Hogwarts_Legacy/",
      mainImage:
        "https://cdn.akamai.steamstatic.com/steam/apps/2391710/capsule_184x69.jpg",
      image1:
        "https://cdn.cloudflare.steamstatic.com/steam/apps/990080/ss_94058497bf0f8fabdde17ee8d59bece609a60663.600x338.jpg",
      image2:
        "https://cdn.cloudflare.steamstatic.com/steam/apps/990080/ss_8e08976236d29b1897769257ac3c64e9264792a5.600x338.jpg",
      image3:
        "https://cdn.cloudflare.steamstatic.com/steam/apps/990080/ss_725bf58485beb4aa37a3a69c1e2baa69bf3e4653.600x338.jpg",
      image4:
        "https://cdn.cloudflare.steamstatic.com/steam/apps/990080/ss_df93b5e8a183f7232d68be94ae78920a90de1443.600x338.jpg",
      discount: "no-discount", // "discount" or "no-discount"
      price: "$59.99",
      // discountPrice:"",
      // discountPercentage: "",
      tag1: "RPG",
      tag2: "Ooen World",
      tag3: "Story Rich",
      tag4: "Fantasy",
      win: "platform-image win",
      // mac: "platform-image mac", // Comment the varibale if the platform is not available
      reviews: {
        positive: 1000,
        negative: 1000,
      },
    },
    {
      // Cyberpunk 2077
      gameName: "Cyberpunk 2077",
      gameLink: "https://store.steampowered.com/app/1091500/Cyberpunk_2077/",
      mainImage:
        "https://cdn.akamai.steamstatic.com/steam/apps/2391710/capsule_184x69.jpg",
      image1:
        "https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/ss_8640d9db74f7cad714f6ecfb0e1aceaa3f887e58.600x338.jpg",
      image2:
        "https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/ss_4bda6f67580d94832ed2d5814e41ebe018ba1d9e.600x338.jpg",
      image3:
        "https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/ss_b529b0abc43f55fc23fe8058eddb6e37c9629a6a.600x338.jpg",
      image4:
        "https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/ss_9284d1c5b248726760233a933dbb83757d7d5d95.600x338.jpg",
      discount: "discount", // "discount" or "no-discount"
      price: "$59.99",
      discountPrice: "$35.99",
      discountPercentage: "-40%",
      tag1: "Top Seller",
      // tag2: ", Ooen World",
      // tag3: ", Story Rich",
      // tag4: ", Fantasy",
      win: "platform-image win",
      // mac: "platform-image mac", // Comment the varibale if the platform is not available
      reviews: {
        positive: 1000,
        negative: 1000,
      },
    },
  ];

  export const specials: tabItem[] = [
    
    {
        // Cyberpunk 2077
        gameName: "Cyberpunk 2077",
        gameLink: "https://store.steampowered.com/app/1091500/Cyberpunk_2077/",
        mainImage:
          "https://cdn.akamai.steamstatic.com/steam/apps/2519060/capsule_184x69.jpg",
        image1:
          "https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/ss_8640d9db74f7cad714f6ecfb0e1aceaa3f887e58.600x338.jpg",
        image2:
          "https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/ss_4bda6f67580d94832ed2d5814e41ebe018ba1d9e.600x338.jpg",
        image3:
          "https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/ss_b529b0abc43f55fc23fe8058eddb6e37c9629a6a.600x338.jpg",
        image4:
          "https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/ss_9284d1c5b248726760233a933dbb83757d7d5d95.600x338.jpg",
        discount: "discount", // "discount" or "no-discount"
        price: "$59.99",
        discountPrice: "$35.99",
        discountPercentage: "-40%",
        tag1: "Top Seller",
        // tag2: ", Ooen World",
        // tag3: ", Story Rich",
        // tag4: ", Fantasy",
        win: "platform-image win",
        // mac: "platform-image mac", // Comment the varibale if the platform is not available
        reviews: {
          positive: 1000,
          negative: 1000,
        },
      },
    {
      // PUBG: BATTLEGROUNDS
      gameName: "PUBG: BATTLEGROUNDS",
      gameLink: "https://store.steampowered.com/app/578080/PUBG_BATTLEGROUNDS/",
      mainImage:
        "https://cdn.akamai.steamstatic.com/steam/apps/2519060/capsule_184x69.jpg",
      image1:
        "https://cdn.akamai.steamstatic.com/steam/apps/578080/ss_1564a5c49d7fa5328c2c1fc71f369bdb39edb58f.600x338.jpg",
      image2:
        "https://cdn.cloudflare.steamstatic.com/steam/apps/578080/ss_3857268f02113c5095ff7bc73f814bd80ade8c2e.600x338.jpg",
      image3:
        "https://cdn.cloudflare.steamstatic.com/steam/apps/578080/ss_63bb4a659968c3417ddd2ea5fd82cd2143e458a0.600x338.jpg",
      image4:
        "https://cdn.cloudflare.steamstatic.com/steam/apps/578080/ss_622c5bc5bc0de0f9a3af7b337a4b8eaba7ef045b.600x338.jpg",
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
      reviews: {
        positive: 1000,
        negative: 1000,
      },
    },
    {
      // NARAKA: BLADEPOINT
      gameName: "NARAKA: BLADEPOINT",
      gameLink: "https://store.steampowered.com/app/1203220/NARAKA_BLADEPOINT/",
      mainImage:
        "https://cdn.akamai.steamstatic.com/steam/apps/2519060/capsule_184x69.jpg",
      image1:
        "https://cdn.akamai.steamstatic.com/steam/apps/1203220/ss_508b8f677ad0278feea4c74280d3bb8aa1143d7a.600x338.jpg",
      image2:
        "https://cdn.akamai.steamstatic.com/steam/apps/1203220/ss_c5cbb4fb8fcd71b6fd64f86b3f18dd9f00f11787.600x338.jpg",
      image3:
        "https://cdn.akamai.steamstatic.com/steam/apps/1203220/ss_fede743af03b94e8ccd8c1d8f156916acdce7723.600x338.jpg",
      image4:
        "https://cdn.akamai.steamstatic.com/steam/apps/1203220/ss_96173cebbcc3bbb6202854fccb8aad223f6c5334.600x338.jpg",
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
      reviews: {
        positive: 1000,
        negative: 1000,
      },
    },
    {
      // The Elder Scrolls® Online
      gameName: "The Elder Scrolls® Online",
      gameLink:
        "https://store.steampowered.com/app/306130/The_Elder_Scrolls_Online/",
      mainImage:
        "https://cdn.akamai.steamstatic.com/steam/apps/2519060/capsule_184x69.jpg",
      image1:
        "https://cdn.cloudflare.steamstatic.com/steam/apps/306130/ss_ae00343059f2751a9bd1385383bc065d6d72a8df.600x338.jpg",
      image2:
        "https://cdn.cloudflare.steamstatic.com/steam/apps/306130/ss_5d7230643e643f1d1e87320f93edf109f91c2d6c.600x338.jpg",
      image3:
        "https://cdn.cloudflare.steamstatic.com/steam/apps/306130/ss_2b797e150cbb9ad7eec9d9089e79df4adc21e797.600x338.jpg",
      image4:
        "https://cdn.cloudflare.steamstatic.com/steam/apps/306130/ss_c21f3be1e15e5fcd0244c6857acd22d37b04d161.600x338.jpg",
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
      reviews: {
        positive: 1000,
        negative: 1000,
      },
    },
    {
      // Red Dead Redemption 2
      gameName: "Red dead Redemption 2",
      gameLink:
        "https://store.steampowered.com/app/1174180/Red_Dead_Redemption_2/",
      mainImage:
        "https://cdn.akamai.steamstatic.com/steam/apps/2519060/capsule_184x69.jpg",
      image1:
        "https://cdn.akamai.steamstatic.com/steam/apps/1174180/ss_d1a8f5a69155c3186c65d1da90491fcfd43663d9.600x338.jpg",
      image2:
        "https://cdn.akamai.steamstatic.com/steam/apps/1174180/ss_4ce07ae360b166f0f650e9a895a3b4b7bf15e34f.600x338.jpg",
      image3:
        "https://cdn.akamai.steamstatic.com/steam/apps/1174180/ss_668dafe477743f8b50b818d5bbfcec669e9ba93e.600x338.jpg",
      image4:
        "https://cdn.akamai.steamstatic.com/steam/apps/1174180/ss_66b553f4c209476d3e4ce25fa4714002cc914c4f.600x338.jpg",
      discount: "discount", // "discount" or "no-discount"
      discountPercentage: "-60%",
      price: "$59.99",
      discountPrice: "$23.99",
      tag1: "Top Seller",
      // tag2: "",
      // tag3: "",
      // tag4: "",
      win: "platform-image win",
      // mac: "platform-image mac", // Comment the varibale if the platform is not available
      reviews: {
        positive: 1000,
        negative: 1000,
      },
    },
    {
      // Sekiro™: Shadows Die Twice - GOTY Edition
      gameName: "Sekiro™: Shadows Die Twice - GOTY Edition",
      gameLink:
        "https://store.steampowered.com/app/814380/Sekiro_Shadows_Die_Twice__GOTY_Edition//",
      mainImage:
        "https://cdn.akamai.steamstatic.com/steam/apps/2519060/capsule_184x69.jpg",
      image1:
        "https://cdn.akamai.steamstatic.com/steam/apps/814380/ss_2685dd844a2a523b6c7ec207d46a538db6a908cd.600x338.jpg",
      image2:
        "https://cdn.akamai.steamstatic.com/steam/apps/814380/ss_0f7b0f8ed9ffc49aba26f9328caa9a1d59ad60f0.600x338.jpg",
      image3:
        "https://cdn.akamai.steamstatic.com/steam/apps/814380/ss_15f0e9982621aed44900215ad283811af0779b1d.600x338.jpg",
      image4:
        "https://cdn.akamai.steamstatic.com/steam/apps/814380/ss_1e6f5540866a5564d65df915c22fe1e57e336a6f.600x338.jpg",
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
      reviews: {
        positive: 1000,
        negative: 1000,
      },
    },
    {
      // ELDEN RING
      gameName: "ELDEN RING",
      gameLink: "https://store.steampowered.com/app/1245620/ELDEN_RING/",
      mainImage:
        "https://cdn.akamai.steamstatic.com/steam/apps/2519060/capsule_184x69.jpg",
      image1:
        "https://cdn.akamai.steamstatic.com/steam/apps/1245620/ss_3e556415d1bda00d749b2166ced264bec76f06ee.600x338.jpg",
      image2:
        "https://cdn.akamai.steamstatic.com/steam/apps/1245620/ss_ae44317e3bd07b7690b4d62cc5d0d1df30367a91.600x338.jpg",
      image3:
        "https://cdn.akamai.steamstatic.com/steam/apps/1245620/ss_3aec1455923ef49f4e777c2a94dbcd0256f77eb0.600x338.jpg",
      image4:
        "https://cdn.akamai.steamstatic.com/steam/apps/1245620/ss_e80a907c2c43337e53316c71555c3c3035a1343e.600x338.jpg",
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
      reviews: {
        positive: 1000,
        negative: 1000,
      },
    },
    {
      // Tower of Fantasy
      gameName: "Tower of Fantasy",
      gameLink: "https://store.steampowered.com/app/2064650/Tower_of_Fantasy/",
      mainImage:
        "https://cdn.akamai.steamstatic.com/steam/apps/2519060/capsule_184x69.jpg",
      image1:
        "https://cdn.cloudflare.steamstatic.com/steam/apps/2064650/ss_a6ea63ea992a2206066b684cfd420c1faf284021.600x338.jpg",
      image2:
        "https://cdn.cloudflare.steamstatic.com/steam/apps/2064650/ss_2476717c83b6328404b5809cfbaecbd292a08bb4.600x338.jpg",
      image3:
        "https://cdn.cloudflare.steamstatic.com/steam/apps/2064650/ss_8e2043e60ee96e2fdac4eb612bbcec9019575420.600x338.jpg",
      image4:
        "https://cdn.cloudflare.steamstatic.com/steam/apps/2064650/ss_7fcfea85a2100fac45e603f8d2d9bcb31c25f5d5.600x338.jpg",
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
      reviews: {
        positive: 1000,
        negative: 1000,
      },
    },
    {
      // ARK: Survival Ascended
      gameName: "ARK: Survival Ascended",
      gameLink:
        "https://store.steampowered.com/app/2399830/ARK_Survival_Ascended/",
      mainImage:
        "https://cdn.akamai.steamstatic.com/steam/apps/2519060/capsule_184x69.jpg",
      image1:
        "https://cdn.cloudflare.steamstatic.com/steam/apps/2399830/ss_65c0de5ced28281764990a299eb3926629b2863e.600x338.jpg",
      image2:
        "https://cdn.cloudflare.steamstatic.com/steam/apps/2399830/ss_f9e156d2b818d808c65476997283b5da8be8324f.600x338.jpg",
      image3:
        "https://cdn.cloudflare.steamstatic.com/steam/apps/2399830/ss_63a6ea13596a948b7873ed6de4fd4d01f9cbe57b.600x338.jpg",
      image4:
        "https://cdn.cloudflare.steamstatic.com/steam/apps/2399830/ss_0ce49e629369dbf9e8fba324667167568c05c66f.600x338.jpg",
      discount: "discount", // "discount" or "no-discount"
      discountPercentage: "-10%",
      price: "$44.99",
      discountPrice: "$40.49",
      tag1: "RPG",
      tag2: "Ooen World",
      tag3: "Fantasy",
      tag4: "Action",
      win: "platform-image win",
      // mac: "platform-image mac", // Comment the varibale if the platform is not available
      reviews: {
        positive: 1000,
        negative: 1000,
      },
    },
    {
      // Hogwarts Legacy
      gameName: "Hogwarts Legacy",
      gameLink: "https://store.steampowered.com/app/990080/Hogwarts_Legacy/",
      mainImage:
        "https://cdn.akamai.steamstatic.com/steam/apps/2519060/capsule_184x69.jpg",
      image1:
        "https://cdn.cloudflare.steamstatic.com/steam/apps/990080/ss_94058497bf0f8fabdde17ee8d59bece609a60663.600x338.jpg",
      image2:
        "https://cdn.cloudflare.steamstatic.com/steam/apps/990080/ss_8e08976236d29b1897769257ac3c64e9264792a5.600x338.jpg",
      image3:
        "https://cdn.cloudflare.steamstatic.com/steam/apps/990080/ss_725bf58485beb4aa37a3a69c1e2baa69bf3e4653.600x338.jpg",
      image4:
        "https://cdn.cloudflare.steamstatic.com/steam/apps/990080/ss_df93b5e8a183f7232d68be94ae78920a90de1443.600x338.jpg",
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
      reviews: {
        positive: 1000,
        negative: 1000,
      },
    },
  ];
  
  